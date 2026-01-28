import type * as $Fields from './fields.js'

export * as Facet from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A facet. Facets are joins between entities. A facet can tie a custom view to a project, or a a project to a roadmap for example.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 12 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Facet {
kind: "Object",
name: "Facet",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
sortOrder: $Fields.sortOrder,
sourceOrganization: $Fields.sourceOrganization,
sourceTeam: $Fields.sourceTeam,
sourceProject: $Fields.sourceProject,
sourceInitiative: $Fields.sourceInitiative,
sourceFeedUser: $Fields.sourceFeedUser,
sourcePage: $Fields.sourcePage,
targetCustomView: $Fields.targetCustomView
}
}