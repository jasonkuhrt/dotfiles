import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.id` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The name of the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.name` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The description of the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.description` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The color of the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.color` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The identifier of the parent label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.parentId` |
* | **Nullability** | Optional |
*/
export interface parentId {
kind: "InputField",
name: "parentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* The team associated with the label. If not given, the label will be associated with the entire workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* Whether the label is a group.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.isGroup` |
* | **Nullability** | Optional |
*/
export interface isGroup {
kind: "InputField",
name: "isGroup",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueLabelCreateInput}.
*
* When the label was retired.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueLabelCreateInput} |
* | **Path** | `IssueLabelCreateInput.retiredAt` |
* | **Nullability** | Optional |
*/
export interface retiredAt {
kind: "InputField",
name: "retiredAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}