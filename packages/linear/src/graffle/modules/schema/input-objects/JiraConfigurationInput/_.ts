import type * as $Fields from './fields.js'

export * as JiraConfigurationInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraConfigurationInput {
kind: "InputObject",
name: "JiraConfigurationInput",
isAllFieldsNullable: true,
fields: {
accessToken: $Fields.accessToken,
email: $Fields.email,
hostname: $Fields.hostname,
project: $Fields.project,
manualSetup: $Fields.manualSetup
},
type: {
accessToken: $Fields.accessToken['type'],
email: $Fields.email['type'],
hostname: $Fields.hostname['type'],
project?: $Fields.project['type'],
manualSetup?: $Fields.manualSetup['type']
}
}