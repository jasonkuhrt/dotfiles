import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseUpdateByPipelineInput}.
*
* The identifier of the pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseUpdateByPipelineInput} |
* | **Path** | `ReleaseUpdateByPipelineInput.pipelineId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseUpdateByPipelineInput}.
*
* The version of the release to update. If not provided, the latest started release will be updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseUpdateByPipelineInput} |
* | **Path** | `ReleaseUpdateByPipelineInput.version` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseUpdateByPipelineInput}.
*
* The stage name to set. First tries exact match, then falls back to case-insensitive matching with dashes/underscores treated as spaces.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseUpdateByPipelineInput} |
* | **Path** | `ReleaseUpdateByPipelineInput.stage` |
* | **Nullability** | Optional |
*/
export interface stage {
kind: "InputField",
name: "stage",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}