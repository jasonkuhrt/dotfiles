import type * as $Members from './members.js'

export * as ProjectUpdateReminderFrequency from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The frequency at which to send project update reminders.
*
* **Members:**
* - `week`
* - `twoWeeks`
* - `month`
* - `never`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 4 |
*/
export interface ProjectUpdateReminderFrequency {
kind: "Enum",
name: "ProjectUpdateReminderFrequency",
members: $Members.week
| $Members.twoWeeks
| $Members.month
| $Members.never
}