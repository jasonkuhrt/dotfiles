import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CustomViewCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 15 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomViewCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the custom view.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The description of the custom view.
*/
description?: $Scalars.String<_$Context>,
/**
* The icon of the custom view.
*/
icon?: $Scalars.String<_$Context>,
/**
* The color of the icon of the custom view.
*/
color?: $Scalars.String<_$Context>,
/**
* The id of the team associated with the custom view.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The id of the project associated with the custom view.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The id of the initiative associated with the custom view.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The owner of the custom view.
*/
ownerId?: $Scalars.String<_$Context>,
/**
* The filters applied to issues in the custom view.
*
* @deprecated Use `filterData` instead.
*/
filters?: $Scalars.JSONObject<_$Context>,
/**
* The filter applied to issues in the custom view.
*/
filterData?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueFilter<_$Context> | null | undefined>,
/**
* The project filter applied to issues in the custom view.
*/
projectFilterData?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectFilter<_$Context> | null | undefined>,
/**
* [ALPHA] The initiative filter applied to issues in the custom view.
*/
initiativeFilterData?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeFilter<_$Context> | null | undefined>,
/**
* The feed item filter applied to issues in the custom view.
*/
feedItemFilterData?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FeedItemFilter<_$Context> | null | undefined>,
/**
* Whether the custom view is shared with everyone in the organization.
*/
shared?: $Scalars.Boolean<_$Context>
}