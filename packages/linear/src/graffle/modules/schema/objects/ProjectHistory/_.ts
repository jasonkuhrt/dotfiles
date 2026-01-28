import type * as $Fields from './fields.js'

export * as ProjectHistory from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An history associated with a project.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 6 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectHistory {
kind: "Object",
name: "ProjectHistory",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
entries: $Fields.entries,
project: $Fields.project
}
}