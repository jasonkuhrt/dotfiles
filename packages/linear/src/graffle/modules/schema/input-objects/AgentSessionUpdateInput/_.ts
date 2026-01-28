import type * as $Fields from './fields.js'

export * as AgentSessionUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface AgentSessionUpdateInput {
kind: "InputObject",
name: "AgentSessionUpdateInput",
isAllFieldsNullable: true,
fields: {
externalLink: $Fields.externalLink,
externalUrls: $Fields.externalUrls,
addedExternalUrls: $Fields.addedExternalUrls,
removedExternalUrls: $Fields.removedExternalUrls,
plan: $Fields.plan,
dismissedAt: $Fields.dismissedAt,
userState: $Fields.userState
},
type: {
externalLink?: $Fields.externalLink['type'],
externalUrls?: $Fields.externalUrls['type'],
addedExternalUrls?: $Fields.addedExternalUrls['type'],
removedExternalUrls?: $Fields.removedExternalUrls['type'],
plan?: $Fields.plan['type'],
dismissedAt?: $Fields.dismissedAt['type'],
userState?: $Fields.userState['type']
}
}