import type * as $Fields from './fields.js'

export * as TemplateCreateInput from './fields.js'

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
export interface TemplateCreateInput {
kind: "InputObject",
name: "TemplateCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
type: $Fields.type,
teamId: $Fields.teamId,
name: $Fields.name,
description: $Fields.description,
templateData: $Fields.templateData,
sortOrder: $Fields.sortOrder
},
type: {
id?: $Fields.id['type'],
type: $Fields.type['type'],
teamId?: $Fields.teamId['type'],
name: $Fields.name['type'],
description?: $Fields.description['type'],
templateData: $Fields.templateData['type'],
sortOrder?: $Fields.sortOrder['type']
}
}