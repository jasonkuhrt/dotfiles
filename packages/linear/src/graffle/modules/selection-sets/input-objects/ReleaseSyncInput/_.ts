import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ReleaseSyncInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The release data to sync.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 12 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseSyncInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* The current stage of the release. Defaults to the first 'completed' stage.
*/
stageId?: $Scalars.String<_$Context>,
/**
* Issue identifiers (e.g. ENG-123) to associate with this release.
*/
issueIdentifiers?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Pull request references to look up. Issues linked to found PRs will be associated with this release.
*/
pullRequestReferences?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.PullRequestReferenceInput<_$Context> | null | undefined>> | null | undefined>,
/**
* Debug information for release creation diagnostics.
*/
debugSink?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ReleaseDebugSinkInput<_$Context> | null | undefined>,
/**
* The estimated start date of the release.
*/
startDate?: $Scalars.TimelessDate<_$Context>,
/**
* The estimated completion date of the release.
*/
targetDate?: $Scalars.TimelessDate<_$Context>
}