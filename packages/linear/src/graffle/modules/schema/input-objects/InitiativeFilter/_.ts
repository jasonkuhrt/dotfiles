import type * as $Fields from './fields.js'

export * as InitiativeFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Initiative filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeFilter {
kind: "InputObject",
name: "InitiativeFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
name: $Fields.name,
slugId: $Fields.slugId,
creator: $Fields.creator,
status: $Fields.status,
teams: $Fields.teams,
owner: $Fields.owner,
targetDate: $Fields.targetDate,
health: $Fields.health,
healthWithAge: $Fields.healthWithAge,
activityType: $Fields.activityType,
ancestors: $Fields.ancestors,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
name?: $Fields.name['type'],
slugId?: $Fields.slugId['type'],
creator?: $Fields.creator['type'],
status?: $Fields.status['type'],
teams?: $Fields.teams['type'],
owner?: $Fields.owner['type'],
targetDate?: $Fields.targetDate['type'],
health?: $Fields.health['type'],
healthWithAge?: $Fields.healthWithAge['type'],
activityType?: $Fields.activityType['type'],
ancestors?: $Fields.ancestors['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}