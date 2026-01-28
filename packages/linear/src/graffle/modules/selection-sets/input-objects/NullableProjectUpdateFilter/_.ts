import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NullableProjectUpdateFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Nullable project update filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableProjectUpdateFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Filters that the project update creator must satisfy.
*/
user?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFilter<_$Context> | null | undefined>,
/**
* Filters that the project update project must satisfy.
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>,
/**
* Filters that the project updates reactions must satisfy.
*/
reactions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCollectionFilter<_$Context> | null | undefined>,
/**
* Filter based on the existence of the relation.
*/
null?: $Scalars.Boolean<_$Context>,
/**
* Compound filters, all of which need to be matched by the project update.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectUpdateFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the project update.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectUpdateFilter<_$Context> | null | undefined>> | null | undefined>
}