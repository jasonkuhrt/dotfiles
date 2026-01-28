import type * as $Fields from './fields.js'

export * as JiraLinearMappingInput from './fields.js'

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
export interface JiraLinearMappingInput {
kind: "InputObject",
name: "JiraLinearMappingInput",
isAllFieldsNullable: true,
fields: {
jiraProjectId: $Fields.jiraProjectId,
linearTeamId: $Fields.linearTeamId,
bidirectional: $Fields.bidirectional,
default: $Fields.default
},
type: {
jiraProjectId: $Fields.jiraProjectId['type'],
linearTeamId: $Fields.linearTeamId['type'],
bidirectional?: $Fields.bidirectional['type'],
default?: $Fields.default['type']
}
}