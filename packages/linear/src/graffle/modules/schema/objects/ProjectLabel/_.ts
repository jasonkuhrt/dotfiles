import type * as $Fields from './fields.js'

export * as ProjectLabel from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Labels that can be associated with projects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 16 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectLabel {
kind: "Object",
name: "ProjectLabel",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
description: $Fields.description,
color: $Fields.color,
isGroup: $Fields.isGroup,
lastAppliedAt: $Fields.lastAppliedAt,
retiredAt: $Fields.retiredAt,
organization: $Fields.organization,
creator: $Fields.creator,
retiredBy: $Fields.retiredBy,
parent: $Fields.parent,
projects: $Fields.projects,
children: $Fields.children
}
}