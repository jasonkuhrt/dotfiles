import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CandidateRepository}.
*
* The full name of the repository in owner/name format (e.g., 'acme/backend').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CandidateRepository} |
* | **Path** | `CandidateRepository.repositoryFullName` |
* | **Nullability** | Required |
*/
export interface repositoryFullName {
kind: "InputField",
name: "repositoryFullName",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CandidateRepository}.
*
* Hostname of the Git service (e.g., 'github.com', 'github.company.com').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CandidateRepository} |
* | **Path** | `CandidateRepository.hostname` |
* | **Nullability** | Required |
*/
export interface hostname {
kind: "InputField",
name: "hostname",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}