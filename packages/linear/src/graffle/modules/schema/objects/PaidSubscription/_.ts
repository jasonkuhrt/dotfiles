import type * as $Fields from './fields.js'

export * as PaidSubscription from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* The paid subscription of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 15 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface PaidSubscription {
kind: "Object",
name: "PaidSubscription",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
seats: $Fields.seats,
seatsMinimum: $Fields.seatsMinimum,
seatsMaximum: $Fields.seatsMaximum,
creator: $Fields.creator,
organization: $Fields.organization,
collectionMethod: $Fields.collectionMethod,
canceledAt: $Fields.canceledAt,
cancelAt: $Fields.cancelAt,
pendingChangeType: $Fields.pendingChangeType,
nextBillingAt: $Fields.nextBillingAt
}
}