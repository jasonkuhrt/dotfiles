import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IntegrationUpdateInput}.
*
* The settings to update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationSettingsInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.IntegrationUpdateInput} |
* | **Path** | `IntegrationUpdateInput.settings` |
* | **Nullability** | Optional |
*/
export interface settings {
kind: "InputField",
name: "settings",
inlineType: [0, ],
namedType: $Schema.IntegrationSettingsInput,
type: $Schema.IntegrationSettingsInput['type'] | null | undefined
}