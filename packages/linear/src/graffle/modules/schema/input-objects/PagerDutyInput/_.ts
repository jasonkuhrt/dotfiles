import type * as $Fields from './fields.js'

export * as PagerDutyInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface PagerDutyInput {
kind: "InputObject",
name: "PagerDutyInput",
isAllFieldsNullable: true,
fields: {
apiFailedWithUnauthorizedErrorAt: $Fields.apiFailedWithUnauthorizedErrorAt
},
type: {
apiFailedWithUnauthorizedErrorAt?: $Fields.apiFailedWithUnauthorizedErrorAt['type']
}
}