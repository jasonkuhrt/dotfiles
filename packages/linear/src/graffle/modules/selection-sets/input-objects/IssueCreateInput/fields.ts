import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type id<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type title<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type description<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type descriptionData<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.JSON<_$Context>

export type assigneeId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type delegateId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type parentId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type priority<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Int<_$Context>

export type estimate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Int<_$Context>

export type subscriberIds<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>

export type labelIds<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>

export type teamId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String$NonNull<_$Context>

export type cycleId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type projectId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type projectMilestoneId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type lastAppliedTemplateId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type stateId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type referenceCommentId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type sourceCommentId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type sourcePullRequestCommentId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type boardOrder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type sortOrder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type prioritySortOrder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type subIssueSortOrder<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Float<_$Context>

export type dueDate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.TimelessDate<_$Context>

export type createAsUser<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type displayIconUrl<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type preserveSortOrderOnCreate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type createdAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.DateTime<_$Context>

export type slaBreachesAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.DateTime<_$Context>

export type slaStartedAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.DateTime<_$Context>

export type templateId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type completedAt<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.DateTime<_$Context>

export type slaType<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SLADayCountType | null | undefined>

export type useDefaultTemplate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>
