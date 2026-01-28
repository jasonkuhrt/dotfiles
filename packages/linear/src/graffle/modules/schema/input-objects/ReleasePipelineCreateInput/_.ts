import type * as $Fields from './fields.js'

export * as ReleasePipelineCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleasePipelineCreateInput {
kind: "InputObject",
name: "ReleasePipelineCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
slugId: $Fields.slugId,
type: $Fields.type,
includePathPatterns: $Fields.includePathPatterns
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
slugId?: $Fields.slugId['type'],
type?: $Fields.type['type'],
includePathPatterns?: $Fields.includePathPatterns['type']
}
}