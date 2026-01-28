import type * as $Fields from './fields.js'

export * as Dashboard from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A dashboard, usually a collection of widgets to display several insights at once.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 18 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Dashboard {
kind: "Object",
name: "Dashboard",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
slugId: $Fields.slugId,
name: $Fields.name,
description: $Fields.description,
icon: $Fields.icon,
color: $Fields.color,
sortOrder: $Fields.sortOrder,
shared: $Fields.shared,
organization: $Fields.organization,
creator: $Fields.creator,
updatedBy: $Fields.updatedBy,
owner: $Fields.owner,
issueFilter: $Fields.issueFilter,
projectFilter: $Fields.projectFilter,
widgets: $Fields.widgets
}
}