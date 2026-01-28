import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GitHubPersonalSettingsInput}.
*
* The GitHub user's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GitHubPersonalSettingsInput} |
* | **Path** | `GitHubPersonalSettingsInput.login` |
* | **Nullability** | Required |
*/
export interface login {
kind: "InputField",
name: "login",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}