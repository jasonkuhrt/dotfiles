import type * as $Members from './members.js'

export * as ViewType from './members.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum}.
*
* The client view this custom view is targeting.
*
* **Members:**
* - `inbox`
* - `myIssues`
* - `myIssuesCreatedByMe`
* - `myIssuesSubscribedTo`
* - `myIssuesActivity`
* - `myIssuesSharedWithMe`
* - `userProfile`
* - `userProfileCreatedByUser`
* - `board`
* - `completedCycle`
* - `cycle`
* - `release`
* - `project`
* - `projectDocuments`
* - `label`
* - `triage`
* - `activeIssues`
* - `backlog`
* - `subIssues`
* - `allIssues`
* - `dashboards`
* - `customView`
* - `customViews`
* - `initiative`
* - `initiativeOverview`
* - `initiativeOverviewSubInitiatives`
* - `initiatives`
* - `initiativesPlanned`
* - `initiativesCompleted`
* - `projects`
* - `projectsAll`
* - `projectsBacklog`
* - `projectsClosed`
* - `projectLabel`
* - `search`
* - `splitSearch`
* - `teams`
* - `archive`
* - `quickView`
* - `issueIdentifiers`
* - `customers`
* - `customer`
* - `embeddedCustomerNeeds`
* - `projectCustomerNeeds`
* - `reviews`
* - `myReviews`
* - `createdReviews`
* - `agents`
* - `feedAll`
* - `feedCreated`
* - `feedFollowing`
* - `feedPopular`
* - `workspaceMembers`
* - `roadmapAll`
* - `roadmap`
* - `roadmaps`
* - `roadmapClosed`
* - `roadmapBacklog`
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Members** | 58 |
*/
export interface ViewType {
kind: "Enum",
name: "ViewType",
members: $Members.inbox
| $Members.myIssues
| $Members.myIssuesCreatedByMe
| $Members.myIssuesSubscribedTo
| $Members.myIssuesActivity
| $Members.myIssuesSharedWithMe
| $Members.userProfile
| $Members.userProfileCreatedByUser
| $Members.board
| $Members.completedCycle
| $Members.cycle
| $Members.release
| $Members.project
| $Members.projectDocuments
| $Members.label
| $Members.triage
| $Members.activeIssues
| $Members.backlog
| $Members.subIssues
| $Members.allIssues
| $Members.dashboards
| $Members.customView
| $Members.customViews
| $Members.initiative
| $Members.initiativeOverview
| $Members.initiativeOverviewSubInitiatives
| $Members.initiatives
| $Members.initiativesPlanned
| $Members.initiativesCompleted
| $Members.projects
| $Members.projectsAll
| $Members.projectsBacklog
| $Members.projectsClosed
| $Members.projectLabel
| $Members.search
| $Members.splitSearch
| $Members.teams
| $Members.archive
| $Members.quickView
| $Members.issueIdentifiers
| $Members.customers
| $Members.customer
| $Members.embeddedCustomerNeeds
| $Members.projectCustomerNeeds
| $Members.reviews
| $Members.myReviews
| $Members.createdReviews
| $Members.agents
| $Members.feedAll
| $Members.feedCreated
| $Members.feedFollowing
| $Members.feedPopular
| $Members.workspaceMembers
| $Members.roadmapAll
| $Members.roadmap
| $Members.roadmaps
| $Members.roadmapClosed
| $Members.roadmapBacklog
}