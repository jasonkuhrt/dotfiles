import type * as $Fields from './fields.js'

export * as SentrySettingsInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | No |
*/
export interface SentrySettingsInput {
kind: "InputObject",
name: "SentrySettingsInput",
isAllFieldsNullable: false,
fields: {
organizationSlug: $Fields.organizationSlug,
organizationId: $Fields.organizationId,
resolvingCompletesIssues: $Fields.resolvingCompletesIssues,
unresolvingReopensIssues: $Fields.unresolvingReopensIssues
},
type: {
organizationSlug: $Fields.organizationSlug['type'],
organizationId: $Fields.organizationId['type'],
resolvingCompletesIssues: $Fields.resolvingCompletesIssues['type'],
unresolvingReopensIssues: $Fields.unresolvingReopensIssues['type']
}
}