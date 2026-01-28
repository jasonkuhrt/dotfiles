import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.WebhookUpdateInput}.
*
* Label for the webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookUpdateInput} |
* | **Path** | `WebhookUpdateInput.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "InputField",
name: "label",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.WebhookUpdateInput}.
*
* A secret token used to sign the webhook payload.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookUpdateInput} |
* | **Path** | `WebhookUpdateInput.secret` |
* | **Nullability** | Optional |
*/
export interface secret {
kind: "InputField",
name: "secret",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.WebhookUpdateInput}.
*
* Whether this webhook is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookUpdateInput} |
* | **Path** | `WebhookUpdateInput.enabled` |
* | **Nullability** | Optional |
*/
export interface enabled {
kind: "InputField",
name: "enabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.WebhookUpdateInput}.
*
* The URL that will be called on data changes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookUpdateInput} |
* | **Path** | `WebhookUpdateInput.url` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.WebhookUpdateInput}.
*
* List of resources the webhook should subscribe to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.WebhookUpdateInput} |
* | **Path** | `WebhookUpdateInput.resourceTypes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface resourceTypes {
kind: "InputField",
name: "resourceTypes",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}