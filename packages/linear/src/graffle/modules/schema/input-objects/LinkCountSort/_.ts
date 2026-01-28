import type * as $Fields from './fields.js'

export * as LinkCountSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [ALPHA] Issue link count sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface LinkCountSort {
kind: "InputObject",
name: "LinkCountSort",
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