import type * as $Fields from './fields.js'

export * as CustomViewFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Custom view filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomViewFilter {
kind: "InputObject",
name: "CustomViewFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
modelName: $Fields.modelName,
team: $Fields.team,
creator: $Fields.creator,
shared: $Fields.shared,
hasFacet: $Fields.hasFacet,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
modelName?: $Fields.modelName['type'],
team?: $Fields.team['type'],
creator?: $Fields.creator['type'],
shared?: $Fields.shared['type'],
hasFacet?: $Fields.hasFacet['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}