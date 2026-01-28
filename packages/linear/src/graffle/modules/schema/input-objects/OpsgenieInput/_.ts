import type * as $Fields from './fields.js'

export * as OpsgenieInput from './fields.js'

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
export interface OpsgenieInput {
kind: "InputObject",
name: "OpsgenieInput",
isAllFieldsNullable: true,
fields: {
apiFailedWithUnauthorizedErrorAt: $Fields.apiFailedWithUnauthorizedErrorAt
},
type: {
apiFailedWithUnauthorizedErrorAt?: $Fields.apiFailedWithUnauthorizedErrorAt['type']
}
}