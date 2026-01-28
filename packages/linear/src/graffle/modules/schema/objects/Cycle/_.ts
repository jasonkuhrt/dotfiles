import type * as $Fields from './fields.js'

export * as Cycle from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A set of issues to be resolved in a specified amount of time.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 30 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Cycle {
kind: "Object",
name: "Cycle",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
number: $Fields.number,
name: $Fields.name,
description: $Fields.description,
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
completedAt: $Fields.completedAt,
autoArchivedAt: $Fields.autoArchivedAt,
issueCountHistory: $Fields.issueCountHistory,
completedIssueCountHistory: $Fields.completedIssueCountHistory,
scopeHistory: $Fields.scopeHistory,
completedScopeHistory: $Fields.completedScopeHistory,
inProgressScopeHistory: $Fields.inProgressScopeHistory,
team: $Fields.team,
progressHistory: $Fields.progressHistory,
currentProgress: $Fields.currentProgress,
inheritedFrom: $Fields.inheritedFrom,
isActive: $Fields.isActive,
isFuture: $Fields.isFuture,
isPast: $Fields.isPast,
issues: $Fields.issues,
uncompletedIssuesUponClose: $Fields.uncompletedIssuesUponClose,
progress: $Fields.progress,
isNext: $Fields.isNext,
isPrevious: $Fields.isPrevious,
documents: $Fields.documents,
links: $Fields.links
}
}