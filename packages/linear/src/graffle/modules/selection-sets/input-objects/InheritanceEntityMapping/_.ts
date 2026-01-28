import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as InheritanceEntityMapping from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface InheritanceEntityMapping<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Mapping of the WorkflowState ID to the new WorkflowState ID.
*/
workflowStates: $Scalars.JSONObject$NonNull<_$Context>,
/**
* Mapping of the IssueLabel ID to the new IssueLabel name.
*/
issueLabels?: $Scalars.JSONObject<_$Context>
}