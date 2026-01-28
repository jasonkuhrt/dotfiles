import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as AttachmentUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface AttachmentUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The attachment title.
*/
title: $Scalars.String$NonNull<_$Context>,
/**
* The attachment subtitle.
*/
subtitle?: $Scalars.String<_$Context>,
/**
* Attachment metadata object with string and number values.
*/
metadata?: $Scalars.JSONObject<_$Context>,
/**
* An icon url to display with the attachment. Should be of jpg or png format. Maximum of 1MB in size. Dimensions should be 20x20px for optimal display quality.
*/
iconUrl?: $Scalars.String<_$Context>
}