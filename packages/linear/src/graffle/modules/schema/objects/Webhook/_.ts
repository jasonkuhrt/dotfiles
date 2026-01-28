import type * as $Fields from './fields.js'

export * as Webhook from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A webhook used to send HTTP notifications over data updates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 14 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Webhook {
kind: "Object",
name: "Webhook",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
label: $Fields.label,
url: $Fields.url,
enabled: $Fields.enabled,
team: $Fields.team,
teamIds: $Fields.teamIds,
allPublicTeams: $Fields.allPublicTeams,
creator: $Fields.creator,
secret: $Fields.secret,
resourceTypes: $Fields.resourceTypes,
failures: $Fields.failures
}
}