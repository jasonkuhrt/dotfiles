import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SlaStatusComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for sla status.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface SlaStatusComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Equals constraint.
*/
$eq?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatus | null | undefined>,
/**
* Not-equals constraint.
*/
$neq?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatus | null | undefined>,
/**
* In-array constraint.
*/
$in?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatus | null | undefined>> | null | undefined>,
/**
* Not-in-array constraint.
*/
$nin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlaStatus | null | undefined>> | null | undefined>,
/**
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*/
null?: $Scalars.Boolean<_$Context>
}