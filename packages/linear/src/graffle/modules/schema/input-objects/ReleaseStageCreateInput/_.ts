import type * as $Fields from './fields.js'

export * as ReleaseStageCreateInput from './fields.js'

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
export interface ReleaseStageCreateInput {
kind: "InputObject",
name: "ReleaseStageCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
color: $Fields.color,
type: $Fields.type,
position: $Fields.position,
pipelineId: $Fields.pipelineId
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
color: $Fields.color['type'],
type: $Fields.type['type'],
position: $Fields.position['type'],
pipelineId: $Fields.pipelineId['type']
}
}