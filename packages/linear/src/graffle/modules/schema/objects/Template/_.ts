import type * as $Fields from './fields.js'

export * as Template from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A template object used for creating entities faster.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 16 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Template {
kind: "Object",
name: "Template",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
name: $Fields.name,
description: $Fields.description,
templateData: $Fields.templateData,
sortOrder: $Fields.sortOrder,
lastAppliedAt: $Fields.lastAppliedAt,
organization: $Fields.organization,
team: $Fields.team,
creator: $Fields.creator,
lastUpdatedBy: $Fields.lastUpdatedBy,
inheritedFrom: $Fields.inheritedFrom,
hasFormFields: $Fields.hasFormFields
}
}