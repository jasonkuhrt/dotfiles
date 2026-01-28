import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as GoogleSheetsExportSettings from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 5 |
* | **All Fields Nullable** | Yes |
*/
export interface GoogleSheetsExportSettings<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Whether the export is enabled.
*/
enabled?: $Scalars.Boolean<_$Context>,
/**
* The ID of the exported Google Sheet.
*/
spreadsheetId?: $Scalars.String<_$Context>,
/**
* The URL of the exported Google Sheet.
*/
spreadsheetUrl?: $Scalars.String<_$Context>,
/**
* The ID of the target sheet (tab) within the Google Sheet.
*/
sheetId?: $Scalars.Float<_$Context>,
/**
* The date of the most recent export.
*/
updatedAt?: $Scalars.DateTime<_$Context>
}