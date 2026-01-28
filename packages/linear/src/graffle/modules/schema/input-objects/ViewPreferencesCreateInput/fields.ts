import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The type of view preferences (either user or organization level preferences).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [1, ],
namedType: $Schema.ViewPreferencesType,
type: $Schema.ViewPreferencesType['members']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The view type of the view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.viewType` |
* | **Nullability** | Required |
*/
export interface viewType {
kind: "InputField",
name: "viewType",
inlineType: [1, ],
namedType: $Schema.ViewType,
type: $Schema.ViewType['members']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* View preferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.preferences` |
* | **Nullability** | Required |
*/
export interface preferences {
kind: "InputField",
name: "preferences",
inlineType: [1, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The default parameters for the insight on that view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.insights` |
* | **Nullability** | Optional |
*/
export interface insights {
kind: "InputField",
name: "insights",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The team these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The project these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.projectId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* [Internal] The initiative these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.initiativeId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The label these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.labelId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The project label these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.projectLabelId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The cycle these view preferences are associated with.
*
* @deprecated Not used
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.cycleId` |
* | **⚠ Deprecated** | Not used |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The custom view these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.customViewId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ViewPreferencesCreateInput}.
*
* The user profile these view preferences are associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ViewPreferencesCreateInput} |
* | **Path** | `ViewPreferencesCreateInput.userId` |
* | **Nullability** | Optional |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}