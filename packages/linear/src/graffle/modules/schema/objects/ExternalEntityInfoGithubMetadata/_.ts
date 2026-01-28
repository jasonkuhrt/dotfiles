import type * as $Fields from './fields.js'

export * as ExternalEntityInfoGithubMetadata from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Metadata about the external GitHub entity.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface ExternalEntityInfoGithubMetadata {
kind: "Object",
name: "ExternalEntityInfoGithubMetadata",
fields: {
__typename: $Fields.__typename,
repo: $Fields.repo,
owner: $Fields.owner,
number: $Fields.number
}
}