import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* The comment content.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.body` |
* | **Nullability** | Optional |
*/
export interface body {
kind: "InputField",
name: "body",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* [Internal] The comment content as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.bodyData` |
* | **Nullability** | Optional |
*/
export interface bodyData {
kind: "InputField",
name: "bodyData",
inlineType: [0, ],
namedType: $Schema.JSON,
type: $Schema.JSON['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* [INTERNAL] The user who resolved this thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.resolvingUserId` |
* | **Nullability** | Optional |
*/
export interface resolvingUserId {
kind: "InputField",
name: "resolvingUserId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* [INTERNAL] The child comment that resolves this thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.resolvingCommentId` |
* | **Nullability** | Optional |
*/
export interface resolvingCommentId {
kind: "InputField",
name: "resolvingCommentId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* The text that this comment references. Only defined for inline comments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.quotedText` |
* | **Nullability** | Optional |
*/
export interface quotedText {
kind: "InputField",
name: "quotedText",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* [INTERNAL] The identifiers of the users subscribing to this comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.subscriberIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface subscriberIds {
kind: "InputField",
name: "subscriberIds",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CommentUpdateInput}.
*
* [INTERNAL] Flag to prevent auto subscription to the issue the comment is updated on.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CommentUpdateInput} |
* | **Path** | `CommentUpdateInput.doNotSubscribeToIssue` |
* | **Nullability** | Optional |
*/
export interface doNotSubscribeToIssue {
kind: "InputField",
name: "doNotSubscribeToIssue",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}