import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamSecuritySettingsInput}.
*
* The minimum team role required to manage labels in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamSecuritySettingsInput} |
* | **Path** | `TeamSecuritySettingsInput.labelManagement` |
* | **Nullability** | Optional |
*/
export interface labelManagement {
kind: "InputField",
name: "labelManagement",
inlineType: [0, ],
namedType: $Schema.TeamRoleType,
type: $Schema.TeamRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamSecuritySettingsInput}.
*
* The minimum team role required to manage full workspace members (non-guests) in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamSecuritySettingsInput} |
* | **Path** | `TeamSecuritySettingsInput.memberManagement` |
* | **Nullability** | Optional |
*/
export interface memberManagement {
kind: "InputField",
name: "memberManagement",
inlineType: [0, ],
namedType: $Schema.TeamRoleType,
type: $Schema.TeamRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamSecuritySettingsInput}.
*
* The minimum team role required to manage team settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamSecuritySettingsInput} |
* | **Path** | `TeamSecuritySettingsInput.teamManagement` |
* | **Nullability** | Optional |
*/
export interface teamManagement {
kind: "InputField",
name: "teamManagement",
inlineType: [0, ],
namedType: $Schema.TeamRoleType,
type: $Schema.TeamRoleType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TeamSecuritySettingsInput}.
*
* The minimum team role required to manage templates in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamRoleType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.TeamSecuritySettingsInput} |
* | **Path** | `TeamSecuritySettingsInput.templateManagement` |
* | **Nullability** | Optional |
*/
export interface templateManagement {
kind: "InputField",
name: "templateManagement",
inlineType: [0, ],
namedType: $Schema.TeamRoleType,
type: $Schema.TeamRoleType['members'] | null | undefined
}