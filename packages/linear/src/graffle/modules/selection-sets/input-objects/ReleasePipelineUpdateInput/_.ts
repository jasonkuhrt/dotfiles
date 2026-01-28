import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleasePipelineUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleasePipelineUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the pipeline.
*/
name?: $Scalars.String<_$Context>,
/**
* The pipeline's unique slug identifier.
*/
slugId?: $Scalars.String<_$Context>,
/**
* The type of the pipeline.
*/
$type?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleasePipelineType | null | undefined>,
/**
* Glob patterns to include commits affecting matching file paths.
*/
includePathPatterns?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}