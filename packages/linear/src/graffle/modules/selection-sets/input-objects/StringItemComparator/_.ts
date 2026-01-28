import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as StringItemComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for strings in arrays.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface StringItemComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Equals constraint.
*/
eq?: $Scalars.String<_$Context>,
/**
* Not-equals constraint.
*/
neq?: $Scalars.String<_$Context>,
/**
* In-array constraint.
*/
in?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Not-in-array constraint.
*/
nin?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Equals case insensitive. Matches any values that matches the given string case insensitive.
*/
eqIgnoreCase?: $Scalars.String<_$Context>,
/**
* Not-equals case insensitive. Matches any values that don't match the given string case insensitive.
*/
neqIgnoreCase?: $Scalars.String<_$Context>,
/**
* Starts with constraint. Matches any values that start with the given string.
*/
startsWith?: $Scalars.String<_$Context>,
/**
* Starts with case insensitive constraint. Matches any values that start with the given string.
*/
startsWithIgnoreCase?: $Scalars.String<_$Context>,
/**
* Doesn't start with constraint. Matches any values that don't start with the given string.
*/
notStartsWith?: $Scalars.String<_$Context>,
/**
* Ends with constraint. Matches any values that end with the given string.
*/
endsWith?: $Scalars.String<_$Context>,
/**
* Doesn't end with constraint. Matches any values that don't end with the given string.
*/
notEndsWith?: $Scalars.String<_$Context>,
/**
* Contains constraint. Matches any values that contain the given string.
*/
contains?: $Scalars.String<_$Context>,
/**
* Contains case insensitive constraint. Matches any values that contain the given string case insensitive.
*/
containsIgnoreCase?: $Scalars.String<_$Context>,
/**
* Doesn't contain constraint. Matches any values that don't contain the given string.
*/
notContains?: $Scalars.String<_$Context>,
/**
* Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.
*/
notContainsIgnoreCase?: $Scalars.String<_$Context>,
/**
* Contains case and accent insensitive constraint. Matches any values that contain the given string case and accent insensitive.
*/
containsIgnoreCaseAndAccent?: $Scalars.String<_$Context>
}