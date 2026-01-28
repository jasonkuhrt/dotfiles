import type * as $Fields from './fields.js'

export * as EntityExternalLinkPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface EntityExternalLinkPayload {
kind: "Object",
name: "EntityExternalLinkPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
entityExternalLink: $Fields.entityExternalLink,
success: $Fields.success
}
}