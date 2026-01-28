import type * as $Fields from './fields.js'

export * as AgentSessionCreateOnIssue from './fields.js'

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
export interface AgentSessionCreateOnIssue {
kind: "InputObject",
name: "AgentSessionCreateOnIssue",
isAllFieldsNullable: true,
fields: {
issueId: $Fields.issueId,
externalLink: $Fields.externalLink,
externalUrls: $Fields.externalUrls
},
type: {
issueId: $Fields.issueId['type'],
externalLink?: $Fields.externalLink['type'],
externalUrls?: $Fields.externalUrls['type']
}
}