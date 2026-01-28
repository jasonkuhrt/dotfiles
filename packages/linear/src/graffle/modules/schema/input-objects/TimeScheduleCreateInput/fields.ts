import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleCreateInput} |
* | **Path** | `TimeScheduleCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleCreateInput}.
*
* The name of the schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleCreateInput} |
* | **Path** | `TimeScheduleCreateInput.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleCreateInput}.
*
* The schedule entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeScheduleEntryInput}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.TimeScheduleCreateInput} |
* | **Path** | `TimeScheduleCreateInput.entries` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface entries {
kind: "InputField",
name: "entries",
inlineType: [1, [1, ]],
namedType: $Schema.TimeScheduleEntryInput,
type: readonly ($Schema.TimeScheduleEntryInput['type'])[]
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleCreateInput}.
*
* The unique identifier of the external schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleCreateInput} |
* | **Path** | `TimeScheduleCreateInput.externalId` |
* | **Nullability** | Optional |
*/
export interface externalId {
kind: "InputField",
name: "externalId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleCreateInput}.
*
* The URL to the external schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleCreateInput} |
* | **Path** | `TimeScheduleCreateInput.externalUrl` |
* | **Nullability** | Optional |
*/
export interface externalUrl {
kind: "InputField",
name: "externalUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}