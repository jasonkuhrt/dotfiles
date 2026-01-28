import type * as $Fields from './fields.js'

export * as ProjectStatusFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project status filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectStatusFilter {
kind: "InputObject",
name: "ProjectStatusFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
projects: $Fields.projects,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
type?: $Fields.type['type'],
projects?: $Fields.projects['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}