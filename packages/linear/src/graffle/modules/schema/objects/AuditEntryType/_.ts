import type * as $Fields from './fields.js'

export * as AuditEntryType from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface AuditEntryType {
kind: "Object",
name: "AuditEntryType",
fields: {
__typename: $Fields.__typename,
type: $Fields.type,
description: $Fields.description
}
}