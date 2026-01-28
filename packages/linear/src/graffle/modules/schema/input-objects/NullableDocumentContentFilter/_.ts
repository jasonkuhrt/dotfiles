import type * as $Fields from './fields.js'

export * as NullableDocumentContentFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Document content filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableDocumentContentFilter {
kind: "InputObject",
name: "NullableDocumentContentFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
content: $Fields.content,
project: $Fields.project,
document: $Fields.document,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
content?: $Fields.content['type'],
project?: $Fields.project['type'],
document?: $Fields.document['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}