import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NullableUserFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* User filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 17 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableUserFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the user's name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's display name.
*/
displayName?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's email.
*/
email?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's activity status.
*/
active?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Filters that the users assigned issues must satisfy.
*/
assignedIssues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueCollectionFilter<_$Context> | null | undefined>,
/**
* Comparator for the user's admin status.
*/
admin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* [Internal] Comparator for the user's owner status.
*/
owner?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's invited status.
*/
invited?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's invited status.
*/
isInvited?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Comparator for the user's app status.
*/
app?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user.
*/
isMe?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Filter based on the existence of the relation.
*/
null?: $Scalars.Boolean<_$Context>,
/**
* Compound filters, all of which need to be matched by the user.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the user.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>> | null | undefined>
}