import type * as $Fields from './fields.js'

export * as WebhookUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface WebhookUpdateInput {
kind: "InputObject",
name: "WebhookUpdateInput",
isAllFieldsNullable: true,
fields: {
label: $Fields.label,
secret: $Fields.secret,
enabled: $Fields.enabled,
url: $Fields.url,
resourceTypes: $Fields.resourceTypes
},
type: {
label?: $Fields.label['type'],
secret?: $Fields.secret['type'],
enabled?: $Fields.enabled['type'],
url?: $Fields.url['type'],
resourceTypes?: $Fields.resourceTypes['type']
}
}