import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraConfigurationInput}.
*
* The Jira personal access token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraConfigurationInput} |
* | **Path** | `JiraConfigurationInput.accessToken` |
* | **Nullability** | Required |
*/
export interface accessToken {
kind: "InputField",
name: "accessToken",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraConfigurationInput}.
*
* The Jira user's email address. A username is also accepted on Jira Server / DC.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraConfigurationInput} |
* | **Path** | `JiraConfigurationInput.email` |
* | **Nullability** | Required |
*/
export interface email {
kind: "InputField",
name: "email",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraConfigurationInput}.
*
* The Jira installation hostname.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraConfigurationInput} |
* | **Path** | `JiraConfigurationInput.hostname` |
* | **Nullability** | Required |
*/
export interface hostname {
kind: "InputField",
name: "hostname",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraConfigurationInput}.
*
* [DEPRECATED] The Jira project keys to scope the integration to.
*
* @deprecated This parameter is ignored, use mappings instead to scope the integration to one or more specific projects
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraConfigurationInput} |
* | **Path** | `JiraConfigurationInput.project` |
* | **⚠ Deprecated** | This parameter is ignored, use mappings instead to scope the integration to one or more specific projects |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraConfigurationInput}.
*
* Whether this integration will be setup using the manual webhook flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraConfigurationInput} |
* | **Path** | `JiraConfigurationInput.manualSetup` |
* | **Nullability** | Optional |
*/
export interface manualSetup {
kind: "InputField",
name: "manualSetup",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}