import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IssueToReleaseCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [ALPHA] The properties of the issueToRelease to create.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueToReleaseCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identifier of the issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the release
*/
releaseId: $Scalars.String$NonNull<_$Context>
}