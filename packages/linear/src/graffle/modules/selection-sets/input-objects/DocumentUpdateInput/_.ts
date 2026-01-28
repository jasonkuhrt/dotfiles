import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as DocumentUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 17 |
* | **All Fields Nullable** | Yes |
*/
export interface DocumentUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The title of the document.
*/
title?: $Scalars.String<_$Context>,
/**
* The icon of the document.
*/
icon?: $Scalars.String<_$Context>,
/**
* The color of the icon.
*/
color?: $Scalars.String<_$Context>,
/**
* [Internal] The document content as a Prosemirror document.
*
* @deprecated Use content instead
*/
contentData?: $Scalars.JSONObject<_$Context>,
/**
* The document content as markdown.
*/
content?: $Scalars.String<_$Context>,
/**
* Related project for the document.
*/
projectId?: $Scalars.String<_$Context>,
/**
* [Internal] Related initiative for the document.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* [Internal] Related team for the document.
*/
teamId?: $Scalars.String<_$Context>,
/**
* Related issue for the document. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* [Internal] Related release for the document.
*/
releaseId?: $Scalars.String<_$Context>,
/**
* [Internal] Related cycle for the document.
*/
cycleId?: $Scalars.String<_$Context>,
/**
* [Internal] The resource folder containing the document.
*/
resourceFolderId?: $Scalars.String<_$Context>,
/**
* The ID of the last template applied to the document.
*/
lastAppliedTemplateId?: $Scalars.String<_$Context>,
/**
* The time at which the document was hidden.
*/
hiddenAt?: $Scalars.DateTime<_$Context>,
/**
* The order of the item in the resources list.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* Whether the document has been trashed.
*/
trashed?: $Scalars.Boolean<_$Context>,
/**
* [INTERNAL] The identifiers of the users subscribing to this document.
*/
subscriberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}