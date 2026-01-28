import type * as $Fields from './fields.js'

export * as PushSubscriptionCreateInput from './fields.js'

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
export interface PushSubscriptionCreateInput {
kind: "InputObject",
name: "PushSubscriptionCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
userId: $Fields.userId,
data: $Fields.data,
type: $Fields.type
},
type: {
id?: $Fields.id['type'],
userId?: $Fields.userId['type'],
data: $Fields.data['type'],
type?: $Fields.type['type']
}
}