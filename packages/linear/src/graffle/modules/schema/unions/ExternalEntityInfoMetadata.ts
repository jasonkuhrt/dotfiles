import type { ExternalEntityInfoGithubMetadata } from '../objects/ExternalEntityInfoGithubMetadata/_.js'
import type { ExternalEntityInfoJiraMetadata } from '../objects/ExternalEntityInfoJiraMetadata/_.js'
import type { ExternalEntitySlackMetadata } from '../objects/ExternalEntitySlackMetadata/_.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 3 |
* | **Types** | {@link $Schema.ExternalEntityInfoGithubMetadata}, {@link $Schema.ExternalEntityInfoJiraMetadata}, {@link $Schema.ExternalEntitySlackMetadata} |
*/
export interface ExternalEntityInfoMetadata {
kind: "Union",
name: "ExternalEntityInfoMetadata",
members: [ExternalEntityInfoGithubMetadata, ExternalEntityInfoJiraMetadata, ExternalEntitySlackMetadata],
membersUnion: ExternalEntityInfoGithubMetadata
| ExternalEntityInfoJiraMetadata
| ExternalEntitySlackMetadata,
membersIndex: {
ExternalEntityInfoGithubMetadata: ExternalEntityInfoGithubMetadata,
ExternalEntityInfoJiraMetadata: ExternalEntityInfoJiraMetadata,
ExternalEntitySlackMetadata: ExternalEntitySlackMetadata
}
}