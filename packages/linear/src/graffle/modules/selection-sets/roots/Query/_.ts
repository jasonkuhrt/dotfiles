import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as Query from './__.js'

/**
* GraphQL root {@link https://graphql.org/learn/schema/#the-query-and-mutation-types | Query} type.
*/
export interface Query<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.RootObjectLike {

      /**
* All issue workflow states.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.workflowStates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
workflowStates?: $Fields.workflowStates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.workflowStates<_$Context>>
/**
* One specific state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.workflowState` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
workflowState?: $Fields.workflowState<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.workflowState<_$Context>>
/**
* All webhooks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.webhooks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
webhooks?: $Fields.webhooks.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhooks<_$Context>>
/**
* A specific webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Webhook}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.webhook` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
webhook?: $Fields.webhook<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhook<_$Context>>
/**
* [INTERNAL] Webhook failure events for webhooks that belong to an OAuth application. (last 50)
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookFailureEvent}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.failuresForOauthWebhooks` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
failuresForOauthWebhooks?: $Fields.failuresForOauthWebhooks<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.failuresForOauthWebhooks<_$Context>>
/**
* The user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.userSettings` |
* | **Nullability** | Required |
*/
userSettings?: $Fields.userSettings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userSettings<_$Context>>
/**
* All users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.users` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
users?: $Fields.users.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.users<_$Context>>
/**
* One specific user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.user` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
user?: $Fields.user<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.user<_$Context>>
/**
* The currently authenticated user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.viewer` |
* | **Nullability** | Required |
*/
viewer?: $Fields.viewer.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.viewer<_$Context>>
/**
* Lists the sessions of a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.userSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
userSessions?: $Fields.userSessions<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.userSessions<_$Context>>
/**
* All triage responsibilities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageResponsibilityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.triageResponsibilities` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
triageResponsibilities?: $Fields.triageResponsibilities.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibilities<_$Context>>
/**
* A specific triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageResponsibility}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.triageResponsibility` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
triageResponsibility?: $Fields.triageResponsibility<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibility<_$Context>>
/**
* All time schedules.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeScheduleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.timeSchedules` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
timeSchedules?: $Fields.timeSchedules.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeSchedules<_$Context>>
/**
* A specific time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimeSchedule}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.timeSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
timeSchedule?: $Fields.timeSchedule<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timeSchedule<_$Context>>
/**
* All templates from all users.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.templates` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
templates?: $Fields.templates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templates<_$Context>>
/**
* A specific template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.template` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
template?: $Fields.template<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.template<_$Context>>
/**
* Returns all templates that are associated with the integration type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.templatesForIntegration` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
templatesForIntegration?: $Fields.templatesForIntegration<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templatesForIntegration<_$Context>>
/**
* All projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projects` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
projects?: $Fields.projects.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projects<_$Context>>
/**
* One specific project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Project}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.project` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
project?: $Fields.project<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.project<_$Context>>
/**
* Suggests filters for a project view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectFilterSuggestion?: $Fields.projectFilterSuggestion<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectFilterSuggestion<_$Context>>
/**
* All teams whose issues can be accessed by the user. This might be different from `administrableTeams`, which also includes teams whose settings can be changed by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.teams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
teams?: $Fields.teams.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teams<_$Context>>
/**
* All teams you the user can administrate. Administrable teams are teams whose settings the user can change, but to whose issues the user doesn't necessarily have access to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.administrableTeams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
administrableTeams?: $Fields.administrableTeams.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.administrableTeams<_$Context>>
/**
* One specific team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.team` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
team?: $Fields.team<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.team<_$Context>>
/**
* All team memberships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembershipConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.teamMemberships` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
teamMemberships?: $Fields.teamMemberships.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamMemberships<_$Context>>
/**
* One specific team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembership}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.teamMembership` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
teamMembership?: $Fields.teamMembership<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teamMembership<_$Context>>
/**
* Search for various resources using natural language.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SemanticSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.semanticSearch` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
semanticSearch?: $Fields.semanticSearch<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.semanticSearch<_$Context>>
/**
* Search documents.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.searchDocuments` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
searchDocuments?: $Fields.searchDocuments<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.searchDocuments<_$Context>>
/**
* Search projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.searchProjects` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
searchProjects?: $Fields.searchProjects<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.searchProjects<_$Context>>
/**
* Search issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.searchIssues` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*/
searchIssues?: $Fields.searchIssues<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.searchIssues<_$Context>>
/**
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.roadmapToProjects` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
roadmapToProjects?: $Fields.roadmapToProjects.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapToProjects<_$Context>>
/**
* One specific roadmapToProject.
*
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.roadmapToProject` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmapToProject?: $Fields.roadmapToProject<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmapToProject<_$Context>>
/**
* All roadmaps in the workspace.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RoadmapConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.roadmaps` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
roadmaps?: $Fields.roadmaps.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmaps<_$Context>>
/**
* One specific roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Roadmap}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.roadmap` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
roadmap?: $Fields.roadmap<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.roadmap<_$Context>>
/**
* [ALPHA] All release stages.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStageConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.releaseStages` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
releaseStages?: $Fields.releaseStages.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStages<_$Context>>
/**
* [ALPHA] One specific release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseStage}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.releaseStage` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releaseStage?: $Fields.releaseStage<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releaseStage<_$Context>>
/**
* [ALPHA] All releases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.releases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
releases?: $Fields.releases.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releases<_$Context>>
/**
* [ALPHA] One specific release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Release}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.release` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
release?: $Fields.release<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.release<_$Context>>
/**
* [ALPHA] All release pipelines.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipelineConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.releasePipelines` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
releasePipelines?: $Fields.releasePipelines.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipelines<_$Context>>
/**
* [ALPHA] One specific release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ReleasePipeline}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.releasePipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
releasePipeline?: $Fields.releasePipeline<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.releasePipeline<_$Context>>
/**
* The status of the rate limiter.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RateLimitPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.rateLimitStatus` |
* | **Nullability** | Required |
*/
rateLimitStatus?: $Fields.rateLimitStatus.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.rateLimitStatus<_$Context>>
/**
* Sends a test push message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$PushSubscriptionTestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.pushSubscriptionTest` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
pushSubscriptionTest?: $Fields.pushSubscriptionTest.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.pushSubscriptionTest<_$Context>>
/**
* All project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
projectUpdates?: $Fields.projectUpdates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdates<_$Context>>
/**
* A specific project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectUpdate?: $Fields.projectUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdate<_$Context>>
/**
* All project statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
projectStatuses?: $Fields.projectStatuses.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatuses<_$Context>>
/**
* [INTERNAL] Count of projects using this project status across the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatusCountPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectStatusProjectCount` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectStatusProjectCount?: $Fields.projectStatusProjectCount<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatusProjectCount<_$Context>>
/**
* One specific project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectStatus?: $Fields.projectStatus<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectStatus<_$Context>>
/**
* All project relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
projectRelations?: $Fields.projectRelations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRelations<_$Context>>
/**
* One specific project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectRelation?: $Fields.projectRelation<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectRelation<_$Context>>
/**
* All milestones for the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestoneConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectMilestones` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
projectMilestones?: $Fields.projectMilestones.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestones<_$Context>>
/**
* One specific project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestone}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectMilestone` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectMilestone?: $Fields.projectMilestone<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestone<_$Context>>
/**
* All project labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
projectLabels?: $Fields.projectLabels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabels<_$Context>>
/**
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.projectLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
projectLabel?: $Fields.projectLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectLabel<_$Context>>
/**
* The user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organization` |
* | **Nullability** | Required |
*/
organization?: $Fields.organization.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organization<_$Context>>
/**
* Does the organization exist.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationExistsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationExists` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationExists?: $Fields.organizationExists<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationExists<_$Context>>
/**
* [Internal] All archived teams of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.archivedTeams` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
archivedTeams?: $Fields.archivedTeams.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedTeams<_$Context>>
/**
* [INTERNAL] Get organization metadata by urlKey or organization id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationMeta} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationMeta` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
organizationMeta?: $Fields.organizationMeta<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationMeta<_$Context>>
/**
* All invites for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationInviteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationInvites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
organizationInvites?: $Fields.organizationInvites.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInvites<_$Context>>
/**
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationInvite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationInvite?: $Fields.organizationInvite<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInvite<_$Context>>
/**
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationInviteDetailsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationInviteDetails` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationInviteDetails?: $Fields.organizationInviteDetails<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationInviteDetails<_$Context>>
/**
* [INTERNAL] Checks whether the domain can be claimed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$OrganizationDomainClaimPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.organizationDomainClaimRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
organizationDomainClaimRequest?: $Fields.organizationDomainClaimRequest<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organizationDomainClaimRequest<_$Context>>
/**
* The user's notification subscriptions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationSubscriptionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.notificationSubscriptions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
notificationSubscriptions?: $Fields.notificationSubscriptions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSubscriptions<_$Context>>
/**
* One specific notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationSubscription}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.notificationSubscription` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notificationSubscription?: $Fields.notificationSubscription<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationSubscription<_$Context>>
/**
* All notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$NotificationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.notifications` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
notifications?: $Fields.notifications.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notifications<_$Context>>
/**
* [Internal] A number of unread notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.notificationsUnreadCount` |
* | **Nullability** | Required |
*/
notificationsUnreadCount?: $Fields.notificationsUnreadCount.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notificationsUnreadCount<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* One specific notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Notification}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.notification` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
notification?: $Fields.notification<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.notification<_$Context>>
/**
* [ALPHA] Returns a list of issue to release entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueToReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueToReleases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
issueToReleases?: $Fields.issueToReleases.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueToReleases<_$Context>>
/**
* [ALPHA] One specific issueToRelease.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueToRelease}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueToRelease` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueToRelease?: $Fields.issueToRelease<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueToRelease<_$Context>>
/**
* All issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issues` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
issues?: $Fields.issues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issues<_$Context>>
/**
* One specific issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issue?: $Fields.issue<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issue<_$Context>>
/**
* [DEPRECATED] Search issues. This endpoint is deprecated and will be removed in the future – use `searchIssues` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueSearch` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
issueSearch?: $Fields.issueSearch.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueSearch<_$Context>>
/**
* Find issue based on the VCS branch name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueVcsBranchSearch` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
issueVcsBranchSearch?: $Fields.issueVcsBranchSearch<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueVcsBranchSearch<_$Context>>
/**
* Find issues that are related to a given Figma file key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueFigmaFileKeySearch` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
issueFigmaFileKeySearch?: $Fields.issueFigmaFileKeySearch<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueFigmaFileKeySearch<_$Context>>
/**
* Issue priority values and corresponding labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssuePriorityValue}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issuePriorityValues` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
issuePriorityValues?: $Fields.issuePriorityValues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issuePriorityValues<_$Context>>
/**
* Suggests filters for an issue view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueFilterSuggestion?: $Fields.issueFilterSuggestion<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueFilterSuggestion<_$Context>>
/**
* Returns code repositories that are most likely to be relevant for implementing an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$RepositorySuggestionsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueRepositorySuggestions` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
issueRepositorySuggestions?: $Fields.issueRepositorySuggestions<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRepositorySuggestions<_$Context>>
/**
* All issue relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
issueRelations?: $Fields.issueRelations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRelations<_$Context>>
/**
* One specific issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueRelation?: $Fields.issueRelation<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueRelation<_$Context>>
/**
* All issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
issueLabels?: $Fields.issueLabels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabels<_$Context>>
/**
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueLabel?: $Fields.issueLabel<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueLabel<_$Context>>
/**
* Checks a CSV file validity against a specific import service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueImportCheckCSV` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
issueImportCheckCSV?: $Fields.issueImportCheckCSV<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCheckCSV<_$Context>>
/**
* Checks whether it will be possible to setup sync for this project or repository at the end of import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportSyncCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueImportCheckSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueImportCheckSync?: $Fields.issueImportCheckSync<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportCheckSync<_$Context>>
/**
* Checks whether a custom JQL query is valid and can be used to filter issues of a Jira import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueImportJqlCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueImportJqlCheck` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
issueImportJqlCheck?: $Fields.issueImportJqlCheck<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueImportJqlCheck<_$Context>>
/**
* One specific set of settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationsSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integrationsSettings` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationsSettings?: $Fields.integrationsSettings<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationsSettings<_$Context>>
/**
* Template and integration connections.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationTemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integrationTemplates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
integrationTemplates?: $Fields.integrationTemplates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationTemplates<_$Context>>
/**
* One specific integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationTemplate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integrationTemplate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integrationTemplate?: $Fields.integrationTemplate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationTemplate<_$Context>>
/**
* All integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integrations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
integrations?: $Fields.integrations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrations<_$Context>>
/**
* One specific integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Integration}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integration` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
integration?: $Fields.integration<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integration<_$Context>>
/**
* Verify that we received the correct response from the GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitHubEnterpriseServerInstallVerificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.verifyGitHubEnterpriseServerInstallation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
verifyGitHubEnterpriseServerInstallation?: $Fields.verifyGitHubEnterpriseServerInstallation<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.verifyGitHubEnterpriseServerInstallation<_$Context>>
/**
* Checks if the integration has all required scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationHasScopesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.integrationHasScopes` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
integrationHasScopes?: $Fields.integrationHasScopes<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationHasScopes<_$Context>>
/**
* All  InitiativeUpdates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
initiativeUpdates?: $Fields.initiativeUpdates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdates<_$Context>>
/**
* A specific  initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeUpdate?: $Fields.initiativeUpdate<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeUpdate<_$Context>>
/**
* returns a list of initiative to project entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeToProjects` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
initiativeToProjects?: $Fields.initiativeToProjects.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProjects<_$Context>>
/**
* One specific initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeToProject` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeToProject?: $Fields.initiativeToProject<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProject<_$Context>>
/**
* All initiatives in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiatives` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
initiatives?: $Fields.initiatives.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiatives<_$Context>>
/**
* One specific initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Initiative}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiative` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiative?: $Fields.initiative<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiative<_$Context>>
/**
* All initiative relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
initiativeRelations?: $Fields.initiativeRelations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeRelations<_$Context>>
/**
* One specific initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.initiativeRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
initiativeRelation?: $Fields.initiativeRelation<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeRelation<_$Context>>
/**
* [Internal] Fetch an arbitrary set of data using natural language query. Be specific about what you want including properties for each entity, sort order, filters, limit and properties.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FetchDataPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.fetchData` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
fetchData?: $Fields.fetchData<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.fetchData<_$Context>>
/**
* The user's favorites.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FavoriteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.favorites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
favorites?: $Fields.favorites.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favorites<_$Context>>
/**
* One specific favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Favorite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.favorite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
favorite?: $Fields.favorite<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favorite<_$Context>>
/**
* All external users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ExternalUserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.externalUsers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
externalUsers?: $Fields.externalUsers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalUsers<_$Context>>
/**
* One specific external user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ExternalUser}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.externalUser` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
externalUser?: $Fields.externalUser<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalUser<_$Context>>
/**
* One specific entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EntityExternalLink}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.entityExternalLink` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
entityExternalLink?: $Fields.entityExternalLink<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.entityExternalLink<_$Context>>
/**
* All custom emojis.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmojiConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.emojis` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
emojis?: $Fields.emojis.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emojis<_$Context>>
/**
* A specific emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Emoji}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.emoji` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emoji?: $Fields.emoji<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emoji<_$Context>>
/**
* One specific email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EmailIntakeAddress}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.emailIntakeAddress` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
emailIntakeAddress?: $Fields.emailIntakeAddress<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.emailIntakeAddress<_$Context>>
/**
* All documents in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
documents?: $Fields.documents.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documents<_$Context>>
/**
* One specific document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Document}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.document` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
document?: $Fields.document<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.document<_$Context>>
/**
* A collection of document content history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentContentHistoryPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.documentContentHistory` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
documentContentHistory?: $Fields.documentContentHistory<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentContentHistory<_$Context>>
/**
* All cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CycleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.cycles` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
cycles?: $Fields.cycles.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycles<_$Context>>
/**
* One specific cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.cycle` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
cycle?: $Fields.cycle<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycle<_$Context>>
/**
* All customer tiers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerTierConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerTiers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
customerTiers?: $Fields.customerTiers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerTiers<_$Context>>
/**
* One specific customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerTier}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerTier` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerTier?: $Fields.customerTier<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerTier<_$Context>>
/**
* All customer statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
customerStatuses?: $Fields.customerStatuses.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerStatuses<_$Context>>
/**
* One specific customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customerStatus?: $Fields.customerStatus<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerStatus<_$Context>>
/**
* All customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customers` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
customers?: $Fields.customers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customers<_$Context>>
/**
* One specific customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Customer}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customer` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customer?: $Fields.customer<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customer<_$Context>>
/**
* All customer needs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerNeeds` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
customerNeeds?: $Fields.customerNeeds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeeds<_$Context>>
/**
* One specific customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeed}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customerNeed` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customerNeed?: $Fields.customerNeed.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customerNeed<_$Context>>
/**
* Suggests issue title based on a customer request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueTitleSuggestionFromCustomerRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.issueTitleSuggestionFromCustomerRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueTitleSuggestionFromCustomerRequest?: $Fields.issueTitleSuggestionFromCustomerRequest<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueTitleSuggestionFromCustomerRequest<_$Context>>
/**
* Custom views for the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomViewConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customViews` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
customViews?: $Fields.customViews.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViews<_$Context>>
/**
* One specific custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomView}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customView` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customView?: $Fields.customView<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customView<_$Context>>
/**
* [INTERNAL] Suggests metadata for a view based on it's filters.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomViewSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customViewDetailsSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
customViewDetailsSuggestion?: $Fields.customViewDetailsSuggestion<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViewDetailsSuggestion<_$Context>>
/**
* Whether a custom view has other subscribers than the current user in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomViewHasSubscribersPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.customViewHasSubscribers` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
customViewHasSubscribers?: $Fields.customViewHasSubscribers<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.customViewHasSubscribers<_$Context>>
/**
* All comments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
comments?: $Fields.comments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comments<_$Context>>
/**
* A specific comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Comment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.comment` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
comment?: $Fields.comment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comment<_$Context>>
/**
* Fetch users belonging to this user account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.availableUsers` |
* | **Nullability** | Required |
*/
availableUsers?: $Fields.availableUsers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.availableUsers<_$Context>>
/**
* User's active sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.authenticationSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
authenticationSessions?: $Fields.authenticationSessions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.authenticationSessions<_$Context>>
/**
* Fetch SSO login URL for the email provided.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$SsoUrlFromEmailResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.ssoUrlFromEmail` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
ssoUrlFromEmail?: $Fields.ssoUrlFromEmail<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.ssoUrlFromEmail<_$Context>>
/**
* List of audit entry types.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuditEntryType}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.auditEntryTypes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
auditEntryTypes?: $Fields.auditEntryTypes.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.auditEntryTypes<_$Context>>
/**
* All audit log entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuditEntryConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.auditEntries` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
auditEntries?: $Fields.auditEntries.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.auditEntries<_$Context>>
/**
* All issue attachments.
*
* To get attachments for a given URL, use `attachmentsForURL` query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.attachments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
attachments?: $Fields.attachments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachments<_$Context>>
/**
* One specific issue attachment.
* [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Attachment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.attachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachment?: $Fields.attachment<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachment<_$Context>>
/**
* Returns issue attachments for a given `url`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.attachmentsForURL` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
attachmentsForURL?: $Fields.attachmentsForURL<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentsForURL<_$Context>>
/**
* Query an issue by its associated attachment, and its id.
*
*
* @deprecated Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.attachmentIssue` |
* | **⚠ Deprecated** | Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachmentIssue?: $Fields.attachmentIssue<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentIssue<_$Context>>
/**
* [Internal] Get a list of all unique attachment sources in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AttachmentSourcesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.attachmentSources` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
attachmentSources?: $Fields.attachmentSources.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.attachmentSources<_$Context>>
/**
* Asks web form settings by ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AsksWebSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.asksWebSetting` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
asksWebSetting?: $Fields.asksWebSetting<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.asksWebSetting<_$Context>>
/**
* Get basic information for an application.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Application}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.applicationInfo` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
applicationInfo?: $Fields.applicationInfo<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.applicationInfo<_$Context>>
/**
* All agent sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.agentSessions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
agentSessions?: $Fields.agentSessions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSessions<_$Context>>
/**
* A specific agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSession}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.agentSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentSession?: $Fields.agentSession<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentSession<_$Context>>
/**
* All agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentActivityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.agentActivities` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
agentActivities?: $Fields.agentActivities.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentActivities<_$Context>>
/**
* A specific agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentActivity}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Query} |
* | **Path** | `Query.agentActivity` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
agentActivity?: $Fields.agentActivity<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.agentActivity<_$Context>>
      
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
* A meta field. Is the name of the type being selected.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}