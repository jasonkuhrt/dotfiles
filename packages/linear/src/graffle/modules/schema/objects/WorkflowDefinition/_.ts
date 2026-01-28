import type * as $Fields from './fields.js'

export * as WorkflowDefinition from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 26 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface WorkflowDefinition {
kind: "Object",
name: "WorkflowDefinition",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
groupName: $Fields.groupName,
description: $Fields.description,
type: $Fields.type,
trigger: $Fields.trigger,
triggerType: $Fields.triggerType,
conditions: $Fields.conditions,
enabled: $Fields.enabled,
team: $Fields.team,
creator: $Fields.creator,
activities: $Fields.activities,
sortOrder: $Fields.sortOrder,
lastExecutedAt: $Fields.lastExecutedAt,
lastUpdatedBy: $Fields.lastUpdatedBy,
label: $Fields.label,
cycle: $Fields.cycle,
user: $Fields.user,
project: $Fields.project,
initiative: $Fields.initiative,
customView: $Fields.customView,
contextViewType: $Fields.contextViewType,
userContextViewType: $Fields.userContextViewType
}
}