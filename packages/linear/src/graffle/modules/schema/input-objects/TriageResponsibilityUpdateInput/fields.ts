import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityUpdateInput}.
*
* The action to take when an issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityUpdateInput} |
* | **Path** | `TriageResponsibilityUpdateInput.action` |
* | **Nullability** | Optional |
*/
export interface action {
kind: "InputField",
name: "action",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityUpdateInput}.
*
* The manual selection of users responsible for triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityManualSelectionInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityUpdateInput} |
* | **Path** | `TriageResponsibilityUpdateInput.manualSelection` |
* | **Nullability** | Optional |
*/
export interface manualSelection {
kind: "InputField",
name: "manualSelection",
inlineType: [0, ],
namedType: $Schema.TriageResponsibilityManualSelectionInput,
type: $Schema.TriageResponsibilityManualSelectionInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityUpdateInput}.
*
* The identifier of the time schedule used for scheduling triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityUpdateInput} |
* | **Path** | `TriageResponsibilityUpdateInput.timeScheduleId` |
* | **Nullability** | Optional |
*/
export interface timeScheduleId {
kind: "InputField",
name: "timeScheduleId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}