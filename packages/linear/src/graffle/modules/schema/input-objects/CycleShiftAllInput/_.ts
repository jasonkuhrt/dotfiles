import type * as $Fields from './fields.js'

export * as CycleShiftAllInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for shifting all cycles from a certain cycle onwards by a certain number of days
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface CycleShiftAllInput {
kind: "InputObject",
name: "CycleShiftAllInput",
isAllFieldsNullable: false,
fields: {
id: $Fields.id,
daysToShift: $Fields.daysToShift
},
type: {
id: $Fields.id['type'],
daysToShift: $Fields.daysToShift['type']
}
}