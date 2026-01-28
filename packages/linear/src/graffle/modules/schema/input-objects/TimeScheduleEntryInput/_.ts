import type * as $Fields from './fields.js'

export * as TimeScheduleEntryInput from './fields.js'

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
export interface TimeScheduleEntryInput {
kind: "InputObject",
name: "TimeScheduleEntryInput",
isAllFieldsNullable: true,
fields: {
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
userId: $Fields.userId,
userEmail: $Fields.userEmail
},
type: {
startsAt: $Fields.startsAt['type'],
endsAt: $Fields.endsAt['type'],
userId?: $Fields.userId['type'],
userEmail?: $Fields.userEmail['type']
}
}