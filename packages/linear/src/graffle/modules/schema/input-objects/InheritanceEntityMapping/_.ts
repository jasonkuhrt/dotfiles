import type * as $Fields from './fields.js'

export * as InheritanceEntityMapping from './fields.js'

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
export interface InheritanceEntityMapping {
kind: "InputObject",
name: "InheritanceEntityMapping",
isAllFieldsNullable: true,
fields: {
workflowStates: $Fields.workflowStates,
issueLabels: $Fields.issueLabels
},
type: {
workflowStates: $Fields.workflowStates['type'],
issueLabels?: $Fields.issueLabels['type']
}
}