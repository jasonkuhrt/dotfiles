import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitHubRepoMappingInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubRepoMappingInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The unique identifier for this mapping.
*/
id: $Scalars.String$NonNull<_$Context>,
/**
* The Linear team id to map to the given project.
*/
linearTeamId: $Scalars.String$NonNull<_$Context>,
/**
* The GitHub repo id.
*/
gitHubRepoId: $Scalars.Float$NonNull<_$Context>,
/**
* Labels to filter incoming GitHub issue creation by.
*/
gitHubLabels?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Whether the sync for this mapping is bidirectional.
*/
bidirectional?: $Scalars.Boolean<_$Context>,
/**
* Whether this mapping is the default one for issue creation.
*/
default?: $Scalars.Boolean<_$Context>
}