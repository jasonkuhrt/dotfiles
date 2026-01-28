import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Comment"`
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
value: "Comment"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
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
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The comment content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.body` |
* | **Nullability** | Required |
*/
export interface body {
kind: "OutputField",
name: "body",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The issue that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.issue` |
* | **Nullability** | Optional |
*/
export interface issue {
kind: "OutputField",
name: "issue",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the issue that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.issueId` |
* | **Nullability** | Optional |
*/
export interface issueId {
kind: "OutputField",
name: "issueId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The document content that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContent} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.documentContent` |
* | **Nullability** | Optional |
*/
export interface documentContent {
kind: "OutputField",
name: "documentContent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DocumentContent
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the document content that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.documentContentId` |
* | **Nullability** | Optional |
*/
export interface documentContentId {
kind: "OutputField",
name: "documentContentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The project update that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.projectUpdate` |
* | **Nullability** | Optional |
*/
export interface projectUpdate {
kind: "OutputField",
name: "projectUpdate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ProjectUpdate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the project update that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.projectUpdateId` |
* | **Nullability** | Optional |
*/
export interface projectUpdateId {
kind: "OutputField",
name: "projectUpdateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The initiative update that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.initiativeUpdate` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdate {
kind: "OutputField",
name: "initiativeUpdate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.InitiativeUpdate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the initiative update that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.initiativeUpdateId` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateId {
kind: "OutputField",
name: "initiativeUpdateId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The post that the comment is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Post} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.post` |
* | **Nullability** | Optional |
*/
export interface post {
kind: "OutputField",
name: "post",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Post
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The parent comment under which the current comment is nested.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the parent comment under which the current comment is nested.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.parentId` |
* | **Nullability** | Optional |
*/
export interface parentId {
kind: "OutputField",
name: "parentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The user that resolved the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.resolvingUser` |
* | **Nullability** | Optional |
*/
export interface resolvingUser {
kind: "OutputField",
name: "resolvingUser",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The time the resolvingUser resolved the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.resolvedAt` |
* | **Nullability** | Optional |
*/
export interface resolvedAt {
kind: "OutputField",
name: "resolvedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The comment that resolved the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.resolvingComment` |
* | **Nullability** | Optional |
*/
export interface resolvingComment {
kind: "OutputField",
name: "resolvingComment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The ID of the comment that resolved the thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.resolvingCommentId` |
* | **Nullability** | Optional |
*/
export interface resolvingCommentId {
kind: "OutputField",
name: "resolvingCommentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The user who wrote the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The external user who wrote the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.externalUser` |
* | **Nullability** | Optional |
*/
export interface externalUser {
kind: "OutputField",
name: "externalUser",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The time user edited the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.editedAt` |
* | **Nullability** | Optional |
*/
export interface editedAt {
kind: "OutputField",
name: "editedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* [Internal] The comment content as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.bodyData` |
* | **Nullability** | Required |
*/
export interface bodyData {
kind: "OutputField",
name: "bodyData",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The text that this comment references. Only defined for inline comments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.quotedText` |
* | **Nullability** | Optional |
*/
export interface quotedText {
kind: "OutputField",
name: "quotedText",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* Emoji reaction summary, grouped by emoji type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.reactionData` |
* | **Nullability** | Required |
*/
export interface reactionData {
kind: "OutputField",
name: "reactionData",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* [Internal] A generated summary of the comment thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.threadSummary` |
* | **Nullability** | Optional |
*/
export interface threadSummary {
kind: "OutputField",
name: "threadSummary",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* Comment's URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The children of the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.children` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface children {
kind: "OutputField",
name: "children",
arguments: {
/**
* Filter returned comments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CommentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CommentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* Agent session associated with this comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSession} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.agentSession` |
* | **Nullability** | Optional |
*/
export interface agentSession {
kind: "OutputField",
name: "agentSession",
arguments: {},
inlineType: [0, ],
namedType: $Schema.AgentSession
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* [Internal] Agent sessions associated with this comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.agentSessions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface agentSessions {
kind: "OutputField",
name: "agentSessions",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.AgentSessionConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* Issues created from this comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.createdIssues` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface createdIssues {
kind: "OutputField",
name: "createdIssues",
arguments: {
/**
* Filter returned issues.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The bot that created the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ActorBot} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.botActor` |
* | **Nullability** | Optional |
*/
export interface botActor {
kind: "OutputField",
name: "botActor",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ActorBot
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The external thread that the comment is synced with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SyncedExternalThread} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.externalThread` |
* | **Nullability** | Optional |
*/
export interface externalThread {
kind: "OutputField",
name: "externalThread",
arguments: {},
inlineType: [0, ],
namedType: $Schema.SyncedExternalThread
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* [Internal] Whether the comment should be hidden from Linear clients. This is typically used for bot comments that provide redundant information (e.g., Slack Asks confirmation messages).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.hideInLinear` |
* | **Nullability** | Required |
*/
export interface hideInLinear {
kind: "OutputField",
name: "hideInLinear",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* Reactions associated with the comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Reaction}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.reactions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface reactions {
kind: "OutputField",
name: "reactions",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Reaction
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Comment}.
*
* The external services the comment is synced with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntityInfo}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Comment} |
* | **Path** | `Comment.syncedWith` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface syncedWith {
kind: "OutputField",
name: "syncedWith",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.ExternalEntityInfo
}
