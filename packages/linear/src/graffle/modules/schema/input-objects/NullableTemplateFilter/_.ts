import type * as $Fields from './fields.js'

export * as NullableTemplateFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Template filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableTemplateFilter {
kind: "InputObject",
name: "NullableTemplateFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
type: $Fields.type,
inheritedFromId: $Fields.inheritedFromId,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
type?: $Fields.type['type'],
inheritedFromId?: $Fields.inheritedFromId['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}