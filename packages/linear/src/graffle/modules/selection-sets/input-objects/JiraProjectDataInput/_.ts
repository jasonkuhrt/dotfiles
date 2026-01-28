import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as JiraProjectDataInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface JiraProjectDataInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The Jira id for this project.
*/
id: $Scalars.String$NonNull<_$Context>,
/**
* The Jira key for this project, such as ENG.
*/
key: $Scalars.String$NonNull<_$Context>,
/**
* The Jira name for this project, such as Engineering.
*/
name: $Scalars.String$NonNull<_$Context>
}