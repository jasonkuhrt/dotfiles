import type * as $Fields from './fields.js'

export * as ReleaseStageFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [ALPHA] Release stage filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseStageFilter {
kind: "InputObject",
name: "ReleaseStageFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
type: $Fields.type,
name: $Fields.name,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
type?: $Fields.type['type'],
name?: $Fields.name['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}