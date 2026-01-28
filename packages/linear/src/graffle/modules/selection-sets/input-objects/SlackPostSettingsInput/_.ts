import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as SlackPostSettingsInput from './fields.js'

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
export interface SlackPostSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
channel: $Scalars.String$NonNull<_$Context>,
channelId: $Scalars.String$NonNull<_$Context>,
configurationUrl: $Scalars.String$NonNull<_$Context>,
/**
* Slack workspace id
*/
teamId?: $Scalars.String<_$Context>,
$channelType?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackChannelType | null | undefined>
}