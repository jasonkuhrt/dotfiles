import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as SemanticSearchFilters from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
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
export interface SemanticSearchFilters<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Filters applied to issues.
*/
issues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>,
/**
* Filters applied to projects.
*/
projects?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>,
/**
* Filters applied to initiatives.
*/
initiatives?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeFilter<_$Context> | null | undefined>,
/**
* Filters applied to documents.
*/
documents?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DocumentFilter<_$Context> | null | undefined>
}