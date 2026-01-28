import type * as $Fields from './fields.js'

export * as AssigneeSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue assignee sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface AssigneeSort {
kind: "InputObject",
name: "AssigneeSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type']
}
}