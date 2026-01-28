import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as EntityExternalLinkCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface EntityExternalLinkCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The URL of the link.
*/
url: $Scalars.String$NonNull<_$Context>,
/**
* The label for the link.
*/
label: $Scalars.String$NonNull<_$Context>,
/**
* The initiative associated with the link.
*/
initiativeId?: $Scalars.String<_$Context>,
/**
* The project associated with the link.
*/
projectId?: $Scalars.String<_$Context>,
/**
* [Internal] The team associated with the link.
*/
teamId?: $Scalars.String<_$Context>,
/**
* [Internal] The release associated with the link.
*/
releaseId?: $Scalars.String<_$Context>,
/**
* [Internal] The cycle associated with the link.
*/
cycleId?: $Scalars.String<_$Context>,
/**
* [Internal] The resource folder containing the link.
*/
resourceFolderId?: $Scalars.String<_$Context>,
/**
* The order of the item in the entities resources list.
*/
sortOrder?: $Scalars.Float<_$Context>
}