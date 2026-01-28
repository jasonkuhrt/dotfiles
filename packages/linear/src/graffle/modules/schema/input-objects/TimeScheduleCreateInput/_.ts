import type * as $Fields from './fields.js'

export * as TimeScheduleCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface TimeScheduleCreateInput {
kind: "InputObject",
name: "TimeScheduleCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
entries: $Fields.entries,
externalId: $Fields.externalId,
externalUrl: $Fields.externalUrl
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
entries: $Fields.entries['type'],
externalId?: $Fields.externalId['type'],
externalUrl?: $Fields.externalUrl['type']
}
}