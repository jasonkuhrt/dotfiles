import type * as $Fields from './fields.js'

export * as WorkflowStateUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface WorkflowStateUpdateInput {
kind: "InputObject",
name: "WorkflowStateUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
color: $Fields.color,
description: $Fields.description,
position: $Fields.position
},
type: {
name?: $Fields.name['type'],
color?: $Fields.color['type'],
description?: $Fields.description['type'],
position?: $Fields.position['type']
}
}