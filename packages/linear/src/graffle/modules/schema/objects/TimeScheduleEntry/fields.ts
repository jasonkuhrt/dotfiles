import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"TimeScheduleEntry"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "TimeScheduleEntry"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TimeScheduleEntry}.
*
* The start date of the schedule in ISO 8601 date-time format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntry} |
* | **Path** | `TimeScheduleEntry.startsAt` |
* | **Nullability** | Required |
*/
export interface startsAt {
kind: "OutputField",
name: "startsAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TimeScheduleEntry}.
*
* The end date of the schedule in ISO 8601 date-time format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntry} |
* | **Path** | `TimeScheduleEntry.endsAt` |
* | **Nullability** | Required |
*/
export interface endsAt {
kind: "OutputField",
name: "endsAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TimeScheduleEntry}.
*
* The Linear user id of the user on schedule. If the user cannot be mapped to a Linear user then `userEmail` can be used as a reference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntry} |
* | **Path** | `TimeScheduleEntry.userId` |
* | **Nullability** | Optional |
*/
export interface userId {
kind: "OutputField",
name: "userId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.TimeScheduleEntry}.
*
* The email, name or reference to the user on schedule. This is used in case the external user could not be mapped to a Linear user id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntry} |
* | **Path** | `TimeScheduleEntry.userEmail` |
* | **Nullability** | Optional |
*/
export interface userEmail {
kind: "OutputField",
name: "userEmail",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
