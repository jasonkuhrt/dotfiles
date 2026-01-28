import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityCreateInput} |
* | **Path** | `TriageResponsibilityCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityCreateInput}.
*
* The identifier of the team associated with the triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityCreateInput} |
* | **Path** | `TriageResponsibilityCreateInput.teamId` |
* | **Nullability** | Required |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityCreateInput}.
*
* The action to take when an issue is added to triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityCreateInput} |
* | **Path** | `TriageResponsibilityCreateInput.action` |
* | **Nullability** | Required |
*/
export interface action {
kind: "InputField",
name: "action",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityCreateInput}.
*
* The manual selection of users responsible for triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityManualSelectionInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityCreateInput} |
* | **Path** | `TriageResponsibilityCreateInput.manualSelection` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.TriageResponsibilityCreateInput}.
*
* The identifier of the time schedule used for scheduling triage responsibility
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.TriageResponsibilityCreateInput} |
* | **Path** | `TriageResponsibilityCreateInput.timeScheduleId` |
* | **Nullability** | Optional |
*/
export interface timeScheduleId {
kind: "InputField",
name: "timeScheduleId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}