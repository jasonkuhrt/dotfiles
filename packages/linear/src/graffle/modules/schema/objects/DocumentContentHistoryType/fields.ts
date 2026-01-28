import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"DocumentContentHistoryType"`
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
value: "DocumentContentHistoryType"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryType}.
*
* The UUID of the document content history entry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryType} |
* | **Path** | `DocumentContentHistoryType.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryType}.
*
* The date when the document content history entry was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryType} |
* | **Path** | `DocumentContentHistoryType.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryType}.
*
* The date when the document content history snapshot was taken. This can be different than createdAt since the content is captured from its state at the previously known updatedAt timestamp in the case of an update. On document create, these timestamps can be the same.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryType} |
* | **Path** | `DocumentContentHistoryType.contentDataSnapshotAt` |
* | **Nullability** | Required |
*/
export interface contentDataSnapshotAt {
kind: "OutputField",
name: "contentDataSnapshotAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryType}.
*
* [Internal] The document content as Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryType} |
* | **Path** | `DocumentContentHistoryType.contentData` |
* | **Nullability** | Optional |
*/
export interface contentData {
kind: "OutputField",
name: "contentData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSON
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.DocumentContentHistoryType}.
*
* The ID of the author of the change.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.DocumentContentHistoryType} |
* | **Path** | `DocumentContentHistoryType.actorIds` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface actorIds {
kind: "OutputField",
name: "actorIds",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}
