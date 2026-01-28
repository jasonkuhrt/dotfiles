import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CreateOrganizationInput}.
*
* The name of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CreateOrganizationInput} |
* | **Path** | `CreateOrganizationInput.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CreateOrganizationInput}.
*
* The URL key of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CreateOrganizationInput} |
* | **Path** | `CreateOrganizationInput.urlKey` |
* | **Nullability** | Required |
*/
export interface urlKey {
kind: "InputField",
name: "urlKey",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CreateOrganizationInput}.
*
* Whether the organization should allow email domain access.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CreateOrganizationInput} |
* | **Path** | `CreateOrganizationInput.domainAccess` |
* | **Nullability** | Optional |
*/
export interface domainAccess {
kind: "InputField",
name: "domainAccess",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CreateOrganizationInput}.
*
* The timezone of the organization, passed in by client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CreateOrganizationInput} |
* | **Path** | `CreateOrganizationInput.timezone` |
* | **Nullability** | Optional |
*/
export interface timezone {
kind: "InputField",
name: "timezone",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.CreateOrganizationInput}.
*
* JSON serialized UTM parameters associated with the creation of the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CreateOrganizationInput} |
* | **Path** | `CreateOrganizationInput.utm` |
* | **Nullability** | Optional |
*/
export interface utm {
kind: "InputField",
name: "utm",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}