import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"ArchiveResponse"`
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
value: "ArchiveResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ArchiveResponse}.
*
* A JSON serialized collection of model objects loaded from the archive
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ArchiveResponse} |
* | **Path** | `ArchiveResponse.archive` |
* | **Nullability** | Required |
*/
export interface archive {
kind: "OutputField",
name: "archive",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ArchiveResponse}.
*
* The total number of entities in the archive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ArchiveResponse} |
* | **Path** | `ArchiveResponse.totalCount` |
* | **Nullability** | Required |
*/
export interface totalCount {
kind: "OutputField",
name: "totalCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ArchiveResponse}.
*
* The version of the remote database. Incremented by 1 for each migration run on the database.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ArchiveResponse} |
* | **Path** | `ArchiveResponse.databaseVersion` |
* | **Nullability** | Required |
*/
export interface databaseVersion {
kind: "OutputField",
name: "databaseVersion",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.ArchiveResponse}.
*
* Whether the dependencies for the model objects are included in the archive.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.ArchiveResponse} |
* | **Path** | `ArchiveResponse.includesDependencies` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface includesDependencies {
kind: "OutputField",
name: "includesDependencies",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}
