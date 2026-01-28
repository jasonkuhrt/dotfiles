import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as AgentSession from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A session for agent activities and state management.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 25 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface AgentSession<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.id` |
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
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The human user responsible for the agent session. Null if the session was initiated via automation or by an agent user, with no responsible human user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.creator` |
* | **Nullability** | Optional |
*/
creator?: $Fields.creator.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.creator<_$Context>>
/**
* The agent user that is associated with this agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.appUser` |
* | **Nullability** | Required |
*/
appUser?: $Fields.appUser.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.appUser<_$Context>>
/**
* The comment this agent session is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.comment` |
* | **Nullability** | Optional |
*/
comment?: $Fields.comment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comment<_$Context>>
/**
* The comment that this agent session was spawned from, if from a different thread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Comment} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.sourceComment` |
* | **Nullability** | Optional |
*/
sourceComment?: $Fields.sourceComment.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.sourceComment<_$Context>>
/**
* The issue this agent session is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.issue` |
* | **Nullability** | Optional |
*/
issue?: $Fields.issue.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.issue<_$Context>>
/**
* The current status of the agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.status` |
* | **Nullability** | Required |
*/
status?: $Fields.status.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.status<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time the agent session started.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.startedAt` |
* | **Nullability** | Optional |
*/
startedAt?: $Fields.startedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.startedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time the agent session ended.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.endedAt` |
* | **Nullability** | Optional |
*/
endedAt?: $Fields.endedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.endedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time the agent session was dismissed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.dismissedAt` |
* | **Nullability** | Optional |
*/
dismissedAt?: $Fields.dismissedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.dismissedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The user who dismissed the agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.dismissedBy` |
* | **Nullability** | Optional |
*/
dismissedBy?: $Fields.dismissedBy.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.dismissedBy<_$Context>>
/**
* Activities associated with this agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentActivityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.activities` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
activities?: $Fields.activities.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.activities<_$Context>>
/**
* The URL of an external agent-hosted page associated with this session.
*
* @deprecated Use externalUrls instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.externalLink` |
* | **⚠ Deprecated** | Use externalUrls instead. |
* | **Nullability** | Optional |
*/
externalLink?: $Fields.externalLink.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalLink<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* URLs of external resources associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSON}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.externalUrls` |
* | **Nullability** | Required |
*/
externalUrls?: $Fields.externalUrls.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.externalUrls<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* A summary of the activities in this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.summary` |
* | **Nullability** | Optional |
*/
summary?: $Fields.summary.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.summary<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Metadata about the external source that created this agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.sourceMetadata` |
* | **Nullability** | Optional |
*/
sourceMetadata?: $Fields.sourceMetadata.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.sourceMetadata<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* A dynamically updated list of the agent's execution strategy.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSON} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.plan` |
* | **Nullability** | Optional |
*/
plan?: $Fields.plan.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.plan<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Serialized JSON representing the contexts this session is related to, for direct chat sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSON}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.context` |
* | **Nullability** | Required |
*/
context?: $Fields.context.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.context<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [DEPRECATED] The type of the agent session.
*
* @deprecated This field is slated for removal.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionType} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.type` |
* | **⚠ Deprecated** | This field is slated for removal. |
* | **Nullability** | Optional |
*/
type?: $Fields.type.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.type<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Agent session URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.url` |
* | **Nullability** | Optional |
*/
url?: $Fields.url.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.url<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] A formatted prompt string containing relevant context for the agent session, including issue details, comments, and guidance.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.promptContext` |
* | **Nullability** | Optional |
*/
promptContext?: $Fields.promptContext.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.promptContext<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Pull requests associated with this agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AgentSessionToPullRequestConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AgentSession} |
* | **Path** | `AgentSession.pullRequests` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
pullRequests?: $Fields.pullRequests.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.pullRequests<_$Context>>
      
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