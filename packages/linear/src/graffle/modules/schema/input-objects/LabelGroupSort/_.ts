import type * as $Fields from './fields.js'

export * as LabelGroupSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue label-group sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface LabelGroupSort {
kind: "InputObject",
name: "LabelGroupSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order,
labelGroupId: $Fields.labelGroupId
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type'],
labelGroupId: $Fields.labelGroupId['type']
}
}