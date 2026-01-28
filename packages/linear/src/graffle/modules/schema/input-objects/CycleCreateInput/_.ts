import type * as $Fields from './fields.js'

export * as CycleCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface CycleCreateInput {
kind: "InputObject",
name: "CycleCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
teamId: $Fields.teamId,
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
completedAt: $Fields.completedAt
},
type: {
id?: $Fields.id['type'],
name?: $Fields.name['type'],
description?: $Fields.description['type'],
teamId: $Fields.teamId['type'],
startsAt: $Fields.startsAt['type'],
endsAt: $Fields.endsAt['type'],
completedAt?: $Fields.completedAt['type']
}
}