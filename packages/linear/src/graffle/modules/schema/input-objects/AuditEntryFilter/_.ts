import type * as $Fields from './fields.js'

export * as AuditEntryFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Audit entry filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface AuditEntryFilter {
kind: "InputObject",
name: "AuditEntryFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
type: $Fields.type,
ip: $Fields.ip,
countryCode: $Fields.countryCode,
actor: $Fields.actor,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
type?: $Fields.type['type'],
ip?: $Fields.ip['type'],
countryCode?: $Fields.countryCode['type'],
actor?: $Fields.actor['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}