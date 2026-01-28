import type * as $Fields from './fields.js'

export * as CycleUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface CycleUpdateInput {
kind: "InputObject",
name: "CycleUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
startsAt: $Fields.startsAt,
endsAt: $Fields.endsAt,
completedAt: $Fields.completedAt
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
startsAt?: $Fields.startsAt['type'],
endsAt?: $Fields.endsAt['type'],
completedAt?: $Fields.completedAt['type']
}
}