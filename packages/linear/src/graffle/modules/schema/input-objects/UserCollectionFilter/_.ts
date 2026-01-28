import type * as $Fields from './fields.js'

export * as UserCollectionFilter from './fields.js'

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
* | **Fields** | 19 |
* | **All Fields Nullable** | Yes |
*/
export interface UserCollectionFilter {
kind: "InputObject",
name: "UserCollectionFilter",
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
and: $Fields.and,
or: $Fields.or,
some: $Fields.some,
every: $Fields.every,
length: $Fields.length
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
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type']
}
}