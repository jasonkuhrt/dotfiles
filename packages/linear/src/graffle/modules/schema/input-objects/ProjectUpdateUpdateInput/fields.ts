import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateUpdateInput}.
*
* The content of the project update in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateUpdateInput} |
* | **Path** | `ProjectUpdateUpdateInput.body` |
* | **Nullability** | Optional |
*/
export interface body {
kind: "InputField",
name: "body",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateUpdateInput}.
*
* The content of the project update as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateUpdateInput} |
* | **Path** | `ProjectUpdateUpdateInput.bodyData` |
* | **Nullability** | Optional |
*/
export interface bodyData {
kind: "InputField",
name: "bodyData",
inlineType: [0, ],
namedType: $Schema.JSON,
type: $Schema.JSON['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateUpdateInput}.
*
* The health of the project at the time of the update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateHealthType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateUpdateInput} |
* | **Path** | `ProjectUpdateUpdateInput.health` |
* | **Nullability** | Optional |
*/
export interface health {
kind: "InputField",
name: "health",
inlineType: [0, ],
namedType: $Schema.ProjectUpdateHealthType,
type: $Schema.ProjectUpdateHealthType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.ProjectUpdateUpdateInput}.
*
* Whether the diff between the current update and the previous one should be hidden.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectUpdateUpdateInput} |
* | **Path** | `ProjectUpdateUpdateInput.isDiffHidden` |
* | **Nullability** | Optional |
*/
export interface isDiffHidden {
kind: "InputField",
name: "isDiffHidden",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}