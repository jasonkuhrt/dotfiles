import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ProjectStatusCountPayload"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "ProjectStatusCountPayload"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectStatusCountPayload}.
*
* Total number of projects using this project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectStatusCountPayload} |
* | **Path** | `ProjectStatusCountPayload.count` |
* | **Nullability** | Required |
*/
export interface count {
kind: "OutputField",
name: "count",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectStatusCountPayload}.
*
* Total number of projects using this project status that are not visible to the user because they are in a private team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectStatusCountPayload} |
* | **Path** | `ProjectStatusCountPayload.privateCount` |
* | **Nullability** | Required |
*/
export interface privateCount {
kind: "OutputField",
name: "privateCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ProjectStatusCountPayload}.
*
* Total number of projects using this project status that are not visible to the user because they are in an archived team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ProjectStatusCountPayload} |
* | **Path** | `ProjectStatusCountPayload.archivedTeamCount` |
* | **Nullability** | Required |
*/
export interface archivedTeamCount {
kind: "OutputField",
name: "archivedTeamCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}
