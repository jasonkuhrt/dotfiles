import type * as $Fields from './fields.js'

export * as ProjectMilestoneUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectMilestoneUpdateInput {
kind: "InputObject",
name: "ProjectMilestoneUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
descriptionData: $Fields.descriptionData,
targetDate: $Fields.targetDate,
sortOrder: $Fields.sortOrder,
projectId: $Fields.projectId
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
descriptionData?: $Fields.descriptionData['type'],
targetDate?: $Fields.targetDate['type'],
sortOrder?: $Fields.sortOrder['type'],
projectId?: $Fields.projectId['type']
}
}