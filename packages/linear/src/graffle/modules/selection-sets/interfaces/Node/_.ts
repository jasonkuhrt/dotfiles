import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as Node from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 1 |
* | **Implementors** | {@link $Schema.CustomerNotificationSubscription}, {@link $Schema.User}, {@link $Schema.Organization}, {@link $Schema.Facet}, {@link $Schema.Team}, {@link $Schema.WorkflowState}, {@link $Schema.Issue}, {@link $Schema.Cycle}, {@link $Schema.Document}, {@link $Schema.Project}, {@link $Schema.ProjectStatus}, {@link $Schema.Template}, {@link $Schema.ProjectUpdate}, {@link $Schema.Reaction}, {@link $Schema.Comment}, {@link $Schema.DocumentContent}, {@link $Schema.Initiative}, {@link $Schema.InitiativeUpdate}, {@link $Schema.EntityExternalLink}, {@link $Schema.IntegrationsSettings}, {@link $Schema.InitiativeHistory}, {@link $Schema.ProjectMilestone}, {@link $Schema.AiPromptRules}, {@link $Schema.Post}, {@link $Schema.ExternalUser}, {@link $Schema.AgentSession}, {@link $Schema.AgentActivity}, {@link $Schema.AgentSessionToPullRequest}, {@link $Schema.PullRequest}, {@link $Schema.Favorite}, {@link $Schema.CustomView}, {@link $Schema.FeedItem}, {@link $Schema.ViewPreferences}, {@link $Schema.IssueLabel}, {@link $Schema.ProjectLabel}, {@link $Schema.Customer}, {@link $Schema.CustomerStatus}, {@link $Schema.CustomerTier}, {@link $Schema.Integration}, {@link $Schema.Dashboard}, {@link $Schema.Release}, {@link $Schema.ReleasePipeline}, {@link $Schema.ReleaseStage}, {@link $Schema.InitiativeToProject}, {@link $Schema.ProjectHistory}, {@link $Schema.ProjectRelation}, {@link $Schema.CustomerNeed}, {@link $Schema.Attachment}, {@link $Schema.ProjectAttachment}, {@link $Schema.IssueHistory}, {@link $Schema.IssueImport}, {@link $Schema.WorkflowDefinition}, {@link $Schema.IssueRelation}, {@link $Schema.IssueSuggestion}, {@link $Schema.TriageResponsibility}, {@link $Schema.TimeSchedule}, {@link $Schema.TeamMembership}, {@link $Schema.GitAutomationState}, {@link $Schema.GitAutomationTargetBranch}, {@link $Schema.Webhook}, {@link $Schema.PaidSubscription}, {@link $Schema.IdentityProvider}, {@link $Schema.IssueDraft}, {@link $Schema.Draft}, {@link $Schema.CustomViewNotificationSubscription}, {@link $Schema.CycleNotificationSubscription}, {@link $Schema.LabelNotificationSubscription}, {@link $Schema.ProjectNotificationSubscription}, {@link $Schema.InitiativeNotificationSubscription}, {@link $Schema.TeamNotificationSubscription}, {@link $Schema.UserNotificationSubscription}, {@link $Schema.IssueNotification}, {@link $Schema.ProjectNotification}, {@link $Schema.InitiativeNotification}, {@link $Schema.OauthClientApprovalNotification}, {@link $Schema.OauthClientApproval}, {@link $Schema.DocumentNotification}, {@link $Schema.PostNotification}, {@link $Schema.CustomerNeedNotification}, {@link $Schema.CustomerNotification}, {@link $Schema.PullRequestNotification}, {@link $Schema.UserSettings}, {@link $Schema.SemanticSearchResult}, {@link $Schema.DocumentSearchResult}, {@link $Schema.ProjectSearchResult}, {@link $Schema.IssueSearchResult}, {@link $Schema.RoadmapToProject}, {@link $Schema.Roadmap}, {@link $Schema.OrganizationInvite}, {@link $Schema.IssueToRelease}, {@link $Schema.IntegrationTemplate}, {@link $Schema.InitiativeRelation}, {@link $Schema.Emoji}, {@link $Schema.EmailIntakeAddress}, {@link $Schema.SesDomainIdentity}, {@link $Schema.AuditEntry}, {@link $Schema.AsksWebSettings}, {@link $Schema.PushSubscription}, {@link $Schema.OrganizationDomain}, {@link $Schema.NotificationSubscription}, {@link $Schema.Entity}, {@link $Schema.Notification} |
*/
export interface Node<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Node} |
* | **Path** | `Node.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.CustomerNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerNotificationSubscription: {
* // ... CustomerNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CustomerNotificationSubscription?: $Named.CustomerNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.User} implementor.
*
* When the runtime value is of type {@link $Schema.User}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> User` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_User: {
* // ... User-specific fields
* }
* })
* ```
*/
___on_User?: $Named.User<_$Context>
/**
* Inline fragment selection for {@link $Schema.Organization} implementor.
*
* When the runtime value is of type {@link $Schema.Organization}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Organization` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Organization: {
* // ... Organization-specific fields
* }
* })
* ```
*/
___on_Organization?: $Named.Organization<_$Context>
/**
* Inline fragment selection for {@link $Schema.Facet} implementor.
*
* When the runtime value is of type {@link $Schema.Facet}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Facet` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Facet: {
* // ... Facet-specific fields
* }
* })
* ```
*/
___on_Facet?: $Named.Facet<_$Context>
/**
* Inline fragment selection for {@link $Schema.Team} implementor.
*
* When the runtime value is of type {@link $Schema.Team}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Team` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Team: {
* // ... Team-specific fields
* }
* })
* ```
*/
___on_Team?: $Named.Team<_$Context>
/**
* Inline fragment selection for {@link $Schema.WorkflowState} implementor.
*
* When the runtime value is of type {@link $Schema.WorkflowState}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> WorkflowState` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_WorkflowState: {
* // ... WorkflowState-specific fields
* }
* })
* ```
*/
___on_WorkflowState?: $Named.WorkflowState<_$Context>
/**
* Inline fragment selection for {@link $Schema.Issue} implementor.
*
* When the runtime value is of type {@link $Schema.Issue}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Issue` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Issue: {
* // ... Issue-specific fields
* }
* })
* ```
*/
___on_Issue?: $Named.Issue<_$Context>
/**
* Inline fragment selection for {@link $Schema.Cycle} implementor.
*
* When the runtime value is of type {@link $Schema.Cycle}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Cycle` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Cycle: {
* // ... Cycle-specific fields
* }
* })
* ```
*/
___on_Cycle?: $Named.Cycle<_$Context>
/**
* Inline fragment selection for {@link $Schema.Document} implementor.
*
* When the runtime value is of type {@link $Schema.Document}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Document} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Document` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Document: {
* // ... Document-specific fields
* }
* })
* ```
*/
___on_Document?: $Named.Document<_$Context>
/**
* Inline fragment selection for {@link $Schema.Project} implementor.
*
* When the runtime value is of type {@link $Schema.Project}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Project` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Project: {
* // ... Project-specific fields
* }
* })
* ```
*/
___on_Project?: $Named.Project<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectStatus} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectStatus}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatus} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectStatus` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectStatus: {
* // ... ProjectStatus-specific fields
* }
* })
* ```
*/
___on_ProjectStatus?: $Named.ProjectStatus<_$Context>
/**
* Inline fragment selection for {@link $Schema.Template} implementor.
*
* When the runtime value is of type {@link $Schema.Template}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Template` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Template: {
* // ... Template-specific fields
* }
* })
* ```
*/
___on_Template?: $Named.Template<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectUpdate} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectUpdate}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectUpdate` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectUpdate: {
* // ... ProjectUpdate-specific fields
* }
* })
* ```
*/
___on_ProjectUpdate?: $Named.ProjectUpdate<_$Context>
/**
* Inline fragment selection for {@link $Schema.Reaction} implementor.
*
* When the runtime value is of type {@link $Schema.Reaction}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Reaction} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Reaction` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Reaction: {
* // ... Reaction-specific fields
* }
* })
* ```
*/
___on_Reaction?: $Named.Reaction<_$Context>
/**
* Inline fragment selection for {@link $Schema.Comment} implementor.
*
* When the runtime value is of type {@link $Schema.Comment}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Comment` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Comment: {
* // ... Comment-specific fields
* }
* })
* ```
*/
___on_Comment?: $Named.Comment<_$Context>
/**
* Inline fragment selection for {@link $Schema.DocumentContent} implementor.
*
* When the runtime value is of type {@link $Schema.DocumentContent}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContent} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> DocumentContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_DocumentContent: {
* // ... DocumentContent-specific fields
* }
* })
* ```
*/
___on_DocumentContent?: $Named.DocumentContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.Initiative} implementor.
*
* When the runtime value is of type {@link $Schema.Initiative}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Initiative` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Initiative: {
* // ... Initiative-specific fields
* }
* })
* ```
*/
___on_Initiative?: $Named.Initiative<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeUpdate} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeUpdate}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdate} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeUpdate` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeUpdate: {
* // ... InitiativeUpdate-specific fields
* }
* })
* ```
*/
___on_InitiativeUpdate?: $Named.InitiativeUpdate<_$Context>
/**
* Inline fragment selection for {@link $Schema.EntityExternalLink} implementor.
*
* When the runtime value is of type {@link $Schema.EntityExternalLink}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLink} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> EntityExternalLink` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_EntityExternalLink: {
* // ... EntityExternalLink-specific fields
* }
* })
* ```
*/
___on_EntityExternalLink?: $Named.EntityExternalLink<_$Context>
/**
* Inline fragment selection for {@link $Schema.IntegrationsSettings} implementor.
*
* When the runtime value is of type {@link $Schema.IntegrationsSettings}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettings} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IntegrationsSettings` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IntegrationsSettings: {
* // ... IntegrationsSettings-specific fields
* }
* })
* ```
*/
___on_IntegrationsSettings?: $Named.IntegrationsSettings<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeHistory} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeHistory}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeHistory} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeHistory` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeHistory: {
* // ... InitiativeHistory-specific fields
* }
* })
* ```
*/
___on_InitiativeHistory?: $Named.InitiativeHistory<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectMilestone} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectMilestone}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestone} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectMilestone` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectMilestone: {
* // ... ProjectMilestone-specific fields
* }
* })
* ```
*/
___on_ProjectMilestone?: $Named.ProjectMilestone<_$Context>
/**
* Inline fragment selection for {@link $Schema.AiPromptRules} implementor.
*
* When the runtime value is of type {@link $Schema.AiPromptRules}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AiPromptRules} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AiPromptRules` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AiPromptRules: {
* // ... AiPromptRules-specific fields
* }
* })
* ```
*/
___on_AiPromptRules?: $Named.AiPromptRules<_$Context>
/**
* Inline fragment selection for {@link $Schema.Post} implementor.
*
* When the runtime value is of type {@link $Schema.Post}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Post} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Post` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Post: {
* // ... Post-specific fields
* }
* })
* ```
*/
___on_Post?: $Named.Post<_$Context>
/**
* Inline fragment selection for {@link $Schema.ExternalUser} implementor.
*
* When the runtime value is of type {@link $Schema.ExternalUser}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ExternalUser` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ExternalUser: {
* // ... ExternalUser-specific fields
* }
* })
* ```
*/
___on_ExternalUser?: $Named.ExternalUser<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentSession} implementor.
*
* When the runtime value is of type {@link $Schema.AgentSession}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSession} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AgentSession` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AgentSession: {
* // ... AgentSession-specific fields
* }
* })
* ```
*/
___on_AgentSession?: $Named.AgentSession<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivity} implementor.
*
* When the runtime value is of type {@link $Schema.AgentActivity}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivity} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AgentActivity` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AgentActivity: {
* // ... AgentActivity-specific fields
* }
* })
* ```
*/
___on_AgentActivity?: $Named.AgentActivity<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentSessionToPullRequest} implementor.
*
* When the runtime value is of type {@link $Schema.AgentSessionToPullRequest}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionToPullRequest} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AgentSessionToPullRequest` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AgentSessionToPullRequest: {
* // ... AgentSessionToPullRequest-specific fields
* }
* })
* ```
*/
___on_AgentSessionToPullRequest?: $Named.AgentSessionToPullRequest<_$Context>
/**
* Inline fragment selection for {@link $Schema.PullRequest} implementor.
*
* When the runtime value is of type {@link $Schema.PullRequest}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequest} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> PullRequest` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_PullRequest: {
* // ... PullRequest-specific fields
* }
* })
* ```
*/
___on_PullRequest?: $Named.PullRequest<_$Context>
/**
* Inline fragment selection for {@link $Schema.Favorite} implementor.
*
* When the runtime value is of type {@link $Schema.Favorite}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Favorite} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Favorite` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Favorite: {
* // ... Favorite-specific fields
* }
* })
* ```
*/
___on_Favorite?: $Named.Favorite<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomView} implementor.
*
* When the runtime value is of type {@link $Schema.CustomView}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomView` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomView: {
* // ... CustomView-specific fields
* }
* })
* ```
*/
___on_CustomView?: $Named.CustomView<_$Context>
/**
* Inline fragment selection for {@link $Schema.FeedItem} implementor.
*
* When the runtime value is of type {@link $Schema.FeedItem}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedItem} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> FeedItem` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_FeedItem: {
* // ... FeedItem-specific fields
* }
* })
* ```
*/
___on_FeedItem?: $Named.FeedItem<_$Context>
/**
* Inline fragment selection for {@link $Schema.ViewPreferences} implementor.
*
* When the runtime value is of type {@link $Schema.ViewPreferences}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferences} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ViewPreferences` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ViewPreferences: {
* // ... ViewPreferences-specific fields
* }
* })
* ```
*/
___on_ViewPreferences?: $Named.ViewPreferences<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueLabel} implementor.
*
* When the runtime value is of type {@link $Schema.IssueLabel}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueLabel` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueLabel: {
* // ... IssueLabel-specific fields
* }
* })
* ```
*/
___on_IssueLabel?: $Named.IssueLabel<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectLabel} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectLabel}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabel} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectLabel` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectLabel: {
* // ... ProjectLabel-specific fields
* }
* })
* ```
*/
___on_ProjectLabel?: $Named.ProjectLabel<_$Context>
/**
* Inline fragment selection for {@link $Schema.Customer} implementor.
*
* When the runtime value is of type {@link $Schema.Customer}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Customer` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Customer: {
* // ... Customer-specific fields
* }
* })
* ```
*/
___on_Customer?: $Named.Customer<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerStatus} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerStatus}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatus} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerStatus` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerStatus: {
* // ... CustomerStatus-specific fields
* }
* })
* ```
*/
___on_CustomerStatus?: $Named.CustomerStatus<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerTier} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerTier}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTier} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerTier` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerTier: {
* // ... CustomerTier-specific fields
* }
* })
* ```
*/
___on_CustomerTier?: $Named.CustomerTier<_$Context>
/**
* Inline fragment selection for {@link $Schema.Integration} implementor.
*
* When the runtime value is of type {@link $Schema.Integration}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Integration} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Integration` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Integration: {
* // ... Integration-specific fields
* }
* })
* ```
*/
___on_Integration?: $Named.Integration<_$Context>
/**
* Inline fragment selection for {@link $Schema.Dashboard} implementor.
*
* When the runtime value is of type {@link $Schema.Dashboard}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Dashboard} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Dashboard` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Dashboard: {
* // ... Dashboard-specific fields
* }
* })
* ```
*/
___on_Dashboard?: $Named.Dashboard<_$Context>
/**
* Inline fragment selection for {@link $Schema.Release} implementor.
*
* When the runtime value is of type {@link $Schema.Release}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Release` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Release: {
* // ... Release-specific fields
* }
* })
* ```
*/
___on_Release?: $Named.Release<_$Context>
/**
* Inline fragment selection for {@link $Schema.ReleasePipeline} implementor.
*
* When the runtime value is of type {@link $Schema.ReleasePipeline}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipeline} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ReleasePipeline` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ReleasePipeline: {
* // ... ReleasePipeline-specific fields
* }
* })
* ```
*/
___on_ReleasePipeline?: $Named.ReleasePipeline<_$Context>
/**
* Inline fragment selection for {@link $Schema.ReleaseStage} implementor.
*
* When the runtime value is of type {@link $Schema.ReleaseStage}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStage} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ReleaseStage` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ReleaseStage: {
* // ... ReleaseStage-specific fields
* }
* })
* ```
*/
___on_ReleaseStage?: $Named.ReleaseStage<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeToProject} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeToProject}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProject} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeToProject` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeToProject: {
* // ... InitiativeToProject-specific fields
* }
* })
* ```
*/
___on_InitiativeToProject?: $Named.InitiativeToProject<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectHistory} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectHistory}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectHistory} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectHistory` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectHistory: {
* // ... ProjectHistory-specific fields
* }
* })
* ```
*/
___on_ProjectHistory?: $Named.ProjectHistory<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectRelation} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectRelation}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelation} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectRelation` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectRelation: {
* // ... ProjectRelation-specific fields
* }
* })
* ```
*/
___on_ProjectRelation?: $Named.ProjectRelation<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNeed} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNeed}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeed} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerNeed` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerNeed: {
* // ... CustomerNeed-specific fields
* }
* })
* ```
*/
___on_CustomerNeed?: $Named.CustomerNeed<_$Context>
/**
* Inline fragment selection for {@link $Schema.Attachment} implementor.
*
* When the runtime value is of type {@link $Schema.Attachment}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Attachment` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Attachment: {
* // ... Attachment-specific fields
* }
* })
* ```
*/
___on_Attachment?: $Named.Attachment<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectAttachment} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectAttachment}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectAttachment} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectAttachment` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectAttachment: {
* // ... ProjectAttachment-specific fields
* }
* })
* ```
*/
___on_ProjectAttachment?: $Named.ProjectAttachment<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueHistory} implementor.
*
* When the runtime value is of type {@link $Schema.IssueHistory}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueHistory} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueHistory` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueHistory: {
* // ... IssueHistory-specific fields
* }
* })
* ```
*/
___on_IssueHistory?: $Named.IssueHistory<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueImport} implementor.
*
* When the runtime value is of type {@link $Schema.IssueImport}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImport} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueImport` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueImport: {
* // ... IssueImport-specific fields
* }
* })
* ```
*/
___on_IssueImport?: $Named.IssueImport<_$Context>
/**
* Inline fragment selection for {@link $Schema.WorkflowDefinition} implementor.
*
* When the runtime value is of type {@link $Schema.WorkflowDefinition}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowDefinition} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> WorkflowDefinition` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_WorkflowDefinition: {
* // ... WorkflowDefinition-specific fields
* }
* })
* ```
*/
___on_WorkflowDefinition?: $Named.WorkflowDefinition<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueRelation} implementor.
*
* When the runtime value is of type {@link $Schema.IssueRelation}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelation} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueRelation` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueRelation: {
* // ... IssueRelation-specific fields
* }
* })
* ```
*/
___on_IssueRelation?: $Named.IssueRelation<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueSuggestion} implementor.
*
* When the runtime value is of type {@link $Schema.IssueSuggestion}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSuggestion} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueSuggestion` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueSuggestion: {
* // ... IssueSuggestion-specific fields
* }
* })
* ```
*/
___on_IssueSuggestion?: $Named.IssueSuggestion<_$Context>
/**
* Inline fragment selection for {@link $Schema.TriageResponsibility} implementor.
*
* When the runtime value is of type {@link $Schema.TriageResponsibility}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibility} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> TriageResponsibility` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_TriageResponsibility: {
* // ... TriageResponsibility-specific fields
* }
* })
* ```
*/
___on_TriageResponsibility?: $Named.TriageResponsibility<_$Context>
/**
* Inline fragment selection for {@link $Schema.TimeSchedule} implementor.
*
* When the runtime value is of type {@link $Schema.TimeSchedule}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedule} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> TimeSchedule` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_TimeSchedule: {
* // ... TimeSchedule-specific fields
* }
* })
* ```
*/
___on_TimeSchedule?: $Named.TimeSchedule<_$Context>
/**
* Inline fragment selection for {@link $Schema.TeamMembership} implementor.
*
* When the runtime value is of type {@link $Schema.TeamMembership}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembership} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> TeamMembership` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_TeamMembership: {
* // ... TeamMembership-specific fields
* }
* })
* ```
*/
___on_TeamMembership?: $Named.TeamMembership<_$Context>
/**
* Inline fragment selection for {@link $Schema.GitAutomationState} implementor.
*
* When the runtime value is of type {@link $Schema.GitAutomationState}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationState} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> GitAutomationState` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_GitAutomationState: {
* // ... GitAutomationState-specific fields
* }
* })
* ```
*/
___on_GitAutomationState?: $Named.GitAutomationState<_$Context>
/**
* Inline fragment selection for {@link $Schema.GitAutomationTargetBranch} implementor.
*
* When the runtime value is of type {@link $Schema.GitAutomationTargetBranch}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranch} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> GitAutomationTargetBranch` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_GitAutomationTargetBranch: {
* // ... GitAutomationTargetBranch-specific fields
* }
* })
* ```
*/
___on_GitAutomationTargetBranch?: $Named.GitAutomationTargetBranch<_$Context>
/**
* Inline fragment selection for {@link $Schema.Webhook} implementor.
*
* When the runtime value is of type {@link $Schema.Webhook}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Webhook} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Webhook` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Webhook: {
* // ... Webhook-specific fields
* }
* })
* ```
*/
___on_Webhook?: $Named.Webhook<_$Context>
/**
* Inline fragment selection for {@link $Schema.PaidSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.PaidSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaidSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> PaidSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_PaidSubscription: {
* // ... PaidSubscription-specific fields
* }
* })
* ```
*/
___on_PaidSubscription?: $Named.PaidSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.IdentityProvider} implementor.
*
* When the runtime value is of type {@link $Schema.IdentityProvider}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IdentityProvider} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IdentityProvider` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IdentityProvider: {
* // ... IdentityProvider-specific fields
* }
* })
* ```
*/
___on_IdentityProvider?: $Named.IdentityProvider<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueDraft} implementor.
*
* When the runtime value is of type {@link $Schema.IssueDraft}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueDraft} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueDraft` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueDraft: {
* // ... IssueDraft-specific fields
* }
* })
* ```
*/
___on_IssueDraft?: $Named.IssueDraft<_$Context>
/**
* Inline fragment selection for {@link $Schema.Draft} implementor.
*
* When the runtime value is of type {@link $Schema.Draft}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Draft} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Draft` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Draft: {
* // ... Draft-specific fields
* }
* })
* ```
*/
___on_Draft?: $Named.Draft<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomViewNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CustomViewNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomViewNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomViewNotificationSubscription: {
* // ... CustomViewNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CustomViewNotificationSubscription?: $Named.CustomViewNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.CycleNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.CycleNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CycleNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CycleNotificationSubscription: {
* // ... CycleNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_CycleNotificationSubscription?: $Named.CycleNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.LabelNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.LabelNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LabelNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> LabelNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_LabelNotificationSubscription: {
* // ... LabelNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_LabelNotificationSubscription?: $Named.LabelNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectNotificationSubscription: {
* // ... ProjectNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_ProjectNotificationSubscription?: $Named.ProjectNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeNotificationSubscription: {
* // ... InitiativeNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_InitiativeNotificationSubscription?: $Named.InitiativeNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.TeamNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.TeamNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> TeamNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_TeamNotificationSubscription: {
* // ... TeamNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_TeamNotificationSubscription?: $Named.TeamNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.UserNotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.UserNotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserNotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> UserNotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_UserNotificationSubscription: {
* // ... UserNotificationSubscription-specific fields
* }
* })
* ```
*/
___on_UserNotificationSubscription?: $Named.UserNotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueNotification} implementor.
*
* When the runtime value is of type {@link $Schema.IssueNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueNotification: {
* // ... IssueNotification-specific fields
* }
* })
* ```
*/
___on_IssueNotification?: $Named.IssueNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectNotification} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectNotification: {
* // ... ProjectNotification-specific fields
* }
* })
* ```
*/
___on_ProjectNotification?: $Named.ProjectNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeNotification} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeNotification: {
* // ... InitiativeNotification-specific fields
* }
* })
* ```
*/
___on_InitiativeNotification?: $Named.InitiativeNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.OauthClientApprovalNotification} implementor.
*
* When the runtime value is of type {@link $Schema.OauthClientApprovalNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OauthClientApprovalNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> OauthClientApprovalNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_OauthClientApprovalNotification: {
* // ... OauthClientApprovalNotification-specific fields
* }
* })
* ```
*/
___on_OauthClientApprovalNotification?: $Named.OauthClientApprovalNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.OauthClientApproval} implementor.
*
* When the runtime value is of type {@link $Schema.OauthClientApproval}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OauthClientApproval} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> OauthClientApproval` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_OauthClientApproval: {
* // ... OauthClientApproval-specific fields
* }
* })
* ```
*/
___on_OauthClientApproval?: $Named.OauthClientApproval<_$Context>
/**
* Inline fragment selection for {@link $Schema.DocumentNotification} implementor.
*
* When the runtime value is of type {@link $Schema.DocumentNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> DocumentNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_DocumentNotification: {
* // ... DocumentNotification-specific fields
* }
* })
* ```
*/
___on_DocumentNotification?: $Named.DocumentNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.PostNotification} implementor.
*
* When the runtime value is of type {@link $Schema.PostNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PostNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> PostNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_PostNotification: {
* // ... PostNotification-specific fields
* }
* })
* ```
*/
___on_PostNotification?: $Named.PostNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNeedNotification} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNeedNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerNeedNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerNeedNotification: {
* // ... CustomerNeedNotification-specific fields
* }
* })
* ```
*/
___on_CustomerNeedNotification?: $Named.CustomerNeedNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNotification} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> CustomerNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_CustomerNotification: {
* // ... CustomerNotification-specific fields
* }
* })
* ```
*/
___on_CustomerNotification?: $Named.CustomerNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.PullRequestNotification} implementor.
*
* When the runtime value is of type {@link $Schema.PullRequestNotification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestNotification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> PullRequestNotification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_PullRequestNotification: {
* // ... PullRequestNotification-specific fields
* }
* })
* ```
*/
___on_PullRequestNotification?: $Named.PullRequestNotification<_$Context>
/**
* Inline fragment selection for {@link $Schema.UserSettings} implementor.
*
* When the runtime value is of type {@link $Schema.UserSettings}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettings} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> UserSettings` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_UserSettings: {
* // ... UserSettings-specific fields
* }
* })
* ```
*/
___on_UserSettings?: $Named.UserSettings<_$Context>
/**
* Inline fragment selection for {@link $Schema.SemanticSearchResult} implementor.
*
* When the runtime value is of type {@link $Schema.SemanticSearchResult}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SemanticSearchResult} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> SemanticSearchResult` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_SemanticSearchResult: {
* // ... SemanticSearchResult-specific fields
* }
* })
* ```
*/
___on_SemanticSearchResult?: $Named.SemanticSearchResult<_$Context>
/**
* Inline fragment selection for {@link $Schema.DocumentSearchResult} implementor.
*
* When the runtime value is of type {@link $Schema.DocumentSearchResult}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentSearchResult} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> DocumentSearchResult` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_DocumentSearchResult: {
* // ... DocumentSearchResult-specific fields
* }
* })
* ```
*/
___on_DocumentSearchResult?: $Named.DocumentSearchResult<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectSearchResult} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectSearchResult}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectSearchResult} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> ProjectSearchResult` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_ProjectSearchResult: {
* // ... ProjectSearchResult-specific fields
* }
* })
* ```
*/
___on_ProjectSearchResult?: $Named.ProjectSearchResult<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueSearchResult} implementor.
*
* When the runtime value is of type {@link $Schema.IssueSearchResult}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSearchResult} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueSearchResult` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueSearchResult: {
* // ... IssueSearchResult-specific fields
* }
* })
* ```
*/
___on_IssueSearchResult?: $Named.IssueSearchResult<_$Context>
/**
* Inline fragment selection for {@link $Schema.RoadmapToProject} implementor.
*
* When the runtime value is of type {@link $Schema.RoadmapToProject}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProject} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> RoadmapToProject` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_RoadmapToProject: {
* // ... RoadmapToProject-specific fields
* }
* })
* ```
*/
___on_RoadmapToProject?: $Named.RoadmapToProject<_$Context>
/**
* Inline fragment selection for {@link $Schema.Roadmap} implementor.
*
* When the runtime value is of type {@link $Schema.Roadmap}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Roadmap} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Roadmap` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Roadmap: {
* // ... Roadmap-specific fields
* }
* })
* ```
*/
___on_Roadmap?: $Named.Roadmap<_$Context>
/**
* Inline fragment selection for {@link $Schema.OrganizationInvite} implementor.
*
* When the runtime value is of type {@link $Schema.OrganizationInvite}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvite} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> OrganizationInvite` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_OrganizationInvite: {
* // ... OrganizationInvite-specific fields
* }
* })
* ```
*/
___on_OrganizationInvite?: $Named.OrganizationInvite<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueToRelease} implementor.
*
* When the runtime value is of type {@link $Schema.IssueToRelease}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToRelease} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IssueToRelease` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IssueToRelease: {
* // ... IssueToRelease-specific fields
* }
* })
* ```
*/
___on_IssueToRelease?: $Named.IssueToRelease<_$Context>
/**
* Inline fragment selection for {@link $Schema.IntegrationTemplate} implementor.
*
* When the runtime value is of type {@link $Schema.IntegrationTemplate}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplate} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> IntegrationTemplate` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_IntegrationTemplate: {
* // ... IntegrationTemplate-specific fields
* }
* })
* ```
*/
___on_IntegrationTemplate?: $Named.IntegrationTemplate<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeRelation} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeRelation}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeRelation} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> InitiativeRelation` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_InitiativeRelation: {
* // ... InitiativeRelation-specific fields
* }
* })
* ```
*/
___on_InitiativeRelation?: $Named.InitiativeRelation<_$Context>
/**
* Inline fragment selection for {@link $Schema.Emoji} implementor.
*
* When the runtime value is of type {@link $Schema.Emoji}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Emoji} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Emoji` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Emoji: {
* // ... Emoji-specific fields
* }
* })
* ```
*/
___on_Emoji?: $Named.Emoji<_$Context>
/**
* Inline fragment selection for {@link $Schema.EmailIntakeAddress} implementor.
*
* When the runtime value is of type {@link $Schema.EmailIntakeAddress}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddress} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> EmailIntakeAddress` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_EmailIntakeAddress: {
* // ... EmailIntakeAddress-specific fields
* }
* })
* ```
*/
___on_EmailIntakeAddress?: $Named.EmailIntakeAddress<_$Context>
/**
* Inline fragment selection for {@link $Schema.SesDomainIdentity} implementor.
*
* When the runtime value is of type {@link $Schema.SesDomainIdentity}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SesDomainIdentity} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> SesDomainIdentity` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_SesDomainIdentity: {
* // ... SesDomainIdentity-specific fields
* }
* })
* ```
*/
___on_SesDomainIdentity?: $Named.SesDomainIdentity<_$Context>
/**
* Inline fragment selection for {@link $Schema.AuditEntry} implementor.
*
* When the runtime value is of type {@link $Schema.AuditEntry}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuditEntry} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AuditEntry` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AuditEntry: {
* // ... AuditEntry-specific fields
* }
* })
* ```
*/
___on_AuditEntry?: $Named.AuditEntry<_$Context>
/**
* Inline fragment selection for {@link $Schema.AsksWebSettings} implementor.
*
* When the runtime value is of type {@link $Schema.AsksWebSettings}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AsksWebSettings} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> AsksWebSettings` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_AsksWebSettings: {
* // ... AsksWebSettings-specific fields
* }
* })
* ```
*/
___on_AsksWebSettings?: $Named.AsksWebSettings<_$Context>
/**
* Inline fragment selection for {@link $Schema.PushSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.PushSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> PushSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_PushSubscription: {
* // ... PushSubscription-specific fields
* }
* })
* ```
*/
___on_PushSubscription?: $Named.PushSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.OrganizationDomain} implementor.
*
* When the runtime value is of type {@link $Schema.OrganizationDomain}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomain} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> OrganizationDomain` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_OrganizationDomain: {
* // ... OrganizationDomain-specific fields
* }
* })
* ```
*/
___on_OrganizationDomain?: $Named.OrganizationDomain<_$Context>
/**
* Inline fragment selection for {@link $Schema.NotificationSubscription} implementor.
*
* When the runtime value is of type {@link $Schema.NotificationSubscription}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscription} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> NotificationSubscription` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_NotificationSubscription: {
* // ... NotificationSubscription-specific fields
* }
* })
* ```
*/
___on_NotificationSubscription?: $Named.NotificationSubscription<_$Context>
/**
* Inline fragment selection for {@link $Schema.Entity} implementor.
*
* When the runtime value is of type {@link $Schema.Entity}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Entity} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Entity` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Entity: {
* // ... Entity-specific fields
* }
* })
* ```
*/
___on_Entity?: $Named.Entity<_$Context>
/**
* Inline fragment selection for {@link $Schema.Notification} implementor.
*
* When the runtime value is of type {@link $Schema.Notification}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Notification} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.Node} |
* | **Path** | `Node -> Notification` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.nodes({
* id: true,
* name: true,
* ___on_Notification: {
* // ... Notification-specific fields
* }
* })
* ```
*/
___on_Notification?: $Named.Notification<_$Context>
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
      /**
* A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
* the name is one of the implementor type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}