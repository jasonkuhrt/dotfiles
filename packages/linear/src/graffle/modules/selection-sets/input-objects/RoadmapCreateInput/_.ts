import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as RoadmapCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface RoadmapCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the roadmap.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The description of the roadmap.
*/
description?: $Scalars.String<_$Context>,
/**
* The owner of the roadmap.
*/
ownerId?: $Scalars.String<_$Context>,
/**
* The sort order of the roadmap within the organization.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The roadmap's color.
*/
color?: $Scalars.String<_$Context>
}