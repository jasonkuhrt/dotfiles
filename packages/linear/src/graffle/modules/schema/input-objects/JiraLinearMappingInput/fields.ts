import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraLinearMappingInput}.
*
* The Jira id for this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraLinearMappingInput} |
* | **Path** | `JiraLinearMappingInput.jiraProjectId` |
* | **Nullability** | Required |
*/
export interface jiraProjectId {
kind: "InputField",
name: "jiraProjectId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraLinearMappingInput}.
*
* The Linear team id to map to the given project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraLinearMappingInput} |
* | **Path** | `JiraLinearMappingInput.linearTeamId` |
* | **Nullability** | Required |
*/
export interface linearTeamId {
kind: "InputField",
name: "linearTeamId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraLinearMappingInput}.
*
* Whether the sync for this mapping is bidirectional.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraLinearMappingInput} |
* | **Path** | `JiraLinearMappingInput.bidirectional` |
* | **Nullability** | Optional |
*/
export interface bidirectional {
kind: "InputField",
name: "bidirectional",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraLinearMappingInput}.
*
* Whether this mapping is the default one for issue creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraLinearMappingInput} |
* | **Path** | `JiraLinearMappingInput.default` |
* | **Nullability** | Optional |
*/
interface $default {
kind: "InputField",
name: "default",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $default as default }