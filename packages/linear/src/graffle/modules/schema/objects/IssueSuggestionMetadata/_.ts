import type * as $Fields from './fields.js'

export * as IssueSuggestionMetadata from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 7 |
*/
export interface IssueSuggestionMetadata {
kind: "Object",
name: "IssueSuggestionMetadata",
fields: {
__typename: $Fields.__typename,
score: $Fields.score,
classification: $Fields.classification,
reasons: $Fields.reasons,
evalLogId: $Fields.evalLogId,
rank: $Fields.rank,
variant: $Fields.variant,
appliedAutomationRuleId: $Fields.appliedAutomationRuleId
}
}