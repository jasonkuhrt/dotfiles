import type * as $Fields from './fields.js'

export * as CustomerTierFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer tier filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerTierFilter {
kind: "InputObject",
name: "CustomerTierFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
displayName: $Fields.displayName,
description: $Fields.description,
position: $Fields.position,
color: $Fields.color,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
displayName?: $Fields.displayName['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
color?: $Fields.color['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}