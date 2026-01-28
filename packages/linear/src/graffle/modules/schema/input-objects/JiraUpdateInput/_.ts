import type * as $Fields from './fields.js'

export * as JiraUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraUpdateInput {
kind: "InputObject",
name: "JiraUpdateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
updateProjects: $Fields.updateProjects,
updateMetadata: $Fields.updateMetadata,
deleteWebhook: $Fields.deleteWebhook,
webhookSecret: $Fields.webhookSecret,
noSecret: $Fields.noSecret,
accessToken: $Fields.accessToken,
email: $Fields.email
},
type: {
id: $Fields.id['type'],
updateProjects?: $Fields.updateProjects['type'],
updateMetadata?: $Fields.updateMetadata['type'],
deleteWebhook?: $Fields.deleteWebhook['type'],
webhookSecret?: $Fields.webhookSecret['type'],
noSecret?: $Fields.noSecret['type'],
accessToken?: $Fields.accessToken['type'],
email?: $Fields.email['type']
}
}