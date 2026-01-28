import type * as $Fields from './fields.js'

export * as CustomViewCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 15 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomViewCreateInput {
kind: "InputObject",
name: "CustomViewCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
description: $Fields.description,
icon: $Fields.icon,
color: $Fields.color,
teamId: $Fields.teamId,
projectId: $Fields.projectId,
initiativeId: $Fields.initiativeId,
ownerId: $Fields.ownerId,
filters: $Fields.filters,
filterData: $Fields.filterData,
projectFilterData: $Fields.projectFilterData,
initiativeFilterData: $Fields.initiativeFilterData,
feedItemFilterData: $Fields.feedItemFilterData,
shared: $Fields.shared
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
icon?: $Fields.icon['type'],
color?: $Fields.color['type'],
teamId?: $Fields.teamId['type'],
projectId?: $Fields.projectId['type'],
initiativeId?: $Fields.initiativeId['type'],
ownerId?: $Fields.ownerId['type'],
filters?: $Fields.filters['type'],
filterData?: $Fields.filterData['type'],
projectFilterData?: $Fields.projectFilterData['type'],
initiativeFilterData?: $Fields.initiativeFilterData['type'],
feedItemFilterData?: $Fields.feedItemFilterData['type'],
shared?: $Fields.shared['type']
}
}