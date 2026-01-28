import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectMilestoneMoveInput from './fields.js'

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
export interface ProjectMilestoneMoveInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the project to move the milestone to.
*/
projectId: $Scalars.String$NonNull<_$Context>,
/**
* The team id to move the attached issues to. This is needed when there is a mismatch between a project's teams and the milestone's issues' teams. Either this or addIssueTeamToProject is required in that situation to resolve constraints.
*/
newIssueTeamId?: $Scalars.String<_$Context>,
/**
* Whether to add each milestone issue's team to the project. This is needed when there is a mismatch between a project's teams and the milestone's issues' teams. Either this or newIssueTeamId is required in that situation to resolve constraints.
*/
addIssueTeamToProject?: $Scalars.Boolean<_$Context>,
/**
* A list of issue id to team ids, used for undoing a previous milestone move where the specified issues were moved from the specified teams.
*/
undoIssueTeamIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneMoveIssueToTeamInput<_$Context> | null | undefined>> | null | undefined>,
/**
* A mapping of project id to a previous set of team ids, used for undoing a previous milestone move where the specified teams were added to the project.
*/
undoProjectTeamIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectMilestoneMoveProjectTeamsInput<_$Context> | null | undefined>
}