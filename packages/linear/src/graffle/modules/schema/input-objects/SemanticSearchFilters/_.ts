import type * as $Fields from './fields.js'

export * as SemanticSearchFilters from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Filters for semantic search results.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface SemanticSearchFilters {
kind: "InputObject",
name: "SemanticSearchFilters",
isAllFieldsNullable: true,
fields: {
issues: $Fields.issues,
projects: $Fields.projects,
initiatives: $Fields.initiatives,
documents: $Fields.documents
},
type: {
issues?: $Fields.issues['type'],
projects?: $Fields.projects['type'],
initiatives?: $Fields.initiatives['type'],
documents?: $Fields.documents['type']
}
}