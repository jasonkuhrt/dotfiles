import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Favorite"`
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
value: "Favorite"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
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
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The type of the favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.type` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The parent folder of the favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Favorite} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Favorite
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The name of the folder. Only applies to favorites of type folder.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.folderName` |
* | **Nullability** | Optional |
*/
export interface folderName {
kind: "OutputField",
name: "folderName",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The targeted tab of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectTab} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.projectTab` |
* | **Nullability** | Optional |
*/
export interface projectTab {
kind: "OutputField",
name: "projectTab",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ProjectTab
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The type of favorited predefined view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.predefinedViewType` |
* | **Nullability** | Optional |
*/
export interface predefinedViewType {
kind: "OutputField",
name: "predefinedViewType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The targeted tab of the initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeTab} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.initiativeTab` |
* | **Nullability** | Optional |
*/
export interface initiativeTab {
kind: "OutputField",
name: "initiativeTab",
arguments: {},
inlineType: [0, ],
namedType: $Schema.InitiativeTab
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The owner of the favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.owner` |
* | **Nullability** | Required |
*/
export interface owner {
kind: "OutputField",
name: "owner",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The order of the item in the favorites list.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.sortOrder` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* Children of the favorite. Only applies to favorites of type folder.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoriteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.children` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface children {
kind: "OutputField",
name: "children",
arguments: {
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
namedType: $Schema.FavoriteConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.issue` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.project` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [INTERNAL] The favorited facet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.facet` |
* | **Nullability** | Optional |
*/
export interface facet {
kind: "OutputField",
name: "facet",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Facet
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [DEPRECATED] The favorited team of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.projectTeam` |
* | **Nullability** | Optional |
*/
export interface projectTeam {
kind: "OutputField",
name: "projectTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.cycle` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.customView` |
* | **Nullability** | Optional |
*/
export interface customView {
kind: "OutputField",
name: "customView",
arguments: {},
inlineType: [0, ],
namedType: $Schema.CustomView
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The team of the favorited predefined view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.predefinedViewTeam` |
* | **Nullability** | Optional |
*/
export interface predefinedViewTeam {
kind: "OutputField",
name: "predefinedViewTeam",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Document} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.document` |
* | **Nullability** | Optional |
*/
export interface document {
kind: "OutputField",
name: "document",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Document
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.initiative` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.label` |
* | **Nullability** | Optional |
*/
export interface label {
kind: "OutputField",
name: "label",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.projectLabel` |
* | **Nullability** | Optional |
*/
export interface projectLabel {
kind: "OutputField",
name: "projectLabel",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ProjectLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.user` |
* | **Nullability** | Optional |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.customer` |
* | **Nullability** | Optional |
*/
export interface customer {
kind: "OutputField",
name: "customer",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Customer
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited dashboard.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Dashboard} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.dashboard` |
* | **Nullability** | Optional |
*/
export interface dashboard {
kind: "OutputField",
name: "dashboard",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Dashboard
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* The favorited pull request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PullRequest} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.pullRequest` |
* | **Nullability** | Optional |
*/
export interface pullRequest {
kind: "OutputField",
name: "pullRequest",
arguments: {},
inlineType: [0, ],
namedType: $Schema.PullRequest
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [ALPHA] The favorited release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.release` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [ALPHA] The favorited release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipeline} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.releasePipeline` |
* | **Nullability** | Optional |
*/
export interface releasePipeline {
kind: "OutputField",
name: "releasePipeline",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ReleasePipeline
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* URL of the favorited entity. Folders return 'null' value.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.url` |
* | **Nullability** | Optional |
*/
export interface url {
kind: "OutputField",
name: "url",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [Internal] Favorite's title text (name of the favorite'd object or folder).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.title` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [Internal] Detail text for favorite's `title` (e.g. team's name for a project).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.detail` |
* | **Nullability** | Optional |
*/
export interface detail {
kind: "OutputField",
name: "detail",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [Internal] Returns the color of the favorite's icon. Unavailable for avatars and views with fixed icons (e.g. cycle).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.color` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Favorite}.
*
* [Internal] Name of the favorite's icon. Unavailable for standard views, issues, and avatars
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Favorite} |
* | **Path** | `Favorite.icon` |
* | **Nullability** | Optional |
*/
export interface icon {
kind: "OutputField",
name: "icon",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}
