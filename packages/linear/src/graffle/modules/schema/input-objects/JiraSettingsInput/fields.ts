import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* The mapping of Jira project id => Linear team id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JiraLinearMappingInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.projectMapping` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface projectMapping {
kind: "InputField",
name: "projectMapping",
inlineType: [0, [1, ]],
namedType: $Schema.JiraLinearMappingInput,
type: readonly ($Schema.JiraLinearMappingInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* The Jira projects for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JiraProjectDataInput}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.projects` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface projects {
kind: "InputField",
name: "projects",
inlineType: [1, [1, ]],
namedType: $Schema.JiraProjectDataInput,
type: readonly ($Schema.JiraProjectDataInput['type'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* Whether this integration is for Jira Server or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.isJiraServer` |
* | **Default** | `false` |
* | **Nullability** | Optional |
*/
export interface isJiraServer {
kind: "InputField",
name: "isJiraServer",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* Whether the user needs to provide setup information about the webhook to complete the integration setup. Only relevant for integrations that use a manual setup flow
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.setupPending` |
* | **Nullability** | Optional |
*/
export interface setupPending {
kind: "InputField",
name: "setupPending",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* Whether this integration is using a manual setup flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.manualSetup` |
* | **Nullability** | Optional |
*/
export interface manualSetup {
kind: "InputField",
name: "manualSetup",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraSettingsInput}.
*
* The label of the Jira instance, for visual identification purposes only
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraSettingsInput} |
* | **Path** | `JiraSettingsInput.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "InputField",
name: "label",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}