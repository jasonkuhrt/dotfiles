import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CustomerNeedCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface CustomerNeedCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The uuid of the customer the need belongs to.
*/
customerId?: $Scalars.String<_$Context>,
/**
* The external ID of the customer the need belongs to.
*/
customerExternalId?: $Scalars.String<_$Context>,
/**
* The issue this need is referencing. Can be a UUID or issue identifier (e.g., 'LIN-123').
*/
issueId?: $Scalars.String<_$Context>,
/**
* [INTERNAL] The project this need is referencing.
*/
projectId?: $Scalars.String<_$Context>,
/**
* The comment this need is referencing.
*/
commentId?: $Scalars.String<_$Context>,
/**
* The attachment this need is referencing.
*/
attachmentId?: $Scalars.String<_$Context>,
/**
* Whether the customer need is important or not. 0 = Not important, 1 = Important.
*/
priority?: $Scalars.Float<_$Context>,
/**
* The content of the need in markdown format.
*/
body?: $Scalars.String<_$Context>,
/**
* [Internal] The content of the need as a Prosemirror document.
*/
bodyData?: $Scalars.JSON<_$Context>,
/**
* [DEPRECATED] Optional URL to the source of the customer need.
*
* @deprecated Use attachmentUrl instead
*/
url?: $Scalars.String<_$Context>,
/**
* Optional URL for the attachment associated with the customer need.
*/
attachmentUrl?: $Scalars.String<_$Context>,
/**
* Create need as a user with the provided name. This option is only available to OAuth applications creating needs in `actor=app` mode.
*/
createAsUser?: $Scalars.String<_$Context>,
/**
* Provide an external user avatar URL. Can only be used in conjunction with the `createAsUser` options. This option is only available to OAuth applications creating needs in `actor=app` mode.
*/
displayIconUrl?: $Scalars.String<_$Context>
}