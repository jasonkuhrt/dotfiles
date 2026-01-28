import type * as $Fields from './fields.js'

export * as TriageResponsibilityCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface TriageResponsibilityCreateInput {
kind: "InputObject",
name: "TriageResponsibilityCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
teamId: $Fields.teamId,
action: $Fields.action,
manualSelection: $Fields.manualSelection,
timeScheduleId: $Fields.timeScheduleId
},
type: {
id?: $Fields.id['type'],
teamId: $Fields.teamId['type'],
action: $Fields.action['type'],
manualSelection?: $Fields.manualSelection['type'],
timeScheduleId?: $Fields.timeScheduleId['type']
}
}