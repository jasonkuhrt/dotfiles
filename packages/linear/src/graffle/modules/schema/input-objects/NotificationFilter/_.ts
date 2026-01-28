import type * as $Fields from './fields.js'

export * as NotificationFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Notification filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface NotificationFilter {
kind: "InputObject",
name: "NotificationFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
type: $Fields.type,
archivedAt: $Fields.archivedAt,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
type?: $Fields.type['type'],
archivedAt?: $Fields.archivedAt['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}