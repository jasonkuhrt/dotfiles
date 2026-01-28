import type * as $Fields from './fields.js'

export * as GitAutomationStateCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface GitAutomationStateCreateInput {
kind: "InputObject",
name: "GitAutomationStateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
teamId: $Fields.teamId,
stateId: $Fields.stateId,
branchPattern: $Fields.branchPattern,
targetBranchId: $Fields.targetBranchId,
event: $Fields.event
},
type: {
id?: $Fields.id['type'],
teamId: $Fields.teamId['type'],
stateId?: $Fields.stateId['type'],
branchPattern?: $Fields.branchPattern['type'],
targetBranchId?: $Fields.targetBranchId['type'],
event: $Fields.event['type']
}
}