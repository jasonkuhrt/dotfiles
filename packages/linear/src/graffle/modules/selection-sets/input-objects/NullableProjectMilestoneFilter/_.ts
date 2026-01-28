import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NullableProjectMilestoneFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project milestone filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableProjectMilestoneFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the project milestone name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableStringComparator<_$Context> | null | undefined>,
/**
* Comparator for the project milestone target date.
*/
targetDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableDateComparator<_$Context> | null | undefined>,
/**
* Filters that the project milestone's project must satisfy.
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectFilter<_$Context> | null | undefined>,
/**
* Filter based on the existence of the relation.
*/
null?: $Scalars.Boolean<_$Context>,
/**
* Compound filters, all of which need to be matched by the project milestone.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectMilestoneFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the project milestone.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableProjectMilestoneFilter<_$Context> | null | undefined>> | null | undefined>
}