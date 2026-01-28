import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as StringArrayComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for strings.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface StringArrayComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Length of the array. Matches any values that have the given length.
*/
length?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched.
*/
every?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringItemComparator<_$Context> | null | undefined>,
/**
* Compound filters, one of which needs to be matched.
*/
some?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringItemComparator<_$Context> | null | undefined>
}