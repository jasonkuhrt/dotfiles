import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AgentActivity"`
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
value: "AgentActivity"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
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
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The agent session this activity belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSession}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.agentSession` |
* | **Nullability** | Required |
*/
export interface agentSession {
kind: "OutputField",
name: "agentSession",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AgentSession
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The content of the activity
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityContent}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.content` |
* | **Nullability** | Required |
*/
export interface content {
kind: "OutputField",
name: "content",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AgentActivityContent
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The comment this activity is linked to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.sourceComment` |
* | **Nullability** | Optional |
*/
export interface sourceComment {
kind: "OutputField",
name: "sourceComment",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* The user who created this agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.user` |
* | **Nullability** | Required |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* Metadata about the external source that created this agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.sourceMetadata` |
* | **Nullability** | Optional |
*/
export interface sourceMetadata {
kind: "OutputField",
name: "sourceMetadata",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSON
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* An optional modifier that provides additional instructions on how the activity should be interpreted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivitySignal} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.signal` |
* | **Nullability** | Optional |
*/
export interface signal {
kind: "OutputField",
name: "signal",
arguments: {},
inlineType: [0, ],
namedType: $Schema.AgentActivitySignal
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* Metadata about this agent activity's signal.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.signalMetadata` |
* | **Nullability** | Optional |
*/
export interface signalMetadata {
kind: "OutputField",
name: "signalMetadata",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSON
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* Whether the activity is ephemeral, and should disappear after the next agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.ephemeral` |
* | **Nullability** | Required |
*/
export interface ephemeral {
kind: "OutputField",
name: "ephemeral",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AgentActivity}.
*
* [Internal] Metadata about user-provided contextual information for this agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentActivity} |
* | **Path** | `AgentActivity.contextualMetadata` |
* | **Nullability** | Optional |
*/
export interface contextualMetadata {
kind: "OutputField",
name: "contextualMetadata",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSON
}
