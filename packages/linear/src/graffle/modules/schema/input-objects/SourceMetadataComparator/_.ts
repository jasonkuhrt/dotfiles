import type * as $Fields from './fields.js'

export * as SourceMetadataComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for issue source type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface SourceMetadataComparator {
kind: "InputObject",
name: "SourceMetadataComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq,
in: $Fields.in,
nin: $Fields.nin,
null: $Fields.null,
subType: $Fields.subType,
salesforceMetadata: $Fields.salesforceMetadata
},
type: {
eq?: $Fields.eq['type'],
neq?: $Fields.neq['type'],
in?: $Fields.in['type'],
nin?: $Fields.nin['type'],
null?: $Fields.null['type'],
subType?: $Fields.subType['type'],
salesforceMetadata?: $Fields.salesforceMetadata['type']
}
}