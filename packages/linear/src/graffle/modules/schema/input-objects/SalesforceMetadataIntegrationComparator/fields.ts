import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SalesforceMetadataIntegrationComparator}.
*
* Salesforce Case metadata filter
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.SalesforceMetadataIntegrationComparator} |
* | **Path** | `SalesforceMetadataIntegrationComparator.caseMetadata` |
* | **Nullability** | Optional |
*/
export interface caseMetadata {
kind: "InputField",
name: "caseMetadata",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}