import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GitAutomationStateUpdateInput from './fields.js'

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
export interface GitAutomationStateUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The associated workflow state.
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
$event?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GitAutomationStates | null | undefined>
}