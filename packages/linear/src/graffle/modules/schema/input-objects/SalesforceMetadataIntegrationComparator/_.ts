import type * as $Fields from './fields.js'

export * as SalesforceMetadataIntegrationComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [INTERNAL] Comparator for Salesforce metadata.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface SalesforceMetadataIntegrationComparator {
kind: "InputObject",
name: "SalesforceMetadataIntegrationComparator",
isAllFieldsNullable: true,
fields: {
caseMetadata: $Fields.caseMetadata
},
type: {
caseMetadata?: $Fields.caseMetadata['type']
}
}