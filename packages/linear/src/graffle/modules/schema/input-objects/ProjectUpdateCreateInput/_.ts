import type * as $Fields from './fields.js'

export * as ProjectUpdateCreateInput from './fields.js'

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
export interface ProjectUpdateCreateInput {
kind: "InputObject",
name: "ProjectUpdateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
body: $Fields.body,
bodyData: $Fields.bodyData,
projectId: $Fields.projectId,
health: $Fields.health,
isDiffHidden: $Fields.isDiffHidden
},
type: {
id?: $Fields.id['type'],
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
projectId: $Fields.projectId['type'],
health?: $Fields.health['type'],
isDiffHidden?: $Fields.isDiffHidden['type']
}
}