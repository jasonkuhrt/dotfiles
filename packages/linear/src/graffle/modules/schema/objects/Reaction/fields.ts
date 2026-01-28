import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Reaction"`
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
value: "Reaction"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
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
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* Name of the reaction's emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.emoji` |
* | **Nullability** | Required |
*/
export interface emoji {
kind: "OutputField",
name: "emoji",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The issue that the reaction is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.issue` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The comment that the reaction is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.comment` |
* | **Nullability** | Optional |
*/
export interface comment {
kind: "OutputField",
name: "comment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The project update that the reaction is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.projectUpdate` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The initiative update that the reaction is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.initiativeUpdate` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The post that the reaction is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Post} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.post` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The user that created the reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.user` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Reaction}.
*
* The external user that created the reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Reaction} |
* | **Path** | `Reaction.externalUser` |
* | **Nullability** | Optional |
*/
export interface externalUser {
kind: "OutputField",
name: "externalUser",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ExternalUser
}
