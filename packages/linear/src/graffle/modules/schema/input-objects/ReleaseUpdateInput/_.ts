import type * as $Fields from './fields.js'

export * as ReleaseUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseUpdateInput {
kind: "InputObject",
name: "ReleaseUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
version: $Fields.version,
commitSha: $Fields.commitSha,
pipelineId: $Fields.pipelineId,
stageId: $Fields.stageId,
startDate: $Fields.startDate,
targetDate: $Fields.targetDate
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
version?: $Fields.version['type'],
commitSha?: $Fields.commitSha['type'],
pipelineId?: $Fields.pipelineId['type'],
stageId?: $Fields.stageId['type'],
startDate?: $Fields.startDate['type'],
targetDate?: $Fields.targetDate['type']
}
}