import type * as $Fields from './fields.js'

export * as IntegrationTemplateCreateInput from './fields.js'

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
export interface IntegrationTemplateCreateInput {
kind: "InputObject",
name: "IntegrationTemplateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
integrationId: $Fields.integrationId,
templateId: $Fields.templateId,
foreignEntityId: $Fields.foreignEntityId
},
type: {
id?: $Fields.id['type'],
integrationId: $Fields.integrationId['type'],
templateId: $Fields.templateId['type'],
foreignEntityId?: $Fields.foreignEntityId['type']
}
}