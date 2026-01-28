import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectRelationCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectRelationCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The type of relation of the project to the related project.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the project that is related to another project.
*/
projectId: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the project milestone.
*/
projectMilestoneId?: $Scalars.String<_$Context>,
/**
* The type of the anchor for the project.
*/
anchorType: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the related project.
*/
relatedProjectId: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the related project milestone.
*/
relatedProjectMilestoneId?: $Scalars.String<_$Context>,
/**
* The type of the anchor for the related project.
*/
relatedAnchorType: $Scalars.String$NonNull<_$Context>
}