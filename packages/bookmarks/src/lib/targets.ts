import { Effect } from "effect"
import * as Chrome from "./chrome.js"
import * as Patch from "./patch.js"
import * as Safari from "./safari.js"
import { BookmarksConfig, BookmarkTree } from "./schema/__.js"

export interface TargetDescriptor {
  readonly browser: string
  readonly profile: string
  readonly path: string
  readonly enabled: boolean
}

export const keyOf = (target: Pick<TargetDescriptor, "browser" | "profile">): string =>
  `${target.browser}/${target.profile}`

export const displayNameOf = (target: Pick<TargetDescriptor, "browser" | "profile">): string =>
  `${target.browser}/${target.profile}`

export const graveyardSourceOf = (target: Pick<TargetDescriptor, "browser" | "profile">): string =>
  target.browser === "safari" && target.profile === "default"
    ? "safari"
    : `${target.browser}-${target.profile}`

export const listTargets = (config: BookmarksConfig): readonly TargetDescriptor[] =>
  Object.entries(config.targets).flatMap(([browser, profiles]) =>
    Object.entries(profiles).map(([profile, target]) => ({
      browser,
      profile,
      path: target.path,
      enabled: target.enabled ?? true,
    })),
  )

export const listEnabledTargets = (config: BookmarksConfig): readonly TargetDescriptor[] =>
  listTargets(config).filter((target) => target.enabled)

export const listConfiguredProfileKeys = (config: BookmarksConfig): readonly string[] => {
  const keys = new Set<string>()

  for (const target of listTargets(config)) {
    keys.add(keyOf(target))
  }

  for (const profileKey of Object.keys(config.profiles ?? {})) {
    keys.add(profileKey)
  }

  return [...keys]
}

export const findTarget = (
  config: BookmarksConfig,
  profileKey: string,
): TargetDescriptor | undefined =>
  listTargets(config).find((target) => keyOf(target) === profileKey)

export const readTree = (target: TargetDescriptor): Effect.Effect<BookmarkTree, Error> => {
  switch (target.browser) {
    case "safari":
      return Safari.readBookmarks(target.path)
    case "chrome":
      return Chrome.readBookmarks(target.path)
    default:
      return Effect.fail(
        new Error(`Unsupported bookmarks target '${displayNameOf(target)}' at ${target.path}`),
      )
  }
}

export const applyPatches = (
  target: TargetDescriptor,
  patches: readonly Patch.BookmarkPatch[],
): Effect.Effect<void, Error> => {
  if (patches.length === 0) return Effect.void

  switch (target.browser) {
    case "safari":
      return Safari.applyPatches(target.path, patches)
    case "chrome":
      return Chrome.applyPatches(target.path, patches)
    default:
      return Effect.fail(
        new Error(`Unsupported bookmarks target '${displayNameOf(target)}' at ${target.path}`),
      )
  }
}
