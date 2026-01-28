import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCompleteInput}.
*
* The identifier of the pipeline to mark a release as completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseCompleteInput} |
* | **Path** | `ReleaseCompleteInput.pipelineId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ReleaseCompleteInput}.
*
* The version of the release to complete. If not provided, the latest started release will be completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ReleaseCompleteInput} |
* | **Path** | `ReleaseCompleteInput.version` |
* | **Nullability** | Optional |
*/
export interface version {
kind: "InputField",
name: "version",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}