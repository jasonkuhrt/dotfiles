import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as JiraLinearMappingInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface JiraLinearMappingInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Jira id for this project.
*/
jiraProjectId: $Scalars.String$NonNull<_$Context>,
/**
* The Linear team id to map to the given project.
*/
linearTeamId: $Scalars.String$NonNull<_$Context>,
/**
* Whether the sync for this mapping is bidirectional.
*/
bidirectional?: $Scalars.Boolean<_$Context>,
/**
* Whether this mapping is the default one for issue creation.
*/
default?: $Scalars.Boolean<_$Context>
}