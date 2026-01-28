import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as Team from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An organizational unit that contains issues.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 84 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Team<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.createdAt` |
* | **Nullability** | Required |
*/
createdAt?: $Fields.createdAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.createdAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.updatedAt` |
* | **Nullability** | Required |
*/
updatedAt?: $Fields.updatedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updatedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.name` |
* | **Nullability** | Required |
*/
name?: $Fields.name.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.name<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team's unique key. The key is used in URLs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.key` |
* | **Nullability** | Required |
*/
key?: $Fields.key.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.key<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team's description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.description` |
* | **Nullability** | Optional |
*/
description?: $Fields.description.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.description<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The icon of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.icon` |
* | **Nullability** | Optional |
*/
icon?: $Fields.icon.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.icon<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The team's color.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.color` |
* | **Nullability** | Optional |
*/
color?: $Fields.color.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.color<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The organization that the team is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.organization` |
* | **Nullability** | Required |
*/
organization?: $Fields.organization.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.organization<_$Context>>
/**
* [Internal] The team's parent team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.parent` |
* | **Nullability** | Optional |
*/
parent?: $Fields.parent.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.parent<_$Context>>
/**
* [Internal] The team's sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Team}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.children` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
children?: $Fields.children.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.children<_$Context>>
/**
* Whether the team uses cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cyclesEnabled` |
* | **Nullability** | Required |
*/
cyclesEnabled?: $Fields.cyclesEnabled.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cyclesEnabled<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The day of the week that a new cycle starts.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleStartDay` |
* | **Nullability** | Required |
*/
cycleStartDay?: $Fields.cycleStartDay.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleStartDay<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The duration of a cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleDuration` |
* | **Nullability** | Required |
*/
cycleDuration?: $Fields.cycleDuration.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleDuration<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The cooldown time after each cycle in weeks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleCooldownTime` |
* | **Nullability** | Required |
*/
cycleCooldownTime?: $Fields.cycleCooldownTime.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleCooldownTime<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Auto assign started issues to current cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleIssueAutoAssignStarted` |
* | **Nullability** | Required |
*/
cycleIssueAutoAssignStarted?: $Fields.cycleIssueAutoAssignStarted.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleIssueAutoAssignStarted<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Auto assign completed issues to current cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleIssueAutoAssignCompleted` |
* | **Nullability** | Required |
*/
cycleIssueAutoAssignCompleted?: $Fields.cycleIssueAutoAssignCompleted.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleIssueAutoAssignCompleted<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Auto assign issues to current cycle if in active status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleLockToActive` |
* | **Nullability** | Required |
*/
cycleLockToActive?: $Fields.cycleLockToActive.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleLockToActive<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* How many upcoming cycles to create.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.upcomingCycleCount` |
* | **Nullability** | Required |
*/
upcomingCycleCount?: $Fields.upcomingCycleCount.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.upcomingCycleCount<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The timezone of the team. Defaults to "America/Los_Angeles"
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.timezone` |
* | **Nullability** | Required |
*/
timezone?: $Fields.timezone.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.timezone<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the team should inherit its workflow statuses from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.inheritWorkflowStatuses` |
* | **Nullability** | Required |
*/
inheritWorkflowStatuses?: $Fields.inheritWorkflowStatuses.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inheritWorkflowStatuses<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the team should inherit its estimation settings from its parent. Only applies to sub-teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.inheritIssueEstimation` |
* | **Nullability** | Required |
*/
inheritIssueEstimation?: $Fields.inheritIssueEstimation.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inheritIssueEstimation<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The issue estimation type to use. Must be one of "notUsed", "exponential", "fibonacci", "linear", "tShirt".
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueEstimationType` |
* | **Nullability** | Required |
*/
issueEstimationType?: $Fields.issueEstimationType.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueEstimationType<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [DEPRECATED] Whether issues without priority should be sorted first.
*
* @deprecated This setting is no longer in use.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueOrderingNoPriorityFirst` |
* | **⚠ Deprecated** | This setting is no longer in use. |
* | **Nullability** | Required |
*/
issueOrderingNoPriorityFirst?: $Fields.issueOrderingNoPriorityFirst.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueOrderingNoPriorityFirst<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to allow zeros in issues estimates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueEstimationAllowZero` |
* | **Nullability** | Required |
*/
issueEstimationAllowZero?: $Fields.issueEstimationAllowZero.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueEstimationAllowZero<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Where to move issues when changing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.setIssueSortOrderOnStateChange` |
* | **Nullability** | Required |
*/
setIssueSortOrderOnStateChange?: $Fields.setIssueSortOrderOnStateChange.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.setIssueSortOrderOnStateChange<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to add additional points to the estimate scale.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueEstimationExtended` |
* | **Nullability** | Required |
*/
issueEstimationExtended?: $Fields.issueEstimationExtended.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueEstimationExtended<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* What to use as a default estimate for unestimated issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultIssueEstimate` |
* | **Nullability** | Required |
*/
defaultIssueEstimate?: $Fields.defaultIssueEstimate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultIssueEstimate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether triage mode is enabled for the team or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.triageEnabled` |
* | **Nullability** | Required |
*/
triageEnabled?: $Fields.triageEnabled.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageEnabled<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether an issue needs to have a priority set before leaving triage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.requirePriorityToLeaveTriage` |
* | **Nullability** | Required |
*/
requirePriorityToLeaveTriage?: $Fields.requirePriorityToLeaveTriage.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.requirePriorityToLeaveTriage<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The default workflow state into which issues are set when they are opened by team members.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultIssueState` |
* | **Nullability** | Optional |
*/
defaultIssueState?: $Fields.defaultIssueState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultIssueState<_$Context>>
/**
* The default template to use for new issues created by members of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultTemplateForMembers` |
* | **Nullability** | Optional |
*/
defaultTemplateForMembers?: $Fields.defaultTemplateForMembers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultTemplateForMembers<_$Context>>
/**
* The id of the default template to use for new issues created by members of the team.
*
* @deprecated Use defaultTemplateForMembers instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultTemplateForMembersId` |
* | **⚠ Deprecated** | Use defaultTemplateForMembers instead |
* | **Nullability** | Optional |
*/
defaultTemplateForMembersId?: $Fields.defaultTemplateForMembersId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultTemplateForMembersId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The default template to use for new issues created by non-members of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultTemplateForNonMembers` |
* | **Nullability** | Optional |
*/
defaultTemplateForNonMembers?: $Fields.defaultTemplateForNonMembers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultTemplateForNonMembers<_$Context>>
/**
* The id of the default template to use for new issues created by non-members of the team.
*
* @deprecated Use defaultTemplateForNonMembers instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultTemplateForNonMembersId` |
* | **⚠ Deprecated** | Use defaultTemplateForNonMembers instead |
* | **Nullability** | Optional |
*/
defaultTemplateForNonMembersId?: $Fields.defaultTemplateForNonMembersId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultTemplateForNonMembersId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The default template to use for new projects created for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.defaultProjectTemplate` |
* | **Nullability** | Optional |
*/
defaultProjectTemplate?: $Fields.defaultProjectTemplate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.defaultProjectTemplate<_$Context>>
/**
* The workflow state into which issues are set when they are opened by non-team members or integrations if triage is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.triageIssueState` |
* | **Nullability** | Optional |
*/
triageIssueState?: $Fields.triageIssueState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageIssueState<_$Context>>
/**
* Whether the team is private or not.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.private` |
* | **Nullability** | Required |
*/
private?: $Fields.private.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.private<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether all members in the workspace can join the team. Only used for public teams.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.allMembersCanJoin` |
* | **Nullability** | Optional |
*/
allMembersCanJoin?: $Fields.allMembersCanJoin.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.allMembersCanJoin<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Security settings for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.securitySettings` |
* | **Nullability** | Required |
*/
securitySettings?: $Fields.securitySettings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.securitySettings<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Facets associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Facet}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.facets` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
facets?: $Fields.facets.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.facets<_$Context>>
/**
* [Internal] Posts associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Post}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.posts` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
posts?: $Fields.posts.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.posts<_$Context>>
/**
* Whether the team is managed by SCIM integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.scimManaged` |
* | **Nullability** | Required |
*/
scimManaged?: $Fields.scimManaged.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.scimManaged<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The SCIM group name for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.scimGroupName` |
* | **Nullability** | Optional |
*/
scimGroupName?: $Fields.scimGroupName.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.scimGroupName<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] The progress history of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.progressHistory` |
* | **Nullability** | Required |
*/
progressHistory?: $Fields.progressHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.progressHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] The current progress of the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.currentProgress` |
* | **Nullability** | Required |
*/
currentProgress?: $Fields.currentProgress.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.currentProgress<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The workflow state into which issues are moved when a PR has been opened as draft.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.draftWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
draftWorkflowState?: $Fields.draftWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.draftWorkflowState<_$Context>>
/**
* The workflow state into which issues are moved when a PR has been opened.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.startWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
startWorkflowState?: $Fields.startWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startWorkflowState<_$Context>>
/**
* The workflow state into which issues are moved when a review has been requested for the PR.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.reviewWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
reviewWorkflowState?: $Fields.reviewWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reviewWorkflowState<_$Context>>
/**
* The workflow state into which issues are moved when a PR is ready to be merged.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.mergeableWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
mergeableWorkflowState?: $Fields.mergeableWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.mergeableWorkflowState<_$Context>>
/**
* The workflow state into which issues are moved when a PR has been merged.
*
* @deprecated Use team.gitAutomationStates instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.mergeWorkflowState` |
* | **⚠ Deprecated** | Use team.gitAutomationStates instead. |
* | **Nullability** | Optional |
*/
mergeWorkflowState?: $Fields.mergeWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.mergeWorkflowState<_$Context>>
/**
* Whether to group recent issue history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.groupIssueHistory` |
* | **Nullability** | Required |
*/
groupIssueHistory?: $Fields.groupIssueHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.groupIssueHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to enable resolved thread AI summaries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.aiThreadSummariesEnabled` |
* | **Nullability** | Required |
*/
aiThreadSummariesEnabled?: $Fields.aiThreadSummariesEnabled.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.aiThreadSummariesEnabled<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to enable AI discussion summaries for issues in this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.aiDiscussionSummariesEnabled` |
* | **Nullability** | Required |
*/
aiDiscussionSummariesEnabled?: $Fields.aiDiscussionSummariesEnabled.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.aiDiscussionSummariesEnabled<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to send new issue notifications to Slack.
*
* @deprecated No longer is use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.slackNewIssue` |
* | **⚠ Deprecated** | No longer is use |
* | **Nullability** | Required |
*/
slackNewIssue?: $Fields.slackNewIssue.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slackNewIssue<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to send new issue comment notifications to Slack.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.slackIssueComments` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
slackIssueComments?: $Fields.slackIssueComments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slackIssueComments<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to send new issue status updates to Slack.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.slackIssueStatuses` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
slackIssueStatuses?: $Fields.slackIssueStatuses.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slackIssueStatuses<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Period after which issues are automatically closed in months. Null/undefined means disabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.autoClosePeriod` |
* | **Nullability** | Optional |
*/
autoClosePeriod?: $Fields.autoClosePeriod.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoClosePeriod<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The canceled workflow state which auto closed issues will be set to. Defaults to the first canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.autoCloseStateId` |
* | **Nullability** | Optional |
*/
autoCloseStateId?: $Fields.autoCloseStateId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoCloseStateId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Period after which automatically closed and completed issues are automatically archived in months.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.autoArchivePeriod` |
* | **Nullability** | Required |
*/
autoArchivePeriod?: $Fields.autoArchivePeriod.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoArchivePeriod<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether parent issues should automatically close when all child issues are closed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.autoCloseParentIssues` |
* | **Nullability** | Optional |
*/
autoCloseParentIssues?: $Fields.autoCloseParentIssues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoCloseParentIssues<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether child issues should automatically close when their parent issue is closed
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.autoCloseChildIssues` |
* | **Nullability** | Optional |
*/
autoCloseChildIssues?: $Fields.autoCloseChildIssues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoCloseChildIssues<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The workflow state into which issues are moved when they are marked as a duplicate of another issue. Defaults to the first canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowState} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.markedAsDuplicateWorkflowState` |
* | **Nullability** | Optional |
*/
markedAsDuplicateWorkflowState?: $Fields.markedAsDuplicateWorkflowState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.markedAsDuplicateWorkflowState<_$Context>>
/**
* [Internal] Whether new users should join this team by default.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.joinByDefault` |
* | **Nullability** | Optional |
*/
joinByDefault?: $Fields.joinByDefault.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.joinByDefault<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Calendar feed URL (iCal) for cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycleCalenderUrl` |
* | **Nullability** | Required |
*/
cycleCalenderUrl?: $Fields.cycleCalenderUrl.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycleCalenderUrl<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The name of the team including its parent team name if it has one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.displayName` |
* | **Nullability** | Required |
*/
displayName?: $Fields.displayName.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.displayName<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Issues associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issues` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
issues?: $Fields.issues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issues<_$Context>>
/**
* Number of issues in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueCount` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*/
issueCount?: $Fields.issueCount.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueCount<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Cycles associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CycleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.cycles` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
cycles?: $Fields.cycles.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.cycles<_$Context>>
/**
* Team's currently active cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Cycle} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.activeCycle` |
* | **Nullability** | Optional |
*/
activeCycle?: $Fields.activeCycle.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.activeCycle<_$Context>>
/**
* Team's triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TriageResponsibility} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.triageResponsibility` |
* | **Nullability** | Optional |
*/
triageResponsibility?: $Fields.triageResponsibility.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.triageResponsibility<_$Context>>
/**
* Users who are members of this team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.members` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
members?: $Fields.members.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.members<_$Context>>
/**
* [ALPHA] The membership of the given user in the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembership} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.membership` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*/
membership?: $Fields.membership<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.membership<_$Context>>
/**
* Memberships associated with the team. For easier access of the same data, use `members` query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamMembershipConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.memberships` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
memberships?: $Fields.memberships.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.memberships<_$Context>>
/**
* Projects associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.projects` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*/
projects?: $Fields.projects.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projects<_$Context>>
/**
* The states that define the workflow associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WorkflowStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.states` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
states?: $Fields.states.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.states<_$Context>>
/**
* The Git automation states for the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$GitAutomationStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.gitAutomationStates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
gitAutomationStates?: $Fields.gitAutomationStates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.gitAutomationStates<_$Context>>
/**
* Templates associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.templates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
templates?: $Fields.templates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.templates<_$Context>>
/**
* Labels associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.labels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
labels?: $Fields.labels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.labels<_$Context>>
/**
* Webhooks associated with the team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$WebhookConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.webhooks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
webhooks?: $Fields.webhooks.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.webhooks<_$Context>>
/**
* Settings for all integrations associated with that team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationsSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.integrationsSettings` |
* | **Nullability** | Optional |
*/
integrationsSettings?: $Fields.integrationsSettings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationsSettings<_$Context>>
/**
* [DEPRECATED] Whether to move issues to bottom of the column when changing state.
*
* @deprecated Use setIssueSortOrderOnStateChange instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.issueSortOrderDefaultToBottom` |
* | **⚠ Deprecated** | Use setIssueSortOrderOnStateChange instead. |
* | **Nullability** | Required |
*/
issueSortOrderDefaultToBottom?: $Fields.issueSortOrderDefaultToBottom.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueSortOrderDefaultToBottom<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [DEPRECATED] Unique hash for the team to be used in invite URLs.
*
* @deprecated Not used anymore, simply returning an empty string.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$Team} |
* | **Path** | `Team.inviteHash` |
* | **⚠ Deprecated** | Not used anymore, simply returning an empty string. |
* | **Nullability** | Required |
*/
inviteHash?: $Fields.inviteHash.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inviteHash<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
      /**
* A meta field. Is the name of the type being selected.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}