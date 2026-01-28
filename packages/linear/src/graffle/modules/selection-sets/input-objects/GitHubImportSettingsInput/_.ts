import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitHubImportSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubImportSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The GitHub organization's name.
*/
orgLogin: $Scalars.String$NonNull<_$Context>,
/**
* The avatar URL for the GitHub organization.
*/
orgAvatarUrl: $Scalars.String$NonNull<_$Context>,
/**
* The names of the repositories connected for the GitHub integration.
*/
repositories: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubRepoInput<_$Context> | null | undefined>>>,
/**
* A map storing all available issue labels per repository
*/
labels?: $Scalars.JSONObject<_$Context>,
/**
* The type of Github org
*/
$orgType: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GithubOrgType>
}