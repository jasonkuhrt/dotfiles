import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CreateOrganizationInput from './fields.js'

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
export interface CreateOrganizationInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the organization.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The URL key of the organization.
*/
urlKey: $Scalars.String$NonNull<_$Context>,
/**
* Whether the organization should allow email domain access.
*/
domainAccess?: $Scalars.Boolean<_$Context>,
/**
* The timezone of the organization, passed in by client.
*/
timezone?: $Scalars.String<_$Context>,
/**
* JSON serialized UTM parameters associated with the creation of the workspace.
*/
utm?: $Scalars.String<_$Context>
}