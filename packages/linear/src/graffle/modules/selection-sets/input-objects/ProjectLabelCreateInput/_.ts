import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectLabelCreateInput from './fields.js'

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
export interface ProjectLabelCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the label.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The description of the label.
*/
description?: $Scalars.String<_$Context>,
/**
* The color of the label.
*/
color?: $Scalars.String<_$Context>,
/**
* The identifier of the parent label.
*/
parentId?: $Scalars.String<_$Context>,
/**
* Whether the label is a group.
*/
isGroup?: $Scalars.Boolean<_$Context>,
/**
* When the label was retired.
*/
retiredAt?: $Scalars.DateTime<_$Context>
}