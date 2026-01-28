import type * as $Fields from './fields.js'

export * as SyncedExternalThread from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A comment thread that is synced with an external source.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
*/
export interface SyncedExternalThread {
kind: "Object",
name: "SyncedExternalThread",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
type: $Fields.type,
subType: $Fields.subType,
name: $Fields.name,
displayName: $Fields.displayName,
url: $Fields.url,
isConnected: $Fields.isConnected,
isPersonalIntegrationConnected: $Fields.isPersonalIntegrationConnected,
isPersonalIntegrationRequired: $Fields.isPersonalIntegrationRequired
}
}