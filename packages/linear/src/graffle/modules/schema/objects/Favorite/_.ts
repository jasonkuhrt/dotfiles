import type * as $Fields from './fields.js'

export * as Favorite from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* User favorites presented in the sidebar.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 35 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Favorite {
kind: "Object",
name: "Favorite",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
type: $Fields.type,
parent: $Fields.parent,
folderName: $Fields.folderName,
projectTab: $Fields.projectTab,
predefinedViewType: $Fields.predefinedViewType,
initiativeTab: $Fields.initiativeTab,
owner: $Fields.owner,
sortOrder: $Fields.sortOrder,
children: $Fields.children,
issue: $Fields.issue,
project: $Fields.project,
facet: $Fields.facet,
projectTeam: $Fields.projectTeam,
cycle: $Fields.cycle,
customView: $Fields.customView,
predefinedViewTeam: $Fields.predefinedViewTeam,
document: $Fields.document,
initiative: $Fields.initiative,
label: $Fields.label,
projectLabel: $Fields.projectLabel,
user: $Fields.user,
customer: $Fields.customer,
dashboard: $Fields.dashboard,
pullRequest: $Fields.pullRequest,
release: $Fields.release,
releasePipeline: $Fields.releasePipeline,
url: $Fields.url,
title: $Fields.title,
detail: $Fields.detail,
color: $Fields.color,
icon: $Fields.icon
}
}