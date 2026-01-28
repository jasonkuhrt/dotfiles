import type * as $Fields from './fields.js'

export * as IssueTitleSuggestionFromCustomerRequestPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface IssueTitleSuggestionFromCustomerRequestPayload {
kind: "Object",
name: "IssueTitleSuggestionFromCustomerRequestPayload",
fields: {
__typename: $Fields.__typename,
lastSyncId: $Fields.lastSyncId,
title: $Fields.title,
logId: $Fields.logId
}
}