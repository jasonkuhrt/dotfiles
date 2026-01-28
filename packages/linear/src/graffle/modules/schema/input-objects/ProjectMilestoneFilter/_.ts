import type * as $Fields from './fields.js'

export * as ProjectMilestoneFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project milestone filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectMilestoneFilter {
kind: "InputObject",
name: "ProjectMilestoneFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
targetDate: $Fields.targetDate,
project: $Fields.project,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
targetDate?: $Fields.targetDate['type'],
project?: $Fields.project['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}