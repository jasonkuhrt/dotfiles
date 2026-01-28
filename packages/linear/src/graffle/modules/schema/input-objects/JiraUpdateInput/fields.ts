import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* The id of the integration to update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* Whether to refresh Jira Projects for the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.updateProjects` |
* | **Nullability** | Optional |
*/
export interface updateProjects {
kind: "InputField",
name: "updateProjects",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* Whether to refresh Jira metadata for the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.updateMetadata` |
* | **Nullability** | Optional |
*/
export interface updateMetadata {
kind: "InputField",
name: "updateMetadata",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* Whether to delete the current manual webhook configuration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.deleteWebhook` |
* | **Nullability** | Optional |
*/
export interface deleteWebhook {
kind: "InputField",
name: "deleteWebhook",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* Webhook secret for a new manual configuration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.webhookSecret` |
* | **Nullability** | Optional |
*/
export interface webhookSecret {
kind: "InputField",
name: "webhookSecret",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* Whether the Jira instance does not support webhook secrets.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.noSecret` |
* | **Nullability** | Optional |
*/
export interface noSecret {
kind: "InputField",
name: "noSecret",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* The Jira personal access token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.accessToken` |
* | **Nullability** | Optional |
*/
export interface accessToken {
kind: "InputField",
name: "accessToken",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraUpdateInput}.
*
* The Jira user email address associated with the personal access token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraUpdateInput} |
* | **Path** | `JiraUpdateInput.email` |
* | **Nullability** | Optional |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}