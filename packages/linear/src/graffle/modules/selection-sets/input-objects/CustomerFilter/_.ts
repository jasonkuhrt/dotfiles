import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as CustomerFilter from './fields.js'

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
* | **Fields** | 15 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the customer name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the customer slack channel ID.
*/
slackChannelId?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the customer's domains.
*/
domains?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringArrayComparator<_$Context> | null | undefined>,
/**
* Comparator for the customer's external IDs.
*/
externalIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringArrayComparator<_$Context> | null | undefined>,
/**
* Filters that the customer owner must satisfy.
*/
owner?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the customer's needs must satisfy.
*/
needs?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerNeedCollectionFilter<_$Context> | null | undefined>,
/**
* Comparator for the customer generated revenue.
*/
revenue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Comparator for the customer size.
*/
size?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Filters that the customer's status must satisfy.
*/
status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerStatusFilter<_$Context> | null | undefined>,
/**
* Filters that the customer's tier must satisfy.
*/
tier?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerTierFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the customer.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the customer.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.CustomerFilter<_$Context> | null | undefined>> | null | undefined>
}