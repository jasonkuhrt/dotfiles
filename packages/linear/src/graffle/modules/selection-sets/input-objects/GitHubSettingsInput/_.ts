import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitHubSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
$pullRequestReviewTool?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PullRequestReviewTool | null | undefined>,
/**
* The avatar URL for the GitHub organization.
*/
orgAvatarUrl?: $Scalars.String<_$Context>,
/**
* The GitHub organization's name.
*/
orgLogin: $Scalars.String$NonNull<_$Context>,
/**
* The names of the repositories connected for the GitHub integration.
*/
repositories?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubRepoInput<_$Context> | null | undefined>> | null | undefined>,
/**
* Mapping of team to repository for syncing.
*/
repositoriesMapping?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitHubRepoMappingInput<_$Context> | null | undefined>> | null | undefined>,
/**
* The type of Github org
*/
$orgType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GithubOrgType | null | undefined>,
/**
* Whether the integration has code access
*/
codeAccess?: $Scalars.Boolean<_$Context>
}