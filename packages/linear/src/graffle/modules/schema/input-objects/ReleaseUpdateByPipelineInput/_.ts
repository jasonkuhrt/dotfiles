import type * as $Fields from './fields.js'

export * as ReleaseUpdateByPipelineInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for updating a release by pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseUpdateByPipelineInput {
kind: "InputObject",
name: "ReleaseUpdateByPipelineInput",
isAllFieldsNullable: true,
fields: {
pipelineId: $Fields.pipelineId,
version: $Fields.version,
stage: $Fields.stage
},
type: {
pipelineId: $Fields.pipelineId['type'],
version?: $Fields.version['type'],
stage?: $Fields.stage['type']
}
}