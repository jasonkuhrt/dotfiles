import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as FrontSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface FrontSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether an internal message should be added when a Linear issue changes status (for status types except completed or canceled).
*/
sendNoteOnStatusChange?: $Scalars.Boolean<_$Context>,
/**
* Whether an internal message should be added when someone comments on an issue.
*/
sendNoteOnComment?: $Scalars.Boolean<_$Context>,
/**
* Whether a ticket should be automatically reopened when its linked Linear issue is completed.
*/
automateTicketReopeningOnCompletion?: $Scalars.Boolean<_$Context>,
/**
* Whether a ticket should be automatically reopened when its linked Linear issue is cancelled.
*/
automateTicketReopeningOnCancellation?: $Scalars.Boolean<_$Context>,
/**
* Whether a ticket should be automatically reopened when a comment is posted on its linked Linear issue
*/
automateTicketReopeningOnComment?: $Scalars.Boolean<_$Context>,
/**
* [ALPHA] Whether customer and customer requests should not be automatically created when conversations are linked to a Linear issue.
*/
disableCustomerRequestsAutoCreation?: $Scalars.Boolean<_$Context>,
/**
* Whether a ticket should be automatically reopened when its linked Linear project is completed.
*/
automateTicketReopeningOnProjectCompletion?: $Scalars.Boolean<_$Context>,
/**
* Whether a ticket should be automatically reopened when its linked Linear project is cancelled.
*/
automateTicketReopeningOnProjectCancellation?: $Scalars.Boolean<_$Context>,
/**
* Whether Linear Agent should be enabled for this integration.
*/
enableAiIntake?: $Scalars.Boolean<_$Context>
}