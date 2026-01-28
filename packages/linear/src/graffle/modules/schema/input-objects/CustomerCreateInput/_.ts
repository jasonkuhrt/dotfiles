import type * as $Fields from './fields.js'

export * as CustomerCreateInput from './fields.js'

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
export interface CustomerCreateInput {
kind: "InputObject",
name: "CustomerCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
domains: $Fields.domains,
externalIds: $Fields.externalIds,
slackChannelId: $Fields.slackChannelId,
ownerId: $Fields.ownerId,
statusId: $Fields.statusId,
revenue: $Fields.revenue,
size: $Fields.size,
tierId: $Fields.tierId,
logoUrl: $Fields.logoUrl,
mainSourceId: $Fields.mainSourceId
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
domains?: $Fields.domains['type'],
externalIds?: $Fields.externalIds['type'],
slackChannelId?: $Fields.slackChannelId['type'],
ownerId?: $Fields.ownerId['type'],
statusId?: $Fields.statusId['type'],
revenue?: $Fields.revenue['type'],
size?: $Fields.size['type'],
tierId?: $Fields.tierId['type'],
logoUrl?: $Fields.logoUrl['type'],
mainSourceId?: $Fields.mainSourceId['type']
}
}