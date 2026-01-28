import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as ProjectSearchResult from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 73 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface ProjectSearchResult<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.id` |
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
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The n-weekly frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.updateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
updateReminderFrequencyInWeeks?: $Fields.updateReminderFrequencyInWeeks.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updateReminderFrequencyInWeeks<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The frequency at which to prompt for updates. When not set, reminders are inherited from workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.updateReminderFrequency` |
* | **Nullability** | Optional |
*/
updateReminderFrequency?: $Fields.updateReminderFrequency.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updateReminderFrequency<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The resolution of the reminder frequency.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$FrequencyResolutionType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.frequencyResolution` |
* | **Nullability** | Required |
*/
frequencyResolution?: $Fields.frequencyResolution.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.frequencyResolution<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The day at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Day} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.updateRemindersDay` |
* | **Nullability** | Optional |
*/
updateRemindersDay?: $Fields.updateRemindersDay.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updateRemindersDay<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The hour at which to prompt for updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.updateRemindersHour` |
* | **Nullability** | Optional |
*/
updateRemindersHour?: $Fields.updateRemindersHour.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.updateRemindersHour<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.name` |
* | **Nullability** | Required |
*/
name?: $Fields.name.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.name<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project's description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.description` |
* | **Nullability** | Required |
*/
description?: $Fields.description.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.description<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project's unique URL slug.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.slugId` |
* | **Nullability** | Required |
*/
slugId?: $Fields.slugId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slugId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The icon of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.icon` |
* | **Nullability** | Optional |
*/
icon?: $Fields.icon.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.icon<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project's color.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.color` |
* | **Nullability** | Required |
*/
color?: $Fields.color.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.color<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The status that the project is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.status` |
* | **Nullability** | Required |
*/
status?: $Fields.status.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.status<_$Context>>
/**
* The user who created the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.creator` |
* | **Nullability** | Optional |
*/
creator?: $Fields.creator.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.creator<_$Context>>
/**
* The project lead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.lead` |
* | **Nullability** | Optional |
*/
lead?: $Fields.lead.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lead<_$Context>>
/**
* [Internal] Facets associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Facet}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.facets` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
facets?: $Fields.facets.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.facets<_$Context>>
/**
* The time until which project update reminders are paused.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.projectUpdateRemindersPausedUntilAt` |
* | **Nullability** | Optional |
*/
projectUpdateRemindersPausedUntilAt?: $Fields.projectUpdateRemindersPausedUntilAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdateRemindersPausedUntilAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The estimated start date of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.startDate` |
* | **Nullability** | Optional |
*/
startDate?: $Fields.startDate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startDate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The resolution of the project's start date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.startDateResolution` |
* | **Nullability** | Optional |
*/
startDateResolution?: $Fields.startDateResolution.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startDateResolution<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The estimated completion date of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TimelessDate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.targetDate` |
* | **Nullability** | Optional |
*/
targetDate?: $Fields.targetDate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.targetDate<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The resolution of the project's estimated completion date.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateResolutionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.targetDateResolution` |
* | **Nullability** | Optional |
*/
targetDateResolution?: $Fields.targetDateResolution.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.targetDateResolution<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the project was moved into started state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.startedAt` |
* | **Nullability** | Optional |
*/
startedAt?: $Fields.startedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the project was moved into completed state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.completedAt` |
* | **Nullability** | Optional |
*/
completedAt?: $Fields.completedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the project was moved into canceled state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.canceledAt` |
* | **Nullability** | Optional |
*/
canceledAt?: $Fields.canceledAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.canceledAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the project was automatically archived by the auto pruning process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.autoArchivedAt` |
* | **Nullability** | Optional |
*/
autoArchivedAt?: $Fields.autoArchivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.autoArchivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* A flag that indicates whether the project is in the trash bin.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.trashed` |
* | **Nullability** | Optional |
*/
trashed?: $Fields.trashed.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.trashed<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The sort order for the project within the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.sortOrder` |
* | **Nullability** | Required |
*/
sortOrder?: $Fields.sortOrder.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.sortOrder<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The sort order for the project within the organization, when ordered by priority.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.prioritySortOrder` |
* | **Nullability** | Required |
*/
prioritySortOrder?: $Fields.prioritySortOrder.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.prioritySortOrder<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The project was created based on this issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.convertedFromIssue` |
* | **Nullability** | Optional |
*/
convertedFromIssue?: $Fields.convertedFromIssue.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.convertedFromIssue<_$Context>>
/**
* The last template that was applied to this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Template} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.lastAppliedTemplate` |
* | **Nullability** | Optional |
*/
lastAppliedTemplate?: $Fields.lastAppliedTemplate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lastAppliedTemplate<_$Context>>
/**
* The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.priority` |
* | **Nullability** | Required |
*/
priority?: $Fields.priority.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.priority<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The last project update posted for this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdate} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.lastUpdate` |
* | **Nullability** | Optional |
*/
lastUpdate?: $Fields.lastUpdate.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lastUpdate<_$Context>>
/**
* The health of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateHealthType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.health` |
* | **Nullability** | Optional |
*/
health?: $Fields.health.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.health<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time at which the project health was updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.healthUpdatedAt` |
* | **Nullability** | Optional |
*/
healthUpdatedAt?: $Fields.healthUpdatedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.healthUpdatedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The total number of issues in the project after each week.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.issueCountHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
issueCountHistory?: $Fields.issueCountHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issueCountHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of completed issues in the project after each week.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.completedIssueCountHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
completedIssueCountHistory?: $Fields.completedIssueCountHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedIssueCountHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The total number of estimation points after each week.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.scopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
scopeHistory?: $Fields.scopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.scopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of completed estimation points after each week.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.completedScopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
completedScopeHistory?: $Fields.completedScopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.completedScopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The number of in progress estimation points after each week.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.inProgressScopeHistory` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
inProgressScopeHistory?: $Fields.inProgressScopeHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inProgressScopeHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [INTERNAL] The progress history of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.progressHistory` |
* | **Nullability** | Required |
*/
progressHistory?: $Fields.progressHistory.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.progressHistory<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [INTERNAL] The current progress of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.currentProgress` |
* | **Nullability** | Required |
*/
currentProgress?: $Fields.currentProgress.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.currentProgress<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to send new issue notifications to Slack.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.slackNewIssue` |
* | **⚠ Deprecated** | No longer in use |
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
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.slackIssueComments` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
slackIssueComments?: $Fields.slackIssueComments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slackIssueComments<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether to send new issue status updates to Slack.
*
* @deprecated No longer is use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.slackIssueStatuses` |
* | **⚠ Deprecated** | No longer is use |
* | **Nullability** | Required |
*/
slackIssueStatuses?: $Fields.slackIssueStatuses.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slackIssueStatuses<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Id of the labels associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.labelIds` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
labelIds?: $Fields.labelIds.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.labelIds<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The user's favorite associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Favorite} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.favorite` |
* | **Nullability** | Optional |
*/
favorite?: $Fields.favorite.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.favorite<_$Context>>
/**
* Project URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.url` |
* | **Nullability** | Required |
*/
url?: $Fields.url.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.url<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Initiatives that this project belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.initiatives` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
initiatives?: $Fields.initiatives.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiatives<_$Context>>
/**
* Associations of this project to parent initiatives.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.initiativeToProjects` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
initiativeToProjects?: $Fields.initiativeToProjects.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiativeToProjects<_$Context>>
/**
* Teams associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.teams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
teams?: $Fields.teams.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.teams<_$Context>>
/**
* Users that are members of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.members` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*/
members?: $Fields.members.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.members<_$Context>>
/**
* Project updates associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.projectUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
projectUpdates?: $Fields.projectUpdates.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectUpdates<_$Context>>
/**
* Documents associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
documents?: $Fields.documents.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documents<_$Context>>
/**
* Milestones associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectMilestoneConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.projectMilestones` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
projectMilestones?: $Fields.projectMilestones.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.projectMilestones<_$Context>>
/**
* Issues associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.issues` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
issues?: $Fields.issues.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issues<_$Context>>
/**
* External links associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$EntityExternalLinkConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.externalLinks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
externalLinks?: $Fields.externalLinks.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalLinks<_$Context>>
/**
* History entries associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectHistoryConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.history` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
history?: $Fields.history.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.history<_$Context>>
/**
* Labels associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.labels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
labels?: $Fields.labels.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.labels<_$Context>>
/**
* The overall progress of the project. This is the (completed estimate points + 0.25 * in progress estimate points) / total estimate points.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.progress` |
* | **Nullability** | Required |
*/
progress?: $Fields.progress.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.progress<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The overall scope (total estimate points) of the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.scope` |
* | **Nullability** | Required |
*/
scope?: $Fields.scope.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.scope<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Settings for all integrations associated with that project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$IntegrationsSettings} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.integrationsSettings` |
* | **Nullability** | Optional |
*/
integrationsSettings?: $Fields.integrationsSettings.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.integrationsSettings<_$Context>>
/**
* The project's content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.content` |
* | **Nullability** | Optional |
*/
content?: $Fields.content.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.content<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] The project's content as YJS state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.contentState` |
* | **Nullability** | Optional |
*/
contentState?: $Fields.contentState.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.contentState<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The content of the project description.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DocumentContent} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.documentContent` |
* | **Nullability** | Optional |
*/
documentContent?: $Fields.documentContent.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.documentContent<_$Context>>
/**
* Comments associated with the project overview.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
comments?: $Fields.comments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comments<_$Context>>
/**
* Relations associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.relations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
relations?: $Fields.relations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.relations<_$Context>>
/**
* Inverse relations associated with this project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ProjectRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.inverseRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
inverseRelations?: $Fields.inverseRelations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.inverseRelations<_$Context>>
/**
* Customer needs associated with the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.needs` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
needs?: $Fields.needs.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.needs<_$Context>>
/**
* [DEPRECATED] The type of the state.
*
* @deprecated Use project.status instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.state` |
* | **⚠ Deprecated** | Use project.status instead |
* | **Nullability** | Required |
*/
state?: $Fields.state.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.state<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The priority of the project as a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.priorityLabel` |
* | **Nullability** | Required |
*/
priorityLabel?: $Fields.priorityLabel.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.priorityLabel<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Metadata related to search result.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$ProjectSearchResult} |
* | **Path** | `ProjectSearchResult.metadata` |
* | **Nullability** | Required |
*/
metadata?: $Fields.metadata.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.metadata<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      
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