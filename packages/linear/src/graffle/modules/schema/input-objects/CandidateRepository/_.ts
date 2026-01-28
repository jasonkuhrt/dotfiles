import type * as $Fields from './fields.js'

export * as CandidateRepository from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface CandidateRepository {
kind: "InputObject",
name: "CandidateRepository",
isAllFieldsNullable: false,
fields: {
repositoryFullName: $Fields.repositoryFullName,
hostname: $Fields.hostname
},
type: {
repositoryFullName: $Fields.repositoryFullName['type'],
hostname: $Fields.hostname['type']
}
}