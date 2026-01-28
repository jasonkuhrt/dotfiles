import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseUpdateInput from './fields.js'

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
export interface ReleaseUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the release.
*/
name?: $Scalars.String<_$Context>,
/**
* The description of the release.
*/
description?: $Scalars.String<_$Context>,
/**
* The version of the release.
*/
version?: $Scalars.String<_$Context>,
/**
* The commit SHA associated with this release.
*/
commitSha?: $Scalars.String<_$Context>,
/**
* The identifier of the pipeline this release belongs to.
*/
pipelineId?: $Scalars.String<_$Context>,
/**
* The current stage of the release.
*/
stageId?: $Scalars.String<_$Context>,
/**
* The estimated start date of the release.
*/
startDate?: $Scalars.TimelessDate<_$Context>,
/**
* The estimated completion date of the release.
*/
targetDate?: $Scalars.TimelessDate<_$Context>
}