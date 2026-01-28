import type * as $Fields from './fields.js'

export * as CommentCollectionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comment filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentCollectionFilter {
kind: "InputObject",
name: "CommentCollectionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
body: $Fields.body,
user: $Fields.user,
issue: $Fields.issue,
projectUpdate: $Fields.projectUpdate,
parent: $Fields.parent,
documentContent: $Fields.documentContent,
reactions: $Fields.reactions,
needs: $Fields.needs,
and: $Fields.and,
or: $Fields.or,
some: $Fields.some,
every: $Fields.every,
length: $Fields.length
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
body?: $Fields.body['type'],
user?: $Fields.user['type'],
issue?: $Fields.issue['type'],
projectUpdate?: $Fields.projectUpdate['type'],
parent?: $Fields.parent['type'],
documentContent?: $Fields.documentContent['type'],
reactions?: $Fields.reactions['type'],
needs?: $Fields.needs['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type']
}
}