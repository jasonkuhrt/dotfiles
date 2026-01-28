import type * as $Fields from './fields.js'

export * as ReleasePipelineUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleasePipelineUpdateInput {
kind: "InputObject",
name: "ReleasePipelineUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
slugId: $Fields.slugId,
type: $Fields.type,
includePathPatterns: $Fields.includePathPatterns
},
type: {
name?: $Fields.name['type'],
slugId?: $Fields.slugId['type'],
type?: $Fields.type['type'],
includePathPatterns?: $Fields.includePathPatterns['type']
}
}