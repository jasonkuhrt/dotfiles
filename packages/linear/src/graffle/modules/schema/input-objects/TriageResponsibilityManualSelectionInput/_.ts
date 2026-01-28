import type * as $Fields from './fields.js'

export * as TriageResponsibilityManualSelectionInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Manual triage responsibility using a set of users.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface TriageResponsibilityManualSelectionInput {
kind: "InputObject",
name: "TriageResponsibilityManualSelectionInput",
isAllFieldsNullable: true,
fields: {
userIds: $Fields.userIds,
assignmentIndex: $Fields.assignmentIndex
},
type: {
userIds: $Fields.userIds['type'],
assignmentIndex?: $Fields.assignmentIndex['type']
}
}