import type * as $Fields from './fields.js'

export * as NullableTeamFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Team filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableTeamFilter {
kind: "InputObject",
name: "NullableTeamFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
key: $Fields.key,
description: $Fields.description,
private: $Fields.private,
issues: $Fields.issues,
parent: $Fields.parent,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
key?: $Fields.key['type'],
description?: $Fields.description['type'],
private?: $Fields.private['type'],
issues?: $Fields.issues['type'],
parent?: $Fields.parent['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}