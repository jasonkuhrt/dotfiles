import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as IssueSuggestionCollectionFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* IssueSuggestion collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueSuggestionCollectionFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the suggestion type.
*/
type?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the suggestion state.
*/
state?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the suggested user must satisfy.
*/
suggestedUser?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the suggested project must satisfy.
*/
suggestedProject?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectFilter<_$Context> | null | undefined>,
/**
* Filters that the suggested team must satisfy.
*/
suggestedTeam?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableTeamFilter<_$Context> | null | undefined>,
/**
* Filters that the suggested label must satisfy.
*/
suggestedLabel?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueLabelFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the suggestion.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSuggestionCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the suggestion.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSuggestionCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Filters that needs to be matched by some suggestions.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSuggestionFilter<_$Context> | null | undefined>,
/**
* Filters that needs to be matched by all suggestions.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueSuggestionFilter<_$Context> | null | undefined>,
/**
* Comparator for the collection length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>
}