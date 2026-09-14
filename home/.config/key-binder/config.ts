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
  ],
  externalContextKeys: [
    // VS Code core context-key universe.
    ...builtinsManifest.externalContextKeys,

    // vscode-neovim's mode context key (`neovim.mode == 'visual'` etc.).
    ExternalContextKeyDecl({
      name: 'neovim.mode',
      valueType: Schema.Literal(
        'normal',
        'insert',
        'visual',
        'visualLine',
        'visualBlock',
        'replace',
        'cmdline',
      ),
      ownedBy: 'asvetliakov.vscode-neovim',
    }),
  ],
})

// ─────────────────── builder ─────────────────────────────────────────────

// `Obsidian({ vault })` requires the vault path (the adapter emits
// `<vault>/.obsidian/.vimrc`). Points at the iCloud "Main" vault, where the
// existing `.vimrc` already lives.
const $ = KeyBinder.create()
  .use(VsCode(manifest))
  .use(Neovim())
  .use(
    Obsidian({
      vault: Obsidian.VaultPath(
        '~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Main',
      ),
    }),
  )

// `when` clauses are authored as vsv `WhenAst` values via `When(manifest)`
// (D-008), over the same widened catalog — a typo on a context-key name is a
// compile error, and the AST encodes to its `keybindings.json` string only at
// the emit boundary (minimal precedence-aware parens).
const $when = When(manifest)

// ════════════════════════════════════════════════════════════════════════
// VS CODE BINDINGS — from keybindings.json
// ════════════════════════════════════════════════════════════════════════

// ── Docks & Panels (cmd+h/j/l for Zed parity) ───────────────────────────
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
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+k'),
  command: 'workbench.action.terminal.clear',
  when: $when.is('terminalFocus'),
  description: Description('Clear terminal screen'),
})

// ── Menus: ctrl-j/k next/prev ────────────────────────────────────────────
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
$.vscode.bind({
  key: VsCodeKeyExpression('cmd+w'),
  command: 'workbench.action.closeActiveEditor',
  remove: true,
  when: $when.and($when.eq('groupEditorsCount', 1), $when.not($when.is('multipleEditorGroups'))),
  description: Description('Unbind cmd+w when last editor'),
})

// ── No-editor / empty-state leader chords (mirror vim leader) ────────────
// Fire when no working file is open (editorIsOpen=false), surfacing the
// same chord vocabulary the user has when an editor IS focused but routed
// through VS Code commands directly because nvim isn't dispatching keys
// in this state.
$.vscode.bind({ key: VsCodeKeyExpression('space k'), command: 'workbench.action.quickOpen', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Find files') })
$.vscode.bind({ key: VsCodeKeyExpression('space o'), command: 'workbench.action.openRecent', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Open recent') })
$.vscode.bind({ key: VsCodeKeyExpression('space shift+o'), command: 'projectManager.listProjects', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Project manager') })
$.vscode.bind({ key: VsCodeKeyExpression('space j'), command: 'workbench.action.tasks.runTask', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Run task') })
$.vscode.bind({ key: VsCodeKeyExpression('t e'), command: 'workbench.files.action.focusFilesExplorer', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Focus file explorer') })
$.vscode.bind({ key: VsCodeKeyExpression('t g'), command: 'workbench.view.scm', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Open SCM panel') })
$.vscode.bind({ key: VsCodeKeyExpression('t t'), command: 'workbench.action.terminal.focus', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Focus terminal') })
$.vscode.bind({ key: VsCodeKeyExpression('t d'), command: 'workbench.panel.markers.view.focus', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Focus diagnostics panel') })
$.vscode.bind({ key: VsCodeKeyExpression(';'), command: 'workbench.action.showCommands', when: $when.and($when.not($when.is('editorIsOpen')), $when.not($when.is('inputFocus'))), description: Description('Command palette') })

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
$.vscode.bind({ key: VsCodeKeyExpression('cmd+j'), command: 'editor.action.joinLines', remove: true, description: Description('Unbind cmd+j join lines') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+cmd+j'), command: 'workbench.action.search.toggleQueryDetails', remove: true, when: $when.is('searchViewletVisible'), description: Description('Unbind search toggle') })
$.vscode.bind({ key: VsCodeKeyExpression('cmd+alt+shift+m'), command: 'jason.toggleProblemsVisibility', when: $when.is('editorTextFocus'), description: Description('Toggle problems visibility') })

// ── Find widget close ────────────────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('ctrl+/'), command: 'closeFindWidget', when: $when.and($when.is('editorFocus'), $when.is('findWidgetVisible')), description: Description('Close find widget') })

// ── Explorer delete ──────────────────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('d'), command: 'explorerDelete.confirmTrash', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Trash file') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+d'), command: 'explorerDelete.forceTrash', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Force trash') })

// ── Explorer enter / shift+enter / r ─────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'renameFile', remove: true, when: $when.and($when.is('filesExplorerFocus'), $when.is('foldersViewVisible'), $when.not($when.is('inputFocus'))), description: Description('Unbind enter=rename') })
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'jason.explorerDigIn', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus')), $when.is('explorerResourceIsFolder')), description: Description('Dig in') })
$.vscode.bind({ key: VsCodeKeyExpression('enter'), command: 'list.select', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus')), $when.not($when.is('explorerResourceIsFolder'))), description: Description('Open file') })
$.vscode.bind({ key: VsCodeKeyExpression('shift+enter'), command: 'jason.explorerDigOut', when: $when.and($when.is('filesExplorerFocus'), $when.not($when.is('inputFocus'))), description: Description('Dig out') })
$.vscode.bind({ key: VsCodeKeyExpression('r'), command: 'renameFile', when: $when.and($when.is('filesExplorerFocus'), $when.is('foldersViewVisible'), $when.not($when.is('inputFocus'))), description: Description('Rename file') })

// ── Visual mode line duplication ─────────────────────────────────────────
$.vscode.bind({ key: VsCodeKeyExpression('cmd+j'), command: 'editor.action.copyLinesDownAction', when: $when.and($when.is('editorTextFocus'), $when.eq('neovim.mode', 'visual')), description: Description('Copy line down (visual)') })
$.vscode.bind({ key: VsCodeKeyExpression('cmd+k'), command: 'editor.action.copyLinesUpAction', when: $when.and($when.is('editorTextFocus'), $when.eq('neovim.mode', 'visual')), description: Description('Copy line up (visual)') })

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

// ── Bimodal branches from keymaps.lua (vim.g.vscode = true side only) ───
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('gh'), command: VsCodeCommandId('editor.action.showHover'), description: Description('Hover docs') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression('<leader>k'), command: VsCodeCommandId('workbench.action.quickOpen'), description: Description('Find files') })
$.neovim.bind({ mode: 'normal', key: NeovimKeyExpression(';'), command: VsCodeCommandId('workbench.action.showCommands'), description: Description('Command palette') })
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
  rhs: '6gj',
  description: Description('Move down six visual lines'),
})
$.obsidian.bind({
  mode: 'normal',
  key: Obsidian.VimKeyExpression('K'),
  rhs: '6gk',
  description: Description('Move up six visual lines'),
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

$.obsidian.node(Obsidian.Comment(['INSERT MODE', '───────────────────────────────────────────────────────────────────────────────']))

$.obsidian.bind({
  mode: 'insert',
  key: Obsidian.VimKeyExpression('kj'),
  rhs: '<Esc>',
  description: Description('Exit insert mode'),
})

export default $
