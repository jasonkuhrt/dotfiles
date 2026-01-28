import type * as $Fields from './fields.js'

export * as IssueLabelFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue label filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueLabelFilter {
kind: "InputObject",
name: "IssueLabelFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
isGroup: $Fields.isGroup,
creator: $Fields.creator,
team: $Fields.team,
parent: $Fields.parent,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
isGroup?: $Fields.isGroup['type'],
creator?: $Fields.creator['type'],
team?: $Fields.team['type'],
parent?: $Fields.parent['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}