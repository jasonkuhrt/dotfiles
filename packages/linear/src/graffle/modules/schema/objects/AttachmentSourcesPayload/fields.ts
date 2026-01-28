import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AttachmentSourcesPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "AttachmentSourcesPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AttachmentSourcesPayload}.
*
* A unique list of all source types used in this workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AttachmentSourcesPayload} |
* | **Path** | `AttachmentSourcesPayload.sources` |
* | **Nullability** | Required |
*/
export interface sources {
kind: "OutputField",
name: "sources",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}
