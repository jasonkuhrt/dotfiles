import type * as $Fields from './fields.js'

export * as SlackAsksTeamSettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface SlackAsksTeamSettingsInput {
kind: "InputObject",
name: "SlackAsksTeamSettingsInput",
isAllFieldsNullable: false,
fields: {
id: $Fields.id,
hasDefaultAsk: $Fields.hasDefaultAsk
},
type: {
id: $Fields.id['type'],
hasDefaultAsk: $Fields.hasDefaultAsk['type']
}
}