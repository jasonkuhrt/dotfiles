import type * as $Fields from './fields.js'

export * as NullableCustomerFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableCustomerFilter {
kind: "InputObject",
name: "NullableCustomerFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
slackChannelId: $Fields.slackChannelId,
domains: $Fields.domains,
externalIds: $Fields.externalIds,
owner: $Fields.owner,
needs: $Fields.needs,
revenue: $Fields.revenue,
size: $Fields.size,
status: $Fields.status,
tier: $Fields.tier,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
slackChannelId?: $Fields.slackChannelId['type'],
domains?: $Fields.domains['type'],
externalIds?: $Fields.externalIds['type'],
owner?: $Fields.owner['type'],
needs?: $Fields.needs['type'],
revenue?: $Fields.revenue['type'],
size?: $Fields.size['type'],
status?: $Fields.status['type'],
tier?: $Fields.tier['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}