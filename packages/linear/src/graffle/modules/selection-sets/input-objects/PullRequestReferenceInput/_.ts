import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as PullRequestReferenceInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Input for referencing a pull request by repository and number.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface PullRequestReferenceInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The owner of the repository (e.g., organization or user name).
*/
repositoryOwner: $Scalars.String$NonNull<_$Context>,
/**
* The name of the repository.
*/
repositoryName: $Scalars.String$NonNull<_$Context>,
/**
* The pull request number.
*/
number: $Scalars.Float$NonNull<_$Context>
}