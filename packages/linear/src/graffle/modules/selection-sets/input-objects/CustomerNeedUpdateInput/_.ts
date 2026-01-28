import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CustomerNeedUpdateInput from './fields.js'

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
export interface CustomerNeedUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
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
* Whether the customer need is important or not. 0 = Not important, 1 = Important.
*/
priority?: $Scalars.Float<_$Context>,
/**
* Whether to also update the priority of needs from the same customer on the same issue/project.
*/
applyPriorityToRelatedNeeds?: $Scalars.Boolean<_$Context>,
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
attachmentUrl?: $Scalars.String<_$Context>
}