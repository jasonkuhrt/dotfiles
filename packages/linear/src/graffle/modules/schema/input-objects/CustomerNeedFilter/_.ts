import type * as $Fields from './fields.js'

export * as CustomerNeedFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Customer filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerNeedFilter {
kind: "InputObject",
name: "CustomerNeedFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
priority: $Fields.priority,
project: $Fields.project,
issue: $Fields.issue,
comment: $Fields.comment,
customer: $Fields.customer,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
priority?: $Fields.priority['type'],
project?: $Fields.project['type'],
issue?: $Fields.issue['type'],
comment?: $Fields.comment['type'],
customer?: $Fields.customer['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}