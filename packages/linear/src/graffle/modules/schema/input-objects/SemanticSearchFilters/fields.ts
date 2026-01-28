import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SemanticSearchFilters}.
*
* Filters applied to issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchFilters} |
* | **Path** | `SemanticSearchFilters.issues` |
* | **Nullability** | Optional |
*/
export interface issues {
kind: "InputField",
name: "issues",
inlineType: [0, ],
namedType: $Schema.IssueFilter,
type: $Schema.IssueFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SemanticSearchFilters}.
*
* Filters applied to projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchFilters} |
* | **Path** | `SemanticSearchFilters.projects` |
* | **Nullability** | Optional |
*/
export interface projects {
kind: "InputField",
name: "projects",
inlineType: [0, ],
namedType: $Schema.ProjectFilter,
type: $Schema.ProjectFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SemanticSearchFilters}.
*
* Filters applied to initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchFilters} |
* | **Path** | `SemanticSearchFilters.initiatives` |
* | **Nullability** | Optional |
*/
export interface initiatives {
kind: "InputField",
name: "initiatives",
inlineType: [0, ],
namedType: $Schema.InitiativeFilter,
type: $Schema.InitiativeFilter['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SemanticSearchFilters}.
*
* Filters applied to documents.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentFilter} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SemanticSearchFilters} |
* | **Path** | `SemanticSearchFilters.documents` |
* | **Nullability** | Optional |
*/
export interface documents {
kind: "InputField",
name: "documents",
inlineType: [0, ],
namedType: $Schema.DocumentFilter,
type: $Schema.DocumentFilter['type'] | null | undefined
}