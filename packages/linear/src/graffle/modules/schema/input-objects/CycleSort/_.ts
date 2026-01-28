import type * as $Fields from './fields.js'

export * as CycleSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue cycle sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface CycleSort {
kind: "InputObject",
name: "CycleSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order,
currentCycleFirst: $Fields.currentCycleFirst
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type'],
currentCycleFirst?: $Fields.currentCycleFirst['type']
}
}