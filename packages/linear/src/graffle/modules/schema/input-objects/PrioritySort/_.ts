import type * as $Fields from './fields.js'

export * as PrioritySort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue priority sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface PrioritySort {
kind: "InputObject",
name: "PrioritySort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order,
noPriorityFirst: $Fields.noPriorityFirst
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type'],
noPriorityFirst?: $Fields.noPriorityFirst['type']
}
}