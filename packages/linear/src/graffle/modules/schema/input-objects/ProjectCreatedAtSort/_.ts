import type * as $Fields from './fields.js'

export * as ProjectCreatedAtSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project creation date sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectCreatedAtSort {
kind: "InputObject",
name: "ProjectCreatedAtSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type']
}
}