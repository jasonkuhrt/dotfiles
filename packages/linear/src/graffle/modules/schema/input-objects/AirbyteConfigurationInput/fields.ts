import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AirbyteConfigurationInput}.
*
* Linear export API key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AirbyteConfigurationInput} |
* | **Path** | `AirbyteConfigurationInput.apiKey` |
* | **Nullability** | Required |
*/
export interface apiKey {
kind: "InputField",
name: "apiKey",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}