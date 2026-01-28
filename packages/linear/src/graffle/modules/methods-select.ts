import * as $$SelectionSets from './selection-sets/_.js'
import type * as $$Utilities from 'graffle/utilities-for-generated'


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                      Select Methods Interface
    // ==================================================================================================
    //
    //
    //
    //
    //
    //



      /**
       * Selection method types for building native GraphQL documents.
       *
       * Maps each GraphQL schema type to its corresponding selection method interface.
       * These methods are available on `.select()` to build type-safe selection sets
       * that return the selection set itself (for document building).
       */

export interface $MethodsSelect {
Query: Query,
Mutation: Mutation,
CustomerNotificationSubscription: CustomerNotificationSubscription,
User: User,
Organization: Organization,
Facet: Facet,
Team: Team,
WorkflowState: WorkflowState,
IssueConnection: IssueConnection,
IssueEdge: IssueEdge,
Issue: Issue,
Cycle: Cycle,
DocumentConnection: DocumentConnection,
DocumentEdge: DocumentEdge,
Document: Document,
Project: Project,
ProjectStatus: ProjectStatus,
Template: Template,
ProjectUpdate: ProjectUpdate,
Reaction: Reaction,
Comment: Comment,
DocumentContent: DocumentContent,
Initiative: Initiative,
InitiativeUpdate: InitiativeUpdate,
CommentConnection: CommentConnection,
CommentEdge: CommentEdge,
PageInfo: PageInfo,
ProjectConnection: ProjectConnection,
ProjectEdge: ProjectEdge,
EntityExternalLinkConnection: EntityExternalLinkConnection,
EntityExternalLinkEdge: EntityExternalLinkEdge,
EntityExternalLink: EntityExternalLink,
IntegrationsSettings: IntegrationsSettings,
InitiativeHistoryConnection: InitiativeHistoryConnection,
InitiativeHistoryEdge: InitiativeHistoryEdge,
InitiativeHistory: InitiativeHistory,
InitiativeUpdateConnection: InitiativeUpdateConnection,
InitiativeUpdateEdge: InitiativeUpdateEdge,
InitiativeConnection: InitiativeConnection,
InitiativeEdge: InitiativeEdge,
ProjectMilestone: ProjectMilestone,
AiPromptRules: AiPromptRules,
Post: Post,
ExternalUser: ExternalUser,
AgentSession: AgentSession,
AgentActivityConnection: AgentActivityConnection,
AgentActivityEdge: AgentActivityEdge,
AgentActivity: AgentActivity,
AgentActivityThoughtContent: AgentActivityThoughtContent,
AgentActivityActionContent: AgentActivityActionContent,
AgentActivityResponseContent: AgentActivityResponseContent,
AgentActivityPromptContent: AgentActivityPromptContent,
AgentActivityErrorContent: AgentActivityErrorContent,
AgentActivityElicitationContent: AgentActivityElicitationContent,
AgentSessionToPullRequestConnection: AgentSessionToPullRequestConnection,
AgentSessionToPullRequestEdge: AgentSessionToPullRequestEdge,
AgentSessionToPullRequest: AgentSessionToPullRequest,
PullRequest: PullRequest,
PullRequestMergeSettings: PullRequestMergeSettings,
PullRequestCommit: PullRequestCommit,
AgentSessionConnection: AgentSessionConnection,
AgentSessionEdge: AgentSessionEdge,
ActorBot: ActorBot,
SyncedExternalThread: SyncedExternalThread,
ExternalEntityInfo: ExternalEntityInfo,
ExternalEntityInfoGithubMetadata: ExternalEntityInfoGithubMetadata,
ExternalEntityInfoJiraMetadata: ExternalEntityInfoJiraMetadata,
ExternalEntitySlackMetadata: ExternalEntitySlackMetadata,
Favorite: Favorite,
FavoriteConnection: FavoriteConnection,
FavoriteEdge: FavoriteEdge,
CustomView: CustomView,
FeedItemConnection: FeedItemConnection,
FeedItemEdge: FeedItemEdge,
FeedItem: FeedItem,
ViewPreferences: ViewPreferences,
ViewPreferencesValues: ViewPreferencesValues,
IssueLabel: IssueLabel,
IssueLabelConnection: IssueLabelConnection,
IssueLabelEdge: IssueLabelEdge,
ProjectLabel: ProjectLabel,
ProjectLabelConnection: ProjectLabelConnection,
ProjectLabelEdge: ProjectLabelEdge,
Customer: Customer,
CustomerStatus: CustomerStatus,
CustomerTier: CustomerTier,
Integration: Integration,
Dashboard: Dashboard,
Release: Release,
ReleasePipeline: ReleasePipeline,
ReleaseStageConnection: ReleaseStageConnection,
ReleaseStageEdge: ReleaseStageEdge,
ReleaseStage: ReleaseStage,
ReleaseConnection: ReleaseConnection,
ReleaseEdge: ReleaseEdge,
InitiativeToProjectConnection: InitiativeToProjectConnection,
InitiativeToProjectEdge: InitiativeToProjectEdge,
InitiativeToProject: InitiativeToProject,
TeamConnection: TeamConnection,
TeamEdge: TeamEdge,
UserConnection: UserConnection,
UserEdge: UserEdge,
ProjectUpdateConnection: ProjectUpdateConnection,
ProjectUpdateEdge: ProjectUpdateEdge,
ProjectMilestoneConnection: ProjectMilestoneConnection,
ProjectMilestoneEdge: ProjectMilestoneEdge,
ProjectHistoryConnection: ProjectHistoryConnection,
ProjectHistoryEdge: ProjectHistoryEdge,
ProjectHistory: ProjectHistory,
ProjectRelationConnection: ProjectRelationConnection,
ProjectRelationEdge: ProjectRelationEdge,
ProjectRelation: ProjectRelation,
CustomerNeedConnection: CustomerNeedConnection,
CustomerNeedEdge: CustomerNeedEdge,
CustomerNeed: CustomerNeed,
Attachment: Attachment,
ProjectAttachment: ProjectAttachment,
IssueHistoryConnection: IssueHistoryConnection,
IssueHistoryEdge: IssueHistoryEdge,
IssueHistory: IssueHistory,
IssueRelationHistoryPayload: IssueRelationHistoryPayload,
IssueImport: IssueImport,
IssueHistoryTriageRuleMetadata: IssueHistoryTriageRuleMetadata,
IssueHistoryTriageRuleError: IssueHistoryTriageRuleError,
WorkflowDefinition: WorkflowDefinition,
IssueRelationConnection: IssueRelationConnection,
IssueRelationEdge: IssueRelationEdge,
IssueRelation: IssueRelation,
AttachmentConnection: AttachmentConnection,
AttachmentEdge: AttachmentEdge,
IssueSuggestionConnection: IssueSuggestionConnection,
IssueSuggestionEdge: IssueSuggestionEdge,
IssueSuggestion: IssueSuggestion,
IssueSuggestionMetadata: IssueSuggestionMetadata,
IssueStateSpanConnection: IssueStateSpanConnection,
IssueStateSpanEdge: IssueStateSpanEdge,
IssueStateSpan: IssueStateSpan,
CycleConnection: CycleConnection,
CycleEdge: CycleEdge,
TriageResponsibility: TriageResponsibility,
TriageResponsibilityManualSelection: TriageResponsibilityManualSelection,
TimeSchedule: TimeSchedule,
TimeScheduleEntry: TimeScheduleEntry,
TeamMembership: TeamMembership,
TeamMembershipConnection: TeamMembershipConnection,
TeamMembershipEdge: TeamMembershipEdge,
WorkflowStateConnection: WorkflowStateConnection,
WorkflowStateEdge: WorkflowStateEdge,
GitAutomationStateConnection: GitAutomationStateConnection,
GitAutomationStateEdge: GitAutomationStateEdge,
GitAutomationState: GitAutomationState,
GitAutomationTargetBranch: GitAutomationTargetBranch,
TemplateConnection: TemplateConnection,
TemplateEdge: TemplateEdge,
WebhookConnection: WebhookConnection,
WebhookEdge: WebhookEdge,
Webhook: Webhook,
WebhookFailureEvent: WebhookFailureEvent,
OrganizationIpRestriction: OrganizationIpRestriction,
IntegrationConnection: IntegrationConnection,
IntegrationEdge: IntegrationEdge,
PaidSubscription: PaidSubscription,
IdentityProvider: IdentityProvider,
IssueDraftConnection: IssueDraftConnection,
IssueDraftEdge: IssueDraftEdge,
IssueDraft: IssueDraft,
DraftConnection: DraftConnection,
DraftEdge: DraftEdge,
Draft: Draft,
FacetConnection: FacetConnection,
FacetEdge: FacetEdge,
CustomViewNotificationSubscription: CustomViewNotificationSubscription,
CycleNotificationSubscription: CycleNotificationSubscription,
LabelNotificationSubscription: LabelNotificationSubscription,
ProjectNotificationSubscription: ProjectNotificationSubscription,
InitiativeNotificationSubscription: InitiativeNotificationSubscription,
TeamNotificationSubscription: TeamNotificationSubscription,
UserNotificationSubscription: UserNotificationSubscription,
IssueNotification: IssueNotification,
ProjectNotification: ProjectNotification,
InitiativeNotification: InitiativeNotification,
OauthClientApprovalNotification: OauthClientApprovalNotification,
OauthClientApproval: OauthClientApproval,
DocumentNotification: DocumentNotification,
PostNotification: PostNotification,
CustomerNeedNotification: CustomerNeedNotification,
CustomerNotification: CustomerNotification,
PullRequestNotification: PullRequestNotification,
UserSettings: UserSettings,
NotificationDeliveryPreferences: NotificationDeliveryPreferences,
NotificationDeliveryPreferencesChannel: NotificationDeliveryPreferencesChannel,
NotificationDeliveryPreferencesSchedule: NotificationDeliveryPreferencesSchedule,
NotificationDeliveryPreferencesDay: NotificationDeliveryPreferencesDay,
NotificationCategoryPreferences: NotificationCategoryPreferences,
NotificationChannelPreferences: NotificationChannelPreferences,
UserSettingsTheme: UserSettingsTheme,
UserSettingsCustomTheme: UserSettingsCustomTheme,
UserSettingsCustomSidebarTheme: UserSettingsCustomSidebarTheme,
AuthenticationSessionResponse: AuthenticationSessionResponse,
TriageResponsibilityConnection: TriageResponsibilityConnection,
TriageResponsibilityEdge: TriageResponsibilityEdge,
TimeScheduleConnection: TimeScheduleConnection,
TimeScheduleEdge: TimeScheduleEdge,
ProjectFilterSuggestionPayload: ProjectFilterSuggestionPayload,
SemanticSearchPayload: SemanticSearchPayload,
SemanticSearchResult: SemanticSearchResult,
DocumentSearchPayload: DocumentSearchPayload,
DocumentSearchResultEdge: DocumentSearchResultEdge,
DocumentSearchResult: DocumentSearchResult,
ArchiveResponse: ArchiveResponse,
ProjectSearchPayload: ProjectSearchPayload,
ProjectSearchResultEdge: ProjectSearchResultEdge,
ProjectSearchResult: ProjectSearchResult,
IssueSearchPayload: IssueSearchPayload,
IssueSearchResultEdge: IssueSearchResultEdge,
IssueSearchResult: IssueSearchResult,
RoadmapToProjectConnection: RoadmapToProjectConnection,
RoadmapToProjectEdge: RoadmapToProjectEdge,
RoadmapToProject: RoadmapToProject,
Roadmap: Roadmap,
RoadmapConnection: RoadmapConnection,
RoadmapEdge: RoadmapEdge,
ReleasePipelineConnection: ReleasePipelineConnection,
ReleasePipelineEdge: ReleasePipelineEdge,
RateLimitPayload: RateLimitPayload,
RateLimitResultPayload: RateLimitResultPayload,
PushSubscriptionTestPayload: PushSubscriptionTestPayload,
ProjectStatusConnection: ProjectStatusConnection,
ProjectStatusEdge: ProjectStatusEdge,
ProjectStatusCountPayload: ProjectStatusCountPayload,
OrganizationExistsPayload: OrganizationExistsPayload,
OrganizationMeta: OrganizationMeta,
OrganizationInviteConnection: OrganizationInviteConnection,
OrganizationInviteEdge: OrganizationInviteEdge,
OrganizationInvite: OrganizationInvite,
OrganizationInviteFullDetailsPayload: OrganizationInviteFullDetailsPayload,
OrganizationAcceptedOrExpiredInviteDetailsPayload: OrganizationAcceptedOrExpiredInviteDetailsPayload,
OrganizationDomainClaimPayload: OrganizationDomainClaimPayload,
NotificationSubscriptionConnection: NotificationSubscriptionConnection,
NotificationSubscriptionEdge: NotificationSubscriptionEdge,
NotificationConnection: NotificationConnection,
NotificationEdge: NotificationEdge,
IssueToReleaseConnection: IssueToReleaseConnection,
IssueToReleaseEdge: IssueToReleaseEdge,
IssueToRelease: IssueToRelease,
IssuePriorityValue: IssuePriorityValue,
IssueFilterSuggestionPayload: IssueFilterSuggestionPayload,
RepositorySuggestionsPayload: RepositorySuggestionsPayload,
RepositorySuggestion: RepositorySuggestion,
IssueImportCheckPayload: IssueImportCheckPayload,
IssueImportSyncCheckPayload: IssueImportSyncCheckPayload,
IssueImportJqlCheckPayload: IssueImportJqlCheckPayload,
IntegrationTemplateConnection: IntegrationTemplateConnection,
IntegrationTemplateEdge: IntegrationTemplateEdge,
IntegrationTemplate: IntegrationTemplate,
GitHubEnterpriseServerInstallVerificationPayload: GitHubEnterpriseServerInstallVerificationPayload,
IntegrationHasScopesPayload: IntegrationHasScopesPayload,
InitiativeRelationConnection: InitiativeRelationConnection,
InitiativeRelationEdge: InitiativeRelationEdge,
InitiativeRelation: InitiativeRelation,
FetchDataPayload: FetchDataPayload,
ExternalUserConnection: ExternalUserConnection,
ExternalUserEdge: ExternalUserEdge,
EmojiConnection: EmojiConnection,
EmojiEdge: EmojiEdge,
Emoji: Emoji,
EmailIntakeAddress: EmailIntakeAddress,
SesDomainIdentity: SesDomainIdentity,
SesDomainIdentityDnsRecord: SesDomainIdentityDnsRecord,
DocumentContentHistoryPayload: DocumentContentHistoryPayload,
DocumentContentHistoryType: DocumentContentHistoryType,
CustomerTierConnection: CustomerTierConnection,
CustomerTierEdge: CustomerTierEdge,
CustomerStatusConnection: CustomerStatusConnection,
CustomerStatusEdge: CustomerStatusEdge,
CustomerConnection: CustomerConnection,
CustomerEdge: CustomerEdge,
IssueTitleSuggestionFromCustomerRequestPayload: IssueTitleSuggestionFromCustomerRequestPayload,
CustomViewConnection: CustomViewConnection,
CustomViewEdge: CustomViewEdge,
CustomViewSuggestionPayload: CustomViewSuggestionPayload,
CustomViewHasSubscribersPayload: CustomViewHasSubscribersPayload,
AuthResolverResponse: AuthResolverResponse,
AuthUser: AuthUser,
AuthOrganization: AuthOrganization,
AuthIdentityProvider: AuthIdentityProvider,
SsoUrlFromEmailResponse: SsoUrlFromEmailResponse,
AuditEntryType: AuditEntryType,
AuditEntryConnection: AuditEntryConnection,
AuditEntryEdge: AuditEntryEdge,
AuditEntry: AuditEntry,
AttachmentSourcesPayload: AttachmentSourcesPayload,
AsksWebSettings: AsksWebSettings,
Application: Application,
WorkflowStatePayload: WorkflowStatePayload,
WorkflowStateArchivePayload: WorkflowStateArchivePayload,
WebhookPayload: WebhookPayload,
DeletePayload: DeletePayload,
WebhookRotateSecretPayload: WebhookRotateSecretPayload,
ViewPreferencesPayload: ViewPreferencesPayload,
UserSettingsPayload: UserSettingsPayload,
UserSettingsFlagsResetPayload: UserSettingsFlagsResetPayload,
UserSettingsFlagPayload: UserSettingsFlagPayload,
UserPayload: UserPayload,
UserAdminPayload: UserAdminPayload,
TriageResponsibilityPayload: TriageResponsibilityPayload,
TimeSchedulePayload: TimeSchedulePayload,
TemplatePayload: TemplatePayload,
ProjectPayload: ProjectPayload,
SuccessPayload: SuccessPayload,
ProjectArchivePayload: ProjectArchivePayload,
TeamPayload: TeamPayload,
TeamArchivePayload: TeamArchivePayload,
TeamMembershipPayload: TeamMembershipPayload,
RoadmapToProjectPayload: RoadmapToProjectPayload,
RoadmapPayload: RoadmapPayload,
RoadmapArchivePayload: RoadmapArchivePayload,
CreateCsvExportReportPayload: CreateCsvExportReportPayload,
ReleaseStagePayload: ReleaseStagePayload,
ReleaseStageArchivePayload: ReleaseStageArchivePayload,
ReleasePayload: ReleasePayload,
ReleaseArchivePayload: ReleaseArchivePayload,
ReleasePipelinePayload: ReleasePipelinePayload,
ReleasePipelineArchivePayload: ReleasePipelineArchivePayload,
ReactionPayload: ReactionPayload,
PushSubscriptionPayload: PushSubscriptionPayload,
PushSubscription: PushSubscription,
ProjectUpdatePayload: ProjectUpdatePayload,
ProjectUpdateArchivePayload: ProjectUpdateArchivePayload,
ProjectUpdateReminderPayload: ProjectUpdateReminderPayload,
ProjectStatusPayload: ProjectStatusPayload,
ProjectStatusArchivePayload: ProjectStatusArchivePayload,
ProjectRelationPayload: ProjectRelationPayload,
ProjectMilestonePayload: ProjectMilestonePayload,
ProjectMilestoneMovePayload: ProjectMilestoneMovePayload,
ProjectMilestoneMoveIssueToTeam: ProjectMilestoneMoveIssueToTeam,
ProjectMilestoneMoveProjectTeams: ProjectMilestoneMoveProjectTeams,
ProjectLabelPayload: ProjectLabelPayload,
OrganizationPayload: OrganizationPayload,
OrganizationDeletePayload: OrganizationDeletePayload,
OrganizationCancelDeletePayload: OrganizationCancelDeletePayload,
OrganizationStartTrialPayload: OrganizationStartTrialPayload,
OrganizationInvitePayload: OrganizationInvitePayload,
OrganizationDomainSimplePayload: OrganizationDomainSimplePayload,
OrganizationDomainPayload: OrganizationDomainPayload,
OrganizationDomain: OrganizationDomain,
NotificationSubscriptionPayload: NotificationSubscriptionPayload,
NotificationPayload: NotificationPayload,
NotificationBatchActionPayload: NotificationBatchActionPayload,
NotificationArchivePayload: NotificationArchivePayload,
IssueToReleasePayload: IssueToReleasePayload,
IssuePayload: IssuePayload,
IssueBatchPayload: IssueBatchPayload,
IssueArchivePayload: IssueArchivePayload,
IssueRelationPayload: IssueRelationPayload,
IssueLabelPayload: IssueLabelPayload,
IssueImportPayload: IssueImportPayload,
IssueImportDeletePayload: IssueImportDeletePayload,
IntegrationsSettingsPayload: IntegrationsSettingsPayload,
IntegrationTemplatePayload: IntegrationTemplatePayload,
IntegrationPayload: IntegrationPayload,
GitHubCommitIntegrationPayload: GitHubCommitIntegrationPayload,
GitHubEnterpriseServerPayload: GitHubEnterpriseServerPayload,
GitLabIntegrationCreatePayload: GitLabIntegrationCreatePayload,
GitLabTestConnectionPayload: GitLabTestConnectionPayload,
IntegrationSlackWorkspaceNamePayload: IntegrationSlackWorkspaceNamePayload,
AsksChannelConnectPayload: AsksChannelConnectPayload,
SlackChannelNameMapping: SlackChannelNameMapping,
SlackAsksTeamSettings: SlackAsksTeamSettings,
SlackChannelConnectPayload: SlackChannelConnectPayload,
IntegrationRequestPayload: IntegrationRequestPayload,
InitiativeUpdatePayload: InitiativeUpdatePayload,
InitiativeUpdateArchivePayload: InitiativeUpdateArchivePayload,
InitiativeUpdateReminderPayload: InitiativeUpdateReminderPayload,
InitiativeToProjectPayload: InitiativeToProjectPayload,
InitiativePayload: InitiativePayload,
InitiativeArchivePayload: InitiativeArchivePayload,
InitiativeRelationPayload: InitiativeRelationPayload,
GitAutomationTargetBranchPayload: GitAutomationTargetBranchPayload,
GitAutomationStatePayload: GitAutomationStatePayload,
UploadPayload: UploadPayload,
UploadFile: UploadFile,
UploadFileHeader: UploadFileHeader,
ImageUploadFromUrlPayload: ImageUploadFromUrlPayload,
FileUploadDeletePayload: FileUploadDeletePayload,
FavoritePayload: FavoritePayload,
EntityExternalLinkPayload: EntityExternalLinkPayload,
EmojiPayload: EmojiPayload,
EmailUnsubscribePayload: EmailUnsubscribePayload,
EmailIntakeAddressPayload: EmailIntakeAddressPayload,
DocumentPayload: DocumentPayload,
DocumentArchivePayload: DocumentArchivePayload,
CyclePayload: CyclePayload,
CycleArchivePayload: CycleArchivePayload,
CustomerTierPayload: CustomerTierPayload,
CustomerStatusPayload: CustomerStatusPayload,
CustomerPayload: CustomerPayload,
CustomerNeedPayload: CustomerNeedPayload,
CustomerNeedUpdatePayload: CustomerNeedUpdatePayload,
CustomerNeedArchivePayload: CustomerNeedArchivePayload,
CustomViewPayload: CustomViewPayload,
ContactPayload: ContactPayload,
CommentPayload: CommentPayload,
EmailUserAccountAuthChallengeResponse: EmailUserAccountAuthChallengeResponse,
PasskeyLoginStartResponse: PasskeyLoginStartResponse,
CreateOrJoinOrganizationResponse: CreateOrJoinOrganizationResponse,
LogoutResponse: LogoutResponse,
AttachmentPayload: AttachmentPayload,
FrontAttachmentPayload: FrontAttachmentPayload,
AgentSessionPayload: AgentSessionPayload,
AgentActivityPayload: AgentActivityPayload,
AgentActivityContent: AgentActivityContent,
ExternalEntityInfoMetadata: ExternalEntityInfoMetadata,
OrganizationInviteDetailsPayload: OrganizationInviteDetailsPayload,
NotificationSubscription: NotificationSubscription,
Entity: Entity,
Node: Node,
Notification: Notification,
ArchivePayload: ArchivePayload
}


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                                Root
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


/**
* Build type-safe selection set for Query.
*/
export interface Query {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for Mutation.
*/
export interface Mutation {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation>):
              $SelectionSet
          
}


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                            OutputObject
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


/**
* A customer notification subscription.
*
* Build type-safe selection set for CustomerNotificationSubscription.
*/
export interface CustomerNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNotificationSubscription>):
              $SelectionSet
          
}

/**
* A user that has access to the the resources of an organization.
*
* Build type-safe selection set for User.
*/
export interface User {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.User>):
              $SelectionSet
          
}

/**
* An organization. Organizations are root-level objects that contain user accounts and teams.
*
* Build type-safe selection set for Organization.
*/
export interface Organization {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Organization>):
              $SelectionSet
          
}

/**
* A facet. Facets are joins between entities. A facet can tie a custom view to a project, or a a project to a roadmap for example.
*
* Build type-safe selection set for Facet.
*/
export interface Facet {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Facet>):
              $SelectionSet
          
}

/**
* An organizational unit that contains issues.
*
* Build type-safe selection set for Team.
*/
export interface Team {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Team>):
              $SelectionSet
          
}

/**
* A state in a team workflow.
*
* Build type-safe selection set for WorkflowState.
*/
export interface WorkflowState {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowState>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueConnection.
*/
export interface IssueConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueEdge.
*/
export interface IssueEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueEdge>):
              $SelectionSet
          
}

/**
* An issue.
*
* Build type-safe selection set for Issue.
*/
export interface Issue {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Issue>):
              $SelectionSet
          
}

/**
* A set of issues to be resolved in a specified amount of time.
*
* Build type-safe selection set for Cycle.
*/
export interface Cycle {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Cycle>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentConnection.
*/
export interface DocumentConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentEdge.
*/
export interface DocumentEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentEdge>):
              $SelectionSet
          
}

/**
* A document that can be attached to different entities.
*
* Build type-safe selection set for Document.
*/
export interface Document {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Document>):
              $SelectionSet
          
}

/**
* A project.
*
* Build type-safe selection set for Project.
*/
export interface Project {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Project>):
              $SelectionSet
          
}

/**
* A project status.
*
* Build type-safe selection set for ProjectStatus.
*/
export interface ProjectStatus {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatus>):
              $SelectionSet
          
}

/**
* A template object used for creating entities faster.
*
* Build type-safe selection set for Template.
*/
export interface Template {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Template>):
              $SelectionSet
          
}

/**
* An update associated with a project.
*
* Build type-safe selection set for ProjectUpdate.
*/
export interface ProjectUpdate {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdate>):
              $SelectionSet
          
}

/**
* A reaction associated with a comment or a project update.
*
* Build type-safe selection set for Reaction.
*/
export interface Reaction {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Reaction>):
              $SelectionSet
          
}

/**
* A comment associated with an issue.
*
* Build type-safe selection set for Comment.
*/
export interface Comment {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Comment>):
              $SelectionSet
          
}

/**
* A document content for a project.
*
* Build type-safe selection set for DocumentContent.
*/
export interface DocumentContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentContent>):
              $SelectionSet
          
}

/**
* An initiative to group projects.
*
* Build type-safe selection set for Initiative.
*/
export interface Initiative {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Initiative>):
              $SelectionSet
          
}

/**
* An initiative update.
*
* Build type-safe selection set for InitiativeUpdate.
*/
export interface InitiativeUpdate {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdate>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CommentConnection.
*/
export interface CommentConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CommentConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CommentEdge.
*/
export interface CommentEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CommentEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for PageInfo.
*/
export interface PageInfo {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PageInfo>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectConnection.
*/
export interface ProjectConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectEdge.
*/
export interface ProjectEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EntityExternalLinkConnection.
*/
export interface EntityExternalLinkConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EntityExternalLinkConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EntityExternalLinkEdge.
*/
export interface EntityExternalLinkEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EntityExternalLinkEdge>):
              $SelectionSet
          
}

/**
* An external link for an entity like initiative, etc...
*
* Build type-safe selection set for EntityExternalLink.
*/
export interface EntityExternalLink {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EntityExternalLink>):
              $SelectionSet
          
}

/**
* The configuration of all integrations for different entities.
*
* Build type-safe selection set for IntegrationsSettings.
*/
export interface IntegrationsSettings {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationsSettings>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeHistoryConnection.
*/
export interface InitiativeHistoryConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeHistoryConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeHistoryEdge.
*/
export interface InitiativeHistoryEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeHistoryEdge>):
              $SelectionSet
          
}

/**
* A initiative history containing relevant change events.
*
* Build type-safe selection set for InitiativeHistory.
*/
export interface InitiativeHistory {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeHistory>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeUpdateConnection.
*/
export interface InitiativeUpdateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeUpdateEdge.
*/
export interface InitiativeUpdateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdateEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeConnection.
*/
export interface InitiativeConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeEdge.
*/
export interface InitiativeEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeEdge>):
              $SelectionSet
          
}

/**
* A milestone for a project.
*
* Build type-safe selection set for ProjectMilestone.
*/
export interface ProjectMilestone {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestone>):
              $SelectionSet
          
}

/**
* AI prompt rules for a team.
*
* Build type-safe selection set for AiPromptRules.
*/
export interface AiPromptRules {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AiPromptRules>):
              $SelectionSet
          
}

/**
* [Internal] A generic post.
*
* Build type-safe selection set for Post.
*/
export interface Post {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Post>):
              $SelectionSet
          
}

/**
* An external authenticated (e.g., through Slack) user which doesn't have a Linear account, but can create and update entities in Linear from the external system that authenticated them.
*
* Build type-safe selection set for ExternalUser.
*/
export interface ExternalUser {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalUser>):
              $SelectionSet
          
}

/**
* A session for agent activities and state management.
*
* Build type-safe selection set for AgentSession.
*/
export interface AgentSession {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSession>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentActivityConnection.
*/
export interface AgentActivityConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentActivityEdge.
*/
export interface AgentActivityEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityEdge>):
              $SelectionSet
          
}

/**
* An activity within an agent context.
*
* Build type-safe selection set for AgentActivity.
*/
export interface AgentActivity {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivity>):
              $SelectionSet
          
}

/**
* Content for a thought activity.
*
* Build type-safe selection set for AgentActivityThoughtContent.
*/
export interface AgentActivityThoughtContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityThoughtContent>):
              $SelectionSet
          
}

/**
* Content for an action activity (tool call or action).
*
* Build type-safe selection set for AgentActivityActionContent.
*/
export interface AgentActivityActionContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityActionContent>):
              $SelectionSet
          
}

/**
* Content for a response activity.
*
* Build type-safe selection set for AgentActivityResponseContent.
*/
export interface AgentActivityResponseContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityResponseContent>):
              $SelectionSet
          
}

/**
* Content for a prompt activity.
*
* Build type-safe selection set for AgentActivityPromptContent.
*/
export interface AgentActivityPromptContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityPromptContent>):
              $SelectionSet
          
}

/**
* Content for an error activity.
*
* Build type-safe selection set for AgentActivityErrorContent.
*/
export interface AgentActivityErrorContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityErrorContent>):
              $SelectionSet
          
}

/**
* Content for an elicitation activity.
*
* Build type-safe selection set for AgentActivityElicitationContent.
*/
export interface AgentActivityElicitationContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityElicitationContent>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentSessionToPullRequestConnection.
*/
export interface AgentSessionToPullRequestConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionToPullRequestConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentSessionToPullRequestEdge.
*/
export interface AgentSessionToPullRequestEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionToPullRequestEdge>):
              $SelectionSet
          
}

/**
* Join table between agent sessions and pull requests.
*
* Build type-safe selection set for AgentSessionToPullRequest.
*/
export interface AgentSessionToPullRequest {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionToPullRequest>):
              $SelectionSet
          
}

/**
* [Internal] A pull request in a version control system.
*
* Build type-safe selection set for PullRequest.
*/
export interface PullRequest {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PullRequest>):
              $SelectionSet
          
}

/**
* [Internal] Merge settings for a pull request
*
* Build type-safe selection set for PullRequestMergeSettings.
*/
export interface PullRequestMergeSettings {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PullRequestMergeSettings>):
              $SelectionSet
          
}

/**
* [ALPHA] A pull request commit.
*
* Build type-safe selection set for PullRequestCommit.
*/
export interface PullRequestCommit {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PullRequestCommit>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentSessionConnection.
*/
export interface AgentSessionConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentSessionEdge.
*/
export interface AgentSessionEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionEdge>):
              $SelectionSet
          
}

/**
* A bot actor is an actor that is not a user, but an application or integration.
*
* Build type-safe selection set for ActorBot.
*/
export interface ActorBot {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ActorBot>):
              $SelectionSet
          
}

/**
* A comment thread that is synced with an external source.
*
* Build type-safe selection set for SyncedExternalThread.
*/
export interface SyncedExternalThread {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SyncedExternalThread>):
              $SelectionSet
          
}

/**
* Information about an external entity.
*
* Build type-safe selection set for ExternalEntityInfo.
*/
export interface ExternalEntityInfo {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalEntityInfo>):
              $SelectionSet
          
}

/**
* Metadata about the external GitHub entity.
*
* Build type-safe selection set for ExternalEntityInfoGithubMetadata.
*/
export interface ExternalEntityInfoGithubMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalEntityInfoGithubMetadata>):
              $SelectionSet
          
}

/**
* Metadata about the external Jira entity.
*
* Build type-safe selection set for ExternalEntityInfoJiraMetadata.
*/
export interface ExternalEntityInfoJiraMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalEntityInfoJiraMetadata>):
              $SelectionSet
          
}

/**
* Metadata about the external Slack entity.
*
* Build type-safe selection set for ExternalEntitySlackMetadata.
*/
export interface ExternalEntitySlackMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalEntitySlackMetadata>):
              $SelectionSet
          
}

/**
* User favorites presented in the sidebar.
*
* Build type-safe selection set for Favorite.
*/
export interface Favorite {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Favorite>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FavoriteConnection.
*/
export interface FavoriteConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FavoriteConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FavoriteEdge.
*/
export interface FavoriteEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FavoriteEdge>):
              $SelectionSet
          
}

/**
* A custom view that has been saved by a user.
*
* Build type-safe selection set for CustomView.
*/
export interface CustomView {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomView>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FeedItemConnection.
*/
export interface FeedItemConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FeedItemConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FeedItemEdge.
*/
export interface FeedItemEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FeedItemEdge>):
              $SelectionSet
          
}

/**
* [Internal] An item in a users feed.
*
* Build type-safe selection set for FeedItem.
*/
export interface FeedItem {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FeedItem>):
              $SelectionSet
          
}

/**
* View preferences.
*
* Build type-safe selection set for ViewPreferences.
*/
export interface ViewPreferences {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ViewPreferences>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ViewPreferencesValues.
*/
export interface ViewPreferencesValues {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ViewPreferencesValues>):
              $SelectionSet
          
}

/**
* Labels that can be associated with issues.
*
* Build type-safe selection set for IssueLabel.
*/
export interface IssueLabel {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueLabel>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueLabelConnection.
*/
export interface IssueLabelConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueLabelConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueLabelEdge.
*/
export interface IssueLabelEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueLabelEdge>):
              $SelectionSet
          
}

/**
* Labels that can be associated with projects.
*
* Build type-safe selection set for ProjectLabel.
*/
export interface ProjectLabel {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectLabel>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectLabelConnection.
*/
export interface ProjectLabelConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectLabelConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectLabelEdge.
*/
export interface ProjectLabelEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectLabelEdge>):
              $SelectionSet
          
}

/**
* A customer whose needs will be tied to issues or projects.
*
* Build type-safe selection set for Customer.
*/
export interface Customer {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Customer>):
              $SelectionSet
          
}

/**
* A customer status.
*
* Build type-safe selection set for CustomerStatus.
*/
export interface CustomerStatus {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerStatus>):
              $SelectionSet
          
}

/**
* A customer tier.
*
* Build type-safe selection set for CustomerTier.
*/
export interface CustomerTier {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerTier>):
              $SelectionSet
          
}

/**
* An integration with an external service.
*
* Build type-safe selection set for Integration.
*/
export interface Integration {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Integration>):
              $SelectionSet
          
}

/**
* [Internal] A dashboard, usually a collection of widgets to display several insights at once.
*
* Build type-safe selection set for Dashboard.
*/
export interface Dashboard {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Dashboard>):
              $SelectionSet
          
}

/**
* [Internal] A release.
*
* Build type-safe selection set for Release.
*/
export interface Release {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Release>):
              $SelectionSet
          
}

/**
* [Internal] A release pipeline.
*
* Build type-safe selection set for ReleasePipeline.
*/
export interface ReleasePipeline {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePipeline>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleaseStageConnection.
*/
export interface ReleaseStageConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseStageConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleaseStageEdge.
*/
export interface ReleaseStageEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseStageEdge>):
              $SelectionSet
          
}

/**
* [Internal] A release stage.
*
* Build type-safe selection set for ReleaseStage.
*/
export interface ReleaseStage {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseStage>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleaseConnection.
*/
export interface ReleaseConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleaseEdge.
*/
export interface ReleaseEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeToProjectConnection.
*/
export interface InitiativeToProjectConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeToProjectConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeToProjectEdge.
*/
export interface InitiativeToProjectEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeToProjectEdge>):
              $SelectionSet
          
}

/**
* Join table between projects and initiatives.
*
* Build type-safe selection set for InitiativeToProject.
*/
export interface InitiativeToProject {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeToProject>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamConnection.
*/
export interface TeamConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamEdge.
*/
export interface TeamEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserConnection.
*/
export interface UserConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserEdge.
*/
export interface UserEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectUpdateConnection.
*/
export interface ProjectUpdateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectUpdateEdge.
*/
export interface ProjectUpdateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdateEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestoneConnection.
*/
export interface ProjectMilestoneConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestoneConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestoneEdge.
*/
export interface ProjectMilestoneEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestoneEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectHistoryConnection.
*/
export interface ProjectHistoryConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectHistoryConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectHistoryEdge.
*/
export interface ProjectHistoryEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectHistoryEdge>):
              $SelectionSet
          
}

/**
* An history associated with a project.
*
* Build type-safe selection set for ProjectHistory.
*/
export interface ProjectHistory {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectHistory>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectRelationConnection.
*/
export interface ProjectRelationConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectRelationConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectRelationEdge.
*/
export interface ProjectRelationEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectRelationEdge>):
              $SelectionSet
          
}

/**
* A relation between two projects.
*
* Build type-safe selection set for ProjectRelation.
*/
export interface ProjectRelation {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectRelation>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerNeedConnection.
*/
export interface CustomerNeedConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerNeedEdge.
*/
export interface CustomerNeedEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedEdge>):
              $SelectionSet
          
}

/**
* A customer need, expressed through a reference to an issue, project, or comment.
*
* Build type-safe selection set for CustomerNeed.
*/
export interface CustomerNeed {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeed>):
              $SelectionSet
          
}

/**
* Issue attachment (e.g. support ticket, pull request).
*
* Build type-safe selection set for Attachment.
*/
export interface Attachment {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Attachment>):
              $SelectionSet
          
}

/**
* Project attachment
*
* Build type-safe selection set for ProjectAttachment.
*/
export interface ProjectAttachment {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectAttachment>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueHistoryConnection.
*/
export interface IssueHistoryConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueHistoryConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueHistoryEdge.
*/
export interface IssueHistoryEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueHistoryEdge>):
              $SelectionSet
          
}

/**
* A record of changes to an issue.
*
* Build type-safe selection set for IssueHistory.
*/
export interface IssueHistory {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueHistory>):
              $SelectionSet
          
}

/**
* Issue relation history's payload.
*
* Build type-safe selection set for IssueRelationHistoryPayload.
*/
export interface IssueRelationHistoryPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueRelationHistoryPayload>):
              $SelectionSet
          
}

/**
* An import job for data from an external service.
*
* Build type-safe selection set for IssueImport.
*/
export interface IssueImport {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImport>):
              $SelectionSet
          
}

/**
* Metadata about a triage rule that made changes to an issue.
*
* Build type-safe selection set for IssueHistoryTriageRuleMetadata.
*/
export interface IssueHistoryTriageRuleMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueHistoryTriageRuleMetadata>):
              $SelectionSet
          
}

/**
* An error that occurred during triage rule execution.
*
* Build type-safe selection set for IssueHistoryTriageRuleError.
*/
export interface IssueHistoryTriageRuleError {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueHistoryTriageRuleError>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WorkflowDefinition.
*/
export interface WorkflowDefinition {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowDefinition>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueRelationConnection.
*/
export interface IssueRelationConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueRelationConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueRelationEdge.
*/
export interface IssueRelationEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueRelationEdge>):
              $SelectionSet
          
}

/**
* A relation between two issues.
*
* Build type-safe selection set for IssueRelation.
*/
export interface IssueRelation {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueRelation>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AttachmentConnection.
*/
export interface AttachmentConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AttachmentConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AttachmentEdge.
*/
export interface AttachmentEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AttachmentEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSuggestionConnection.
*/
export interface IssueSuggestionConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSuggestionConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSuggestionEdge.
*/
export interface IssueSuggestionEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSuggestionEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSuggestion.
*/
export interface IssueSuggestion {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSuggestion>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSuggestionMetadata.
*/
export interface IssueSuggestionMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSuggestionMetadata>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueStateSpanConnection.
*/
export interface IssueStateSpanConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueStateSpanConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueStateSpanEdge.
*/
export interface IssueStateSpanEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueStateSpanEdge>):
              $SelectionSet
          
}

/**
* A continuous period of time during which an issue remained in a specific workflow state.
*
* Build type-safe selection set for IssueStateSpan.
*/
export interface IssueStateSpan {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueStateSpan>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CycleConnection.
*/
export interface CycleConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CycleConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CycleEdge.
*/
export interface CycleEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CycleEdge>):
              $SelectionSet
          
}

/**
* A team's triage responsibility.
*
* Build type-safe selection set for TriageResponsibility.
*/
export interface TriageResponsibility {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TriageResponsibility>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TriageResponsibilityManualSelection.
*/
export interface TriageResponsibilityManualSelection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TriageResponsibilityManualSelection>):
              $SelectionSet
          
}

/**
* A time schedule.
*
* Build type-safe selection set for TimeSchedule.
*/
export interface TimeSchedule {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TimeSchedule>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TimeScheduleEntry.
*/
export interface TimeScheduleEntry {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TimeScheduleEntry>):
              $SelectionSet
          
}

/**
* Defines the membership of a user to a team.
*
* Build type-safe selection set for TeamMembership.
*/
export interface TeamMembership {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamMembership>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamMembershipConnection.
*/
export interface TeamMembershipConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamMembershipConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamMembershipEdge.
*/
export interface TeamMembershipEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamMembershipEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WorkflowStateConnection.
*/
export interface WorkflowStateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowStateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WorkflowStateEdge.
*/
export interface WorkflowStateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowStateEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitAutomationStateConnection.
*/
export interface GitAutomationStateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationStateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitAutomationStateEdge.
*/
export interface GitAutomationStateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationStateEdge>):
              $SelectionSet
          
}

/**
* A trigger that updates the issue status according to Git automations.
*
* Build type-safe selection set for GitAutomationState.
*/
export interface GitAutomationState {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationState>):
              $SelectionSet
          
}

/**
* A Git target branch for which there are automations (GitAutomationState).
*
* Build type-safe selection set for GitAutomationTargetBranch.
*/
export interface GitAutomationTargetBranch {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationTargetBranch>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TemplateConnection.
*/
export interface TemplateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TemplateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TemplateEdge.
*/
export interface TemplateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TemplateEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WebhookConnection.
*/
export interface WebhookConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WebhookConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WebhookEdge.
*/
export interface WebhookEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WebhookEdge>):
              $SelectionSet
          
}

/**
* A webhook used to send HTTP notifications over data updates.
*
* Build type-safe selection set for Webhook.
*/
export interface Webhook {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Webhook>):
              $SelectionSet
          
}

/**
* Entity representing a webhook execution failure.
*
* Build type-safe selection set for WebhookFailureEvent.
*/
export interface WebhookFailureEvent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WebhookFailureEvent>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationIpRestriction.
*/
export interface OrganizationIpRestriction {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationIpRestriction>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationConnection.
*/
export interface IntegrationConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationEdge.
*/
export interface IntegrationEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationEdge>):
              $SelectionSet
          
}

/**
* The paid subscription of an organization.
*
* Build type-safe selection set for PaidSubscription.
*/
export interface PaidSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PaidSubscription>):
              $SelectionSet
          
}

/**
* An identity provider.
*
* Build type-safe selection set for IdentityProvider.
*/
export interface IdentityProvider {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IdentityProvider>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueDraftConnection.
*/
export interface IssueDraftConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueDraftConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueDraftEdge.
*/
export interface IssueDraftEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueDraftEdge>):
              $SelectionSet
          
}

/**
* [Internal] A draft issue.
*
* Build type-safe selection set for IssueDraft.
*/
export interface IssueDraft {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueDraft>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DraftConnection.
*/
export interface DraftConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DraftConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DraftEdge.
*/
export interface DraftEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DraftEdge>):
              $SelectionSet
          
}

/**
* A general purpose draft. Used for comments, project updates, etc.
*
* Build type-safe selection set for Draft.
*/
export interface Draft {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Draft>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FacetConnection.
*/
export interface FacetConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FacetConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FacetEdge.
*/
export interface FacetEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FacetEdge>):
              $SelectionSet
          
}

/**
* A custom view notification subscription.
*
* Build type-safe selection set for CustomViewNotificationSubscription.
*/
export interface CustomViewNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewNotificationSubscription>):
              $SelectionSet
          
}

/**
* A cycle notification subscription.
*
* Build type-safe selection set for CycleNotificationSubscription.
*/
export interface CycleNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CycleNotificationSubscription>):
              $SelectionSet
          
}

/**
* A label notification subscription.
*
* Build type-safe selection set for LabelNotificationSubscription.
*/
export interface LabelNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.LabelNotificationSubscription>):
              $SelectionSet
          
}

/**
* A project notification subscription.
*
* Build type-safe selection set for ProjectNotificationSubscription.
*/
export interface ProjectNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectNotificationSubscription>):
              $SelectionSet
          
}

/**
* An initiative notification subscription.
*
* Build type-safe selection set for InitiativeNotificationSubscription.
*/
export interface InitiativeNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeNotificationSubscription>):
              $SelectionSet
          
}

/**
* A team notification subscription.
*
* Build type-safe selection set for TeamNotificationSubscription.
*/
export interface TeamNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamNotificationSubscription>):
              $SelectionSet
          
}

/**
* A user notification subscription.
*
* Build type-safe selection set for UserNotificationSubscription.
*/
export interface UserNotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserNotificationSubscription>):
              $SelectionSet
          
}

/**
* An issue related notification.
*
* Build type-safe selection set for IssueNotification.
*/
export interface IssueNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueNotification>):
              $SelectionSet
          
}

/**
* A project related notification.
*
* Build type-safe selection set for ProjectNotification.
*/
export interface ProjectNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectNotification>):
              $SelectionSet
          
}

/**
* An initiative related notification.
*
* Build type-safe selection set for InitiativeNotification.
*/
export interface InitiativeNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeNotification>):
              $SelectionSet
          
}

/**
* An oauth client approval related notification.
*
* Build type-safe selection set for OauthClientApprovalNotification.
*/
export interface OauthClientApprovalNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OauthClientApprovalNotification>):
              $SelectionSet
          
}

/**
* Request to install OAuth clients on organizations and the response to the request.
*
* Build type-safe selection set for OauthClientApproval.
*/
export interface OauthClientApproval {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OauthClientApproval>):
              $SelectionSet
          
}

/**
* A document related notification.
*
* Build type-safe selection set for DocumentNotification.
*/
export interface DocumentNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentNotification>):
              $SelectionSet
          
}

/**
* A post related notification.
*
* Build type-safe selection set for PostNotification.
*/
export interface PostNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PostNotification>):
              $SelectionSet
          
}

/**
* A customer need related notification.
*
* Build type-safe selection set for CustomerNeedNotification.
*/
export interface CustomerNeedNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedNotification>):
              $SelectionSet
          
}

/**
* A customer related notification.
*
* Build type-safe selection set for CustomerNotification.
*/
export interface CustomerNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNotification>):
              $SelectionSet
          
}

/**
* A pull request related notification.
*
* Build type-safe selection set for PullRequestNotification.
*/
export interface PullRequestNotification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PullRequestNotification>):
              $SelectionSet
          
}

/**
* The settings of a user as a JSON object.
*
* Build type-safe selection set for UserSettings.
*/
export interface UserSettings {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettings>):
              $SelectionSet
          
}

/**
* A user's notification delivery preferences.
*
* Build type-safe selection set for NotificationDeliveryPreferences.
*/
export interface NotificationDeliveryPreferences {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationDeliveryPreferences>):
              $SelectionSet
          
}

/**
* A user's notification delivery preferences.
*
* Build type-safe selection set for NotificationDeliveryPreferencesChannel.
*/
export interface NotificationDeliveryPreferencesChannel {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationDeliveryPreferencesChannel>):
              $SelectionSet
          
}

/**
* A user's notification delivery schedule for a particular day.
*
* Build type-safe selection set for NotificationDeliveryPreferencesSchedule.
*/
export interface NotificationDeliveryPreferencesSchedule {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationDeliveryPreferencesSchedule>):
              $SelectionSet
          
}

/**
* A user's notification delivery schedule for a particular day.
*
* Build type-safe selection set for NotificationDeliveryPreferencesDay.
*/
export interface NotificationDeliveryPreferencesDay {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationDeliveryPreferencesDay>):
              $SelectionSet
          
}

/**
* A user's notification category preferences.
*
* Build type-safe selection set for NotificationCategoryPreferences.
*/
export interface NotificationCategoryPreferences {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationCategoryPreferences>):
              $SelectionSet
          
}

/**
* A user's notification channel preferences, indicating if a channel is enabled or not
*
* Build type-safe selection set for NotificationChannelPreferences.
*/
export interface NotificationChannelPreferences {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationChannelPreferences>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsTheme.
*/
export interface UserSettingsTheme {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsTheme>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsCustomTheme.
*/
export interface UserSettingsCustomTheme {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsCustomTheme>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsCustomSidebarTheme.
*/
export interface UserSettingsCustomSidebarTheme {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsCustomSidebarTheme>):
              $SelectionSet
          
}

/**
* Authentication session information.
*
* Build type-safe selection set for AuthenticationSessionResponse.
*/
export interface AuthenticationSessionResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuthenticationSessionResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TriageResponsibilityConnection.
*/
export interface TriageResponsibilityConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TriageResponsibilityConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TriageResponsibilityEdge.
*/
export interface TriageResponsibilityEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TriageResponsibilityEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TimeScheduleConnection.
*/
export interface TimeScheduleConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TimeScheduleConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TimeScheduleEdge.
*/
export interface TimeScheduleEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TimeScheduleEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectFilterSuggestionPayload.
*/
export interface ProjectFilterSuggestionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectFilterSuggestionPayload>):
              $SelectionSet
          
}

/**
* Payload returned by semantic search.
*
* Build type-safe selection set for SemanticSearchPayload.
*/
export interface SemanticSearchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SemanticSearchPayload>):
              $SelectionSet
          
}

/**
* A semantic search result reference.
*
* Build type-safe selection set for SemanticSearchResult.
*/
export interface SemanticSearchResult {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SemanticSearchResult>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentSearchPayload.
*/
export interface DocumentSearchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentSearchPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentSearchResultEdge.
*/
export interface DocumentSearchResultEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentSearchResultEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentSearchResult.
*/
export interface DocumentSearchResult {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentSearchResult>):
              $SelectionSet
          
}

/**
* Contains requested archived model objects.
*
* Build type-safe selection set for ArchiveResponse.
*/
export interface ArchiveResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ArchiveResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectSearchPayload.
*/
export interface ProjectSearchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectSearchPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectSearchResultEdge.
*/
export interface ProjectSearchResultEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectSearchResultEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectSearchResult.
*/
export interface ProjectSearchResult {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectSearchResult>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSearchPayload.
*/
export interface IssueSearchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSearchPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSearchResultEdge.
*/
export interface IssueSearchResultEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSearchResultEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueSearchResult.
*/
export interface IssueSearchResult {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueSearchResult>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapToProjectConnection.
*/
export interface RoadmapToProjectConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapToProjectConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapToProjectEdge.
*/
export interface RoadmapToProjectEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapToProjectEdge>):
              $SelectionSet
          
}

/**
* [Deprecated] Join table between projects and roadmaps.
*
* Build type-safe selection set for RoadmapToProject.
*/
export interface RoadmapToProject {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapToProject>):
              $SelectionSet
          
}

/**
* [Deprecated] A roadmap for projects.
*
* Build type-safe selection set for Roadmap.
*/
export interface Roadmap {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Roadmap>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapConnection.
*/
export interface RoadmapConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapEdge.
*/
export interface RoadmapEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleasePipelineConnection.
*/
export interface ReleasePipelineConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePipelineConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleasePipelineEdge.
*/
export interface ReleasePipelineEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePipelineEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RateLimitPayload.
*/
export interface RateLimitPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RateLimitPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RateLimitResultPayload.
*/
export interface RateLimitResultPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RateLimitResultPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for PushSubscriptionTestPayload.
*/
export interface PushSubscriptionTestPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PushSubscriptionTestPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectStatusConnection.
*/
export interface ProjectStatusConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatusConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectStatusEdge.
*/
export interface ProjectStatusEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatusEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectStatusCountPayload.
*/
export interface ProjectStatusCountPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatusCountPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationExistsPayload.
*/
export interface OrganizationExistsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationExistsPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationMeta.
*/
export interface OrganizationMeta {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationMeta>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationInviteConnection.
*/
export interface OrganizationInviteConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInviteConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationInviteEdge.
*/
export interface OrganizationInviteEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInviteEdge>):
              $SelectionSet
          
}

/**
* An invitation to the organization that has been sent via email.
*
* Build type-safe selection set for OrganizationInvite.
*/
export interface OrganizationInvite {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInvite>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationInviteFullDetailsPayload.
*/
export interface OrganizationInviteFullDetailsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInviteFullDetailsPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationAcceptedOrExpiredInviteDetailsPayload.
*/
export interface OrganizationAcceptedOrExpiredInviteDetailsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationAcceptedOrExpiredInviteDetailsPayload>):
              $SelectionSet
          
}

/**
* [INTERNAL] Domain claim request response.
*
* Build type-safe selection set for OrganizationDomainClaimPayload.
*/
export interface OrganizationDomainClaimPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationDomainClaimPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationSubscriptionConnection.
*/
export interface NotificationSubscriptionConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationSubscriptionConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationSubscriptionEdge.
*/
export interface NotificationSubscriptionEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationSubscriptionEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationConnection.
*/
export interface NotificationConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationEdge.
*/
export interface NotificationEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueToReleaseConnection.
*/
export interface IssueToReleaseConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueToReleaseConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueToReleaseEdge.
*/
export interface IssueToReleaseEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueToReleaseEdge>):
              $SelectionSet
          
}

/**
* [Internal] Join table between issues and releases.
*
* Build type-safe selection set for IssueToRelease.
*/
export interface IssueToRelease {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueToRelease>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssuePriorityValue.
*/
export interface IssuePriorityValue {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssuePriorityValue>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueFilterSuggestionPayload.
*/
export interface IssueFilterSuggestionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueFilterSuggestionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RepositorySuggestionsPayload.
*/
export interface RepositorySuggestionsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RepositorySuggestionsPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RepositorySuggestion.
*/
export interface RepositorySuggestion {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RepositorySuggestion>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueImportCheckPayload.
*/
export interface IssueImportCheckPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImportCheckPayload>):
              $SelectionSet
          
}

/**
* Whether an issue import can be synced at the end of an import or not
*
* Build type-safe selection set for IssueImportSyncCheckPayload.
*/
export interface IssueImportSyncCheckPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImportSyncCheckPayload>):
              $SelectionSet
          
}

/**
* Whether a custom JQL query is valid or not
*
* Build type-safe selection set for IssueImportJqlCheckPayload.
*/
export interface IssueImportJqlCheckPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImportJqlCheckPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationTemplateConnection.
*/
export interface IntegrationTemplateConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationTemplateConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationTemplateEdge.
*/
export interface IntegrationTemplateEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationTemplateEdge>):
              $SelectionSet
          
}

/**
* Join table between templates and integrations.
*
* Build type-safe selection set for IntegrationTemplate.
*/
export interface IntegrationTemplate {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationTemplate>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitHubEnterpriseServerInstallVerificationPayload.
*/
export interface GitHubEnterpriseServerInstallVerificationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitHubEnterpriseServerInstallVerificationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationHasScopesPayload.
*/
export interface IntegrationHasScopesPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationHasScopesPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeRelationConnection.
*/
export interface InitiativeRelationConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeRelationConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeRelationEdge.
*/
export interface InitiativeRelationEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeRelationEdge>):
              $SelectionSet
          
}

/**
* A relation representing the dependency between two initiatives.
*
* Build type-safe selection set for InitiativeRelation.
*/
export interface InitiativeRelation {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeRelation>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FetchDataPayload.
*/
export interface FetchDataPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FetchDataPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ExternalUserConnection.
*/
export interface ExternalUserConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalUserConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ExternalUserEdge.
*/
export interface ExternalUserEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalUserEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmojiConnection.
*/
export interface EmojiConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmojiConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmojiEdge.
*/
export interface EmojiEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmojiEdge>):
              $SelectionSet
          
}

/**
* A custom emoji.
*
* Build type-safe selection set for Emoji.
*/
export interface Emoji {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Emoji>):
              $SelectionSet
          
}

/**
* An email address that can be used for submitting issues.
*
* Build type-safe selection set for EmailIntakeAddress.
*/
export interface EmailIntakeAddress {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmailIntakeAddress>):
              $SelectionSet
          
}

/**
* SES domain identity used for sending emails from a custom domain.
*
* Build type-safe selection set for SesDomainIdentity.
*/
export interface SesDomainIdentity {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SesDomainIdentity>):
              $SelectionSet
          
}

/**
* A DNS record for a SES domain identity.
*
* Build type-safe selection set for SesDomainIdentityDnsRecord.
*/
export interface SesDomainIdentityDnsRecord {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SesDomainIdentityDnsRecord>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentContentHistoryPayload.
*/
export interface DocumentContentHistoryPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentContentHistoryPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentContentHistoryType.
*/
export interface DocumentContentHistoryType {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentContentHistoryType>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerTierConnection.
*/
export interface CustomerTierConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerTierConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerTierEdge.
*/
export interface CustomerTierEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerTierEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerStatusConnection.
*/
export interface CustomerStatusConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerStatusConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerStatusEdge.
*/
export interface CustomerStatusEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerStatusEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerConnection.
*/
export interface CustomerConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerEdge.
*/
export interface CustomerEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueTitleSuggestionFromCustomerRequestPayload.
*/
export interface IssueTitleSuggestionFromCustomerRequestPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueTitleSuggestionFromCustomerRequestPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomViewConnection.
*/
export interface CustomViewConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomViewEdge.
*/
export interface CustomViewEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewEdge>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomViewSuggestionPayload.
*/
export interface CustomViewSuggestionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewSuggestionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomViewHasSubscribersPayload.
*/
export interface CustomViewHasSubscribersPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewHasSubscribersPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AuthResolverResponse.
*/
export interface AuthResolverResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuthResolverResponse>):
              $SelectionSet
          
}

/**
* A user that has access to the the resources of an organization.
*
* Build type-safe selection set for AuthUser.
*/
export interface AuthUser {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuthUser>):
              $SelectionSet
          
}

/**
* An organization. Organizations are root-level objects that contain users and teams.
*
* Build type-safe selection set for AuthOrganization.
*/
export interface AuthOrganization {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuthOrganization>):
              $SelectionSet
          
}

/**
* An identity provider.
*
* Build type-safe selection set for AuthIdentityProvider.
*/
export interface AuthIdentityProvider {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuthIdentityProvider>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for SsoUrlFromEmailResponse.
*/
export interface SsoUrlFromEmailResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SsoUrlFromEmailResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AuditEntryType.
*/
export interface AuditEntryType {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuditEntryType>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AuditEntryConnection.
*/
export interface AuditEntryConnection {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuditEntryConnection>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AuditEntryEdge.
*/
export interface AuditEntryEdge {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuditEntryEdge>):
              $SelectionSet
          
}

/**
* Workspace audit log entry object.
*
* Build type-safe selection set for AuditEntry.
*/
export interface AuditEntry {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AuditEntry>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AttachmentSourcesPayload.
*/
export interface AttachmentSourcesPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AttachmentSourcesPayload>):
              $SelectionSet
          
}

/**
* Settings for an Asks web form.
*
* Build type-safe selection set for AsksWebSettings.
*/
export interface AsksWebSettings {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AsksWebSettings>):
              $SelectionSet
          
}

/**
* Public information of the OAuth application.
*
* Build type-safe selection set for Application.
*/
export interface Application {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Application>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WorkflowStatePayload.
*/
export interface WorkflowStatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowStatePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for WorkflowStateArchivePayload.
*/
export interface WorkflowStateArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WorkflowStateArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WebhookPayload.
*/
export interface WebhookPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WebhookPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity deletion mutations.
*
* Build type-safe selection set for DeletePayload.
*/
export interface DeletePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DeletePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for WebhookRotateSecretPayload.
*/
export interface WebhookRotateSecretPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.WebhookRotateSecretPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ViewPreferencesPayload.
*/
export interface ViewPreferencesPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ViewPreferencesPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsPayload.
*/
export interface UserSettingsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsFlagsResetPayload.
*/
export interface UserSettingsFlagsResetPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsFlagsResetPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserSettingsFlagPayload.
*/
export interface UserSettingsFlagPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserSettingsFlagPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserPayload.
*/
export interface UserPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UserAdminPayload.
*/
export interface UserAdminPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UserAdminPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TriageResponsibilityPayload.
*/
export interface TriageResponsibilityPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TriageResponsibilityPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TimeSchedulePayload.
*/
export interface TimeSchedulePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TimeSchedulePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TemplatePayload.
*/
export interface TemplatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TemplatePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectPayload.
*/
export interface ProjectPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for SuccessPayload.
*/
export interface SuccessPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SuccessPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ProjectArchivePayload.
*/
export interface ProjectArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamPayload.
*/
export interface TeamPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for TeamArchivePayload.
*/
export interface TeamArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for TeamMembershipPayload.
*/
export interface TeamMembershipPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.TeamMembershipPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapToProjectPayload.
*/
export interface RoadmapToProjectPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapToProjectPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for RoadmapPayload.
*/
export interface RoadmapPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for RoadmapArchivePayload.
*/
export interface RoadmapArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.RoadmapArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CreateCsvExportReportPayload.
*/
export interface CreateCsvExportReportPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CreateCsvExportReportPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleaseStagePayload.
*/
export interface ReleaseStagePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseStagePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ReleaseStageArchivePayload.
*/
export interface ReleaseStageArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseStageArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleasePayload.
*/
export interface ReleasePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ReleaseArchivePayload.
*/
export interface ReleaseArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleaseArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReleasePipelinePayload.
*/
export interface ReleasePipelinePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePipelinePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ReleasePipelineArchivePayload.
*/
export interface ReleasePipelineArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReleasePipelineArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ReactionPayload.
*/
export interface ReactionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ReactionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for PushSubscriptionPayload.
*/
export interface PushSubscriptionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PushSubscriptionPayload>):
              $SelectionSet
          
}

/**
* A user's web or mobile push notification subscription.
*
* Build type-safe selection set for PushSubscription.
*/
export interface PushSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PushSubscription>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectUpdatePayload.
*/
export interface ProjectUpdatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdatePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ProjectUpdateArchivePayload.
*/
export interface ProjectUpdateArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdateArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectUpdateReminderPayload.
*/
export interface ProjectUpdateReminderPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectUpdateReminderPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectStatusPayload.
*/
export interface ProjectStatusPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatusPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for ProjectStatusArchivePayload.
*/
export interface ProjectStatusArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectStatusArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectRelationPayload.
*/
export interface ProjectRelationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectRelationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestonePayload.
*/
export interface ProjectMilestonePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestonePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestoneMovePayload.
*/
export interface ProjectMilestoneMovePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestoneMovePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestoneMoveIssueToTeam.
*/
export interface ProjectMilestoneMoveIssueToTeam {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestoneMoveIssueToTeam>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectMilestoneMoveProjectTeams.
*/
export interface ProjectMilestoneMoveProjectTeams {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectMilestoneMoveProjectTeams>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ProjectLabelPayload.
*/
export interface ProjectLabelPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ProjectLabelPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationPayload.
*/
export interface OrganizationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationDeletePayload.
*/
export interface OrganizationDeletePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationDeletePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationCancelDeletePayload.
*/
export interface OrganizationCancelDeletePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationCancelDeletePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationStartTrialPayload.
*/
export interface OrganizationStartTrialPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationStartTrialPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationInvitePayload.
*/
export interface OrganizationInvitePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInvitePayload>):
              $SelectionSet
          
}

/**
* [INTERNAL] Organization domain operation response.
*
* Build type-safe selection set for OrganizationDomainSimplePayload.
*/
export interface OrganizationDomainSimplePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationDomainSimplePayload>):
              $SelectionSet
          
}

/**
* [INTERNAL] Organization domain operation response.
*
* Build type-safe selection set for OrganizationDomainPayload.
*/
export interface OrganizationDomainPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationDomainPayload>):
              $SelectionSet
          
}

/**
* Defines the use of a domain by an organization.
*
* Build type-safe selection set for OrganizationDomain.
*/
export interface OrganizationDomain {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationDomain>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationSubscriptionPayload.
*/
export interface NotificationSubscriptionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationSubscriptionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationPayload.
*/
export interface NotificationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for NotificationBatchActionPayload.
*/
export interface NotificationBatchActionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationBatchActionPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for NotificationArchivePayload.
*/
export interface NotificationArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationArchivePayload>):
              $SelectionSet
          
}

/**
* [ALPHA] The result of an issueToRelease mutation.
*
* Build type-safe selection set for IssueToReleasePayload.
*/
export interface IssueToReleasePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueToReleasePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssuePayload.
*/
export interface IssuePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssuePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueBatchPayload.
*/
export interface IssueBatchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueBatchPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for IssueArchivePayload.
*/
export interface IssueArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueRelationPayload.
*/
export interface IssueRelationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueRelationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueLabelPayload.
*/
export interface IssueLabelPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueLabelPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueImportPayload.
*/
export interface IssueImportPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImportPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IssueImportDeletePayload.
*/
export interface IssueImportDeletePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IssueImportDeletePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationsSettingsPayload.
*/
export interface IntegrationsSettingsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationsSettingsPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationTemplatePayload.
*/
export interface IntegrationTemplatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationTemplatePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationPayload.
*/
export interface IntegrationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitHubCommitIntegrationPayload.
*/
export interface GitHubCommitIntegrationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitHubCommitIntegrationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitHubEnterpriseServerPayload.
*/
export interface GitHubEnterpriseServerPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitHubEnterpriseServerPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitLabIntegrationCreatePayload.
*/
export interface GitLabIntegrationCreatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitLabIntegrationCreatePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitLabTestConnectionPayload.
*/
export interface GitLabTestConnectionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitLabTestConnectionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationSlackWorkspaceNamePayload.
*/
export interface IntegrationSlackWorkspaceNamePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationSlackWorkspaceNamePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AsksChannelConnectPayload.
*/
export interface AsksChannelConnectPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AsksChannelConnectPayload>):
              $SelectionSet
          
}

/**
* Object for mapping Slack channel IDs to names and other settings.
*
* Build type-safe selection set for SlackChannelNameMapping.
*/
export interface SlackChannelNameMapping {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SlackChannelNameMapping>):
              $SelectionSet
          
}

/**
* Tuple for mapping Slack channel IDs to names.
*
* Build type-safe selection set for SlackAsksTeamSettings.
*/
export interface SlackAsksTeamSettings {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SlackAsksTeamSettings>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for SlackChannelConnectPayload.
*/
export interface SlackChannelConnectPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.SlackChannelConnectPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for IntegrationRequestPayload.
*/
export interface IntegrationRequestPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.IntegrationRequestPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeUpdatePayload.
*/
export interface InitiativeUpdatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdatePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for InitiativeUpdateArchivePayload.
*/
export interface InitiativeUpdateArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdateArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeUpdateReminderPayload.
*/
export interface InitiativeUpdateReminderPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeUpdateReminderPayload>):
              $SelectionSet
          
}

/**
* The result of a initiativeToProject mutation.
*
* Build type-safe selection set for InitiativeToProjectPayload.
*/
export interface InitiativeToProjectPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeToProjectPayload>):
              $SelectionSet
          
}

/**
* The payload returned by the initiative mutations.
*
* Build type-safe selection set for InitiativePayload.
*/
export interface InitiativePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for InitiativeArchivePayload.
*/
export interface InitiativeArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for InitiativeRelationPayload.
*/
export interface InitiativeRelationPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.InitiativeRelationPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitAutomationTargetBranchPayload.
*/
export interface GitAutomationTargetBranchPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationTargetBranchPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for GitAutomationStatePayload.
*/
export interface GitAutomationStatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.GitAutomationStatePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UploadPayload.
*/
export interface UploadPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UploadPayload>):
              $SelectionSet
          
}

/**
* Object representing Google Cloud upload policy, plus additional data.
*
* Build type-safe selection set for UploadFile.
*/
export interface UploadFile {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UploadFile>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for UploadFileHeader.
*/
export interface UploadFileHeader {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.UploadFileHeader>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ImageUploadFromUrlPayload.
*/
export interface ImageUploadFromUrlPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ImageUploadFromUrlPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FileUploadDeletePayload.
*/
export interface FileUploadDeletePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FileUploadDeletePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FavoritePayload.
*/
export interface FavoritePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FavoritePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EntityExternalLinkPayload.
*/
export interface EntityExternalLinkPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EntityExternalLinkPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmojiPayload.
*/
export interface EmojiPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmojiPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmailUnsubscribePayload.
*/
export interface EmailUnsubscribePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmailUnsubscribePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmailIntakeAddressPayload.
*/
export interface EmailIntakeAddressPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmailIntakeAddressPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for DocumentPayload.
*/
export interface DocumentPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentPayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for DocumentArchivePayload.
*/
export interface DocumentArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.DocumentArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CyclePayload.
*/
export interface CyclePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CyclePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for CycleArchivePayload.
*/
export interface CycleArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CycleArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerTierPayload.
*/
export interface CustomerTierPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerTierPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerStatusPayload.
*/
export interface CustomerStatusPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerStatusPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerPayload.
*/
export interface CustomerPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerNeedPayload.
*/
export interface CustomerNeedPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomerNeedUpdatePayload.
*/
export interface CustomerNeedUpdatePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedUpdatePayload>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive mutations.
*
* Build type-safe selection set for CustomerNeedArchivePayload.
*/
export interface CustomerNeedArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomerNeedArchivePayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CustomViewPayload.
*/
export interface CustomViewPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CustomViewPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ContactPayload.
*/
export interface ContactPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ContactPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CommentPayload.
*/
export interface CommentPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CommentPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for EmailUserAccountAuthChallengeResponse.
*/
export interface EmailUserAccountAuthChallengeResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.EmailUserAccountAuthChallengeResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for PasskeyLoginStartResponse.
*/
export interface PasskeyLoginStartResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.PasskeyLoginStartResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for CreateOrJoinOrganizationResponse.
*/
export interface CreateOrJoinOrganizationResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.CreateOrJoinOrganizationResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for LogoutResponse.
*/
export interface LogoutResponse {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.LogoutResponse>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AttachmentPayload.
*/
export interface AttachmentPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AttachmentPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for FrontAttachmentPayload.
*/
export interface FrontAttachmentPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.FrontAttachmentPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentSessionPayload.
*/
export interface AgentSessionPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentSessionPayload>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for AgentActivityPayload.
*/
export interface AgentActivityPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityPayload>):
              $SelectionSet
          
}


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                               Union
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


/**
* Content for different types of agent activities.
*
* Build type-safe selection set for AgentActivityContent.
*/
export interface AgentActivityContent {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.AgentActivityContent>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for ExternalEntityInfoMetadata.
*/
export interface ExternalEntityInfoMetadata {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ExternalEntityInfoMetadata>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for OrganizationInviteDetailsPayload.
*/
export interface OrganizationInviteDetailsPayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.OrganizationInviteDetailsPayload>):
              $SelectionSet
          
}


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                             Interface
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


/**
* Notification subscriptions for models.
*
* Build type-safe selection set for NotificationSubscription.
*/
export interface NotificationSubscription {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.NotificationSubscription>):
              $SelectionSet
          
}

/**
* A basic entity.
*
* Build type-safe selection set for Entity.
*/
export interface Entity {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Entity>):
              $SelectionSet
          
}

/**
* Build type-safe selection set for Node.
*/
export interface Node {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Node>):
              $SelectionSet
          
}

/**
* A notification sent to a user.
*
* Build type-safe selection set for Notification.
*/
export interface Notification {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Notification>):
              $SelectionSet
          
}

/**
* A generic payload return from entity archive or deletion mutations.
*
* Build type-safe selection set for ArchivePayload.
*/
export interface ArchivePayload {

            <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.ArchivePayload>):
              $SelectionSet
          
}
