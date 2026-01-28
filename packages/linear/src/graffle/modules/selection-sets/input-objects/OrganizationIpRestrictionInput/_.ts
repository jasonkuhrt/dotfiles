import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as OrganizationIpRestrictionInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* [INTERNAL] Organization IP restriction configuration.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationIpRestrictionInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* IP range in CIDR format.
*/
range: $Scalars.String$NonNull<_$Context>,
/**
* Restriction type.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* Optional restriction description.
*/
description?: $Scalars.String<_$Context>,
/**
* Whether the restriction is enabled.
*/
enabled: $Scalars.Boolean$NonNull<_$Context>
}