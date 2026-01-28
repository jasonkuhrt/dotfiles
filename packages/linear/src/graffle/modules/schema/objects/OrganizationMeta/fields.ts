import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationMeta"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "OrganizationMeta"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationMeta}.
*
* The region the organization is hosted in.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationMeta} |
* | **Path** | `OrganizationMeta.region` |
* | **Nullability** | Required |
*/
export interface region {
kind: "OutputField",
name: "region",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationMeta}.
*
* Allowed authentication providers, empty array means all are allowed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationMeta} |
* | **Path** | `OrganizationMeta.allowedAuthServices` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface allowedAuthServices {
kind: "OutputField",
name: "allowedAuthServices",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}
