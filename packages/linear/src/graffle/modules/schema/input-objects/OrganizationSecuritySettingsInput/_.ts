import type * as $Fields from './fields.js'

export * as OrganizationSecuritySettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationSecuritySettingsInput {
kind: "InputObject",
name: "OrganizationSecuritySettingsInput",
isAllFieldsNullable: true,
fields: {
personalApiKeysRole: $Fields.personalApiKeysRole,
invitationsRole: $Fields.invitationsRole,
teamCreationRole: $Fields.teamCreationRole,
labelManagementRole: $Fields.labelManagementRole,
apiSettingsRole: $Fields.apiSettingsRole,
templateManagementRole: $Fields.templateManagementRole,
importRole: $Fields.importRole,
agentGuidanceRole: $Fields.agentGuidanceRole,
integrationCreationRole: $Fields.integrationCreationRole
},
type: {
personalApiKeysRole?: $Fields.personalApiKeysRole['type'],
invitationsRole?: $Fields.invitationsRole['type'],
teamCreationRole?: $Fields.teamCreationRole['type'],
labelManagementRole?: $Fields.labelManagementRole['type'],
apiSettingsRole?: $Fields.apiSettingsRole['type'],
templateManagementRole?: $Fields.templateManagementRole['type'],
importRole?: $Fields.importRole['type'],
agentGuidanceRole?: $Fields.agentGuidanceRole['type'],
integrationCreationRole?: $Fields.integrationCreationRole['type']
}
}