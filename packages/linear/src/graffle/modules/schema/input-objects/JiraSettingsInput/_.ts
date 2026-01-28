import type * as $Fields from './fields.js'

export * as JiraSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraSettingsInput {
kind: "InputObject",
name: "JiraSettingsInput",
isAllFieldsNullable: true,
fields: {
projectMapping: $Fields.projectMapping,
projects: $Fields.projects,
isJiraServer: $Fields.isJiraServer,
setupPending: $Fields.setupPending,
manualSetup: $Fields.manualSetup,
label: $Fields.label
},
type: {
projectMapping?: $Fields.projectMapping['type'],
projects: $Fields.projects['type'],
isJiraServer?: $Fields.isJiraServer['type'],
setupPending?: $Fields.setupPending['type'],
manualSetup?: $Fields.manualSetup['type'],
label?: $Fields.label['type']
}
}