import type * as $Fields from './fields.js'

export * as NotificationDeliveryPreferencesDayInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationDeliveryPreferencesDayInput {
kind: "InputObject",
name: "NotificationDeliveryPreferencesDayInput",
isAllFieldsNullable: true,
fields: {
start: $Fields.start,
end: $Fields.end
},
type: {
start?: $Fields.start['type'],
end?: $Fields.end['type']
}
}