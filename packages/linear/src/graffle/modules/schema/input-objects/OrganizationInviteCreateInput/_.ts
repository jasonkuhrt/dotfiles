import type * as $Fields from './fields.js'

export * as OrganizationInviteCreateInput from './fields.js'

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
export interface OrganizationInviteCreateInput {
kind: "InputObject",
name: "OrganizationInviteCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
email: $Fields.email,
role: $Fields.role,
teamIds: $Fields.teamIds,
metadata: $Fields.metadata
},
type: {
id?: $Fields.id['type'],
email: $Fields.email['type'],
role?: $Fields.role['type'],
teamIds?: $Fields.teamIds['type'],
metadata?: $Fields.metadata['type']
}
}