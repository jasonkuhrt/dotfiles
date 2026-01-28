import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as ProjectUpdatesCollectionFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Collection filtering options for filtering projects by project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectUpdatesCollectionFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the project update health.
*/
health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the project update.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatesCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the update.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatesCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Filters that needs to be matched by some updates.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatesFilter<_$Context> | null | undefined>,
/**
* Filters that needs to be matched by all updates.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatesFilter<_$Context> | null | undefined>,
/**
* Comparator for the collection length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>
}