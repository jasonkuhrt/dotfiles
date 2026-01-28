import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SourceMetadataComparator from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for issue source type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface SourceMetadataComparator<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*/
null?: $Scalars.Boolean<_$Context>,
/**
* Comparator for the sub type.
*/
subType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SubTypeComparator<_$Context> | null | undefined>,
/**
* [INTERNAL] Comparator for the salesforce metadata.
*/
salesforceMetadata?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SalesforceMetadataIntegrationComparator<_$Context> | null | undefined>
}