import type * as $Fields from './fields.js'

export * as GongRecordingImportConfigInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 1 |
* | **All Fields Nullable** | Yes |
*/
export interface GongRecordingImportConfigInput {
kind: "InputObject",
name: "GongRecordingImportConfigInput",
isAllFieldsNullable: true,
fields: {
teamId: $Fields.teamId
},
type: {
teamId?: $Fields.teamId['type']
}
}