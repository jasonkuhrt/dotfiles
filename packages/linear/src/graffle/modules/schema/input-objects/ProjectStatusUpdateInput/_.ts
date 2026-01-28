import type * as $Fields from './fields.js'

export * as ProjectStatusUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 6 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectStatusUpdateInput {
kind: "InputObject",
name: "ProjectStatusUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
type: $Fields.type,
indefinite: $Fields.indefinite
},
type: {
name?: $Fields.name['type'],
color?: $Fields.color['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
type?: $Fields.type['type'],
indefinite?: $Fields.indefinite['type']
}
}