import type * as $Fields from './fields.js'

export * as NullableProjectUpdateFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Nullable project update filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableProjectUpdateFilter {
kind: "InputObject",
name: "NullableProjectUpdateFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
user: $Fields.user,
project: $Fields.project,
reactions: $Fields.reactions,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
user?: $Fields.user['type'],
project?: $Fields.project['type'],
reactions?: $Fields.reactions['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}