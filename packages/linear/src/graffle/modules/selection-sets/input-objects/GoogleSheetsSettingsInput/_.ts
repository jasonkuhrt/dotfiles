import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GoogleSheetsSettingsInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface GoogleSheetsSettingsInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* [Deprecated] The ID of the exported Google Sheet.
*/
spreadsheetId?: $Scalars.String<_$Context>,
/**
* [Deprecated] The URL of the exported Google Sheet.
*/
spreadsheetUrl?: $Scalars.String<_$Context>,
/**
* [Deprecated] The ID of the target sheet (tab) within the Google Sheet.
*/
sheetId?: $Scalars.Float<_$Context>,
/**
* [Deprecated] The date of the most recent export.
*/
updatedIssuesAt?: $Scalars.DateTime<_$Context>,
/**
* The export settings for issues.
*/
issue?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GoogleSheetsExportSettings<_$Context> | null | undefined>,
/**
* The export settings for projects.
*/
project?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GoogleSheetsExportSettings<_$Context> | null | undefined>,
/**
* The export settings for initiatives.
*/
initiative?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.GoogleSheetsExportSettings<_$Context> | null | undefined>
}