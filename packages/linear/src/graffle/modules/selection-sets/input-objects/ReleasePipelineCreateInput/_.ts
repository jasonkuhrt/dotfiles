import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleasePipelineCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleasePipelineCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the pipeline.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The pipeline's unique slug identifier. If not provided, it will be auto-generated.
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