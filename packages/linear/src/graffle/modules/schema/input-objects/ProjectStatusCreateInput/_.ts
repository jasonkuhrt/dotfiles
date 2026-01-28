import type * as $Fields from './fields.js'

export * as ProjectStatusCreateInput from './fields.js'

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
export interface ProjectStatusCreateInput {
kind: "InputObject",
name: "ProjectStatusCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
indefinite: $Fields.indefinite
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
color: $Fields.color['type'],
description?: $Fields.description['type'],
position: $Fields.position['type'],
type: $Fields.type['type'],
indefinite?: $Fields.indefinite['type']
}
}