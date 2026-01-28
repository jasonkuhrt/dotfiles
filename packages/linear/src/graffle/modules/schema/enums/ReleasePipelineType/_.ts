import type * as $Members from './members.js'

export * as ReleasePipelineType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* A type of release pipeline.
*
* **Members:**
* - `continuous`
* - `scheduled`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 2 |
*/
export interface ReleasePipelineType {
kind: "Enum",
name: "ReleasePipelineType",
members: $Members.continuous
| $Members.scheduled
}