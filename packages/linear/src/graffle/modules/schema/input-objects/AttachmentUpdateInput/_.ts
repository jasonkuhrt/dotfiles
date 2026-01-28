import type * as $Fields from './fields.js'

export * as AttachmentUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentUpdateInput {
kind: "InputObject",
name: "AttachmentUpdateInput",
isAllFieldsNullable: true,
fields: {
title: $Fields.title,
subtitle: $Fields.subtitle,
metadata: $Fields.metadata,
iconUrl: $Fields.iconUrl
},
type: {
title: $Fields.title['type'],
subtitle?: $Fields.subtitle['type'],
metadata?: $Fields.metadata['type'],
iconUrl?: $Fields.iconUrl['type']
}
}