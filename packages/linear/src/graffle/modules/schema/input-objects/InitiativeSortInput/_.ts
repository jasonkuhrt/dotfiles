import type * as $Fields from './fields.js'

export * as InitiativeSortInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Initiative sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeSortInput {
kind: "InputObject",
name: "InitiativeSortInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
manual: $Fields.manual,
updatedAt: $Fields.updatedAt,
createdAt: $Fields.createdAt,
targetDate: $Fields.targetDate,
health: $Fields.health,
healthUpdatedAt: $Fields.healthUpdatedAt,
owner: $Fields.owner
},
type: {
name?: $Fields.name['type'],
manual?: $Fields.manual['type'],
updatedAt?: $Fields.updatedAt['type'],
createdAt?: $Fields.createdAt['type'],
targetDate?: $Fields.targetDate['type'],
health?: $Fields.health['type'],
healthUpdatedAt?: $Fields.healthUpdatedAt['type'],
owner?: $Fields.owner['type']
}
}