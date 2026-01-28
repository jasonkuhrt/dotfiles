import type * as $Fields from './fields.js'

export * as LaunchDarklySettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface LaunchDarklySettingsInput {
kind: "InputObject",
name: "LaunchDarklySettingsInput",
isAllFieldsNullable: false,
fields: {
projectKey: $Fields.projectKey,
environment: $Fields.environment
},
type: {
projectKey: $Fields.projectKey['type'],
environment: $Fields.environment['type']
}
}