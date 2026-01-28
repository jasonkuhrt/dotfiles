import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleUpdateInput}.
*
* The name of the schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleUpdateInput} |
* | **Path** | `TimeScheduleUpdateInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleUpdateInput}.
*
* The schedule entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeScheduleEntryInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.TimeScheduleUpdateInput} |
* | **Path** | `TimeScheduleUpdateInput.entries` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface entries {
kind: "InputField",
name: "entries",
inlineType: [0, [1, ]],
namedType: $Schema.TimeScheduleEntryInput,
type: readonly ($Schema.TimeScheduleEntryInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleUpdateInput}.
*
* The unique identifier of the external schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleUpdateInput} |
* | **Path** | `TimeScheduleUpdateInput.externalId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TimeScheduleUpdateInput}.
*
* The URL to the external schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TimeScheduleUpdateInput} |
* | **Path** | `TimeScheduleUpdateInput.externalUrl` |
* | **Nullability** | Optional |
*/
export interface externalUrl {
kind: "InputField",
name: "externalUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}