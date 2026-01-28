import type * as $Fields from './fields.js'

export * as GitAutomationTargetBranchCreateInput from './fields.js'

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
export interface GitAutomationTargetBranchCreateInput {
kind: "InputObject",
name: "GitAutomationTargetBranchCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
teamId: $Fields.teamId,
branchPattern: $Fields.branchPattern,
isRegex: $Fields.isRegex
},
type: {
id?: $Fields.id['type'],
teamId: $Fields.teamId['type'],
branchPattern: $Fields.branchPattern['type'],
isRegex?: $Fields.isRegex['type']
}
}