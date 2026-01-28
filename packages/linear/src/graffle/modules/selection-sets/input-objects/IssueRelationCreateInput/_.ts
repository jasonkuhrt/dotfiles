import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as IssueRelationCreateInput from './fields.js'

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
export interface IssueRelationCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The type of relation of the issue to the related issue.
*/
$type: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueRelationType>,
/**
* The identifier of the issue that is related to another issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the related issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
relatedIssueId: $Scalars.String$NonNull<_$Context>
}