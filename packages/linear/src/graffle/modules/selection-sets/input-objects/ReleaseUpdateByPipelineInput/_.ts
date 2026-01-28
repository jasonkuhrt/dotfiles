import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseUpdateByPipelineInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for updating a release by pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseUpdateByPipelineInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier of the pipeline.
*/
pipelineId: $Scalars.String$NonNull<_$Context>,
/**
* The version of the release to update. If not provided, the latest started release will be updated.
*/
version?: $Scalars.String<_$Context>,
/**
* The stage name to set. First tries exact match, then falls back to case-insensitive matching with dashes/underscores treated as spaces.
*/
stage?: $Scalars.String<_$Context>
}