import type * as $Fields from './fields.js'

export * as TimeScheduleEntry from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface TimeScheduleEntry {
kind: "Object",
name: "TimeScheduleEntry",
fields: {
__typename: $Fields.__typename,
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
userId: $Fields.userId,
userEmail: $Fields.userEmail
}
}