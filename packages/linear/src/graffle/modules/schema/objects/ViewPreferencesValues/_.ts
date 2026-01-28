import type * as $Fields from './fields.js'

export * as ViewPreferencesValues from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 4 |
*/
export interface ViewPreferencesValues {
kind: "Object",
name: "ViewPreferencesValues",
fields: {
__typename: $Fields.__typename,
viewOrdering: $Fields.viewOrdering,
issueGrouping: $Fields.issueGrouping,
issueSubGrouping: $Fields.issueSubGrouping,
showCompletedIssues: $Fields.showCompletedIssues
}
}