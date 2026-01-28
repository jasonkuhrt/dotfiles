import type * as $Fields from './fields.js'

export * as TimeSchedulePayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface TimeSchedulePayload {
kind: "Object",
name: "TimeSchedulePayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
timeSchedule: $Fields.timeSchedule,
success: $Fields.success
}
}