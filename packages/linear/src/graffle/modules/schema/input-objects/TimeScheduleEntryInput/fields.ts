import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleEntryInput}.
*
* The start date of the schedule in ISO 8601 date-time format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntryInput} |
* | **Path** | `TimeScheduleEntryInput.startsAt` |
* | **Nullability** | Required |
*/
export interface startsAt {
kind: "InputField",
name: "startsAt",
inlineType: [1, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleEntryInput}.
*
* The end date of the schedule in ISO 8601 date-time format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntryInput} |
* | **Path** | `TimeScheduleEntryInput.endsAt` |
* | **Nullability** | Required |
*/
export interface endsAt {
kind: "InputField",
name: "endsAt",
inlineType: [1, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleEntryInput}.
*
* The Linear user id of the user on schedule. If the user cannot be mapped to a Linear user then `userEmail` can be used as a reference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntryInput} |
* | **Path** | `TimeScheduleEntryInput.userId` |
* | **Nullability** | Optional |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleEntryInput}.
*
* The email, name or reference to the user on schedule. This is used in case the external user could not be mapped to a Linear user id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleEntryInput} |
* | **Path** | `TimeScheduleEntryInput.userEmail` |
* | **Nullability** | Optional |
*/
export interface userEmail {
kind: "InputField",
name: "userEmail",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}