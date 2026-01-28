import type * as $Fields from './fields.js'

export * as OrganizationIpRestriction from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface OrganizationIpRestriction {
kind: "Object",
name: "OrganizationIpRestriction",
fields: {
__typename: $Fields.__typename,
range: $Fields.range,
type: $Fields.type,
description: $Fields.description,
enabled: $Fields.enabled
}
}