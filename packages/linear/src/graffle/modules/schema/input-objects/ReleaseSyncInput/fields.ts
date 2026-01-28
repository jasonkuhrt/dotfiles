import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The name of the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The description of the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The version of the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.version` |
* | **Nullability** | Optional |
*/
export interface version {
kind: "InputField",
name: "version",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The commit SHA associated with this release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.commitSha` |
* | **Nullability** | Optional |
*/
export interface commitSha {
kind: "InputField",
name: "commitSha",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The identifier of the pipeline this release belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.pipelineId` |
* | **Nullability** | Required |
*/
export interface pipelineId {
kind: "InputField",
name: "pipelineId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The current stage of the release. Defaults to the first 'completed' stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.stageId` |
* | **Nullability** | Optional |
*/
export interface stageId {
kind: "InputField",
name: "stageId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* Issue identifiers (e.g. ENG-123) to associate with this release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.issueIdentifiers` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface issueIdentifiers {
kind: "InputField",
name: "issueIdentifiers",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* Pull request references to look up. Issues linked to found PRs will be associated with this release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequestReferenceInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.pullRequestReferences` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface pullRequestReferences {
kind: "InputField",
name: "pullRequestReferences",
inlineType: [0, [1, ]],
namedType: $Schema.PullRequestReferenceInput,
type: readonly ($Schema.PullRequestReferenceInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* Debug information for release creation diagnostics.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseDebugSinkInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.debugSink` |
* | **Nullability** | Optional |
*/
export interface debugSink {
kind: "InputField",
name: "debugSink",
inlineType: [0, ],
namedType: $Schema.ReleaseDebugSinkInput,
type: $Schema.ReleaseDebugSinkInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The estimated start date of the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.startDate` |
* | **Nullability** | Optional |
*/
export interface startDate {
kind: "InputField",
name: "startDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseSyncInput}.
*
* The estimated completion date of the release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ReleaseSyncInput} |
* | **Path** | `ReleaseSyncInput.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}