import type * as $Fields from './fields.js'

export * as IssueSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 25 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueSortInput {
kind: "InputObject",
name: "IssueSortInput",
isAllFieldsNullable: true,
fields: {
priority: $Fields.priority,
estimate: $Fields.estimate,
title: $Fields.title,
label: $Fields.label,
labelGroup: $Fields.labelGroup,
slaStatus: $Fields.slaStatus,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
completedAt: $Fields.completedAt,
dueDate: $Fields.dueDate,
accumulatedStateUpdatedAt: $Fields.accumulatedStateUpdatedAt,
cycle: $Fields.cycle,
milestone: $Fields.milestone,
assignee: $Fields.assignee,
delegate: $Fields.delegate,
project: $Fields.project,
team: $Fields.team,
manual: $Fields.manual,
workflowState: $Fields.workflowState,
customer: $Fields.customer,
customerRevenue: $Fields.customerRevenue,
customerCount: $Fields.customerCount,
customerImportantCount: $Fields.customerImportantCount,
rootIssue: $Fields.rootIssue,
linkCount: $Fields.linkCount
},
type: {
priority?: $Fields.priority['type'],
estimate?: $Fields.estimate['type'],
title?: $Fields.title['type'],
label?: $Fields.label['type'],
labelGroup?: $Fields.labelGroup['type'],
slaStatus?: $Fields.slaStatus['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
completedAt?: $Fields.completedAt['type'],
dueDate?: $Fields.dueDate['type'],
accumulatedStateUpdatedAt?: $Fields.accumulatedStateUpdatedAt['type'],
cycle?: $Fields.cycle['type'],
milestone?: $Fields.milestone['type'],
assignee?: $Fields.assignee['type'],
delegate?: $Fields.delegate['type'],
project?: $Fields.project['type'],
team?: $Fields.team['type'],
manual?: $Fields.manual['type'],
workflowState?: $Fields.workflowState['type'],
customer?: $Fields.customer['type'],
customerRevenue?: $Fields.customerRevenue['type'],
customerCount?: $Fields.customerCount['type'],
customerImportantCount?: $Fields.customerImportantCount['type'],
rootIssue?: $Fields.rootIssue['type'],
linkCount?: $Fields.linkCount['type']
}
}