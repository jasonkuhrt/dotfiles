import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectMilestoneCreateInput from './fields.js'

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
export interface ProjectMilestoneCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the project milestone.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The description of the project milestone in markdown format.
*/
description?: $Scalars.String<_$Context>,
/**
* [Internal] The description of the project milestone as a Prosemirror document.
*/
descriptionData?: $Scalars.JSONObject<_$Context>,
/**
* The planned target date of the project milestone.
*/
targetDate?: $Scalars.TimelessDate<_$Context>,
/**
* Related project for the project milestone.
*/
projectId: $Scalars.String$NonNull<_$Context>,
/**
* The sort order for the project milestone within a project.
*/
sortOrder?: $Scalars.Float<_$Context>
}