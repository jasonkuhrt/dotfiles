import type * as $Fields from './fields.js'

export * as ViewPreferencesUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface ViewPreferencesUpdateInput {
kind: "InputObject",
name: "ViewPreferencesUpdateInput",
isAllFieldsNullable: true,
fields: {
preferences: $Fields.preferences,
insights: $Fields.insights
},
type: {
preferences?: $Fields.preferences['type'],
insights?: $Fields.insights['type']
}
}