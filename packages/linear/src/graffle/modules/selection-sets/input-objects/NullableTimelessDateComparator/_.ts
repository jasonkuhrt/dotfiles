import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as NullableTimelessDateComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for optional timeless dates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableTimelessDateComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Equals constraint.
*/
eq?: $Scalars.TimelessDateOrDuration<_$Context>,
/**
* Not-equals constraint.
*/
neq?: $Scalars.TimelessDateOrDuration<_$Context>,
/**
* In-array constraint.
*/
in?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.TimelessDateOrDuration<_$Context>> | null | undefined>,
/**
* Not-in-array constraint.
*/
nin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.TimelessDateOrDuration<_$Context>> | null | undefined>,
/**
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*/
null?: $Scalars.Boolean<_$Context>,
/**
* Less-than constraint. Matches any values that are less than the given value.
*/
lt?: $Scalars.TimelessDateOrDuration<_$Context>,
/**
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*/
lte?: $Scalars.TimelessDateOrDuration<_$Context>,
/**
* Greater-than constraint. Matches any values that are greater than the given value.
*/
gt?: $Scalars.TimelessDateOrDuration<_$Context>,
/**
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*/
gte?: $Scalars.TimelessDateOrDuration<_$Context>
}