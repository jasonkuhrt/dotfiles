import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ActorBot"`
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
value: "ActorBot"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* The type of bot.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* The sub type of the bot.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.subType` |
* | **Nullability** | Optional |
*/
export interface subType {
kind: "OutputField",
name: "subType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* The display name of the bot.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* The display name of the external user on behalf of which the bot acted.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.userDisplayName` |
* | **Nullability** | Optional |
*/
export interface userDisplayName {
kind: "OutputField",
name: "userDisplayName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ActorBot}.
*
* A url pointing to the avatar representing this bot.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ActorBot} |
* | **Path** | `ActorBot.avatarUrl` |
* | **Nullability** | Optional |
*/
export interface avatarUrl {
kind: "OutputField",
name: "avatarUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
