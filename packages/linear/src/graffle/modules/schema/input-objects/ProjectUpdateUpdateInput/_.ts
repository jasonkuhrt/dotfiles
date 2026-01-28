import type * as $Fields from './fields.js'

export * as ProjectUpdateUpdateInput from './fields.js'

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
export interface ProjectUpdateUpdateInput {
kind: "InputObject",
name: "ProjectUpdateUpdateInput",
isAllFieldsNullable: true,
fields: {
body: $Fields.body,
bodyData: $Fields.bodyData,
health: $Fields.health,
isDiffHidden: $Fields.isDiffHidden
},
type: {
body?: $Fields.body['type'],
bodyData?: $Fields.bodyData['type'],
health?: $Fields.health['type'],
isDiffHidden?: $Fields.isDiffHidden['type']
}
}