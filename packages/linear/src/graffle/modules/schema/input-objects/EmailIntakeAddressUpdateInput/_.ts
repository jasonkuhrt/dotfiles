import type * as $Fields from './fields.js'

export * as EmailIntakeAddressUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface EmailIntakeAddressUpdateInput {
kind: "InputObject",
name: "EmailIntakeAddressUpdateInput",
isAllFieldsNullable: true,
fields: {
enabled: $Fields.enabled,
forwardingEmailAddress: $Fields.forwardingEmailAddress,
senderName: $Fields.senderName,
teamId: $Fields.teamId,
templateId: $Fields.templateId,
repliesEnabled: $Fields.repliesEnabled,
useUserNamesInReplies: $Fields.useUserNamesInReplies,
issueCreatedAutoReplyEnabled: $Fields.issueCreatedAutoReplyEnabled,
issueCreatedAutoReply: $Fields.issueCreatedAutoReply,
issueCompletedAutoReplyEnabled: $Fields.issueCompletedAutoReplyEnabled,
issueCompletedAutoReply: $Fields.issueCompletedAutoReply,
issueCanceledAutoReplyEnabled: $Fields.issueCanceledAutoReplyEnabled,
issueCanceledAutoReply: $Fields.issueCanceledAutoReply,
customerRequestsEnabled: $Fields.customerRequestsEnabled
},
type: {
enabled?: $Fields.enabled['type'],
forwardingEmailAddress?: $Fields.forwardingEmailAddress['type'],
senderName?: $Fields.senderName['type'],
teamId?: $Fields.teamId['type'],
templateId?: $Fields.templateId['type'],
repliesEnabled?: $Fields.repliesEnabled['type'],
useUserNamesInReplies?: $Fields.useUserNamesInReplies['type'],
issueCreatedAutoReplyEnabled?: $Fields.issueCreatedAutoReplyEnabled['type'],
issueCreatedAutoReply?: $Fields.issueCreatedAutoReply['type'],
issueCompletedAutoReplyEnabled?: $Fields.issueCompletedAutoReplyEnabled['type'],
issueCompletedAutoReply?: $Fields.issueCompletedAutoReply['type'],
issueCanceledAutoReplyEnabled?: $Fields.issueCanceledAutoReplyEnabled['type'],
issueCanceledAutoReply?: $Fields.issueCanceledAutoReply['type'],
customerRequestsEnabled?: $Fields.customerRequestsEnabled['type']
}
}