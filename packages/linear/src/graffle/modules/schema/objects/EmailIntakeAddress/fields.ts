import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"EmailIntakeAddress"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "EmailIntakeAddress"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Unique email address user name (before @) used for incoming email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.address` |
* | **Nullability** | Required |
*/
export interface address {
kind: "OutputField",
name: "address",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The type of the email address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddressType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The email address used to forward emails to the intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.forwardingEmailAddress` |
* | **Nullability** | Optional |
*/
export interface forwardingEmailAddress {
kind: "OutputField",
name: "forwardingEmailAddress",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The name to be used for outgoing emails.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.senderName` |
* | **Nullability** | Optional |
*/
export interface senderName {
kind: "OutputField",
name: "senderName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether the email address is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.enabled` |
* | **Nullability** | Required |
*/
export interface enabled {
kind: "OutputField",
name: "enabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether email replies are enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.repliesEnabled` |
* | **Nullability** | Required |
*/
export interface repliesEnabled {
kind: "OutputField",
name: "repliesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether the commenter's name is included in the email replies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.useUserNamesInReplies` |
* | **Nullability** | Required |
*/
export interface useUserNamesInReplies {
kind: "OutputField",
name: "useUserNamesInReplies",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The template that the email address is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.template` |
* | **Nullability** | Optional |
*/
export interface template {
kind: "OutputField",
name: "template",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The team that the email address is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The organization that the email address is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.organization` |
* | **Nullability** | Required |
*/
export interface organization {
kind: "OutputField",
name: "organization",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Organization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The SES domain identity that the email address is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SesDomainIdentity} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.sesDomainIdentity` |
* | **Nullability** | Optional |
*/
export interface sesDomainIdentity {
kind: "OutputField",
name: "sesDomainIdentity",
arguments: {},
inlineType: [0, ],
namedType: $Schema.SesDomainIdentity
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The user who created the email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether issues created from that email address will be turned into customer requests.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.customerRequestsEnabled` |
* | **Nullability** | Required |
*/
export interface customerRequestsEnabled {
kind: "OutputField",
name: "customerRequestsEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The auto-reply message for issue created. If not set, the default reply will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCreatedAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCreatedAutoReply {
kind: "OutputField",
name: "issueCreatedAutoReply",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether the auto-reply for issue created is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCreatedAutoReplyEnabled` |
* | **Nullability** | Required |
*/
export interface issueCreatedAutoReplyEnabled {
kind: "OutputField",
name: "issueCreatedAutoReplyEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether the auto-reply for issue completed is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCompletedAutoReplyEnabled` |
* | **Nullability** | Required |
*/
export interface issueCompletedAutoReplyEnabled {
kind: "OutputField",
name: "issueCompletedAutoReplyEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The auto-reply message for issue completed. If not set, the default reply will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCompletedAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCompletedAutoReply {
kind: "OutputField",
name: "issueCompletedAutoReply",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* Whether the auto-reply for issue canceled is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCanceledAutoReplyEnabled` |
* | **Nullability** | Required |
*/
export interface issueCanceledAutoReplyEnabled {
kind: "OutputField",
name: "issueCanceledAutoReplyEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.EmailIntakeAddress}.
*
* The auto-reply message for issue canceled. If not set, the default reply will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddress} |
* | **Path** | `EmailIntakeAddress.issueCanceledAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCanceledAutoReply {
kind: "OutputField",
name: "issueCanceledAutoReply",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
