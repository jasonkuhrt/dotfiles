import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as ReactionCollectionFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Reaction filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface ReactionCollectionFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the reactions emoji.
*/
emoji?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the reactions custom emoji.
*/
customEmojiId?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the reaction.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the reaction.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Filters that needs to be matched by some reactions.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionFilter<_$Context> | null | undefined>,
/**
* Filters that needs to be matched by all reactions.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionFilter<_$Context> | null | undefined>,
/**
* Comparator for the collection length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>
}