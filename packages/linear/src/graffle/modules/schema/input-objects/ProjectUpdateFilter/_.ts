import type * as $Fields from './fields.js'

export * as ProjectUpdateFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Options for filtering project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectUpdateFilter {
kind: "InputObject",
name: "ProjectUpdateFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
user: $Fields.user,
project: $Fields.project,
reactions: $Fields.reactions,
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
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}