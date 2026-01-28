import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.sendNoteOnStatusChange` |
* | **Nullability** | Optional |
*/
export interface sendNoteOnStatusChange {
kind: "InputField",
name: "sendNoteOnStatusChange",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether an internal message should be added when someone comments on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.sendNoteOnComment` |
* | **Nullability** | Optional |
*/
export interface sendNoteOnComment {
kind: "InputField",
name: "sendNoteOnComment",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.automateTicketReopeningOnCompletion` |
* | **Nullability** | Optional |
*/
export interface automateTicketReopeningOnCompletion {
kind: "InputField",
name: "automateTicketReopeningOnCompletion",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.automateTicketReopeningOnCancellation` |
* | **Nullability** | Optional |
*/
export interface automateTicketReopeningOnCancellation {
kind: "InputField",
name: "automateTicketReopeningOnCancellation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.automateTicketReopeningOnComment` |
* | **Nullability** | Optional |
*/
export interface automateTicketReopeningOnComment {
kind: "InputField",
name: "automateTicketReopeningOnComment",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* [ALPHA] Whether customer and customer requests should not be automatically created when conversations are linked to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.disableCustomerRequestsAutoCreation` |
* | **Nullability** | Optional |
*/
export interface disableCustomerRequestsAutoCreation {
kind: "InputField",
name: "disableCustomerRequestsAutoCreation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.automateTicketReopeningOnProjectCompletion` |
* | **Nullability** | Optional |
*/
export interface automateTicketReopeningOnProjectCompletion {
kind: "InputField",
name: "automateTicketReopeningOnProjectCompletion",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.automateTicketReopeningOnProjectCancellation` |
* | **Nullability** | Optional |
*/
export interface automateTicketReopeningOnProjectCancellation {
kind: "InputField",
name: "automateTicketReopeningOnProjectCancellation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntercomSettingsInput}.
*
* Whether Linear Agent should be enabled for this integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IntercomSettingsInput} |
* | **Path** | `IntercomSettingsInput.enableAiIntake` |
* | **Nullability** | Optional |
*/
export interface enableAiIntake {
kind: "InputField",
name: "enableAiIntake",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}