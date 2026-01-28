import type * as $Fields from './fields.js'

export * as ReleasePipeline from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ReleasePipeline {
kind: "Object",
name: "ReleasePipeline",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
slugId: $Fields.slugId,
type: $Fields.type,
includePathPatterns: $Fields.includePathPatterns,
stages: $Fields.stages,
releases: $Fields.releases
}
}