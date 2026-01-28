import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseDebugSinkInput}.
*
* List of commit SHAs that were inspected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseDebugSinkInput} |
* | **Path** | `ReleaseDebugSinkInput.inspectedShas` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface inspectedShas {
kind: "InputField",
name: "inspectedShas",
inlineType: [1, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseDebugSinkInput}.
*
* Map of issue identifiers to their source information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ReleaseDebugSinkInput} |
* | **Path** | `ReleaseDebugSinkInput.issues` |
* | **Nullability** | Required |
*/
export interface issues {
kind: "InputField",
name: "issues",
inlineType: [1, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseDebugSinkInput}.
*
* Pull request debug information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ReleaseDebugSinkInput} |
* | **Path** | `ReleaseDebugSinkInput.pullRequests` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface pullRequests {
kind: "InputField",
name: "pullRequests",
inlineType: [1, [1, ]],
namedType: $Schema.JSONObject,
type: readonly ($Schema.JSONObject['codec']['_typeDecoded'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseDebugSinkInput}.
*
* List of paths applied during commit scanning.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseDebugSinkInput} |
* | **Path** | `ReleaseDebugSinkInput.includePaths` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface includePaths {
kind: "InputField",
name: "includePaths",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}