import type * as $Fields from './fields.js'

export * as AgentSessionUpdateExternalUrlInput from './fields.js'

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
export interface AgentSessionUpdateExternalUrlInput {
kind: "InputObject",
name: "AgentSessionUpdateExternalUrlInput",
isAllFieldsNullable: true,
fields: {
externalLink: $Fields.externalLink,
externalUrls: $Fields.externalUrls,
addedExternalUrls: $Fields.addedExternalUrls,
removedExternalUrls: $Fields.removedExternalUrls
},
type: {
externalLink?: $Fields.externalLink['type'],
externalUrls?: $Fields.externalUrls['type'],
addedExternalUrls?: $Fields.addedExternalUrls['type'],
removedExternalUrls?: $Fields.removedExternalUrls['type']
}
}