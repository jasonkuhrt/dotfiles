import type * as $Fields from './fields.js'

export * as AgentSessionCreateOnComment from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentSessionCreateOnComment {
kind: "InputObject",
name: "AgentSessionCreateOnComment",
isAllFieldsNullable: true,
fields: {
commentId: $Fields.commentId,
externalLink: $Fields.externalLink,
externalUrls: $Fields.externalUrls
},
type: {
commentId: $Fields.commentId['type'],
externalLink?: $Fields.externalLink['type'],
externalUrls?: $Fields.externalUrls['type']
}
}