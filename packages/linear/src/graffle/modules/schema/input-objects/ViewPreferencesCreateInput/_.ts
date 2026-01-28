import type * as $Fields from './fields.js'

export * as ViewPreferencesCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface ViewPreferencesCreateInput {
kind: "InputObject",
name: "ViewPreferencesCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
type: $Fields.type,
viewType: $Fields.viewType,
preferences: $Fields.preferences,
insights: $Fields.insights,
teamId: $Fields.teamId,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
labelId: $Fields.labelId,
projectLabelId: $Fields.projectLabelId,
cycleId: $Fields.cycleId,
customViewId: $Fields.customViewId,
userId: $Fields.userId
},
type: {
id?: $Fields.id['type'],
type: $Fields.type['type'],
viewType: $Fields.viewType['type'],
preferences: $Fields.preferences['type'],
insights?: $Fields.insights['type'],
teamId?: $Fields.teamId['type'],
projectId?: $Fields.projectId['type'],
initiativeId?: $Fields.initiativeId['type'],
labelId?: $Fields.labelId['type'],
projectLabelId?: $Fields.projectLabelId['type'],
cycleId?: $Fields.cycleId['type'],
customViewId?: $Fields.customViewId['type'],
userId?: $Fields.userId['type']
}
}