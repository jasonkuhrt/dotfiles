import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as EmailIntakeAddressUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface EmailIntakeAddressUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether the email address is currently enabled. If set to false, the email address will be disabled and no longer accept incoming emails.
*/
enabled?: $Scalars.Boolean<_$Context>,
/**
* The email address used to forward emails to the intake address.
*/
forwardingEmailAddress?: $Scalars.String<_$Context>,
/**
* The name to be used for outgoing emails.
*/
senderName?: $Scalars.String<_$Context>,
/**
* The identifier or key of the team this email address will intake issues for.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The identifier of the template this email address will intake issues for.
*/
templateId?: $Scalars.String<_$Context>,
/**
* Whether email replies are enabled.
*/
repliesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether the commenter's name is included in the email replies.
*/
useUserNamesInReplies?: $Scalars.Boolean<_$Context>,
/**
* Whether the issue created auto-reply is enabled.
*/
issueCreatedAutoReplyEnabled?: $Scalars.Boolean<_$Context>,
/**
* The auto-reply message for issue created.
*/
issueCreatedAutoReply?: $Scalars.String<_$Context>,
/**
* Whether the issue completed auto-reply is enabled.
*/
issueCompletedAutoReplyEnabled?: $Scalars.Boolean<_$Context>,
/**
* Custom auto-reply message for issue completed.
*/
issueCompletedAutoReply?: $Scalars.String<_$Context>,
/**
* Whether the issue canceled auto-reply is enabled.
*/
issueCanceledAutoReplyEnabled?: $Scalars.Boolean<_$Context>,
/**
* Custom auto-reply message for issue canceled.
*/
issueCanceledAutoReply?: $Scalars.String<_$Context>,
/**
* Whether customer requests are enabled.
*/
customerRequestsEnabled?: $Scalars.Boolean<_$Context>
}