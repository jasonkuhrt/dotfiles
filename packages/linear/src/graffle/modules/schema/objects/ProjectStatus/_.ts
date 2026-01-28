import type * as $Fields from './fields.js'

export * as ProjectStatus from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A project status.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectStatus {
kind: "Object",
name: "ProjectStatus",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
indefinite: $Fields.indefinite
}
}