import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'

export type * as WorkflowStateFilter from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Workflow state filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface WorkflowStateFilter<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* Comparator for the identifier.
*/
id?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IDComparator<_$Context> | null | undefined>,
/**
* Comparator for the created at date.
*/
createdAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the updated at date.
*/
updatedAt?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateComparator<_$Context> | null | undefined>,
/**
* Comparator for the workflow state name.
*/
name?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the workflow state description.
*/
description?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Comparator for the workflow state position.
*/
position?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.NumberComparator<_$Context> | null | undefined>,
/**
* Comparator for the workflow state type. Possible values are "triage", "backlog", "unstarted", "started", "completed", "canceled".
*/
type?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.StringComparator<_$Context> | null | undefined>,
/**
* Filters that the workflow states team must satisfy.
*/
team?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.TeamFilter<_$Context> | null | undefined>,
/**
* Filters that the workflow states issues must satisfy.
*/
issues?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.IssueCollectionFilter<_$Context> | null | undefined>,
/**
* Compound filters, all of which need to be matched by the workflow state.
*/
and?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateFilter<_$Context> | null | undefined>> | null | undefined>,
/**
* Compound filters, one of which need to be matched by the workflow state.
*/
or?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.WorkflowStateFilter<_$Context> | null | undefined>> | null | undefined>
}