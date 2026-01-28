import type * as $Fields from './fields.js'

export * as ProjectRelationCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectRelationCreateInput {
kind: "InputObject",
name: "ProjectRelationCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
type: $Fields.type,
projectId: $Fields.projectId,
projectMilestoneId: $Fields.projectMilestoneId,
anchorType: $Fields.anchorType,
relatedProjectId: $Fields.relatedProjectId,
relatedProjectMilestoneId: $Fields.relatedProjectMilestoneId,
relatedAnchorType: $Fields.relatedAnchorType
},
type: {
id?: $Fields.id['type'],
type: $Fields.type['type'],
projectId: $Fields.projectId['type'],
projectMilestoneId?: $Fields.projectMilestoneId['type'],
anchorType: $Fields.anchorType['type'],
relatedProjectId: $Fields.relatedProjectId['type'],
relatedProjectMilestoneId?: $Fields.relatedProjectMilestoneId['type'],
relatedAnchorType: $Fields.relatedAnchorType['type']
}
}