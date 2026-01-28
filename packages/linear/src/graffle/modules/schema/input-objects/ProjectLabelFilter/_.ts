import type * as $Fields from './fields.js'

export * as ProjectLabelFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project label filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 9 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectLabelFilter {
kind: "InputObject",
name: "ProjectLabelFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
isGroup: $Fields.isGroup,
creator: $Fields.creator,
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
parent?: $Fields.parent['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}