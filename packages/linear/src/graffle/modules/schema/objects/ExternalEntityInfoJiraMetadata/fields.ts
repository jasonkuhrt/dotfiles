import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ExternalEntityInfoJiraMetadata"`
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
value: "ExternalEntityInfoJiraMetadata"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoJiraMetadata}.
*
* The key of the Jira issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoJiraMetadata} |
* | **Path** | `ExternalEntityInfoJiraMetadata.issueKey` |
* | **Nullability** | Optional |
*/
export interface issueKey {
kind: "OutputField",
name: "issueKey",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoJiraMetadata}.
*
* The id of the Jira project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoJiraMetadata} |
* | **Path** | `ExternalEntityInfoJiraMetadata.projectId` |
* | **Nullability** | Optional |
*/
export interface projectId {
kind: "OutputField",
name: "projectId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ExternalEntityInfoJiraMetadata}.
*
* The id of the Jira issue type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ExternalEntityInfoJiraMetadata} |
* | **Path** | `ExternalEntityInfoJiraMetadata.issueTypeId` |
* | **Nullability** | Optional |
*/
export interface issueTypeId {
kind: "OutputField",
name: "issueTypeId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
