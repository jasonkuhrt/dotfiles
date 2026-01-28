import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type id<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String$NonNull<_$Context>

export type name<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String$NonNull<_$Context>

export type isPrivate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type isShared<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type botAdded<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type teams<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.SlackAsksTeamSettingsInput<_$Context> | null | undefined>>>

export type autoCreateOnMessage<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type autoCreateOnEmoji<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type autoCreateOnBotMention<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type autoCreateTemplateId<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.String<_$Context>

export type postCancellationUpdates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type postCompletionUpdates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type postAcceptedFromTriageUpdates<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>

export type aiTitles<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> = $Scalars.Boolean<_$Context>
