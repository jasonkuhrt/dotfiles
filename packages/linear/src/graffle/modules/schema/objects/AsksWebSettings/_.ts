import type * as $Fields from './fields.js'

export * as AsksWebSettings from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Settings for an Asks web form.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 9 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AsksWebSettings {
kind: "Object",
name: "AsksWebSettings",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
organization: $Fields.organization,
creator: $Fields.creator,
domain: $Fields.domain,
emailIntakeAddress: $Fields.emailIntakeAddress,
identityProvider: $Fields.identityProvider
}
}