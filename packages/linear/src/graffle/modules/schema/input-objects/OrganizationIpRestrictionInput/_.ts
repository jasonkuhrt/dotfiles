import type * as $Fields from './fields.js'

export * as OrganizationIpRestrictionInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [INTERNAL] Organization IP restriction configuration.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationIpRestrictionInput {
kind: "InputObject",
name: "OrganizationIpRestrictionInput",
isAllFieldsNullable: true,
fields: {
range: $Fields.range,
type: $Fields.type,
description: $Fields.description,
enabled: $Fields.enabled
},
type: {
range: $Fields.range['type'],
type: $Fields.type['type'],
description?: $Fields.description['type'],
enabled: $Fields.enabled['type']
}
}