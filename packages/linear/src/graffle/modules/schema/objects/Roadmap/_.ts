import type * as $Fields from './fields.js'

export * as Roadmap from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Deprecated] A roadmap for projects.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 14 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Roadmap {
kind: "Object",
name: "Roadmap",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
description: $Fields.description,
organization: $Fields.organization,
creator: $Fields.creator,
owner: $Fields.owner,
slugId: $Fields.slugId,
sortOrder: $Fields.sortOrder,
color: $Fields.color,
projects: $Fields.projects,
url: $Fields.url
}
}