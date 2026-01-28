import type * as $Fields from './fields.js'

export * as TriageResponsibilityUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface TriageResponsibilityUpdateInput {
kind: "InputObject",
name: "TriageResponsibilityUpdateInput",
isAllFieldsNullable: true,
fields: {
action: $Fields.action,
manualSelection: $Fields.manualSelection,
timeScheduleId: $Fields.timeScheduleId
},
type: {
action?: $Fields.action['type'],
manualSelection?: $Fields.manualSelection['type'],
timeScheduleId?: $Fields.timeScheduleId['type']
}
}