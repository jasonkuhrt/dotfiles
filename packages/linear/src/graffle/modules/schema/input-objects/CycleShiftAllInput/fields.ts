import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CycleShiftAllInput}.
*
* The cycle ID at which to start the shift.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CycleShiftAllInput} |
* | **Path** | `CycleShiftAllInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CycleShiftAllInput}.
*
* The number of days to shift the cycles by.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CycleShiftAllInput} |
* | **Path** | `CycleShiftAllInput.daysToShift` |
* | **Nullability** | Required |
*/
export interface daysToShift {
kind: "InputField",
name: "daysToShift",
inlineType: [1, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded']
}