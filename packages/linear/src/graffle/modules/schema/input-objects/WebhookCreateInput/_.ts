import type * as $Fields from './fields.js'

export * as WebhookCreateInput from './fields.js'

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
export interface WebhookCreateInput {
kind: "InputObject",
name: "WebhookCreateInput",
isAllFieldsNullable: true,
fields: {
label: $Fields.label,
id: $Fields.id,
enabled: $Fields.enabled,
secret: $Fields.secret,
url: $Fields.url,
resourceTypes: $Fields.resourceTypes,
teamId: $Fields.teamId,
allPublicTeams: $Fields.allPublicTeams
},
type: {
label?: $Fields.label['type'],
id?: $Fields.id['type'],
enabled?: $Fields.enabled['type'],
secret?: $Fields.secret['type'],
url: $Fields.url['type'],
resourceTypes: $Fields.resourceTypes['type'],
teamId?: $Fields.teamId['type'],
allPublicTeams?: $Fields.allPublicTeams['type']
}
}