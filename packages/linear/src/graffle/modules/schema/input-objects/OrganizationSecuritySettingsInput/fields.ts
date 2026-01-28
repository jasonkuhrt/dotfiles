import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to create personal API keys.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.personalApiKeysRole` |
* | **Nullability** | Optional |
*/
export interface personalApiKeysRole {
kind: "InputField",
name: "personalApiKeysRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to invite users.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.invitationsRole` |
* | **Nullability** | Optional |
*/
export interface invitationsRole {
kind: "InputField",
name: "invitationsRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to create teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.teamCreationRole` |
* | **Nullability** | Optional |
*/
export interface teamCreationRole {
kind: "InputField",
name: "teamCreationRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to manage workspace labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.labelManagementRole` |
* | **Nullability** | Optional |
*/
export interface labelManagementRole {
kind: "InputField",
name: "labelManagementRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to manage API settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.apiSettingsRole` |
* | **Nullability** | Optional |
*/
export interface apiSettingsRole {
kind: "InputField",
name: "apiSettingsRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to manage workspace templates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.templateManagementRole` |
* | **Nullability** | Optional |
*/
export interface templateManagementRole {
kind: "InputField",
name: "templateManagementRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to import data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.importRole` |
* | **Nullability** | Optional |
*/
export interface importRole {
kind: "InputField",
name: "importRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to manage agent guidance prompts and settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.agentGuidanceRole` |
* | **Nullability** | Optional |
*/
export interface agentGuidanceRole {
kind: "InputField",
name: "agentGuidanceRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationSecuritySettingsInput}.
*
* The minimum role required to install and connect new integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Path** | `OrganizationSecuritySettingsInput.integrationCreationRole` |
* | **Nullability** | Optional |
*/
export interface integrationCreationRole {
kind: "InputField",
name: "integrationCreationRole",
inlineType: [0, ],
namedType: $Schema.UserRoleType,
type: $Schema.UserRoleType['members'] | null | undefined
}