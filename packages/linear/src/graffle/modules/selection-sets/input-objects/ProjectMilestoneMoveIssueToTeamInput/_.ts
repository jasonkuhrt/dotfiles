import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectMilestoneMoveIssueToTeamInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [Internal] Used for ProjectMilestoneMoveInput to describe a mapping between an issue and its team.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface ProjectMilestoneMoveIssueToTeamInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The issue id in this relationship, you can use * as wildcard if all issues are being moved to the same team
*/
issueId: $Scalars.String$NonNull<_$Context>,
/**
* The team id in this relationship
*/
teamId: $Scalars.String$NonNull<_$Context>
}