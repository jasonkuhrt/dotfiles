import type { ScrollBoxRenderable } from "@opentui/core"
import { useTerminalDimensions } from "@opentui/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import type { ExtensionPaneProps } from "hunkdiff/extension"
import {
  buildFlatSidebarEntries,
  buildTreeSidebarEntries,
  collapseTreeSidebarEntries,
  expandCollapsedDirectoryPaths,
  resolveFileSidebarMode,
  sidebarDirectoryPaths,
  toggleCollapsedDirectoryPath,
} from "./files.ts"
import {
  FileDirectoryRow,
  FileGroupHeader,
  FileListItem,
  sidebarStatsWidth,
  sidebarTextWidth,
} from "./FileListItem.tsx"
import { getReviewStatus, subscribeReviewStatus } from "./reviewStatus.ts"
import { buildSidebarRenderWindow } from "./sidebarRenderWindow.ts"
import { isTreeFocused, subscribeTreeFocus } from "./treeFocus.ts"

/**
 * The files pane component.
 *
 * Mirrors Hunk's `packages/hunk/src/extensions/default/ui/sidebar/FileSidebars.tsx`
 * (0.22.0): the same flat and tree projections, windowing, directory collapse,
 * and selection follow. Its flat/tree wrapper components are folded into this
 * one so selection reveal can read the row index. Two stock defects are fixed:
 *
 * - Stock reveals the selection with `scrollChildIntoView`, which reads the
 *   row's laid-out position. A row first mounted in the same commit has none
 *   yet, so stock loses the selection on any jump past its overscan (`G`, for
 *   one). This pane scrolls to the row's index instead.
 * - Stock also listens to the viewport's `layout-changed` and `resized`
 *   events, which OpenTUI 0.5.6 emits only from its root renderable. This pane
 *   syncs on scrolling and on `onSizeChange` of the scrollbox and its content.
 */
export function FlexFileSidebar({
  files,
  selectedFileId,
  theme,
  width,
  actions,
}: ExtensionPaneProps): ReactNode {
  const scrollRef = useRef<ScrollBoxRenderable | null>(null)
  const previousSelectedFileIdRef = useRef(selectedFileId)
  const skipSelectedFileRevealRef = useRef(false)
  const revealPendingRef = useRef(false)
  const revealSelectedFileRef = useRef(() => {})
  const viewportSyncScheduledRef = useRef(false)
  const [collapsedDirectoryPaths, setCollapsedDirectoryPaths] = useState<ReadonlySet<string>>(
    () => new Set(),
  )
  const [scrollViewport, setScrollViewport] = useState({ top: 0, height: 0 })
  const reviewStatus = useSyncExternalStore(subscribeReviewStatus, getReviewStatus)
  const treeFocused = useSyncExternalStore(subscribeTreeFocus, isTreeFocused)
  const terminal = useTerminalDimensions()
  const textWidth = sidebarTextWidth(width)
  const mode = resolveFileSidebarMode(textWidth)
  const paddingLeft = mode === "tree" ? 0 : 1

  const entries = useMemo(
    () =>
      mode === "tree"
        ? collapseTreeSidebarEntries(buildTreeSidebarEntries(files), collapsedDirectoryPaths)
        : buildFlatSidebarEntries(files),
    [collapsedDirectoryPaths, files, mode],
  )
  const statsWidth = sidebarStatsWidth(entries)
  const selectedIndex = entries.findIndex(
    (entry) => entry.kind === "file" && entry.id === selectedFileId,
  )
  const renderWindow = useMemo(
    () =>
      buildSidebarRenderWindow({
        entries,
        estimatedViewportRows: terminal.height,
        overscanRows: 4,
        scrollTop: scrollViewport.top,
        selectedFileId,
        viewportHeight: scrollViewport.height,
      }),
    [entries, scrollViewport.height, scrollViewport.top, selectedFileId, terminal.height],
  )

  /** Toggle one logical directory everywhere it appears in the ordered tree projection. */
  const toggleDirectory = (path: string) => {
    skipSelectedFileRevealRef.current = true
    setCollapsedDirectoryPaths((current) => toggleCollapsedDirectoryPath(current, path))
  }

  // Publish the reveal for this commit's rows to callbacks that outlive the render.
  useLayoutEffect(() => {
    revealSelectedFileRef.current = () => {
      const scrollBox = scrollRef.current
      if (!revealPendingRef.current || !scrollBox) {
        return
      }
      if (selectedIndex < 0) {
        revealPendingRef.current = false
        return
      }

      const viewportHeight = scrollBox.viewport.height
      if (viewportHeight <= 0) {
        return // Not laid out yet; the next size change retries.
      }

      const current = scrollBox.scrollTop
      const next =
        selectedIndex < current
          ? selectedIndex
          : selectedIndex >= current + viewportHeight
            ? selectedIndex - viewportHeight + 1
            : current
      scrollBox.scrollTop = next
      // The scrollbar clamps to the content size of the last layout pass. When
      // that still lags these rows the move falls short; the next size change retries.
      if (scrollBox.scrollTop === next) {
        revealPendingRef.current = false
      }
    }
  })

  /**
   * Read the scroll viewport into state, then retry a pending reveal. The
   * microtask lets the whole layout pass finish first, including the scrollbox's
   * own scrollbar resync, so the reveal clamps against the current content size.
   */
  const syncViewport = useCallback(() => {
    if (viewportSyncScheduledRef.current) {
      return
    }
    viewportSyncScheduledRef.current = true
    queueMicrotask(() => {
      viewportSyncScheduledRef.current = false
      const scrollBox = scrollRef.current
      if (!scrollBox) {
        return
      }

      const top = scrollBox.scrollTop
      const height = scrollBox.viewport.height
      setScrollViewport((current) =>
        current.top === top && current.height === height ? current : { top, height },
      )
      revealSelectedFileRef.current()
    })
  }, [])

  useEffect(() => {
    const scrollBar = scrollRef.current?.verticalScrollBar
    if (!scrollBar) {
      return
    }

    syncViewport()
    scrollBar.on("change", syncViewport)
    return () => {
      scrollBar.off("change", syncViewport)
    }
  }, [syncViewport])

  useEffect(() => {
    const previousSelectedFileId = previousSelectedFileIdRef.current
    previousSelectedFileIdRef.current = selectedFileId
    if (!selectedFileId || selectedFileId === previousSelectedFileId) {
      return
    }

    const selectedFile = files.find((file) => file.id === selectedFileId)
    if (!selectedFile) {
      return
    }

    setCollapsedDirectoryPaths((current) =>
      expandCollapsedDirectoryPaths(current, sidebarDirectoryPaths(selectedFile.path)),
    )
  }, [files, selectedFileId])

  // Selection and projection changes can both move the target row, so follow
  // the stable file id after either event instead of only after navigation.
  useEffect(() => {
    if (skipSelectedFileRevealRef.current) {
      skipSelectedFileRevealRef.current = false
      return
    }
    if (!selectedFileId) {
      return
    }

    revealPendingRef.current = true
    revealSelectedFileRef.current()
  }, [collapsedDirectoryPaths, files, mode, selectedFileId])

  return (
    <scrollbox
      ref={scrollRef}
      width="100%"
      height="100%"
      focused={false}
      scrollY={true}
      viewportCulling={true}
      rootOptions={{ backgroundColor: theme.panel }}
      wrapperOptions={{ backgroundColor: theme.panel }}
      viewportOptions={{ backgroundColor: theme.panel }}
      contentOptions={{ backgroundColor: theme.panel }}
      verticalScrollbarOptions={{ visible: false }}
      horizontalScrollbarOptions={{ visible: false }}
      onSizeChange={syncViewport}
    >
      <box style={{ width: "100%", flexDirection: "column" }} onSizeChange={syncViewport}>
        {renderWindow.map((item) => {
          if (item.kind === "spacer") {
            return (
              <box
                key={item.key}
                style={{ width: "100%", height: item.height, backgroundColor: theme.panel }}
              />
            )
          }

          const { entry } = item
          switch (entry.kind) {
            case "group":
              return (
                <FileGroupHeader
                  key={entry.id}
                  entry={entry}
                  paddingLeft={paddingLeft}
                  textWidth={textWidth}
                  theme={theme}
                />
              )
            case "directory":
              return (
                <FileDirectoryRow
                  key={entry.id}
                  collapsed={collapsedDirectoryPaths.has(entry.path)}
                  entry={entry}
                  onToggleDirectory={toggleDirectory}
                  paddingLeft={paddingLeft}
                  statsWidth={statsWidth}
                  textWidth={textWidth}
                  theme={theme}
                />
              )
            case "file":
              return (
                <FileListItem
                  key={entry.id}
                  entry={entry}
                  focused={treeFocused}
                  paddingLeft={paddingLeft}
                  review={reviewStatus.get(entry.path)}
                  selected={entry.id === selectedFileId}
                  statsWidth={statsWidth}
                  textWidth={textWidth}
                  theme={theme}
                  onSelectFile={actions.selectFile}
                />
              )
          }
        })}
      </box>
    </scrollbox>
  )
}
