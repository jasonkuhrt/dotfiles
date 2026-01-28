import * as $$Data from './data.js'
import * as $$Schema from './schema/_.js'
import * as $$SelectionSets from './selection-sets/_.js'
import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'


    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                              Runtime
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


      import { createSelect } from 'graffle/client'

      /**
       * Runtime utilities for native GraphQL document selection.
       *
       * Used with the `.select()` method to build type-safe native GraphQL documents.
       *
       * @example
       * ```ts
       * import { Select } from './graffle/select.js'
       *
       * const document = Select.Query({ pokemon: { name: true } })
       * ```
       */
      export const Select = createSelect($$Data.Name)



    //
    //
    //
    //
    //
    //
    // ==================================================================================================
    //                                             Buildtime
    // ==================================================================================================
    //
    //
    //
    //
    //
    //


      /**
       * Type utilities for inferring result types from selection sets.
       *
       * Given a selection set, these types compute the exact TypeScript type
       * of the result data returned from a GraphQL operation.
       *
       * # Usage
       *
       * Each type corresponds to a GraphQL schema type and takes a selection set
       * generic parameter, returning the inferred result type.
       *
       * @example
       * ```ts
       * import type { Select } from './graffle/select.js'
       *
       * type Result = Select.Query<{ pokemon: { name: true } }>
       * // Result: { pokemon: { name: string } }
       * ```
       */
      export namespace Select {


    //                                                Root
    // --------------------------------------------------------------------------------------------------
    //

/**
* Infer result type for Query operations.
*/
export type Query<$SelectionSet extends $$SelectionSets.Query> = GraphqlKit.Document.Object.InferResult.Operation<$SelectionSet, $$Schema.Schema, $$Utilities.GraphqlKit.Schema.OperationType.QUERY >
/**
* Infer result type for Mutation operations.
*/
export type Mutation<$SelectionSet extends $$SelectionSets.Mutation> = GraphqlKit.Document.Object.InferResult.Operation<$SelectionSet, $$Schema.Schema, $$Utilities.GraphqlKit.Schema.OperationType.MUTATION>


    //                                            OutputObject
    // --------------------------------------------------------------------------------------------------
    //

/**
* A customer notification subscription.
*
* Infer result type for CustomerNotificationSubscription selection sets.
*/
export type CustomerNotificationSubscription<$SelectionSet extends $$SelectionSets.CustomerNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNotificationSubscription']>
/**
* A user that has access to the the resources of an organization.
*
* Infer result type for User selection sets.
*/
export type User<$SelectionSet extends $$SelectionSets.User> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['User']>
/**
* An organization. Organizations are root-level objects that contain user accounts and teams.
*
* Infer result type for Organization selection sets.
*/
export type Organization<$SelectionSet extends $$SelectionSets.Organization> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Organization']>
/**
* A facet. Facets are joins between entities. A facet can tie a custom view to a project, or a a project to a roadmap for example.
*
* Infer result type for Facet selection sets.
*/
export type Facet<$SelectionSet extends $$SelectionSets.Facet> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Facet']>
/**
* An organizational unit that contains issues.
*
* Infer result type for Team selection sets.
*/
export type Team<$SelectionSet extends $$SelectionSets.Team> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Team']>
/**
* A state in a team workflow.
*
* Infer result type for WorkflowState selection sets.
*/
export type WorkflowState<$SelectionSet extends $$SelectionSets.WorkflowState> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowState']>
/**
* Infer result type for IssueConnection selection sets.
*/
export type IssueConnection<$SelectionSet extends $$SelectionSets.IssueConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueConnection']>
/**
* Infer result type for IssueEdge selection sets.
*/
export type IssueEdge<$SelectionSet extends $$SelectionSets.IssueEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueEdge']>
/**
* An issue.
*
* Infer result type for Issue selection sets.
*/
export type Issue<$SelectionSet extends $$SelectionSets.Issue> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Issue']>
/**
* A set of issues to be resolved in a specified amount of time.
*
* Infer result type for Cycle selection sets.
*/
export type Cycle<$SelectionSet extends $$SelectionSets.Cycle> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Cycle']>
/**
* Infer result type for DocumentConnection selection sets.
*/
export type DocumentConnection<$SelectionSet extends $$SelectionSets.DocumentConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentConnection']>
/**
* Infer result type for DocumentEdge selection sets.
*/
export type DocumentEdge<$SelectionSet extends $$SelectionSets.DocumentEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentEdge']>
/**
* A document that can be attached to different entities.
*
* Infer result type for Document selection sets.
*/
export type Document<$SelectionSet extends $$SelectionSets.Document> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Document']>
/**
* A project.
*
* Infer result type for Project selection sets.
*/
export type Project<$SelectionSet extends $$SelectionSets.Project> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Project']>
/**
* A project status.
*
* Infer result type for ProjectStatus selection sets.
*/
export type ProjectStatus<$SelectionSet extends $$SelectionSets.ProjectStatus> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatus']>
/**
* A template object used for creating entities faster.
*
* Infer result type for Template selection sets.
*/
export type Template<$SelectionSet extends $$SelectionSets.Template> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Template']>
/**
* An update associated with a project.
*
* Infer result type for ProjectUpdate selection sets.
*/
export type ProjectUpdate<$SelectionSet extends $$SelectionSets.ProjectUpdate> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdate']>
/**
* A reaction associated with a comment or a project update.
*
* Infer result type for Reaction selection sets.
*/
export type Reaction<$SelectionSet extends $$SelectionSets.Reaction> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Reaction']>
/**
* A comment associated with an issue.
*
* Infer result type for Comment selection sets.
*/
export type Comment<$SelectionSet extends $$SelectionSets.Comment> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Comment']>
/**
* A document content for a project.
*
* Infer result type for DocumentContent selection sets.
*/
export type DocumentContent<$SelectionSet extends $$SelectionSets.DocumentContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentContent']>
/**
* An initiative to group projects.
*
* Infer result type for Initiative selection sets.
*/
export type Initiative<$SelectionSet extends $$SelectionSets.Initiative> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Initiative']>
/**
* An initiative update.
*
* Infer result type for InitiativeUpdate selection sets.
*/
export type InitiativeUpdate<$SelectionSet extends $$SelectionSets.InitiativeUpdate> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdate']>
/**
* Infer result type for CommentConnection selection sets.
*/
export type CommentConnection<$SelectionSet extends $$SelectionSets.CommentConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CommentConnection']>
/**
* Infer result type for CommentEdge selection sets.
*/
export type CommentEdge<$SelectionSet extends $$SelectionSets.CommentEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CommentEdge']>
/**
* Infer result type for PageInfo selection sets.
*/
export type PageInfo<$SelectionSet extends $$SelectionSets.PageInfo> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PageInfo']>
/**
* Infer result type for ProjectConnection selection sets.
*/
export type ProjectConnection<$SelectionSet extends $$SelectionSets.ProjectConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectConnection']>
/**
* Infer result type for ProjectEdge selection sets.
*/
export type ProjectEdge<$SelectionSet extends $$SelectionSets.ProjectEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectEdge']>
/**
* Infer result type for EntityExternalLinkConnection selection sets.
*/
export type EntityExternalLinkConnection<$SelectionSet extends $$SelectionSets.EntityExternalLinkConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EntityExternalLinkConnection']>
/**
* Infer result type for EntityExternalLinkEdge selection sets.
*/
export type EntityExternalLinkEdge<$SelectionSet extends $$SelectionSets.EntityExternalLinkEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EntityExternalLinkEdge']>
/**
* An external link for an entity like initiative, etc...
*
* Infer result type for EntityExternalLink selection sets.
*/
export type EntityExternalLink<$SelectionSet extends $$SelectionSets.EntityExternalLink> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EntityExternalLink']>
/**
* The configuration of all integrations for different entities.
*
* Infer result type for IntegrationsSettings selection sets.
*/
export type IntegrationsSettings<$SelectionSet extends $$SelectionSets.IntegrationsSettings> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationsSettings']>
/**
* Infer result type for InitiativeHistoryConnection selection sets.
*/
export type InitiativeHistoryConnection<$SelectionSet extends $$SelectionSets.InitiativeHistoryConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeHistoryConnection']>
/**
* Infer result type for InitiativeHistoryEdge selection sets.
*/
export type InitiativeHistoryEdge<$SelectionSet extends $$SelectionSets.InitiativeHistoryEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeHistoryEdge']>
/**
* A initiative history containing relevant change events.
*
* Infer result type for InitiativeHistory selection sets.
*/
export type InitiativeHistory<$SelectionSet extends $$SelectionSets.InitiativeHistory> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeHistory']>
/**
* Infer result type for InitiativeUpdateConnection selection sets.
*/
export type InitiativeUpdateConnection<$SelectionSet extends $$SelectionSets.InitiativeUpdateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdateConnection']>
/**
* Infer result type for InitiativeUpdateEdge selection sets.
*/
export type InitiativeUpdateEdge<$SelectionSet extends $$SelectionSets.InitiativeUpdateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdateEdge']>
/**
* Infer result type for InitiativeConnection selection sets.
*/
export type InitiativeConnection<$SelectionSet extends $$SelectionSets.InitiativeConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeConnection']>
/**
* Infer result type for InitiativeEdge selection sets.
*/
export type InitiativeEdge<$SelectionSet extends $$SelectionSets.InitiativeEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeEdge']>
/**
* A milestone for a project.
*
* Infer result type for ProjectMilestone selection sets.
*/
export type ProjectMilestone<$SelectionSet extends $$SelectionSets.ProjectMilestone> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestone']>
/**
* AI prompt rules for a team.
*
* Infer result type for AiPromptRules selection sets.
*/
export type AiPromptRules<$SelectionSet extends $$SelectionSets.AiPromptRules> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AiPromptRules']>
/**
* [Internal] A generic post.
*
* Infer result type for Post selection sets.
*/
export type Post<$SelectionSet extends $$SelectionSets.Post> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Post']>
/**
* An external authenticated (e.g., through Slack) user which doesn't have a Linear account, but can create and update entities in Linear from the external system that authenticated them.
*
* Infer result type for ExternalUser selection sets.
*/
export type ExternalUser<$SelectionSet extends $$SelectionSets.ExternalUser> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalUser']>
/**
* A session for agent activities and state management.
*
* Infer result type for AgentSession selection sets.
*/
export type AgentSession<$SelectionSet extends $$SelectionSets.AgentSession> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSession']>
/**
* Infer result type for AgentActivityConnection selection sets.
*/
export type AgentActivityConnection<$SelectionSet extends $$SelectionSets.AgentActivityConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityConnection']>
/**
* Infer result type for AgentActivityEdge selection sets.
*/
export type AgentActivityEdge<$SelectionSet extends $$SelectionSets.AgentActivityEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityEdge']>
/**
* An activity within an agent context.
*
* Infer result type for AgentActivity selection sets.
*/
export type AgentActivity<$SelectionSet extends $$SelectionSets.AgentActivity> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivity']>
/**
* Content for a thought activity.
*
* Infer result type for AgentActivityThoughtContent selection sets.
*/
export type AgentActivityThoughtContent<$SelectionSet extends $$SelectionSets.AgentActivityThoughtContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityThoughtContent']>
/**
* Content for an action activity (tool call or action).
*
* Infer result type for AgentActivityActionContent selection sets.
*/
export type AgentActivityActionContent<$SelectionSet extends $$SelectionSets.AgentActivityActionContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityActionContent']>
/**
* Content for a response activity.
*
* Infer result type for AgentActivityResponseContent selection sets.
*/
export type AgentActivityResponseContent<$SelectionSet extends $$SelectionSets.AgentActivityResponseContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityResponseContent']>
/**
* Content for a prompt activity.
*
* Infer result type for AgentActivityPromptContent selection sets.
*/
export type AgentActivityPromptContent<$SelectionSet extends $$SelectionSets.AgentActivityPromptContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityPromptContent']>
/**
* Content for an error activity.
*
* Infer result type for AgentActivityErrorContent selection sets.
*/
export type AgentActivityErrorContent<$SelectionSet extends $$SelectionSets.AgentActivityErrorContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityErrorContent']>
/**
* Content for an elicitation activity.
*
* Infer result type for AgentActivityElicitationContent selection sets.
*/
export type AgentActivityElicitationContent<$SelectionSet extends $$SelectionSets.AgentActivityElicitationContent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityElicitationContent']>
/**
* Infer result type for AgentSessionToPullRequestConnection selection sets.
*/
export type AgentSessionToPullRequestConnection<$SelectionSet extends $$SelectionSets.AgentSessionToPullRequestConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionToPullRequestConnection']>
/**
* Infer result type for AgentSessionToPullRequestEdge selection sets.
*/
export type AgentSessionToPullRequestEdge<$SelectionSet extends $$SelectionSets.AgentSessionToPullRequestEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionToPullRequestEdge']>
/**
* Join table between agent sessions and pull requests.
*
* Infer result type for AgentSessionToPullRequest selection sets.
*/
export type AgentSessionToPullRequest<$SelectionSet extends $$SelectionSets.AgentSessionToPullRequest> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionToPullRequest']>
/**
* [Internal] A pull request in a version control system.
*
* Infer result type for PullRequest selection sets.
*/
export type PullRequest<$SelectionSet extends $$SelectionSets.PullRequest> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PullRequest']>
/**
* [Internal] Merge settings for a pull request
*
* Infer result type for PullRequestMergeSettings selection sets.
*/
export type PullRequestMergeSettings<$SelectionSet extends $$SelectionSets.PullRequestMergeSettings> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PullRequestMergeSettings']>
/**
* [ALPHA] A pull request commit.
*
* Infer result type for PullRequestCommit selection sets.
*/
export type PullRequestCommit<$SelectionSet extends $$SelectionSets.PullRequestCommit> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PullRequestCommit']>
/**
* Infer result type for AgentSessionConnection selection sets.
*/
export type AgentSessionConnection<$SelectionSet extends $$SelectionSets.AgentSessionConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionConnection']>
/**
* Infer result type for AgentSessionEdge selection sets.
*/
export type AgentSessionEdge<$SelectionSet extends $$SelectionSets.AgentSessionEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionEdge']>
/**
* A bot actor is an actor that is not a user, but an application or integration.
*
* Infer result type for ActorBot selection sets.
*/
export type ActorBot<$SelectionSet extends $$SelectionSets.ActorBot> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ActorBot']>
/**
* A comment thread that is synced with an external source.
*
* Infer result type for SyncedExternalThread selection sets.
*/
export type SyncedExternalThread<$SelectionSet extends $$SelectionSets.SyncedExternalThread> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SyncedExternalThread']>
/**
* Information about an external entity.
*
* Infer result type for ExternalEntityInfo selection sets.
*/
export type ExternalEntityInfo<$SelectionSet extends $$SelectionSets.ExternalEntityInfo> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalEntityInfo']>
/**
* Metadata about the external GitHub entity.
*
* Infer result type for ExternalEntityInfoGithubMetadata selection sets.
*/
export type ExternalEntityInfoGithubMetadata<$SelectionSet extends $$SelectionSets.ExternalEntityInfoGithubMetadata> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalEntityInfoGithubMetadata']>
/**
* Metadata about the external Jira entity.
*
* Infer result type for ExternalEntityInfoJiraMetadata selection sets.
*/
export type ExternalEntityInfoJiraMetadata<$SelectionSet extends $$SelectionSets.ExternalEntityInfoJiraMetadata> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalEntityInfoJiraMetadata']>
/**
* Metadata about the external Slack entity.
*
* Infer result type for ExternalEntitySlackMetadata selection sets.
*/
export type ExternalEntitySlackMetadata<$SelectionSet extends $$SelectionSets.ExternalEntitySlackMetadata> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalEntitySlackMetadata']>
/**
* User favorites presented in the sidebar.
*
* Infer result type for Favorite selection sets.
*/
export type Favorite<$SelectionSet extends $$SelectionSets.Favorite> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Favorite']>
/**
* Infer result type for FavoriteConnection selection sets.
*/
export type FavoriteConnection<$SelectionSet extends $$SelectionSets.FavoriteConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FavoriteConnection']>
/**
* Infer result type for FavoriteEdge selection sets.
*/
export type FavoriteEdge<$SelectionSet extends $$SelectionSets.FavoriteEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FavoriteEdge']>
/**
* A custom view that has been saved by a user.
*
* Infer result type for CustomView selection sets.
*/
export type CustomView<$SelectionSet extends $$SelectionSets.CustomView> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomView']>
/**
* Infer result type for FeedItemConnection selection sets.
*/
export type FeedItemConnection<$SelectionSet extends $$SelectionSets.FeedItemConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FeedItemConnection']>
/**
* Infer result type for FeedItemEdge selection sets.
*/
export type FeedItemEdge<$SelectionSet extends $$SelectionSets.FeedItemEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FeedItemEdge']>
/**
* [Internal] An item in a users feed.
*
* Infer result type for FeedItem selection sets.
*/
export type FeedItem<$SelectionSet extends $$SelectionSets.FeedItem> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FeedItem']>
/**
* View preferences.
*
* Infer result type for ViewPreferences selection sets.
*/
export type ViewPreferences<$SelectionSet extends $$SelectionSets.ViewPreferences> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ViewPreferences']>
/**
* Infer result type for ViewPreferencesValues selection sets.
*/
export type ViewPreferencesValues<$SelectionSet extends $$SelectionSets.ViewPreferencesValues> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ViewPreferencesValues']>
/**
* Labels that can be associated with issues.
*
* Infer result type for IssueLabel selection sets.
*/
export type IssueLabel<$SelectionSet extends $$SelectionSets.IssueLabel> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueLabel']>
/**
* Infer result type for IssueLabelConnection selection sets.
*/
export type IssueLabelConnection<$SelectionSet extends $$SelectionSets.IssueLabelConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueLabelConnection']>
/**
* Infer result type for IssueLabelEdge selection sets.
*/
export type IssueLabelEdge<$SelectionSet extends $$SelectionSets.IssueLabelEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueLabelEdge']>
/**
* Labels that can be associated with projects.
*
* Infer result type for ProjectLabel selection sets.
*/
export type ProjectLabel<$SelectionSet extends $$SelectionSets.ProjectLabel> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectLabel']>
/**
* Infer result type for ProjectLabelConnection selection sets.
*/
export type ProjectLabelConnection<$SelectionSet extends $$SelectionSets.ProjectLabelConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectLabelConnection']>
/**
* Infer result type for ProjectLabelEdge selection sets.
*/
export type ProjectLabelEdge<$SelectionSet extends $$SelectionSets.ProjectLabelEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectLabelEdge']>
/**
* A customer whose needs will be tied to issues or projects.
*
* Infer result type for Customer selection sets.
*/
export type Customer<$SelectionSet extends $$SelectionSets.Customer> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Customer']>
/**
* A customer status.
*
* Infer result type for CustomerStatus selection sets.
*/
export type CustomerStatus<$SelectionSet extends $$SelectionSets.CustomerStatus> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerStatus']>
/**
* A customer tier.
*
* Infer result type for CustomerTier selection sets.
*/
export type CustomerTier<$SelectionSet extends $$SelectionSets.CustomerTier> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerTier']>
/**
* An integration with an external service.
*
* Infer result type for Integration selection sets.
*/
export type Integration<$SelectionSet extends $$SelectionSets.Integration> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Integration']>
/**
* [Internal] A dashboard, usually a collection of widgets to display several insights at once.
*
* Infer result type for Dashboard selection sets.
*/
export type Dashboard<$SelectionSet extends $$SelectionSets.Dashboard> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Dashboard']>
/**
* [Internal] A release.
*
* Infer result type for Release selection sets.
*/
export type Release<$SelectionSet extends $$SelectionSets.Release> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Release']>
/**
* [Internal] A release pipeline.
*
* Infer result type for ReleasePipeline selection sets.
*/
export type ReleasePipeline<$SelectionSet extends $$SelectionSets.ReleasePipeline> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePipeline']>
/**
* Infer result type for ReleaseStageConnection selection sets.
*/
export type ReleaseStageConnection<$SelectionSet extends $$SelectionSets.ReleaseStageConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseStageConnection']>
/**
* Infer result type for ReleaseStageEdge selection sets.
*/
export type ReleaseStageEdge<$SelectionSet extends $$SelectionSets.ReleaseStageEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseStageEdge']>
/**
* [Internal] A release stage.
*
* Infer result type for ReleaseStage selection sets.
*/
export type ReleaseStage<$SelectionSet extends $$SelectionSets.ReleaseStage> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseStage']>
/**
* Infer result type for ReleaseConnection selection sets.
*/
export type ReleaseConnection<$SelectionSet extends $$SelectionSets.ReleaseConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseConnection']>
/**
* Infer result type for ReleaseEdge selection sets.
*/
export type ReleaseEdge<$SelectionSet extends $$SelectionSets.ReleaseEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseEdge']>
/**
* Infer result type for InitiativeToProjectConnection selection sets.
*/
export type InitiativeToProjectConnection<$SelectionSet extends $$SelectionSets.InitiativeToProjectConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeToProjectConnection']>
/**
* Infer result type for InitiativeToProjectEdge selection sets.
*/
export type InitiativeToProjectEdge<$SelectionSet extends $$SelectionSets.InitiativeToProjectEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeToProjectEdge']>
/**
* Join table between projects and initiatives.
*
* Infer result type for InitiativeToProject selection sets.
*/
export type InitiativeToProject<$SelectionSet extends $$SelectionSets.InitiativeToProject> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeToProject']>
/**
* Infer result type for TeamConnection selection sets.
*/
export type TeamConnection<$SelectionSet extends $$SelectionSets.TeamConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamConnection']>
/**
* Infer result type for TeamEdge selection sets.
*/
export type TeamEdge<$SelectionSet extends $$SelectionSets.TeamEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamEdge']>
/**
* Infer result type for UserConnection selection sets.
*/
export type UserConnection<$SelectionSet extends $$SelectionSets.UserConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserConnection']>
/**
* Infer result type for UserEdge selection sets.
*/
export type UserEdge<$SelectionSet extends $$SelectionSets.UserEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserEdge']>
/**
* Infer result type for ProjectUpdateConnection selection sets.
*/
export type ProjectUpdateConnection<$SelectionSet extends $$SelectionSets.ProjectUpdateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdateConnection']>
/**
* Infer result type for ProjectUpdateEdge selection sets.
*/
export type ProjectUpdateEdge<$SelectionSet extends $$SelectionSets.ProjectUpdateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdateEdge']>
/**
* Infer result type for ProjectMilestoneConnection selection sets.
*/
export type ProjectMilestoneConnection<$SelectionSet extends $$SelectionSets.ProjectMilestoneConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestoneConnection']>
/**
* Infer result type for ProjectMilestoneEdge selection sets.
*/
export type ProjectMilestoneEdge<$SelectionSet extends $$SelectionSets.ProjectMilestoneEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestoneEdge']>
/**
* Infer result type for ProjectHistoryConnection selection sets.
*/
export type ProjectHistoryConnection<$SelectionSet extends $$SelectionSets.ProjectHistoryConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectHistoryConnection']>
/**
* Infer result type for ProjectHistoryEdge selection sets.
*/
export type ProjectHistoryEdge<$SelectionSet extends $$SelectionSets.ProjectHistoryEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectHistoryEdge']>
/**
* An history associated with a project.
*
* Infer result type for ProjectHistory selection sets.
*/
export type ProjectHistory<$SelectionSet extends $$SelectionSets.ProjectHistory> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectHistory']>
/**
* Infer result type for ProjectRelationConnection selection sets.
*/
export type ProjectRelationConnection<$SelectionSet extends $$SelectionSets.ProjectRelationConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectRelationConnection']>
/**
* Infer result type for ProjectRelationEdge selection sets.
*/
export type ProjectRelationEdge<$SelectionSet extends $$SelectionSets.ProjectRelationEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectRelationEdge']>
/**
* A relation between two projects.
*
* Infer result type for ProjectRelation selection sets.
*/
export type ProjectRelation<$SelectionSet extends $$SelectionSets.ProjectRelation> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectRelation']>
/**
* Infer result type for CustomerNeedConnection selection sets.
*/
export type CustomerNeedConnection<$SelectionSet extends $$SelectionSets.CustomerNeedConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedConnection']>
/**
* Infer result type for CustomerNeedEdge selection sets.
*/
export type CustomerNeedEdge<$SelectionSet extends $$SelectionSets.CustomerNeedEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedEdge']>
/**
* A customer need, expressed through a reference to an issue, project, or comment.
*
* Infer result type for CustomerNeed selection sets.
*/
export type CustomerNeed<$SelectionSet extends $$SelectionSets.CustomerNeed> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeed']>
/**
* Issue attachment (e.g. support ticket, pull request).
*
* Infer result type for Attachment selection sets.
*/
export type Attachment<$SelectionSet extends $$SelectionSets.Attachment> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Attachment']>
/**
* Project attachment
*
* Infer result type for ProjectAttachment selection sets.
*/
export type ProjectAttachment<$SelectionSet extends $$SelectionSets.ProjectAttachment> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectAttachment']>
/**
* Infer result type for IssueHistoryConnection selection sets.
*/
export type IssueHistoryConnection<$SelectionSet extends $$SelectionSets.IssueHistoryConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueHistoryConnection']>
/**
* Infer result type for IssueHistoryEdge selection sets.
*/
export type IssueHistoryEdge<$SelectionSet extends $$SelectionSets.IssueHistoryEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueHistoryEdge']>
/**
* A record of changes to an issue.
*
* Infer result type for IssueHistory selection sets.
*/
export type IssueHistory<$SelectionSet extends $$SelectionSets.IssueHistory> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueHistory']>
/**
* Issue relation history's payload.
*
* Infer result type for IssueRelationHistoryPayload selection sets.
*/
export type IssueRelationHistoryPayload<$SelectionSet extends $$SelectionSets.IssueRelationHistoryPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueRelationHistoryPayload']>
/**
* An import job for data from an external service.
*
* Infer result type for IssueImport selection sets.
*/
export type IssueImport<$SelectionSet extends $$SelectionSets.IssueImport> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImport']>
/**
* Metadata about a triage rule that made changes to an issue.
*
* Infer result type for IssueHistoryTriageRuleMetadata selection sets.
*/
export type IssueHistoryTriageRuleMetadata<$SelectionSet extends $$SelectionSets.IssueHistoryTriageRuleMetadata> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueHistoryTriageRuleMetadata']>
/**
* An error that occurred during triage rule execution.
*
* Infer result type for IssueHistoryTriageRuleError selection sets.
*/
export type IssueHistoryTriageRuleError<$SelectionSet extends $$SelectionSets.IssueHistoryTriageRuleError> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueHistoryTriageRuleError']>
/**
* Infer result type for WorkflowDefinition selection sets.
*/
export type WorkflowDefinition<$SelectionSet extends $$SelectionSets.WorkflowDefinition> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowDefinition']>
/**
* Infer result type for IssueRelationConnection selection sets.
*/
export type IssueRelationConnection<$SelectionSet extends $$SelectionSets.IssueRelationConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueRelationConnection']>
/**
* Infer result type for IssueRelationEdge selection sets.
*/
export type IssueRelationEdge<$SelectionSet extends $$SelectionSets.IssueRelationEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueRelationEdge']>
/**
* A relation between two issues.
*
* Infer result type for IssueRelation selection sets.
*/
export type IssueRelation<$SelectionSet extends $$SelectionSets.IssueRelation> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueRelation']>
/**
* Infer result type for AttachmentConnection selection sets.
*/
export type AttachmentConnection<$SelectionSet extends $$SelectionSets.AttachmentConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AttachmentConnection']>
/**
* Infer result type for AttachmentEdge selection sets.
*/
export type AttachmentEdge<$SelectionSet extends $$SelectionSets.AttachmentEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AttachmentEdge']>
/**
* Infer result type for IssueSuggestionConnection selection sets.
*/
export type IssueSuggestionConnection<$SelectionSet extends $$SelectionSets.IssueSuggestionConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSuggestionConnection']>
/**
* Infer result type for IssueSuggestionEdge selection sets.
*/
export type IssueSuggestionEdge<$SelectionSet extends $$SelectionSets.IssueSuggestionEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSuggestionEdge']>
/**
* Infer result type for IssueSuggestion selection sets.
*/
export type IssueSuggestion<$SelectionSet extends $$SelectionSets.IssueSuggestion> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSuggestion']>
/**
* Infer result type for IssueSuggestionMetadata selection sets.
*/
export type IssueSuggestionMetadata<$SelectionSet extends $$SelectionSets.IssueSuggestionMetadata> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSuggestionMetadata']>
/**
* Infer result type for IssueStateSpanConnection selection sets.
*/
export type IssueStateSpanConnection<$SelectionSet extends $$SelectionSets.IssueStateSpanConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueStateSpanConnection']>
/**
* Infer result type for IssueStateSpanEdge selection sets.
*/
export type IssueStateSpanEdge<$SelectionSet extends $$SelectionSets.IssueStateSpanEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueStateSpanEdge']>
/**
* A continuous period of time during which an issue remained in a specific workflow state.
*
* Infer result type for IssueStateSpan selection sets.
*/
export type IssueStateSpan<$SelectionSet extends $$SelectionSets.IssueStateSpan> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueStateSpan']>
/**
* Infer result type for CycleConnection selection sets.
*/
export type CycleConnection<$SelectionSet extends $$SelectionSets.CycleConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CycleConnection']>
/**
* Infer result type for CycleEdge selection sets.
*/
export type CycleEdge<$SelectionSet extends $$SelectionSets.CycleEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CycleEdge']>
/**
* A team's triage responsibility.
*
* Infer result type for TriageResponsibility selection sets.
*/
export type TriageResponsibility<$SelectionSet extends $$SelectionSets.TriageResponsibility> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TriageResponsibility']>
/**
* Infer result type for TriageResponsibilityManualSelection selection sets.
*/
export type TriageResponsibilityManualSelection<$SelectionSet extends $$SelectionSets.TriageResponsibilityManualSelection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TriageResponsibilityManualSelection']>
/**
* A time schedule.
*
* Infer result type for TimeSchedule selection sets.
*/
export type TimeSchedule<$SelectionSet extends $$SelectionSets.TimeSchedule> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TimeSchedule']>
/**
* Infer result type for TimeScheduleEntry selection sets.
*/
export type TimeScheduleEntry<$SelectionSet extends $$SelectionSets.TimeScheduleEntry> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TimeScheduleEntry']>
/**
* Defines the membership of a user to a team.
*
* Infer result type for TeamMembership selection sets.
*/
export type TeamMembership<$SelectionSet extends $$SelectionSets.TeamMembership> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamMembership']>
/**
* Infer result type for TeamMembershipConnection selection sets.
*/
export type TeamMembershipConnection<$SelectionSet extends $$SelectionSets.TeamMembershipConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamMembershipConnection']>
/**
* Infer result type for TeamMembershipEdge selection sets.
*/
export type TeamMembershipEdge<$SelectionSet extends $$SelectionSets.TeamMembershipEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamMembershipEdge']>
/**
* Infer result type for WorkflowStateConnection selection sets.
*/
export type WorkflowStateConnection<$SelectionSet extends $$SelectionSets.WorkflowStateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowStateConnection']>
/**
* Infer result type for WorkflowStateEdge selection sets.
*/
export type WorkflowStateEdge<$SelectionSet extends $$SelectionSets.WorkflowStateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowStateEdge']>
/**
* Infer result type for GitAutomationStateConnection selection sets.
*/
export type GitAutomationStateConnection<$SelectionSet extends $$SelectionSets.GitAutomationStateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationStateConnection']>
/**
* Infer result type for GitAutomationStateEdge selection sets.
*/
export type GitAutomationStateEdge<$SelectionSet extends $$SelectionSets.GitAutomationStateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationStateEdge']>
/**
* A trigger that updates the issue status according to Git automations.
*
* Infer result type for GitAutomationState selection sets.
*/
export type GitAutomationState<$SelectionSet extends $$SelectionSets.GitAutomationState> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationState']>
/**
* A Git target branch for which there are automations (GitAutomationState).
*
* Infer result type for GitAutomationTargetBranch selection sets.
*/
export type GitAutomationTargetBranch<$SelectionSet extends $$SelectionSets.GitAutomationTargetBranch> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationTargetBranch']>
/**
* Infer result type for TemplateConnection selection sets.
*/
export type TemplateConnection<$SelectionSet extends $$SelectionSets.TemplateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TemplateConnection']>
/**
* Infer result type for TemplateEdge selection sets.
*/
export type TemplateEdge<$SelectionSet extends $$SelectionSets.TemplateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TemplateEdge']>
/**
* Infer result type for WebhookConnection selection sets.
*/
export type WebhookConnection<$SelectionSet extends $$SelectionSets.WebhookConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WebhookConnection']>
/**
* Infer result type for WebhookEdge selection sets.
*/
export type WebhookEdge<$SelectionSet extends $$SelectionSets.WebhookEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WebhookEdge']>
/**
* A webhook used to send HTTP notifications over data updates.
*
* Infer result type for Webhook selection sets.
*/
export type Webhook<$SelectionSet extends $$SelectionSets.Webhook> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Webhook']>
/**
* Entity representing a webhook execution failure.
*
* Infer result type for WebhookFailureEvent selection sets.
*/
export type WebhookFailureEvent<$SelectionSet extends $$SelectionSets.WebhookFailureEvent> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WebhookFailureEvent']>
/**
* Infer result type for OrganizationIpRestriction selection sets.
*/
export type OrganizationIpRestriction<$SelectionSet extends $$SelectionSets.OrganizationIpRestriction> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationIpRestriction']>
/**
* Infer result type for IntegrationConnection selection sets.
*/
export type IntegrationConnection<$SelectionSet extends $$SelectionSets.IntegrationConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationConnection']>
/**
* Infer result type for IntegrationEdge selection sets.
*/
export type IntegrationEdge<$SelectionSet extends $$SelectionSets.IntegrationEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationEdge']>
/**
* The paid subscription of an organization.
*
* Infer result type for PaidSubscription selection sets.
*/
export type PaidSubscription<$SelectionSet extends $$SelectionSets.PaidSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PaidSubscription']>
/**
* An identity provider.
*
* Infer result type for IdentityProvider selection sets.
*/
export type IdentityProvider<$SelectionSet extends $$SelectionSets.IdentityProvider> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IdentityProvider']>
/**
* Infer result type for IssueDraftConnection selection sets.
*/
export type IssueDraftConnection<$SelectionSet extends $$SelectionSets.IssueDraftConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueDraftConnection']>
/**
* Infer result type for IssueDraftEdge selection sets.
*/
export type IssueDraftEdge<$SelectionSet extends $$SelectionSets.IssueDraftEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueDraftEdge']>
/**
* [Internal] A draft issue.
*
* Infer result type for IssueDraft selection sets.
*/
export type IssueDraft<$SelectionSet extends $$SelectionSets.IssueDraft> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueDraft']>
/**
* Infer result type for DraftConnection selection sets.
*/
export type DraftConnection<$SelectionSet extends $$SelectionSets.DraftConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DraftConnection']>
/**
* Infer result type for DraftEdge selection sets.
*/
export type DraftEdge<$SelectionSet extends $$SelectionSets.DraftEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DraftEdge']>
/**
* A general purpose draft. Used for comments, project updates, etc.
*
* Infer result type for Draft selection sets.
*/
export type Draft<$SelectionSet extends $$SelectionSets.Draft> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Draft']>
/**
* Infer result type for FacetConnection selection sets.
*/
export type FacetConnection<$SelectionSet extends $$SelectionSets.FacetConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FacetConnection']>
/**
* Infer result type for FacetEdge selection sets.
*/
export type FacetEdge<$SelectionSet extends $$SelectionSets.FacetEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FacetEdge']>
/**
* A custom view notification subscription.
*
* Infer result type for CustomViewNotificationSubscription selection sets.
*/
export type CustomViewNotificationSubscription<$SelectionSet extends $$SelectionSets.CustomViewNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewNotificationSubscription']>
/**
* A cycle notification subscription.
*
* Infer result type for CycleNotificationSubscription selection sets.
*/
export type CycleNotificationSubscription<$SelectionSet extends $$SelectionSets.CycleNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CycleNotificationSubscription']>
/**
* A label notification subscription.
*
* Infer result type for LabelNotificationSubscription selection sets.
*/
export type LabelNotificationSubscription<$SelectionSet extends $$SelectionSets.LabelNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['LabelNotificationSubscription']>
/**
* A project notification subscription.
*
* Infer result type for ProjectNotificationSubscription selection sets.
*/
export type ProjectNotificationSubscription<$SelectionSet extends $$SelectionSets.ProjectNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectNotificationSubscription']>
/**
* An initiative notification subscription.
*
* Infer result type for InitiativeNotificationSubscription selection sets.
*/
export type InitiativeNotificationSubscription<$SelectionSet extends $$SelectionSets.InitiativeNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeNotificationSubscription']>
/**
* A team notification subscription.
*
* Infer result type for TeamNotificationSubscription selection sets.
*/
export type TeamNotificationSubscription<$SelectionSet extends $$SelectionSets.TeamNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamNotificationSubscription']>
/**
* A user notification subscription.
*
* Infer result type for UserNotificationSubscription selection sets.
*/
export type UserNotificationSubscription<$SelectionSet extends $$SelectionSets.UserNotificationSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserNotificationSubscription']>
/**
* An issue related notification.
*
* Infer result type for IssueNotification selection sets.
*/
export type IssueNotification<$SelectionSet extends $$SelectionSets.IssueNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueNotification']>
/**
* A project related notification.
*
* Infer result type for ProjectNotification selection sets.
*/
export type ProjectNotification<$SelectionSet extends $$SelectionSets.ProjectNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectNotification']>
/**
* An initiative related notification.
*
* Infer result type for InitiativeNotification selection sets.
*/
export type InitiativeNotification<$SelectionSet extends $$SelectionSets.InitiativeNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeNotification']>
/**
* An oauth client approval related notification.
*
* Infer result type for OauthClientApprovalNotification selection sets.
*/
export type OauthClientApprovalNotification<$SelectionSet extends $$SelectionSets.OauthClientApprovalNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OauthClientApprovalNotification']>
/**
* Request to install OAuth clients on organizations and the response to the request.
*
* Infer result type for OauthClientApproval selection sets.
*/
export type OauthClientApproval<$SelectionSet extends $$SelectionSets.OauthClientApproval> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OauthClientApproval']>
/**
* A document related notification.
*
* Infer result type for DocumentNotification selection sets.
*/
export type DocumentNotification<$SelectionSet extends $$SelectionSets.DocumentNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentNotification']>
/**
* A post related notification.
*
* Infer result type for PostNotification selection sets.
*/
export type PostNotification<$SelectionSet extends $$SelectionSets.PostNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PostNotification']>
/**
* A customer need related notification.
*
* Infer result type for CustomerNeedNotification selection sets.
*/
export type CustomerNeedNotification<$SelectionSet extends $$SelectionSets.CustomerNeedNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedNotification']>
/**
* A customer related notification.
*
* Infer result type for CustomerNotification selection sets.
*/
export type CustomerNotification<$SelectionSet extends $$SelectionSets.CustomerNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNotification']>
/**
* A pull request related notification.
*
* Infer result type for PullRequestNotification selection sets.
*/
export type PullRequestNotification<$SelectionSet extends $$SelectionSets.PullRequestNotification> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PullRequestNotification']>
/**
* The settings of a user as a JSON object.
*
* Infer result type for UserSettings selection sets.
*/
export type UserSettings<$SelectionSet extends $$SelectionSets.UserSettings> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettings']>
/**
* A user's notification delivery preferences.
*
* Infer result type for NotificationDeliveryPreferences selection sets.
*/
export type NotificationDeliveryPreferences<$SelectionSet extends $$SelectionSets.NotificationDeliveryPreferences> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationDeliveryPreferences']>
/**
* A user's notification delivery preferences.
*
* Infer result type for NotificationDeliveryPreferencesChannel selection sets.
*/
export type NotificationDeliveryPreferencesChannel<$SelectionSet extends $$SelectionSets.NotificationDeliveryPreferencesChannel> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationDeliveryPreferencesChannel']>
/**
* A user's notification delivery schedule for a particular day.
*
* Infer result type for NotificationDeliveryPreferencesSchedule selection sets.
*/
export type NotificationDeliveryPreferencesSchedule<$SelectionSet extends $$SelectionSets.NotificationDeliveryPreferencesSchedule> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationDeliveryPreferencesSchedule']>
/**
* A user's notification delivery schedule for a particular day.
*
* Infer result type for NotificationDeliveryPreferencesDay selection sets.
*/
export type NotificationDeliveryPreferencesDay<$SelectionSet extends $$SelectionSets.NotificationDeliveryPreferencesDay> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationDeliveryPreferencesDay']>
/**
* A user's notification category preferences.
*
* Infer result type for NotificationCategoryPreferences selection sets.
*/
export type NotificationCategoryPreferences<$SelectionSet extends $$SelectionSets.NotificationCategoryPreferences> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationCategoryPreferences']>
/**
* A user's notification channel preferences, indicating if a channel is enabled or not
*
* Infer result type for NotificationChannelPreferences selection sets.
*/
export type NotificationChannelPreferences<$SelectionSet extends $$SelectionSets.NotificationChannelPreferences> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationChannelPreferences']>
/**
* Infer result type for UserSettingsTheme selection sets.
*/
export type UserSettingsTheme<$SelectionSet extends $$SelectionSets.UserSettingsTheme> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsTheme']>
/**
* Infer result type for UserSettingsCustomTheme selection sets.
*/
export type UserSettingsCustomTheme<$SelectionSet extends $$SelectionSets.UserSettingsCustomTheme> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsCustomTheme']>
/**
* Infer result type for UserSettingsCustomSidebarTheme selection sets.
*/
export type UserSettingsCustomSidebarTheme<$SelectionSet extends $$SelectionSets.UserSettingsCustomSidebarTheme> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsCustomSidebarTheme']>
/**
* Authentication session information.
*
* Infer result type for AuthenticationSessionResponse selection sets.
*/
export type AuthenticationSessionResponse<$SelectionSet extends $$SelectionSets.AuthenticationSessionResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuthenticationSessionResponse']>
/**
* Infer result type for TriageResponsibilityConnection selection sets.
*/
export type TriageResponsibilityConnection<$SelectionSet extends $$SelectionSets.TriageResponsibilityConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TriageResponsibilityConnection']>
/**
* Infer result type for TriageResponsibilityEdge selection sets.
*/
export type TriageResponsibilityEdge<$SelectionSet extends $$SelectionSets.TriageResponsibilityEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TriageResponsibilityEdge']>
/**
* Infer result type for TimeScheduleConnection selection sets.
*/
export type TimeScheduleConnection<$SelectionSet extends $$SelectionSets.TimeScheduleConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TimeScheduleConnection']>
/**
* Infer result type for TimeScheduleEdge selection sets.
*/
export type TimeScheduleEdge<$SelectionSet extends $$SelectionSets.TimeScheduleEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TimeScheduleEdge']>
/**
* Infer result type for ProjectFilterSuggestionPayload selection sets.
*/
export type ProjectFilterSuggestionPayload<$SelectionSet extends $$SelectionSets.ProjectFilterSuggestionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectFilterSuggestionPayload']>
/**
* Payload returned by semantic search.
*
* Infer result type for SemanticSearchPayload selection sets.
*/
export type SemanticSearchPayload<$SelectionSet extends $$SelectionSets.SemanticSearchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SemanticSearchPayload']>
/**
* A semantic search result reference.
*
* Infer result type for SemanticSearchResult selection sets.
*/
export type SemanticSearchResult<$SelectionSet extends $$SelectionSets.SemanticSearchResult> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SemanticSearchResult']>
/**
* Infer result type for DocumentSearchPayload selection sets.
*/
export type DocumentSearchPayload<$SelectionSet extends $$SelectionSets.DocumentSearchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentSearchPayload']>
/**
* Infer result type for DocumentSearchResultEdge selection sets.
*/
export type DocumentSearchResultEdge<$SelectionSet extends $$SelectionSets.DocumentSearchResultEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentSearchResultEdge']>
/**
* Infer result type for DocumentSearchResult selection sets.
*/
export type DocumentSearchResult<$SelectionSet extends $$SelectionSets.DocumentSearchResult> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentSearchResult']>
/**
* Contains requested archived model objects.
*
* Infer result type for ArchiveResponse selection sets.
*/
export type ArchiveResponse<$SelectionSet extends $$SelectionSets.ArchiveResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ArchiveResponse']>
/**
* Infer result type for ProjectSearchPayload selection sets.
*/
export type ProjectSearchPayload<$SelectionSet extends $$SelectionSets.ProjectSearchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectSearchPayload']>
/**
* Infer result type for ProjectSearchResultEdge selection sets.
*/
export type ProjectSearchResultEdge<$SelectionSet extends $$SelectionSets.ProjectSearchResultEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectSearchResultEdge']>
/**
* Infer result type for ProjectSearchResult selection sets.
*/
export type ProjectSearchResult<$SelectionSet extends $$SelectionSets.ProjectSearchResult> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectSearchResult']>
/**
* Infer result type for IssueSearchPayload selection sets.
*/
export type IssueSearchPayload<$SelectionSet extends $$SelectionSets.IssueSearchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSearchPayload']>
/**
* Infer result type for IssueSearchResultEdge selection sets.
*/
export type IssueSearchResultEdge<$SelectionSet extends $$SelectionSets.IssueSearchResultEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSearchResultEdge']>
/**
* Infer result type for IssueSearchResult selection sets.
*/
export type IssueSearchResult<$SelectionSet extends $$SelectionSets.IssueSearchResult> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueSearchResult']>
/**
* Infer result type for RoadmapToProjectConnection selection sets.
*/
export type RoadmapToProjectConnection<$SelectionSet extends $$SelectionSets.RoadmapToProjectConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapToProjectConnection']>
/**
* Infer result type for RoadmapToProjectEdge selection sets.
*/
export type RoadmapToProjectEdge<$SelectionSet extends $$SelectionSets.RoadmapToProjectEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapToProjectEdge']>
/**
* [Deprecated] Join table between projects and roadmaps.
*
* Infer result type for RoadmapToProject selection sets.
*/
export type RoadmapToProject<$SelectionSet extends $$SelectionSets.RoadmapToProject> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapToProject']>
/**
* [Deprecated] A roadmap for projects.
*
* Infer result type for Roadmap selection sets.
*/
export type Roadmap<$SelectionSet extends $$SelectionSets.Roadmap> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Roadmap']>
/**
* Infer result type for RoadmapConnection selection sets.
*/
export type RoadmapConnection<$SelectionSet extends $$SelectionSets.RoadmapConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapConnection']>
/**
* Infer result type for RoadmapEdge selection sets.
*/
export type RoadmapEdge<$SelectionSet extends $$SelectionSets.RoadmapEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapEdge']>
/**
* Infer result type for ReleasePipelineConnection selection sets.
*/
export type ReleasePipelineConnection<$SelectionSet extends $$SelectionSets.ReleasePipelineConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePipelineConnection']>
/**
* Infer result type for ReleasePipelineEdge selection sets.
*/
export type ReleasePipelineEdge<$SelectionSet extends $$SelectionSets.ReleasePipelineEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePipelineEdge']>
/**
* Infer result type for RateLimitPayload selection sets.
*/
export type RateLimitPayload<$SelectionSet extends $$SelectionSets.RateLimitPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RateLimitPayload']>
/**
* Infer result type for RateLimitResultPayload selection sets.
*/
export type RateLimitResultPayload<$SelectionSet extends $$SelectionSets.RateLimitResultPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RateLimitResultPayload']>
/**
* Infer result type for PushSubscriptionTestPayload selection sets.
*/
export type PushSubscriptionTestPayload<$SelectionSet extends $$SelectionSets.PushSubscriptionTestPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PushSubscriptionTestPayload']>
/**
* Infer result type for ProjectStatusConnection selection sets.
*/
export type ProjectStatusConnection<$SelectionSet extends $$SelectionSets.ProjectStatusConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatusConnection']>
/**
* Infer result type for ProjectStatusEdge selection sets.
*/
export type ProjectStatusEdge<$SelectionSet extends $$SelectionSets.ProjectStatusEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatusEdge']>
/**
* Infer result type for ProjectStatusCountPayload selection sets.
*/
export type ProjectStatusCountPayload<$SelectionSet extends $$SelectionSets.ProjectStatusCountPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatusCountPayload']>
/**
* Infer result type for OrganizationExistsPayload selection sets.
*/
export type OrganizationExistsPayload<$SelectionSet extends $$SelectionSets.OrganizationExistsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationExistsPayload']>
/**
* Infer result type for OrganizationMeta selection sets.
*/
export type OrganizationMeta<$SelectionSet extends $$SelectionSets.OrganizationMeta> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationMeta']>
/**
* Infer result type for OrganizationInviteConnection selection sets.
*/
export type OrganizationInviteConnection<$SelectionSet extends $$SelectionSets.OrganizationInviteConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInviteConnection']>
/**
* Infer result type for OrganizationInviteEdge selection sets.
*/
export type OrganizationInviteEdge<$SelectionSet extends $$SelectionSets.OrganizationInviteEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInviteEdge']>
/**
* An invitation to the organization that has been sent via email.
*
* Infer result type for OrganizationInvite selection sets.
*/
export type OrganizationInvite<$SelectionSet extends $$SelectionSets.OrganizationInvite> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInvite']>
/**
* Infer result type for OrganizationInviteFullDetailsPayload selection sets.
*/
export type OrganizationInviteFullDetailsPayload<$SelectionSet extends $$SelectionSets.OrganizationInviteFullDetailsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInviteFullDetailsPayload']>
/**
* Infer result type for OrganizationAcceptedOrExpiredInviteDetailsPayload selection sets.
*/
export type OrganizationAcceptedOrExpiredInviteDetailsPayload<$SelectionSet extends $$SelectionSets.OrganizationAcceptedOrExpiredInviteDetailsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationAcceptedOrExpiredInviteDetailsPayload']>
/**
* [INTERNAL] Domain claim request response.
*
* Infer result type for OrganizationDomainClaimPayload selection sets.
*/
export type OrganizationDomainClaimPayload<$SelectionSet extends $$SelectionSets.OrganizationDomainClaimPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationDomainClaimPayload']>
/**
* Infer result type for NotificationSubscriptionConnection selection sets.
*/
export type NotificationSubscriptionConnection<$SelectionSet extends $$SelectionSets.NotificationSubscriptionConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationSubscriptionConnection']>
/**
* Infer result type for NotificationSubscriptionEdge selection sets.
*/
export type NotificationSubscriptionEdge<$SelectionSet extends $$SelectionSets.NotificationSubscriptionEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationSubscriptionEdge']>
/**
* Infer result type for NotificationConnection selection sets.
*/
export type NotificationConnection<$SelectionSet extends $$SelectionSets.NotificationConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationConnection']>
/**
* Infer result type for NotificationEdge selection sets.
*/
export type NotificationEdge<$SelectionSet extends $$SelectionSets.NotificationEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationEdge']>
/**
* Infer result type for IssueToReleaseConnection selection sets.
*/
export type IssueToReleaseConnection<$SelectionSet extends $$SelectionSets.IssueToReleaseConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueToReleaseConnection']>
/**
* Infer result type for IssueToReleaseEdge selection sets.
*/
export type IssueToReleaseEdge<$SelectionSet extends $$SelectionSets.IssueToReleaseEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueToReleaseEdge']>
/**
* [Internal] Join table between issues and releases.
*
* Infer result type for IssueToRelease selection sets.
*/
export type IssueToRelease<$SelectionSet extends $$SelectionSets.IssueToRelease> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueToRelease']>
/**
* Infer result type for IssuePriorityValue selection sets.
*/
export type IssuePriorityValue<$SelectionSet extends $$SelectionSets.IssuePriorityValue> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssuePriorityValue']>
/**
* Infer result type for IssueFilterSuggestionPayload selection sets.
*/
export type IssueFilterSuggestionPayload<$SelectionSet extends $$SelectionSets.IssueFilterSuggestionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueFilterSuggestionPayload']>
/**
* Infer result type for RepositorySuggestionsPayload selection sets.
*/
export type RepositorySuggestionsPayload<$SelectionSet extends $$SelectionSets.RepositorySuggestionsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RepositorySuggestionsPayload']>
/**
* Infer result type for RepositorySuggestion selection sets.
*/
export type RepositorySuggestion<$SelectionSet extends $$SelectionSets.RepositorySuggestion> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RepositorySuggestion']>
/**
* Infer result type for IssueImportCheckPayload selection sets.
*/
export type IssueImportCheckPayload<$SelectionSet extends $$SelectionSets.IssueImportCheckPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImportCheckPayload']>
/**
* Whether an issue import can be synced at the end of an import or not
*
* Infer result type for IssueImportSyncCheckPayload selection sets.
*/
export type IssueImportSyncCheckPayload<$SelectionSet extends $$SelectionSets.IssueImportSyncCheckPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImportSyncCheckPayload']>
/**
* Whether a custom JQL query is valid or not
*
* Infer result type for IssueImportJqlCheckPayload selection sets.
*/
export type IssueImportJqlCheckPayload<$SelectionSet extends $$SelectionSets.IssueImportJqlCheckPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImportJqlCheckPayload']>
/**
* Infer result type for IntegrationTemplateConnection selection sets.
*/
export type IntegrationTemplateConnection<$SelectionSet extends $$SelectionSets.IntegrationTemplateConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationTemplateConnection']>
/**
* Infer result type for IntegrationTemplateEdge selection sets.
*/
export type IntegrationTemplateEdge<$SelectionSet extends $$SelectionSets.IntegrationTemplateEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationTemplateEdge']>
/**
* Join table between templates and integrations.
*
* Infer result type for IntegrationTemplate selection sets.
*/
export type IntegrationTemplate<$SelectionSet extends $$SelectionSets.IntegrationTemplate> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationTemplate']>
/**
* Infer result type for GitHubEnterpriseServerInstallVerificationPayload selection sets.
*/
export type GitHubEnterpriseServerInstallVerificationPayload<$SelectionSet extends $$SelectionSets.GitHubEnterpriseServerInstallVerificationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitHubEnterpriseServerInstallVerificationPayload']>
/**
* Infer result type for IntegrationHasScopesPayload selection sets.
*/
export type IntegrationHasScopesPayload<$SelectionSet extends $$SelectionSets.IntegrationHasScopesPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationHasScopesPayload']>
/**
* Infer result type for InitiativeRelationConnection selection sets.
*/
export type InitiativeRelationConnection<$SelectionSet extends $$SelectionSets.InitiativeRelationConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeRelationConnection']>
/**
* Infer result type for InitiativeRelationEdge selection sets.
*/
export type InitiativeRelationEdge<$SelectionSet extends $$SelectionSets.InitiativeRelationEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeRelationEdge']>
/**
* A relation representing the dependency between two initiatives.
*
* Infer result type for InitiativeRelation selection sets.
*/
export type InitiativeRelation<$SelectionSet extends $$SelectionSets.InitiativeRelation> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeRelation']>
/**
* Infer result type for FetchDataPayload selection sets.
*/
export type FetchDataPayload<$SelectionSet extends $$SelectionSets.FetchDataPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FetchDataPayload']>
/**
* Infer result type for ExternalUserConnection selection sets.
*/
export type ExternalUserConnection<$SelectionSet extends $$SelectionSets.ExternalUserConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalUserConnection']>
/**
* Infer result type for ExternalUserEdge selection sets.
*/
export type ExternalUserEdge<$SelectionSet extends $$SelectionSets.ExternalUserEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalUserEdge']>
/**
* Infer result type for EmojiConnection selection sets.
*/
export type EmojiConnection<$SelectionSet extends $$SelectionSets.EmojiConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmojiConnection']>
/**
* Infer result type for EmojiEdge selection sets.
*/
export type EmojiEdge<$SelectionSet extends $$SelectionSets.EmojiEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmojiEdge']>
/**
* A custom emoji.
*
* Infer result type for Emoji selection sets.
*/
export type Emoji<$SelectionSet extends $$SelectionSets.Emoji> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Emoji']>
/**
* An email address that can be used for submitting issues.
*
* Infer result type for EmailIntakeAddress selection sets.
*/
export type EmailIntakeAddress<$SelectionSet extends $$SelectionSets.EmailIntakeAddress> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmailIntakeAddress']>
/**
* SES domain identity used for sending emails from a custom domain.
*
* Infer result type for SesDomainIdentity selection sets.
*/
export type SesDomainIdentity<$SelectionSet extends $$SelectionSets.SesDomainIdentity> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SesDomainIdentity']>
/**
* A DNS record for a SES domain identity.
*
* Infer result type for SesDomainIdentityDnsRecord selection sets.
*/
export type SesDomainIdentityDnsRecord<$SelectionSet extends $$SelectionSets.SesDomainIdentityDnsRecord> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SesDomainIdentityDnsRecord']>
/**
* Infer result type for DocumentContentHistoryPayload selection sets.
*/
export type DocumentContentHistoryPayload<$SelectionSet extends $$SelectionSets.DocumentContentHistoryPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentContentHistoryPayload']>
/**
* Infer result type for DocumentContentHistoryType selection sets.
*/
export type DocumentContentHistoryType<$SelectionSet extends $$SelectionSets.DocumentContentHistoryType> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentContentHistoryType']>
/**
* Infer result type for CustomerTierConnection selection sets.
*/
export type CustomerTierConnection<$SelectionSet extends $$SelectionSets.CustomerTierConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerTierConnection']>
/**
* Infer result type for CustomerTierEdge selection sets.
*/
export type CustomerTierEdge<$SelectionSet extends $$SelectionSets.CustomerTierEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerTierEdge']>
/**
* Infer result type for CustomerStatusConnection selection sets.
*/
export type CustomerStatusConnection<$SelectionSet extends $$SelectionSets.CustomerStatusConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerStatusConnection']>
/**
* Infer result type for CustomerStatusEdge selection sets.
*/
export type CustomerStatusEdge<$SelectionSet extends $$SelectionSets.CustomerStatusEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerStatusEdge']>
/**
* Infer result type for CustomerConnection selection sets.
*/
export type CustomerConnection<$SelectionSet extends $$SelectionSets.CustomerConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerConnection']>
/**
* Infer result type for CustomerEdge selection sets.
*/
export type CustomerEdge<$SelectionSet extends $$SelectionSets.CustomerEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerEdge']>
/**
* Infer result type for IssueTitleSuggestionFromCustomerRequestPayload selection sets.
*/
export type IssueTitleSuggestionFromCustomerRequestPayload<$SelectionSet extends $$SelectionSets.IssueTitleSuggestionFromCustomerRequestPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueTitleSuggestionFromCustomerRequestPayload']>
/**
* Infer result type for CustomViewConnection selection sets.
*/
export type CustomViewConnection<$SelectionSet extends $$SelectionSets.CustomViewConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewConnection']>
/**
* Infer result type for CustomViewEdge selection sets.
*/
export type CustomViewEdge<$SelectionSet extends $$SelectionSets.CustomViewEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewEdge']>
/**
* Infer result type for CustomViewSuggestionPayload selection sets.
*/
export type CustomViewSuggestionPayload<$SelectionSet extends $$SelectionSets.CustomViewSuggestionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewSuggestionPayload']>
/**
* Infer result type for CustomViewHasSubscribersPayload selection sets.
*/
export type CustomViewHasSubscribersPayload<$SelectionSet extends $$SelectionSets.CustomViewHasSubscribersPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewHasSubscribersPayload']>
/**
* Infer result type for AuthResolverResponse selection sets.
*/
export type AuthResolverResponse<$SelectionSet extends $$SelectionSets.AuthResolverResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuthResolverResponse']>
/**
* A user that has access to the the resources of an organization.
*
* Infer result type for AuthUser selection sets.
*/
export type AuthUser<$SelectionSet extends $$SelectionSets.AuthUser> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuthUser']>
/**
* An organization. Organizations are root-level objects that contain users and teams.
*
* Infer result type for AuthOrganization selection sets.
*/
export type AuthOrganization<$SelectionSet extends $$SelectionSets.AuthOrganization> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuthOrganization']>
/**
* An identity provider.
*
* Infer result type for AuthIdentityProvider selection sets.
*/
export type AuthIdentityProvider<$SelectionSet extends $$SelectionSets.AuthIdentityProvider> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuthIdentityProvider']>
/**
* Infer result type for SsoUrlFromEmailResponse selection sets.
*/
export type SsoUrlFromEmailResponse<$SelectionSet extends $$SelectionSets.SsoUrlFromEmailResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SsoUrlFromEmailResponse']>
/**
* Infer result type for AuditEntryType selection sets.
*/
export type AuditEntryType<$SelectionSet extends $$SelectionSets.AuditEntryType> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuditEntryType']>
/**
* Infer result type for AuditEntryConnection selection sets.
*/
export type AuditEntryConnection<$SelectionSet extends $$SelectionSets.AuditEntryConnection> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuditEntryConnection']>
/**
* Infer result type for AuditEntryEdge selection sets.
*/
export type AuditEntryEdge<$SelectionSet extends $$SelectionSets.AuditEntryEdge> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuditEntryEdge']>
/**
* Workspace audit log entry object.
*
* Infer result type for AuditEntry selection sets.
*/
export type AuditEntry<$SelectionSet extends $$SelectionSets.AuditEntry> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AuditEntry']>
/**
* Infer result type for AttachmentSourcesPayload selection sets.
*/
export type AttachmentSourcesPayload<$SelectionSet extends $$SelectionSets.AttachmentSourcesPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AttachmentSourcesPayload']>
/**
* Settings for an Asks web form.
*
* Infer result type for AsksWebSettings selection sets.
*/
export type AsksWebSettings<$SelectionSet extends $$SelectionSets.AsksWebSettings> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AsksWebSettings']>
/**
* Public information of the OAuth application.
*
* Infer result type for Application selection sets.
*/
export type Application<$SelectionSet extends $$SelectionSets.Application> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Application']>
/**
* Infer result type for WorkflowStatePayload selection sets.
*/
export type WorkflowStatePayload<$SelectionSet extends $$SelectionSets.WorkflowStatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowStatePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for WorkflowStateArchivePayload selection sets.
*/
export type WorkflowStateArchivePayload<$SelectionSet extends $$SelectionSets.WorkflowStateArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WorkflowStateArchivePayload']>
/**
* Infer result type for WebhookPayload selection sets.
*/
export type WebhookPayload<$SelectionSet extends $$SelectionSets.WebhookPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WebhookPayload']>
/**
* A generic payload return from entity deletion mutations.
*
* Infer result type for DeletePayload selection sets.
*/
export type DeletePayload<$SelectionSet extends $$SelectionSets.DeletePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DeletePayload']>
/**
* Infer result type for WebhookRotateSecretPayload selection sets.
*/
export type WebhookRotateSecretPayload<$SelectionSet extends $$SelectionSets.WebhookRotateSecretPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['WebhookRotateSecretPayload']>
/**
* Infer result type for ViewPreferencesPayload selection sets.
*/
export type ViewPreferencesPayload<$SelectionSet extends $$SelectionSets.ViewPreferencesPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ViewPreferencesPayload']>
/**
* Infer result type for UserSettingsPayload selection sets.
*/
export type UserSettingsPayload<$SelectionSet extends $$SelectionSets.UserSettingsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsPayload']>
/**
* Infer result type for UserSettingsFlagsResetPayload selection sets.
*/
export type UserSettingsFlagsResetPayload<$SelectionSet extends $$SelectionSets.UserSettingsFlagsResetPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsFlagsResetPayload']>
/**
* Infer result type for UserSettingsFlagPayload selection sets.
*/
export type UserSettingsFlagPayload<$SelectionSet extends $$SelectionSets.UserSettingsFlagPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserSettingsFlagPayload']>
/**
* Infer result type for UserPayload selection sets.
*/
export type UserPayload<$SelectionSet extends $$SelectionSets.UserPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserPayload']>
/**
* Infer result type for UserAdminPayload selection sets.
*/
export type UserAdminPayload<$SelectionSet extends $$SelectionSets.UserAdminPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UserAdminPayload']>
/**
* Infer result type for TriageResponsibilityPayload selection sets.
*/
export type TriageResponsibilityPayload<$SelectionSet extends $$SelectionSets.TriageResponsibilityPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TriageResponsibilityPayload']>
/**
* Infer result type for TimeSchedulePayload selection sets.
*/
export type TimeSchedulePayload<$SelectionSet extends $$SelectionSets.TimeSchedulePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TimeSchedulePayload']>
/**
* Infer result type for TemplatePayload selection sets.
*/
export type TemplatePayload<$SelectionSet extends $$SelectionSets.TemplatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TemplatePayload']>
/**
* Infer result type for ProjectPayload selection sets.
*/
export type ProjectPayload<$SelectionSet extends $$SelectionSets.ProjectPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectPayload']>
/**
* Infer result type for SuccessPayload selection sets.
*/
export type SuccessPayload<$SelectionSet extends $$SelectionSets.SuccessPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SuccessPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ProjectArchivePayload selection sets.
*/
export type ProjectArchivePayload<$SelectionSet extends $$SelectionSets.ProjectArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectArchivePayload']>
/**
* Infer result type for TeamPayload selection sets.
*/
export type TeamPayload<$SelectionSet extends $$SelectionSets.TeamPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for TeamArchivePayload selection sets.
*/
export type TeamArchivePayload<$SelectionSet extends $$SelectionSets.TeamArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamArchivePayload']>
/**
* Infer result type for TeamMembershipPayload selection sets.
*/
export type TeamMembershipPayload<$SelectionSet extends $$SelectionSets.TeamMembershipPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['TeamMembershipPayload']>
/**
* Infer result type for RoadmapToProjectPayload selection sets.
*/
export type RoadmapToProjectPayload<$SelectionSet extends $$SelectionSets.RoadmapToProjectPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapToProjectPayload']>
/**
* Infer result type for RoadmapPayload selection sets.
*/
export type RoadmapPayload<$SelectionSet extends $$SelectionSets.RoadmapPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for RoadmapArchivePayload selection sets.
*/
export type RoadmapArchivePayload<$SelectionSet extends $$SelectionSets.RoadmapArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['RoadmapArchivePayload']>
/**
* Infer result type for CreateCsvExportReportPayload selection sets.
*/
export type CreateCsvExportReportPayload<$SelectionSet extends $$SelectionSets.CreateCsvExportReportPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CreateCsvExportReportPayload']>
/**
* Infer result type for ReleaseStagePayload selection sets.
*/
export type ReleaseStagePayload<$SelectionSet extends $$SelectionSets.ReleaseStagePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseStagePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ReleaseStageArchivePayload selection sets.
*/
export type ReleaseStageArchivePayload<$SelectionSet extends $$SelectionSets.ReleaseStageArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseStageArchivePayload']>
/**
* Infer result type for ReleasePayload selection sets.
*/
export type ReleasePayload<$SelectionSet extends $$SelectionSets.ReleasePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ReleaseArchivePayload selection sets.
*/
export type ReleaseArchivePayload<$SelectionSet extends $$SelectionSets.ReleaseArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleaseArchivePayload']>
/**
* Infer result type for ReleasePipelinePayload selection sets.
*/
export type ReleasePipelinePayload<$SelectionSet extends $$SelectionSets.ReleasePipelinePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePipelinePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ReleasePipelineArchivePayload selection sets.
*/
export type ReleasePipelineArchivePayload<$SelectionSet extends $$SelectionSets.ReleasePipelineArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReleasePipelineArchivePayload']>
/**
* Infer result type for ReactionPayload selection sets.
*/
export type ReactionPayload<$SelectionSet extends $$SelectionSets.ReactionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ReactionPayload']>
/**
* Infer result type for PushSubscriptionPayload selection sets.
*/
export type PushSubscriptionPayload<$SelectionSet extends $$SelectionSets.PushSubscriptionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PushSubscriptionPayload']>
/**
* A user's web or mobile push notification subscription.
*
* Infer result type for PushSubscription selection sets.
*/
export type PushSubscription<$SelectionSet extends $$SelectionSets.PushSubscription> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PushSubscription']>
/**
* Infer result type for ProjectUpdatePayload selection sets.
*/
export type ProjectUpdatePayload<$SelectionSet extends $$SelectionSets.ProjectUpdatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdatePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ProjectUpdateArchivePayload selection sets.
*/
export type ProjectUpdateArchivePayload<$SelectionSet extends $$SelectionSets.ProjectUpdateArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdateArchivePayload']>
/**
* Infer result type for ProjectUpdateReminderPayload selection sets.
*/
export type ProjectUpdateReminderPayload<$SelectionSet extends $$SelectionSets.ProjectUpdateReminderPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectUpdateReminderPayload']>
/**
* Infer result type for ProjectStatusPayload selection sets.
*/
export type ProjectStatusPayload<$SelectionSet extends $$SelectionSets.ProjectStatusPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatusPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for ProjectStatusArchivePayload selection sets.
*/
export type ProjectStatusArchivePayload<$SelectionSet extends $$SelectionSets.ProjectStatusArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectStatusArchivePayload']>
/**
* Infer result type for ProjectRelationPayload selection sets.
*/
export type ProjectRelationPayload<$SelectionSet extends $$SelectionSets.ProjectRelationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectRelationPayload']>
/**
* Infer result type for ProjectMilestonePayload selection sets.
*/
export type ProjectMilestonePayload<$SelectionSet extends $$SelectionSets.ProjectMilestonePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestonePayload']>
/**
* Infer result type for ProjectMilestoneMovePayload selection sets.
*/
export type ProjectMilestoneMovePayload<$SelectionSet extends $$SelectionSets.ProjectMilestoneMovePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestoneMovePayload']>
/**
* Infer result type for ProjectMilestoneMoveIssueToTeam selection sets.
*/
export type ProjectMilestoneMoveIssueToTeam<$SelectionSet extends $$SelectionSets.ProjectMilestoneMoveIssueToTeam> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestoneMoveIssueToTeam']>
/**
* Infer result type for ProjectMilestoneMoveProjectTeams selection sets.
*/
export type ProjectMilestoneMoveProjectTeams<$SelectionSet extends $$SelectionSets.ProjectMilestoneMoveProjectTeams> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectMilestoneMoveProjectTeams']>
/**
* Infer result type for ProjectLabelPayload selection sets.
*/
export type ProjectLabelPayload<$SelectionSet extends $$SelectionSets.ProjectLabelPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ProjectLabelPayload']>
/**
* Infer result type for OrganizationPayload selection sets.
*/
export type OrganizationPayload<$SelectionSet extends $$SelectionSets.OrganizationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationPayload']>
/**
* Infer result type for OrganizationDeletePayload selection sets.
*/
export type OrganizationDeletePayload<$SelectionSet extends $$SelectionSets.OrganizationDeletePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationDeletePayload']>
/**
* Infer result type for OrganizationCancelDeletePayload selection sets.
*/
export type OrganizationCancelDeletePayload<$SelectionSet extends $$SelectionSets.OrganizationCancelDeletePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationCancelDeletePayload']>
/**
* Infer result type for OrganizationStartTrialPayload selection sets.
*/
export type OrganizationStartTrialPayload<$SelectionSet extends $$SelectionSets.OrganizationStartTrialPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationStartTrialPayload']>
/**
* Infer result type for OrganizationInvitePayload selection sets.
*/
export type OrganizationInvitePayload<$SelectionSet extends $$SelectionSets.OrganizationInvitePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInvitePayload']>
/**
* [INTERNAL] Organization domain operation response.
*
* Infer result type for OrganizationDomainSimplePayload selection sets.
*/
export type OrganizationDomainSimplePayload<$SelectionSet extends $$SelectionSets.OrganizationDomainSimplePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationDomainSimplePayload']>
/**
* [INTERNAL] Organization domain operation response.
*
* Infer result type for OrganizationDomainPayload selection sets.
*/
export type OrganizationDomainPayload<$SelectionSet extends $$SelectionSets.OrganizationDomainPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationDomainPayload']>
/**
* Defines the use of a domain by an organization.
*
* Infer result type for OrganizationDomain selection sets.
*/
export type OrganizationDomain<$SelectionSet extends $$SelectionSets.OrganizationDomain> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationDomain']>
/**
* Infer result type for NotificationSubscriptionPayload selection sets.
*/
export type NotificationSubscriptionPayload<$SelectionSet extends $$SelectionSets.NotificationSubscriptionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationSubscriptionPayload']>
/**
* Infer result type for NotificationPayload selection sets.
*/
export type NotificationPayload<$SelectionSet extends $$SelectionSets.NotificationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationPayload']>
/**
* Infer result type for NotificationBatchActionPayload selection sets.
*/
export type NotificationBatchActionPayload<$SelectionSet extends $$SelectionSets.NotificationBatchActionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationBatchActionPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for NotificationArchivePayload selection sets.
*/
export type NotificationArchivePayload<$SelectionSet extends $$SelectionSets.NotificationArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationArchivePayload']>
/**
* [ALPHA] The result of an issueToRelease mutation.
*
* Infer result type for IssueToReleasePayload selection sets.
*/
export type IssueToReleasePayload<$SelectionSet extends $$SelectionSets.IssueToReleasePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueToReleasePayload']>
/**
* Infer result type for IssuePayload selection sets.
*/
export type IssuePayload<$SelectionSet extends $$SelectionSets.IssuePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssuePayload']>
/**
* Infer result type for IssueBatchPayload selection sets.
*/
export type IssueBatchPayload<$SelectionSet extends $$SelectionSets.IssueBatchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueBatchPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for IssueArchivePayload selection sets.
*/
export type IssueArchivePayload<$SelectionSet extends $$SelectionSets.IssueArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueArchivePayload']>
/**
* Infer result type for IssueRelationPayload selection sets.
*/
export type IssueRelationPayload<$SelectionSet extends $$SelectionSets.IssueRelationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueRelationPayload']>
/**
* Infer result type for IssueLabelPayload selection sets.
*/
export type IssueLabelPayload<$SelectionSet extends $$SelectionSets.IssueLabelPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueLabelPayload']>
/**
* Infer result type for IssueImportPayload selection sets.
*/
export type IssueImportPayload<$SelectionSet extends $$SelectionSets.IssueImportPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImportPayload']>
/**
* Infer result type for IssueImportDeletePayload selection sets.
*/
export type IssueImportDeletePayload<$SelectionSet extends $$SelectionSets.IssueImportDeletePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IssueImportDeletePayload']>
/**
* Infer result type for IntegrationsSettingsPayload selection sets.
*/
export type IntegrationsSettingsPayload<$SelectionSet extends $$SelectionSets.IntegrationsSettingsPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationsSettingsPayload']>
/**
* Infer result type for IntegrationTemplatePayload selection sets.
*/
export type IntegrationTemplatePayload<$SelectionSet extends $$SelectionSets.IntegrationTemplatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationTemplatePayload']>
/**
* Infer result type for IntegrationPayload selection sets.
*/
export type IntegrationPayload<$SelectionSet extends $$SelectionSets.IntegrationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationPayload']>
/**
* Infer result type for GitHubCommitIntegrationPayload selection sets.
*/
export type GitHubCommitIntegrationPayload<$SelectionSet extends $$SelectionSets.GitHubCommitIntegrationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitHubCommitIntegrationPayload']>
/**
* Infer result type for GitHubEnterpriseServerPayload selection sets.
*/
export type GitHubEnterpriseServerPayload<$SelectionSet extends $$SelectionSets.GitHubEnterpriseServerPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitHubEnterpriseServerPayload']>
/**
* Infer result type for GitLabIntegrationCreatePayload selection sets.
*/
export type GitLabIntegrationCreatePayload<$SelectionSet extends $$SelectionSets.GitLabIntegrationCreatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitLabIntegrationCreatePayload']>
/**
* Infer result type for GitLabTestConnectionPayload selection sets.
*/
export type GitLabTestConnectionPayload<$SelectionSet extends $$SelectionSets.GitLabTestConnectionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitLabTestConnectionPayload']>
/**
* Infer result type for IntegrationSlackWorkspaceNamePayload selection sets.
*/
export type IntegrationSlackWorkspaceNamePayload<$SelectionSet extends $$SelectionSets.IntegrationSlackWorkspaceNamePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationSlackWorkspaceNamePayload']>
/**
* Infer result type for AsksChannelConnectPayload selection sets.
*/
export type AsksChannelConnectPayload<$SelectionSet extends $$SelectionSets.AsksChannelConnectPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AsksChannelConnectPayload']>
/**
* Object for mapping Slack channel IDs to names and other settings.
*
* Infer result type for SlackChannelNameMapping selection sets.
*/
export type SlackChannelNameMapping<$SelectionSet extends $$SelectionSets.SlackChannelNameMapping> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SlackChannelNameMapping']>
/**
* Tuple for mapping Slack channel IDs to names.
*
* Infer result type for SlackAsksTeamSettings selection sets.
*/
export type SlackAsksTeamSettings<$SelectionSet extends $$SelectionSets.SlackAsksTeamSettings> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SlackAsksTeamSettings']>
/**
* Infer result type for SlackChannelConnectPayload selection sets.
*/
export type SlackChannelConnectPayload<$SelectionSet extends $$SelectionSets.SlackChannelConnectPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['SlackChannelConnectPayload']>
/**
* Infer result type for IntegrationRequestPayload selection sets.
*/
export type IntegrationRequestPayload<$SelectionSet extends $$SelectionSets.IntegrationRequestPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['IntegrationRequestPayload']>
/**
* Infer result type for InitiativeUpdatePayload selection sets.
*/
export type InitiativeUpdatePayload<$SelectionSet extends $$SelectionSets.InitiativeUpdatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdatePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for InitiativeUpdateArchivePayload selection sets.
*/
export type InitiativeUpdateArchivePayload<$SelectionSet extends $$SelectionSets.InitiativeUpdateArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdateArchivePayload']>
/**
* Infer result type for InitiativeUpdateReminderPayload selection sets.
*/
export type InitiativeUpdateReminderPayload<$SelectionSet extends $$SelectionSets.InitiativeUpdateReminderPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeUpdateReminderPayload']>
/**
* The result of a initiativeToProject mutation.
*
* Infer result type for InitiativeToProjectPayload selection sets.
*/
export type InitiativeToProjectPayload<$SelectionSet extends $$SelectionSets.InitiativeToProjectPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeToProjectPayload']>
/**
* The payload returned by the initiative mutations.
*
* Infer result type for InitiativePayload selection sets.
*/
export type InitiativePayload<$SelectionSet extends $$SelectionSets.InitiativePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for InitiativeArchivePayload selection sets.
*/
export type InitiativeArchivePayload<$SelectionSet extends $$SelectionSets.InitiativeArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeArchivePayload']>
/**
* Infer result type for InitiativeRelationPayload selection sets.
*/
export type InitiativeRelationPayload<$SelectionSet extends $$SelectionSets.InitiativeRelationPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['InitiativeRelationPayload']>
/**
* Infer result type for GitAutomationTargetBranchPayload selection sets.
*/
export type GitAutomationTargetBranchPayload<$SelectionSet extends $$SelectionSets.GitAutomationTargetBranchPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationTargetBranchPayload']>
/**
* Infer result type for GitAutomationStatePayload selection sets.
*/
export type GitAutomationStatePayload<$SelectionSet extends $$SelectionSets.GitAutomationStatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['GitAutomationStatePayload']>
/**
* Infer result type for UploadPayload selection sets.
*/
export type UploadPayload<$SelectionSet extends $$SelectionSets.UploadPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UploadPayload']>
/**
* Object representing Google Cloud upload policy, plus additional data.
*
* Infer result type for UploadFile selection sets.
*/
export type UploadFile<$SelectionSet extends $$SelectionSets.UploadFile> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UploadFile']>
/**
* Infer result type for UploadFileHeader selection sets.
*/
export type UploadFileHeader<$SelectionSet extends $$SelectionSets.UploadFileHeader> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['UploadFileHeader']>
/**
* Infer result type for ImageUploadFromUrlPayload selection sets.
*/
export type ImageUploadFromUrlPayload<$SelectionSet extends $$SelectionSets.ImageUploadFromUrlPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ImageUploadFromUrlPayload']>
/**
* Infer result type for FileUploadDeletePayload selection sets.
*/
export type FileUploadDeletePayload<$SelectionSet extends $$SelectionSets.FileUploadDeletePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FileUploadDeletePayload']>
/**
* Infer result type for FavoritePayload selection sets.
*/
export type FavoritePayload<$SelectionSet extends $$SelectionSets.FavoritePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FavoritePayload']>
/**
* Infer result type for EntityExternalLinkPayload selection sets.
*/
export type EntityExternalLinkPayload<$SelectionSet extends $$SelectionSets.EntityExternalLinkPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EntityExternalLinkPayload']>
/**
* Infer result type for EmojiPayload selection sets.
*/
export type EmojiPayload<$SelectionSet extends $$SelectionSets.EmojiPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmojiPayload']>
/**
* Infer result type for EmailUnsubscribePayload selection sets.
*/
export type EmailUnsubscribePayload<$SelectionSet extends $$SelectionSets.EmailUnsubscribePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmailUnsubscribePayload']>
/**
* Infer result type for EmailIntakeAddressPayload selection sets.
*/
export type EmailIntakeAddressPayload<$SelectionSet extends $$SelectionSets.EmailIntakeAddressPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmailIntakeAddressPayload']>
/**
* Infer result type for DocumentPayload selection sets.
*/
export type DocumentPayload<$SelectionSet extends $$SelectionSets.DocumentPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentPayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for DocumentArchivePayload selection sets.
*/
export type DocumentArchivePayload<$SelectionSet extends $$SelectionSets.DocumentArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['DocumentArchivePayload']>
/**
* Infer result type for CyclePayload selection sets.
*/
export type CyclePayload<$SelectionSet extends $$SelectionSets.CyclePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CyclePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for CycleArchivePayload selection sets.
*/
export type CycleArchivePayload<$SelectionSet extends $$SelectionSets.CycleArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CycleArchivePayload']>
/**
* Infer result type for CustomerTierPayload selection sets.
*/
export type CustomerTierPayload<$SelectionSet extends $$SelectionSets.CustomerTierPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerTierPayload']>
/**
* Infer result type for CustomerStatusPayload selection sets.
*/
export type CustomerStatusPayload<$SelectionSet extends $$SelectionSets.CustomerStatusPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerStatusPayload']>
/**
* Infer result type for CustomerPayload selection sets.
*/
export type CustomerPayload<$SelectionSet extends $$SelectionSets.CustomerPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerPayload']>
/**
* Infer result type for CustomerNeedPayload selection sets.
*/
export type CustomerNeedPayload<$SelectionSet extends $$SelectionSets.CustomerNeedPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedPayload']>
/**
* Infer result type for CustomerNeedUpdatePayload selection sets.
*/
export type CustomerNeedUpdatePayload<$SelectionSet extends $$SelectionSets.CustomerNeedUpdatePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedUpdatePayload']>
/**
* A generic payload return from entity archive mutations.
*
* Infer result type for CustomerNeedArchivePayload selection sets.
*/
export type CustomerNeedArchivePayload<$SelectionSet extends $$SelectionSets.CustomerNeedArchivePayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomerNeedArchivePayload']>
/**
* Infer result type for CustomViewPayload selection sets.
*/
export type CustomViewPayload<$SelectionSet extends $$SelectionSets.CustomViewPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CustomViewPayload']>
/**
* Infer result type for ContactPayload selection sets.
*/
export type ContactPayload<$SelectionSet extends $$SelectionSets.ContactPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ContactPayload']>
/**
* Infer result type for CommentPayload selection sets.
*/
export type CommentPayload<$SelectionSet extends $$SelectionSets.CommentPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CommentPayload']>
/**
* Infer result type for EmailUserAccountAuthChallengeResponse selection sets.
*/
export type EmailUserAccountAuthChallengeResponse<$SelectionSet extends $$SelectionSets.EmailUserAccountAuthChallengeResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['EmailUserAccountAuthChallengeResponse']>
/**
* Infer result type for PasskeyLoginStartResponse selection sets.
*/
export type PasskeyLoginStartResponse<$SelectionSet extends $$SelectionSets.PasskeyLoginStartResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['PasskeyLoginStartResponse']>
/**
* Infer result type for CreateOrJoinOrganizationResponse selection sets.
*/
export type CreateOrJoinOrganizationResponse<$SelectionSet extends $$SelectionSets.CreateOrJoinOrganizationResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['CreateOrJoinOrganizationResponse']>
/**
* Infer result type for LogoutResponse selection sets.
*/
export type LogoutResponse<$SelectionSet extends $$SelectionSets.LogoutResponse> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['LogoutResponse']>
/**
* Infer result type for AttachmentPayload selection sets.
*/
export type AttachmentPayload<$SelectionSet extends $$SelectionSets.AttachmentPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AttachmentPayload']>
/**
* Infer result type for FrontAttachmentPayload selection sets.
*/
export type FrontAttachmentPayload<$SelectionSet extends $$SelectionSets.FrontAttachmentPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['FrontAttachmentPayload']>
/**
* Infer result type for AgentSessionPayload selection sets.
*/
export type AgentSessionPayload<$SelectionSet extends $$SelectionSets.AgentSessionPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentSessionPayload']>
/**
* Infer result type for AgentActivityPayload selection sets.
*/
export type AgentActivityPayload<$SelectionSet extends $$SelectionSets.AgentActivityPayload> = GraphqlKit.Document.Object.InferResult.OutputObjectLike<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityPayload']>


    //                                               Union
    // --------------------------------------------------------------------------------------------------
    //

/**
* Content for different types of agent activities.
*
* Infer result type for AgentActivityContent selection sets.
*/
export type AgentActivityContent<$SelectionSet extends $$SelectionSets.AgentActivityContent> = GraphqlKit.Document.Object.InferResult.Union<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['AgentActivityContent']>
/**
* Infer result type for ExternalEntityInfoMetadata selection sets.
*/
export type ExternalEntityInfoMetadata<$SelectionSet extends $$SelectionSets.ExternalEntityInfoMetadata> = GraphqlKit.Document.Object.InferResult.Union<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ExternalEntityInfoMetadata']>
/**
* Infer result type for OrganizationInviteDetailsPayload selection sets.
*/
export type OrganizationInviteDetailsPayload<$SelectionSet extends $$SelectionSets.OrganizationInviteDetailsPayload> = GraphqlKit.Document.Object.InferResult.Union<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['OrganizationInviteDetailsPayload']>


    //                                             Interface
    // --------------------------------------------------------------------------------------------------
    //

/**
* Notification subscriptions for models.
*
* Infer result type for NotificationSubscription selection sets.
*/
export type NotificationSubscription<$SelectionSet extends $$SelectionSets.NotificationSubscription> = GraphqlKit.Document.Object.InferResult.Interface<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['NotificationSubscription']>
/**
* A basic entity.
*
* Infer result type for Entity selection sets.
*/
export type Entity<$SelectionSet extends $$SelectionSets.Entity> = GraphqlKit.Document.Object.InferResult.Interface<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Entity']>
/**
* Infer result type for Node selection sets.
*/
export type Node<$SelectionSet extends $$SelectionSets.Node> = GraphqlKit.Document.Object.InferResult.Interface<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Node']>
/**
* A notification sent to a user.
*
* Infer result type for Notification selection sets.
*/
export type Notification<$SelectionSet extends $$SelectionSets.Notification> = GraphqlKit.Document.Object.InferResult.Interface<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['Notification']>
/**
* A generic payload return from entity archive or deletion mutations.
*
* Infer result type for ArchivePayload selection sets.
*/
export type ArchivePayload<$SelectionSet extends $$SelectionSets.ArchivePayload> = GraphqlKit.Document.Object.InferResult.Interface<$SelectionSet, $$Schema.Schema, $$Schema.Schema['allTypes']['ArchivePayload']>
}