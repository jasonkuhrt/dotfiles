import type * as $Fields from './fields.js'

export * as User from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A user that has access to the the resources of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 42 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface User {
kind: "Object",
name: "User",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
displayName: $Fields.displayName,
email: $Fields.email,
avatarUrl: $Fields.avatarUrl,
disableReason: $Fields.disableReason,
calendarHash: $Fields.calendarHash,
description: $Fields.description,
statusEmoji: $Fields.statusEmoji,
statusLabel: $Fields.statusLabel,
statusUntilAt: $Fields.statusUntilAt,
timezone: $Fields.timezone,
organization: $Fields.organization,
lastSeen: $Fields.lastSeen,
identityProvider: $Fields.identityProvider,
initials: $Fields.initials,
avatarBackgroundColor: $Fields.avatarBackgroundColor,
guest: $Fields.guest,
app: $Fields.app,
isMentionable: $Fields.isMentionable,
isAssignable: $Fields.isAssignable,
active: $Fields.active,
issueDrafts: $Fields.issueDrafts,
drafts: $Fields.drafts,
url: $Fields.url,
assignedIssues: $Fields.assignedIssues,
delegatedIssues: $Fields.delegatedIssues,
createdIssues: $Fields.createdIssues,
createdIssueCount: $Fields.createdIssueCount,
teams: $Fields.teams,
teamMemberships: $Fields.teamMemberships,
feedFacets: $Fields.feedFacets,
canAccessAnyPublicTeam: $Fields.canAccessAnyPublicTeam,
isMe: $Fields.isMe,
admin: $Fields.admin,
owner: $Fields.owner,
supportsAgentSessions: $Fields.supportsAgentSessions,
inviteHash: $Fields.inviteHash,
gitHubUserId: $Fields.gitHubUserId
}
}