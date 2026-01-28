import type * as $Fields from './fields.js'

export * as Application from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Public information of the OAuth application.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
*/
export interface Application {
kind: "Object",
name: "Application",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
clientId: $Fields.clientId,
name: $Fields.name,
description: $Fields.description,
developer: $Fields.developer,
developerUrl: $Fields.developerUrl,
imageUrl: $Fields.imageUrl
}
}