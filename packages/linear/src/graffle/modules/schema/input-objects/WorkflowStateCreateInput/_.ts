import type * as $Fields from './fields.js'

export * as WorkflowStateCreateInput from './fields.js'

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
export interface WorkflowStateCreateInput {
kind: "InputObject",
name: "WorkflowStateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
type: $Fields.type,
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position,
teamId: $Fields.teamId
},
type: {
id?: $Fields.id['type'],
type: $Fields.type['type'],
name: $Fields.name['type'],
color: $Fields.color['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type'],
teamId: $Fields.teamId['type']
}
}