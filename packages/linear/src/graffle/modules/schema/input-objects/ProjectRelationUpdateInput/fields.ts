import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The type of relation of the project to the related project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.type` |
* | **Nullability** | Optional |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The identifier of the project that is related to another project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "InputField",
name: "projectId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The identifier of the project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.projectMilestoneId` |
* | **Nullability** | Optional |
*/
export interface projectMilestoneId {
kind: "InputField",
name: "projectMilestoneId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The type of the anchor for the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.anchorType` |
* | **Nullability** | Optional |
*/
export interface anchorType {
kind: "InputField",
name: "anchorType",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The identifier of the related project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.relatedProjectId` |
* | **Nullability** | Optional |
*/
export interface relatedProjectId {
kind: "InputField",
name: "relatedProjectId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The identifier of the related project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.relatedProjectMilestoneId` |
* | **Nullability** | Optional |
*/
export interface relatedProjectMilestoneId {
kind: "InputField",
name: "relatedProjectMilestoneId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectRelationUpdateInput}.
*
* The type of the anchor for the related project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectRelationUpdateInput} |
* | **Path** | `ProjectRelationUpdateInput.relatedAnchorType` |
* | **Nullability** | Optional |
*/
export interface relatedAnchorType {
kind: "InputField",
name: "relatedAnchorType",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}