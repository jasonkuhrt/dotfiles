import type * as $Fields from './fields.js'

export * as NullableCycleFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Cycle filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 20 |
* | **All Fields Nullable** | Yes |
*/
export interface NullableCycleFilter {
kind: "InputObject",
name: "NullableCycleFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
number: $Fields.number,
name: $Fields.name,
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
completedAt: $Fields.completedAt,
isActive: $Fields.isActive,
isInCooldown: $Fields.isInCooldown,
isNext: $Fields.isNext,
isPrevious: $Fields.isPrevious,
isFuture: $Fields.isFuture,
isPast: $Fields.isPast,
team: $Fields.team,
issues: $Fields.issues,
inheritedFromId: $Fields.inheritedFromId,
null: $Fields.null,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
number?: $Fields.number['type'],
name?: $Fields.name['type'],
startsAt?: $Fields.startsAt['type'],
endsAt?: $Fields.endsAt['type'],
completedAt?: $Fields.completedAt['type'],
isActive?: $Fields.isActive['type'],
isInCooldown?: $Fields.isInCooldown['type'],
isNext?: $Fields.isNext['type'],
isPrevious?: $Fields.isPrevious['type'],
isFuture?: $Fields.isFuture['type'],
isPast?: $Fields.isPast['type'],
team?: $Fields.team['type'],
issues?: $Fields.issues['type'],
inheritedFromId?: $Fields.inheritedFromId['type'],
null?: $Fields.null['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}