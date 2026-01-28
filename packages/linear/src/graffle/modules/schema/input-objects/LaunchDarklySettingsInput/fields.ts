import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.LaunchDarklySettingsInput}.
*
* The project key of the LaunchDarkly integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.LaunchDarklySettingsInput} |
* | **Path** | `LaunchDarklySettingsInput.projectKey` |
* | **Nullability** | Required |
*/
export interface projectKey {
kind: "InputField",
name: "projectKey",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.LaunchDarklySettingsInput}.
*
* The environment of the LaunchDarkly integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.LaunchDarklySettingsInput} |
* | **Path** | `LaunchDarklySettingsInput.environment` |
* | **Nullability** | Required |
*/
export interface environment {
kind: "InputField",
name: "environment",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}