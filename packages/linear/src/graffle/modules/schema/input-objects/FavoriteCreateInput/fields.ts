import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The name of the favorite folder.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.folderName` |
* | **Nullability** | Optional |
*/
export interface folderName {
kind: "InputField",
name: "folderName",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The parent folder of the favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.parentId` |
* | **Nullability** | Optional |
*/
export interface parentId {
kind: "InputField",
name: "parentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the issue to favorite. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.issueId` |
* | **Nullability** | Optional |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the facet to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.facetId` |
* | **Nullability** | Optional |
*/
export interface facetId {
kind: "InputField",
name: "facetId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the project to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The tab of the project to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectTab} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.projectTab` |
* | **Nullability** | Optional |
*/
export interface projectTab {
kind: "InputField",
name: "projectTab",
inlineType: [0, ],
namedType: $Schema.ProjectTab,
type: $Schema.ProjectTab['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The type of the predefined view to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.predefinedViewType` |
* | **Nullability** | Optional |
*/
export interface predefinedViewType {
kind: "InputField",
name: "predefinedViewType",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of team for the predefined view to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.predefinedViewTeamId` |
* | **Nullability** | Optional |
*/
export interface predefinedViewTeamId {
kind: "InputField",
name: "predefinedViewTeamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the cycle to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.cycleId` |
* | **Nullability** | Optional |
*/
export interface cycleId {
kind: "InputField",
name: "cycleId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the custom view to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.customViewId` |
* | **Nullability** | Optional |
*/
export interface customViewId {
kind: "InputField",
name: "customViewId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the document to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.documentId` |
* | **Nullability** | Optional |
*/
export interface documentId {
kind: "InputField",
name: "documentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* [INTERNAL] The identifier of the initiative to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.initiativeId` |
* | **Nullability** | Optional |
*/
export interface initiativeId {
kind: "InputField",
name: "initiativeId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The tab of the initiative to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeTab} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.initiativeTab` |
* | **Nullability** | Optional |
*/
export interface initiativeTab {
kind: "InputField",
name: "initiativeTab",
inlineType: [0, ],
namedType: $Schema.InitiativeTab,
type: $Schema.InitiativeTab['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the label to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.labelId` |
* | **Nullability** | Optional |
*/
export interface labelId {
kind: "InputField",
name: "labelId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the label to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.projectLabelId` |
* | **Nullability** | Optional |
*/
export interface projectLabelId {
kind: "InputField",
name: "projectLabelId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the user to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.userId` |
* | **Nullability** | Optional |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The position of the item in the favorites list.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.sortOrder` |
* | **Nullability** | Optional |
*/
export interface sortOrder {
kind: "InputField",
name: "sortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the customer to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.customerId` |
* | **Nullability** | Optional |
*/
export interface customerId {
kind: "InputField",
name: "customerId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the dashboard to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.dashboardId` |
* | **Nullability** | Optional |
*/
export interface dashboardId {
kind: "InputField",
name: "dashboardId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* The identifier of the pull request to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.pullRequestId` |
* | **Nullability** | Optional |
*/
export interface pullRequestId {
kind: "InputField",
name: "pullRequestId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* [ALPHA] The identifier of the release to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.releaseId` |
* | **Nullability** | Optional |
*/
export interface releaseId {
kind: "InputField",
name: "releaseId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.FavoriteCreateInput}.
*
* [ALPHA] The identifier of the release pipeline to favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.FavoriteCreateInput} |
* | **Path** | `FavoriteCreateInput.releasePipelineId` |
* | **Nullability** | Optional |
*/
export interface releasePipelineId {
kind: "InputField",
name: "releasePipelineId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}