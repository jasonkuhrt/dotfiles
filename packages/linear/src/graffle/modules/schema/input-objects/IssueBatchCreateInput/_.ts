import type * as $Fields from './fields.js'

export * as IssueBatchCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | No |
*/
export interface IssueBatchCreateInput {
kind: "InputObject",
name: "IssueBatchCreateInput",
isAllFieldsNullable: false,
fields: {
issues: $Fields.issues
},
type: {
issues: $Fields.issues['type']
}
}