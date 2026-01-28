import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as UserUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface UserUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the user.
*/
name?: $Scalars.String<_$Context>,
/**
* The display name of the user.
*/
displayName?: $Scalars.String<_$Context>,
/**
* The avatar image URL of the user.
*/
avatarUrl?: $Scalars.String<_$Context>,
/**
* The user description or a short bio.
*/
description?: $Scalars.String<_$Context>,
/**
* The emoji part of the user status.
*/
statusEmoji?: $Scalars.String<_$Context>,
/**
* The label part of the user status.
*/
statusLabel?: $Scalars.String<_$Context>,
/**
* When the user status should be cleared.
*/
statusUntilAt?: $Scalars.DateTime<_$Context>,
/**
* The local timezone of the user.
*/
timezone?: $Scalars.String<_$Context>
}