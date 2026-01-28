import type * as $Fields from './fields.js'

export * as TimeScheduleUpdateInput from './fields.js'

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
export interface TimeScheduleUpdateInput {
kind: "InputObject",
name: "TimeScheduleUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
entries: $Fields.entries,
externalId: $Fields.externalId,
externalUrl: $Fields.externalUrl
},
type: {
name?: $Fields.name['type'],
entries?: $Fields.entries['type'],
externalId?: $Fields.externalId['type'],
externalUrl?: $Fields.externalUrl['type']
}
}