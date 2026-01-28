import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* Equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.eq` |
* | **Nullability** | Optional |
*/
export interface eq {
kind: "InputField",
name: "eq",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* Not-equals constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.neq` |
* | **Nullability** | Optional |
*/
export interface neq {
kind: "InputField",
name: "neq",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* In-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.in` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
interface $in {
kind: "InputField",
name: "in",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
export { type $in as in }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* Not-in-array constraint.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.nin` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface nin {
kind: "InputField",
name: "nin",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* Null constraint. Matches any non-null values if the given value is false, otherwise it matches null values.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.null` |
* | **Nullability** | Optional |
*/
interface $null {
kind: "InputField",
name: "null",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
export { type $null as null }
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* Comparator for the sub type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SubTypeComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.subType` |
* | **Nullability** | Optional |
*/
export interface subType {
kind: "InputField",
name: "subType",
inlineType: [0, ],
namedType: $Schema.SubTypeComparator,
type: $Schema.SubTypeComparator['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.SourceMetadataComparator}.
*
* [INTERNAL] Comparator for the salesforce metadata.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SalesforceMetadataIntegrationComparator} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.SourceMetadataComparator} |
* | **Path** | `SourceMetadataComparator.salesforceMetadata` |
* | **Nullability** | Optional |
*/
export interface salesforceMetadata {
kind: "InputField",
name: "salesforceMetadata",
inlineType: [0, ],
namedType: $Schema.SalesforceMetadataIntegrationComparator,
type: $Schema.SalesforceMetadataIntegrationComparator['type'] | null | undefined
}