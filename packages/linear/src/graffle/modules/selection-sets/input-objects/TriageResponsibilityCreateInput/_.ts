import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TriageResponsibilityCreateInput from './fields.js'

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
export interface TriageResponsibilityCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identifier of the team associated with the triage responsibility.
*/
teamId: $Scalars.String$NonNull<_$Context>,
/**
* The action to take when an issue is added to triage.
*/
action: $Scalars.String$NonNull<_$Context>,
/**
* The manual selection of users responsible for triage.
*/
manualSelection?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TriageResponsibilityManualSelectionInput<_$Context> | null | undefined>,
/**
* The identifier of the time schedule used for scheduling triage responsibility
*/
timeScheduleId?: $Scalars.String<_$Context>
}