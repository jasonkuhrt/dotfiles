import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationDomainVerificationInput}.
*
* The identifier in UUID v4 format of the domain being verified.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomainVerificationInput} |
* | **Path** | `OrganizationDomainVerificationInput.organizationDomainId` |
* | **Nullability** | Required |
*/
export interface organizationDomainId {
kind: "InputField",
name: "organizationDomainId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationDomainVerificationInput}.
*
* The verification code sent via email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomainVerificationInput} |
* | **Path** | `OrganizationDomainVerificationInput.verificationCode` |
* | **Nullability** | Required |
*/
export interface verificationCode {
kind: "InputField",
name: "verificationCode",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}