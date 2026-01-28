import type * as $Fields from './fields.js'

export * as IssuePriorityValue from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 2 |
*/
export interface IssuePriorityValue {
kind: "Object",
name: "IssuePriorityValue",
fields: {
__typename: $Fields.__typename,
priority: $Fields.priority,
label: $Fields.label
}
}