import type * as $Fields from './fields.js'

export * as ProjectMilestoneCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectMilestoneCreateInput {
kind: "InputObject",
name: "ProjectMilestoneCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
descriptionData: $Fields.descriptionData,
targetDate: $Fields.targetDate,
projectId: $Fields.projectId,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
descriptionData?: $Fields.descriptionData['type'],
targetDate?: $Fields.targetDate['type'],
projectId: $Fields.projectId['type'],
sortOrder?: $Fields.sortOrder['type']
}
}