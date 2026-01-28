import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as FavoriteCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 23 |
* | **All Fields Nullable** | Yes |
*/
export interface FavoriteCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the favorite folder.
*/
folderName?: $Scalars.String<_$Context>,
/**
* The parent folder of the favorite.
*/
parentId?: $Scalars.String<_$Context>,
/**
* The identifier of the issue to favorite. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* The identifier of the facet to favorite.
*/
facetId?: $Scalars.String<_$Context>,
/**
* The identifier of the project to favorite.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The tab of the project to favorite.
*/
$projectTab?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectTab | null | undefined>,
/**
* The type of the predefined view to favorite.
*/
predefinedViewType?: $Scalars.String<_$Context>,
/**
* The identifier of team for the predefined view to favorite.
*/
predefinedViewTeamId?: $Scalars.String<_$Context>,
/**
* The identifier of the cycle to favorite.
*/
cycleId?: $Scalars.String<_$Context>,
/**
* The identifier of the custom view to favorite.
*/
customViewId?: $Scalars.String<_$Context>,
/**
* The identifier of the document to favorite.
*/
documentId?: $Scalars.String<_$Context>,
/**
* [INTERNAL] The identifier of the initiative to favorite.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The tab of the initiative to favorite.
*/
$initiativeTab?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeTab | null | undefined>,
/**
* The identifier of the label to favorite.
*/
labelId?: $Scalars.String<_$Context>,
/**
* The identifier of the label to favorite.
*/
projectLabelId?: $Scalars.String<_$Context>,
/**
* The identifier of the user to favorite.
*/
userId?: $Scalars.String<_$Context>,
/**
* The position of the item in the favorites list.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The identifier of the customer to favorite.
*/
customerId?: $Scalars.String<_$Context>,
/**
* The identifier of the dashboard to favorite.
*/
dashboardId?: $Scalars.String<_$Context>,
/**
* The identifier of the pull request to favorite.
*/
pullRequestId?: $Scalars.String<_$Context>,
/**
* [ALPHA] The identifier of the release to favorite.
*/
releaseId?: $Scalars.String<_$Context>,
/**
* [ALPHA] The identifier of the release pipeline to favorite.
*/
releasePipelineId?: $Scalars.String<_$Context>
}