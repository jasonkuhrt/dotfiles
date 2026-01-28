import type * as $Fields from './fields.js'

export * as ProjectRelationUpdateInput from './fields.js'

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
export interface ProjectRelationUpdateInput {
kind: "InputObject",
name: "ProjectRelationUpdateInput",
isAllFieldsNullable: true,
fields: {
type: $Fields.type,
projectId: $Fields.projectId,
projectMilestoneId: $Fields.projectMilestoneId,
anchorType: $Fields.anchorType,
relatedProjectId: $Fields.relatedProjectId,
relatedProjectMilestoneId: $Fields.relatedProjectMilestoneId,
relatedAnchorType: $Fields.relatedAnchorType
},
type: {
type?: $Fields.type['type'],
projectId?: $Fields.projectId['type'],
projectMilestoneId?: $Fields.projectMilestoneId['type'],
anchorType?: $Fields.anchorType['type'],
relatedProjectId?: $Fields.relatedProjectId['type'],
relatedProjectMilestoneId?: $Fields.relatedProjectMilestoneId['type'],
relatedAnchorType?: $Fields.relatedAnchorType['type']
}
}