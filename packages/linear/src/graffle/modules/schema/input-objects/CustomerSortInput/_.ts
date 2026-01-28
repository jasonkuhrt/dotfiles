import type * as $Fields from './fields.js'

export * as CustomerSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerSortInput {
kind: "InputObject",
name: "CustomerSortInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
createdAt: $Fields.createdAt,
owner: $Fields.owner,
status: $Fields.status,
revenue: $Fields.revenue,
size: $Fields.size,
tier: $Fields.tier,
approximateNeedCount: $Fields.approximateNeedCount
},
type: {
name?: $Fields.name['type'],
createdAt?: $Fields.createdAt['type'],
owner?: $Fields.owner['type'],
status?: $Fields.status['type'],
revenue?: $Fields.revenue['type'],
size?: $Fields.size['type'],
tier?: $Fields.tier['type'],
approximateNeedCount?: $Fields.approximateNeedCount['type']
}
}