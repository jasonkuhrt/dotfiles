import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as CustomerNeedFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerNeedFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the customer need priority.
*/
priority?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Filters that the need's project must satisfy.
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectFilter<_$Context> | null | undefined>,
/**
* Filters that the need's issue must satisfy.
*/
issue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableIssueFilter<_$Context> | null | undefined>,
/**
* Filters that the need's comment must satisfy.
*/
comment?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableCommentFilter<_$Context> | null | undefined>,
/**
* Filters that the need's customer must satisfy.
*/
customer?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableCustomerFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the customer need.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the customer need.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedFilter<_$Context> | null | undefined>> | null | undefined>
}