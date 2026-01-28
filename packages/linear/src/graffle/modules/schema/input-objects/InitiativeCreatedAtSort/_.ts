import type * as $Fields from './fields.js'

export * as InitiativeCreatedAtSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Initiative creation date sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeCreatedAtSort {
kind: "InputObject",
name: "InitiativeCreatedAtSort",
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