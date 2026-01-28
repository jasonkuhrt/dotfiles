import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SemanticSearchResult"`
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
value: "SemanticSearchResult"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The type of the semantic search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SemanticSearchResultType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.SemanticSearchResultType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The issue related to the semantic search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.issue` |
* | **Nullability** | Optional |
*/
export interface issue {
kind: "OutputField",
name: "issue",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The project related to the semantic search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The initiative related to the semantic search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Initiative
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SemanticSearchResult}.
*
* The document related to the semantic search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Document} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchResult} |
* | **Path** | `SemanticSearchResult.document` |
* | **Nullability** | Optional |
*/
export interface document {
kind: "OutputField",
name: "document",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Document
}
