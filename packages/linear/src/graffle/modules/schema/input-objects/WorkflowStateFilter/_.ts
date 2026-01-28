import type * as $Fields from './fields.js'

export * as WorkflowStateFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Workflow state filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface WorkflowStateFilter {
kind: "InputObject",
name: "WorkflowStateFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
team: $Fields.team,
issues: $Fields.issues,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
type?: $Fields.type['type'],
team?: $Fields.team['type'],
issues?: $Fields.issues['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}