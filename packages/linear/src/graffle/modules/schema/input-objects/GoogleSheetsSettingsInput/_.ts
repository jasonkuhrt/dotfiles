import type * as $Fields from './fields.js'

export * as GoogleSheetsSettingsInput from './fields.js'

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
export interface GoogleSheetsSettingsInput {
kind: "InputObject",
name: "GoogleSheetsSettingsInput",
isAllFieldsNullable: true,
fields: {
spreadsheetId: $Fields.spreadsheetId,
spreadsheetUrl: $Fields.spreadsheetUrl,
sheetId: $Fields.sheetId,
updatedIssuesAt: $Fields.updatedIssuesAt,
issue: $Fields.issue,
project: $Fields.project,
initiative: $Fields.initiative
},
type: {
spreadsheetId?: $Fields.spreadsheetId['type'],
spreadsheetUrl?: $Fields.spreadsheetUrl['type'],
sheetId?: $Fields.sheetId['type'],
updatedIssuesAt?: $Fields.updatedIssuesAt['type'],
issue?: $Fields.issue['type'],
project?: $Fields.project['type'],
initiative?: $Fields.initiative['type']
}
}