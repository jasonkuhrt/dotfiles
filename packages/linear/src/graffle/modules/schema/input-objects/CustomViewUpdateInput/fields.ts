import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The name of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The description of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "InputField",
name: "description",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The icon of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "InputField",
name: "icon",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The color of the icon of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.color` |
* | **Nullability** | Optional |
*/
export interface color {
kind: "InputField",
name: "color",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The id of the team associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* [Internal] The id of the project associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* [Internal] The id of the initiative associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.initiativeId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The owner of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.ownerId` |
* | **Nullability** | Optional |
*/
export interface ownerId {
kind: "InputField",
name: "ownerId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The filters applied to issues in the custom view.
*
* @deprecated Use `filterData` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.filters` |
* | **⚠ Deprecated** | Use `filterData` instead. |
* | **Nullability** | Optional |
*/
export interface filters {
kind: "InputField",
name: "filters",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The filter applied to issues in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.filterData` |
* | **Nullability** | Optional |
*/
export interface filterData {
kind: "InputField",
name: "filterData",
inlineType: [0, ],
namedType: $Schema.IssueFilter,
type: $Schema.IssueFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The project filter applied to issues in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.projectFilterData` |
* | **Nullability** | Optional |
*/
export interface projectFilterData {
kind: "InputField",
name: "projectFilterData",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* [ALPHA] The initiative filter applied to issues in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.initiativeFilterData` |
* | **Nullability** | Optional |
*/
export interface initiativeFilterData {
kind: "InputField",
name: "initiativeFilterData",
inlineType: [0, ],
namedType: $Schema.InitiativeFilter,
type: $Schema.InitiativeFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* The feed item filter applied to issues in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedItemFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.feedItemFilterData` |
* | **Nullability** | Optional |
*/
export interface feedItemFilterData {
kind: "InputField",
name: "feedItemFilterData",
inlineType: [0, ],
namedType: $Schema.FeedItemFilter,
type: $Schema.FeedItemFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CustomViewUpdateInput}.
*
* Whether the custom view is shared with everyone in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomViewUpdateInput} |
* | **Path** | `CustomViewUpdateInput.shared` |
* | **Nullability** | Optional |
*/
export interface shared {
kind: "InputField",
name: "shared",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}