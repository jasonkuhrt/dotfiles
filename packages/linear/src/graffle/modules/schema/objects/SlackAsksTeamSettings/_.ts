import type * as $Fields from './fields.js'

export * as SlackAsksTeamSettings from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Tuple for mapping Slack channel IDs to names.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface SlackAsksTeamSettings {
kind: "Object",
name: "SlackAsksTeamSettings",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
hasDefaultAsk: $Fields.hasDefaultAsk
}
}