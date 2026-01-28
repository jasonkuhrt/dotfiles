import type * as $Fields from './fields.js'

export * as DocumentFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Document filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface DocumentFilter {
kind: "InputObject",
name: "DocumentFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
title: $Fields.title,
slugId: $Fields.slugId,
creator: $Fields.creator,
project: $Fields.project,
issue: $Fields.issue,
initiative: $Fields.initiative,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
title?: $Fields.title['type'],
slugId?: $Fields.slugId['type'],
creator?: $Fields.creator['type'],
project?: $Fields.project['type'],
issue?: $Fields.issue['type'],
initiative?: $Fields.initiative['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}