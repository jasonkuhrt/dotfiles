import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as CandidateRepository from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 2 |
* | **All Fields Nullable** | No |
*/
export interface CandidateRepository<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The full name of the repository in owner/name format (e.g., 'acme/backend').
*/
repositoryFullName: $Scalars.String$NonNull<_$Context>,
/**
* Hostname of the Git service (e.g., 'github.com', 'github.company.com').
*/
hostname: $Scalars.String$NonNull<_$Context>
}