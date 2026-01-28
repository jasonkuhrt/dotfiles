import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitLabSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface GitLabSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The self-hosted URL of the GitLab instance.
*/
url?: $Scalars.String<_$Context>,
/**
* Whether the token is limited to a read-only scope.
*/
readonly?: $Scalars.Boolean<_$Context>,
/**
* The ISO timestamp the GitLab access token expires.
*/
expiresAt?: $Scalars.String<_$Context>
}