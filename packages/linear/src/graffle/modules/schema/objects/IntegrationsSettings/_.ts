import type * as $Fields from './fields.js'

export * as IntegrationsSettings from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* The configuration of all integrations for different entities.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 20 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IntegrationsSettings {
kind: "Object",
name: "IntegrationsSettings",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
contextViewType: $Fields.contextViewType,
slackIssueCreated: $Fields.slackIssueCreated,
slackIssueNewComment: $Fields.slackIssueNewComment,
slackIssueStatusChangedDone: $Fields.slackIssueStatusChangedDone,
slackIssueAddedToView: $Fields.slackIssueAddedToView,
slackIssueStatusChangedAll: $Fields.slackIssueStatusChangedAll,
slackProjectUpdateCreated: $Fields.slackProjectUpdateCreated,
slackProjectUpdateCreatedToTeam: $Fields.slackProjectUpdateCreatedToTeam,
slackProjectUpdateCreatedToWorkspace: $Fields.slackProjectUpdateCreatedToWorkspace,
slackInitiativeUpdateCreated: $Fields.slackInitiativeUpdateCreated,
slackIssueAddedToTriage: $Fields.slackIssueAddedToTriage,
slackIssueSlaHighRisk: $Fields.slackIssueSlaHighRisk,
slackIssueSlaBreached: $Fields.slackIssueSlaBreached,
team: $Fields.team,
project: $Fields.project,
initiative: $Fields.initiative
}
}