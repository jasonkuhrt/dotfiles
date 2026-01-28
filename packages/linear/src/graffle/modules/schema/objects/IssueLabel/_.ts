import type * as $Fields from './fields.js'

export * as IssueLabel from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Labels that can be associated with issues.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 18 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface IssueLabel {
kind: "Object",
name: "IssueLabel",
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
team: $Fields.team,
creator: $Fields.creator,
retiredBy: $Fields.retiredBy,
parent: $Fields.parent,
inheritedFrom: $Fields.inheritedFrom,
issues: $Fields.issues,
children: $Fields.children
}
}