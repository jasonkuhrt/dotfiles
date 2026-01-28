import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as WebhookUpdateInput from './fields.js'

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
export interface WebhookUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Label for the webhook.
*/
label?: $Scalars.String<_$Context>,
/**
* A secret token used to sign the webhook payload.
*/
secret?: $Scalars.String<_$Context>,
/**
* Whether this webhook is enabled.
*/
enabled?: $Scalars.Boolean<_$Context>,
/**
* The URL that will be called on data changes.
*/
url?: $Scalars.String<_$Context>,
/**
* List of resources the webhook should subscribe to.
*/
resourceTypes?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}