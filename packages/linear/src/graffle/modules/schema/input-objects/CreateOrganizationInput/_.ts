import type * as $Fields from './fields.js'

export * as CreateOrganizationInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface CreateOrganizationInput {
kind: "InputObject",
name: "CreateOrganizationInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
urlKey: $Fields.urlKey,
domainAccess: $Fields.domainAccess,
timezone: $Fields.timezone,
utm: $Fields.utm
},
type: {
name: $Fields.name['type'],
urlKey: $Fields.urlKey['type'],
domainAccess?: $Fields.domainAccess['type'],
timezone?: $Fields.timezone['type'],
utm?: $Fields.utm['type']
}
}