import type * as $Fields from './fields.js'

export * as AttachmentCollectionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Attachment collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentCollectionFilter {
kind: "InputObject",
name: "AttachmentCollectionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
title: $Fields.title,
subtitle: $Fields.subtitle,
url: $Fields.url,
creator: $Fields.creator,
sourceType: $Fields.sourceType,
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
title?: $Fields.title['type'],
subtitle?: $Fields.subtitle['type'],
url?: $Fields.url['type'],
creator?: $Fields.creator['type'],
sourceType?: $Fields.sourceType['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type']
}
}