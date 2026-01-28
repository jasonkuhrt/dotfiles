import type * as $Fields from './fields.js'

export * as WorkflowStateSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue workflow state sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface WorkflowStateSort {
kind: "InputObject",
name: "WorkflowStateSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order,
closedIssuesOrderedByRecency: $Fields.closedIssuesOrderedByRecency
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type'],
closedIssuesOrderedByRecency?: $Fields.closedIssuesOrderedByRecency['type']
}
}