import type * as $Fields from './fields.js'

export * as ProjectFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 41 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectFilter {
kind: "InputObject",
name: "ProjectFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
slugId: $Fields.slugId,
state: $Fields.state,
status: $Fields.status,
priority: $Fields.priority,
labels: $Fields.labels,
searchableContent: $Fields.searchableContent,
startedAt: $Fields.startedAt,
completedAt: $Fields.completedAt,
canceledAt: $Fields.canceledAt,
startDate: $Fields.startDate,
targetDate: $Fields.targetDate,
health: $Fields.health,
healthWithAge: $Fields.healthWithAge,
activityType: $Fields.activityType,
hasRelatedRelations: $Fields.hasRelatedRelations,
hasDependedOnByRelations: $Fields.hasDependedOnByRelations,
hasDependsOnRelations: $Fields.hasDependsOnRelations,
hasBlockedByRelations: $Fields.hasBlockedByRelations,
hasBlockingRelations: $Fields.hasBlockingRelations,
hasViolatedRelations: $Fields.hasViolatedRelations,
projectUpdates: $Fields.projectUpdates,
creator: $Fields.creator,
lead: $Fields.lead,
members: $Fields.members,
issues: $Fields.issues,
roadmaps: $Fields.roadmaps,
initiatives: $Fields.initiatives,
projectMilestones: $Fields.projectMilestones,
completedProjectMilestones: $Fields.completedProjectMilestones,
nextProjectMilestone: $Fields.nextProjectMilestone,
accessibleTeams: $Fields.accessibleTeams,
lastAppliedTemplate: $Fields.lastAppliedTemplate,
needs: $Fields.needs,
customerCount: $Fields.customerCount,
customerImportantCount: $Fields.customerImportantCount,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
slugId?: $Fields.slugId['type'],
state?: $Fields.state['type'],
status?: $Fields.status['type'],
priority?: $Fields.priority['type'],
labels?: $Fields.labels['type'],
searchableContent?: $Fields.searchableContent['type'],
startedAt?: $Fields.startedAt['type'],
completedAt?: $Fields.completedAt['type'],
canceledAt?: $Fields.canceledAt['type'],
startDate?: $Fields.startDate['type'],
targetDate?: $Fields.targetDate['type'],
health?: $Fields.health['type'],
healthWithAge?: $Fields.healthWithAge['type'],
activityType?: $Fields.activityType['type'],
hasRelatedRelations?: $Fields.hasRelatedRelations['type'],
hasDependedOnByRelations?: $Fields.hasDependedOnByRelations['type'],
hasDependsOnRelations?: $Fields.hasDependsOnRelations['type'],
hasBlockedByRelations?: $Fields.hasBlockedByRelations['type'],
hasBlockingRelations?: $Fields.hasBlockingRelations['type'],
hasViolatedRelations?: $Fields.hasViolatedRelations['type'],
projectUpdates?: $Fields.projectUpdates['type'],
creator?: $Fields.creator['type'],
lead?: $Fields.lead['type'],
members?: $Fields.members['type'],
issues?: $Fields.issues['type'],
roadmaps?: $Fields.roadmaps['type'],
initiatives?: $Fields.initiatives['type'],
projectMilestones?: $Fields.projectMilestones['type'],
completedProjectMilestones?: $Fields.completedProjectMilestones['type'],
nextProjectMilestone?: $Fields.nextProjectMilestone['type'],
accessibleTeams?: $Fields.accessibleTeams['type'],
lastAppliedTemplate?: $Fields.lastAppliedTemplate['type'],
needs?: $Fields.needs['type'],
customerCount?: $Fields.customerCount['type'],
customerImportantCount?: $Fields.customerImportantCount['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}