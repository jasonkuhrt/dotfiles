import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"IssueLabel"`
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
value: "IssueLabel"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.id` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
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
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.archivedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The label's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.name` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The label's description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.description` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The label's color as a HEX string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.color` |
* | **Nullability** | Required |
*/
export interface color {
kind: "OutputField",
name: "color",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* Whether the label is a group.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.isGroup` |
* | **Nullability** | Required |
*/
export interface isGroup {
kind: "OutputField",
name: "isGroup",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The date when the label was last applied to an issue or project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.lastAppliedAt` |
* | **Nullability** | Optional |
*/
export interface lastAppliedAt {
kind: "OutputField",
name: "lastAppliedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* [Internal] When the label was retired.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.retiredAt` |
* | **Nullability** | Optional |
*/
export interface retiredAt {
kind: "OutputField",
name: "retiredAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* @deprecated Workspace labels are identified by their team being null.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.organization` |
* | **⚠ Deprecated** | Workspace labels are identified by their team being null. |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The team that the label is associated with. If null, the label is associated with the global workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.team` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The user who created the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.creator` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The user who retired the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.retiredBy` |
* | **Nullability** | Optional |
*/
export interface retiredBy {
kind: "OutputField",
name: "retiredBy",
arguments: {},
inlineType: [0, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The parent label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.parent` |
* | **Nullability** | Optional |
*/
export interface parent {
kind: "OutputField",
name: "parent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* The original label inherited from.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.inheritedFrom` |
* | **Nullability** | Optional |
*/
export interface inheritedFrom {
kind: "OutputField",
name: "inheritedFrom",
arguments: {},
inlineType: [0, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* Issues associated with the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.issues` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface issues {
kind: "OutputField",
name: "issues",
arguments: {
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
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.IssueLabel}.
*
* Children of the label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.IssueLabel} |
* | **Path** | `IssueLabel.children` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface children {
kind: "OutputField",
name: "children",
arguments: {
/**
* Filter returned issue labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter
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
namedType: $Schema.IssueLabelConnection
}
