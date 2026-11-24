// Jason's KeyBinder config.
//
// Authored by migrating the existing chord scheme from:
//   - VS Code keybindings.json (panel/chrome bindings)
//   - vscode_keymaps.lua (vscode-mode chord overrides — vsmap-style cross-target)
//   - keymaps.lua (the `if vim.g.vscode then ...` branches; pure-vim mappings stay
//     in keymaps.lua, not migrated here)
//
// Verification: `key-binder sync --check` should report `add: 0, adopt: N,
// drift: 0, conflicts: 0` once iteration converges.

import { Schema } from 'effect'
import { Description, KeyBinder } from '@jasonkuhrt/key-binder'
import { Neovim, NeovimKeyExpression } from '@jasonkuhrt/key-binder/neovim'
import { Obsidian } from '@jasonkuhrt/key-binder/obsidian'
import {
  builtinsManifest,
  VsCode,
  VsCodeCommandId,
  VsCodeCommandSequence,
  VsCodeKeyExpression,
  When,
} from '@jasonkuhrt/key-binder/vscode'
import {
  Zed,
  ZedContext,
  type ZedContextPredicate,
  ZedKeyExpression,
} from '@jasonkuhrt/key-binder/zed'
import {
  defineManifest,
  ExternalCommandDecl,
  ExternalContextKeyDecl,
} from '@jasonkuhrt/vsv/manifest'

// ─────────────────── manifest: vsv core + config-local externals ──────────
//
// The VS Code vocabulary the `VsCode` adapter and `When` builder narrow
// against is a single vsv manifest (D2): vsv's prebuilt core catalog
// (`builtinsManifest`) widened with every command id and context key this
// config references that VS Code core doesn't ship — genuine extension ids
// (jason.*, workbenchCycler.*, neovim.mode, etc.).

/** Declare a foreign command id (VS Code core or an installed extension). */
const extCommand = <const Id extends string>(id: Id, fromExtension?: string) =>
  ExternalCommandDecl(
    fromExtension === undefined
      ? { id, args: Schema.Unknown, result: Schema.Void }
      : { id, args: Schema.Unknown, result: Schema.Void, fromExtension },
  )

const manifest = defineManifest({
  name: 'jasonkuhrt-key-binder-config',
  publisher: 'jasonkuhrt',
  externalCommands: [
    // VS Code core command universe.
    ...builtinsManifest.externalCommands,

    // jasonkuhrt.utils extension — ~/projects/jasonkuhrt/vscode-utils
    extCommand('jason.toggleCodeLens', 'jasonkuhrt.utils'),
    extCommand('jason.toggleProblemsVisibility', 'jasonkuhrt.utils'),
    extCommand('jason.closeUnpinnedTabs', 'jasonkuhrt.utils'),
    extCommand('jason.renameTight', 'jasonkuhrt.utils'),
    extCommand('jason.addResolvedFolderToWorkspace', 'jasonkuhrt.utils'),
    extCommand('jason.explorerToggleRecursive', 'jasonkuhrt.utils'),
    extCommand('jason.explorerDigIn', 'jasonkuhrt.utils'),
    extCommand('jason.explorerDigOut', 'jasonkuhrt.utils'),

    // jasonkuhrt.workbench-cycler extension
    extCommand('workbenchCycler.applyPreset', 'jasonkuhrt.workbench-cycler'),
    extCommand('workbenchCycler.nextInSequence', 'jasonkuhrt.workbench-cycler'),

    // jasonkuhrt.explorer-delete extension (vscode-explorer-delete)
    extCommand('explorerDelete.confirmTrash', 'jasonkuhrt.explorer-delete'),
    extCommand('explorerDelete.forceTrash', 'jasonkuhrt.explorer-delete'),

    // alefragnani.project-manager
    extCommand('projectManager.listProjects', 'alefragnani.project-manager'),

    // mhutchie.git-graph
    extCommand('git-graph.view', 'mhutchie.git-graph'),

    // github.vscode-pull-request-github + GitHub-link helpers
    extCommand('extension.copyGitHubLinkToClipboard'),
    extCommand('extension.openInGitHub'),
    extCommand('extension.openPrGitProvider'),
    extCommand('pr.goToNextDiffInPr', 'github.vscode-pull-request-github'),
    extCommand('pr.goToPreviousDiffInPr', 'github.vscode-pull-request-github'),
    extCommand('editor.action.toggleBlame', 'vscode.git'),

    // TypeScript language features
    extCommand('typescript.addMissingImports', 'vscode.typescript-language-features'),
    extCommand('typescript.organizeImports', 'vscode.typescript-language-features'),
    extCommand('typescript.removeUnusedImports', 'vscode.typescript-language-features'),
    extCommand('typescript.fixAll', 'vscode.typescript-language-features'),
    extCommand('typescript.restartTsServer', 'vscode.typescript-language-features'),

    // jasonkuhrt.key-binder-glimpse extension
    extCommand('keyBinderGlimpse.show', 'jasonkuhrt.key-binder-glimpse'),

    // vscode.markdown-language-features
    extCommand('markdown.showSource', 'vscode.markdown-language-features'),
    extCommand('markdown.togglePreview', 'vscode.markdown-language-features'),
  ],
  externalContextKeys: [
    // VS Code core context-key universe.
    ...builtinsManifest.externalContextKeys,

    // vscode-neovim's mode context key (`neovim.mode == 'visual'` etc.).
    ExternalContextKeyDecl({
      name: 'neovim.mode',
      valueType: Schema.Literals([
        'normal',
        'insert',
        'visual',
        'visualLine',
        'visualBlock',
        'replace',
        'cmdline',
      ]),
      ownedBy: 'asvetliakov.vscode-neovim',
    }),
  ],
})

// ─────────────────── builder ─────────────────────────────────────────────

// `Obsidian({ vault })` requires the vault path (the adapter emits
// `<vault>/.obsidian/.vimrc`). The vault is MeOS, `~/meos`.
const $ = KeyBinder.create()
  .use(VsCode(manifest))
  .use(Neovim())
  .use(
    Obsidian({
      vault: Obsidian.VaultPath(
        '~/meos',
      ),
    }),
  )
  .use(Zed())

// `when` clauses are authored as vsv `WhenAst` values via `When(manifest)`
// (D-008), over the same widened catalog — a typo on a context-key name is a
// compile error, and the AST encodes to its `keybindings.json` string only at
// the emit boundary (minimal precedence-aware parens).
const $when = When(manifest)

// Zed `context` predicates are a typed AST built with `ZedContext`, encoded
// to keymap.json's string only at emit.
const $ctx = ZedContext

// ════════════════════════════════════════════════════════════════════════
// VS CODE BINDINGS — emitted to keybindings.json
// ════════════════════════════════════════════════════════════════════════
//
// Chrome operations only: dock toggles, pane navigation, list/menu nav,
// terminal exit, Welcome-page leader chords. Vim-mode bindings live in nvim
// (loaded into VS Code by vscode-neovim) — see the NEOVIM section below.
// `sync` writes keybindings.json as plain JSON, so every rationale lives here.

// ── Docks & Panels (cmd+h/j/l for Zed parity) ───────────────────────────
// cmd+j toggles the bottom panel, as Zed's cmd-j (workspace::ToggleBottomDock).
// cmd+l / cmd+shift+l cycle layout presets (all → explorer → full-terminal)
// through the workbench-cycler extension (~/projects/jasonkuhrt/workbench-cycler).
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+h'),
  command: 'workbench.action.toggleSidebarVisibility',
  description: Description('Toggle sidebar'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+l'),
  command: 'workbenchCycler.nextInSequence',
  args: { sequence: ['all', 'explorer', 'full-terminal'] },
  description: Description('Cycle layout forward'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+shift+l'),
  command: 'workbenchCycler.nextInSequence',
  args: { sequence: ['full-terminal', 'explorer', 'all'] },
  description: Description('Cycle layout reverse'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+j'),
  command: 'workbench.action.togglePanel',
  description: Description('Toggle bottom panel'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('shift+cmd+h'),
  command: 'workbench.files.action.focusFilesExplorer',
  description: Description('Focus file explorer'),
})

// ── Editor Splits (ctrl-cmd-h/j/k/l) ─────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+cmd+h'), command: 'workbench.action.splitEditorLeft', description: Description('Split editor left') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+cmd+l'), command: 'workbench.action.splitEditorRight', description: Description('Split editor right') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+cmd+k'), command: 'workbench.action.splitEditorUp', description: Description('Split editor up') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+cmd+j'), command: 'workbench.action.splitEditorDown', description: Description('Split editor down') })

// ── Pane Navigation (ctrl-h/j/k/l) ───────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+h'), command: 'workbench.action.navigateLeft', description: Description('Navigate left pane') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+l'), command: 'workbench.action.navigateRight', description: Description('Navigate right pane') })
$.vscode.bind({
  key: VsCodeKeyExpression('ctrl+k'),
  command: 'workbench.action.navigateUp',
  when: $when.and(
    $when.not($when.is('suggestWidgetVisible')),
    $when.not($when.is('inQuickOpen')),
    $when.not($when.is('codeActionMenuVisible')),
    $when.not($when.is('parameterHintsVisible')),
    $when.not($when.is('referenceSearchVisible')),
  ),
  description: Description('Navigate up pane'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('ctrl+j'),
  command: 'workbench.action.navigateDown',
  when: $when.and(
    $when.not($when.is('suggestWidgetVisible')),
    $when.not($when.is('inQuickOpen')),
    $when.not($when.is('codeActionMenuVisible')),
    $when.not($when.is('parameterHintsVisible')),
    $when.not($when.is('referenceSearchVisible')),
  ),
  description: Description('Navigate down pane'),
})
// Mac convention: cmd+k clears the terminal screen (replaces the lost ctrl+l).
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+k'),
  command: 'workbench.action.terminal.clear',
  when: $when.is('terminalFocus'),
  description: Description('Clear terminal screen'),
})

// ── Menus: ctrl-j/k next/prev ────────────────────────────────────────────
// ctrl+j/k next/prev on every surface VS Code exposes as a navigable menu.
// Generic lists and trees (Explorer, Search results, Problems, References,
// Outline, SCM, Debug, Extensions, Keybindings editor) take plain j/k/h/l/J/K/H,
// since they have no vim and no text input. Accepted cost: Explorer loses
// type-ahead filename search.
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'selectNextSuggestion', when: $when.is('suggestWidgetVisible'), description: Description('Suggest next') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+k'), command: 'selectPrevSuggestion', when: $when.is('suggestWidgetVisible'), description: Description('Suggest previous') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'workbench.action.quickOpenSelectNext', when: $when.is('inQuickOpen'), description: Description('QuickOpen next') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+k'), command: 'workbench.action.quickOpenSelectPrevious', when: $when.is('inQuickOpen'), description: Description('QuickOpen prev') })
$.vscode.bind({ key: VsCodeKeyExpression('j'), command: 'list.focusDown', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List down') })
$.vscode.bind({ key: VsCodeKeyExpression('k'), command: 'list.focusUp', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List up') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+j'), command: 'list.focusLast', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List last') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+k'), command: 'list.focusFirst', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List first') })
$.vscode.bind({ key: VsCodeKeyExpression('h'), command: 'list.collapse', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List collapse') })
$.vscode.bind({ key: VsCodeKeyExpression('l'), command: 'list.expand', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List expand') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+h'), command: 'list.collapseAll', when: $when.and($when.is('listFocus'), $when.not($when.is('inputFocus'))), description: Description('List collapse all') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'selectNextCodeAction', when: $when.is('codeActionMenuVisible'), description: Description('CodeAction next') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+k'), command: 'selectPrevCodeAction', when: $when.is('codeActionMenuVisible'), description: Description('CodeAction prev') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'showNextParameterHint', when: $when.and($when.is('parameterHintsVisible'), $when.is('parameterHintsMultipleSignatures')), description: Description('ParamHint next') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+k'), command: 'showPrevParameterHint', when: $when.and($when.is('parameterHintsVisible'), $when.is('parameterHintsMultipleSignatures')), description: Description('ParamHint prev') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'goToNextReferenceFromEmbeddedEditor', when: $when.is('referenceSearchVisible'), description: Description('References next') })
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+k'), command: 'goToPreviousReferenceFromEmbeddedEditor', when: $when.is('referenceSearchVisible'), description: Description('References prev') })

// ── Open (Zed parity) ────────────────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('cmd+o'), command: 'workbench.action.openRecent', description: Description('Open recent') })
$.vscode.bind({ key: VsCodeKeyExpression('cmd+o'), command: 'workbench.action.files.openFileFolder', remove: true, description: Description('Unbind default cmd+o') })
$.vscode.bind({ key: VsCodeKeyExpression('alt+cmd+o'), command: 'workbench.action.files.openFileFolder', description: Description('Open file/folder') })

// ── Search in new editor ─────────────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('shift+cmd+/'), command: 'workbench.action.findInFiles', description: Description('Find in files') })

// ── Terminal exit ────────────────────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression("ctrl+'"), command: 'workbench.action.terminal.focus', when: $when.not($when.is('terminalFocus')), description: Description('Focus terminal') })
$.vscode.bind({ key: VsCodeKeyExpression("ctrl+'"), command: 'workbench.action.focusActiveEditorGroup', when: $when.is('terminalFocus'), description: Description('Exit terminal') })

// ── Never close last editor ──────────────────────────────────────────────
// A `-command` removal only applies when the default rule's `when` implies
// the removal's `when`, and VS Code's default cmd+w rule has no `when` — so a
// conditional removal removes nothing. Unbind the default outright, then
// re-add it guarded: cmd+w closes unless this is the last editor in the only
// group. (`groupEditorsCount` is the real key; `groupActiveEditorCount` isn't.)
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+w'),
  command: 'workbench.action.closeActiveEditor',
  remove: true,
  description: Description('Unbind default cmd+w'),
})
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+w'),
  command: 'workbench.action.closeActiveEditor',
  when: $when.or($when.neq('groupEditorsCount', 1), $when.is('multipleEditorGroups')),
  description: Description('Close editor unless it is the last one'),
})

// ── Welcome / empty-workbench leader chords (mirror vim leader) ──────────
// vscode-neovim attaches to text editors; without one there is no vim mode
// and no leader, so these route the same chords to VS Code commands.
// Gate: `inWelcome || !editorIsOpen`. The Welcome page IS an editor pane, so
// `editorIsOpen` (visibleEditorPanes.length > 0) is true there and
// `!editorIsOpen` alone never fired on it; `!editorIsOpen` still covers the
// fully empty workbench.
const welcomeOrEmpty = $when.and(
  $when.or($when.is('inWelcome'), $when.not($when.is('editorIsOpen'))),
  $when.not($when.is('inputFocus')),
)
$.vscode.bind({ key: VsCodeKeyExpression('space k'), command: 'workbench.action.quickOpen', when: welcomeOrEmpty, description: Description('Find files') })
$.vscode.bind({ key: VsCodeKeyExpression('space o'), command: 'workbench.action.openRecent', when: welcomeOrEmpty, description: Description('Open recent') })
$.vscode.bind({ key: VsCodeKeyExpression('space shift+o'), command: 'projectManager.listProjects', when: welcomeOrEmpty, description: Description('Project manager') })
$.vscode.bind({ key: VsCodeKeyExpression('space j'), command: 'workbench.action.tasks.runTask', when: welcomeOrEmpty, description: Description('Run task') })
$.vscode.bind({ key: VsCodeKeyExpression('t e'), command: 'workbench.files.action.focusFilesExplorer', when: welcomeOrEmpty, description: Description('Focus file explorer') })
$.vscode.bind({ key: VsCodeKeyExpression('t g'), command: 'workbench.view.scm', when: welcomeOrEmpty, description: Description('Open SCM panel') })
$.vscode.bind({ key: VsCodeKeyExpression('t t'), command: 'workbench.action.terminal.focus', when: welcomeOrEmpty, description: Description('Focus terminal') })
$.vscode.bind({ key: VsCodeKeyExpression('t d'), command: 'workbench.panel.markers.view.focus', when: welcomeOrEmpty, description: Description('Focus diagnostics panel') })
$.vscode.bind({ key: VsCodeKeyExpression(';'), command: 'workbench.action.showCommands', when: welcomeOrEmpty, description: Description('Command palette') })

// ── Markdown-preview command palette (ORIGINAL bug fix) ──────────────────
// `;` in the markdown preview (webview panel OR custom-editor preview) had no
// command-palette binding — vim's `;` never reached because the preview isn't
// a text editor. Bind `;` to the palette whenever a markdown preview is the
// active surface and the user isn't typing into an input.
$.vscode.bind({
  key: VsCodeKeyExpression(';'),
  command: 'workbench.action.showCommands',
  when: $when.and(
    $when.or(
      $when.eq('activeWebviewPanelId', 'markdown.preview'),
      $when.eq('activeCustomEditorId', 'vscode.markdown.preview.editor'),
    ),
    $when.not($when.is('inputFocus')),
  ),
  description: Description('Command palette (markdown preview)'),
})

// ── Misc Zed parity ──────────────────────────────────────────────────────
// joinLines' mac default is ctrl+j (not cmd+j), so the removal targets ctrl+j.
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+j'), command: 'editor.action.joinLines', remove: true, description: Description('Unbind ctrl+j join lines') })
// No `when`: the default rule is gated on `searchViewletFocus || inSearchEditor`,
// which doesn't imply `searchViewletVisible`, so a narrowed removal never matched.
$.vscode.bind({ key: VsCodeKeyExpression('shift+cmd+j'), command: 'workbench.action.search.toggleQueryDetails', remove: true, description: Description('Unbind search toggle') })
$.vscode.bind({ key: VsCodeKeyExpression('cmd+alt+shift+m'), command: 'jason.toggleProblemsVisibility', when: $when.is('editorTextFocus'), description: Description('Toggle problems visibility') })

// ── Find widget close ────────────────────────────────────────────────────
// ctrl+/ closes find from its input without moving hands; `/` stays typeable.
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+/'), command: 'closeFindWidget', when: $when.and($when.is('editorFocus'), $when.is('findWidgetVisible')), description: Description('Close find widget') })

// ── Explorer delete ──────────────────────────────────────────────────────
// jasonkuhrt.explorer-delete: both go to the system trash; `d` confirms, `D`
// doesn't. `!inputFocus` keeps them off while renaming a file inline.
$.vscode.bind({ key: VsCodeKeyExpression('d'), command: 'explorerDelete.confirmTrash', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Trash file') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+d'), command: 'explorerDelete.forceTrash', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Force trash') })

// ── Explorer enter / shift+enter / r ─────────────────────────────────────
// jasonkuhrt.utils: enter on a folder digs in (opens every dir at the
// shallowest level that still has a closed one); shift+enter digs out (closes
// every dir at the deepest open level); past either end the cycle resets.
// Enter on a file opens it — `explorerResourceIsFolder` picks the target.
// Rename moves from enter to r.
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'renameFile', remove: true, when: $when.and($when.is('filesExplorerFocus'), $when.is('foldersViewVisible'), $when.not($when.is('inputFocus'))), description: Description('Unbind enter=rename') })
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'jason.explorerDigIn', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus')), $when.is('explorerResourceIsFolder')), description: Description('Dig in') })
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'list.select', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus')), $when.not($when.is('explorerResourceIsFolder'))), description: Description('Open file') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+enter'), command: 'jason.explorerDigOut', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Dig out') })
$.vscode.bind({ key: VsCodeKeyExpression('r'), command: 'renameFile', when: $when.and($when.is('filesExplorerFocus'), $when.is('foldersViewVisible'), $when.not($when.is('inputFocus'))), description: Description('Rename file') })

// ── Visual mode line duplication ─────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('cmd+j'), command: 'editor.action.copyLinesDownAction', when: $when.and($when.is('editorTextFocus'), $when.eq('neovim.mode', 'visual')), description: Description('Copy line down (visual)') })
$.vscode.bind({ key: VsCodeKeyExpression('cmd+k'), command: 'editor.action.copyLinesUpAction', when: $when.and($when.is('editorTextFocus'), $when.eq('neovim.mode', 'visual')), description: Description('Copy line up (visual)') })

// ── Markdown: toggle source ⇄ preview ────────────────────────────────────
// `markdown.togglePreview` is editorAssociation-aware: it reopens the file as
// source or as the `vscode.markdown.preview.editor` custom editor (set in
// settings.json), not a stray webview. VS Code's default is shift+cmd+v.
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+k v'),
  command: 'markdown.togglePreview',
  when: $when.and($when.eq('resourceLangId', 'markdown'), $when.not($when.is('notebookEditorFocused'))),
  description: Description('Toggle markdown source/preview'),
})

// ════════════════════════════════════════════════════════════════════════
// NEOVIM CROSS-TARGET CHORDS — from vscode_keymaps.lua + bimodal keymaps.lua
// ════════════════════════════════════════════════════════════════════════

// ── Search (override centered n/N to use VS Code's find widget) ──────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('/'), command: VsCodeCommandId('actions.find'), description: Description('Find in file') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('n'), command: VsCodeCommandId('editor.action.nextMatchFindAction'), description: Description('Next match') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('N'), command: VsCodeCommandId('editor.action.previousMatchFindAction'), description: Description('Prev match') })

// ── Glimpse picker (?) — overrides vim's reverse-search to show chord menu ─
// Cross-target: nvim consumes `?` in normal/visual mode and dispatches the
// VS Code command directly via vscode.action(). This avoids vscode-neovim's
// compositeKeys constraint (single chars not supported there) and works
// regardless of vim's default `?` binding.
// findInFiles (formerly bound to `?`) remains reachable via <leader>s.
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('?'), command: VsCodeCommandId('keyBinderGlimpse.show', { context: 'editor:normal' }), description: Description('Show keybinder picker (normal)') })
$.neovim.bind({ mode: 'visual', key: NeovimKeyExpression('?'), command: VsCodeCommandId('keyBinderGlimpse.show', { context: 'editor:visual' }), description: Description('Show keybinder picker (visual)') })

// ── Folding ──────────────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zo'), command: VsCodeCommandId('editor.unfold'), description: Description('Open fold') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('za'), command: VsCodeCommandId('editor.toggleFold'), description: Description('Toggle fold') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zc'), command: VsCodeCommandId('editor.fold'), description: Description('Close fold') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zM'), command: VsCodeCommandId('editor.foldAll'), description: Description('Fold all') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zR'), command: VsCodeCommandId('editor.unfoldAll'), description: Description('Unfold all') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zj'), command: VsCodeCommandId('editor.gotoNextFold'), description: Description('Next fold') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('zk'), command: VsCodeCommandId('editor.gotoPreviousFold'), description: Description('Prev fold') })

// ── Navigation history ──────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('['), command: VsCodeCommandId('workbench.action.navigateBack'), description: Description('Navigate back') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(']'), command: VsCodeCommandId('workbench.action.navigateForward'), description: Description('Navigate forward') })

// ── Leader top-level ────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>l'), command: VsCodeCommandId('workbench.action.gotoSymbol'), description: Description('Go to symbol') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>L'), command: VsCodeCommandId('workbench.action.showAllSymbols'), description: Description('Workspace symbols') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>j'), command: VsCodeCommandId('workbench.action.tasks.runTask'), description: Description('Run task') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>o'), command: VsCodeCommandId('workbench.action.openRecent'), description: Description('Open recent') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>O'), command: VsCodeCommandId('projectManager.listProjects'), description: Description('Project manager') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>z'), command: VsCodeCommandId('workbench.action.toggleZenMode'), description: Description('Zen mode') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>.'), command: VsCodeCommandId('editor.action.quickFix'), description: Description('Quick fix') })

// ── Leader: quickfix ────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qq'), command: VsCodeCommandId('editor.action.quickFix'), description: Description('Quick fix') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qi'), command: VsCodeCommandSequence(['typescript.addMissingImports', 'workbench.action.files.saveAll']), description: Description('Add missing imports') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qo'), command: VsCodeCommandSequence(['typescript.organizeImports', 'workbench.action.files.saveAll']), description: Description('Organize imports') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qu'), command: VsCodeCommandSequence(['typescript.removeUnusedImports', 'workbench.action.files.saveAll']), description: Description('Remove unused imports') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qf'), command: VsCodeCommandSequence(['typescript.fixAll', 'workbench.action.files.saveAll']), description: Description('Fix all') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>qr'), command: VsCodeCommandId('editor.action.refactor'), description: Description('Refactor') })

// ── Leader: debug ───────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>dd'), command: VsCodeCommandId('workbench.action.debug.start'), description: Description('Start debug') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>db'), command: VsCodeCommandId('editor.debug.action.toggleBreakpoint'), description: Description('Toggle breakpoint') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>dl'), command: VsCodeCommandId('editor.debug.action.toggleLogpoint'), description: Description('Toggle logpoint') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>dc'), command: VsCodeCommandId('workbench.action.debug.continue'), description: Description('Continue') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>ds'), command: VsCodeCommandId('workbench.action.debug.stepOver'), description: Description('Step over') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>di'), command: VsCodeCommandId('workbench.action.debug.stepInto'), description: Description('Step into') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>do'), command: VsCodeCommandId('workbench.action.debug.stepOut'), description: Description('Step out') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>dt'), command: VsCodeCommandId('workbench.action.debug.stop'), description: Description('Stop') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>dr'), command: VsCodeCommandId('workbench.action.debug.restart'), description: Description('Restart') })

// ── Leader: search ──────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>s'), command: VsCodeCommandId('workbench.action.findInFiles'), description: Description('Find in files') })
$.neovim.bind({ mode: 'visual', key: NeovimKeyExpression('<leader>s'), command: VsCodeCommandId('workbench.action.findInFilesWithSelectedText'), description: Description('Find selection') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>S'), command: VsCodeCommandId('search.action.openNewEditor'), description: Description('Search editor') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>*'), command: VsCodeCommandSequence(['editor.action.addSelectionToNextFindMatch', 'workbench.action.findInFiles']), description: Description('Find word in files') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>sr'), command: VsCodeCommandId('workbench.action.replaceInFiles'), description: Description('Replace in files') })

// ── Visual J/K — half-page scroll keeping selection ─────────────────────
$.neovim.bind({
  mode: 'visual',
  key: NeovimKeyExpression('J'),
  command: VsCodeCommandId('editorScroll', { to: 'down', by: 'halfPage', select: true }),
  description: Description('Half-page down (visual)'),
})
$.neovim.bind({
  mode: 'visual',
  key: NeovimKeyExpression('K'),
  command: VsCodeCommandId('editorScroll', { to: 'up', by: 'halfPage', select: true }),
  description: Description('Half-page up (visual)'),
})

// ── Git (q-prefix) ──────────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qj'), command: VsCodeCommandId('workbench.action.editor.nextChange'), description: Description('Next git hunk') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qk'), command: VsCodeCommandId('workbench.action.editor.previousChange'), description: Description('Prev git hunk') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qb'), command: VsCodeCommandId('git.checkout'), description: Description('Branch picker') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qw'), command: VsCodeCommandId('workbench.view.scm'), description: Description('SCM panel') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qd'), command: VsCodeCommandId('git.openChange'), description: Description('Git diff') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qo'), command: VsCodeCommandId('git.openChange'), description: Description('Inline hunk preview') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qO'), command: VsCodeCommandId('git.viewChanges'), description: Description('View all changes') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qa'), command: VsCodeCommandId('git.stageSelectedRanges'), description: Description('Stage hunk') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qA'), command: VsCodeCommandId('git.stage'), description: Description('Stage all') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qu'), command: VsCodeCommandId('git.revertSelectedRanges'), description: Description('Restore hunk') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qU'), command: VsCodeCommandId('git.clean'), description: Description('Restore file') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qc'), command: VsCodeCommandId('git.commit'), description: Description('Commit') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qp'), command: VsCodeCommandId('git.push'), description: Description('Push') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qP'), command: VsCodeCommandId('git.pushForce'), description: Description('Force push') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qB'), command: VsCodeCommandId('editor.action.toggleBlame'), description: Description('Toggle blame') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qf'), command: VsCodeCommandId('git.fetch'), description: Description('Git fetch') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qs'), command: VsCodeCommandId('git.stash'), description: Description('Git stash') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qS'), command: VsCodeCommandId('git.stashPop'), description: Description('Git stash pop') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('ql'), command: VsCodeCommandId('git-graph.view'), description: Description('Git graph') })
$.neovim.bind({ mode: ['normal', 'visual'], key: NeovimKeyExpression('qy'), command: VsCodeCommandId('extension.copyGitHubLinkToClipboard'), description: Description('Copy GitHub link') })
$.neovim.bind({ mode: ['normal', 'visual'], key: NeovimKeyExpression('qY'), command: VsCodeCommandId('extension.openInGitHub'), description: Description('Open in GitHub') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qr'), command: VsCodeCommandId('extension.openPrGitProvider'), description: Description('Open PR') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qn'), command: VsCodeCommandId('pr.goToNextDiffInPr'), description: Description('Next PR diff') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('qN'), command: VsCodeCommandId('pr.goToPreviousDiffInPr'), description: Description('Prev PR diff') })

// ── Toggle / panels (t-prefix) ──────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('te'), command: VsCodeCommandId('workbench.files.action.focusFilesExplorer'), description: Description('File explorer') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tg'), command: VsCodeCommandId('workbench.view.scm'), description: Description('SCM panel') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tt'), command: VsCodeCommandId('workbench.action.terminal.focus'), description: Description('Terminal') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('to'), command: VsCodeCommandId('outline.focus'), description: Description('Outline') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('td'), command: VsCodeCommandId('workbench.panel.markers.view.focus'), description: Description('Diagnostics') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tD'), command: VsCodeCommandId('jason.toggleProblemsVisibility'), description: Description('Toggle problems visibility') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tP'), command: VsCodeCommandId('workbench.action.closePanel'), description: Description('Close panel') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('th'), command: VsCodeCommandId('editor.action.toggleInlayHints'), description: Description('Toggle inlay hints') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tc'), command: VsCodeCommandId('jason.toggleCodeLens'), description: Description('Toggle code lens') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tw'), command: VsCodeCommandId('editor.action.toggleWordWrap'), description: Description('Toggle word wrap') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('tb'), command: VsCodeCommandId('editor.action.toggleBlame'), description: Description('Toggle blame') })

// ── Config (, prefix) ───────────────────────────────────────────────────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',,'), command: VsCodeCommandId('workbench.action.openSettings'), description: Description('Settings') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',k'), command: VsCodeCommandId('workbench.action.openGlobalKeybindings'), description: Description('Keybindings') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',K'), command: VsCodeCommandId('workbench.action.openDefaultKeybindingsFile'), description: Description('Default keybindings') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',s'), command: VsCodeCommandId('workbench.action.openSnippets'), description: Description('Snippets') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',t'), command: VsCodeCommandId('workbench.action.tasks.openUserTasks'), description: Description('User tasks') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',<space>'), command: VsCodeCommandId('editor.action.toggleWordWrap'), description: Description('Toggle word wrap') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',R'), command: VsCodeCommandId('workbench.action.reloadWindow'), description: Description('Reload window') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(',r'), command: VsCodeCommandId('typescript.restartTsServer'), description: Description('Restart TS server') })

// ── VS Code side of keys whose terminal side lives in keymaps.lua ───────
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('gh'), command: VsCodeCommandId('editor.action.showHover'), description: Description('Hover docs') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>k'), command: VsCodeCommandId('workbench.action.quickOpen'), description: Description('Find files') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(';'), command: VsCodeCommandId('workbench.action.showCommands'), description: Description('Command palette') })
// jason.renameTight strips the `import { foo as bar }` aliases that tsserver
// inserts despite typescript.preferences.useAliasesForRenames=false, which only
// partly mitigates it. See TypeScript issue #29026.
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('r'), command: VsCodeCommandId('jason.renameTight'), description: Description('Rename symbol (alias-stripping)') })

// ════════════════════════════════════════════════════════════════════════
// OBSIDIAN VIMRC SUPPORT — vault .obsidian/.vimrc
// ════════════════════════════════════════════════════════════════════════

$.obsidian.node(
  Obsidian.Comment([
    '',
    '',
    '',
    '',
    'Yet Another Vim Configuration',
    '_for Obsidian_',
    '',
    '',
    'Official Documentation:',
    '  https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Vim+users',
    '',
    'Uses:',
    '  https://github.com/replit/codemirror-vim',
    '',
    'Example Configs:',
    '  https://github.com/chrisgrieser/.config/blob/main/obsidian/vimrc/obsidian-vimrc.vim',
    '  https://notes.bauer.codes/Obsidian#Obsidian+vim+window+controls',
    '',
    'Vim-related Obsidian plugins:',
    '  https://publish.obsidian.md/hub/02+-+Community+Expansions/02.01+Plugins+by+Category/Vim-related+Plugins',
    '',
    '',
  ]),
)

$.obsidian.node(Obsidian.Comment(['NAVIGATION', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('j'),
  rhs: 'gj',
  description: Description('Move down visual line'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('k'),
  rhs: 'gk',
  description: Description('Move up visual line'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('I'),
  rhs: 'g0i',
  description: Description('Insert at visual line start'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('A'),
  rhs: 'g$a',
  description: Description('Append at visual line end'),
})
$.obsidian.bind({
  mode: ['normal', 'visual'],
  key: Obsidian.VimKeyExpression('H'),
  rhs: 'g0',
  description: Description('Go to visual line start'),
})
$.obsidian.bind({
  mode: ['normal', 'visual'],
  key: Obsidian.VimKeyExpression('L'),
  rhs: 'g$',
  description: Description('Go to visual line end'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('J'),
  rhs: '<C-d>zz',
  description: Description('Half page down, centred (as in Zed)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('K'),
  rhs: '<C-u>zz',
  description: Description('Half page up, centred (as in Zed)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('G'),
  rhs: 'Gzz',
  description: Description('Go to end, centred (as in Zed)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('n'),
  rhs: 'nzz',
  description: Description('Next match, centred (as in Zed)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('N'),
  rhs: 'Nzz',
  description: Description('Previous match, centred (as in Zed)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('U'),
  rhs: '<C-r>',
  description: Description('Redo (as in Zed)'),
})
$.obsidian.bind({
  mode: 'visual',
  key: Obsidian.VimKeyExpression('J'),
  rhs: '6j',
  description: Description('Move selection down six lines'),
})
$.obsidian.bind({
  mode: 'visual',
  key: Obsidian.VimKeyExpression('K'),
  rhs: '6k',
  description: Description('Move selection up six lines'),
})

$.obsidian.node(Obsidian.Comment(['COMMANDS', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression(';'),
  command: Obsidian.CommandId('command-palette:open'),
  description: Description('Command palette'),
})

// The keys below mirror Zed's keymap (~/.config/zed/keymap.json), so the
// same muscle memory works in both.

$.obsidian.node(Obsidian.Comment(['FOLDING (Zed: z a / z o toggle, z c fold, z M fold all, z R unfold all)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('za'),
  command: Obsidian.CommandId('editor:toggle-fold'),
  description: Description('Toggle fold'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('zo'),
  command: Obsidian.CommandId('editor:toggle-fold'),
  description: Description('Toggle fold'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('zc'),
  command: Obsidian.CommandId('editor:toggle-fold'),
  description: Description('Toggle fold (Obsidian has no fold-only command)'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('zM'),
  command: Obsidian.CommandId('editor:fold-all'),
  description: Description('Fold all'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('zR'),
  command: Obsidian.CommandId('editor:unfold-all'),
  description: Description('Unfold all'),
})

$.obsidian.node(Obsidian.Comment(['HISTORY AND NOTES (Zed: [ ] back/forward, space k finder, space o recent)', '───────────────────────────────────────────────────────────────────────────────']))

// Zed's [b ]b (tabs) are left out: a lone [ would then wait for a second key.
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('['),
  command: Obsidian.CommandId('app:go-back'),
  description: Description('Go back'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression(']'),
  command: Obsidian.CommandId('app:go-forward'),
  description: Description('Go forward'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>k'),
  command: Obsidian.PluginCommandId('meos:open-note'),
  description: Description('Open note'),
})
// Open recent: with no query, the MeOS plugin's Open note lists recent notes first.
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>o'),
  command: Obsidian.PluginCommandId('meos:open-note'),
  description: Description('Open recent'),
})

$.obsidian.node(Obsidian.Comment(['LINKS (Zed: g d go to definition, m c p copy relative path)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('gd'),
  command: Obsidian.CommandId('editor:follow-link'),
  description: Description('Follow link'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('mcp'),
  command: Obsidian.CommandId('workspace:copy-path'),
  description: Description('Copy file path'),
})

$.obsidian.node(Obsidian.Comment(['SEARCH (Zed: ? search and replace)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('?'),
  command: Obsidian.CommandId('editor:open-search-replace'),
  description: Description('Search and replace'),
})

$.obsidian.node(Obsidian.Comment(['PANELS (Zed: t e explorer, t o outline)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('te'),
  command: Obsidian.CommandId('file-explorer:open'),
  description: Description('File explorer'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('to'),
  command: Obsidian.CommandId('outline:open'),
  description: Description('Outline'),
})

$.obsidian.node(Obsidian.Comment(['PANES (Zed: space w s / a split, space w h j k l focus)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>ws'),
  command: Obsidian.CommandId('workspace:split-vertical'),
  description: Description('Split vertically'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>wa'),
  command: Obsidian.CommandId('workspace:split-horizontal'),
  description: Description('Split horizontally'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>wh'),
  command: Obsidian.CommandId('editor:focus-left'),
  description: Description('Focus pane left'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>wl'),
  command: Obsidian.CommandId('editor:focus-right'),
  description: Description('Focus pane right'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>wk'),
  command: Obsidian.CommandId('editor:focus-top'),
  description: Description('Focus pane above'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('<Space>wj'),
  command: Obsidian.CommandId('editor:focus-bottom'),
  description: Description('Focus pane below'),
})

$.obsidian.node(Obsidian.Comment(['SETTINGS (Zed: , , settings)', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression(',,'),
  command: Obsidian.CommandId('app:open-settings'),
  description: Description('Settings'),
})

$.obsidian.node(Obsidian.Comment(['INSERT MODE', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'insert',
  key: Obsidian.VimKeyExpression('kj'),
  rhs: '<Esc>',
  description: Description('Exit insert mode'),
})

// ════════════════════════════════════════════════════════════════════════
// ZED — ~/.config/zed/keymap.json
// ════════════════════════════════════════════════════════════════════════
//
// Jason's Zed keymap. KeyBinder emits the whole file; bindings keep this
// source order, which Zed reads as precedence (a later binding wins at the
// same context depth). `$ctx` builds each section's `context` predicate.
//
// Reminder to self to try the following things when I have some time:
//
// - cmd-H should toggle between the left dock. Currently it focus project panel.
// - Remove inherited vscode keybinds?
//
// - "cmd-shift-e": "pane::RevealInProjectPanel",
// - if search active, dismiss with / and use ctrl-/ to force send that char (like terminal solution)
// - search thing reminder: https://discord.com/channels/869392257814519848/1250470360139300934/1378120458095820891
// - on cmd-s also perform a format on the file (b/c if no change then format-on-save is not triggered since no save is actually performed)

/** Normal mode (vim or helix outside a menu), terminal vi mode, and the non-editor panels. */
const normalOrHelixOrPanel = $ctx.or(
  $ctx.eq('vim_mode', 'normal'),
  $ctx.and($ctx.eq('vim_mode', 'helix_normal'), $ctx.not($ctx.is('menu'))),
  $ctx.is('ChangesList'),
  $ctx.is('EmptyPane'),
  $ctx.is('SharedScreen'),
  $ctx.is('MarkdownPreview'),
  $ctx.is('KeyContextView'),
  $ctx.is('Welcome'),
  $ctx.is('ProjectPanel'),
  $ctx.is('GitPanel'),
  $ctx.is('Diagnostics'),
  $ctx.and($ctx.is('Terminal'), $ctx.is('vi_mode')),
)

/** Vim normal mode, terminal vi mode, and the docks and panels. */
const normalOrPanel = $ctx.or(
  $ctx.eq('vim_mode', 'normal'),
  $ctx.and($ctx.is('Terminal'), $ctx.is('vi_mode')),
  $ctx.is('GitPanel'),
  $ctx.is('ProjectPanel'),
  $ctx.is('CollabPanel'),
  $ctx.is('OutlinePanel'),
  $ctx.is('ChatPanel'),
  $ctx.is('VimControl'),
  $ctx.is('EmptyPane'),
  $ctx.is('SharedScreen'),
  $ctx.is('MarkdownPreview'),
  $ctx.is('KeyContextView'),
  $ctx.is('DebugPanel'),
  $ctx.is('Diagnostics'),
)

/** The editor in vim normal or visual mode. */
const editorNormalOrVisual = $ctx.and(
  $ctx.is('Editor'),
  $ctx.or($ctx.eq('vim_mode', 'normal'), $ctx.eq('vim_mode', 'visual')),
)

/** A panel docked in the workspace: Workspace > Dock > <panel>. */
const docked = (panel: ZedContextPredicate) => $ctx.descendant($ctx.is('Workspace'), $ctx.is('Dock'), panel)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Outline

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Outline'))

$.zed.bind({ context: $ctx.and($ctx.is('OutlinePanel'), $ctx.is('not_editing')), key: ZedKeyExpression('/'), command: 'outline_panel::ToggleFocus' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Docks & Panels

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Docks & Panels'))
$.zed.node(Zed.Comment('━━━━━━━━━━━━━━ • Cycle Dock Left'))

$.zed.bind({ context: docked($ctx.is('ProjectPanel')), key: ZedKeyExpression('cmd-{'), command: 'collab_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('ProjectPanel')), key: ZedKeyExpression('cmd-}'), command: 'git_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('GitPanel')), key: ZedKeyExpression('cmd-{'), command: 'project_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('GitPanel')), key: ZedKeyExpression('cmd-}'), command: 'outline_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('OutlinePanel')), key: ZedKeyExpression('cmd-{'), command: 'git_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('OutlinePanel')), key: ZedKeyExpression('cmd-}'), command: 'project_panel::ToggleFocus' })
// Omit Collab from the cycle. Not using it currently:
// $.zed.bind({ context: docked($ctx.is('OutlinePanel')), key: ZedKeyExpression('cmd-}'), command: 'collab_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('CollabPanel')), key: ZedKeyExpression('cmd-{'), command: 'outline_panel::ToggleFocus' })
$.zed.bind({ context: docked($ctx.is('CollabPanel')), key: ZedKeyExpression('cmd-}'), command: 'project_panel::ToggleFocus' })

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━ • Toggle Docks'))

// Names the terminal rather than toggling the right dock, so it stays right
// if another panel ever docks there. The agent is off (settings.json,
// agent.enabled), so nothing here binds agent or inline-assist actions.
$.zed.bind({ key: ZedKeyExpression('cmd-l'), command: 'terminal_panel::Toggle' })
$.zed.bind({ key: ZedKeyExpression('cmd-h'), command: 'workspace::ToggleLeftDock' })
$.zed.bind({ key: ZedKeyExpression('cmd-j'), command: 'workspace::ToggleBottomDock' })
$.zed.bind({ key: ZedKeyExpression('cmd-H'), command: 'project_panel::ToggleFocus' })
// Split creation (symmetric with Ghostty)
$.zed.bind({ key: ZedKeyExpression('ctrl-cmd-h'), command: 'pane::SplitLeft' })
$.zed.bind({ key: ZedKeyExpression('ctrl-cmd-j'), command: 'pane::SplitDown' })
$.zed.bind({ key: ZedKeyExpression('ctrl-cmd-k'), command: 'pane::SplitUp' })
$.zed.bind({ key: ZedKeyExpression('ctrl-cmd-l'), command: 'pane::SplitRight' })
// Profile selector (for switching settings like hiding UI elements)
$.zed.bind({ key: ZedKeyExpression('ctrl-cmd-p'), command: 'settings_profile_selector::Toggle' })
$.zed.bind({
  key: ZedKeyExpression('ctrl-cmd-f'),
  command: 'action::Sequence',
  args: ['workspace::ToggleCenteredLayout', 'workspace::ToggleZoom'],
  description: Description('Focus mode: centered layout + zoom in one toggle'),
})

// Toggle/panel prefix (t*) — replaces former <space>p* panel menu and
// <space>t* toggle menu. Single-key prefix per the dotfiles 5-prefix
// architecture (g LSP, q git, m match/surround, t toggle/panel, , config).
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t e'), command: 'project_panel::ToggleFocus', description: Description('explorer') })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t g'), command: 'git_panel::ToggleFocus' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t t'), command: 'terminal_panel::ToggleFocus' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t o'), command: 'outline_panel::ToggleFocus' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t d'), command: 'diagnostics::Deploy', description: Description('diagnostics panel') })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t P'), command: 'workspace::CloseAllDocks', description: Description('close panels') })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t w'), command: 'editor::ToggleSoftWrap' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('t b'), command: 'editor::ToggleGitBlameInline' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Palettes

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Palettes'))

// todo: try working with vi mode instead
//
// ─ Special case for Terminal
//
//    I rarely type ; in terminal. With this I can launch the
//    command palette from there as well as I do from the editor.
//
// $.zed.bind({ context: $ctx.is('Terminal'), key: ZedKeyExpression(';'), command: 'command_palette::Toggle' })
// $.zed.bind({ context: $ctx.is('Terminal'), key: ZedKeyExpression('cmd-;'), command: 'terminal::SendText', args: ';' })

// ─ General
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression(';'), command: 'command_palette::Toggle' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('space L'), command: 'project_symbols::Toggle' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('space l'), command: 'outline::Toggle' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('space k'), command: 'file_finder::Toggle' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('space j'), command: 'task::Spawn' })
$.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('space o'), command: 'projects::OpenRecent', args: { create_new_window: true } })
// $.zed.bind({ context: normalOrHelixOrPanel, key: ZedKeyExpression('cmd-k'), command: 'file_finder::Toggle' })

// ─ todo: not sure I find this one useful. Will need to master <,> thingy
$.zed.bind({ context: $ctx.eq('vim_mode', 'visual'), key: ZedKeyExpression(';'), command: 'vim::VisualCommand' })

// ─ Standard macOS open hotkey (cmd-o) uses palette
//
// No context: has to be empty context for buggy reason?
// @see https://github.com/zed-industries/zed/issues/21358#issuecomment-2927946680
// (Tried `Workspace` and `""`.)
$.zed.bind({ key: ZedKeyExpression('cmd-s'), command: 'workspace::SendKeystrokes', args: 'cmd-s cmd-shift-i' })
$.zed.bind({ key: ZedKeyExpression('cmd-o'), command: 'workspace::SendKeystrokes', args: 'space o' })
$.zed.bind({ key: ZedKeyExpression('alt-cmd-o'), command: 'workspace::Open' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Terminal Vim

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Terminal Vim'))

/** Faux terminal insert mode: the terminal outside its vi mode. */
const terminalInsert = $ctx.and($ctx.is('Terminal'), $ctx.not($ctx.and($ctx.is('Terminal'), $ctx.is('vi_mode'))))

// Doesn't seem to work well
// @see https://github.com/zed-industries/zed/issues/16286
// @see https://discord.com/channels/869392257814519848/1250470360139300934/1379106906186190979
// $.zed.bind({ context: terminalInsert, key: ZedKeyExpression('escape'), command: 'terminal::ToggleViMode' })
// $.zed.bind({ context: terminalInsert, key: ZedKeyExpression('k j'), command: 'terminal::ToggleViMode' })
$.zed.bind({
  context: terminalInsert,
  key: ZedKeyExpression('shift-enter'),
  command: 'terminal::SendText',
  args: '\n',
  description: Description('Support multi-line input for Claude Code in terminal'),
})
$.zed.bind({ context: terminalInsert, key: ZedKeyExpression('cmd-t'), command: 'workspace::NewTerminal' })
$.zed.bind({ context: terminalInsert, key: ZedKeyExpression('cmd-n'), command: 'zed::NoAction' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Panes & Docks

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Panes & Docks'))
$.zed.node(Zed.Comment('━━━━━━━━━━━━━━ • Consistent Pane/Dock Navigation'))

const paneNavigable = $ctx.or(
  $ctx.and($ctx.is('Editor'), $ctx.neq('vim_mode', 'insert'), $ctx.neq('vim_mode', 'visual')),
  $ctx.is('Dock'),
  $ctx.is('Pane'),
  $ctx.is('GitPanel'),
  $ctx.is('ProjectPanel'),
  $ctx.is('CollabPanel'),
  $ctx.is('OutlinePanel'),
  $ctx.is('ChatPanel'),
  $ctx.is('DebugPanel'),
)

// Another approach.
// Allow getting _out_ of e.g. terminal pane where we have no <space _> control
// We can be modal by holding ctrl and then navigate quickly.
// TODO: delete the space w approach in favour of this?
$.zed.bind({ context: paneNavigable, key: ZedKeyExpression('ctrl-k'), command: 'workspace::ActivatePaneUp' })
$.zed.bind({ context: paneNavigable, key: ZedKeyExpression('ctrl-l'), command: 'workspace::ActivatePaneRight' })
$.zed.bind({ context: paneNavigable, key: ZedKeyExpression('ctrl-j'), command: 'workspace::ActivatePaneDown' })
$.zed.bind({ context: paneNavigable, key: ZedKeyExpression('ctrl-h'), command: 'workspace::ActivatePaneLeft' })

$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w k'), command: 'workspace::ActivatePaneUp' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w l'), command: 'workspace::ActivatePaneRight' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w j'), command: 'workspace::ActivatePaneDown' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w h'), command: 'workspace::ActivatePaneLeft' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression("space w '"), command: 'pane::CloseAllItems' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w "'), command: 'workspace::CloseAllItemsAndPanes' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w s'), command: 'pane::SplitVertical' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w a'), command: 'pane::SplitHorizontal' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w K'), command: 'pane::SplitUp' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w L'), command: 'pane::SplitRight' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w J'), command: 'pane::SplitDown' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w H'), command: 'pane::SplitLeft' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('space w p'), command: 'pane::TogglePinTab' })

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━ • Configuration'))

$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', ,'), command: 'zed::OpenSettings' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', k'), command: 'zed::OpenKeymap' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', K'), command: 'zed::OpenDefaultKeymap' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', s'), command: 'snippets::ConfigureSnippets' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', t'), command: 'zed::OpenTasks' })
$.zed.node(Zed.Comment('━ Toggle'))
// "e" aligns with m e
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', e'), command: 'editor::ToggleInlineDiagnostics' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', v'), command: 'editor::ToggleInlineValues' })
// "w" is close to "e" ...
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', w'), command: 'diagnostics::ToggleWarnings' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', space'), command: 'editor::ToggleSoftWrap' })
// Built-in; writes project_panel.hide_gitignore.
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', g'), command: 'project_panel::ToggleHideGitIgnore', description: Description('gitignore visibility') })
// hidden_files in settings; writes project_panel.hide_hidden.
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', h'), command: 'project_panel::ToggleHideHidden', description: Description('meta-file visibility') })
$.zed.bind({
  context: normalOrPanel,
  key: ZedKeyExpression(', G'),
  command: 'task::Spawn',
  args: { task_name: 'toggle: generated' },
  description: Description('__generated__ in/out of tree+finder+search'),
})
$.zed.node(Zed.Comment('━ Reload'))
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', R'), command: 'workspace::Reload' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression(', r'), command: 'editor::RestartLanguageServer' })

$.zed.node(Zed.Comment("━━━━━━━━━━━━━━ • Let ctrl-' exit side panels"))

$.zed.bind({ context: $ctx.is('Terminal'), key: ZedKeyExpression("ctrl-'"), command: 'terminal_panel::ToggleFocus' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Menus

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Menus'))

const pickerInput = $ctx.descendant($ctx.is('Picker'), $ctx.is('Editor'))
$.zed.bind({ context: pickerInput, key: ZedKeyExpression('ctrl-j'), command: 'menu::SelectNext' })
$.zed.bind({ context: pickerInput, key: ZedKeyExpression('ctrl-k'), command: 'menu::SelectPrevious' })

const completions = $ctx.descendant($ctx.is('Pane'), $ctx.and($ctx.is('Editor'), $ctx.is('showing_completions')))
$.zed.bind({ context: completions, key: ZedKeyExpression('ctrl-j'), command: 'editor::ContextMenuNext' })
$.zed.bind({ context: completions, key: ZedKeyExpression('ctrl-k'), command: 'editor::ContextMenuPrevious' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Git

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Git'))

// Git prefix (q*) — replaces former g* git block. Frees g-prefix for
// vim-convention LSP/goto. q* replaces vim's macro recording on q
// (user does not record).
// Fixed two bugs from the previous block:
//   1. q k now correctly dispatches fn-_qk1 (GoToPreviousHunk). Old g k
//      mistakenly used fn-_gj1 so it went to next hunk.
//   2. The post-jump centering uses `z z` (matches the n/N centering
//      pattern in the search section). Old block used `g Z` which is
//      not a centering chord.
$.zed.node(Zed.Comment('━ NAVIGATE'))
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('fn-_qj1'), command: 'editor::GoToHunk' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q j'), command: 'workspace::SendKeystrokes', args: 'fn-_qj1 z z' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('fn-_qk1'), command: 'editor::GoToPreviousHunk' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q k'), command: 'workspace::SendKeystrokes', args: 'fn-_qk1 z z' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q b'), command: 'git::Switch', description: Description('branch palette') })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q w'), command: 'git_panel::ToggleFocus' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q d'), command: 'git::Diff', description: Description('opens panel') })
$.zed.node(Zed.Comment('━ SEE'))
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q o'), command: 'editor::ToggleSelectedDiffHunks', description: Description('ala "z o" folding') })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q O'), command: 'editor::ExpandAllDiffHunks' })
$.zed.node(Zed.Comment('━ REVIEW'))
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q a'), command: 'git::ToggleStaged', description: Description('"a" for add') })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q A'), command: 'git::StageAll' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q u'), command: 'git::Restore', description: Description('"u" for undo') })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q U'), command: 'git::RestoreFile' })
$.zed.node(Zed.Comment('━ COMMIT'))
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q c'), command: 'git::Commit' })
// todo: once Zed has a git::sync command, use that
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q p'), command: 'git::Push' })
$.zed.bind({ context: normalOrPanel, key: ZedKeyExpression('q P'), command: 'git::ForcePush' })

// todo: having j/k nav also open the file as it passes over it?
const gitChanges = $ctx.and($ctx.is('GitPanel'), $ctx.is('ChangesList'))
$.zed.node(Zed.Comment('━ Motion'))
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('K'), command: 'menu::SelectFirst' })
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('J'), command: 'menu::SelectLast' })
$.zed.node(Zed.Comment('━ Stage'))
// Vertical motion for nav while horizontal motion for stage
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('l'), command: 'git::StageFile' })
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('h'), command: 'git::UnstageFile' })
// Alt stage key to be consistent with other bindings, also offers "toggle"
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('a'), command: 'git::ToggleStaged' })
$.zed.node(Zed.Comment('━ View'))
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('o'), command: 'menu::SecondaryConfirm', description: Description('open file') })
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('O'), command: 'menu::Confirm', description: Description('open file in diff panel') })
$.zed.node(Zed.Comment('━ Restore'))
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('d'), command: 'git::RestoreFile', args: { skip_prompt: false } })
$.zed.bind({ context: gitChanges, key: ZedKeyExpression('D'), command: 'git::RestoreFile', args: { skip_prompt: true } })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • AI

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • AI'))

$.zed.bind({ context: $ctx.and($ctx.is('Editor'), $ctx.is('edit_prediction')), key: ZedKeyExpression('shift-enter'), command: 'editor::AcceptEditPrediction' })
$.zed.bind({
  context: $ctx.and(
    $ctx.is('Editor'),
    $ctx.and($ctx.is('edit_prediction'), $ctx.or($ctx.is('showing_completions'), $ctx.is('in_leading_whitespace'))),
  ),
  key: ZedKeyExpression('shift-enter'),
  command: 'editor::AcceptEditPrediction',
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Movement

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Movement'))

$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('cmd-K'), command: 'vim::StartOfDocument' })
// J/K/G/n/N all chain `z z` to keep the cursor vertically centered after
// half-page or jump motions (matches terminal nvim's centering behavior).
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('K'), command: 'workspace::SendKeystrokes', args: 'ctrl-u z z' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('L'), command: 'vim::EndOfLine' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('J'), command: 'workspace::SendKeystrokes', args: 'ctrl-d z z' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('G'), command: 'workspace::SendKeystrokes', args: 'G z z' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('cmd-J'), command: 'vim::EndOfDocument' })
// `u` is undo only — line 510 had `u: vim::Undo` which was being
// shadowed by an earlier `u: vim::MoveToPrevious`. The shadow is
// removed. Use cl<char> if you need vim's replace-char (since r is
// now LSP rename per the chord architecture).
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('H'), command: 'vim::StartOfLine' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('['), command: 'pane::GoBack' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression(']'), command: 'pane::GoForward' })
// Buffer prev/next via vim-style bracket chord
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('[ b'), command: 'pane::ActivatePreviousItem' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('] b'), command: 'pane::ActivateNextItem' })
// $.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('ctrl-k'), command: 'vim::PageUp' })
// $.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('ctrl-j'), command: 'vim::PageDown' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Search

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Search'))

$.zed.bind({ context: $ctx.is('Editor'), key: ZedKeyExpression('cmd-?'), command: 'project_search::SearchInNew' })
// $.zed.bind({ context: $ctx.is('Editor'), key: ZedKeyExpression('alt-cmd-u'), command: 'project_search::SearchInNew' })

// Vertical centre on search next
const vimOutsideMenu = $ctx.and($ctx.is('VimControl'), $ctx.not($ctx.is('menu')))
$.zed.bind({ context: vimOutsideMenu, key: ZedKeyExpression('n'), command: 'workspace::SendKeystrokes', args: 'n z z' })
$.zed.bind({ context: vimOutsideMenu, key: ZedKeyExpression('N'), command: 'workspace::SendKeystrokes', args: 'N z z' })

const editorNormal = $ctx.and($ctx.is('Editor'), $ctx.eq('vim_mode', 'normal'))
$.zed.bind({ context: editorNormal, key: ZedKeyExpression('?'), command: 'buffer_search::DeployReplace' })
$.zed.bind({ context: editorNormal, key: ZedKeyExpression('f'), command: 'vim::PushSneak' })
// todo: I probably will never use this, make better use of key?
$.zed.bind({ context: editorNormal, key: ZedKeyExpression('F'), command: 'vim::PushSneakBackward' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Organize Me Plz

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Organize Me Plz'))

$.zed.bind({ context: $ctx.is('Workspace'), key: ZedKeyExpression("ctrl-'"), command: 'workspace::SendKeystrokes', args: 'escape' })

const editorVisual = $ctx.and($ctx.is('Editor'), $ctx.eq('vim_mode', 'visual'))
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('q'), command: 'vim::NormalBefore' })
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('cmd-k'), command: 'editor::DuplicateLineUp' })
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('cmd-j'), command: 'editor::DuplicateLineDown' })
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('v'), command: 'vim::SelectLargerSyntaxNode' })
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('}'), command: 'vim::SelectLargerSyntaxNode' })
$.zed.bind({ context: editorVisual, key: ZedKeyExpression('{'), command: 'vim::SelectSmallerSyntaxNode' })

const editorInsert = $ctx.and($ctx.is('Editor'), $ctx.eq('vim_mode', 'insert'))
$.zed.bind({ context: editorInsert, key: ZedKeyExpression('k j'), command: 'vim::NormalBefore' })
$.zed.bind({ context: editorInsert, key: ZedKeyExpression('shift-backspace'), command: 'vim::DeleteRight' })

// Removed `V → SelectEnclosingSymbol` — V is preserved as vim's default
// visual-line mode (Decision #4 = B). Enclosing-symbol selection is
// reachable via treesitter syntax-node chords (`v` from visual mode
// expands to larger node, see Editor && vim_mode == visual block).
// ── LSP/goto (g-prefix) — vim convention restored. The previous m-prefix
//    LSP block has been removed; m-prefix is now Helix-style match/surround
//    (Decision #2.c).
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g d'), command: 'editor::GoToDefinition' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g D'), command: 'editor::GoToDefinitionSplit' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g r'), command: 'editor::FindAllReferences' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g I'), command: 'editor::GoToImplementation' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g y'), command: 'editor::GoToTypeDefinition' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g Y'), command: 'editor::GoToTypeDefinitionSplit' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('g h'), command: 'editor::Hover' })

$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('U'), command: 'editor::Redo' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('u'), command: 'vim::Undo' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('r'), command: 'editor::Rename' })
// ── Match (m-prefix, Helix-style)
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('m m'), command: 'vim::Matching' })
// ── Utilities (kept on m-prefix; not surround/match-related but
//    don't collide with mini.surround's mappings)
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('m c p'), command: 'workspace::CopyRelativePath' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('m c P'), command: 'workspace::CopyPath' })
// ── Diagnostic nav (vim/LazyVim convention)
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('] d'), command: 'editor::GoToDiagnostic' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('[ d'), command: 'editor::GoToPreviousDiagnostic' })
// ── Misc
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('space q q'), command: 'editor::ToggleCodeActions' })
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('space q o'), command: 'editor::OrganizeImports' })
$.zed.bind({
  context: editorNormalOrVisual,
  key: ZedKeyExpression('space z'),
  command: 'action::Sequence',
  args: ['workspace::ToggleCenteredLayout', 'workspace::ToggleZoom'],
})
// Removed `w → vim::Matching` — w is preserved as vim's default word
// motion (Decision #3 = D). Match-bracket lives at `m m` above.

const normal = $ctx.eq('vim_mode', 'normal')
$.zed.bind({ context: normal, key: ZedKeyExpression('space .'), command: 'editor::ToggleCodeActions' })
// ── Folding (vim z-chord)
$.zed.bind({ context: normal, key: ZedKeyExpression('z o'), command: 'editor::ToggleFold' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z a'), command: 'editor::ToggleFold' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z c'), command: 'editor::Fold' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z O'), command: 'editor::UnfoldRecursive' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z C'), command: 'editor::FoldRecursive' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z M'), command: 'editor::FoldAll' })
$.zed.bind({ context: normal, key: ZedKeyExpression('z R'), command: 'editor::UnfoldAll' })
// $.zed.bind({
//   context: $ctx.and($ctx.is('Editor'), $ctx.eq('vim_mode', 'operator'), $ctx.eq('vim_operator', 'd')),
//   key: ZedKeyExpression('L'),
//   command: 'vim::DeleteToEndOfLine',
// })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Toggle

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Toggle'))

// Inlay hints toggle moved to the new t-prefix block (above) as `t h`.
// The old `space t h` chord is removed.
$.zed.bind({ context: editorNormalOrVisual, key: ZedKeyExpression('t h'), command: 'editor::ToggleInlayHints' })

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Project Panel

$.zed.node(Zed.Comment('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ • Project Panel'))

const projectPanel = $ctx.and($ctx.is('ProjectPanel'), $ctx.is('not_editing'))
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('ctrl-k'), command: 'project_panel::SelectPrevDirectory' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('ctrl-j'), command: 'project_panel::SelectNextDirectory' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('K'), command: 'menu::SelectFirst' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('H'), command: 'project_panel::CollapseAllEntries' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('J'), command: 'menu::SelectLast' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('N'), command: 'project_panel::NewDirectory' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('r'), command: 'project_panel::Rename' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('n'), command: 'project_panel::NewFile' })
// No prompt since we can always restore from macOS Trash
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('d'), command: 'project_panel::Trash', args: { skip_prompt: true } })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('delete'), command: 'project_panel::Trash', args: { skip_prompt: true } })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('c'), command: 'project_panel::Copy' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('p'), command: 'project_panel::Paste' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('/'), command: 'project_panel::NewSearchInDirectory' })
// Zed 1.29 names this workspace::OpenWithSystem (project_panel::OpenWithSystem
// is its deprecated alias).
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('cmd-enter'), command: 'workspace::OpenWithSystem' })
$.zed.bind({ context: projectPanel, useKeyEquivalents: true, key: ZedKeyExpression('shift-enter'), command: 'project_panel::RevealInFileManager' })
// defaults
// "cmd-d": "project_panel::Duplicate",
// "cmd-alt-c": "workspace::CopyPath",
// "alt-cmd-shift-c": "workspace::CopyRelativePath",

export default $
