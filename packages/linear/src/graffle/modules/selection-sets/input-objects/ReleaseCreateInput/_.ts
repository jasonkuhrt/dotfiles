import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The input for creating a release.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the release.
*/
name: $Scalars.String$NonNull<_$Context>,
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
pipelineId: $Scalars.String$NonNull<_$Context>,
/**
* The current stage of the release. Defaults to the first 'started' stage.
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