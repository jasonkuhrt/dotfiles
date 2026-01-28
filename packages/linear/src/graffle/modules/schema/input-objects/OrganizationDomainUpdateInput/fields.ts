import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationDomainUpdateInput}.
*
* Prevent users with this domain to create new workspaces. Only allowed to set on claimed domains!
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationDomainUpdateInput} |
* | **Path** | `OrganizationDomainUpdateInput.disableOrganizationCreation` |
* | **Nullability** | Optional |
*/
export interface disableOrganizationCreation {
kind: "InputField",
name: "disableOrganizationCreation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}