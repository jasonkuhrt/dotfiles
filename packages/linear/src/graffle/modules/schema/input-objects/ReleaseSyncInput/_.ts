import type * as $Fields from './fields.js'

export * as ReleaseSyncInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The release data to sync.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseSyncInput {
kind: "InputObject",
name: "ReleaseSyncInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
version: $Fields.version,
commitSha: $Fields.commitSha,
pipelineId: $Fields.pipelineId,
stageId: $Fields.stageId,
issueIdentifiers: $Fields.issueIdentifiers,
pullRequestReferences: $Fields.pullRequestReferences,
debugSink: $Fields.debugSink,
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
issueIdentifiers?: $Fields.issueIdentifiers['type'],
pullRequestReferences?: $Fields.pullRequestReferences['type'],
debugSink?: $Fields.debugSink['type'],
startDate?: $Fields.startDate['type'],
targetDate?: $Fields.targetDate['type']
}
}