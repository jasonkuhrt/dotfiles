import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.JiraPersonalSettingsInput}.
*
* The name of the Jira site currently authorized through the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.JiraPersonalSettingsInput} |
* | **Path** | `JiraPersonalSettingsInput.siteName` |
* | **Nullability** | Optional |
*/
export interface siteName {
kind: "InputField",
name: "siteName",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}