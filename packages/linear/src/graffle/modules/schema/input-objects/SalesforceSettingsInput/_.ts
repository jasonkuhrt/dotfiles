import type * as $Fields from './fields.js'

export * as SalesforceSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface SalesforceSettingsInput {
kind: "InputObject",
name: "SalesforceSettingsInput",
isAllFieldsNullable: true,
fields: {
sendNoteOnStatusChange: $Fields.sendNoteOnStatusChange,
sendNoteOnComment: $Fields.sendNoteOnComment,
automateTicketReopeningOnCompletion: $Fields.automateTicketReopeningOnCompletion,
automateTicketReopeningOnCancellation: $Fields.automateTicketReopeningOnCancellation,
automateTicketReopeningOnComment: $Fields.automateTicketReopeningOnComment,
disableCustomerRequestsAutoCreation: $Fields.disableCustomerRequestsAutoCreation,
automateTicketReopeningOnProjectCompletion: $Fields.automateTicketReopeningOnProjectCompletion,
automateTicketReopeningOnProjectCancellation: $Fields.automateTicketReopeningOnProjectCancellation,
enableAiIntake: $Fields.enableAiIntake,
subdomain: $Fields.subdomain,
url: $Fields.url,
reopenCaseStatus: $Fields.reopenCaseStatus,
restrictVisibility: $Fields.restrictVisibility,
defaultTeam: $Fields.defaultTeam
},
type: {
sendNoteOnStatusChange?: $Fields.sendNoteOnStatusChange['type'],
sendNoteOnComment?: $Fields.sendNoteOnComment['type'],
automateTicketReopeningOnCompletion?: $Fields.automateTicketReopeningOnCompletion['type'],
automateTicketReopeningOnCancellation?: $Fields.automateTicketReopeningOnCancellation['type'],
automateTicketReopeningOnComment?: $Fields.automateTicketReopeningOnComment['type'],
disableCustomerRequestsAutoCreation?: $Fields.disableCustomerRequestsAutoCreation['type'],
automateTicketReopeningOnProjectCompletion?: $Fields.automateTicketReopeningOnProjectCompletion['type'],
automateTicketReopeningOnProjectCancellation?: $Fields.automateTicketReopeningOnProjectCancellation['type'],
enableAiIntake?: $Fields.enableAiIntake['type'],
subdomain?: $Fields.subdomain['type'],
url?: $Fields.url['type'],
reopenCaseStatus?: $Fields.reopenCaseStatus['type'],
restrictVisibility?: $Fields.restrictVisibility['type'],
defaultTeam?: $Fields.defaultTeam['type']
}
}