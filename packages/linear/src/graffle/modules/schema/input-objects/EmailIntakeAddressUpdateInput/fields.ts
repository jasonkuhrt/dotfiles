import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether the email address is currently enabled. If set to false, the email address will be disabled and no longer accept incoming emails.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.enabled` |
* | **Nullability** | Optional |
*/
export interface enabled {
kind: "InputField",
name: "enabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* The email address used to forward emails to the intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.forwardingEmailAddress` |
* | **Nullability** | Optional |
*/
export interface forwardingEmailAddress {
kind: "InputField",
name: "forwardingEmailAddress",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* The name to be used for outgoing emails.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.senderName` |
* | **Nullability** | Optional |
*/
export interface senderName {
kind: "InputField",
name: "senderName",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* The identifier or key of the team this email address will intake issues for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.teamId` |
* | **Nullability** | Optional |
*/
export interface teamId {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* The identifier of the template this email address will intake issues for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.templateId` |
* | **Nullability** | Optional |
*/
export interface templateId {
kind: "InputField",
name: "templateId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether email replies are enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.repliesEnabled` |
* | **Nullability** | Optional |
*/
export interface repliesEnabled {
kind: "InputField",
name: "repliesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether the commenter's name is included in the email replies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.useUserNamesInReplies` |
* | **Nullability** | Optional |
*/
export interface useUserNamesInReplies {
kind: "InputField",
name: "useUserNamesInReplies",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether the issue created auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCreatedAutoReplyEnabled` |
* | **Nullability** | Optional |
*/
export interface issueCreatedAutoReplyEnabled {
kind: "InputField",
name: "issueCreatedAutoReplyEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* The auto-reply message for issue created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCreatedAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCreatedAutoReply {
kind: "InputField",
name: "issueCreatedAutoReply",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether the issue completed auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCompletedAutoReplyEnabled` |
* | **Nullability** | Optional |
*/
export interface issueCompletedAutoReplyEnabled {
kind: "InputField",
name: "issueCompletedAutoReplyEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Custom auto-reply message for issue completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCompletedAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCompletedAutoReply {
kind: "InputField",
name: "issueCompletedAutoReply",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether the issue canceled auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCanceledAutoReplyEnabled` |
* | **Nullability** | Optional |
*/
export interface issueCanceledAutoReplyEnabled {
kind: "InputField",
name: "issueCanceledAutoReplyEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Custom auto-reply message for issue canceled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.issueCanceledAutoReply` |
* | **Nullability** | Optional |
*/
export interface issueCanceledAutoReply {
kind: "InputField",
name: "issueCanceledAutoReply",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressUpdateInput}.
*
* Whether customer requests are enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressUpdateInput} |
* | **Path** | `EmailIntakeAddressUpdateInput.customerRequestsEnabled` |
* | **Nullability** | Optional |
*/
export interface customerRequestsEnabled {
kind: "InputField",
name: "customerRequestsEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}