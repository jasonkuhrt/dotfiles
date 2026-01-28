import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TeamMembershipCreateInput from './fields.js'

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
export interface TeamMembershipCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The identifier of the user associated with the membership.
*/
userId: $Scalars.String$NonNull<_$Context>,
/**
* The identifier of the team associated with the membership.
*/
teamId: $Scalars.String$NonNull<_$Context>,
/**
* Internal. Whether the user is the owner of the team.
*/
owner?: $Scalars.Boolean<_$Context>,
/**
* The position of the item in the users list.
*/
sortOrder?: $Scalars.Float<_$Context>
}