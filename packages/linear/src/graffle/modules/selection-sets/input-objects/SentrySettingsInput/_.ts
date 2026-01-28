import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SentrySettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | No |
*/
export interface SentrySettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The slug of the Sentry organization being connected.
*/
organizationSlug: $Scalars.String$NonNull<_$Context>,
/**
* The ID of the Sentry organization being connected.
*/
organizationId: $Scalars.ID$NonNull<_$Context>,
/**
* Whether Sentry issues resolving completes Linear issues.
*/
resolvingCompletesIssues: $Scalars.Boolean$NonNull<_$Context>,
/**
* Whether Sentry issues unresolving reopens Linear issues.
*/
unresolvingReopensIssues: $Scalars.Boolean$NonNull<_$Context>
}