import type * as $Fields from './fields.js'

export * as ReleaseCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The input for creating a release.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseCreateInput {
kind: "InputObject",
name: "ReleaseCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
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
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
version?: $Fields.version['type'],
commitSha?: $Fields.commitSha['type'],
pipelineId: $Fields.pipelineId['type'],
stageId?: $Fields.stageId['type'],
startDate?: $Fields.startDate['type'],
targetDate?: $Fields.targetDate['type']
}
}