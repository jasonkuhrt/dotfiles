import type * as $Fields from './fields.js'

export * as GitAutomationStateUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface GitAutomationStateUpdateInput {
kind: "InputObject",
name: "GitAutomationStateUpdateInput",
isAllFieldsNullable: true,
fields: {
stateId: $Fields.stateId,
branchPattern: $Fields.branchPattern,
targetBranchId: $Fields.targetBranchId,
event: $Fields.event
},
type: {
stateId?: $Fields.stateId['type'],
branchPattern?: $Fields.branchPattern['type'],
targetBranchId?: $Fields.targetBranchId['type'],
event?: $Fields.event['type']
}
}