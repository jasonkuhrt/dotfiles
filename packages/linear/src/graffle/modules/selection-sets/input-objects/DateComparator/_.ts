import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as DateComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for dates.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface DateComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Equals constraint.
*/
eq?: $Scalars.DateTimeOrDuration<_$Context>,
/**
* Not-equals constraint.
*/
neq?: $Scalars.DateTimeOrDuration<_$Context>,
/**
* In-array constraint.
*/
in?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.DateTimeOrDuration<_$Context>> | null | undefined>,
/**
* Not-in-array constraint.
*/
nin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.DateTimeOrDuration<_$Context>> | null | undefined>,
/**
* Less-than constraint. Matches any values that are less than the given value.
*/
lt?: $Scalars.DateTimeOrDuration<_$Context>,
/**
* Less-than-or-equal constraint. Matches any values that are less than or equal to the given value.
*/
lte?: $Scalars.DateTimeOrDuration<_$Context>,
/**
* Greater-than constraint. Matches any values that are greater than the given value.
*/
gt?: $Scalars.DateTimeOrDuration<_$Context>,
/**
* Greater-than-or-equal constraint. Matches any values that are greater than or equal to the given value.
*/
gte?: $Scalars.DateTimeOrDuration<_$Context>
}