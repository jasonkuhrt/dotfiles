import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as InitiativeUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiative to update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the initiative.
*/
name?: $Scalars.String<_$Context>,
/**
* The description of the initiative.
*/
description?: $Scalars.String<_$Context>,
/**
* The owner of the initiative.
*/
ownerId?: $Scalars.String<_$Context>,
/**
* The sort order of the initiative within the organization.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The initiative's color.
*/
color?: $Scalars.String<_$Context>,
/**
* The initiative's icon.
*/
icon?: $Scalars.String<_$Context>,
/**
* The estimated completion date of the initiative.
*/
targetDate?: $Scalars.TimelessDate<_$Context>,
/**
* The initiative's status.
*/
$status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeStatus | null | undefined>,
/**
* The resolution of the initiative's estimated completion date.
*/
$targetDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* Whether the initiative has been trashed.
*/
trashed?: $Scalars.Boolean<_$Context>,
/**
* The initiative's content in markdown format.
*/
content?: $Scalars.String<_$Context>,
/**
* The n-weekly frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*/
updateReminderFrequencyInWeeks?: $Scalars.Float<_$Context>,
/**
* The frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*/
updateReminderFrequency?: $Scalars.Float<_$Context>,
/**
* The frequency resolution.
*/
$frequencyResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FrequencyResolutionType | null | undefined>,
/**
* The day at which to prompt for updates.
*/
$updateRemindersDay?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.Day | null | undefined>,
/**
* The hour at which to prompt for updates.
*/
updateRemindersHour?: $Scalars.Int<_$Context>
}