import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksTeamSettingsInput}.
*
* The Linear team ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksTeamSettingsInput} |
* | **Path** | `SlackAsksTeamSettingsInput.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SlackAsksTeamSettingsInput}.
*
* Whether the default Asks template is enabled in the given channel for this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SlackAsksTeamSettingsInput} |
* | **Path** | `SlackAsksTeamSettingsInput.hasDefaultAsk` |
* | **Nullability** | Required |
*/
export interface hasDefaultAsk {
kind: "InputField",
name: "hasDefaultAsk",
inlineType: [1, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded']
}