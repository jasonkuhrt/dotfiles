import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The name of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The description of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "InputField",
name: "description",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The owner of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.ownerId` |
* | **Nullability** | Optional |
*/
export interface ownerId {
kind: "InputField",
name: "ownerId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The sort order of the initiative within the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.sortOrder` |
* | **Nullability** | Optional |
*/
export interface sortOrder {
kind: "InputField",
name: "sortOrder",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The initiative's color.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.color` |
* | **Nullability** | Optional |
*/
export interface color {
kind: "InputField",
name: "color",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The initiative's icon.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "InputField",
name: "icon",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The estimated completion date of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.targetDate` |
* | **Nullability** | Optional |
*/
export interface targetDate {
kind: "InputField",
name: "targetDate",
inlineType: [0, ],
namedType: $Schema.TimelessDate,
type: $Schema.TimelessDate['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The initiative's status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeStatus} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.status` |
* | **Nullability** | Optional |
*/
export interface status {
kind: "InputField",
name: "status",
inlineType: [0, ],
namedType: $Schema.InitiativeStatus,
type: $Schema.InitiativeStatus['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The resolution of the initiative's estimated completion date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.targetDateResolution` |
* | **Nullability** | Optional |
*/
export interface targetDateResolution {
kind: "InputField",
name: "targetDateResolution",
inlineType: [0, ],
namedType: $Schema.DateResolutionType,
type: $Schema.DateResolutionType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* Whether the initiative has been trashed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.trashed` |
* | **Nullability** | Optional |
*/
export interface trashed {
kind: "InputField",
name: "trashed",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The initiative's content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.content` |
* | **Nullability** | Optional |
*/
export interface content {
kind: "InputField",
name: "content",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The n-weekly frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.updateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface updateReminderFrequencyInWeeks {
kind: "InputField",
name: "updateReminderFrequencyInWeeks",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.updateReminderFrequency` |
* | **Nullability** | Optional |
*/
export interface updateReminderFrequency {
kind: "InputField",
name: "updateReminderFrequency",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The frequency resolution.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FrequencyResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.frequencyResolution` |
* | **Nullability** | Optional |
*/
export interface frequencyResolution {
kind: "InputField",
name: "frequencyResolution",
inlineType: [0, ],
namedType: $Schema.FrequencyResolutionType,
type: $Schema.FrequencyResolutionType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The day at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.updateRemindersDay` |
* | **Nullability** | Optional |
*/
export interface updateRemindersDay {
kind: "InputField",
name: "updateRemindersDay",
inlineType: [0, ],
namedType: $Schema.Day,
type: $Schema.Day['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeUpdateInput}.
*
* The hour at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeUpdateInput} |
* | **Path** | `InitiativeUpdateInput.updateRemindersHour` |
* | **Nullability** | Optional |
*/
export interface updateRemindersHour {
kind: "InputField",
name: "updateRemindersHour",
inlineType: [0, ],
namedType: $Schema.Int,
type: $Schema.Int['codec']['_typeDecoded'] | null | undefined
}