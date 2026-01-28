import type * as $Fields from './fields.js'

export * as IntercomSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface IntercomSettingsInput {
kind: "InputObject",
name: "IntercomSettingsInput",
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
enableAiIntake: $Fields.enableAiIntake
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
enableAiIntake?: $Fields.enableAiIntake['type']
}
}