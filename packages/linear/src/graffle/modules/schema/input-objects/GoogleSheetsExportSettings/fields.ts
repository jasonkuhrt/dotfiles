import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsExportSettings}.
*
* Whether the export is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Path** | `GoogleSheetsExportSettings.enabled` |
* | **Nullability** | Optional |
*/
export interface enabled {
kind: "InputField",
name: "enabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsExportSettings}.
*
* The ID of the exported Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Path** | `GoogleSheetsExportSettings.spreadsheetId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsExportSettings}.
*
* The URL of the exported Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Path** | `GoogleSheetsExportSettings.spreadsheetUrl` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsExportSettings}.
*
* The ID of the target sheet (tab) within the Google Sheet.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Path** | `GoogleSheetsExportSettings.sheetId` |
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
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.GoogleSheetsExportSettings}.
*
* The date of the most recent export.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.GoogleSheetsExportSettings} |
* | **Path** | `GoogleSheetsExportSettings.updatedAt` |
* | **Nullability** | Optional |
*/
export interface updatedAt {
kind: "InputField",
name: "updatedAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}