import type * as $Fields from './fields.js'

export * as GitAutomationTargetBranchUpdateInput from './fields.js'

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
export interface GitAutomationTargetBranchUpdateInput {
kind: "InputObject",
name: "GitAutomationTargetBranchUpdateInput",
isAllFieldsNullable: true,
fields: {
branchPattern: $Fields.branchPattern,
isRegex: $Fields.isRegex
},
type: {
branchPattern?: $Fields.branchPattern['type'],
isRegex?: $Fields.isRegex['type']
}
}