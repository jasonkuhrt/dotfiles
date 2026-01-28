import type * as $Fields from './fields.js'

export * as GoogleSheetsExportSettings from './fields.js'

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
export interface GoogleSheetsExportSettings {
kind: "InputObject",
name: "GoogleSheetsExportSettings",
isAllFieldsNullable: true,
fields: {
enabled: $Fields.enabled,
spreadsheetId: $Fields.spreadsheetId,
spreadsheetUrl: $Fields.spreadsheetUrl,
sheetId: $Fields.sheetId,
updatedAt: $Fields.updatedAt
},
type: {
enabled?: $Fields.enabled['type'],
spreadsheetId?: $Fields.spreadsheetId['type'],
spreadsheetUrl?: $Fields.spreadsheetUrl['type'],
sheetId?: $Fields.sheetId['type'],
updatedAt?: $Fields.updatedAt['type']
}
}