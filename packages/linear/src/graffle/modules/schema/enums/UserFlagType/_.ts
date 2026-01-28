import type * as $Members from './members.js'

export * as UserFlagType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The types of flags that the user can have.
*
* **Members:**
* - `updatedSlackThreadSyncIntegration`
* - `completedOnboarding`
* - `desktopInstalled`
* - `teamsPageIntroductionDismissed`
* - `joinTeamIntroductionDismissed`
* - `desktopDownloadToastDismissed`
* - `emptyBacklogDismissed`
* - `emptyCustomViewsDismissed`
* - `emptyActiveIssuesDismissed`
* - `emptyMyIssuesDismissed`
* - `triageWelcomeDismissed`
* - `cycleWelcomeDismissed`
* - `projectWelcomeDismissed`
* - `projectBacklogWelcomeDismissed`
* - `projectUpdatesWelcomeDismissed`
* - `pulseWelcomeDismissed`
* - `analyticsWelcomeDismissed`
* - `insightsWelcomeDismissed`
* - `insightsHelpDismissed`
* - `figmaPromptDismissed`
* - `issueMovePromptCompleted`
* - `migrateThemePreference`
* - `listSelectionTip`
* - `emptyParagraphSlashCommandTip`
* - `editorSlashCommandUsed`
* - `canPlaySnake`
* - `canPlayTetris`
* - `importBannerDismissed`
* - `tryInvitePeopleDismissed`
* - `tryRoadmapsDismissed`
* - `tryCyclesDismissed`
* - `tryTriageDismissed`
* - `tryGithubDismissed`
* - `rewindBannerDismissed`
* - `helpIslandFeatureInsightsDismissed`
* - `dueDateShortcutMigration`
* - `slackCommentReactionTipShown`
* - `issueLabelSuggestionUsed`
* - `threadedCommentsNudgeIsSeen`
* - `desktopTabsOnboardingDismissed`
* - `milestoneOnboardingIsSeenAndDismissed`
* - `projectBoardOnboardingIsSeenAndDismissed`
* - `figmaPluginBannerDismissed`
* - `initiativesBannerDismissed`
* - `commandMenuClearShortcutTip`
* - `slackBotWelcomeMessageShown`
* - `slackAgentPromoFromCreateNewIssueShown`
* - `all`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 48 |
*/
export interface UserFlagType {
kind: "Enum",
name: "UserFlagType",
members: $Members.updatedSlackThreadSyncIntegration
| $Members.completedOnboarding
| $Members.desktopInstalled
| $Members.teamsPageIntroductionDismissed
| $Members.joinTeamIntroductionDismissed
| $Members.desktopDownloadToastDismissed
| $Members.emptyBacklogDismissed
| $Members.emptyCustomViewsDismissed
| $Members.emptyActiveIssuesDismissed
| $Members.emptyMyIssuesDismissed
| $Members.triageWelcomeDismissed
| $Members.cycleWelcomeDismissed
| $Members.projectWelcomeDismissed
| $Members.projectBacklogWelcomeDismissed
| $Members.projectUpdatesWelcomeDismissed
| $Members.pulseWelcomeDismissed
| $Members.analyticsWelcomeDismissed
| $Members.insightsWelcomeDismissed
| $Members.insightsHelpDismissed
| $Members.figmaPromptDismissed
| $Members.issueMovePromptCompleted
| $Members.migrateThemePreference
| $Members.listSelectionTip
| $Members.emptyParagraphSlashCommandTip
| $Members.editorSlashCommandUsed
| $Members.canPlaySnake
| $Members.canPlayTetris
| $Members.importBannerDismissed
| $Members.tryInvitePeopleDismissed
| $Members.tryRoadmapsDismissed
| $Members.tryCyclesDismissed
| $Members.tryTriageDismissed
| $Members.tryGithubDismissed
| $Members.rewindBannerDismissed
| $Members.helpIslandFeatureInsightsDismissed
| $Members.dueDateShortcutMigration
| $Members.slackCommentReactionTipShown
| $Members.issueLabelSuggestionUsed
| $Members.threadedCommentsNudgeIsSeen
| $Members.desktopTabsOnboardingDismissed
| $Members.milestoneOnboardingIsSeenAndDismissed
| $Members.projectBoardOnboardingIsSeenAndDismissed
| $Members.figmaPluginBannerDismissed
| $Members.initiativesBannerDismissed
| $Members.commandMenuClearShortcutTip
| $Members.slackBotWelcomeMessageShown
| $Members.slackAgentPromoFromCreateNewIssueShown
| $Members.all
}