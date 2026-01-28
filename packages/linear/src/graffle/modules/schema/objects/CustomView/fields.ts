import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"CustomView"`
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
value: "CustomView"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
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
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The name of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The description of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.description` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The icon of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.icon` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The color of the icon of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.color` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The organization of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.organization` |
* | **Nullability** | Required |
*/
export interface organization {
kind: "OutputField",
name: "organization",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Organization
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The user who created the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.creator` |
* | **Nullability** | Required |
*/
export interface creator {
kind: "OutputField",
name: "creator",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The user who owns the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.owner` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The user who last updated the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.updatedBy` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The filters applied to issues in the custom view.
*
* @deprecated Will be replaced by `filterData` in a future update
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.filters` |
* | **⚠ Deprecated** | Will be replaced by `filterData` in a future update |
* | **Nullability** | Required |
*/
export interface filters {
kind: "OutputField",
name: "filters",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The filter applied to issues in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.filterData` |
* | **Nullability** | Required |
*/
export interface filterData {
kind: "OutputField",
name: "filterData",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The filter applied to projects in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.projectFilterData` |
* | **Nullability** | Optional |
*/
export interface projectFilterData {
kind: "OutputField",
name: "projectFilterData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The filter applied to initiatives in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.initiativeFilterData` |
* | **Nullability** | Optional |
*/
export interface initiativeFilterData {
kind: "OutputField",
name: "initiativeFilterData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The filter applied to feed items in the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.feedItemFilterData` |
* | **Nullability** | Optional |
*/
export interface feedItemFilterData {
kind: "OutputField",
name: "feedItemFilterData",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* Whether the custom view is shared with everyone in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.shared` |
* | **Nullability** | Required |
*/
export interface shared {
kind: "OutputField",
name: "shared",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The custom view's unique URL slug.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.slugId` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The model name of the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.modelName` |
* | **Nullability** | Required |
*/
export interface modelName {
kind: "OutputField",
name: "modelName",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* [INTERNAL] The facet associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.facet` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The team associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.team` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* Projects associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.projects` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
export interface projects {
kind: "OutputField",
name: "projects",
arguments: {
/**
* Include projects from sub-teams when the custom view is associated with a team.
*/
includeSubTeams: {
kind: "InputField",
name: "includeSubTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filter returned projects.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectFilter
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
},
/**
* [INTERNAL] Sort returned projects.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.ProjectSortInput
}
},
inlineType: [1, ],
namedType: $Schema.ProjectConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* Issues associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.issues` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
export interface issues {
kind: "OutputField",
name: "issues",
arguments: {
/**
* Include issues from sub-teams when the custom view is associated with a team.
*/
includeSubTeams: {
kind: "InputField",
name: "includeSubTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filter returned issues.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueFilter
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
},
/**
* [INTERNAL] Sort returned issues.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.IssueSortInput
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* Feed items associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedItemConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.updates` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface updates {
kind: "OutputField",
name: "updates",
arguments: {
/**
* Include updates from sub-teams when the custom view is associated with a team.
*/
includeSubTeams: {
kind: "InputField",
name: "includeSubTeams",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filter returned feed items.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.FeedItemFilter
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
namedType: $Schema.FeedItemConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The current users view preferences for this custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferences} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.userViewPreferences` |
* | **Nullability** | Optional |
*/
export interface userViewPreferences {
kind: "OutputField",
name: "userViewPreferences",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ViewPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The organizations default view preferences for this custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferences} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.organizationViewPreferences` |
* | **Nullability** | Optional |
*/
export interface organizationViewPreferences {
kind: "OutputField",
name: "organizationViewPreferences",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ViewPreferences
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* The calculated view preferences values for this custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesValues} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.viewPreferencesValues` |
* | **Nullability** | Optional |
*/
export interface viewPreferencesValues {
kind: "OutputField",
name: "viewPreferencesValues",
arguments: {},
inlineType: [0, ],
namedType: $Schema.ViewPreferencesValues
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.CustomView}.
*
* Initiatives associated with the custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.CustomView} |
* | **Path** | `CustomView.initiatives` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface initiatives {
kind: "OutputField",
name: "initiatives",
arguments: {
/**
* Filter returned initiatives.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.InitiativeFilter
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
namedType: $Schema.InitiativeConnection
}
