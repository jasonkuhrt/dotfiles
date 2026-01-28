import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.sendNoteOnStatusChange` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether an internal message should be added when someone comments on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.sendNoteOnComment` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.automateTicketReopeningOnCompletion` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear issue is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.automateTicketReopeningOnCancellation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.automateTicketReopeningOnComment` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* [ALPHA] Whether customer and customer requests should not be automatically created when conversations are linked to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.disableCustomerRequestsAutoCreation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.automateTicketReopeningOnProjectCompletion` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether a ticket should be automatically reopened when its linked Linear project is cancelled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.automateTicketReopeningOnProjectCancellation` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* Whether Linear Agent should be enabled for this integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.enableAiIntake` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* The subdomain of the Zendesk organization being connected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.subdomain` |
* | **Nullability** | Required |
*/
export interface subdomain {
kind: "InputField",
name: "subdomain",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* The URL of the connected Zendesk organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* The ID of the Linear bot user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.botUserId` |
* | **Nullability** | Optional |
*/
export interface botUserId {
kind: "InputField",
name: "botUserId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* [INTERNAL] Temporary flag indicating if the integration has the necessary scopes for Customers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.canReadCustomers` |
* | **Nullability** | Optional |
*/
export interface canReadCustomers {
kind: "InputField",
name: "canReadCustomers",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ZendeskSettingsInput}.
*
* [INTERNAL] Flag indicating if the integration supports OAuth refresh tokens
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ZendeskSettingsInput} |
* | **Path** | `ZendeskSettingsInput.supportsOAuthRefresh` |
* | **Nullability** | Optional |
*/
export interface supportsOAuthRefresh {
kind: "InputField",
name: "supportsOAuthRefresh",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}