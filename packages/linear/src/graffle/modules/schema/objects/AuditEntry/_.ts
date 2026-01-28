import type * as $Fields from './fields.js'

export * as AuditEntry from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Workspace audit log entry object.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AuditEntry {
kind: "Object",
name: "AuditEntry",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
organization: $Fields.organization,
actor: $Fields.actor,
actorId: $Fields.actorId,
ip: $Fields.ip,
countryCode: $Fields.countryCode,
metadata: $Fields.metadata,
requestInformation: $Fields.requestInformation
}
}