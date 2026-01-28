import type * as $Fields from './fields.js'

export * as ProjectSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectSortInput {
kind: "InputObject",
name: "ProjectSortInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
status: $Fields.status,
priority: $Fields.priority,
manual: $Fields.manual,
targetDate: $Fields.targetDate,
startDate: $Fields.startDate,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
health: $Fields.health,
lead: $Fields.lead
},
type: {
name?: $Fields.name['type'],
status?: $Fields.status['type'],
priority?: $Fields.priority['type'],
manual?: $Fields.manual['type'],
targetDate?: $Fields.targetDate['type'],
startDate?: $Fields.startDate['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
health?: $Fields.health['type'],
lead?: $Fields.lead['type']
}
}