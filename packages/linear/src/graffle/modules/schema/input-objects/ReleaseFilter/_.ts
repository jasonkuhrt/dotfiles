import type * as $Fields from './fields.js'

export * as ReleaseFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [ALPHA] Release filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseFilter {
kind: "InputObject",
name: "ReleaseFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
pipeline: $Fields.pipeline,
stage: $Fields.stage,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
pipeline?: $Fields.pipeline['type'],
stage?: $Fields.stage['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}