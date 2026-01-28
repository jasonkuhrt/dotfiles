import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The type of the email address. If not provided, the backend will default to team or template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.type` |
* | **Nullability** | Optional |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [0, ],
namedType: $Schema.EmailIntakeAddressType,
type: $Schema.EmailIntakeAddressType['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The email address used to forward emails to the intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.forwardingEmailAddress` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The name to be used for outgoing emails.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.senderName` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The identifier or key of the team this email address will intake issues for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.teamId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The identifier of the template this email address will intake issues for.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.templateId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether email replies are enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.repliesEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether the commenter's name is included in the email replies.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.useUserNamesInReplies` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether the issue created auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCreatedAutoReplyEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The auto-reply message for issue created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCreatedAutoReply` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether the issue completed auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCompletedAutoReplyEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The auto-reply message for issue completed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCompletedAutoReply` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether the issue canceled auto-reply is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCanceledAutoReplyEnabled` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* The auto-reply message for issue canceled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.issueCanceledAutoReply` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.EmailIntakeAddressCreateInput}.
*
* Whether customer requests are enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.EmailIntakeAddressCreateInput} |
* | **Path** | `EmailIntakeAddressCreateInput.customerRequestsEnabled` |
* | **Nullability** | Optional |
*/
export interface customerRequestsEnabled {
kind: "InputField",
name: "customerRequestsEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}