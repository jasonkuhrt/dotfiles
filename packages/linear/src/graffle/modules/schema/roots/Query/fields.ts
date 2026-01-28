import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Query"`
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
value: "Query"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All issue workflow states.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.workflowStates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface workflowStates {
kind: "OutputField",
name: "workflowStates",
arguments: {
/**
* Filter returned workflow states.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.WorkflowStateFilter
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
namedType: $Schema.WorkflowStateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.workflowState` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface workflowState {
kind: "OutputField",
name: "workflowState",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.WorkflowState
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All webhooks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.webhooks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface webhooks {
kind: "OutputField",
name: "webhooks",
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
namedType: $Schema.WebhookConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Webhook}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.webhook` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface webhook {
kind: "OutputField",
name: "webhook",
arguments: {
/**
* The identifier of the webhook to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Webhook
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [INTERNAL] Webhook failure events for webhooks that belong to an OAuth application. (last 50)
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookFailureEvent}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.failuresForOauthWebhooks` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
export interface failuresForOauthWebhooks {
kind: "OutputField",
name: "failuresForOauthWebhooks",
arguments: {
/**
* The identifier of the OAuth client to retrieve failures for.
*/
oauthClientId: {
kind: "InputField",
name: "oauthClientId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, [1, ]],
namedType: $Schema.WebhookFailureEvent
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.userSettings` |
* | **Nullability** | Required |
*/
export interface userSettings {
kind: "OutputField",
name: "userSettings",
arguments: {},
inlineType: [1, ],
namedType: $Schema.UserSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.users` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
export interface users {
kind: "OutputField",
name: "users",
arguments: {
/**
* Filter returned users.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.UserFilter
},
/**
* Should query return disabled/suspended users (default: false).
*/
includeDisabled: {
kind: "InputField",
name: "includeDisabled",
inlineType: [0, ],
namedType: $Schema.Boolean
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
* [INTERNAL] Sort returned users.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.UserSortInput
}
},
inlineType: [1, ],
namedType: $Schema.UserConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.user` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface user {
kind: "OutputField",
name: "user",
arguments: {
/**
* The identifier of the user to retrieve. To retrieve the authenticated user, use `viewer` query.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The currently authenticated user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.viewer` |
* | **Nullability** | Required |
*/
export interface viewer {
kind: "OutputField",
name: "viewer",
arguments: {},
inlineType: [1, ],
namedType: $Schema.User
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Lists the sessions of a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.userSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
export interface userSessions {
kind: "OutputField",
name: "userSessions",
arguments: {
/**
* The identifier of the user to list sessions of.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, [1, ]],
namedType: $Schema.AuthenticationSessionResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All triage responsibilities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.triageResponsibilities` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface triageResponsibilities {
kind: "OutputField",
name: "triageResponsibilities",
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
namedType: $Schema.TriageResponsibilityConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibility}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.triageResponsibility` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface triageResponsibility {
kind: "OutputField",
name: "triageResponsibility",
arguments: {
/**
* The identifier of the triage responsibility to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TriageResponsibility
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All time schedules.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeScheduleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.timeSchedules` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface timeSchedules {
kind: "OutputField",
name: "timeSchedules",
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
namedType: $Schema.TimeScheduleConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedule}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.timeSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface timeSchedule {
kind: "OutputField",
name: "timeSchedule",
arguments: {
/**
* The identifier of the time schedule to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TimeSchedule
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All templates from all users.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.templates` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface templates {
kind: "OutputField",
name: "templates",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.template` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface template {
kind: "OutputField",
name: "template",
arguments: {
/**
* The identifier of the template to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Returns all templates that are associated with the integration type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.templatesForIntegration` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*/
export interface templatesForIntegration {
kind: "OutputField",
name: "templatesForIntegration",
arguments: {
/**
* The type of integration for which to return associated templates.
*/
integrationType: {
kind: "InputField",
name: "integrationType",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, [1, ]],
namedType: $Schema.Template
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projects` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface projects {
kind: "OutputField",
name: "projects",
arguments: {
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.project` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface project {
kind: "OutputField",
name: "project",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Project
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Suggests filters for a project view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectFilterSuggestion {
kind: "OutputField",
name: "projectFilterSuggestion",
arguments: {
prompt: {
kind: "InputField",
name: "prompt",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectFilterSuggestionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All teams whose issues can be accessed by the user. This might be different from `administrableTeams`, which also includes teams whose settings can be changed by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface teams {
kind: "OutputField",
name: "teams",
arguments: {
/**
* Filter returned teams.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.TeamFilter
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
namedType: $Schema.TeamConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All teams you the user can administrate. Administrable teams are teams whose settings the user can change, but to whose issues the user doesn't necessarily have access to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.administrableTeams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface administrableTeams {
kind: "OutputField",
name: "administrableTeams",
arguments: {
/**
* Filter returned teams.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.TeamFilter
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
namedType: $Schema.TeamConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.team` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface team {
kind: "OutputField",
name: "team",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All team memberships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teamMemberships` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface teamMemberships {
kind: "OutputField",
name: "teamMemberships",
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
namedType: $Schema.TeamMembershipConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembership}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teamMembership` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface teamMembership {
kind: "OutputField",
name: "teamMembership",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.TeamMembership
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Search for various resources using natural language.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SemanticSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.semanticSearch` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
export interface semanticSearch {
kind: "OutputField",
name: "semanticSearch",
arguments: {
/**
* Search query to look for.
*/
query: {
kind: "InputField",
name: "query",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The types of results to return (default: all).
*/
types: {
kind: "InputField",
name: "types",
inlineType: [0, [1, ]],
namedType: $Schema.SemanticSearchResultType
},
/**
* The maximum number of results to return (default: 50).
*/
maxResults: {
kind: "InputField",
name: "maxResults",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Whether to include archived results in the search (default: false).
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Filters to apply to the semantic search results of each type.
*/
filters: {
kind: "InputField",
name: "filters",
inlineType: [0, ],
namedType: $Schema.SemanticSearchFilters
}
},
inlineType: [1, ],
namedType: $Schema.SemanticSearchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Search documents.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchDocuments` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
export interface searchDocuments {
kind: "OutputField",
name: "searchDocuments",
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
},
/**
* Search string to look for.
*/
term: {
kind: "InputField",
name: "term",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*/
snippetSize: {
kind: "InputField",
name: "snippetSize",
inlineType: [0, ],
namedType: $Schema.Float
},
/**
* Should associated comments be searched (default: false).
*/
includeComments: {
kind: "InputField",
name: "includeComments",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* UUID of a team to use as a boost.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DocumentSearchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Search projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchProjects` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*/
export interface searchProjects {
kind: "OutputField",
name: "searchProjects",
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
},
/**
* Search string to look for.
*/
term: {
kind: "InputField",
name: "term",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*/
snippetSize: {
kind: "InputField",
name: "snippetSize",
inlineType: [0, ],
namedType: $Schema.Float
},
/**
* Should associated comments be searched (default: false).
*/
includeComments: {
kind: "InputField",
name: "includeComments",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* UUID of a team to use as a boost.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectSearchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Search issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchIssues` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*/
export interface searchIssues {
kind: "OutputField",
name: "searchIssues",
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
},
/**
* Search string to look for.
*/
term: {
kind: "InputField",
name: "term",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Size of search snippet to return (default: 100)
*
* @deprecated No longer supported.
*/
snippetSize: {
kind: "InputField",
name: "snippetSize",
inlineType: [0, ],
namedType: $Schema.Float
},
/**
* Should associated comments be searched (default: false).
*/
includeComments: {
kind: "InputField",
name: "includeComments",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* UUID of a team to use as a boost.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueSearchPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmapToProjects` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface roadmapToProjects {
kind: "OutputField",
name: "roadmapToProjects",
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
namedType: $Schema.RoadmapToProjectConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific roadmapToProject.
*
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmapToProject` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmapToProject {
kind: "OutputField",
name: "roadmapToProject",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RoadmapToProject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All roadmaps in the workspace.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmaps` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface roadmaps {
kind: "OutputField",
name: "roadmaps",
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
namedType: $Schema.RoadmapConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Roadmap}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmap` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface roadmap {
kind: "OutputField",
name: "roadmap",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Roadmap
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] All release stages.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releaseStages` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface releaseStages {
kind: "OutputField",
name: "releaseStages",
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
namedType: $Schema.ReleaseStageConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] One specific release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStage}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releaseStage` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releaseStage {
kind: "OutputField",
name: "releaseStage",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleaseStage
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] All releases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface releases {
kind: "OutputField",
name: "releases",
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
namedType: $Schema.ReleaseConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] One specific release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.release` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface release {
kind: "OutputField",
name: "release",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Release
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] All release pipelines.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releasePipelines` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface releasePipelines {
kind: "OutputField",
name: "releasePipelines",
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
namedType: $Schema.ReleasePipelineConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] One specific release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipeline}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releasePipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface releasePipeline {
kind: "OutputField",
name: "releasePipeline",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ReleasePipeline
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The status of the rate limiter.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RateLimitPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.rateLimitStatus` |
* | **Nullability** | Required |
*/
export interface rateLimitStatus {
kind: "OutputField",
name: "rateLimitStatus",
arguments: {},
inlineType: [1, ],
namedType: $Schema.RateLimitPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Sends a test push message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionTestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.pushSubscriptionTest` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface pushSubscriptionTest {
kind: "OutputField",
name: "pushSubscriptionTest",
arguments: {
/**
* Whether to send to mobile devices.
*/
targetMobile: {
kind: "InputField",
name: "targetMobile",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* The send strategy to use.
*/
sendStrategy: {
kind: "InputField",
name: "sendStrategy",
inlineType: [0, ],
namedType: $Schema.SendStrategy
}
},
inlineType: [1, ],
namedType: $Schema.PushSubscriptionTestPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface projectUpdates {
kind: "OutputField",
name: "projectUpdates",
arguments: {
/**
* Filter returned project updates.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectUpdateFilter
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
namedType: $Schema.ProjectUpdateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectUpdate {
kind: "OutputField",
name: "projectUpdate",
arguments: {
/**
* The identifier of the project update to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectUpdate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All project statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface projectStatuses {
kind: "OutputField",
name: "projectStatuses",
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
namedType: $Schema.ProjectStatusConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [INTERNAL] Count of projects using this project status across the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusCountPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatusProjectCount` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectStatusProjectCount {
kind: "OutputField",
name: "projectStatusProjectCount",
arguments: {
/**
* The identifier of the project status to find the project count for.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatusCountPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectStatus {
kind: "OutputField",
name: "projectStatus",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All project relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface projectRelations {
kind: "OutputField",
name: "projectRelations",
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
namedType: $Schema.ProjectRelationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectRelation {
kind: "OutputField",
name: "projectRelation",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectRelation
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All milestones for the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectMilestones` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface projectMilestones {
kind: "OutputField",
name: "projectMilestones",
arguments: {
/**
* Filter returned project milestones.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectMilestoneFilter
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
namedType: $Schema.ProjectMilestoneConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestone}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectMilestone` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectMilestone {
kind: "OutputField",
name: "projectMilestone",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectMilestone
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All project labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface projectLabels {
kind: "OutputField",
name: "projectLabels",
arguments: {
/**
* Filter returned project labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectLabelFilter
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
namedType: $Schema.ProjectLabelConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface projectLabel {
kind: "OutputField",
name: "projectLabel",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organization` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Does the organization exist.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationExistsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationExists` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationExists {
kind: "OutputField",
name: "organizationExists",
arguments: {
urlKey: {
kind: "InputField",
name: "urlKey",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationExistsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [Internal] All archived teams of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.archivedTeams` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface archivedTeams {
kind: "OutputField",
name: "archivedTeams",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Team
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [INTERNAL] Get organization metadata by urlKey or organization id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationMeta} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationMeta` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
export interface organizationMeta {
kind: "OutputField",
name: "organizationMeta",
arguments: {
urlKey: {
kind: "InputField",
name: "urlKey",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [0, ],
namedType: $Schema.OrganizationMeta
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All invites for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInvites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface organizationInvites {
kind: "OutputField",
name: "organizationInvites",
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
namedType: $Schema.OrganizationInviteConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationInvite {
kind: "OutputField",
name: "organizationInvite",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationInvite
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteDetailsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInviteDetails` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationInviteDetails {
kind: "OutputField",
name: "organizationInviteDetails",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationInviteDetailsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [INTERNAL] Checks whether the domain can be claimed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainClaimPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationDomainClaimRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface organizationDomainClaimRequest {
kind: "OutputField",
name: "organizationDomainClaimRequest",
arguments: {
/**
* The ID of the organization domain to claim.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.OrganizationDomainClaimPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The user's notification subscriptions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationSubscriptions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface notificationSubscriptions {
kind: "OutputField",
name: "notificationSubscriptions",
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
namedType: $Schema.NotificationSubscriptionConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscription}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationSubscription` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notificationSubscription {
kind: "OutputField",
name: "notificationSubscription",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.NotificationSubscription
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notifications` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface notifications {
kind: "OutputField",
name: "notifications",
arguments: {
/**
* Filters returned notifications.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.NotificationFilter
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
namedType: $Schema.NotificationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [Internal] A number of unread notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationsUnreadCount` |
* | **Nullability** | Required |
*/
export interface notificationsUnreadCount {
kind: "OutputField",
name: "notificationsUnreadCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Notification}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notification` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface notification {
kind: "OutputField",
name: "notification",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Notification
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] Returns a list of issue to release entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueToReleases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface issueToReleases {
kind: "OutputField",
name: "issueToReleases",
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
namedType: $Schema.IssueToReleaseConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [ALPHA] One specific issueToRelease.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToRelease}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueToRelease` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueToRelease {
kind: "OutputField",
name: "issueToRelease",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueToRelease
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issues` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issue {
kind: "OutputField",
name: "issue",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [DEPRECATED] Search issues. This endpoint is deprecated and will be removed in the future – use `searchIssues` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueSearch` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface issueSearch {
kind: "OutputField",
name: "issueSearch",
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
* [Deprecated] Search string to look for.
*/
query: {
kind: "InputField",
name: "query",
inlineType: [0, ],
namedType: $Schema.String
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Find issue based on the VCS branch name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueVcsBranchSearch` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
export interface issueVcsBranchSearch {
kind: "OutputField",
name: "issueVcsBranchSearch",
arguments: {
/**
* The VCS branch name to search for.
*/
branchName: {
kind: "InputField",
name: "branchName",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [0, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Find issues that are related to a given Figma file key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueFigmaFileKeySearch` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface issueFigmaFileKeySearch {
kind: "OutputField",
name: "issueFigmaFileKeySearch",
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
},
/**
* The Figma file key.
*/
fileKey: {
kind: "InputField",
name: "fileKey",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Issue priority values and corresponding labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePriorityValue}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issuePriorityValues` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface issuePriorityValues {
kind: "OutputField",
name: "issuePriorityValues",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.IssuePriorityValue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Suggests filters for an issue view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueFilterSuggestion {
kind: "OutputField",
name: "issueFilterSuggestion",
arguments: {
/**
* The ID of the project if filtering a project view
*/
projectId: {
kind: "InputField",
name: "projectId",
inlineType: [0, ],
namedType: $Schema.String
},
prompt: {
kind: "InputField",
name: "prompt",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueFilterSuggestionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Returns code repositories that are most likely to be relevant for implementing an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RepositorySuggestionsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRepositorySuggestions` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface issueRepositorySuggestions {
kind: "OutputField",
name: "issueRepositorySuggestions",
arguments: {
/**
* Optional AgentSession ID associated with the issue for which the suggestions are being generated.
*/
agentSessionId: {
kind: "InputField",
name: "agentSessionId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* List of candidate repositories to restrict suggestions to.
*/
candidateRepositories: {
kind: "InputField",
name: "candidateRepositories",
inlineType: [1, [1, ]],
namedType: $Schema.CandidateRepository
},
/**
* The ID of the issue to get repository suggestions for.
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.RepositorySuggestionsPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All issue relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface issueRelations {
kind: "OutputField",
name: "issueRelations",
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
namedType: $Schema.IssueRelationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueRelation {
kind: "OutputField",
name: "issueRelation",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueRelation
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface issueLabels {
kind: "OutputField",
name: "issueLabels",
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

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueLabel {
kind: "OutputField",
name: "issueLabel",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Checks a CSV file validity against a specific import service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportCheckCSV` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface issueImportCheckCSV {
kind: "OutputField",
name: "issueImportCheckCSV",
arguments: {
/**
* CSV storage url.
*/
csvUrl: {
kind: "InputField",
name: "csvUrl",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The service the CSV containing data from.
*/
service: {
kind: "InputField",
name: "service",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportCheckPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Checks whether it will be possible to setup sync for this project or repository at the end of import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportSyncCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportCheckSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueImportCheckSync {
kind: "OutputField",
name: "issueImportCheckSync",
arguments: {
/**
* The ID of the issue import for which to check sync eligibility
*/
issueImportId: {
kind: "InputField",
name: "issueImportId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportSyncCheckPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Checks whether a custom JQL query is valid and can be used to filter issues of a Jira import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportJqlCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportJqlCheck` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*/
export interface issueImportJqlCheck {
kind: "OutputField",
name: "issueImportJqlCheck",
arguments: {
/**
* Jira installation or cloud hostname.
*/
jiraHostname: {
kind: "InputField",
name: "jiraHostname",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira personal access token to access Jira REST API.
*/
jiraToken: {
kind: "InputField",
name: "jiraToken",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira user account email.
*/
jiraEmail: {
kind: "InputField",
name: "jiraEmail",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* Jira project key to use as the base filter of the query.
*/
jiraProject: {
kind: "InputField",
name: "jiraProject",
inlineType: [1, ],
namedType: $Schema.String
},
/**
* The JQL query to validate.
*/
jql: {
kind: "InputField",
name: "jql",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueImportJqlCheckPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific set of settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationsSettings` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationsSettings {
kind: "OutputField",
name: "integrationsSettings",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationsSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Template and integration connections.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationTemplates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface integrationTemplates {
kind: "OutputField",
name: "integrationTemplates",
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
namedType: $Schema.IntegrationTemplateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationTemplate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integrationTemplate {
kind: "OutputField",
name: "integrationTemplate",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationTemplate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface integrations {
kind: "OutputField",
name: "integrations",
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
namedType: $Schema.IntegrationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Integration}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integration` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface integration {
kind: "OutputField",
name: "integration",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Integration
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Verify that we received the correct response from the GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubEnterpriseServerInstallVerificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.verifyGitHubEnterpriseServerInstallation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface verifyGitHubEnterpriseServerInstallation {
kind: "OutputField",
name: "verifyGitHubEnterpriseServerInstallation",
arguments: {
/**
* The integration ID.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.GitHubEnterpriseServerInstallVerificationPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Checks if the integration has all required scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationHasScopesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationHasScopes` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface integrationHasScopes {
kind: "OutputField",
name: "integrationHasScopes",
arguments: {
/**
* Required scopes.
*/
scopes: {
kind: "InputField",
name: "scopes",
inlineType: [1, [1, ]],
namedType: $Schema.String
},
/**
* The integration ID.
*/
integrationId: {
kind: "InputField",
name: "integrationId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationHasScopesPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All  InitiativeUpdates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface initiativeUpdates {
kind: "OutputField",
name: "initiativeUpdates",
arguments: {
/**
* Filter returned initiative updates.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.InitiativeUpdateFilter
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
namedType: $Schema.InitiativeUpdateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific  initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeUpdate {
kind: "OutputField",
name: "initiativeUpdate",
arguments: {
/**
* The identifier of the  initiative update to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeUpdate
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* returns a list of initiative to project entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeToProjects` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface initiativeToProjects {
kind: "OutputField",
name: "initiativeToProjects",
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
namedType: $Schema.InitiativeToProjectConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeToProject` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeToProject {
kind: "OutputField",
name: "initiativeToProject",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeToProject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All initiatives in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiatives` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
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
},
/**
* [INTERNAL] Sort returned initiatives.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.InitiativeSortInput
}
},
inlineType: [1, ],
namedType: $Schema.InitiativeConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiative` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiative {
kind: "OutputField",
name: "initiative",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Initiative
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All initiative relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface initiativeRelations {
kind: "OutputField",
name: "initiativeRelations",
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
namedType: $Schema.InitiativeRelationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface initiativeRelation {
kind: "OutputField",
name: "initiativeRelation",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ProjectRelation
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [Internal] Fetch an arbitrary set of data using natural language query. Be specific about what you want including properties for each entity, sort order, filters, limit and properties.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FetchDataPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.fetchData` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface fetchData {
kind: "OutputField",
name: "fetchData",
arguments: {
/**
* Natural language query describing what data to fetch.
*
* Examples:
* - "All issues for the project with id 12345678-1234-1234-1234-123456789abc including comments"
* - "The latest project update for each project that's a part of the initiative with id 12345678-1234-1234-1234-123456789abc, including it's sub-initiatives"
*/
query: {
kind: "InputField",
name: "query",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.FetchDataPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* The user's favorites.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoriteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.favorites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface favorites {
kind: "OutputField",
name: "favorites",
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Favorite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.favorite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface favorite {
kind: "OutputField",
name: "favorite",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Favorite
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All external users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.externalUsers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface externalUsers {
kind: "OutputField",
name: "externalUsers",
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
namedType: $Schema.ExternalUserConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific external user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.externalUser` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface externalUser {
kind: "OutputField",
name: "externalUser",
arguments: {
/**
* The identifier of the external user to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.ExternalUser
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLink}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.entityExternalLink` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface entityExternalLink {
kind: "OutputField",
name: "entityExternalLink",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.EntityExternalLink
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All custom emojis.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmojiConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emojis` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface emojis {
kind: "OutputField",
name: "emojis",
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
namedType: $Schema.EmojiConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Emoji}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emoji` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emoji {
kind: "OutputField",
name: "emoji",
arguments: {
/**
* The identifier or the name of the emoji to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Emoji
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddress}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emailIntakeAddress` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface emailIntakeAddress {
kind: "OutputField",
name: "emailIntakeAddress",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.EmailIntakeAddress
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All documents in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface documents {
kind: "OutputField",
name: "documents",
arguments: {
/**
* Filter returned documents.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.DocumentFilter
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
namedType: $Schema.DocumentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Document}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.document` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface document {
kind: "OutputField",
name: "document",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Document
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A collection of document content history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContentHistoryPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.documentContentHistory` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface documentContentHistory {
kind: "OutputField",
name: "documentContentHistory",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.DocumentContentHistoryPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.cycles` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface cycles {
kind: "OutputField",
name: "cycles",
arguments: {
/**
* Filter returned users.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CycleFilter
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
namedType: $Schema.CycleConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.cycle` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface cycle {
kind: "OutputField",
name: "cycle",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Cycle
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All customer tiers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerTiers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface customerTiers {
kind: "OutputField",
name: "customerTiers",
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
namedType: $Schema.CustomerTierConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTier}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerTier` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerTier {
kind: "OutputField",
name: "customerTier",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerTier
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All customer statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface customerStatuses {
kind: "OutputField",
name: "customerStatuses",
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
namedType: $Schema.CustomerStatusConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customerStatus {
kind: "OutputField",
name: "customerStatus",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customers` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface customers {
kind: "OutputField",
name: "customers",
arguments: {
/**
* Filter returned customers.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CustomerFilter
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
* Sort returned customers.
*/
sorts: {
kind: "InputField",
name: "sorts",
inlineType: [0, [1, ]],
namedType: $Schema.CustomerSortInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomerConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customer` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customer {
kind: "OutputField",
name: "customer",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Customer
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All customer needs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerNeeds` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface customerNeeds {
kind: "OutputField",
name: "customerNeeds",
arguments: {
/**
* Filter returned customers needs.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CustomerNeedFilter
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
namedType: $Schema.CustomerNeedConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeed}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerNeed` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customerNeed {
kind: "OutputField",
name: "customerNeed",
arguments: {
/**
* The identifier of the need to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The hash of the need to retrieve.
*/
hash: {
kind: "InputField",
name: "hash",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomerNeed
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Suggests issue title based on a customer request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueTitleSuggestionFromCustomerRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface issueTitleSuggestionFromCustomerRequest {
kind: "OutputField",
name: "issueTitleSuggestionFromCustomerRequest",
arguments: {
request: {
kind: "InputField",
name: "request",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.IssueTitleSuggestionFromCustomerRequestPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Custom views for the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViews` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
export interface customViews {
kind: "OutputField",
name: "customViews",
arguments: {
/**
* Filter returned custom views.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.CustomViewFilter
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
* [INTERNAL] Sort returned custom views.
*/
sort: {
kind: "InputField",
name: "sort",
inlineType: [0, [1, ]],
namedType: $Schema.CustomViewSortInput
}
},
inlineType: [1, ],
namedType: $Schema.CustomViewConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* One specific custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customView` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customView {
kind: "OutputField",
name: "customView",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomView
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [INTERNAL] Suggests metadata for a view based on it's filters.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViewDetailsSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*/
export interface customViewDetailsSuggestion {
kind: "OutputField",
name: "customViewDetailsSuggestion",
arguments: {
modelName: {
kind: "InputField",
name: "modelName",
inlineType: [0, ],
namedType: $Schema.String
},
filter: {
kind: "InputField",
name: "filter",
inlineType: [1, ],
namedType: $Schema.JSONObject
}
},
inlineType: [1, ],
namedType: $Schema.CustomViewSuggestionPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Whether a custom view has other subscribers than the current user in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewHasSubscribersPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViewHasSubscribers` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface customViewHasSubscribers {
kind: "OutputField",
name: "customViewHasSubscribers",
arguments: {
/**
* The identifier of the custom view.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.CustomViewHasSubscribersPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All comments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.comments` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.comment` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface comment {
kind: "OutputField",
name: "comment",
arguments: {
/**
* The identifier of the comment to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* [Deprecated] The issue for which to find the comment.
*
* @deprecated Not in use anymore, please use `id` or `hash` directly.
*/
issueId: {
kind: "InputField",
name: "issueId",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The hash of the comment to retrieve.
*/
hash: {
kind: "InputField",
name: "hash",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Comment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Fetch users belonging to this user account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.availableUsers` |
* | **Nullability** | Required |
*/
export interface availableUsers {
kind: "OutputField",
name: "availableUsers",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AuthResolverResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* User's active sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.authenticationSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface authenticationSessions {
kind: "OutputField",
name: "authenticationSessions",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.AuthenticationSessionResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Fetch SSO login URL for the email provided.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SsoUrlFromEmailResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.ssoUrlFromEmail` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*/
export interface ssoUrlFromEmail {
kind: "OutputField",
name: "ssoUrlFromEmail",
arguments: {
/**
* Whether the client is the desktop app.
*/
isDesktop: {
kind: "InputField",
name: "isDesktop",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* Type of identity provider.
*/
type: {
kind: "InputField",
name: "type",
inlineType: [1, ],
namedType: $Schema.IdentityProviderType
},
/**
* Email to query the SSO login URL by.
*/
email: {
kind: "InputField",
name: "email",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.SsoUrlFromEmailResponse
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* List of audit entry types.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuditEntryType}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.auditEntryTypes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface auditEntryTypes {
kind: "OutputField",
name: "auditEntryTypes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.AuditEntryType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All audit log entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuditEntryConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.auditEntries` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface auditEntries {
kind: "OutputField",
name: "auditEntries",
arguments: {
/**
* Filter returned audit entries.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.AuditEntryFilter
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
namedType: $Schema.AuditEntryConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All issue attachments.
*
* To get attachments for a given URL, use `attachmentsForURL` query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachments {
kind: "OutputField",
name: "attachments",
arguments: {
/**
* Filter returned attachments.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.AttachmentFilter
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
namedType: $Schema.AttachmentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
*
* One specific issue attachment.
* [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachment {
kind: "OutputField",
name: "attachment",
arguments: {
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Attachment
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Returns issue attachments for a given `url`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentsForURL` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface attachmentsForURL {
kind: "OutputField",
name: "attachmentsForURL",
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
},
/**
* The attachment URL.
*/
url: {
kind: "InputField",
name: "url",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
*
* Query an issue by its associated attachment, and its id.
*
*
* @deprecated Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentIssue` |
* | **⚠ Deprecated** | Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachmentIssue {
kind: "OutputField",
name: "attachmentIssue",
arguments: {
/**
* `id` of the attachment for which you'll want to get the issue for. [Deprecated] `url` as the `id` parameter.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Issue
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* [Internal] Get a list of all unique attachment sources in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentSourcesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentSources` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface attachmentSources {
kind: "OutputField",
name: "attachmentSources",
arguments: {
/**
* (optional) if provided will only return attachment sources for the given team.
*/
teamId: {
kind: "InputField",
name: "teamId",
inlineType: [0, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AttachmentSourcesPayload
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Asks web form settings by ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AsksWebSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.asksWebSetting` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface asksWebSetting {
kind: "OutputField",
name: "asksWebSetting",
arguments: {
/**
* The identifier of the Asks web settings.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AsksWebSettings
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* Get basic information for an application.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Application}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.applicationInfo` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface applicationInfo {
kind: "OutputField",
name: "applicationInfo",
arguments: {
/**
* The client ID of the application.
*/
clientId: {
kind: "InputField",
name: "clientId",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.Application
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All agent sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentSessions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface agentSessions {
kind: "OutputField",
name: "agentSessions",
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
namedType: $Schema.AgentSessionConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSession}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentSession {
kind: "OutputField",
name: "agentSession",
arguments: {
/**
* The identifier of the agent session to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AgentSession
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* All agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentActivities` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface agentActivities {
kind: "OutputField",
name: "agentActivities",
arguments: {
/**
* Filter returned agent activities.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.AgentActivityFilter
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
namedType: $Schema.AgentActivityConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Query}.
*
* A specific agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivity}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentActivity` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
export interface agentActivity {
kind: "OutputField",
name: "agentActivity",
arguments: {
/**
* The identifier of the agent activity to retrieve.
*/
id: {
kind: "InputField",
name: "id",
inlineType: [1, ],
namedType: $Schema.String
}
},
inlineType: [1, ],
namedType: $Schema.AgentActivity
}
