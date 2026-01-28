import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as FeedItemFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Feed item filtering options
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface FeedItemFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Filters that the feed item author must satisfy.
*/
author?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.UserFilter<_$Context> | null | undefined>,
/**
* Comparator for the update type: initiative, project, team
*/
updateType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the project or initiative update health: onTrack, atRisk, offTrack
*/
updateHealth?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the feed item's project update must satisfy.
*/
projectUpdate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdateFilter<_$Context> | null | undefined>,
/**
* Filters that the related feed item initiatives must satisfy.
*/
relatedInitiatives?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeCollectionFilter<_$Context> | null | undefined>,
/**
* Filters that the related feed item team must satisfy.
*/
relatedTeams?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamCollectionFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the feed item.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FeedItemFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the feed item.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FeedItemFilter<_$Context> | null | undefined>> | null | undefined>
}