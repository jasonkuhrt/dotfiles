import type * as $Fields from './fields.js'

export * as TeamCollectionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Team collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface TeamCollectionFilter {
kind: "InputObject",
name: "TeamCollectionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
and: $Fields.and,
or: $Fields.or,
some: $Fields.some,
every: $Fields.every,
length: $Fields.length,
parent: $Fields.parent
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type'],
parent?: $Fields.parent['type']
}
}