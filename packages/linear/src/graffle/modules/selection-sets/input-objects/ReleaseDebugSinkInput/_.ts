import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseDebugSinkInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Debug sink for release creation diagnostics.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseDebugSinkInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* List of commit SHAs that were inspected.
*/
inspectedShas: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>>>,
/**
* Map of issue identifiers to their source information.
*/
issues: $Scalars.JSONObject$NonNull<_$Context>,
/**
* Pull request debug information.
*/
pullRequests: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.JSONObject<_$Context>>>,
/**
* List of paths applied during commit scanning.
*/
includePaths?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}