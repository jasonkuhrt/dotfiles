import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as ProjectLabelFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project label filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectLabelFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Comparator for the name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for whether the label is a group label.
*/
isGroup?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.BooleanComparator<_$Context> | null | undefined>,
/**
* Filters that the project labels creator must satisfy.
*/
creator?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NullableUserFilter<_$Context> | null | undefined>,
/**
* Filters that the project label's parent label must satisfy.
*/
parent?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the label.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the label.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLabelFilter<_$Context> | null | undefined>> | null | undefined>
}