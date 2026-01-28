import type * as $Fields from './fields.js'

export * as IntegrationsSettingsUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationsSettingsUpdateInput {
kind: "InputObject",
name: "IntegrationsSettingsUpdateInput",
isAllFieldsNullable: true,
fields: {
slackIssueCreated: $Fields.slackIssueCreated,
slackIssueAddedToView: $Fields.slackIssueAddedToView,
slackIssueNewComment: $Fields.slackIssueNewComment,
slackIssueStatusChangedDone: $Fields.slackIssueStatusChangedDone,
slackIssueStatusChangedAll: $Fields.slackIssueStatusChangedAll,
slackProjectUpdateCreated: $Fields.slackProjectUpdateCreated,
slackProjectUpdateCreatedToTeam: $Fields.slackProjectUpdateCreatedToTeam,
slackProjectUpdateCreatedToWorkspace: $Fields.slackProjectUpdateCreatedToWorkspace,
slackInitiativeUpdateCreated: $Fields.slackInitiativeUpdateCreated,
slackIssueAddedToTriage: $Fields.slackIssueAddedToTriage,
slackIssueSlaHighRisk: $Fields.slackIssueSlaHighRisk,
slackIssueSlaBreached: $Fields.slackIssueSlaBreached
},
type: {
slackIssueCreated?: $Fields.slackIssueCreated['type'],
slackIssueAddedToView?: $Fields.slackIssueAddedToView['type'],
slackIssueNewComment?: $Fields.slackIssueNewComment['type'],
slackIssueStatusChangedDone?: $Fields.slackIssueStatusChangedDone['type'],
slackIssueStatusChangedAll?: $Fields.slackIssueStatusChangedAll['type'],
slackProjectUpdateCreated?: $Fields.slackProjectUpdateCreated['type'],
slackProjectUpdateCreatedToTeam?: $Fields.slackProjectUpdateCreatedToTeam['type'],
slackProjectUpdateCreatedToWorkspace?: $Fields.slackProjectUpdateCreatedToWorkspace['type'],
slackInitiativeUpdateCreated?: $Fields.slackInitiativeUpdateCreated['type'],
slackIssueAddedToTriage?: $Fields.slackIssueAddedToTriage['type'],
slackIssueSlaHighRisk?: $Fields.slackIssueSlaHighRisk['type'],
slackIssueSlaBreached?: $Fields.slackIssueSlaBreached['type']
}
}