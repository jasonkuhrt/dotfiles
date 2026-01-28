import type * as $Fields from './fields.js'

export * as CustomerUpsertInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerUpsertInput {
kind: "InputObject",
name: "CustomerUpsertInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
domains: $Fields.domains,
externalId: $Fields.externalId,
slackChannelId: $Fields.slackChannelId,
ownerId: $Fields.ownerId,
statusId: $Fields.statusId,
revenue: $Fields.revenue,
size: $Fields.size,
tierId: $Fields.tierId,
logoUrl: $Fields.logoUrl,
tierName: $Fields.tierName
},
type: {
id?: $Fields.id['type'],
name?: $Fields.name['type'],
domains?: $Fields.domains['type'],
externalId?: $Fields.externalId['type'],
slackChannelId?: $Fields.slackChannelId['type'],
ownerId?: $Fields.ownerId['type'],
statusId?: $Fields.statusId['type'],
revenue?: $Fields.revenue['type'],
size?: $Fields.size['type'],
tierId?: $Fields.tierId['type'],
logoUrl?: $Fields.logoUrl['type'],
tierName?: $Fields.tierName['type']
}
}