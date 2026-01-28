import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"SlackAsksTeamSettings"`
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
value: "SlackAsksTeamSettings"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackAsksTeamSettings}.
*
* The Linear team ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksTeamSettings} |
* | **Path** | `SlackAsksTeamSettings.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.SlackAsksTeamSettings}.
*
* Whether the default Asks template is enabled in the given channel for this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksTeamSettings} |
* | **Path** | `SlackAsksTeamSettings.hasDefaultAsk` |
* | **Nullability** | Required |
*/
export interface hasDefaultAsk {
kind: "OutputField",
name: "hasDefaultAsk",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
