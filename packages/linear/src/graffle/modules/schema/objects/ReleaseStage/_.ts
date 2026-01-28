import type * as $Fields from './fields.js'

export * as ReleaseStage from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ReleaseStage {
kind: "Object",
name: "ReleaseStage",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
color: $Fields.color,
type: $Fields.type,
position: $Fields.position,
pipeline: $Fields.pipeline,
releases: $Fields.releases
}
}