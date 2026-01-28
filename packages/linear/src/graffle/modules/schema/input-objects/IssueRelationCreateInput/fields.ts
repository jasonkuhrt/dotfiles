import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueRelationCreateInput}.
*
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueRelationCreateInput} |
* | **Path** | `IssueRelationCreateInput.id` |
* | **Nullability** | Optional |
*/
export interface id {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueRelationCreateInput}.
*
* The type of relation of the issue to the related issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.IssueRelationCreateInput} |
* | **Path** | `IssueRelationCreateInput.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "InputField",
name: "type",
inlineType: [1, ],
namedType: $Schema.IssueRelationType,
type: $Schema.IssueRelationType['members']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueRelationCreateInput}.
*
* The identifier of the issue that is related to another issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueRelationCreateInput} |
* | **Path** | `IssueRelationCreateInput.issueId` |
* | **Nullability** | Required |
*/
export interface issueId {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.IssueRelationCreateInput}.
*
* The identifier of the related issue. Can be a UUID or issue identifier (e.g., 'LIN-123').
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueRelationCreateInput} |
* | **Path** | `IssueRelationCreateInput.relatedIssueId` |
* | **Nullability** | Required |
*/
export interface relatedIssueId {
kind: "InputField",
name: "relatedIssueId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}