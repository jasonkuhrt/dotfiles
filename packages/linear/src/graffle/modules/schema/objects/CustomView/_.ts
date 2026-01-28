import type * as $Fields from './fields.js'

export * as CustomView from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A custom view that has been saved by a user.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 29 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface CustomView {
kind: "Object",
name: "CustomView",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
description: $Fields.description,
icon: $Fields.icon,
color: $Fields.color,
organization: $Fields.organization,
creator: $Fields.creator,
owner: $Fields.owner,
updatedBy: $Fields.updatedBy,
filters: $Fields.filters,
filterData: $Fields.filterData,
projectFilterData: $Fields.projectFilterData,
initiativeFilterData: $Fields.initiativeFilterData,
feedItemFilterData: $Fields.feedItemFilterData,
shared: $Fields.shared,
slugId: $Fields.slugId,
modelName: $Fields.modelName,
facet: $Fields.facet,
team: $Fields.team,
projects: $Fields.projects,
issues: $Fields.issues,
updates: $Fields.updates,
userViewPreferences: $Fields.userViewPreferences,
organizationViewPreferences: $Fields.organizationViewPreferences,
viewPreferencesValues: $Fields.viewPreferencesValues,
initiatives: $Fields.initiatives
}
}