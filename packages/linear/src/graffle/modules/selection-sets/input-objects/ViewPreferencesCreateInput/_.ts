import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ViewPreferencesCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface ViewPreferencesCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The type of view preferences (either user or organization level preferences).
*/
$type: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ViewPreferencesType>,
/**
* The view type of the view preferences are associated with.
*/
$viewType: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ViewType>,
/**
* View preferences object.
*/
preferences: $Scalars.JSONObject$NonNull<_$Context>,
/**
* The default parameters for the insight on that view.
*/
insights?: $Scalars.JSONObject<_$Context>,
/**
* The team these view preferences are associated with.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The project these view preferences are associated with.
*/
projectId?: $Scalars.String<_$Context>,
/**
* [Internal] The initiative these view preferences are associated with.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The label these view preferences are associated with.
*/
labelId?: $Scalars.String<_$Context>,
/**
* The project label these view preferences are associated with.
*/
projectLabelId?: $Scalars.String<_$Context>,
/**
* The cycle these view preferences are associated with.
*
* @deprecated Not used
*/
cycleId?: $Scalars.String<_$Context>,
/**
* The custom view these view preferences are associated with.
*/
customViewId?: $Scalars.String<_$Context>,
/**
* The user profile these view preferences are associated with.
*/
userId?: $Scalars.String<_$Context>
}