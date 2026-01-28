import type * as $Fields from './fields.js'
import type { WorkflowStateArchivePayload, DeletePayload, ProjectArchivePayload, TeamArchivePayload, RoadmapArchivePayload, ReleaseStageArchivePayload, ReleaseArchivePayload, ReleasePipelineArchivePayload, ProjectUpdateArchivePayload, ProjectStatusArchivePayload, NotificationArchivePayload, IssueArchivePayload, InitiativeUpdateArchivePayload, InitiativeArchivePayload, DocumentArchivePayload, CycleArchivePayload, CustomerNeedArchivePayload } from '../../__.js'

export * as ArchivePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* A generic payload return from entity archive or deletion mutations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 2 |
* | **Implementors** | {@link $Schema.WorkflowStateArchivePayload}, {@link $Schema.DeletePayload}, {@link $Schema.ProjectArchivePayload}, {@link $Schema.TeamArchivePayload}, {@link $Schema.RoadmapArchivePayload}, {@link $Schema.ReleaseStageArchivePayload}, {@link $Schema.ReleaseArchivePayload}, {@link $Schema.ReleasePipelineArchivePayload}, {@link $Schema.ProjectUpdateArchivePayload}, {@link $Schema.ProjectStatusArchivePayload}, {@link $Schema.NotificationArchivePayload}, {@link $Schema.IssueArchivePayload}, {@link $Schema.InitiativeUpdateArchivePayload}, {@link $Schema.InitiativeArchivePayload}, {@link $Schema.DocumentArchivePayload}, {@link $Schema.CycleArchivePayload}, {@link $Schema.CustomerNeedArchivePayload} |
*/
export interface ArchivePayload {
kind: "Interface",
name: "ArchivePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
success: $Fields.success
},
implementors: [WorkflowStateArchivePayload, DeletePayload, ProjectArchivePayload, TeamArchivePayload, RoadmapArchivePayload, ReleaseStageArchivePayload, ReleaseArchivePayload, ReleasePipelineArchivePayload, ProjectUpdateArchivePayload, ProjectStatusArchivePayload, NotificationArchivePayload, IssueArchivePayload, InitiativeUpdateArchivePayload, InitiativeArchivePayload, DocumentArchivePayload, CycleArchivePayload, CustomerNeedArchivePayload],
implementorsUnion: WorkflowStateArchivePayload
| DeletePayload
| ProjectArchivePayload
| TeamArchivePayload
| RoadmapArchivePayload
| ReleaseStageArchivePayload
| ReleaseArchivePayload
| ReleasePipelineArchivePayload
| ProjectUpdateArchivePayload
| ProjectStatusArchivePayload
| NotificationArchivePayload
| IssueArchivePayload
| InitiativeUpdateArchivePayload
| InitiativeArchivePayload
| DocumentArchivePayload
| CycleArchivePayload
| CustomerNeedArchivePayload,
implementorsIndex: {
WorkflowStateArchivePayload: WorkflowStateArchivePayload,
DeletePayload: DeletePayload,
ProjectArchivePayload: ProjectArchivePayload,
TeamArchivePayload: TeamArchivePayload,
RoadmapArchivePayload: RoadmapArchivePayload,
ReleaseStageArchivePayload: ReleaseStageArchivePayload,
ReleaseArchivePayload: ReleaseArchivePayload,
ReleasePipelineArchivePayload: ReleasePipelineArchivePayload,
ProjectUpdateArchivePayload: ProjectUpdateArchivePayload,
ProjectStatusArchivePayload: ProjectStatusArchivePayload,
NotificationArchivePayload: NotificationArchivePayload,
IssueArchivePayload: IssueArchivePayload,
InitiativeUpdateArchivePayload: InitiativeUpdateArchivePayload,
InitiativeArchivePayload: InitiativeArchivePayload,
DocumentArchivePayload: DocumentArchivePayload,
CycleArchivePayload: CycleArchivePayload,
CustomerNeedArchivePayload: CustomerNeedArchivePayload
}
}