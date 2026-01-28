import type * as $Fields from './fields.js'

export * as Customer from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A customer whose needs will be tied to issues or projects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 19 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Customer {
kind: "Object",
name: "Customer",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
logoUrl: $Fields.logoUrl,
domains: $Fields.domains,
externalIds: $Fields.externalIds,
slackChannelId: $Fields.slackChannelId,
owner: $Fields.owner,
status: $Fields.status,
revenue: $Fields.revenue,
size: $Fields.size,
tier: $Fields.tier,
approximateNeedCount: $Fields.approximateNeedCount,
slugId: $Fields.slugId,
mainSourceId: $Fields.mainSourceId,
integration: $Fields.integration,
url: $Fields.url
}
}