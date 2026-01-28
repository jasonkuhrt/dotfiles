import type * as $Fields from './fields.js'

export * as EmailIntakeAddress from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An email address that can be used for submitting issues.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 23 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface EmailIntakeAddress {
kind: "Object",
name: "EmailIntakeAddress",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
address: $Fields.address,
type: $Fields.type,
forwardingEmailAddress: $Fields.forwardingEmailAddress,
senderName: $Fields.senderName,
enabled: $Fields.enabled,
repliesEnabled: $Fields.repliesEnabled,
useUserNamesInReplies: $Fields.useUserNamesInReplies,
template: $Fields.template,
team: $Fields.team,
organization: $Fields.organization,
sesDomainIdentity: $Fields.sesDomainIdentity,
creator: $Fields.creator,
customerRequestsEnabled: $Fields.customerRequestsEnabled,
issueCreatedAutoReply: $Fields.issueCreatedAutoReply,
issueCreatedAutoReplyEnabled: $Fields.issueCreatedAutoReplyEnabled,
issueCompletedAutoReplyEnabled: $Fields.issueCompletedAutoReplyEnabled,
issueCompletedAutoReply: $Fields.issueCompletedAutoReply,
issueCanceledAutoReplyEnabled: $Fields.issueCanceledAutoReplyEnabled,
issueCanceledAutoReply: $Fields.issueCanceledAutoReply
}
}