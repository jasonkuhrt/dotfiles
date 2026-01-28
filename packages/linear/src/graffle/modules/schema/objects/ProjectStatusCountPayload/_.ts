import type * as $Fields from './fields.js'

export * as ProjectStatusCountPayload from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 3 |
*/
export interface ProjectStatusCountPayload {
kind: "Object",
name: "ProjectStatusCountPayload",
fields: {
__typename: $Fields.__typename,
count: $Fields.count,
privateCount: $Fields.privateCount,
archivedTeamCount: $Fields.archivedTeamCount
}
}