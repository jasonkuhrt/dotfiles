import type * as $Fields from './fields.js'

export * as IntegrationsSettingsCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 18 |
* | **All Fields Nullable** | Yes |
*/
export interface IntegrationsSettingsCreateInput {
kind: "InputObject",
name: "IntegrationsSettingsCreateInput",
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
slackIssueSlaBreached: $Fields.slackIssueSlaBreached,
id: $Fields.id,
teamId: $Fields.teamId,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
customViewId: $Fields.customViewId,
contextViewType: $Fields.contextViewType
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
slackIssueSlaBreached?: $Fields.slackIssueSlaBreached['type'],
id?: $Fields.id['type'],
teamId?: $Fields.teamId['type'],
projectId?: $Fields.projectId['type'],
initiativeId?: $Fields.initiativeId['type'],
customViewId?: $Fields.customViewId['type'],
contextViewType?: $Fields.contextViewType['type']
}
}