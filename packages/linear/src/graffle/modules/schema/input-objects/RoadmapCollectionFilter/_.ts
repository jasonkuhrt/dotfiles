import type * as $Fields from './fields.js'

export * as RoadmapCollectionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Roadmap collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface RoadmapCollectionFilter {
kind: "InputObject",
name: "RoadmapCollectionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
slugId: $Fields.slugId,
creator: $Fields.creator,
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
slugId?: $Fields.slugId['type'],
creator?: $Fields.creator['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type']
}
}