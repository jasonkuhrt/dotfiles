import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.sendNoteOnStatusChange` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether an internal message should be added when someone comments on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.sendNoteOnComment` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.automateTicketReopeningOnCompletion` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.automateTicketReopeningOnCancellation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.automateTicketReopeningOnComment` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* [ALPHA] Whether customer and customer requests should not be automatically created when conversations are linked to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.disableCustomerRequestsAutoCreation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.automateTicketReopeningOnProjectCompletion` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.automateTicketReopeningOnProjectCancellation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether Linear Agent should be enabled for this integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.enableAiIntake` |
* | **Nullability** | Optional |
*/
export interface enableAiIntake {
kind: "InputField",
name: "enableAiIntake",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* The Salesforce subdomain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.subdomain` |
* | **Nullability** | Optional |
*/
export interface subdomain {
kind: "InputField",
name: "subdomain",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* The Salesforce instance URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.url` |
* | **Nullability** | Optional |
*/
export interface url {
kind: "InputField",
name: "url",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* The Salesforce case status to use to reopen cases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.reopenCaseStatus` |
* | **Nullability** | Optional |
*/
export interface reopenCaseStatus {
kind: "InputField",
name: "reopenCaseStatus",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* Whether to restrict visibility of the integration to issues that have been either created from Salesforce or linked to Salesforce.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.restrictVisibility` |
* | **Nullability** | Optional |
*/
export interface restrictVisibility {
kind: "InputField",
name: "restrictVisibility",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceSettingsInput}.
*
* The Salesforce team to use when a template doesn't specify a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SalesforceSettingsInput} |
* | **Path** | `SalesforceSettingsInput.defaultTeam` |
* | **Nullability** | Optional |
*/
export interface defaultTeam {
kind: "InputField",
name: "defaultTeam",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}