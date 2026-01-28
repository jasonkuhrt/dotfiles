import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AttachmentCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The attachment title.
*/
title: $Scalars.String$NonNull<_$Context>,
/**
* The attachment subtitle.
*/
subtitle?: $Scalars.String<_$Context>,
/**
* Attachment location which is also used as an unique identifier for the attachment. If another attachment is created with the same `url` value, existing record is updated instead.
*/
url: $Scalars.String$NonNull<_$Context>,
/**
* The issue to associate the attachment with. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId: $Scalars.String$NonNull<_$Context>,
/**
* An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality.
*/
iconUrl?: $Scalars.String<_$Context>,
/**
* Attachment metadata object with string and number values.
*/
metadata?: $Scalars.JSONObject<_$Context>,
/**
* Indicates if attachments for the same source application should be grouped in the Linear UI.
*/
groupBySource?: $Scalars.Boolean<_$Context>,
/**
* Create a linked comment with markdown body.
*/
commentBody?: $Scalars.String<_$Context>,
/**
* [Internal] Create a linked comment with Prosemirror body. Please use `commentBody` instead.
*/
commentBodyData?: $Scalars.JSONObject<_$Context>,
/**
* Create attachment as a user with the provided name. This option is only available to OAuth applications creating attachments in `actor=application` mode.
*/
createAsUser?: $Scalars.String<_$Context>
}