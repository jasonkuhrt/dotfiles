import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"OrganizationIpRestriction"`
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
value: "OrganizationIpRestriction"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationIpRestriction}.
*
* IP range in CIDR format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationIpRestriction} |
* | **Path** | `OrganizationIpRestriction.range` |
* | **Nullability** | Required |
*/
export interface range {
kind: "OutputField",
name: "range",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationIpRestriction}.
*
* Restriction type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationIpRestriction} |
* | **Path** | `OrganizationIpRestriction.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationIpRestriction}.
*
* Optional restriction description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationIpRestriction} |
* | **Path** | `OrganizationIpRestriction.description` |
* | **Nullability** | Optional |
*/
export interface description {
kind: "OutputField",
name: "description",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.OrganizationIpRestriction}.
*
* Whether the restriction is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationIpRestriction} |
* | **Path** | `OrganizationIpRestriction.enabled` |
* | **Nullability** | Required |
*/
export interface enabled {
kind: "OutputField",
name: "enabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
