import type * as $Fields from './fields.js'

export * as ReleaseCompleteInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseCompleteInput {
kind: "InputObject",
name: "ReleaseCompleteInput",
isAllFieldsNullable: true,
fields: {
pipelineId: $Fields.pipelineId,
version: $Fields.version
},
type: {
pipelineId: $Fields.pipelineId['type'],
version?: $Fields.version['type']
}
}