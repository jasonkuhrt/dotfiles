import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* [Deprecated] The ID of the exported Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.spreadsheetId` |
* | **Nullability** | Optional |
*/
export interface spreadsheetId {
kind: "InputField",
name: "spreadsheetId",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* [Deprecated] The URL of the exported Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.spreadsheetUrl` |
* | **Nullability** | Optional |
*/
export interface spreadsheetUrl {
kind: "InputField",
name: "spreadsheetUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* [Deprecated] The ID of the target sheet (tab) within the Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.sheetId` |
* | **Nullability** | Optional |
*/
export interface sheetId {
kind: "InputField",
name: "sheetId",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* [Deprecated] The date of the most recent export.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.updatedIssuesAt` |
* | **Nullability** | Optional |
*/
export interface updatedIssuesAt {
kind: "InputField",
name: "updatedIssuesAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* The export settings for issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.issue` |
* | **Nullability** | Optional |
*/
export interface issue {
kind: "InputField",
name: "issue",
inlineType: [0, ],
namedType: $Schema.GoogleSheetsExportSettings,
type: $Schema.GoogleSheetsExportSettings['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* The export settings for projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.project` |
* | **Nullability** | Optional |
*/
export interface project {
kind: "InputField",
name: "project",
inlineType: [0, ],
namedType: $Schema.GoogleSheetsExportSettings,
type: $Schema.GoogleSheetsExportSettings['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsSettingsInput}.
*
* The export settings for initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsSettingsInput} |
* | **Path** | `GoogleSheetsSettingsInput.initiative` |
* | **Nullability** | Optional |
*/
export interface initiative {
kind: "InputField",
name: "initiative",
inlineType: [0, ],
namedType: $Schema.GoogleSheetsExportSettings,
type: $Schema.GoogleSheetsExportSettings['type'] | null | undefined
}