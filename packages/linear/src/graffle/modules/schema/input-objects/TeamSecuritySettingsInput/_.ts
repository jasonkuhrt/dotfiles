import type * as $Fields from './fields.js'

export * as TeamSecuritySettingsInput from './fields.js'

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
export interface TeamSecuritySettingsInput {
kind: "InputObject",
name: "TeamSecuritySettingsInput",
isAllFieldsNullable: true,
fields: {
labelManagement: $Fields.labelManagement,
memberManagement: $Fields.memberManagement,
teamManagement: $Fields.teamManagement,
templateManagement: $Fields.templateManagement
},
type: {
labelManagement?: $Fields.labelManagement['type'],
memberManagement?: $Fields.memberManagement['type'],
teamManagement?: $Fields.teamManagement['type'],
templateManagement?: $Fields.templateManagement['type']
}
}