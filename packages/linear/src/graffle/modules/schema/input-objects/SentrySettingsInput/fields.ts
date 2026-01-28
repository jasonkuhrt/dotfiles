import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SentrySettingsInput}.
*
* The slug of the Sentry organization being connected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SentrySettingsInput} |
* | **Path** | `SentrySettingsInput.organizationSlug` |
* | **Nullability** | Required |
*/
export interface organizationSlug {
kind: "InputField",
name: "organizationSlug",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SentrySettingsInput}.
*
* The ID of the Sentry organization being connected.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SentrySettingsInput} |
* | **Path** | `SentrySettingsInput.organizationId` |
* | **Nullability** | Required |
*/
export interface organizationId {
kind: "InputField",
name: "organizationId",
inlineType: [1, ],
namedType: $Schema.ID,
type: $Schema.ID['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SentrySettingsInput}.
*
* Whether Sentry issues resolving completes Linear issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SentrySettingsInput} |
* | **Path** | `SentrySettingsInput.resolvingCompletesIssues` |
* | **Nullability** | Required |
*/
export interface resolvingCompletesIssues {
kind: "InputField",
name: "resolvingCompletesIssues",
inlineType: [1, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SentrySettingsInput}.
*
* Whether Sentry issues unresolving reopens Linear issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SentrySettingsInput} |
* | **Path** | `SentrySettingsInput.unresolvingReopensIssues` |
* | **Nullability** | Required |
*/
export interface unresolvingReopensIssues {
kind: "InputField",
name: "unresolvingReopensIssues",
inlineType: [1, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded']
}