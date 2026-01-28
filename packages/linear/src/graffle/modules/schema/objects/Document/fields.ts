import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Document"`
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
value: "Document"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The document title.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.title` |
* | **Nullability** | Required |
*/
export interface title {
kind: "OutputField",
name: "title",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The icon of the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "OutputField",
name: "icon",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The color of the icon.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.color` |
* | **Nullability** | Optional |
*/
export interface color {
kind: "OutputField",
name: "color",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The user who created the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.creator` |
* | **Nullability** | Optional |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The user who last updated the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.updatedBy` |
* | **Nullability** | Optional |
*/
export interface updatedBy {
kind: "OutputField",
name: "updatedBy",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The project that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The initiative that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Initiative
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* [Internal] The team that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.team` |
* | **Nullability** | Optional |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The issue that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.issue` |
* | **Nullability** | Optional |
*/
export interface issue {
kind: "OutputField",
name: "issue",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* [Internal] The release that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.release` |
* | **Nullability** | Optional |
*/
export interface release {
kind: "OutputField",
name: "release",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Release
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* [Internal] The cycle that the document is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.cycle` |
* | **Nullability** | Optional |
*/
export interface cycle {
kind: "OutputField",
name: "cycle",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The document's unique URL slug.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.slugId` |
* | **Nullability** | Required |
*/
export interface slugId {
kind: "OutputField",
name: "slugId",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The last template that was applied to this document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.lastAppliedTemplate` |
* | **Nullability** | Optional |
*/
export interface lastAppliedTemplate {
kind: "OutputField",
name: "lastAppliedTemplate",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The time at which the document was hidden. Null if the entity has not been hidden.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.hiddenAt` |
* | **Nullability** | Optional |
*/
export interface hiddenAt {
kind: "OutputField",
name: "hiddenAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* A flag that indicates whether the document is in the trash bin.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.trashed` |
* | **Nullability** | Optional |
*/
export interface trashed {
kind: "OutputField",
name: "trashed",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The order of the item in the resources list.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.sortOrder` |
* | **Nullability** | Required |
*/
export interface sortOrder {
kind: "OutputField",
name: "sortOrder",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* Comments associated with the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface comments {
kind: "OutputField",
name: "comments",
arguments: {
/**
* Filter returned comments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CommentFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.CommentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The documents content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.content` |
* | **Nullability** | Optional |
*/
export interface content {
kind: "OutputField",
name: "content",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* [Internal] The documents content as YJS state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.contentState` |
* | **Nullability** | Optional |
*/
export interface contentState {
kind: "OutputField",
name: "contentState",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The ID of the document content associated with the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.documentContentId` |
* | **Nullability** | Optional |
*/
export interface documentContentId {
kind: "OutputField",
name: "documentContentId",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Document}.
*
* The canonical url for the document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Document} |
* | **Path** | `Document.url` |
* | **Nullability** | Required |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}
