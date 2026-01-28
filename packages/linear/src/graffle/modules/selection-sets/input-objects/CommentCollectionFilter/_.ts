import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as CommentCollectionFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comment filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface CommentCollectionFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the comment's body.
*/
body?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the comment's creator must satisfy.
*/
user?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFilter<_$Context> | null | undefined>,
/**
* Filters that the comment's issue must satisfy.
*/
issue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableIssueFilter<_$Context> | null | undefined>,
/**
* Filters that the comment's project update must satisfy.
*/
projectUpdate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectUpdateFilter<_$Context> | null | undefined>,
/**
* Filters that the comment parent must satisfy.
*/
parent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableCommentFilter<_$Context> | null | undefined>,
/**
* Filters that the comment's document content must satisfy.
*/
documentContent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDocumentContentFilter<_$Context> | null | undefined>,
/**
* Filters that the comment's reactions must satisfy.
*/
reactions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReactionCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the comment's customer needs must satisfy.
*/
needs?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCollectionFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the comment.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the comment.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentCollectionFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Filters that needs to be matched by some comments.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentFilter<_$Context> | null | undefined>,
/**
* Filters that needs to be matched by all comments.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CommentFilter<_$Context> | null | undefined>,
/**
* Comparator for the collection length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>
}