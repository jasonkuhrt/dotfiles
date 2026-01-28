import type * as $Fields from './fields.js'

export * as GitHubRepoInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface GitHubRepoInput {
kind: "InputObject",
name: "GitHubRepoInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
fullName: $Fields.fullName,
archived: $Fields.archived
},
type: {
id: $Fields.id['type'],
fullName: $Fields.fullName['type'],
archived?: $Fields.archived['type']
}
}