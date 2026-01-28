import type * as $Fields from './fields.js'

export * as FeedItemFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Feed item filtering options
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface FeedItemFilter {
kind: "InputObject",
name: "FeedItemFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
author: $Fields.author,
updateType: $Fields.updateType,
updateHealth: $Fields.updateHealth,
projectUpdate: $Fields.projectUpdate,
relatedInitiatives: $Fields.relatedInitiatives,
relatedTeams: $Fields.relatedTeams,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
author?: $Fields.author['type'],
updateType?: $Fields.updateType['type'],
updateHealth?: $Fields.updateHealth['type'],
projectUpdate?: $Fields.projectUpdate['type'],
relatedInitiatives?: $Fields.relatedInitiatives['type'],
relatedTeams?: $Fields.relatedTeams['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}