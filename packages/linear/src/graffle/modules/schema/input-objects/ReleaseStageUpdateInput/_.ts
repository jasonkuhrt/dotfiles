import type * as $Fields from './fields.js'

export * as ReleaseStageUpdateInput from './fields.js'

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
export interface ReleaseStageUpdateInput {
kind: "InputObject",
name: "ReleaseStageUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
color: $Fields.color,
type: $Fields.type,
position: $Fields.position
},
type: {
name?: $Fields.name['type'],
color?: $Fields.color['type'],
type?: $Fields.type['type'],
position?: $Fields.position['type']
}
}