import type * as $Fields from './fields.js'

export * as TemplateUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface TemplateUpdateInput {
kind: "InputObject",
name: "TemplateUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
description: $Fields.description,
teamId: $Fields.teamId,
templateData: $Fields.templateData,
sortOrder: $Fields.sortOrder
},
type: {
name?: $Fields.name['type'],
description?: $Fields.description['type'],
teamId?: $Fields.teamId['type'],
templateData?: $Fields.templateData['type'],
sortOrder?: $Fields.sortOrder['type']
}
}