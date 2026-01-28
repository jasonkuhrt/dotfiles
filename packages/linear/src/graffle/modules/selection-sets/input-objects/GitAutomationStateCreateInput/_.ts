import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitAutomationStateCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface GitAutomationStateCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The team associated with the automation state.
*/
teamId: $Scalars.String$NonNull<_$Context>,
/**
* The associated workflow state. If null, will override default behaviour and take no action.
*/
stateId?: $Scalars.String<_$Context>,
/**
* [DEPRECATED] The target branch pattern. If null, all branches are targeted.
*
* @deprecated Use targetBranchId instead.
*/
branchPattern?: $Scalars.String<_$Context>,
/**
* The associated target branch. If null, all branches are targeted.
*/
targetBranchId?: $Scalars.String<_$Context>,
/**
* The event that triggers the automation.
*/
$event: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationStates>
}