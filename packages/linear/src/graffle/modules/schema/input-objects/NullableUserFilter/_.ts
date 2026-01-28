import type * as $Fields from './fields.js'

export * as NullableUserFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* User filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 17 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableUserFilter {
kind: "InputObject",
name: "NullableUserFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
displayName: $Fields.displayName,
email: $Fields.email,
active: $Fields.active,
assignedIssues: $Fields.assignedIssues,
admin: $Fields.admin,
owner: $Fields.owner,
invited: $Fields.invited,
isInvited: $Fields.isInvited,
app: $Fields.app,
isMe: $Fields.isMe,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
displayName?: $Fields.displayName['type'],
email?: $Fields.email['type'],
active?: $Fields.active['type'],
assignedIssues?: $Fields.assignedIssues['type'],
admin?: $Fields.admin['type'],
owner?: $Fields.owner['type'],
invited?: $Fields.invited['type'],
isInvited?: $Fields.isInvited['type'],
app?: $Fields.app['type'],
isMe?: $Fields.isMe['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}