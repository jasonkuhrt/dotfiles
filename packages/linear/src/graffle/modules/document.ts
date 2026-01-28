import { createStaticRootType } from 'graffle/extensions/document-builder'
import { schemaDrivenDataMap as sddm } from './schema-driven-data-map.js'
import { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as SelectionSets from './selection-sets/_.js'
import type * as $$Scalar from './scalar.js'
import type * as SchemaMap from './schema-driven-data-map.js'

import type * as $$Utilities from 'graffle/utilities-for-generated'
import type * as $$Schema from './schema/_.js'

/**
* Context for static document type inference.
*
* Static documents have no runtime extensions, hence typeHookRequestResultDataTypes is never.
*/
interface StaticDocumentContext {
typeHookRequestResultDataTypes: never
scalars: $$Scalar.$Registry
}

/**
* Static query builder for compile-time GraphQL document generation.
*
* @remarks
* Each field method generates a fully typed GraphQL  document string with:
* - Type-safe selection sets matching your schema
* - Automatic variable inference from `$` usage
* - Compile-time validation of field selections
* - Zero runtime overhead - documents are generated at build time
*
* @example Basic query
* ```ts
* const getUserDoc = query.user({
* id: true,
* name: true,
* email: true
* })
* // Generates: query { user { id name email } }
* ```
*
* @example With variables
* ```ts
* import { Var } from 'graffle'
*
* const getUserByIdDoc = query.user({
* $: { id: $ },
* name: true,
* posts: { title: true }
* })
* // Generates: query ($id: ID!) { user(id: $id) { name posts { title } } }
* // Variables type: { id: string }
* ```
*
* @see {@link https://graffle.js.org/guides/static-generation | Static Generation Guide}
*/

        export interface QueryBuilder {
          $batch: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>>(
            selection: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<$SelectionSet, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<$SelectionSet, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All issue workflow states.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.workflowStates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.workflowStates({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          workflowStates: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['workflowStates']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowStates: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowStates: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowState}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.workflowState` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.workflowState({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          workflowState: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['workflowState']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowState: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowState: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All webhooks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.webhooks` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.webhooks({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          webhooks: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhooks']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhooks: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ webhooks: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Webhook}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.webhook` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.webhook({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          webhook: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhook']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhook: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ webhook: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Webhook failure events for webhooks that belong to an OAuth application. (last 50)
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookFailureEvent}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.failuresForOauthWebhooks` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.failuresForOauthWebhooks({
* // $: { ...variables }
* id: true,
* createdAt: true,
* webhook: true,
* // ...
* })
* ```
*/
          failuresForOauthWebhooks: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['failuresForOauthWebhooks']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ failuresForOauthWebhooks: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ failuresForOauthWebhooks: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.userSettings` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.userSettings({
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          userSettings: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userSettings']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSettings: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ userSettings: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.users` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*
* @example
* ```ts
* const doc = query.users({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          users: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['users']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ users: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ users: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.user` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.user({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          user: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['user']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ user: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ user: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The currently authenticated user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.viewer` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.viewer({
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          viewer: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['viewer']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ viewer: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ viewer: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Lists the sessions of a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.userSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.userSessions({
* // $: { ...variables }
* createdAt: true,
* id: true,
* type: true,
* // ...
* })
* ```
*/
          userSessions: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ userSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All triage responsibilities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.triageResponsibilities` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.triageResponsibilities({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          triageResponsibilities: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['triageResponsibilities']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibilities: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibilities: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibility}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.triageResponsibility` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.triageResponsibility({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          triageResponsibility: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['triageResponsibility']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibility: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibility: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All time schedules.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeScheduleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.timeSchedules` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.timeSchedules({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          timeSchedules: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeSchedules']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedules: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedules: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedule}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.timeSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.timeSchedule({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          timeSchedule: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeSchedule']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedule: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedule: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All templates from all users.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.templates` |
* | **Nullability** | Required |
* | **List** | Yes |
*
* @example
* ```ts
* const doc = query.templates({
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          templates: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['templates']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ templates: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ templates: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.template` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.template({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          template: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['template']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ template: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ template: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Returns all templates that are associated with the integration type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Template}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.templatesForIntegration` |
* | **Nullability** | Required |
* | **List** | Yes |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.templatesForIntegration({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          templatesForIntegration: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['templatesForIntegration']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ templatesForIntegration: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ templatesForIntegration: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projects` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.projects({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projects: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projects']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projects: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projects: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Project}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.project` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.project({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          project: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['project']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ project: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ project: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Suggests filters for a project view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectFilterSuggestion({
* // $: { ...variables }
* filter: true,
* logId: true
* })
* ```
*/
          projectFilterSuggestion: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectFilterSuggestion']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectFilterSuggestion: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectFilterSuggestion: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All teams whose issues can be accessed by the user. This might be different from `administrableTeams`, which also includes teams whose settings can be changed by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.teams({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          teams: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teams']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ teams: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ teams: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All teams you the user can administrate. Administrable teams are teams whose settings the user can change, but to whose issues the user doesn't necessarily have access to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.administrableTeams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.administrableTeams({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          administrableTeams: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['administrableTeams']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ administrableTeams: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ administrableTeams: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.team` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.team({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          team: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['team']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ team: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ team: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All team memberships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teamMemberships` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.teamMemberships({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          teamMemberships: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamMemberships']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMemberships: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMemberships: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembership}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.teamMembership` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.teamMembership({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          teamMembership: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamMembership']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMembership: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMembership: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Search for various resources using natural language.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SemanticSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.semanticSearch` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*
* @example
* ```ts
* const doc = query.semanticSearch({
* // $: { ...variables }
* enabled: true,
* results: true
* })
* ```
*/
          semanticSearch: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['semanticSearch']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ semanticSearch: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ semanticSearch: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Search documents.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchDocuments` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*
* @example
* ```ts
* const doc = query.searchDocuments({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true,
* // ...
* })
* ```
*/
          searchDocuments: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['searchDocuments']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchDocuments: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ searchDocuments: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Search projects.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchProjects` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*
* @example
* ```ts
* const doc = query.searchProjects({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true,
* // ...
* })
* ```
*/
          searchProjects: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['searchProjects']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchProjects: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ searchProjects: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Search issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueSearchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.searchIssues` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*
* @example
* ```ts
* const doc = query.searchIssues({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true,
* // ...
* })
* ```
*/
          searchIssues: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['searchIssues']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchIssues: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ searchIssues: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmapToProjects` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.roadmapToProjects({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          roadmapToProjects: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapToProjects']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProjects: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProjects: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific roadmapToProject.
*
* @deprecated RoadmapToProject is deprecated, use InitiativeToProject instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmapToProject` |
* | **⚠ Deprecated** | RoadmapToProject is deprecated, use InitiativeToProject instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.roadmapToProject({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          roadmapToProject: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapToProject']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProject: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProject: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All roadmaps in the workspace.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmaps` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.roadmaps({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          roadmaps: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmaps']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmaps: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmaps: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Roadmap}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.roadmap` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.roadmap({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          roadmap: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmap']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmap: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmap: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] All release stages.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releaseStages` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.releaseStages({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          releaseStages: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStages']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStages: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStages: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] One specific release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStage}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releaseStage` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.releaseStage({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          releaseStage: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStage']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStage: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStage: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] All releases.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.releases({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          releases: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releases']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ releases: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ releases: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] One specific release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Release}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.release` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.release({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          release: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['release']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ release: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ release: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] All release pipelines.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releasePipelines` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.releasePipelines({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          releasePipelines: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelines']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipelines: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipelines: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] One specific release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipeline}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.releasePipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.releasePipeline({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          releasePipeline: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipeline']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipeline: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipeline: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The status of the rate limiter.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RateLimitPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.rateLimitStatus` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.rateLimitStatus({
* identifier: true,
* kind: true,
* limits: true
* })
* ```
*/
          rateLimitStatus: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['rateLimitStatus']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ rateLimitStatus: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ rateLimitStatus: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Sends a test push message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionTestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.pushSubscriptionTest` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.pushSubscriptionTest({
* // $: { ...variables }
* success: true
* })
* ```
*/
          pushSubscriptionTest: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['pushSubscriptionTest']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ pushSubscriptionTest: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ pushSubscriptionTest: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.projectUpdates({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projectUpdates: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdates']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdates: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdates: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectUpdate({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          projectUpdate: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All project statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.projectStatuses({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projectStatuses: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatuses']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatuses: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatuses: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Count of projects using this project status across the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusCountPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatusProjectCount` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectStatusProjectCount({
* // $: { ...variables }
* count: true,
* privateCount: true,
* archivedTeamCount: true
* })
* ```
*/
          projectStatusProjectCount: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatusProjectCount']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatusProjectCount: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatusProjectCount: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectStatus({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          projectStatus: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatus']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatus: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatus: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All project relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.projectRelations({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projectRelations: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRelations']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelations: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelations: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectRelation({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          projectRelation: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRelation']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelation: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelation: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All milestones for the project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectMilestones` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.projectMilestones({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projectMilestones: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestones']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestones: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestones: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestone}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectMilestone` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectMilestone({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          projectMilestone: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestone']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestone: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestone: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All project labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.projectLabels({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          projectLabels: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabels']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabels: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabels: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.projectLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.projectLabel({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          projectLabel: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Organization}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organization` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.organization({
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          organization: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organization']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organization: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organization: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Does the organization exist.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationExistsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationExists` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.organizationExists({
* // $: { ...variables }
* success: true,
* exists: true
* })
* ```
*/
          organizationExists: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationExists']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationExists: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationExists: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] All archived teams of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Team}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.archivedTeams` |
* | **Nullability** | Required |
* | **List** | Yes |
*
* @example
* ```ts
* const doc = query.archivedTeams({
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          archivedTeams: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['archivedTeams']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ archivedTeams: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ archivedTeams: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Get organization metadata by urlKey or organization id.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationMeta} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationMeta` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.organizationMeta({
* // $: { ...variables }
* region: true,
* allowedAuthServices: true
* })
* ```
*/
          organizationMeta: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationMeta']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationMeta: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationMeta: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All invites for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInvites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.organizationInvites({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          organizationInvites: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInvites']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvites: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvites: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.organizationInvite({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          organizationInvite: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInvite']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvite: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvite: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteDetailsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationInviteDetails` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.organizationInviteDetails({
* __typename: true,
* ___on_SomeType: {
* // ... fields for this type
* }
* })
* ```
*/
          organizationInviteDetails: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInviteDetails']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInviteDetails: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInviteDetails: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Checks whether the domain can be claimed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainClaimPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.organizationDomainClaimRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.organizationDomainClaimRequest({
* // $: { ...variables }
* verificationString: true
* })
* ```
*/
          organizationDomainClaimRequest: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainClaimRequest']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationDomainClaimRequest: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationDomainClaimRequest: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The user's notification subscriptions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationSubscriptions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.notificationSubscriptions({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          notificationSubscriptions: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSubscriptions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscriptions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscriptions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscription}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationSubscription` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.notificationSubscription({
* id: true,
* ___on_SomeImplementation: {
* // ... fields for this implementation
* }
* })
* ```
*/
          notificationSubscription: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSubscription']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscription: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscription: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notifications` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.notifications({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          notifications: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notifications']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ notifications: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ notifications: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] A number of unread notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notificationsUnreadCount` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.notificationsUnreadCount()
* ```
*/
          notificationsUnreadCount: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationsUnreadCount']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationsUnreadCount: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationsUnreadCount: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Notification}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.notification` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.notification({
* id: true,
* ___on_SomeImplementation: {
* // ... fields for this implementation
* }
* })
* ```
*/
          notification: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notification']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ notification: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ notification: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Returns a list of issue to release entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToReleaseConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueToReleases` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.issueToReleases({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issueToReleases: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueToReleases']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToReleases: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToReleases: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] One specific issueToRelease.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToRelease}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueToRelease` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueToRelease({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          issueToRelease: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueToRelease']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToRelease: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToRelease: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issues` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.issues({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issues: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issues']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issues: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issues: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issue({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          issue: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issue']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issue: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issue: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Search issues. This endpoint is deprecated and will be removed in the future – use `searchIssues` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueSearch` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.issueSearch({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issueSearch: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueSearch']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueSearch: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueSearch: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Find issue based on the VCS branch name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueVcsBranchSearch` |
* | **Nullability** | Optional |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueVcsBranchSearch({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          issueVcsBranchSearch: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueVcsBranchSearch']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueVcsBranchSearch: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueVcsBranchSearch: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Find issues that are related to a given Figma file key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueFigmaFileKeySearch` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.issueFigmaFileKeySearch({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issueFigmaFileKeySearch: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueFigmaFileKeySearch']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFigmaFileKeySearch: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFigmaFileKeySearch: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Issue priority values and corresponding labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePriorityValue}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issuePriorityValues` |
* | **Nullability** | Required |
* | **List** | Yes |
*
* @example
* ```ts
* const doc = query.issuePriorityValues({
* priority: true,
* label: true
* })
* ```
*/
          issuePriorityValues: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issuePriorityValues']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issuePriorityValues: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issuePriorityValues: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Suggests filters for an issue view based on a text prompt.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueFilterSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueFilterSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.issueFilterSuggestion({
* // $: { ...variables }
* filter: true,
* logId: true
* })
* ```
*/
          issueFilterSuggestion: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueFilterSuggestion']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFilterSuggestion: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFilterSuggestion: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Returns code repositories that are most likely to be relevant for implementing an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RepositorySuggestionsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRepositorySuggestions` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = query.issueRepositorySuggestions({
* // $: { ...variables }
* suggestions: true
* })
* ```
*/
          issueRepositorySuggestions: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRepositorySuggestions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRepositorySuggestions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRepositorySuggestions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All issue relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.issueRelations({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issueRelations: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRelations']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelations: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelations: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueRelation({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          issueRelation: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRelation']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelation: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelation: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All issue labels.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.issueLabels({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          issueLabels: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabels']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabels: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabels: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueLabel` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueLabel({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          issueLabel: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Checks a CSV file validity against a specific import service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportCheckCSV` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.issueImportCheckCSV({
* // $: { ...variables }
* success: true
* })
* ```
*/
          issueImportCheckCSV: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCheckCSV']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckCSV: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckCSV: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Checks whether it will be possible to setup sync for this project or repository at the end of import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportSyncCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportCheckSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueImportCheckSync({
* // $: { ...variables }
* canSync: true,
* error: true
* })
* ```
*/
          issueImportCheckSync: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCheckSync']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckSync: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckSync: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Checks whether a custom JQL query is valid and can be used to filter issues of a Jira import
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportJqlCheckPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueImportJqlCheck` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*
* @example
* ```ts
* const doc = query.issueImportJqlCheck({
* // $: { ...variables }
* success: true,
* count: true,
* error: true
* })
* ```
*/
          issueImportJqlCheck: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportJqlCheck']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportJqlCheck: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportJqlCheck: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific set of settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationsSettings` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.integrationsSettings({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          integrationsSettings: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationsSettings']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationsSettings: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationsSettings: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Template and integration connections.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationTemplates` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.integrationTemplates({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          integrationTemplates: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationTemplates']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplates: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplates: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationTemplate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.integrationTemplate({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          integrationTemplate: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationTemplate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.integrations({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          integrations: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrations']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrations: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integrations: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Integration}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integration` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.integration({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          integration: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integration']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integration: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integration: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Verify that we received the correct response from the GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubEnterpriseServerInstallVerificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.verifyGitHubEnterpriseServerInstallation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.verifyGitHubEnterpriseServerInstallation({
* // $: { ...variables }
* success: true
* })
* ```
*/
          verifyGitHubEnterpriseServerInstallation: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['verifyGitHubEnterpriseServerInstallation']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ verifyGitHubEnterpriseServerInstallation: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ verifyGitHubEnterpriseServerInstallation: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Checks if the integration has all required scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationHasScopesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.integrationHasScopes` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.integrationHasScopes({
* // $: { ...variables }
* hasAllScopes: true,
* missingScopes: true
* })
* ```
*/
          integrationHasScopes: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationHasScopes']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationHasScopes: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationHasScopes: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All  InitiativeUpdates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeUpdates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.initiativeUpdates({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          initiativeUpdates: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdates']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdates: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdates: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific  initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdate}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.initiativeUpdate({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          initiativeUpdate: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* returns a list of initiative to project entities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeToProjects` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.initiativeToProjects({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          initiativeToProjects: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeToProjects']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProjects: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProjects: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeToProject` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.initiativeToProject({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          initiativeToProject: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeToProject']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProject: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProject: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All initiatives in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiatives` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.initiatives({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          initiatives: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiatives']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiatives: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiatives: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Initiative}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiative` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.initiative({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          initiative: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiative']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiative: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiative: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All initiative relationships.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeRelationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeRelations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.initiativeRelations({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          initiativeRelations: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeRelations']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelations: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelations: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelation}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.initiativeRelation` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.initiativeRelation({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          initiativeRelation: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeRelation']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelation: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelation: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Fetch an arbitrary set of data using natural language query. Be specific about what you want including properties for each entity, sort order, filters, limit and properties.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FetchDataPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.fetchData` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.fetchData({
* // $: { ...variables }
* data: true,
* query: true,
* filters: true,
* // ...
* })
* ```
*/
          fetchData: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['fetchData']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ fetchData: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ fetchData: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* The user's favorites.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoriteConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.favorites` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.favorites({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          favorites: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['favorites']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorites: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ favorites: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Favorite}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.favorite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.favorite({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          favorite: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['favorite']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorite: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ favorite: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All external users for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.externalUsers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.externalUsers({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          externalUsers: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['externalUsers']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUsers: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUsers: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific external user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalUser}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.externalUser` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.externalUser({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          externalUser: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['externalUser']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUser: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUser: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLink}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.entityExternalLink` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.entityExternalLink({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          entityExternalLink: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['entityExternalLink']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ entityExternalLink: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ entityExternalLink: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All custom emojis.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmojiConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emojis` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.emojis({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          emojis: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emojis']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ emojis: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ emojis: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Emoji}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emoji` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.emoji({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          emoji: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emoji']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ emoji: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ emoji: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddress}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.emailIntakeAddress` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.emailIntakeAddress({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          emailIntakeAddress: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailIntakeAddress']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ emailIntakeAddress: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ emailIntakeAddress: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All documents in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.documents` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.documents({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          documents: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documents']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ documents: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ documents: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Document}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.document` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.document({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          document: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['document']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ document: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ document: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A collection of document content history entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentContentHistoryPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.documentContentHistory` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.documentContentHistory({
* // $: { ...variables }
* history: true,
* success: true
* })
* ```
*/
          documentContentHistory: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documentContentHistory']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ documentContentHistory: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ documentContentHistory: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All cycles.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.cycles` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.cycles({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          cycles: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycles']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycles: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ cycles: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Cycle}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.cycle` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.cycle({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          cycle: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycle']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycle: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ cycle: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All customer tiers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerTiers` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.customerTiers({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          customerTiers: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerTiers']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTiers: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTiers: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTier}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerTier` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.customerTier({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          customerTier: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerTier']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTier: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTier: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All customer statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerStatuses` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.customerStatuses({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          customerStatuses: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerStatuses']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatuses: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatuses: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatus}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerStatus` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.customerStatus({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          customerStatus: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerStatus']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatus: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatus: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customers` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.customers({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          customers: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customers']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customers: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customers: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Customer}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customer` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.customer({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          customer: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customer']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customer: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customer: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All customer needs.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerNeeds` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.customerNeeds({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          customerNeeds: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeeds']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeeds: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeeds: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeed}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customerNeed` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.customerNeed({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          customerNeed: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeed']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeed: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeed: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Suggests issue title based on a customer request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueTitleSuggestionFromCustomerRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.issueTitleSuggestionFromCustomerRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.issueTitleSuggestionFromCustomerRequest({
* // $: { ...variables }
* lastSyncId: true,
* title: true,
* logId: true
* })
* ```
*/
          issueTitleSuggestionFromCustomerRequest: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueTitleSuggestionFromCustomerRequest']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueTitleSuggestionFromCustomerRequest: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ issueTitleSuggestionFromCustomerRequest: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Custom views for the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViews` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = query.customViews({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          customViews: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViews']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViews: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customViews: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomView}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customView` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.customView({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          customView: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customView']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customView: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customView: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Suggests metadata for a view based on it's filters.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewSuggestionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViewDetailsSuggestion` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = query.customViewDetailsSuggestion({
* // $: { ...variables }
* name: true,
* description: true,
* icon: true
* })
* ```
*/
          customViewDetailsSuggestion: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViewDetailsSuggestion']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewDetailsSuggestion: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewDetailsSuggestion: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Whether a custom view has other subscribers than the current user in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewHasSubscribersPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.customViewHasSubscribers` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.customViewHasSubscribers({
* // $: { ...variables }
* hasSubscribers: true
* })
* ```
*/
          customViewHasSubscribers: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViewHasSubscribers']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewHasSubscribers: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewHasSubscribers: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All comments.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.comments({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          comments: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['comments']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ comments: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ comments: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Comment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.comment` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = query.comment({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          comment: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['comment']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ comment: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ comment: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Fetch users belonging to this user account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.availableUsers` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = query.availableUsers({
* id: true,
* email: true,
* allowDomainAccess: true,
* // ...
* })
* ```
*/
          availableUsers: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['availableUsers']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ availableUsers: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ availableUsers: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* User's active sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthenticationSessionResponse}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.authenticationSessions` |
* | **Nullability** | Required |
* | **List** | Yes |
*
* @example
* ```ts
* const doc = query.authenticationSessions({
* createdAt: true,
* id: true,
* type: true,
* // ...
* })
* ```
*/
          authenticationSessions: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['authenticationSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ authenticationSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ authenticationSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Fetch SSO login URL for the email provided.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SsoUrlFromEmailResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.ssoUrlFromEmail` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = query.ssoUrlFromEmail({
* // $: { ...variables }
* success: true,
* samlSsoUrl: true
* })
* ```
*/
          ssoUrlFromEmail: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['ssoUrlFromEmail']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ ssoUrlFromEmail: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ ssoUrlFromEmail: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* List of audit entry types.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuditEntryType}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.auditEntryTypes` |
* | **Nullability** | Required |
* | **List** | Yes |
*
* @example
* ```ts
* const doc = query.auditEntryTypes({
* type: true,
* description: true
* })
* ```
*/
          auditEntryTypes: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['auditEntryTypes']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntryTypes: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntryTypes: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All audit log entries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuditEntryConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.auditEntries` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.auditEntries({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          auditEntries: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['auditEntries']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntries: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntries: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All issue attachments.
*
* To get attachments for a given URL, use `attachmentsForURL` query.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.attachments({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          attachments: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachments']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachments: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ attachments: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* One specific issue attachment.
* [Deprecated] 'url' can no longer be used as the 'id' parameter. Use 'attachmentsForUrl' instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Attachment}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.attachment({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          attachment: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachment']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachment: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ attachment: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Returns issue attachments for a given `url`.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentsForURL` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.attachmentsForURL({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          attachmentsForURL: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentsForURL']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentsForURL: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentsForURL: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Query an issue by its associated attachment, and its id.
*
*
* @deprecated Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Issue}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentIssue` |
* | **⚠ Deprecated** | Will be removed in near future, please use `attachmentsForURL` to get attachments and their issues instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.attachmentIssue({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          attachmentIssue: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentIssue']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentIssue: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentIssue: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Get a list of all unique attachment sources in the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentSourcesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.attachmentSources` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.attachmentSources({
* // $: { ...variables }
* sources: true
* })
* ```
*/
          attachmentSources: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentSources']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentSources: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentSources: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Asks web form settings by ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AsksWebSettings}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.asksWebSetting` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.asksWebSetting({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          asksWebSetting: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['asksWebSetting']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ asksWebSetting: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ asksWebSetting: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Get basic information for an application.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Application}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.applicationInfo` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.applicationInfo({
* // $: { ...variables }
* id: true,
* clientId: true,
* name: true,
* // ...
* })
* ```
*/
          applicationInfo: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['applicationInfo']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ applicationInfo: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ applicationInfo: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All agent sessions.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentSessions` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = query.agentSessions({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          agentSessions: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSession}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.agentSession({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          agentSession: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSession']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSession: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSession: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* All agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentActivities` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = query.agentActivities({
* // $: { ...variables }
* edges: true,
* nodes: true,
* pageInfo: true
* })
* ```
*/
          agentActivities: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentActivities']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivities: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivities: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* A specific agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivity}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Query} |
* | **Path** | `Query.agentActivity` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = query.agentActivity({
* // $: { ...variables }
* id: true,
* createdAt: true,
* updatedAt: true,
* // ...
* })
* ```
*/
          agentActivity: <const $SelectionSet extends SelectionSets.Query<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentActivity']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivity: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivity: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >
        }

/**
* Static query builder for compile-time GraphQL document generation.
*
* @remarks
* Each field method generates a fully typed GraphQL  document string with:
* - Type-safe selection sets matching your schema
* - Automatic variable inference from `$` usage
* - Compile-time validation of field selections
* - Zero runtime overhead - documents are generated at build time
*
* @example Basic query
* ```ts
* const getUserDoc = query.user({
* id: true,
* name: true,
* email: true
* })
* // Generates: query { user { id name email } }
* ```
*
* @example With variables
* ```ts
* import { Var } from 'graffle'
*
* const getUserByIdDoc = query.user({
* $: { id: $ },
* name: true,
* posts: { title: true }
* })
* // Generates: query ($id: ID!) { user(id: $id) { name posts { title } } }
* // Variables type: { id: string }
* ```
*
* @see {@link https://graffle.js.org/guides/static-generation | Static Generation Guide}
*/
export const query: QueryBuilder = createStaticRootType(GraphqlKit.Schema.OperationType.QUERY, { sddm }) as any


/**
* Static mutation builder for compile-time GraphQL document generation.
*
* @remarks
* Each field method generates a fully typed GraphQL mutation document  with:
* - Type-safe selection sets and input types
* - Automatic variable inference from `$` usage
* - Compile-time validation of mutations
* - Zero runtime overhead - documents are generated at build time
*
* @example
* ```ts
* import { Var } from 'graffle'
*
* const createUserDoc = mutation.createUser({
* $: { input: $ },
* id: true,
* name: true
* })
* // Generates: mutation ($input: CreateUserInput!) { createUser(input: $input) { id name } }
* ```
*
* @see {@link https://graffle.js.org/guides/static-generation | Static Generation Guide}
*/

        export interface MutationBuilder {
          $batch: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>>(
            selection: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<$SelectionSet, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<$SelectionSet, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new state, adding it to the workflow of a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.workflowStateCreate({
* // $: { ...variables }
* lastSyncId: true,
* workflowState: true,
* success: true
* })
* ```
*/
          workflowStateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['workflowStateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.workflowStateUpdate({
* // $: { ...variables }
* lastSyncId: true,
* workflowState: true,
* success: true
* })
* ```
*/
          workflowStateUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['workflowStateUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a state. Only states with issues that have all been archived can be archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.workflowStateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.workflowStateArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          workflowStateArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['workflowStateArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.webhookCreate({
* // $: { ...variables }
* lastSyncId: true,
* webhook: true,
* success: true
* })
* ```
*/
          webhookCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhookCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.webhookUpdate({
* // $: { ...variables }
* lastSyncId: true,
* webhook: true,
* success: true
* })
* ```
*/
          webhookUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhookUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.webhookDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          webhookDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhookDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Rotates the signing secret for a Webhook.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WebhookRotateSecretPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.webhookRotateSecret` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.webhookRotateSecret({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* secret: true
* })
* ```
*/
          webhookRotateSecret: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['webhookRotateSecret']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookRotateSecret: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookRotateSecret: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.viewPreferencesCreate({
* // $: { ...variables }
* lastSyncId: true,
* viewPreferences: true,
* success: true
* })
* ```
*/
          viewPreferencesCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['viewPreferencesCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing ViewPreferences object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ViewPreferencesPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.viewPreferencesUpdate({
* // $: { ...variables }
* lastSyncId: true,
* viewPreferences: true,
* success: true
* })
* ```
*/
          viewPreferencesUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['viewPreferencesUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a ViewPreferences.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.viewPreferencesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.viewPreferencesDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          viewPreferencesDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['viewPreferencesDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates the user's settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userSettingsUpdate({
* // $: { ...variables }
* lastSyncId: true,
* userSettings: true,
* success: true
* })
* ```
*/
          userSettingsUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userSettingsUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Resets user's setting flags.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsFlagsResetPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSettingsFlagsReset` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userSettingsFlagsReset({
* // $: { ...variables }
* lastSyncId: true,
* success: true
* })
* ```
*/
          userSettingsFlagsReset: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userSettingsFlagsReset']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsFlagsReset: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsFlagsReset: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a user's settings flag.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsFlagPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userFlagUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userFlagUpdate({
* // $: { ...variables }
* lastSyncId: true,
* flag: true,
* value: true,
* // ...
* })
* ```
*/
          userFlagUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userFlagUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userFlagUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userFlagUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Subscribes to or unsubscribes from a notification category for a given notification channel for the user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationCategoryChannelSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.notificationCategoryChannelSubscriptionUpdate({
* // $: { ...variables }
* lastSyncId: true,
* userSettings: true,
* success: true
* })
* ```
*/
          notificationCategoryChannelSubscriptionUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationCategoryChannelSubscriptionUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationCategoryChannelSubscriptionUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationCategoryChannelSubscriptionUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a user. Only available to organization admins and the user themselves.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userUpdate({
* // $: { ...variables }
* lastSyncId: true,
* user: true,
* success: true
* })
* ```
*/
          userUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connects the Discord user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDiscordConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userDiscordConnect({
* // $: { ...variables }
* lastSyncId: true,
* user: true,
* success: true
* })
* ```
*/
          userDiscordConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userDiscordConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDiscordConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userDiscordConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Disconnects the external user from this Linear account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userExternalUserDisconnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userExternalUserDisconnect({
* // $: { ...variables }
* lastSyncId: true,
* user: true,
* success: true
* })
* ```
*/
          userExternalUserDisconnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userExternalUserDisconnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userExternalUserDisconnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userExternalUserDisconnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Changes the role of a user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userChangeRole` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userChangeRole({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userChangeRole: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userChangeRole']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userChangeRole: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userChangeRole: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Makes user an admin. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userPromoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userPromoteAdmin({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userPromoteAdmin: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userPromoteAdmin']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteAdmin: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteAdmin: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Makes user a regular user. Can only be called by an admin or owner.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDemoteAdmin` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userDemoteAdmin({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userDemoteAdmin: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userDemoteAdmin']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteAdmin: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteAdmin: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Makes user a regular user. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userPromoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userPromoteMember({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userPromoteMember: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userPromoteMember']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteMember: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteMember: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Makes user a guest. Can only be called by an admin.
*
* @deprecated Use userChangeRole instead. This mutation will be removed in a future release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userDemoteMember` |
* | **⚠ Deprecated** | Use userChangeRole instead. This mutation will be removed in a future release. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userDemoteMember({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userDemoteMember: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userDemoteMember']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteMember: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteMember: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userSuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userSuspend({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userSuspend: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userSuspend']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSuspend: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userSuspend: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Revokes a user's sessions. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userRevokeAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userRevokeAllSessions({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userRevokeAllSessions: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userRevokeAllSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeAllSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeAllSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Revokes a specific session for a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userRevokeSession` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.userRevokeSession({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userRevokeSession: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userRevokeSession']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeSession: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeSession: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Un-suspends a user. Can only be called by an admin or owner.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUnsuspend` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userUnsuspend({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userUnsuspend: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userUnsuspend']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnsuspend: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnsuspend: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unlinks a guest user from their identity provider. Can only be called by an admin when SCIM is enabled.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserAdminPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.userUnlinkFromIdentityProvider` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.userUnlinkFromIdentityProvider({
* // $: { ...variables }
* success: true
* })
* ```
*/
          userUnlinkFromIdentityProvider: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['userUnlinkFromIdentityProvider']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnlinkFromIdentityProvider: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnlinkFromIdentityProvider: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.triageResponsibilityCreate({
* // $: { ...variables }
* lastSyncId: true,
* triageResponsibility: true,
* success: true
* })
* ```
*/
          triageResponsibilityCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['triageResponsibilityCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TriageResponsibilityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.triageResponsibilityUpdate({
* // $: { ...variables }
* lastSyncId: true,
* triageResponsibility: true,
* success: true
* })
* ```
*/
          triageResponsibilityUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['triageResponsibilityUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a triage responsibility.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.triageResponsibilityDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.triageResponsibilityDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          triageResponsibilityDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['triageResponsibilityDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.timeScheduleCreate({
* // $: { ...variables }
* lastSyncId: true,
* timeSchedule: true,
* success: true
* })
* ```
*/
          timeScheduleCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeScheduleCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.timeScheduleUpdate({
* // $: { ...variables }
* lastSyncId: true,
* timeSchedule: true,
* success: true
* })
* ```
*/
          timeScheduleUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeScheduleUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Upsert an external time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleUpsertExternal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.timeScheduleUpsertExternal({
* // $: { ...variables }
* lastSyncId: true,
* timeSchedule: true,
* success: true
* })
* ```
*/
          timeScheduleUpsertExternal: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeScheduleUpsertExternal']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpsertExternal: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpsertExternal: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.timeScheduleDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          timeScheduleDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeScheduleDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Refresh the integration schedule information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TimeSchedulePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.timeScheduleRefreshIntegrationSchedule` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.timeScheduleRefreshIntegrationSchedule({
* // $: { ...variables }
* lastSyncId: true,
* timeSchedule: true,
* success: true
* })
* ```
*/
          timeScheduleRefreshIntegrationSchedule: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['timeScheduleRefreshIntegrationSchedule']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleRefreshIntegrationSchedule: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleRefreshIntegrationSchedule: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.templateCreate({
* // $: { ...variables }
* lastSyncId: true,
* template: true,
* success: true
* })
* ```
*/
          templateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['templateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ templateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.templateUpdate({
* // $: { ...variables }
* lastSyncId: true,
* template: true,
* success: true
* })
* ```
*/
          templateUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['templateUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ templateUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a template.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.templateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.templateDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          templateDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['templateDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ templateDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectCreate({
* // $: { ...variables }
* lastSyncId: true,
* project: true,
* success: true
* })
* ```
*/
          projectCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectUpdate({
* // $: { ...variables }
* lastSyncId: true,
* project: true,
* success: true
* })
* ```
*/
          projectUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates all projects currently assigned to to a project status to a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectReassignStatus` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectReassignStatus({
* // $: { ...variables }
* lastSyncId: true,
* success: true
* })
* ```
*/
          projectReassignStatus: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectReassignStatus']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectReassignStatus: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectReassignStatus: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes (trashes) a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a project.
*
* @deprecated Deprecated in favor of projectDelete.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectArchive` |
* | **⚠ Deprecated** | Deprecated in favor of projectDelete. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Adds a label to a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectAddLabel({
* // $: { ...variables }
* lastSyncId: true,
* project: true,
* success: true
* })
* ```
*/
          projectAddLabel: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectAddLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectAddLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectAddLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Removes a label from a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectRemoveLabel({
* // $: { ...variables }
* lastSyncId: true,
* project: true,
* success: true
* })
* ```
*/
          projectRemoveLabel: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRemoveLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRemoveLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRemoveLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Disables external sync on a project.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectExternalSyncDisable({
* // $: { ...variables }
* lastSyncId: true,
* project: true,
* success: true
* })
* ```
*/
          projectExternalSyncDisable: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectExternalSyncDisable']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectExternalSyncDisable: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectExternalSyncDisable: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new team. The user who creates the team will automatically be added as a member to the newly created team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.teamCreate({
* // $: { ...variables }
* lastSyncId: true,
* team: true,
* success: true
* })
* ```
*/
          teamCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.teamUpdate({
* // $: { ...variables }
* lastSyncId: true,
* team: true,
* success: true
* })
* ```
*/
          teamUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.teamDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          teamDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a team and cancels deletion.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.teamUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          teamUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes team's cycles data
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamCyclesDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.teamCyclesDelete({
* // $: { ...variables }
* lastSyncId: true,
* team: true,
* success: true
* })
* ```
*/
          teamCyclesDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamCyclesDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCyclesDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCyclesDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.teamMembershipCreate({
* // $: { ...variables }
* lastSyncId: true,
* teamMembership: true,
* success: true
* })
* ```
*/
          teamMembershipCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamMembershipCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamMembershipPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.teamMembershipUpdate({
* // $: { ...variables }
* lastSyncId: true,
* teamMembership: true,
* success: true
* })
* ```
*/
          teamMembershipUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamMembershipUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a team membership.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamMembershipDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.teamMembershipDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          teamMembershipDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamMembershipDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a previously used team key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.teamKeyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.teamKeyDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          teamKeyDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['teamKeyDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamKeyDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ teamKeyDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new roadmapToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapToProjectCreate({
* // $: { ...variables }
* lastSyncId: true,
* roadmapToProject: true,
* success: true
* })
* ```
*/
          roadmapToProjectCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapToProjectCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.roadmapToProjectUpdate({
* // $: { ...variables }
* lastSyncId: true,
* roadmapToProject: true,
* success: true
* })
* ```
*/
          roadmapToProjectUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapToProjectUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a roadmapToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapToProjectDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          roadmapToProjectDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapToProjectDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapCreate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapCreate({
* // $: { ...variables }
* lastSyncId: true,
* roadmap: true,
* success: true
* })
* ```
*/
          roadmapCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapUpdate` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.roadmapUpdate({
* // $: { ...variables }
* lastSyncId: true,
* roadmap: true,
* success: true
* })
* ```
*/
          roadmapUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapArchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          roadmapArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapUnarchive` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          roadmapUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a roadmap.
*
* @deprecated Roadmaps are deprecated, use initiatives instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.roadmapDelete` |
* | **⚠ Deprecated** | Roadmaps are deprecated, use initiatives instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.roadmapDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          roadmapDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['roadmapDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Create CSV export report for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateCsvExportReportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createCsvExportReport` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.createCsvExportReport({
* // $: { ...variables }
* success: true
* })
* ```
*/
          createCsvExportReport: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['createCsvExportReport']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ createCsvExportReport: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ createCsvExportReport: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Creates a new release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseStageCreate({
* // $: { ...variables }
* lastSyncId: true,
* releaseStage: true,
* success: true
* })
* ```
*/
          releaseStageCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStageCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Updates a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStagePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.releaseStageUpdate({
* // $: { ...variables }
* lastSyncId: true,
* releaseStage: true,
* success: true
* })
* ```
*/
          releaseStageUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStageUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Archives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseStageArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releaseStageArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStageArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Unarchives a release stage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseStageUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseStageUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releaseStageUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseStageUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Syncs release data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseSync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseSync({
* // $: { ...variables }
* lastSyncId: true,
* release: true,
* success: true
* })
* ```
*/
          releaseSync: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseSync']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseSync: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseSync: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Creates a new release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseCreate({
* // $: { ...variables }
* lastSyncId: true,
* release: true,
* success: true
* })
* ```
*/
          releaseCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Updates a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.releaseUpdate({
* // $: { ...variables }
* lastSyncId: true,
* release: true,
* success: true
* })
* ```
*/
          releaseUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Marks a release as completed. If version is provided, completes that specific release; otherwise completes the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseComplete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseComplete({
* // $: { ...variables }
* lastSyncId: true,
* release: true,
* success: true
* })
* ```
*/
          releaseComplete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseComplete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseComplete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseComplete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Updates a release by pipeline. If version is provided, updates that specific release; otherwise updates the most recent started release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUpdateByPipeline` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseUpdateByPipeline({
* // $: { ...variables }
* lastSyncId: true,
* release: true,
* success: true
* })
* ```
*/
          releaseUpdateByPipeline: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseUpdateByPipeline']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdateByPipeline: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdateByPipeline: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Deletes a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          releaseDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Archives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releaseArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Unarchives a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releaseUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releaseUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releaseUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releaseUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Creates a new release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releasePipelineCreate({
* // $: { ...variables }
* lastSyncId: true,
* releasePipeline: true,
* success: true
* })
* ```
*/
          releasePipelineCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelineCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Updates a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelinePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.releasePipelineUpdate({
* // $: { ...variables }
* lastSyncId: true,
* releasePipeline: true,
* success: true
* })
* ```
*/
          releasePipelineUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelineUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Archives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releasePipelineArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releasePipelineArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelineArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Unarchives a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releasePipelineUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          releasePipelineUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelineUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Deletes a release pipeline.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.releasePipelineDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.releasePipelineDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          releasePipelineDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['releasePipelineDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReactionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.reactionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.reactionCreate({
* // $: { ...variables }
* lastSyncId: true,
* reaction: true,
* success: true
* })
* ```
*/
          reactionCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['reactionCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a reaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.reactionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.reactionDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          reactionDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['reactionDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.pushSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.pushSubscriptionCreate({
* // $: { ...variables }
* lastSyncId: true,
* entity: true,
* success: true
* })
* ```
*/
          pushSubscriptionCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['pushSubscriptionCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a push subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PushSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.pushSubscriptionDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.pushSubscriptionDelete({
* // $: { ...variables }
* lastSyncId: true,
* entity: true,
* success: true
* })
* ```
*/
          pushSubscriptionDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['pushSubscriptionDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectUpdateCreate({
* // $: { ...variables }
* lastSyncId: true,
* projectUpdate: true,
* success: true
* })
* ```
*/
          projectUpdateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectUpdateUpdate({
* // $: { ...variables }
* lastSyncId: true,
* projectUpdate: true,
* success: true
* })
* ```
*/
          projectUpdateUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdateUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectUpdateArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectUpdateArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdateArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectUpdateUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectUpdateUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdateUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a project update.
*
* @deprecated Use `projectUpdateArchive` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectUpdateDelete` |
* | **⚠ Deprecated** | Use `projectUpdateArchive` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectUpdateDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          projectUpdateDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectUpdateDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Create a notification to remind a user about a project update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createProjectUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.createProjectUpdateReminder({
* // $: { ...variables }
* lastSyncId: true,
* success: true
* })
* ```
*/
          createProjectUpdateReminder: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['createProjectUpdateReminder']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ createProjectUpdateReminder: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ createProjectUpdateReminder: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectStatusCreate({
* // $: { ...variables }
* lastSyncId: true,
* status: true,
* success: true
* })
* ```
*/
          projectStatusCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatusCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectStatusUpdate({
* // $: { ...variables }
* lastSyncId: true,
* status: true,
* success: true
* })
* ```
*/
          projectStatusUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatusUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectStatusArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectStatusArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatusArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a project status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectStatusUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectStatusUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          projectStatusUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectStatusUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectRelationCreate({
* // $: { ...variables }
* lastSyncId: true,
* projectRelation: true,
* success: true
* })
* ```
*/
          projectRelationCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRelationCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectRelationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* projectRelation: true,
* success: true
* })
* ```
*/
          projectRelationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRelationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a project relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectRelationDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          projectRelationDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectRelationDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectMilestoneCreate({
* // $: { ...variables }
* lastSyncId: true,
* projectMilestone: true,
* success: true
* })
* ```
*/
          projectMilestoneCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestoneCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestonePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectMilestoneUpdate({
* // $: { ...variables }
* lastSyncId: true,
* projectMilestone: true,
* success: true
* })
* ```
*/
          projectMilestoneUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestoneUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a project milestone.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectMilestoneDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          projectMilestoneDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestoneDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Moves a project milestone to another project, can be called to undo a prior move.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectMilestoneMovePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectMilestoneMove` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectMilestoneMove({
* // $: { ...variables }
* lastSyncId: true,
* projectMilestone: true,
* success: true,
* // ...
* })
* ```
*/
          projectMilestoneMove: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectMilestoneMove']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneMove: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneMove: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectLabelCreate({
* // $: { ...variables }
* lastSyncId: true,
* projectLabel: true,
* success: true
* })
* ```
*/
          projectLabelCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabelCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.projectLabelUpdate({
* // $: { ...variables }
* lastSyncId: true,
* projectLabel: true,
* success: true
* })
* ```
*/
          projectLabelUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabelUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectLabelDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          projectLabelDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabelDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Retires a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectLabelRetire({
* // $: { ...variables }
* lastSyncId: true,
* projectLabel: true,
* success: true
* })
* ```
*/
          projectLabelRetire: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabelRetire']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRetire: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRetire: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Restores a project label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.projectLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.projectLabelRestore({
* // $: { ...variables }
* lastSyncId: true,
* projectLabel: true,
* success: true
* })
* ```
*/
          projectLabelRestore: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['projectLabelRestore']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRestore: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRestore: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates the user's organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* organization: true,
* success: true
* })
* ```
*/
          organizationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Get an organization's delete confirmation token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDeleteChallenge` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.organizationDeleteChallenge({
* success: true
* })
* ```
*/
          organizationDeleteChallenge: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDeleteChallenge']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDeleteChallenge: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDeleteChallenge: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationDelete({
* // $: { ...variables }
* success: true
* })
* ```
*/
          organizationDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Cancels the deletion of an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationCancelDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationCancelDelete` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.organizationCancelDelete({
* success: true
* })
* ```
*/
          organizationCancelDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationCancelDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationCancelDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationCancelDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Starts a trial for the organization on the specified plan type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationStartTrialForPlan` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationStartTrialForPlan({
* // $: { ...variables }
* success: true
* })
* ```
*/
          organizationStartTrialForPlan: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationStartTrialForPlan']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrialForPlan: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrialForPlan: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Starts a trial for the organization.
*
* @deprecated Use organizationStartTrialForPlan
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationStartTrialPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationStartTrial` |
* | **⚠ Deprecated** | Use organizationStartTrialForPlan |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.organizationStartTrial({
* success: true
* })
* ```
*/
          organizationStartTrial: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationStartTrial']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrial: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrial: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationInviteCreate({
* // $: { ...variables }
* lastSyncId: true,
* organizationInvite: true,
* success: true
* })
* ```
*/
          organizationInviteCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInviteCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInvitePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.organizationInviteUpdate({
* // $: { ...variables }
* lastSyncId: true,
* organizationInvite: true,
* success: true
* })
* ```
*/
          organizationInviteUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInviteUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Re-send an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.resendOrganizationInvite` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.resendOrganizationInvite({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          resendOrganizationInvite: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['resendOrganizationInvite']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInvite: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInvite: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Re-send an organization invite tied to an email address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.resendOrganizationInviteByEmail` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.resendOrganizationInviteByEmail({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          resendOrganizationInviteByEmail: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['resendOrganizationInviteByEmail']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInviteByEmail: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInviteByEmail: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an organization invite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationInviteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationInviteDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          organizationInviteDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationInviteDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Verifies a domain claim.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainSimplePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainClaim` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationDomainClaim({
* // $: { ...variables }
* success: true
* })
* ```
*/
          organizationDomainClaim: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainClaim']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainClaim: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainClaim: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Verifies a domain to be added to an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainVerify` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationDomainVerify({
* // $: { ...variables }
* lastSyncId: true,
* organizationDomain: true,
* success: true
* })
* ```
*/
          organizationDomainVerify: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainVerify']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainVerify: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainVerify: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Adds a domain to be allowed for an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.organizationDomainCreate({
* // $: { ...variables }
* lastSyncId: true,
* organizationDomain: true,
* success: true
* })
* ```
*/
          organizationDomainCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates an organization domain settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationDomainPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.organizationDomainUpdate({
* // $: { ...variables }
* lastSyncId: true,
* organizationDomain: true,
* success: true
* })
* ```
*/
          organizationDomainUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.organizationDomainDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.organizationDomainDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          organizationDomainDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['organizationDomainDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new notification subscription for a cycle, custom view, label, project or team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationSubscriptionCreate({
* // $: { ...variables }
* lastSyncId: true,
* notificationSubscription: true,
* success: true
* })
* ```
*/
          notificationSubscriptionCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSubscriptionCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a notification subscription.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationSubscriptionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.notificationSubscriptionUpdate({
* // $: { ...variables }
* lastSyncId: true,
* notificationSubscription: true,
* success: true
* })
* ```
*/
          notificationSubscriptionUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSubscriptionUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a notification subscription reference.
*
* @deprecated Update `notificationSubscription.active` to `false` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSubscriptionDelete` |
* | **⚠ Deprecated** | Update `notificationSubscription.active` to `false` instead. |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationSubscriptionDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          notificationSubscriptionDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSubscriptionDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.notificationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* notification: true,
* success: true
* })
* ```
*/
          notificationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Marks notification and all related notifications as read.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationMarkReadAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.notificationMarkReadAll({
* // $: { ...variables }
* lastSyncId: true,
* notifications: true,
* success: true
* })
* ```
*/
          notificationMarkReadAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationMarkReadAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkReadAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkReadAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Marks notification and all related notifications as unread.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationMarkUnreadAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationMarkUnreadAll({
* // $: { ...variables }
* lastSyncId: true,
* notifications: true,
* success: true
* })
* ```
*/
          notificationMarkUnreadAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationMarkUnreadAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkUnreadAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkUnreadAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Snoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationSnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.notificationSnoozeAll({
* // $: { ...variables }
* lastSyncId: true,
* notifications: true,
* success: true
* })
* ```
*/
          notificationSnoozeAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationSnoozeAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSnoozeAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSnoozeAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unsnoozes a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUnsnoozeAll` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.notificationUnsnoozeAll({
* // $: { ...variables }
* lastSyncId: true,
* notifications: true,
* success: true
* })
* ```
*/
          notificationUnsnoozeAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationUnsnoozeAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnsnoozeAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnsnoozeAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          notificationArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a notification and all related notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationBatchActionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationArchiveAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationArchiveAll({
* // $: { ...variables }
* lastSyncId: true,
* notifications: true,
* success: true
* })
* ```
*/
          notificationArchiveAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationArchiveAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchiveAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchiveAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a notification.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.notificationUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.notificationUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          notificationUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['notificationUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Creates a new issueToRelease join, adding an issue to a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueToReleasePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueToReleaseCreate({
* // $: { ...variables }
* lastSyncId: true,
* issueToRelease: true,
* success: true
* })
* ```
*/
          issueToReleaseCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueToReleaseCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Deletes an issueToRelease by issue and release identifiers
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseDeleteByIssueAndRelease` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueToReleaseDeleteByIssueAndRelease({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          issueToReleaseDeleteByIssueAndRelease: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueToReleaseDeleteByIssueAndRelease']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDeleteByIssueAndRelease: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDeleteByIssueAndRelease: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [ALPHA] Deletes an issueToRelease by its identifier, removing an issue from a release.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueToReleaseDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueToReleaseDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          issueToReleaseDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueToReleaseDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueCreate({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a list of issues in one transaction.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueBatchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueBatchCreate({
* // $: { ...variables }
* lastSyncId: true,
* issues: true,
* success: true
* })
* ```
*/
          issueBatchCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueBatchCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueUpdate({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates multiple issues at once.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueBatchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueBatchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueBatchUpdate({
* // $: { ...variables }
* lastSyncId: true,
* issues: true,
* success: true
* })
* ```
*/
          issueBatchUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueBatchUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueArchive` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          issueArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          issueUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes (trashes) an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          issueDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Adds a label to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueAddLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueAddLabel({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueAddLabel: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueAddLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueAddLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueAddLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Removes a label from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRemoveLabel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueRemoveLabel({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueRemoveLabel: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRemoveLabel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRemoveLabel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRemoveLabel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Adds an issue reminder. Will cause a notification to be sent when the issue reminder time is reached.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueReminder({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueReminder: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueReminder']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueReminder: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueReminder: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Subscribes a user to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueSubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.issueSubscribe({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueSubscribe: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueSubscribe']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueSubscribe: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueSubscribe: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unsubscribes a user from an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.issueUnsubscribe({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueUnsubscribe: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueUnsubscribe']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnsubscribe: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnsubscribe: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates an issue description from the Front app to handle Front attachments correctly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueDescriptionUpdateFromFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueDescriptionUpdateFromFront({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueDescriptionUpdateFromFront: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueDescriptionUpdateFromFront']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDescriptionUpdateFromFront: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDescriptionUpdateFromFront: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Disables external sync on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssuePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueExternalSyncDisable` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueExternalSyncDisable({
* // $: { ...variables }
* lastSyncId: true,
* issue: true,
* success: true
* })
* ```
*/
          issueExternalSyncDisable: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueExternalSyncDisable']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueExternalSyncDisable: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueExternalSyncDisable: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueRelationCreate({
* // $: { ...variables }
* lastSyncId: true,
* issueRelation: true,
* success: true
* })
* ```
*/
          issueRelationCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRelationCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueRelationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* issueRelation: true,
* success: true
* })
* ```
*/
          issueRelationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRelationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an issue relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueRelationDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          issueRelationDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueRelationDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelCreate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueLabelCreate({
* // $: { ...variables }
* lastSyncId: true,
* issueLabel: true,
* success: true
* })
* ```
*/
          issueLabelCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabelCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.issueLabelUpdate({
* // $: { ...variables }
* lastSyncId: true,
* issueLabel: true,
* success: true
* })
* ```
*/
          issueLabelUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabelUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an issue label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueLabelDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          issueLabelDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabelDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Retires a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelRetire` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueLabelRetire({
* // $: { ...variables }
* lastSyncId: true,
* issueLabel: true,
* success: true
* })
* ```
*/
          issueLabelRetire: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabelRetire']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRetire: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRetire: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Restores a label.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueLabelRestore` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueLabelRestore({
* // $: { ...variables }
* lastSyncId: true,
* issueLabel: true,
* success: true
* })
* ```
*/
          issueLabelRestore: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueLabelRestore']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRestore: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRestore: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off a GitHub import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateGithub` |
* | **Nullability** | Required |
* | **Arguments** | 9 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateGithub({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateGithub: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateGithub']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateGithub: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateGithub: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off a Jira import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateJira` |
* | **Nullability** | Required |
* | **Arguments** | 11 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateJira({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateJira: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateJira']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateJira: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateJira: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off a Jira import job from a CSV.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateCSVJira` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateCSVJira({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateCSVJira: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateCSVJira']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateCSVJira: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateCSVJira: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off a Shortcut (formerly Clubhouse) import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateClubhouse` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateClubhouse({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateClubhouse: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateClubhouse']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateClubhouse: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateClubhouse: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off an Asana import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateAsana` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateAsana({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateAsana: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateAsana']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateAsana: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateAsana: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Kicks off a Linear to Linear import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportCreateLinearV2` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueImportCreateLinearV2({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportCreateLinearV2: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportCreateLinearV2']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateLinearV2: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateLinearV2: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an import job.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.issueImportDelete({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Kicks off import processing.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportProcess` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueImportProcess({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportProcess: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportProcess']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportProcess: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportProcess: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates the mapping for the issue import.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueImportPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.issueImportUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.issueImportUpdate({
* // $: { ...variables }
* lastSyncId: true,
* issueImport: true,
* success: true
* })
* ```
*/
          issueImportUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['issueImportUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates new settings for one or more integrations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationsSettingsCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationsSettingsCreate({
* // $: { ...variables }
* lastSyncId: true,
* integrationsSettings: true,
* success: true
* })
* ```
*/
          integrationsSettingsCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationsSettingsCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates settings related to integrations for a project or a team.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationsSettingsPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationsSettingsUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationsSettingsUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integrationsSettings: true,
* success: true
* })
* ```
*/
          integrationsSettingsUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationsSettingsUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new integrationTemplate join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationTemplatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationTemplateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationTemplateCreate({
* // $: { ...variables }
* lastSyncId: true,
* integrationTemplate: true,
* success: true
* })
* ```
*/
          integrationTemplateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationTemplateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a integrationTemplate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationTemplateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationTemplateDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          integrationTemplateDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationTemplateDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates the integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates the integration settings.
*
* @deprecated Use integrationUpdate instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSettingsUpdate` |
* | **⚠ Deprecated** | Use integrationUpdate instead. |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSettingsUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSettingsUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSettingsUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSettingsUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSettingsUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Generates a webhook for the GitHub commit integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubCommitIntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubCommitCreate` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.integrationGithubCommitCreate({
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationGithubCommitCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGithubCommitCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubCommitCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubCommitCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connects the organization with the GitHub App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationGithubConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGithubConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGithubConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connects the organization with the GitHub Import App.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubImportConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationGithubImportConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGithubImportConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGithubImportConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Refreshes the data for a GitHub import integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGithubImportRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationGithubImportRefresh({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGithubImportRefresh: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGithubImportRefresh']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportRefresh: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportRefresh: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connects the organization with a GitHub Enterprise Server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitHubEnterpriseServerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitHubEnterpriseServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationGitHubEnterpriseServerConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationGitHubEnterpriseServerConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGitHubEnterpriseServerConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubEnterpriseServerConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubEnterpriseServerConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connects the organization with a GitLab Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitLabIntegrationCreatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitlabConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationGitlabConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationGitlabConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGitlabConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Tests connectivity to a self-hosted GitLab instance and clears auth errors if successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitLabTestConnectionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitlabTestConnection` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationGitlabTestConnection({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationGitlabTestConnection: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGitlabTestConnection']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabTestConnection: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabTestConnection: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates an integration api key for Airbyte to connect with Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.airbyteIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.airbyteIntegrationConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          airbyteIntegrationConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['airbyteIntegrationConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ airbyteIntegrationConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ airbyteIntegrationConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Connects the Google Calendar to the user to this Linear account via OAuth2.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGoogleCalendarPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationGoogleCalendarPersonalConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGoogleCalendarPersonalConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGoogleCalendarPersonalConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleCalendarPersonalConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleCalendarPersonalConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Integrates the organization with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationLaunchDarklyConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationLaunchDarklyConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationLaunchDarklyConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Integrates your personal account with LaunchDarkly.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLaunchDarklyPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationLaunchDarklyPersonalConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationLaunchDarklyPersonalConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationLaunchDarklyPersonalConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyPersonalConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyPersonalConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Connects the organization with a Jira Personal Access Token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.jiraIntegrationConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.jiraIntegrationConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          jiraIntegrationConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['jiraIntegrationConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ jiraIntegrationConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ jiraIntegrationConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Updates a Jira Integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationJiraUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationJiraUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationJiraUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationJiraUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connect your Jira account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationJiraPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationJiraPersonal({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationJiraPersonal: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationJiraPersonal']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraPersonal: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraPersonal: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connect your GitHub account to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGitHubPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationGitHubPersonal({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGitHubPersonal: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGitHubPersonal']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubPersonal: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubPersonal: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationIntercom({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationIntercom: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationIntercom']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercom: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercom: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Disconnects the organization from Intercom.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercomDelete` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.integrationIntercomDelete({
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationIntercomDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationIntercomDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Refreshes the customer data attributes from the specified integration service.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationCustomerDataAttributesRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationCustomerDataAttributesRefresh({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationCustomerDataAttributesRefresh: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationCustomerDataAttributesRefresh']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationCustomerDataAttributesRefresh: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationCustomerDataAttributesRefresh: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [DEPRECATED] Updates settings on the Intercom integration.
*
* @deprecated This mutation is deprecated, please use `integrationSettingsUpdate` instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationIntercomSettingsUpdate` |
* | **⚠ Deprecated** | This mutation is deprecated, please use `integrationSettingsUpdate` instead |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationIntercomSettingsUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationIntercomSettingsUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationIntercomSettingsUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomSettingsUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomSettingsUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Discord.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationDiscord({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationDiscord: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationDiscord']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDiscord: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDiscord: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Integrates the organization with Opsgenie.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationOpsgenieConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationOpsgenieConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationOpsgenieConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationOpsgenieConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Refresh Opsgenie schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationOpsgenieRefreshScheduleMappings` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.integrationOpsgenieRefreshScheduleMappings({
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationOpsgenieRefreshScheduleMappings: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationOpsgenieRefreshScheduleMappings']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieRefreshScheduleMappings: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieRefreshScheduleMappings: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Integrates the organization with PagerDuty.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationPagerDutyConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationPagerDutyConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationPagerDutyConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationPagerDutyConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Refresh PagerDuty schedule mappings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationPagerDutyRefreshScheduleMappings` |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.integrationPagerDutyRefreshScheduleMappings({
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationPagerDutyRefreshScheduleMappings: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationPagerDutyRefreshScheduleMappings']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyRefreshScheduleMappings: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyRefreshScheduleMappings: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Updates existing Slack integration scopes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.updateIntegrationSlackScopes` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.updateIntegrationSlackScopes({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          updateIntegrationSlackScopes: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['updateIntegrationSlackScopes']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ updateIntegrationSlackScopes: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ updateIntegrationSlackScopes: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlack` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSlack({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSlack: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlack']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlack: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlack: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with the Slack Asks app.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackAsks` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackAsks({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSlackAsks: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackAsks']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackAsks: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackAsks: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates the Slack team's name in Linear for an existing Slack or Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationSlackWorkspaceNamePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrAsksUpdateSlackTeamName` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackOrAsksUpdateSlackTeamName({
* // $: { ...variables }
* name: true,
* success: true
* })
* ```
*/
          integrationSlackOrAsksUpdateSlackTeamName: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackOrAsksUpdateSlackTeamName']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrAsksUpdateSlackTeamName: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrAsksUpdateSlackTeamName: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates your personal notifications with Slack.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackPersonal` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackPersonal({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSlackPersonal: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackPersonal']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPersonal: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPersonal: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Connect a Slack channel to Asks.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AsksChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationAsksConnectChannel` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationAsksConnectChannel({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationAsksConnectChannel: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationAsksConnectChannel']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationAsksConnectChannel: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationAsksConnectChannel: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Slack integration for team notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackPost({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackPost: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackPost']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPost: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPost: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Slack integration for project notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackProjectPost` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackProjectPost({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackProjectPost: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackProjectPost']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackProjectPost: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackProjectPost: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Slack integration for initiative notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackInitiativePost` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackInitiativePost({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackInitiativePost: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackInitiativePost']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackInitiativePost: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackInitiativePost: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Slack integration for custom view notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackCustomViewNotifications` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackCustomViewNotifications({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackCustomViewNotifications: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackCustomViewNotifications']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomViewNotifications: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomViewNotifications: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates a Slack Asks channel with a Customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SuccessPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackCustomerChannelLink` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackCustomerChannelLink({
* // $: { ...variables }
* lastSyncId: true,
* success: true
* })
* ```
*/
          integrationSlackCustomerChannelLink: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackCustomerChannelLink']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomerChannelLink: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomerChannelLink: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Slack integration for organization level project update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrgProjectUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackOrgProjectUpdatesPost({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackOrgProjectUpdatesPost: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackOrgProjectUpdatesPost']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgProjectUpdatesPost: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgProjectUpdatesPost: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Slack integration for organization level initiative update notifications.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SlackChannelConnectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackOrgInitiativeUpdatesPost` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackOrgInitiativeUpdatesPost({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true,
* // ...
* })
* ```
*/
          integrationSlackOrgInitiativeUpdatesPost: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackOrgInitiativeUpdatesPost']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgInitiativeUpdatesPost: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgInitiativeUpdatesPost: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Imports custom emojis from your Slack workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackImportEmojis` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackImportEmojis({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSlackImportEmojis: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackImportEmojis']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackImportEmojis: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackImportEmojis: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Figma.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationFigma` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationFigma({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationFigma: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationFigma']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFigma: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFigma: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Gong.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGong` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationGong({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGong: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGong']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGong: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGong: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Google Sheets.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationGoogleSheets` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationGoogleSheets({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationGoogleSheets: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationGoogleSheets']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleSheets: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleSheets: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Manually update Google Sheets data.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.refreshGoogleSheetsData` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.refreshGoogleSheetsData({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          refreshGoogleSheetsData: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['refreshGoogleSheetsData']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ refreshGoogleSheetsData: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ refreshGoogleSheetsData: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Sentry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSentryConnect` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSentryConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSentryConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSentryConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSentryConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSentryConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationFront` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationFront({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationFront: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationFront']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFront: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFront: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Zendesk.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*
* @example
* ```ts
* const doc = mutation.integrationZendesk({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationZendesk: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationZendesk']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationZendesk: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationZendesk: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Enables Loom integration for the organization.
*
* @deprecated Not available.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationLoom` |
* | **⚠ Deprecated** | Not available. |
* | **Nullability** | Required |
*
* @example
* ```ts
* const doc = mutation.integrationLoom({
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationLoom: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationLoom']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLoom: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLoom: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Integrates the organization with Salesforce.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.integrationSalesforce({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSalesforce: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSalesforce']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforce: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforce: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Refreshes the Salesforce integration metadata.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSalesforceMetadataRefresh` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationSalesforceMetadataRefresh({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSalesforceMetadataRefresh: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSalesforceMetadataRefresh']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforceMetadataRefresh: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforceMetadataRefresh: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Connects the user's personal account with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationMcpServerPersonalConnect` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationMcpServerPersonalConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationMcpServerPersonalConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationMcpServerPersonalConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerPersonalConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerPersonalConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Connects the workspace with an MCP server.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationMcpServerConnect` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationMcpServerConnect({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationMcpServerConnect: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationMcpServerConnect']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerConnect: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerConnect: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          integrationDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives an integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          integrationArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Enables Linear Agent Slack workflow access for a Slack or Slack Asks integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationSlackWorkflowAccessUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.integrationSlackWorkflowAccessUpdate({
* // $: { ...variables }
* lastSyncId: true,
* integration: true,
* success: true
* })
* ```
*/
          integrationSlackWorkflowAccessUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationSlackWorkflowAccessUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackWorkflowAccessUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackWorkflowAccessUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Requests a currently unavailable integration.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationRequestPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.integrationRequest` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.integrationRequest({
* // $: { ...variables }
* success: true
* })
* ```
*/
          integrationRequest: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['integrationRequest']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationRequest: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationRequest: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeUpdateCreate({
* // $: { ...variables }
* lastSyncId: true,
* initiativeUpdate: true,
* success: true
* })
* ```
*/
          initiativeUpdateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.initiativeUpdateUpdate({
* // $: { ...variables }
* lastSyncId: true,
* initiativeUpdate: true,
* success: true
* })
* ```
*/
          initiativeUpdateUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdateUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeUpdateArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          initiativeUpdateArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdateArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Create a notification to remind a user about an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateReminderPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createInitiativeUpdateReminder` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.createInitiativeUpdateReminder({
* // $: { ...variables }
* lastSyncId: true,
* success: true
* })
* ```
*/
          createInitiativeUpdateReminder: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['createInitiativeUpdateReminder']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ createInitiativeUpdateReminder: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ createInitiativeUpdateReminder: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives an initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdateUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeUpdateUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          initiativeUpdateUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdateUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new initiativeToProject join.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeToProjectCreate({
* // $: { ...variables }
* lastSyncId: true,
* initiativeToProject: true,
* success: true
* })
* ```
*/
          initiativeToProjectCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeToProjectCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeToProjectPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.initiativeToProjectUpdate({
* // $: { ...variables }
* lastSyncId: true,
* initiativeToProject: true,
* success: true
* })
* ```
*/
          initiativeToProjectUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeToProjectUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a initiativeToProject.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeToProjectDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeToProjectDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          initiativeToProjectDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeToProjectDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeCreate({
* // $: { ...variables }
* lastSyncId: true,
* initiative: true,
* success: true
* })
* ```
*/
          initiativeCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.initiativeUpdate({
* // $: { ...variables }
* lastSyncId: true,
* initiative: true,
* success: true
* })
* ```
*/
          initiativeUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          initiativeArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          initiativeUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes (trashes) an initiative.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          initiativeDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeRelationPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeRelationCreate({
* // $: { ...variables }
* lastSyncId: true,
* initiativeRelation: true,
* success: true
* })
* ```
*/
          initiativeRelationCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeRelationCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.initiativeRelationUpdate({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          initiativeRelationUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeRelationUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an initiative relation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.initiativeRelationDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.initiativeRelationDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          initiativeRelationDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['initiativeRelationDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationTargetBranchCreate({
* // $: { ...variables }
* lastSyncId: true,
* targetBranch: true,
* success: true
* })
* ```
*/
          gitAutomationTargetBranchCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationTargetBranchCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationTargetBranchPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationTargetBranchUpdate({
* // $: { ...variables }
* lastSyncId: true,
* targetBranch: true,
* success: true
* })
* ```
*/
          gitAutomationTargetBranchUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationTargetBranchUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a Git target branch automation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationTargetBranchDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationTargetBranchDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          gitAutomationTargetBranchDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationTargetBranchDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationStateCreate({
* // $: { ...variables }
* lastSyncId: true,
* gitAutomationState: true,
* success: true
* })
* ```
*/
          gitAutomationStateCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationStateCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.GitAutomationStatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationStateUpdate({
* // $: { ...variables }
* lastSyncId: true,
* gitAutomationState: true,
* success: true
* })
* ```
*/
          gitAutomationStateUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationStateUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives an automation state.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.gitAutomationStateDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.gitAutomationStateDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          gitAutomationStateDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['gitAutomationStateDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* XHR request payload to upload an images, video and other attachments directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.fileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 5 |
*
* @example
* ```ts
* const doc = mutation.fileUpload({
* // $: { ...variables }
* lastSyncId: true,
* uploadFile: true,
* success: true
* })
* ```
*/
          fileUpload: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['fileUpload']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUpload: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUpload: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* XHR request payload to upload a file for import, directly to Linear's cloud storage.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UploadPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.importFileUpload` |
* | **Nullability** | Required |
* | **Arguments** | 4 |
*
* @example
* ```ts
* const doc = mutation.importFileUpload({
* // $: { ...variables }
* lastSyncId: true,
* uploadFile: true,
* success: true
* })
* ```
*/
          importFileUpload: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['importFileUpload']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ importFileUpload: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ importFileUpload: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Upload an image from an URL to Linear.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ImageUploadFromUrlPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.imageUploadFromUrl` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.imageUploadFromUrl({
* // $: { ...variables }
* lastSyncId: true,
* url: true,
* success: true
* })
* ```
*/
          imageUploadFromUrl: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['imageUploadFromUrl']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ imageUploadFromUrl: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ imageUploadFromUrl: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Permanently delete an uploaded file by asset URL. This should be used as a last resort and will break comments and documents that reference the asset.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FileUploadDeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.fileUploadDangerouslyDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.fileUploadDangerouslyDelete({
* // $: { ...variables }
* success: true
* })
* ```
*/
          fileUploadDangerouslyDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['fileUploadDangerouslyDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUploadDangerouslyDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUploadDangerouslyDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new favorite (project, cycle etc).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.favoriteCreate({
* // $: { ...variables }
* lastSyncId: true,
* favorite: true,
* success: true
* })
* ```
*/
          favoriteCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['favoriteCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a favorite.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FavoritePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.favoriteUpdate({
* // $: { ...variables }
* lastSyncId: true,
* favorite: true,
* success: true
* })
* ```
*/
          favoriteUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['favoriteUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a favorite reference.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.favoriteDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.favoriteDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          favoriteDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['favoriteDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.entityExternalLinkCreate({
* // $: { ...variables }
* lastSyncId: true,
* entityExternalLink: true,
* success: true
* })
* ```
*/
          entityExternalLinkCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['entityExternalLinkCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EntityExternalLinkPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.entityExternalLinkUpdate({
* // $: { ...variables }
* lastSyncId: true,
* entityExternalLink: true,
* success: true
* })
* ```
*/
          entityExternalLinkUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['entityExternalLinkUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an entity link.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.entityExternalLinkDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.entityExternalLinkDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          entityExternalLinkDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['entityExternalLinkDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a custom emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmojiPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emojiCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emojiCreate({
* // $: { ...variables }
* lastSyncId: true,
* emoji: true,
* success: true
* })
* ```
*/
          emojiCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emojiCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an emoji.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emojiDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emojiDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          emojiDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emojiDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unsubscribes the user from one type of email.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailUnsubscribePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailUnsubscribe` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailUnsubscribe({
* // $: { ...variables }
* success: true
* })
* ```
*/
          emailUnsubscribe: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailUnsubscribe']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUnsubscribe: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUnsubscribe: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailIntakeAddressCreate({
* // $: { ...variables }
* lastSyncId: true,
* emailIntakeAddress: true,
* success: true
* })
* ```
*/
          emailIntakeAddressCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailIntakeAddressCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Rotates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressRotate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailIntakeAddressRotate({
* // $: { ...variables }
* lastSyncId: true,
* emailIntakeAddress: true,
* success: true
* })
* ```
*/
          emailIntakeAddressRotate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailIntakeAddressRotate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressRotate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressRotate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing email intake address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailIntakeAddressPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.emailIntakeAddressUpdate({
* // $: { ...variables }
* lastSyncId: true,
* emailIntakeAddress: true,
* success: true
* })
* ```
*/
          emailIntakeAddressUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailIntakeAddressUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an email intake address object.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailIntakeAddressDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailIntakeAddressDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          emailIntakeAddressDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailIntakeAddressDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.documentCreate({
* // $: { ...variables }
* lastSyncId: true,
* document: true,
* success: true
* })
* ```
*/
          documentCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documentCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ documentCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.documentUpdate({
* // $: { ...variables }
* lastSyncId: true,
* document: true,
* success: true
* })
* ```
*/
          documentUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documentUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes (trashes) a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.documentDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          documentDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documentDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ documentDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Restores a document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.documentUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.documentUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          documentUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['documentUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.cycleCreate({
* // $: { ...variables }
* lastSyncId: true,
* cycle: true,
* success: true
* })
* ```
*/
          cycleCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycleCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.cycleUpdate({
* // $: { ...variables }
* lastSyncId: true,
* cycle: true,
* success: true
* })
* ```
*/
          cycleUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycleUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a cycle.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.cycleArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          cycleArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycleArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleShiftAll` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.cycleShiftAll({
* // $: { ...variables }
* lastSyncId: true,
* cycle: true,
* success: true
* })
* ```
*/
          cycleShiftAll: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycleShiftAll']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleShiftAll: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleShiftAll: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Shifts all cycles starts and ends by a certain number of days, starting from the provided cycle onwards.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CyclePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.cycleStartUpcomingCycleToday` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.cycleStartUpcomingCycleToday({
* // $: { ...variables }
* lastSyncId: true,
* cycle: true,
* success: true
* })
* ```
*/
          cycleStartUpcomingCycleToday: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['cycleStartUpcomingCycleToday']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleStartUpcomingCycleToday: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleStartUpcomingCycleToday: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerTierCreate({
* // $: { ...variables }
* lastSyncId: true,
* tier: true,
* success: true
* })
* ```
*/
          customerTierCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerTierCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerTierPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerTierUpdate({
* // $: { ...variables }
* lastSyncId: true,
* tier: true,
* success: true
* })
* ```
*/
          customerTierUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerTierUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a customer tier.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerTierDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerTierDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          customerTierDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerTierDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerStatusCreate({
* // $: { ...variables }
* lastSyncId: true,
* status: true,
* success: true
* })
* ```
*/
          customerStatusCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerStatusCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerStatusPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerStatusUpdate({
* // $: { ...variables }
* lastSyncId: true,
* status: true,
* success: true
* })
* ```
*/
          customerStatusUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerStatusUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a customer status.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerStatusDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerStatusDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          customerStatusDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerStatusDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerCreate({
* // $: { ...variables }
* lastSyncId: true,
* customer: true,
* success: true
* })
* ```
*/
          customerCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a customer
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerUpdate({
* // $: { ...variables }
* lastSyncId: true,
* customer: true,
* success: true
* })
* ```
*/
          customerUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a customer.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          customerDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Merges two customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerMerge` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerMerge({
* // $: { ...variables }
* lastSyncId: true,
* customer: true,
* success: true
* })
* ```
*/
          customerMerge: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerMerge']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerMerge: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerMerge: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Upserts a customer, creating it if it doesn't exists, updating it otherwise. Matches against an existing customer with `id` or `externalId`
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUpsert` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerUpsert({
* // $: { ...variables }
* lastSyncId: true,
* customer: true,
* success: true
* })
* ```
*/
          customerUpsert: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerUpsert']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpsert: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpsert: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unsyncs a managed customer from the its current data source. External IDs mapping to the external source will be cleared.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerUnsync` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerUnsync({
* // $: { ...variables }
* lastSyncId: true,
* customer: true,
* success: true
* })
* ```
*/
          customerUnsync: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerUnsync']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUnsync: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUnsync: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerNeedCreate({
* // $: { ...variables }
* lastSyncId: true,
* need: true,
* success: true
* })
* ```
*/
          customerNeedCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new customer need out of an attachment
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedCreateFromAttachment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerNeedCreateFromAttachment({
* // $: { ...variables }
* lastSyncId: true,
* need: true,
* success: true
* })
* ```
*/
          customerNeedCreateFromAttachment: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedCreateFromAttachment']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreateFromAttachment: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreateFromAttachment: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a customer need
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedUpdatePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerNeedUpdate({
* // $: { ...variables }
* lastSyncId: true,
* need: true,
* success: true,
* // ...
* })
* ```
*/
          customerNeedUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedDelete` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customerNeedDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          customerNeedDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Archives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedArchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerNeedArchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          customerNeedArchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedArchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedArchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedArchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unarchives a customer need.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedArchivePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customerNeedUnarchive` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customerNeedUnarchive({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entity: true
* })
* ```
*/
          customerNeedUnarchive: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customerNeedUnarchive']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUnarchive: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUnarchive: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customViewCreate({
* // $: { ...variables }
* lastSyncId: true,
* customView: true,
* success: true
* })
* ```
*/
          customViewCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViewCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomViewPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.customViewUpdate({
* // $: { ...variables }
* lastSyncId: true,
* customView: true,
* success: true
* })
* ```
*/
          customViewUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViewUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a custom view.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.customViewDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.customViewDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          customViewDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['customViewDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Saves user message.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.contactCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.contactCreate({
* // $: { ...variables }
* success: true
* })
* ```
*/
          contactCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['contactCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ contactCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Saves sales pricing inquiry to Front.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ContactPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.contactSalesCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.contactSalesCreate({
* // $: { ...variables }
* success: true
* })
* ```
*/
          contactSalesCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['contactSalesCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactSalesCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ contactSalesCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.commentCreate({
* // $: { ...variables }
* lastSyncId: true,
* comment: true,
* success: true
* })
* ```
*/
          commentCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['commentCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ commentCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 3 |
*
* @example
* ```ts
* const doc = mutation.commentUpdate({
* // $: { ...variables }
* lastSyncId: true,
* comment: true,
* success: true
* })
* ```
*/
          commentUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['commentUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.commentDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          commentDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['commentDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ commentDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Resolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentResolve` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.commentResolve({
* // $: { ...variables }
* lastSyncId: true,
* comment: true,
* success: true
* })
* ```
*/
          commentResolve: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['commentResolve']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentResolve: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ commentResolve: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Unresolves a comment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CommentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.commentUnresolve` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.commentUnresolve({
* // $: { ...variables }
* lastSyncId: true,
* comment: true,
* success: true
* })
* ```
*/
          commentUnresolve: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['commentUnresolve']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUnresolve: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUnresolve: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Finds or creates a new user account by email and sends an email with token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.EmailUserAccountAuthChallengeResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailUserAccountAuthChallenge` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailUserAccountAuthChallenge({
* // $: { ...variables }
* success: true,
* authType: true
* })
* ```
*/
          emailUserAccountAuthChallenge: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailUserAccountAuthChallenge']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUserAccountAuthChallenge: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUserAccountAuthChallenge: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Authenticates a user account via email and authentication token.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.emailTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.emailTokenUserAccountAuth({
* // $: { ...variables }
* id: true,
* email: true,
* allowDomainAccess: true,
* // ...
* })
* ```
*/
          emailTokenUserAccountAuth: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['emailTokenUserAccountAuth']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailTokenUserAccountAuth: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ emailTokenUserAccountAuth: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Authenticates a user account via email and authentication token for SAML.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.samlTokenUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.samlTokenUserAccountAuth({
* // $: { ...variables }
* id: true,
* email: true,
* allowDomainAccess: true,
* // ...
* })
* ```
*/
          samlTokenUserAccountAuth: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['samlTokenUserAccountAuth']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ samlTokenUserAccountAuth: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ samlTokenUserAccountAuth: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Authenticate user account through Google OAuth. This is the 2nd step of OAuth flow.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.googleUserAccountAuth` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.googleUserAccountAuth({
* // $: { ...variables }
* id: true,
* email: true,
* allowDomainAccess: true,
* // ...
* })
* ```
*/
          googleUserAccountAuth: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['googleUserAccountAuth']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ googleUserAccountAuth: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ googleUserAccountAuth: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Starts passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PasskeyLoginStartResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.passkeyLoginStart` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.passkeyLoginStart({
* // $: { ...variables }
* success: true,
* options: true
* })
* ```
*/
          passkeyLoginStart: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['passkeyLoginStart']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginStart: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginStart: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [INTERNAL] Finish passkey login process.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthResolverResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.passkeyLoginFinish` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.passkeyLoginFinish({
* // $: { ...variables }
* id: true,
* email: true,
* allowDomainAccess: true,
* // ...
* })
* ```
*/
          passkeyLoginFinish: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['passkeyLoginFinish']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginFinish: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginFinish: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.createOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.createOrganizationFromOnboarding({
* // $: { ...variables }
* organization: true,
* user: true
* })
* ```
*/
          createOrganizationFromOnboarding: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['createOrganizationFromOnboarding']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ createOrganizationFromOnboarding: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ createOrganizationFromOnboarding: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Join an organization from onboarding.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.joinOrganizationFromOnboarding` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.joinOrganizationFromOnboarding({
* // $: { ...variables }
* organization: true,
* user: true
* })
* ```
*/
          joinOrganizationFromOnboarding: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['joinOrganizationFromOnboarding']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ joinOrganizationFromOnboarding: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ joinOrganizationFromOnboarding: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Leave an organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CreateOrJoinOrganizationResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.leaveOrganization` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.leaveOrganization({
* // $: { ...variables }
* organization: true,
* user: true
* })
* ```
*/
          leaveOrganization: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['leaveOrganization']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ leaveOrganization: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ leaveOrganization: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Logout the client.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logout` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.logout({
* // $: { ...variables }
* success: true
* })
* ```
*/
          logout: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['logout']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ logout: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ logout: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Logout an individual session with its ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutSession` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.logoutSession({
* // $: { ...variables }
* success: true
* })
* ```
*/
          logoutSession: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['logoutSession']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutSession: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutSession: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Logout all of user's sessions including the active one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutAllSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.logoutAllSessions({
* // $: { ...variables }
* success: true
* })
* ```
*/
          logoutAllSessions: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['logoutAllSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutAllSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutAllSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Logout all of user's sessions excluding the current one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.LogoutResponse}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.logoutOtherSessions` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.logoutOtherSessions({
* // $: { ...variables }
* success: true
* })
* ```
*/
          logoutOtherSessions: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['logoutOtherSessions']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutOtherSessions: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutOtherSessions: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new attachment, or updates existing if the same `url` and `issueId` is used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.attachmentCreate({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an existing issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.attachmentUpdate({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link any url to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkURL` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkURL({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkURL: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkURL']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkURL: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkURL: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing GitLab MR to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitLabMR` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkGitLabMR({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkGitLabMR: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkGitLabMR']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitLabMR: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitLabMR: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link a GitHub issue to a Linear issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubIssue` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkGitHubIssue({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkGitHubIssue: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkGitHubIssue']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubIssue: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubIssue: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link a GitHub pull request to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkGitHubPR` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkGitHubPR({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkGitHubPR: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkGitHubPR']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubPR: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubPR: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Zendesk ticket to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkZendesk` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkZendesk({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkZendesk: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkZendesk']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkZendesk: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkZendesk: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Discord message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkDiscord` |
* | **Nullability** | Required |
* | **Arguments** | 8 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkDiscord({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkDiscord: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkDiscord']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkDiscord: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkDiscord: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Begin syncing the thread for an existing Slack message attachment with a comment thread on its issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentSyncToSlack` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.attachmentSyncToSlack({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentSyncToSlack: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentSyncToSlack']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentSyncToSlack: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentSyncToSlack: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Slack message to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkSlack` |
* | **Nullability** | Required |
* | **Arguments** | 10 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkSlack({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkSlack: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkSlack']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSlack: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSlack: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Front conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FrontAttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkFront` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkFront({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkFront: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkFront']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkFront: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkFront: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Intercom conversation to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkIntercom` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkIntercom({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkIntercom: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkIntercom']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkIntercom: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkIntercom: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Jira issue to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkJiraIssue` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkJiraIssue({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkJiraIssue: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkJiraIssue']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkJiraIssue: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkJiraIssue: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Link an existing Salesforce case to an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AttachmentPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentLinkSalesforce` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*
* @example
* ```ts
* const doc = mutation.attachmentLinkSalesforce({
* // $: { ...variables }
* lastSyncId: true,
* attachment: true,
* success: true
* })
* ```
*/
          attachmentLinkSalesforce: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentLinkSalesforce']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSalesforce: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSalesforce: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Deletes an issue attachment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.attachmentDelete` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.attachmentDelete({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* entityId: true
* })
* ```
*/
          attachmentDelete: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['attachmentDelete']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentDelete: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentDelete: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new agent session on a rootcomment.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnComment` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.agentSessionCreateOnComment({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* agentSession: true
* })
* ```
*/
          agentSessionCreateOnComment: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessionCreateOnComment']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnComment: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnComment: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates a new agent session on an issue.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreateOnIssue` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.agentSessionCreateOnIssue({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* agentSession: true
* })
* ```
*/
          agentSessionCreateOnIssue: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessionCreateOnIssue']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnIssue: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnIssue: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Creates a new agent session on behalf of the current user
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.agentSessionCreate({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* agentSession: true
* })
* ```
*/
          agentSessionCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessionCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates the externalUrl of an agent session, which is an agent-hosted page associated with this session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionUpdateExternalUrl` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.agentSessionUpdateExternalUrl({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* agentSession: true
* })
* ```
*/
          agentSessionUpdateExternalUrl: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessionUpdateExternalUrl']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdateExternalUrl: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdateExternalUrl: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Updates an agent session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentSessionPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentSessionUpdate` |
* | **Nullability** | Required |
* | **Arguments** | 2 |
*
* @example
* ```ts
* const doc = mutation.agentSessionUpdate({
* // $: { ...variables }
* lastSyncId: true,
* success: true,
* agentSession: true
* })
* ```
*/
          agentSessionUpdate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentSessionUpdate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* Creates an agent activity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentActivityCreate` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.agentActivityCreate({
* // $: { ...variables }
* lastSyncId: true,
* agentActivity: true,
* success: true
* })
* ```
*/
          agentActivityCreate: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentActivityCreate']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreate: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreate: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >

          /**
* [Internal] Creates a prompt agent activity from Linear user input.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityPayload}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Mutation} |
* | **Path** | `Mutation.agentActivityCreatePrompt` |
* | **Nullability** | Required |
* | **Arguments** | 1 |
*
* @example
* ```ts
* const doc = mutation.agentActivityCreatePrompt({
* // $: { ...variables }
* lastSyncId: true,
* agentActivity: true,
* success: true
* })
* ```
*/
          agentActivityCreatePrompt: <const $SelectionSet extends SelectionSets.Mutation<GraphqlKit.Document.Object.Select.StaticBuilderContext>['agentActivityCreatePrompt']>(
            selection?: $SelectionSet
          ) => GraphqlKit.Document.Typed.String<
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreatePrompt: $SelectionSet }, $$Schema.Schema>>,
            $$Utilities.RequestResult.Simplify<StaticDocumentContext, GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreatePrompt: Exclude<$SelectionSet, undefined> }, SchemaMap.SchemaDrivenDataMap>>,
            true
          >
        }

/**
* Static mutation builder for compile-time GraphQL document generation.
*
* @remarks
* Each field method generates a fully typed GraphQL mutation document  with:
* - Type-safe selection sets and input types
* - Automatic variable inference from `$` usage
* - Compile-time validation of mutations
* - Zero runtime overhead - documents are generated at build time
*
* @example
* ```ts
* import { Var } from 'graffle'
*
* const createUserDoc = mutation.createUser({
* $: { input: $ },
* id: true,
* name: true
* })
* // Generates: mutation ($input: CreateUserInput!) { createUser(input: $input) { id name } }
* ```
*
* @see {@link https://graffle.js.org/guides/static-generation | Static Generation Guide}
*/
export const mutation: MutationBuilder = createStaticRootType(GraphqlKit.Schema.OperationType.MUTATION, { sddm }) as any
