import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as ProjectSortInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Project sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 10 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectSortInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Sort by project name
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectNameSort<_$Context> | null | undefined>,
/**
* Sort by project status
*/
status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectStatusSort<_$Context> | null | undefined>,
/**
* Sort by project priority
*/
priority?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectPrioritySort<_$Context> | null | undefined>,
/**
* Sort by manual order
*/
manual?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectManualSort<_$Context> | null | undefined>,
/**
* Sort by project target date
*/
targetDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TargetDateSort<_$Context> | null | undefined>,
/**
* Sort by project start date
*/
startDate?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StartDateSort<_$Context> | null | undefined>,
/**
* Sort by project creation date
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectCreatedAtSort<_$Context> | null | undefined>,
/**
* Sort by project update date
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectUpdatedAtSort<_$Context> | null | undefined>,
/**
* Sort by project health status.
*/
health?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectHealthSort<_$Context> | null | undefined>,
/**
* Sort by project lead name.
*/
lead?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.ProjectLeadSort<_$Context> | null | undefined>
}