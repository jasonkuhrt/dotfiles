import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The name of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The description of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The owner of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.ownerId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The sort order of the initiative within the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.sortOrder` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The initiative's color.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.color` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The initiative's icon.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.icon` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The initiative's status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeStatus} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.status` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The estimated completion date of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.targetDate` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The resolution of the initiative's estimated completion date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.targetDateResolution` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.InitiativeCreateInput}.
*
* The initiative's content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.InitiativeCreateInput} |
* | **Path** | `InitiativeCreateInput.content` |
* | **Nullability** | Optional |
*/
export interface content {
kind: "InputField",
name: "content",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}