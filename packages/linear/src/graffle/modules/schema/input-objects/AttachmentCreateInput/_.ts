import type * as $Fields from './fields.js'

export * as AttachmentCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentCreateInput {
kind: "InputObject",
name: "AttachmentCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
title: $Fields.title,
subtitle: $Fields.subtitle,
url: $Fields.url,
issueId: $Fields.issueId,
iconUrl: $Fields.iconUrl,
metadata: $Fields.metadata,
groupBySource: $Fields.groupBySource,
commentBody: $Fields.commentBody,
commentBodyData: $Fields.commentBodyData,
createAsUser: $Fields.createAsUser
},
type: {
id?: $Fields.id['type'],
title: $Fields.title['type'],
subtitle?: $Fields.subtitle['type'],
url: $Fields.url['type'],
issueId: $Fields.issueId['type'],
iconUrl?: $Fields.iconUrl['type'],
metadata?: $Fields.metadata['type'],
groupBySource?: $Fields.groupBySource['type'],
commentBody?: $Fields.commentBody['type'],
commentBodyData?: $Fields.commentBodyData['type'],
createAsUser?: $Fields.createAsUser['type']
}
}