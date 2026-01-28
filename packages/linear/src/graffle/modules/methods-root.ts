import type * as $$SelectionSets from './selection-sets/_.js'
import type * as $$Schema from './schema/_.js'
import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $$SchemaMap from './schema-driven-data-map.js'


/**
* GraphQL {@link https://graphql.org/learn/schema/#the-query-and-mutation-types | Query} root methods.
*
* All methods return Promises. Use `.query.$batch(...)` to select multiple fields at once.
*/
export interface QueryMethods<$Context extends $$Utilities.Context> {
/**
  * Select multiple Query fields at once.
  *
  * Pass a selection set object that includes the fields you want.
  * Use this method to request multiple fields in a single request for better performance.
  */

      $batch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<$$Utilities.AssertExtendsObject<$SelectionSet>, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutput<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<$$Utilities.AssertExtendsObject<$SelectionSet>, $$Schema.Schema<$Context['scalars']>>
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<$$Utilities.AssertExtendsObject<$SelectionSet>, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutput<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<$$Utilities.AssertExtendsObject<$SelectionSet>, $$Schema.Schema<$Context['scalars']>>
                  >
              >
            >
        >

/**
  * Request the {@link https://graphql.org/learn/schema/#the-__typename-field | __typename} meta-field.
  *
  * The `__typename` field returns the name of the object type. In this case, it will always return `"Query"`.
  */

      __typename:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          () =>
            Promise<
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  { __typename: 'Query' },
                  '__typename'
                >
            >
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
*/

      workflowStates:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.workflowStates<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowStates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowStates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'workflowStates'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowStates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowStates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'workflowStates'
                  >
              >
            >
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
*/

      workflowState:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.workflowState<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowState: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowState: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'workflowState'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ workflowState: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ workflowState: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'workflowState'
                  >
              >
            >
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
*/

      webhooks:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.webhooks<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ webhooks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhooks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhooks'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ webhooks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhooks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhooks'
                  >
              >
            >
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
*/

      webhook:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.webhook<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ webhook: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhook: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhook'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ webhook: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ webhook: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhook'
                  >
              >
            >
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
*/

      failuresForOauthWebhooks:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.failuresForOauthWebhooks<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ failuresForOauthWebhooks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ failuresForOauthWebhooks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'failuresForOauthWebhooks'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ failuresForOauthWebhooks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ failuresForOauthWebhooks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'failuresForOauthWebhooks'
                  >
              >
            >
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
*/

      userSettings:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.userSettings<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ userSettings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSettings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userSettings'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ userSettings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSettings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userSettings'
                  >
              >
            >
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
*/

      users:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.users<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ users: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ users: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'users'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ users: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ users: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'users'
                  >
              >
            >
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
*/

      user:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.user<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ user: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ user: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'user'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ user: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ user: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'user'
                  >
              >
            >
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
*/

      viewer:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.viewer<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ viewer: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ viewer: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'viewer'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ viewer: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ viewer: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'viewer'
                  >
              >
            >
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
*/

      userSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.userSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ userSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ userSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ userSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userSessions'
                  >
              >
            >
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
*/

      triageResponsibilities:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.triageResponsibilities<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibilities: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibilities: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'triageResponsibilities'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibilities: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibilities: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'triageResponsibilities'
                  >
              >
            >
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
*/

      triageResponsibility:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.triageResponsibility<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibility: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibility: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'triageResponsibility'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ triageResponsibility: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ triageResponsibility: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'triageResponsibility'
                  >
              >
            >
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
*/

      timeSchedules:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.timeSchedules<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedules: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedules: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeSchedules'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedules: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedules: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeSchedules'
                  >
              >
            >
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
*/

      timeSchedule:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.timeSchedule<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedule: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedule: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeSchedule'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ timeSchedule: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ timeSchedule: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeSchedule'
                  >
              >
            >
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
*/

      templates:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.templates<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ templates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ templates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'templates'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ templates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ templates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'templates'
                  >
              >
            >
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
*/

      template:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.template<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ template: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ template: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'template'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ template: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ template: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'template'
                  >
              >
            >
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
*/

      templatesForIntegration:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.templatesForIntegration<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ templatesForIntegration: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ templatesForIntegration: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'templatesForIntegration'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ templatesForIntegration: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ templatesForIntegration: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'templatesForIntegration'
                  >
              >
            >
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
*/

      projects:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projects<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projects'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projects'
                  >
              >
            >
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
*/

      project:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.project<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ project: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ project: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'project'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ project: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ project: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'project'
                  >
              >
            >
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
*/

      projectFilterSuggestion:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectFilterSuggestion<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectFilterSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectFilterSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectFilterSuggestion'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectFilterSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectFilterSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectFilterSuggestion'
                  >
              >
            >
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
*/

      teams:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.teams<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ teams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ teams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teams'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ teams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ teams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teams'
                  >
              >
            >
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
*/

      administrableTeams:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.administrableTeams<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ administrableTeams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ administrableTeams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'administrableTeams'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ administrableTeams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ administrableTeams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'administrableTeams'
                  >
              >
            >
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
*/

      team:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.team<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ team: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ team: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'team'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ team: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ team: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'team'
                  >
              >
            >
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
*/

      teamMemberships:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.teamMemberships<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMemberships: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMemberships: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamMemberships'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMemberships: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMemberships: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamMemberships'
                  >
              >
            >
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
*/

      teamMembership:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.teamMembership<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMembership: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMembership: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamMembership'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ teamMembership: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ teamMembership: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamMembership'
                  >
              >
            >
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
*/

      semanticSearch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.semanticSearch<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ semanticSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ semanticSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'semanticSearch'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ semanticSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ semanticSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'semanticSearch'
                  >
              >
            >
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
*/

      searchDocuments:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.searchDocuments<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ searchDocuments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchDocuments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'searchDocuments'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ searchDocuments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchDocuments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'searchDocuments'
                  >
              >
            >
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
*/

      searchProjects:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.searchProjects<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ searchProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'searchProjects'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ searchProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'searchProjects'
                  >
              >
            >
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
*/

      searchIssues:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.searchIssues<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ searchIssues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchIssues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'searchIssues'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ searchIssues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ searchIssues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'searchIssues'
                  >
              >
            >
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
*/

      roadmapToProjects:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.roadmapToProjects<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapToProjects'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapToProjects'
                  >
              >
            >
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
*/

      roadmapToProject:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.roadmapToProject<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProject: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProject: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapToProject'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmapToProject: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmapToProject: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapToProject'
                  >
              >
            >
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
*/

      roadmaps:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.roadmaps<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmaps: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmaps: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmaps'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmaps: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmaps: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmaps'
                  >
              >
            >
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
*/

      roadmap:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.roadmap<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmap: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmap: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmap'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ roadmap: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ roadmap: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmap'
                  >
              >
            >
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
*/

      releaseStages:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.releaseStages<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStages: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStages: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStages'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStages: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStages: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStages'
                  >
              >
            >
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
*/

      releaseStage:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.releaseStage<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStage: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStage: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStage'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ releaseStage: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ releaseStage: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStage'
                  >
              >
            >
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
*/

      releases:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.releases<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ releases: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ releases: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releases'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ releases: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ releases: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releases'
                  >
              >
            >
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
*/

      release:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.release<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ release: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ release: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'release'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ release: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ release: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'release'
                  >
              >
            >
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
*/

      releasePipelines:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.releasePipelines<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipelines: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipelines: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelines'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipelines: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipelines: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelines'
                  >
              >
            >
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
*/

      releasePipeline:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.releasePipeline<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipeline: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipeline: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipeline'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ releasePipeline: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ releasePipeline: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipeline'
                  >
              >
            >
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
*/

      rateLimitStatus:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.rateLimitStatus<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ rateLimitStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ rateLimitStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'rateLimitStatus'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ rateLimitStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ rateLimitStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'rateLimitStatus'
                  >
              >
            >
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
*/

      pushSubscriptionTest:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.pushSubscriptionTest<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ pushSubscriptionTest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ pushSubscriptionTest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'pushSubscriptionTest'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ pushSubscriptionTest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ pushSubscriptionTest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'pushSubscriptionTest'
                  >
              >
            >
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
*/

      projectUpdates:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectUpdates<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdates'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdates'
                  >
              >
            >
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
*/

      projectUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdate'
                  >
              >
            >
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
*/

      projectStatuses:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectStatuses<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatuses: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatuses: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatuses'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatuses: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatuses: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatuses'
                  >
              >
            >
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
*/

      projectStatusProjectCount:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectStatusProjectCount<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatusProjectCount: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatusProjectCount: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatusProjectCount'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatusProjectCount: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatusProjectCount: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatusProjectCount'
                  >
              >
            >
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
*/

      projectStatus:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectStatus<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatus'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatus'
                  >
              >
            >
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
*/

      projectRelations:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectRelations<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRelations'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRelations'
                  >
              >
            >
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
*/

      projectRelation:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectRelation<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRelation'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRelation'
                  >
              >
            >
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
*/

      projectMilestones:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectMilestones<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestones: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestones: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestones'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestones: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestones: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestones'
                  >
              >
            >
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
*/

      projectMilestone:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectMilestone<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestone: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestone: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestone'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectMilestone: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectMilestone: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestone'
                  >
              >
            >
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
*/

      projectLabels:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectLabels<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabels: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabels: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabels'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabels: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabels: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabels'
                  >
              >
            >
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
*/

      projectLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.projectLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ projectLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ projectLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabel'
                  >
              >
            >
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
*/

      organization:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organization<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organization: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organization: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organization'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organization: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organization: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organization'
                  >
              >
            >
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
*/

      organizationExists:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationExists<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationExists: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationExists: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationExists'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationExists: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationExists: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationExists'
                  >
              >
            >
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
*/

      archivedTeams:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.archivedTeams<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ archivedTeams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ archivedTeams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'archivedTeams'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ archivedTeams: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ archivedTeams: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'archivedTeams'
                  >
              >
            >
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
*/

      organizationMeta:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationMeta<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationMeta: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationMeta: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationMeta'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationMeta: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationMeta: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationMeta'
                  >
              >
            >
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
*/

      organizationInvites:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationInvites<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvites: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvites: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInvites'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvites: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvites: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInvites'
                  >
              >
            >
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
*/

      organizationInvite:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationInvite<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInvite'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInvite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInvite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInvite'
                  >
              >
            >
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
*/

      organizationInviteDetails:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationInviteDetails<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInviteDetails: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInviteDetails: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInviteDetails'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationInviteDetails: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationInviteDetails: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInviteDetails'
                  >
              >
            >
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
*/

      organizationDomainClaimRequest:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.organizationDomainClaimRequest<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationDomainClaimRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationDomainClaimRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainClaimRequest'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ organizationDomainClaimRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ organizationDomainClaimRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainClaimRequest'
                  >
              >
            >
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
*/

      notificationSubscriptions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.notificationSubscriptions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscriptions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscriptions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSubscriptions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscriptions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscriptions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSubscriptions'
                  >
              >
            >
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
*/

      notificationSubscription:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.notificationSubscription<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscription: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscription: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSubscription'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationSubscription: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationSubscription: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSubscription'
                  >
              >
            >
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
*/

      notifications:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.notifications<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ notifications: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ notifications: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notifications'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ notifications: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ notifications: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notifications'
                  >
              >
            >
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
*/

      notificationsUnreadCount:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet?: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.notificationsUnreadCount<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationsUnreadCount: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationsUnreadCount: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationsUnreadCount'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ notificationsUnreadCount: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ notificationsUnreadCount: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationsUnreadCount'
                  >
              >
            >
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
*/

      notification:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.notification<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ notification: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ notification: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notification'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ notification: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ notification: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notification'
                  >
              >
            >
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
*/

      issueToReleases:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueToReleases<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToReleases: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToReleases: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueToReleases'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToReleases: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToReleases: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueToReleases'
                  >
              >
            >
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
*/

      issueToRelease:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueToRelease<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToRelease: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToRelease: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueToRelease'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueToRelease: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueToRelease: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueToRelease'
                  >
              >
            >
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
*/

      issues:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issues<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issues'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issues'
                  >
              >
            >
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
*/

      issue:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issue<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issue'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issue'
                  >
              >
            >
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
*/

      issueSearch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueSearch<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueSearch'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueSearch'
                  >
              >
            >
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
*/

      issueVcsBranchSearch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueVcsBranchSearch<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueVcsBranchSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueVcsBranchSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueVcsBranchSearch'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueVcsBranchSearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueVcsBranchSearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueVcsBranchSearch'
                  >
              >
            >
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
*/

      issueFigmaFileKeySearch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueFigmaFileKeySearch<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFigmaFileKeySearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFigmaFileKeySearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueFigmaFileKeySearch'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFigmaFileKeySearch: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFigmaFileKeySearch: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueFigmaFileKeySearch'
                  >
              >
            >
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
*/

      issuePriorityValues:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issuePriorityValues<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issuePriorityValues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issuePriorityValues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issuePriorityValues'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issuePriorityValues: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issuePriorityValues: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issuePriorityValues'
                  >
              >
            >
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
*/

      issueFilterSuggestion:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueFilterSuggestion<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFilterSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFilterSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueFilterSuggestion'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueFilterSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueFilterSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueFilterSuggestion'
                  >
              >
            >
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
*/

      issueRepositorySuggestions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueRepositorySuggestions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRepositorySuggestions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRepositorySuggestions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRepositorySuggestions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRepositorySuggestions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRepositorySuggestions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRepositorySuggestions'
                  >
              >
            >
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
*/

      issueRelations:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueRelations<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRelations'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRelations'
                  >
              >
            >
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
*/

      issueRelation:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueRelation<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRelation'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRelation'
                  >
              >
            >
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
*/

      issueLabels:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueLabels<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabels: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabels: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabels'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabels: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabels: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabels'
                  >
              >
            >
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
*/

      issueLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabel'
                  >
              >
            >
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
*/

      issueImportCheckCSV:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueImportCheckCSV<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckCSV: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckCSV: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCheckCSV'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckCSV: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckCSV: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCheckCSV'
                  >
              >
            >
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
*/

      issueImportCheckSync:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueImportCheckSync<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckSync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckSync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCheckSync'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportCheckSync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportCheckSync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCheckSync'
                  >
              >
            >
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
*/

      issueImportJqlCheck:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueImportJqlCheck<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportJqlCheck: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportJqlCheck: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportJqlCheck'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueImportJqlCheck: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueImportJqlCheck: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportJqlCheck'
                  >
              >
            >
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
*/

      integrationsSettings:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integrationsSettings<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationsSettings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationsSettings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationsSettings'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationsSettings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationsSettings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationsSettings'
                  >
              >
            >
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
*/

      integrationTemplates:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integrationTemplates<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationTemplates'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationTemplates'
                  >
              >
            >
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
*/

      integrationTemplate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integrationTemplate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationTemplate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationTemplate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationTemplate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationTemplate'
                  >
              >
            >
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
*/

      integrations:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integrations<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integrations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrations'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integrations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrations'
                  >
              >
            >
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
*/

      integration:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integration<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integration: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integration: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integration'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integration: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integration: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integration'
                  >
              >
            >
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
*/

      verifyGitHubEnterpriseServerInstallation:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.verifyGitHubEnterpriseServerInstallation<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ verifyGitHubEnterpriseServerInstallation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ verifyGitHubEnterpriseServerInstallation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'verifyGitHubEnterpriseServerInstallation'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ verifyGitHubEnterpriseServerInstallation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ verifyGitHubEnterpriseServerInstallation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'verifyGitHubEnterpriseServerInstallation'
                  >
              >
            >
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
*/

      integrationHasScopes:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.integrationHasScopes<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationHasScopes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationHasScopes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationHasScopes'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ integrationHasScopes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ integrationHasScopes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationHasScopes'
                  >
              >
            >
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
*/

      initiativeUpdates:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeUpdates<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdates'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdates: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdates: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdates'
                  >
              >
            >
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
*/

      initiativeUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdate'
                  >
              >
            >
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
*/

      initiativeToProjects:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeToProjects<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeToProjects'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProjects: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProjects: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeToProjects'
                  >
              >
            >
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
*/

      initiativeToProject:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeToProject<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProject: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProject: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeToProject'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeToProject: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeToProject: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeToProject'
                  >
              >
            >
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
*/

      initiatives:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiatives<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiatives: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiatives: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiatives'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiatives: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiatives: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiatives'
                  >
              >
            >
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
*/

      initiative:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiative<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiative: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiative: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiative'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiative: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiative: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiative'
                  >
              >
            >
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
*/

      initiativeRelations:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeRelations<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeRelations'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelations: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelations: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeRelations'
                  >
              >
            >
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
*/

      initiativeRelation:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.initiativeRelation<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeRelation'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ initiativeRelation: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ initiativeRelation: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeRelation'
                  >
              >
            >
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
*/

      fetchData:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.fetchData<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ fetchData: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ fetchData: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'fetchData'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ fetchData: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ fetchData: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'fetchData'
                  >
              >
            >
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
*/

      favorites:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.favorites<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ favorites: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorites: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'favorites'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ favorites: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorites: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'favorites'
                  >
              >
            >
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
*/

      favorite:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.favorite<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ favorite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'favorite'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ favorite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ favorite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'favorite'
                  >
              >
            >
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
*/

      externalUsers:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.externalUsers<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUsers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUsers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'externalUsers'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUsers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUsers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'externalUsers'
                  >
              >
            >
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
*/

      externalUser:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.externalUser<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUser: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUser: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'externalUser'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ externalUser: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ externalUser: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'externalUser'
                  >
              >
            >
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
*/

      entityExternalLink:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.entityExternalLink<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ entityExternalLink: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ entityExternalLink: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'entityExternalLink'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ entityExternalLink: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ entityExternalLink: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'entityExternalLink'
                  >
              >
            >
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
*/

      emojis:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.emojis<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ emojis: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ emojis: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emojis'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ emojis: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ emojis: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emojis'
                  >
              >
            >
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
*/

      emoji:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.emoji<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ emoji: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ emoji: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emoji'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ emoji: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ emoji: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emoji'
                  >
              >
            >
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
*/

      emailIntakeAddress:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.emailIntakeAddress<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ emailIntakeAddress: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ emailIntakeAddress: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailIntakeAddress'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ emailIntakeAddress: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ emailIntakeAddress: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailIntakeAddress'
                  >
              >
            >
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
*/

      documents:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.documents<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ documents: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ documents: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documents'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ documents: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ documents: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documents'
                  >
              >
            >
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
*/

      document:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.document<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ document: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ document: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'document'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ document: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ document: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'document'
                  >
              >
            >
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
*/

      documentContentHistory:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.documentContentHistory<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ documentContentHistory: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ documentContentHistory: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documentContentHistory'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ documentContentHistory: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ documentContentHistory: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documentContentHistory'
                  >
              >
            >
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
*/

      cycles:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.cycles<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ cycles: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycles: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycles'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ cycles: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycles: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycles'
                  >
              >
            >
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
*/

      cycle:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.cycle<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ cycle: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycle: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycle'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ cycle: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ cycle: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycle'
                  >
              >
            >
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
*/

      customerTiers:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerTiers<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTiers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTiers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerTiers'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTiers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTiers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerTiers'
                  >
              >
            >
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
*/

      customerTier:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerTier<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTier: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTier: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerTier'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerTier: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerTier: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerTier'
                  >
              >
            >
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
*/

      customerStatuses:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerStatuses<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatuses: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatuses: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerStatuses'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatuses: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatuses: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerStatuses'
                  >
              >
            >
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
*/

      customerStatus:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerStatus<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerStatus'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerStatus'
                  >
              >
            >
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
*/

      customers:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customers<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customers'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customers'
                  >
              >
            >
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
*/

      customer:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customer<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customer: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customer: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customer'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customer: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customer: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customer'
                  >
              >
            >
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
*/

      customerNeeds:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerNeeds<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeeds: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeeds: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeeds'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeeds: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeeds: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeeds'
                  >
              >
            >
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
*/

      customerNeed:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customerNeed<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeed: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeed: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeed'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customerNeed: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customerNeed: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeed'
                  >
              >
            >
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
*/

      issueTitleSuggestionFromCustomerRequest:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.issueTitleSuggestionFromCustomerRequest<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ issueTitleSuggestionFromCustomerRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueTitleSuggestionFromCustomerRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueTitleSuggestionFromCustomerRequest'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ issueTitleSuggestionFromCustomerRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ issueTitleSuggestionFromCustomerRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueTitleSuggestionFromCustomerRequest'
                  >
              >
            >
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
*/

      customViews:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customViews<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customViews: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViews: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViews'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customViews: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViews: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViews'
                  >
              >
            >
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
*/

      customView:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customView<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customView: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customView: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customView'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customView: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customView: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customView'
                  >
              >
            >
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
*/

      customViewDetailsSuggestion:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customViewDetailsSuggestion<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewDetailsSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewDetailsSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViewDetailsSuggestion'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewDetailsSuggestion: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewDetailsSuggestion: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViewDetailsSuggestion'
                  >
              >
            >
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
*/

      customViewHasSubscribers:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.customViewHasSubscribers<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewHasSubscribers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewHasSubscribers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViewHasSubscribers'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ customViewHasSubscribers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ customViewHasSubscribers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViewHasSubscribers'
                  >
              >
            >
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
*/

      comments:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.comments<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ comments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ comments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'comments'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ comments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ comments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'comments'
                  >
              >
            >
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
*/

      comment:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.comment<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ comment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ comment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'comment'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ comment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ comment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'comment'
                  >
              >
            >
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
*/

      availableUsers:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.availableUsers<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ availableUsers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ availableUsers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'availableUsers'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ availableUsers: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ availableUsers: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'availableUsers'
                  >
              >
            >
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
*/

      authenticationSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.authenticationSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ authenticationSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ authenticationSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'authenticationSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ authenticationSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ authenticationSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'authenticationSessions'
                  >
              >
            >
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
*/

      ssoUrlFromEmail:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.ssoUrlFromEmail<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ ssoUrlFromEmail: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ ssoUrlFromEmail: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'ssoUrlFromEmail'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ ssoUrlFromEmail: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ ssoUrlFromEmail: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'ssoUrlFromEmail'
                  >
              >
            >
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
*/

      auditEntryTypes:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.auditEntryTypes<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntryTypes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntryTypes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'auditEntryTypes'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntryTypes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntryTypes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'auditEntryTypes'
                  >
              >
            >
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
*/

      auditEntries:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.auditEntries<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntries: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntries: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'auditEntries'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ auditEntries: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ auditEntries: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'auditEntries'
                  >
              >
            >
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
*/

      attachments:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.attachments<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ attachments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachments'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ attachments: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachments: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachments'
                  >
              >
            >
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
*/

      attachment:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.attachment<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ attachment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachment'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ attachment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachment'
                  >
              >
            >
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
*/

      attachmentsForURL:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.attachmentsForURL<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentsForURL: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentsForURL: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentsForURL'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentsForURL: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentsForURL: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentsForURL'
                  >
              >
            >
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
*/

      attachmentIssue:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.attachmentIssue<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentIssue'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentIssue'
                  >
              >
            >
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
*/

      attachmentSources:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.attachmentSources<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentSources: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentSources: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentSources'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ attachmentSources: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ attachmentSources: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentSources'
                  >
              >
            >
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
*/

      asksWebSetting:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.asksWebSetting<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ asksWebSetting: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ asksWebSetting: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'asksWebSetting'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ asksWebSetting: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ asksWebSetting: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'asksWebSetting'
                  >
              >
            >
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
*/

      applicationInfo:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.applicationInfo<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ applicationInfo: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ applicationInfo: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'applicationInfo'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ applicationInfo: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ applicationInfo: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'applicationInfo'
                  >
              >
            >
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
*/

      agentSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.agentSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessions'
                  >
              >
            >
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
*/

      agentSession:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.agentSession<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSession'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ agentSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSession'
                  >
              >
            >
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
*/

      agentActivities:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.agentActivities<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivities: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivities: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentActivities'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivities: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivities: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentActivities'
                  >
              >
            >
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
*/

      agentActivity:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Query.agentActivity<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivity: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivity: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentActivity'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromQuery<{ agentActivity: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationQuery<{ agentActivity: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentActivity'
                  >
              >
            >
        >

    }


/**
* GraphQL {@link https://graphql.org/learn/schema/#the-mutation-and-mutation-types | Mutation} root methods.
*
* All methods return Promises. Use `.mutation.$batch(...)` to select multiple fields at once.
*/
export interface MutationMethods<$Context extends $$Utilities.Context> {
/**
  * Select multiple Mutation fields at once.
  *
  * Pass a selection set object that includes the fields you want.
  * Use this method to request multiple fields in a single request for better performance.
  */

      $batch:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<$$Utilities.AssertExtendsObject<$SelectionSet>, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutput<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<$$Utilities.AssertExtendsObject<$SelectionSet>, $$Schema.Schema<$Context['scalars']>>
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<$$Utilities.AssertExtendsObject<$SelectionSet>, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutput<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<$$Utilities.AssertExtendsObject<$SelectionSet>, $$Schema.Schema<$Context['scalars']>>
                  >
              >
            >
        >

/**
  * Request the {@link https://graphql.org/learn/schema/#the-__typename-field | __typename} meta-field.
  *
  * The `__typename` field returns the name of the object type. In this case, it will always return `"Mutation"`.
  */

      __typename:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          () =>
            Promise<
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  { __typename: 'Mutation' },
                  '__typename'
                >
            >
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
*/

      workflowStateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.workflowStateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'workflowStateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'workflowStateCreate'
                  >
              >
            >
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
*/

      workflowStateUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.workflowStateUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'workflowStateUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'workflowStateUpdate'
                  >
              >
            >
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
*/

      workflowStateArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.workflowStateArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'workflowStateArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ workflowStateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ workflowStateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'workflowStateArchive'
                  >
              >
            >
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
*/

      webhookCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.webhookCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhookCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhookCreate'
                  >
              >
            >
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
*/

      webhookUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.webhookUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhookUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhookUpdate'
                  >
              >
            >
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
*/

      webhookDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.webhookDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhookDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhookDelete'
                  >
              >
            >
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
*/

      webhookRotateSecret:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.webhookRotateSecret<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookRotateSecret: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookRotateSecret: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'webhookRotateSecret'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ webhookRotateSecret: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ webhookRotateSecret: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'webhookRotateSecret'
                  >
              >
            >
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
*/

      viewPreferencesCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.viewPreferencesCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'viewPreferencesCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'viewPreferencesCreate'
                  >
              >
            >
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
*/

      viewPreferencesUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.viewPreferencesUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'viewPreferencesUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'viewPreferencesUpdate'
                  >
              >
            >
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
*/

      viewPreferencesDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.viewPreferencesDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'viewPreferencesDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ viewPreferencesDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ viewPreferencesDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'viewPreferencesDelete'
                  >
              >
            >
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
*/

      userSettingsUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userSettingsUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userSettingsUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userSettingsUpdate'
                  >
              >
            >
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
*/

      userSettingsFlagsReset:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userSettingsFlagsReset<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsFlagsReset: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsFlagsReset: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userSettingsFlagsReset'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userSettingsFlagsReset: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSettingsFlagsReset: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userSettingsFlagsReset'
                  >
              >
            >
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
*/

      userFlagUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userFlagUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userFlagUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userFlagUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userFlagUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userFlagUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userFlagUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userFlagUpdate'
                  >
              >
            >
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
*/

      notificationCategoryChannelSubscriptionUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationCategoryChannelSubscriptionUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationCategoryChannelSubscriptionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationCategoryChannelSubscriptionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationCategoryChannelSubscriptionUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationCategoryChannelSubscriptionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationCategoryChannelSubscriptionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationCategoryChannelSubscriptionUpdate'
                  >
              >
            >
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
*/

      userUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userUpdate'
                  >
              >
            >
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
*/

      userDiscordConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userDiscordConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userDiscordConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDiscordConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userDiscordConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userDiscordConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDiscordConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userDiscordConnect'
                  >
              >
            >
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
*/

      userExternalUserDisconnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userExternalUserDisconnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userExternalUserDisconnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userExternalUserDisconnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userExternalUserDisconnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userExternalUserDisconnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userExternalUserDisconnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userExternalUserDisconnect'
                  >
              >
            >
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
*/

      userChangeRole:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userChangeRole<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userChangeRole: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userChangeRole: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userChangeRole'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userChangeRole: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userChangeRole: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userChangeRole'
                  >
              >
            >
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
*/

      userPromoteAdmin:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userPromoteAdmin<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteAdmin: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteAdmin: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userPromoteAdmin'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteAdmin: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteAdmin: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userPromoteAdmin'
                  >
              >
            >
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
*/

      userDemoteAdmin:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userDemoteAdmin<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteAdmin: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteAdmin: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userDemoteAdmin'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteAdmin: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteAdmin: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userDemoteAdmin'
                  >
              >
            >
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
*/

      userPromoteMember:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userPromoteMember<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteMember: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteMember: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userPromoteMember'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userPromoteMember: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userPromoteMember: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userPromoteMember'
                  >
              >
            >
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
*/

      userDemoteMember:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userDemoteMember<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteMember: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteMember: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userDemoteMember'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userDemoteMember: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userDemoteMember: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userDemoteMember'
                  >
              >
            >
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
*/

      userSuspend:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userSuspend<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userSuspend: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSuspend: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userSuspend'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userSuspend: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userSuspend: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userSuspend'
                  >
              >
            >
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
*/

      userRevokeAllSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userRevokeAllSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeAllSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeAllSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userRevokeAllSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeAllSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeAllSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userRevokeAllSessions'
                  >
              >
            >
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
*/

      userRevokeSession:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userRevokeSession<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userRevokeSession'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userRevokeSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userRevokeSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userRevokeSession'
                  >
              >
            >
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
*/

      userUnsuspend:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userUnsuspend<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnsuspend: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnsuspend: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userUnsuspend'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnsuspend: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnsuspend: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userUnsuspend'
                  >
              >
            >
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
*/

      userUnlinkFromIdentityProvider:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.userUnlinkFromIdentityProvider<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnlinkFromIdentityProvider: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnlinkFromIdentityProvider: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'userUnlinkFromIdentityProvider'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ userUnlinkFromIdentityProvider: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ userUnlinkFromIdentityProvider: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'userUnlinkFromIdentityProvider'
                  >
              >
            >
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
*/

      triageResponsibilityCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.triageResponsibilityCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'triageResponsibilityCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'triageResponsibilityCreate'
                  >
              >
            >
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
*/

      triageResponsibilityUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.triageResponsibilityUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'triageResponsibilityUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'triageResponsibilityUpdate'
                  >
              >
            >
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
*/

      triageResponsibilityDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.triageResponsibilityDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'triageResponsibilityDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ triageResponsibilityDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ triageResponsibilityDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'triageResponsibilityDelete'
                  >
              >
            >
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
*/

      timeScheduleCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.timeScheduleCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeScheduleCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeScheduleCreate'
                  >
              >
            >
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
*/

      timeScheduleUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.timeScheduleUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeScheduleUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeScheduleUpdate'
                  >
              >
            >
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
*/

      timeScheduleUpsertExternal:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.timeScheduleUpsertExternal<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpsertExternal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpsertExternal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeScheduleUpsertExternal'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleUpsertExternal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleUpsertExternal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeScheduleUpsertExternal'
                  >
              >
            >
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
*/

      timeScheduleDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.timeScheduleDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeScheduleDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeScheduleDelete'
                  >
              >
            >
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
*/

      timeScheduleRefreshIntegrationSchedule:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.timeScheduleRefreshIntegrationSchedule<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleRefreshIntegrationSchedule: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleRefreshIntegrationSchedule: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'timeScheduleRefreshIntegrationSchedule'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ timeScheduleRefreshIntegrationSchedule: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ timeScheduleRefreshIntegrationSchedule: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'timeScheduleRefreshIntegrationSchedule'
                  >
              >
            >
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
*/

      templateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.templateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ templateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'templateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ templateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'templateCreate'
                  >
              >
            >
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
*/

      templateUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.templateUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ templateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'templateUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ templateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'templateUpdate'
                  >
              >
            >
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
*/

      templateDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.templateDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ templateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'templateDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ templateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ templateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'templateDelete'
                  >
              >
            >
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
*/

      projectCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectCreate'
                  >
              >
            >
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
*/

      projectUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdate'
                  >
              >
            >
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
*/

      projectReassignStatus:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectReassignStatus<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectReassignStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectReassignStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectReassignStatus'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectReassignStatus: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectReassignStatus: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectReassignStatus'
                  >
              >
            >
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
*/

      projectDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectDelete'
                  >
              >
            >
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
*/

      projectArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectArchive'
                  >
              >
            >
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
*/

      projectUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUnarchive'
                  >
              >
            >
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
*/

      projectAddLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectAddLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectAddLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectAddLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectAddLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectAddLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectAddLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectAddLabel'
                  >
              >
            >
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
*/

      projectRemoveLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectRemoveLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRemoveLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRemoveLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRemoveLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRemoveLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRemoveLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRemoveLabel'
                  >
              >
            >
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
*/

      projectExternalSyncDisable:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectExternalSyncDisable<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectExternalSyncDisable: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectExternalSyncDisable: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectExternalSyncDisable'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectExternalSyncDisable: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectExternalSyncDisable: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectExternalSyncDisable'
                  >
              >
            >
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
*/

      teamCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamCreate'
                  >
              >
            >
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
*/

      teamUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamUpdate'
                  >
              >
            >
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
*/

      teamDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamDelete'
                  >
              >
            >
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
*/

      teamUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamUnarchive'
                  >
              >
            >
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
*/

      teamCyclesDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamCyclesDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCyclesDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCyclesDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamCyclesDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamCyclesDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamCyclesDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamCyclesDelete'
                  >
              >
            >
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
*/

      teamMembershipCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamMembershipCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamMembershipCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamMembershipCreate'
                  >
              >
            >
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
*/

      teamMembershipUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamMembershipUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamMembershipUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamMembershipUpdate'
                  >
              >
            >
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
*/

      teamMembershipDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamMembershipDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamMembershipDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamMembershipDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamMembershipDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamMembershipDelete'
                  >
              >
            >
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
*/

      teamKeyDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.teamKeyDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ teamKeyDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamKeyDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'teamKeyDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ teamKeyDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ teamKeyDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'teamKeyDelete'
                  >
              >
            >
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
*/

      roadmapToProjectCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapToProjectCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapToProjectCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapToProjectCreate'
                  >
              >
            >
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
*/

      roadmapToProjectUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapToProjectUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapToProjectUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapToProjectUpdate'
                  >
              >
            >
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
*/

      roadmapToProjectDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapToProjectDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapToProjectDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapToProjectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapToProjectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapToProjectDelete'
                  >
              >
            >
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
*/

      roadmapCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapCreate'
                  >
              >
            >
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
*/

      roadmapUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapUpdate'
                  >
              >
            >
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
*/

      roadmapArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapArchive'
                  >
              >
            >
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
*/

      roadmapUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapUnarchive'
                  >
              >
            >
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
*/

      roadmapDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.roadmapDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'roadmapDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ roadmapDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ roadmapDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'roadmapDelete'
                  >
              >
            >
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
*/

      createCsvExportReport:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.createCsvExportReport<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ createCsvExportReport: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ createCsvExportReport: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'createCsvExportReport'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ createCsvExportReport: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ createCsvExportReport: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'createCsvExportReport'
                  >
              >
            >
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
*/

      releaseStageCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseStageCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStageCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStageCreate'
                  >
              >
            >
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
*/

      releaseStageUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseStageUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStageUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStageUpdate'
                  >
              >
            >
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
*/

      releaseStageArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseStageArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStageArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStageArchive'
                  >
              >
            >
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
*/

      releaseStageUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseStageUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseStageUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseStageUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseStageUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseStageUnarchive'
                  >
              >
            >
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
*/

      releaseSync:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseSync<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseSync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseSync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseSync'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseSync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseSync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseSync'
                  >
              >
            >
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
*/

      releaseCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseCreate'
                  >
              >
            >
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
*/

      releaseUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseUpdate'
                  >
              >
            >
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
*/

      releaseComplete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseComplete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseComplete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseComplete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseComplete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseComplete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseComplete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseComplete'
                  >
              >
            >
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
*/

      releaseUpdateByPipeline:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseUpdateByPipeline<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdateByPipeline: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdateByPipeline: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseUpdateByPipeline'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUpdateByPipeline: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUpdateByPipeline: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseUpdateByPipeline'
                  >
              >
            >
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
*/

      releaseDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseDelete'
                  >
              >
            >
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
*/

      releaseArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseArchive'
                  >
              >
            >
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
*/

      releaseUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releaseUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releaseUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releaseUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releaseUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releaseUnarchive'
                  >
              >
            >
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
*/

      releasePipelineCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releasePipelineCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelineCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelineCreate'
                  >
              >
            >
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
*/

      releasePipelineUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releasePipelineUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelineUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelineUpdate'
                  >
              >
            >
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
*/

      releasePipelineArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releasePipelineArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelineArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelineArchive'
                  >
              >
            >
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
*/

      releasePipelineUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releasePipelineUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelineUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelineUnarchive'
                  >
              >
            >
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
*/

      releasePipelineDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.releasePipelineDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'releasePipelineDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ releasePipelineDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ releasePipelineDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'releasePipelineDelete'
                  >
              >
            >
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
*/

      reactionCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.reactionCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'reactionCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'reactionCreate'
                  >
              >
            >
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
*/

      reactionDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.reactionDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'reactionDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ reactionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ reactionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'reactionDelete'
                  >
              >
            >
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
*/

      pushSubscriptionCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.pushSubscriptionCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'pushSubscriptionCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'pushSubscriptionCreate'
                  >
              >
            >
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
*/

      pushSubscriptionDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.pushSubscriptionDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'pushSubscriptionDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ pushSubscriptionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ pushSubscriptionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'pushSubscriptionDelete'
                  >
              >
            >
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
*/

      projectUpdateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdateCreate'
                  >
              >
            >
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
*/

      projectUpdateUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdateUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdateUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdateUpdate'
                  >
              >
            >
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
*/

      projectUpdateArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdateArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdateArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdateArchive'
                  >
              >
            >
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
*/

      projectUpdateUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdateUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdateUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdateUnarchive'
                  >
              >
            >
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
*/

      projectUpdateDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectUpdateDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectUpdateDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectUpdateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectUpdateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectUpdateDelete'
                  >
              >
            >
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
*/

      createProjectUpdateReminder:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.createProjectUpdateReminder<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ createProjectUpdateReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ createProjectUpdateReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'createProjectUpdateReminder'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ createProjectUpdateReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ createProjectUpdateReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'createProjectUpdateReminder'
                  >
              >
            >
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
*/

      projectStatusCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectStatusCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatusCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatusCreate'
                  >
              >
            >
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
*/

      projectStatusUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectStatusUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatusUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatusUpdate'
                  >
              >
            >
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
*/

      projectStatusArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectStatusArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatusArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatusArchive'
                  >
              >
            >
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
*/

      projectStatusUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectStatusUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectStatusUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectStatusUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectStatusUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectStatusUnarchive'
                  >
              >
            >
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
*/

      projectRelationCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectRelationCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRelationCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRelationCreate'
                  >
              >
            >
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
*/

      projectRelationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectRelationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRelationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRelationUpdate'
                  >
              >
            >
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
*/

      projectRelationDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectRelationDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectRelationDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectRelationDelete'
                  >
              >
            >
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
*/

      projectMilestoneCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectMilestoneCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestoneCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestoneCreate'
                  >
              >
            >
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
*/

      projectMilestoneUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectMilestoneUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestoneUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestoneUpdate'
                  >
              >
            >
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
*/

      projectMilestoneDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectMilestoneDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestoneDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestoneDelete'
                  >
              >
            >
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
*/

      projectMilestoneMove:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectMilestoneMove<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneMove: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneMove: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectMilestoneMove'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectMilestoneMove: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectMilestoneMove: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectMilestoneMove'
                  >
              >
            >
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
*/

      projectLabelCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectLabelCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabelCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabelCreate'
                  >
              >
            >
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
*/

      projectLabelUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectLabelUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabelUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabelUpdate'
                  >
              >
            >
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
*/

      projectLabelDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectLabelDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabelDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabelDelete'
                  >
              >
            >
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
*/

      projectLabelRetire:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectLabelRetire<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRetire: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRetire: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabelRetire'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRetire: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRetire: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabelRetire'
                  >
              >
            >
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
*/

      projectLabelRestore:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.projectLabelRestore<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRestore: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRestore: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'projectLabelRestore'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ projectLabelRestore: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ projectLabelRestore: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'projectLabelRestore'
                  >
              >
            >
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
*/

      organizationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationUpdate'
                  >
              >
            >
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
*/

      organizationDeleteChallenge:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDeleteChallenge<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDeleteChallenge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDeleteChallenge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDeleteChallenge'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDeleteChallenge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDeleteChallenge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDeleteChallenge'
                  >
              >
            >
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
*/

      organizationDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDelete'
                  >
              >
            >
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
*/

      organizationCancelDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationCancelDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationCancelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationCancelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationCancelDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationCancelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationCancelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationCancelDelete'
                  >
              >
            >
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
*/

      organizationStartTrialForPlan:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationStartTrialForPlan<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrialForPlan: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrialForPlan: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationStartTrialForPlan'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrialForPlan: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrialForPlan: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationStartTrialForPlan'
                  >
              >
            >
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
*/

      organizationStartTrial:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationStartTrial<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrial: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrial: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationStartTrial'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationStartTrial: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationStartTrial: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationStartTrial'
                  >
              >
            >
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
*/

      organizationInviteCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationInviteCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInviteCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInviteCreate'
                  >
              >
            >
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
*/

      organizationInviteUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationInviteUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInviteUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInviteUpdate'
                  >
              >
            >
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
*/

      resendOrganizationInvite:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.resendOrganizationInvite<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInvite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInvite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'resendOrganizationInvite'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInvite: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInvite: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'resendOrganizationInvite'
                  >
              >
            >
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
*/

      resendOrganizationInviteByEmail:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.resendOrganizationInviteByEmail<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInviteByEmail: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInviteByEmail: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'resendOrganizationInviteByEmail'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ resendOrganizationInviteByEmail: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ resendOrganizationInviteByEmail: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'resendOrganizationInviteByEmail'
                  >
              >
            >
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
*/

      organizationInviteDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationInviteDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationInviteDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationInviteDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationInviteDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationInviteDelete'
                  >
              >
            >
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
*/

      organizationDomainClaim:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDomainClaim<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainClaim: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainClaim: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainClaim'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainClaim: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainClaim: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainClaim'
                  >
              >
            >
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
*/

      organizationDomainVerify:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDomainVerify<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainVerify: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainVerify: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainVerify'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainVerify: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainVerify: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainVerify'
                  >
              >
            >
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
*/

      organizationDomainCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDomainCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainCreate'
                  >
              >
            >
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
*/

      organizationDomainUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDomainUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainUpdate'
                  >
              >
            >
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
*/

      organizationDomainDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.organizationDomainDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'organizationDomainDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ organizationDomainDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ organizationDomainDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'organizationDomainDelete'
                  >
              >
            >
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
*/

      notificationSubscriptionCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationSubscriptionCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSubscriptionCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSubscriptionCreate'
                  >
              >
            >
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
*/

      notificationSubscriptionUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationSubscriptionUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSubscriptionUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSubscriptionUpdate'
                  >
              >
            >
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
*/

      notificationSubscriptionDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationSubscriptionDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSubscriptionDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSubscriptionDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSubscriptionDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSubscriptionDelete'
                  >
              >
            >
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
*/

      notificationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationUpdate'
                  >
              >
            >
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
*/

      notificationMarkReadAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationMarkReadAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkReadAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkReadAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationMarkReadAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkReadAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkReadAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationMarkReadAll'
                  >
              >
            >
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
*/

      notificationMarkUnreadAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationMarkUnreadAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkUnreadAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkUnreadAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationMarkUnreadAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationMarkUnreadAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationMarkUnreadAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationMarkUnreadAll'
                  >
              >
            >
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
*/

      notificationSnoozeAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationSnoozeAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSnoozeAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSnoozeAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationSnoozeAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationSnoozeAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationSnoozeAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationSnoozeAll'
                  >
              >
            >
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
*/

      notificationUnsnoozeAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationUnsnoozeAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnsnoozeAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnsnoozeAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationUnsnoozeAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnsnoozeAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnsnoozeAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationUnsnoozeAll'
                  >
              >
            >
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
*/

      notificationArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationArchive'
                  >
              >
            >
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
*/

      notificationArchiveAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationArchiveAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchiveAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchiveAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationArchiveAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationArchiveAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationArchiveAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationArchiveAll'
                  >
              >
            >
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
*/

      notificationUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.notificationUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'notificationUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ notificationUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ notificationUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'notificationUnarchive'
                  >
              >
            >
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
*/

      issueToReleaseCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueToReleaseCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueToReleaseCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueToReleaseCreate'
                  >
              >
            >
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
*/

      issueToReleaseDeleteByIssueAndRelease:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueToReleaseDeleteByIssueAndRelease<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDeleteByIssueAndRelease: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDeleteByIssueAndRelease: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueToReleaseDeleteByIssueAndRelease'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDeleteByIssueAndRelease: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDeleteByIssueAndRelease: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueToReleaseDeleteByIssueAndRelease'
                  >
              >
            >
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
*/

      issueToReleaseDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueToReleaseDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueToReleaseDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueToReleaseDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueToReleaseDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueToReleaseDelete'
                  >
              >
            >
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
*/

      issueCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueCreate'
                  >
              >
            >
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
*/

      issueBatchCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueBatchCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueBatchCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueBatchCreate'
                  >
              >
            >
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
*/

      issueUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueUpdate'
                  >
              >
            >
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
*/

      issueBatchUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueBatchUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueBatchUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueBatchUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueBatchUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueBatchUpdate'
                  >
              >
            >
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
*/

      issueArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueArchive'
                  >
              >
            >
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
*/

      issueUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueUnarchive'
                  >
              >
            >
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
*/

      issueDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueDelete'
                  >
              >
            >
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
*/

      issueAddLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueAddLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueAddLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueAddLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueAddLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueAddLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueAddLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueAddLabel'
                  >
              >
            >
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
*/

      issueRemoveLabel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueRemoveLabel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRemoveLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRemoveLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRemoveLabel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRemoveLabel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRemoveLabel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRemoveLabel'
                  >
              >
            >
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
*/

      issueReminder:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueReminder<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueReminder'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueReminder'
                  >
              >
            >
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
*/

      issueSubscribe:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueSubscribe<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueSubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueSubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueSubscribe'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueSubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueSubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueSubscribe'
                  >
              >
            >
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
*/

      issueUnsubscribe:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueUnsubscribe<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnsubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnsubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueUnsubscribe'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueUnsubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueUnsubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueUnsubscribe'
                  >
              >
            >
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
*/

      issueDescriptionUpdateFromFront:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueDescriptionUpdateFromFront<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDescriptionUpdateFromFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDescriptionUpdateFromFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueDescriptionUpdateFromFront'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueDescriptionUpdateFromFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueDescriptionUpdateFromFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueDescriptionUpdateFromFront'
                  >
              >
            >
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
*/

      issueExternalSyncDisable:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueExternalSyncDisable<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueExternalSyncDisable: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueExternalSyncDisable: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueExternalSyncDisable'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueExternalSyncDisable: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueExternalSyncDisable: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueExternalSyncDisable'
                  >
              >
            >
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
*/

      issueRelationCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueRelationCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRelationCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRelationCreate'
                  >
              >
            >
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
*/

      issueRelationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueRelationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRelationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRelationUpdate'
                  >
              >
            >
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
*/

      issueRelationDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueRelationDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueRelationDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueRelationDelete'
                  >
              >
            >
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
*/

      issueLabelCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueLabelCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabelCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabelCreate'
                  >
              >
            >
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
*/

      issueLabelUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueLabelUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabelUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabelUpdate'
                  >
              >
            >
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
*/

      issueLabelDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueLabelDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabelDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabelDelete'
                  >
              >
            >
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
*/

      issueLabelRetire:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueLabelRetire<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRetire: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRetire: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabelRetire'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRetire: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRetire: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabelRetire'
                  >
              >
            >
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
*/

      issueLabelRestore:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueLabelRestore<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRestore: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRestore: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueLabelRestore'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueLabelRestore: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueLabelRestore: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueLabelRestore'
                  >
              >
            >
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
*/

      issueImportCreateGithub:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateGithub<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateGithub: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateGithub: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateGithub'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateGithub: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateGithub: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateGithub'
                  >
              >
            >
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
*/

      issueImportCreateJira:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateJira<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateJira: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateJira: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateJira'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateJira: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateJira: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateJira'
                  >
              >
            >
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
*/

      issueImportCreateCSVJira:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateCSVJira<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateCSVJira: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateCSVJira: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateCSVJira'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateCSVJira: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateCSVJira: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateCSVJira'
                  >
              >
            >
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
*/

      issueImportCreateClubhouse:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateClubhouse<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateClubhouse: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateClubhouse: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateClubhouse'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateClubhouse: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateClubhouse: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateClubhouse'
                  >
              >
            >
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
*/

      issueImportCreateAsana:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateAsana<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateAsana: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateAsana: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateAsana'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateAsana: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateAsana: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateAsana'
                  >
              >
            >
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
*/

      issueImportCreateLinearV2:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportCreateLinearV2<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateLinearV2: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateLinearV2: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportCreateLinearV2'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportCreateLinearV2: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportCreateLinearV2: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportCreateLinearV2'
                  >
              >
            >
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
*/

      issueImportDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportDelete'
                  >
              >
            >
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
*/

      issueImportProcess:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportProcess<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportProcess: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportProcess: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportProcess'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportProcess: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportProcess: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportProcess'
                  >
              >
            >
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
*/

      issueImportUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.issueImportUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'issueImportUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ issueImportUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ issueImportUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'issueImportUpdate'
                  >
              >
            >
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
*/

      integrationsSettingsCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationsSettingsCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationsSettingsCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationsSettingsCreate'
                  >
              >
            >
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
*/

      integrationsSettingsUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationsSettingsUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationsSettingsUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationsSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationsSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationsSettingsUpdate'
                  >
              >
            >
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
*/

      integrationTemplateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationTemplateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationTemplateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationTemplateCreate'
                  >
              >
            >
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
*/

      integrationTemplateDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationTemplateDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationTemplateDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationTemplateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationTemplateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationTemplateDelete'
                  >
              >
            >
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
*/

      integrationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationUpdate'
                  >
              >
            >
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
*/

      integrationSettingsUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSettingsUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSettingsUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSettingsUpdate'
                  >
              >
            >
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
*/

      integrationGithubCommitCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGithubCommitCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubCommitCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubCommitCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGithubCommitCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubCommitCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubCommitCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGithubCommitCreate'
                  >
              >
            >
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
*/

      integrationGithubConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGithubConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGithubConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGithubConnect'
                  >
              >
            >
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
*/

      integrationGithubImportConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGithubImportConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGithubImportConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGithubImportConnect'
                  >
              >
            >
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
*/

      integrationGithubImportRefresh:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGithubImportRefresh<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGithubImportRefresh'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGithubImportRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGithubImportRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGithubImportRefresh'
                  >
              >
            >
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
*/

      integrationGitHubEnterpriseServerConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGitHubEnterpriseServerConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubEnterpriseServerConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubEnterpriseServerConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGitHubEnterpriseServerConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubEnterpriseServerConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubEnterpriseServerConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGitHubEnterpriseServerConnect'
                  >
              >
            >
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
*/

      integrationGitlabConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGitlabConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGitlabConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGitlabConnect'
                  >
              >
            >
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
*/

      integrationGitlabTestConnection:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGitlabTestConnection<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabTestConnection: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabTestConnection: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGitlabTestConnection'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitlabTestConnection: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitlabTestConnection: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGitlabTestConnection'
                  >
              >
            >
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
*/

      airbyteIntegrationConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.airbyteIntegrationConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ airbyteIntegrationConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ airbyteIntegrationConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'airbyteIntegrationConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ airbyteIntegrationConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ airbyteIntegrationConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'airbyteIntegrationConnect'
                  >
              >
            >
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
*/

      integrationGoogleCalendarPersonalConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGoogleCalendarPersonalConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleCalendarPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleCalendarPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGoogleCalendarPersonalConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleCalendarPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleCalendarPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGoogleCalendarPersonalConnect'
                  >
              >
            >
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
*/

      integrationLaunchDarklyConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationLaunchDarklyConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationLaunchDarklyConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationLaunchDarklyConnect'
                  >
              >
            >
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
*/

      integrationLaunchDarklyPersonalConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationLaunchDarklyPersonalConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationLaunchDarklyPersonalConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLaunchDarklyPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLaunchDarklyPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationLaunchDarklyPersonalConnect'
                  >
              >
            >
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
*/

      jiraIntegrationConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.jiraIntegrationConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ jiraIntegrationConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ jiraIntegrationConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'jiraIntegrationConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ jiraIntegrationConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ jiraIntegrationConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'jiraIntegrationConnect'
                  >
              >
            >
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
*/

      integrationJiraUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationJiraUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationJiraUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationJiraUpdate'
                  >
              >
            >
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
*/

      integrationJiraPersonal:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationJiraPersonal<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationJiraPersonal'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationJiraPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationJiraPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationJiraPersonal'
                  >
              >
            >
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
*/

      integrationGitHubPersonal:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGitHubPersonal<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGitHubPersonal'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGitHubPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGitHubPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGitHubPersonal'
                  >
              >
            >
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
*/

      integrationIntercom:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationIntercom<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationIntercom'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationIntercom'
                  >
              >
            >
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
*/

      integrationIntercomDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationIntercomDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationIntercomDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationIntercomDelete'
                  >
              >
            >
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
*/

      integrationCustomerDataAttributesRefresh:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationCustomerDataAttributesRefresh<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationCustomerDataAttributesRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationCustomerDataAttributesRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationCustomerDataAttributesRefresh'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationCustomerDataAttributesRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationCustomerDataAttributesRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationCustomerDataAttributesRefresh'
                  >
              >
            >
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
*/

      integrationIntercomSettingsUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationIntercomSettingsUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationIntercomSettingsUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationIntercomSettingsUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationIntercomSettingsUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationIntercomSettingsUpdate'
                  >
              >
            >
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
*/

      integrationDiscord:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationDiscord<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDiscord: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDiscord: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationDiscord'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDiscord: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDiscord: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationDiscord'
                  >
              >
            >
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
*/

      integrationOpsgenieConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationOpsgenieConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationOpsgenieConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationOpsgenieConnect'
                  >
              >
            >
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
*/

      integrationOpsgenieRefreshScheduleMappings:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationOpsgenieRefreshScheduleMappings<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieRefreshScheduleMappings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieRefreshScheduleMappings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationOpsgenieRefreshScheduleMappings'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationOpsgenieRefreshScheduleMappings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationOpsgenieRefreshScheduleMappings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationOpsgenieRefreshScheduleMappings'
                  >
              >
            >
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
*/

      integrationPagerDutyConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationPagerDutyConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationPagerDutyConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationPagerDutyConnect'
                  >
              >
            >
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
*/

      integrationPagerDutyRefreshScheduleMappings:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationPagerDutyRefreshScheduleMappings<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyRefreshScheduleMappings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyRefreshScheduleMappings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationPagerDutyRefreshScheduleMappings'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationPagerDutyRefreshScheduleMappings: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationPagerDutyRefreshScheduleMappings: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationPagerDutyRefreshScheduleMappings'
                  >
              >
            >
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
*/

      updateIntegrationSlackScopes:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.updateIntegrationSlackScopes<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ updateIntegrationSlackScopes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ updateIntegrationSlackScopes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'updateIntegrationSlackScopes'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ updateIntegrationSlackScopes: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ updateIntegrationSlackScopes: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'updateIntegrationSlackScopes'
                  >
              >
            >
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
*/

      integrationSlack:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlack<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlack'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlack'
                  >
              >
            >
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
*/

      integrationSlackAsks:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackAsks<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackAsks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackAsks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackAsks'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackAsks: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackAsks: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackAsks'
                  >
              >
            >
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
*/

      integrationSlackOrAsksUpdateSlackTeamName:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackOrAsksUpdateSlackTeamName<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrAsksUpdateSlackTeamName: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrAsksUpdateSlackTeamName: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackOrAsksUpdateSlackTeamName'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrAsksUpdateSlackTeamName: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrAsksUpdateSlackTeamName: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackOrAsksUpdateSlackTeamName'
                  >
              >
            >
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
*/

      integrationSlackPersonal:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackPersonal<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackPersonal'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPersonal: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPersonal: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackPersonal'
                  >
              >
            >
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
*/

      integrationAsksConnectChannel:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationAsksConnectChannel<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationAsksConnectChannel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationAsksConnectChannel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationAsksConnectChannel'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationAsksConnectChannel: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationAsksConnectChannel: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationAsksConnectChannel'
                  >
              >
            >
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
*/

      integrationSlackPost:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackPost<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackPost'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackPost'
                  >
              >
            >
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
*/

      integrationSlackProjectPost:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackProjectPost<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackProjectPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackProjectPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackProjectPost'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackProjectPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackProjectPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackProjectPost'
                  >
              >
            >
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
*/

      integrationSlackInitiativePost:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackInitiativePost<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackInitiativePost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackInitiativePost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackInitiativePost'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackInitiativePost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackInitiativePost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackInitiativePost'
                  >
              >
            >
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
*/

      integrationSlackCustomViewNotifications:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackCustomViewNotifications<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomViewNotifications: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomViewNotifications: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackCustomViewNotifications'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomViewNotifications: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomViewNotifications: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackCustomViewNotifications'
                  >
              >
            >
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
*/

      integrationSlackCustomerChannelLink:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackCustomerChannelLink<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomerChannelLink: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomerChannelLink: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackCustomerChannelLink'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackCustomerChannelLink: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackCustomerChannelLink: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackCustomerChannelLink'
                  >
              >
            >
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
*/

      integrationSlackOrgProjectUpdatesPost:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackOrgProjectUpdatesPost<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgProjectUpdatesPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgProjectUpdatesPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackOrgProjectUpdatesPost'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgProjectUpdatesPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgProjectUpdatesPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackOrgProjectUpdatesPost'
                  >
              >
            >
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
*/

      integrationSlackOrgInitiativeUpdatesPost:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackOrgInitiativeUpdatesPost<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgInitiativeUpdatesPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgInitiativeUpdatesPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackOrgInitiativeUpdatesPost'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackOrgInitiativeUpdatesPost: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackOrgInitiativeUpdatesPost: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackOrgInitiativeUpdatesPost'
                  >
              >
            >
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
*/

      integrationSlackImportEmojis:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackImportEmojis<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackImportEmojis: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackImportEmojis: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackImportEmojis'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackImportEmojis: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackImportEmojis: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackImportEmojis'
                  >
              >
            >
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
*/

      integrationFigma:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationFigma<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFigma: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFigma: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationFigma'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFigma: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFigma: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationFigma'
                  >
              >
            >
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
*/

      integrationGong:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGong<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGong: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGong: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGong'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGong: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGong: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGong'
                  >
              >
            >
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
*/

      integrationGoogleSheets:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationGoogleSheets<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleSheets: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleSheets: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationGoogleSheets'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationGoogleSheets: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationGoogleSheets: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationGoogleSheets'
                  >
              >
            >
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
*/

      refreshGoogleSheetsData:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.refreshGoogleSheetsData<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ refreshGoogleSheetsData: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ refreshGoogleSheetsData: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'refreshGoogleSheetsData'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ refreshGoogleSheetsData: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ refreshGoogleSheetsData: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'refreshGoogleSheetsData'
                  >
              >
            >
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
*/

      integrationSentryConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSentryConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSentryConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSentryConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSentryConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSentryConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSentryConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSentryConnect'
                  >
              >
            >
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
*/

      integrationFront:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationFront<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationFront'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationFront'
                  >
              >
            >
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
*/

      integrationZendesk:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationZendesk<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationZendesk: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationZendesk: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationZendesk'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationZendesk: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationZendesk: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationZendesk'
                  >
              >
            >
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
*/

      integrationLoom:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationLoom<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLoom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLoom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationLoom'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationLoom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationLoom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationLoom'
                  >
              >
            >
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
*/

      integrationSalesforce:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSalesforce<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforce: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforce: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSalesforce'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforce: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforce: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSalesforce'
                  >
              >
            >
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
*/

      integrationSalesforceMetadataRefresh:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSalesforceMetadataRefresh<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforceMetadataRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforceMetadataRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSalesforceMetadataRefresh'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSalesforceMetadataRefresh: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSalesforceMetadataRefresh: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSalesforceMetadataRefresh'
                  >
              >
            >
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
*/

      integrationMcpServerPersonalConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationMcpServerPersonalConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationMcpServerPersonalConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerPersonalConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerPersonalConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationMcpServerPersonalConnect'
                  >
              >
            >
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
*/

      integrationMcpServerConnect:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationMcpServerConnect<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationMcpServerConnect'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationMcpServerConnect: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationMcpServerConnect: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationMcpServerConnect'
                  >
              >
            >
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
*/

      integrationDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationDelete'
                  >
              >
            >
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
*/

      integrationArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationArchive'
                  >
              >
            >
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
*/

      integrationSlackWorkflowAccessUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationSlackWorkflowAccessUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackWorkflowAccessUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackWorkflowAccessUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationSlackWorkflowAccessUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationSlackWorkflowAccessUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationSlackWorkflowAccessUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationSlackWorkflowAccessUpdate'
                  >
              >
            >
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
*/

      integrationRequest:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.integrationRequest<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'integrationRequest'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ integrationRequest: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ integrationRequest: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'integrationRequest'
                  >
              >
            >
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
*/

      initiativeUpdateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUpdateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdateCreate'
                  >
              >
            >
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
*/

      initiativeUpdateUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUpdateUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdateUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdateUpdate'
                  >
              >
            >
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
*/

      initiativeUpdateArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUpdateArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdateArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdateArchive'
                  >
              >
            >
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
*/

      createInitiativeUpdateReminder:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.createInitiativeUpdateReminder<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ createInitiativeUpdateReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ createInitiativeUpdateReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'createInitiativeUpdateReminder'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ createInitiativeUpdateReminder: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ createInitiativeUpdateReminder: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'createInitiativeUpdateReminder'
                  >
              >
            >
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
*/

      initiativeUpdateUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUpdateUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdateUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdateUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdateUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdateUnarchive'
                  >
              >
            >
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
*/

      initiativeToProjectCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeToProjectCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeToProjectCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeToProjectCreate'
                  >
              >
            >
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
*/

      initiativeToProjectUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeToProjectUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeToProjectUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeToProjectUpdate'
                  >
              >
            >
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
*/

      initiativeToProjectDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeToProjectDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeToProjectDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeToProjectDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeToProjectDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeToProjectDelete'
                  >
              >
            >
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
*/

      initiativeCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeCreate'
                  >
              >
            >
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
*/

      initiativeUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUpdate'
                  >
              >
            >
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
*/

      initiativeArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeArchive'
                  >
              >
            >
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
*/

      initiativeUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeUnarchive'
                  >
              >
            >
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
*/

      initiativeDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeDelete'
                  >
              >
            >
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
*/

      initiativeRelationCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeRelationCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeRelationCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeRelationCreate'
                  >
              >
            >
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
*/

      initiativeRelationUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeRelationUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeRelationUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeRelationUpdate'
                  >
              >
            >
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
*/

      initiativeRelationDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.initiativeRelationDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'initiativeRelationDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ initiativeRelationDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ initiativeRelationDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'initiativeRelationDelete'
                  >
              >
            >
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
*/

      gitAutomationTargetBranchCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationTargetBranchCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationTargetBranchCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationTargetBranchCreate'
                  >
              >
            >
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
*/

      gitAutomationTargetBranchUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationTargetBranchUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationTargetBranchUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationTargetBranchUpdate'
                  >
              >
            >
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
*/

      gitAutomationTargetBranchDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationTargetBranchDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationTargetBranchDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationTargetBranchDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationTargetBranchDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationTargetBranchDelete'
                  >
              >
            >
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
*/

      gitAutomationStateCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationStateCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationStateCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationStateCreate'
                  >
              >
            >
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
*/

      gitAutomationStateUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationStateUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationStateUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationStateUpdate'
                  >
              >
            >
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
*/

      gitAutomationStateDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.gitAutomationStateDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'gitAutomationStateDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ gitAutomationStateDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ gitAutomationStateDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'gitAutomationStateDelete'
                  >
              >
            >
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
*/

      fileUpload:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.fileUpload<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUpload: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUpload: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'fileUpload'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUpload: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUpload: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'fileUpload'
                  >
              >
            >
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
*/

      importFileUpload:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.importFileUpload<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ importFileUpload: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ importFileUpload: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'importFileUpload'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ importFileUpload: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ importFileUpload: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'importFileUpload'
                  >
              >
            >
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
*/

      imageUploadFromUrl:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.imageUploadFromUrl<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ imageUploadFromUrl: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ imageUploadFromUrl: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'imageUploadFromUrl'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ imageUploadFromUrl: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ imageUploadFromUrl: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'imageUploadFromUrl'
                  >
              >
            >
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
*/

      fileUploadDangerouslyDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.fileUploadDangerouslyDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUploadDangerouslyDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUploadDangerouslyDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'fileUploadDangerouslyDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ fileUploadDangerouslyDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ fileUploadDangerouslyDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'fileUploadDangerouslyDelete'
                  >
              >
            >
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
*/

      favoriteCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.favoriteCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'favoriteCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'favoriteCreate'
                  >
              >
            >
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
*/

      favoriteUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.favoriteUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'favoriteUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'favoriteUpdate'
                  >
              >
            >
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
*/

      favoriteDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.favoriteDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'favoriteDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ favoriteDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ favoriteDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'favoriteDelete'
                  >
              >
            >
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
*/

      entityExternalLinkCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.entityExternalLinkCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'entityExternalLinkCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'entityExternalLinkCreate'
                  >
              >
            >
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
*/

      entityExternalLinkUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.entityExternalLinkUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'entityExternalLinkUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'entityExternalLinkUpdate'
                  >
              >
            >
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
*/

      entityExternalLinkDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.entityExternalLinkDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'entityExternalLinkDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ entityExternalLinkDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ entityExternalLinkDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'entityExternalLinkDelete'
                  >
              >
            >
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
*/

      emojiCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emojiCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emojiCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emojiCreate'
                  >
              >
            >
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
*/

      emojiDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emojiDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emojiDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emojiDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emojiDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emojiDelete'
                  >
              >
            >
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
*/

      emailUnsubscribe:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailUnsubscribe<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUnsubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUnsubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailUnsubscribe'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUnsubscribe: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUnsubscribe: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailUnsubscribe'
                  >
              >
            >
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
*/

      emailIntakeAddressCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailIntakeAddressCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailIntakeAddressCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailIntakeAddressCreate'
                  >
              >
            >
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
*/

      emailIntakeAddressRotate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailIntakeAddressRotate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressRotate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressRotate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailIntakeAddressRotate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressRotate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressRotate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailIntakeAddressRotate'
                  >
              >
            >
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
*/

      emailIntakeAddressUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailIntakeAddressUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailIntakeAddressUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailIntakeAddressUpdate'
                  >
              >
            >
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
*/

      emailIntakeAddressDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailIntakeAddressDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailIntakeAddressDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailIntakeAddressDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailIntakeAddressDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailIntakeAddressDelete'
                  >
              >
            >
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
*/

      documentCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.documentCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ documentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documentCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ documentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documentCreate'
                  >
              >
            >
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
*/

      documentUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.documentUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documentUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documentUpdate'
                  >
              >
            >
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
*/

      documentDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.documentDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ documentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documentDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ documentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documentDelete'
                  >
              >
            >
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
*/

      documentUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.documentUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'documentUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ documentUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ documentUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'documentUnarchive'
                  >
              >
            >
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
*/

      cycleCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.cycleCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycleCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycleCreate'
                  >
              >
            >
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
*/

      cycleUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.cycleUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycleUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycleUpdate'
                  >
              >
            >
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
*/

      cycleArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.cycleArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycleArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycleArchive'
                  >
              >
            >
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
*/

      cycleShiftAll:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.cycleShiftAll<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleShiftAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleShiftAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycleShiftAll'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleShiftAll: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleShiftAll: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycleShiftAll'
                  >
              >
            >
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
*/

      cycleStartUpcomingCycleToday:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.cycleStartUpcomingCycleToday<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleStartUpcomingCycleToday: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleStartUpcomingCycleToday: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'cycleStartUpcomingCycleToday'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ cycleStartUpcomingCycleToday: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ cycleStartUpcomingCycleToday: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'cycleStartUpcomingCycleToday'
                  >
              >
            >
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
*/

      customerTierCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerTierCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerTierCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerTierCreate'
                  >
              >
            >
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
*/

      customerTierUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerTierUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerTierUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerTierUpdate'
                  >
              >
            >
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
*/

      customerTierDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerTierDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerTierDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerTierDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerTierDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerTierDelete'
                  >
              >
            >
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
*/

      customerStatusCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerStatusCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerStatusCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerStatusCreate'
                  >
              >
            >
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
*/

      customerStatusUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerStatusUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerStatusUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerStatusUpdate'
                  >
              >
            >
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
*/

      customerStatusDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerStatusDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerStatusDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerStatusDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerStatusDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerStatusDelete'
                  >
              >
            >
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
*/

      customerCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerCreate'
                  >
              >
            >
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
*/

      customerUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerUpdate'
                  >
              >
            >
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
*/

      customerDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerDelete'
                  >
              >
            >
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
*/

      customerMerge:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerMerge<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerMerge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerMerge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerMerge'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerMerge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerMerge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerMerge'
                  >
              >
            >
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
*/

      customerUpsert:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerUpsert<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpsert: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpsert: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerUpsert'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUpsert: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUpsert: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerUpsert'
                  >
              >
            >
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
*/

      customerUnsync:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerUnsync<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUnsync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUnsync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerUnsync'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerUnsync: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerUnsync: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerUnsync'
                  >
              >
            >
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
*/

      customerNeedCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedCreate'
                  >
              >
            >
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
*/

      customerNeedCreateFromAttachment:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedCreateFromAttachment<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreateFromAttachment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreateFromAttachment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedCreateFromAttachment'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedCreateFromAttachment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedCreateFromAttachment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedCreateFromAttachment'
                  >
              >
            >
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
*/

      customerNeedUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedUpdate'
                  >
              >
            >
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
*/

      customerNeedDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedDelete'
                  >
              >
            >
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
*/

      customerNeedArchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedArchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedArchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedArchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedArchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedArchive'
                  >
              >
            >
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
*/

      customerNeedUnarchive:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customerNeedUnarchive<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customerNeedUnarchive'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customerNeedUnarchive: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customerNeedUnarchive: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customerNeedUnarchive'
                  >
              >
            >
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
*/

      customViewCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customViewCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViewCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViewCreate'
                  >
              >
            >
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
*/

      customViewUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customViewUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViewUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViewUpdate'
                  >
              >
            >
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
*/

      customViewDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.customViewDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'customViewDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ customViewDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ customViewDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'customViewDelete'
                  >
              >
            >
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
*/

      contactCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.contactCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ contactCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'contactCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ contactCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'contactCreate'
                  >
              >
            >
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
*/

      contactSalesCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.contactSalesCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ contactSalesCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactSalesCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'contactSalesCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ contactSalesCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ contactSalesCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'contactSalesCreate'
                  >
              >
            >
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
*/

      commentCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.commentCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ commentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'commentCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ commentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'commentCreate'
                  >
              >
            >
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
*/

      commentUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.commentUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'commentUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'commentUpdate'
                  >
              >
            >
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
*/

      commentDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.commentDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ commentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'commentDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ commentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'commentDelete'
                  >
              >
            >
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
*/

      commentResolve:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.commentResolve<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ commentResolve: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentResolve: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'commentResolve'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ commentResolve: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentResolve: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'commentResolve'
                  >
              >
            >
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
*/

      commentUnresolve:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.commentUnresolve<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUnresolve: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUnresolve: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'commentUnresolve'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ commentUnresolve: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ commentUnresolve: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'commentUnresolve'
                  >
              >
            >
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
*/

      emailUserAccountAuthChallenge:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailUserAccountAuthChallenge<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUserAccountAuthChallenge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUserAccountAuthChallenge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailUserAccountAuthChallenge'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailUserAccountAuthChallenge: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailUserAccountAuthChallenge: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailUserAccountAuthChallenge'
                  >
              >
            >
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
*/

      emailTokenUserAccountAuth:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.emailTokenUserAccountAuth<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ emailTokenUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailTokenUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'emailTokenUserAccountAuth'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ emailTokenUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ emailTokenUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'emailTokenUserAccountAuth'
                  >
              >
            >
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
*/

      samlTokenUserAccountAuth:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.samlTokenUserAccountAuth<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ samlTokenUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ samlTokenUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'samlTokenUserAccountAuth'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ samlTokenUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ samlTokenUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'samlTokenUserAccountAuth'
                  >
              >
            >
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
*/

      googleUserAccountAuth:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.googleUserAccountAuth<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ googleUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ googleUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'googleUserAccountAuth'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ googleUserAccountAuth: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ googleUserAccountAuth: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'googleUserAccountAuth'
                  >
              >
            >
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
*/

      passkeyLoginStart:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.passkeyLoginStart<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginStart: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginStart: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'passkeyLoginStart'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginStart: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginStart: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'passkeyLoginStart'
                  >
              >
            >
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
*/

      passkeyLoginFinish:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.passkeyLoginFinish<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginFinish: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginFinish: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'passkeyLoginFinish'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ passkeyLoginFinish: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ passkeyLoginFinish: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'passkeyLoginFinish'
                  >
              >
            >
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
*/

      createOrganizationFromOnboarding:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.createOrganizationFromOnboarding<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ createOrganizationFromOnboarding: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ createOrganizationFromOnboarding: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'createOrganizationFromOnboarding'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ createOrganizationFromOnboarding: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ createOrganizationFromOnboarding: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'createOrganizationFromOnboarding'
                  >
              >
            >
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
*/

      joinOrganizationFromOnboarding:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.joinOrganizationFromOnboarding<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ joinOrganizationFromOnboarding: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ joinOrganizationFromOnboarding: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'joinOrganizationFromOnboarding'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ joinOrganizationFromOnboarding: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ joinOrganizationFromOnboarding: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'joinOrganizationFromOnboarding'
                  >
              >
            >
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
*/

      leaveOrganization:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.leaveOrganization<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ leaveOrganization: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ leaveOrganization: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'leaveOrganization'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ leaveOrganization: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ leaveOrganization: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'leaveOrganization'
                  >
              >
            >
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
*/

      logout:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.logout<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ logout: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ logout: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'logout'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ logout: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ logout: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'logout'
                  >
              >
            >
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
*/

      logoutSession:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.logoutSession<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'logoutSession'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutSession: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutSession: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'logoutSession'
                  >
              >
            >
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
*/

      logoutAllSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.logoutAllSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutAllSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutAllSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'logoutAllSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutAllSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutAllSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'logoutAllSessions'
                  >
              >
            >
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
*/

      logoutOtherSessions:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.logoutOtherSessions<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutOtherSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutOtherSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'logoutOtherSessions'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ logoutOtherSessions: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ logoutOtherSessions: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'logoutOtherSessions'
                  >
              >
            >
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
*/

      attachmentCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentCreate'
                  >
              >
            >
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
*/

      attachmentUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentUpdate'
                  >
              >
            >
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
*/

      attachmentLinkURL:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkURL<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkURL: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkURL: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkURL'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkURL: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkURL: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkURL'
                  >
              >
            >
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
*/

      attachmentLinkGitLabMR:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkGitLabMR<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitLabMR: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitLabMR: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkGitLabMR'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitLabMR: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitLabMR: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkGitLabMR'
                  >
              >
            >
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
*/

      attachmentLinkGitHubIssue:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkGitHubIssue<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkGitHubIssue'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkGitHubIssue'
                  >
              >
            >
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
*/

      attachmentLinkGitHubPR:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkGitHubPR<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubPR: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubPR: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkGitHubPR'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkGitHubPR: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkGitHubPR: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkGitHubPR'
                  >
              >
            >
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
*/

      attachmentLinkZendesk:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkZendesk<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkZendesk: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkZendesk: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkZendesk'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkZendesk: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkZendesk: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkZendesk'
                  >
              >
            >
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
*/

      attachmentLinkDiscord:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkDiscord<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkDiscord: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkDiscord: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkDiscord'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkDiscord: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkDiscord: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkDiscord'
                  >
              >
            >
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
*/

      attachmentSyncToSlack:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentSyncToSlack<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentSyncToSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentSyncToSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentSyncToSlack'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentSyncToSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentSyncToSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentSyncToSlack'
                  >
              >
            >
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
*/

      attachmentLinkSlack:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkSlack<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkSlack'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSlack: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSlack: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkSlack'
                  >
              >
            >
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
*/

      attachmentLinkFront:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkFront<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkFront'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkFront: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkFront: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkFront'
                  >
              >
            >
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
*/

      attachmentLinkIntercom:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkIntercom<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkIntercom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkIntercom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkIntercom'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkIntercom: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkIntercom: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkIntercom'
                  >
              >
            >
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
*/

      attachmentLinkJiraIssue:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkJiraIssue<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkJiraIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkJiraIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkJiraIssue'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkJiraIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkJiraIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkJiraIssue'
                  >
              >
            >
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
*/

      attachmentLinkSalesforce:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentLinkSalesforce<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSalesforce: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSalesforce: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentLinkSalesforce'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentLinkSalesforce: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentLinkSalesforce: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentLinkSalesforce'
                  >
              >
            >
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
*/

      attachmentDelete:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.attachmentDelete<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'attachmentDelete'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ attachmentDelete: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ attachmentDelete: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'attachmentDelete'
                  >
              >
            >
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
*/

      agentSessionCreateOnComment:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentSessionCreateOnComment<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnComment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnComment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessionCreateOnComment'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnComment: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnComment: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessionCreateOnComment'
                  >
              >
            >
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
*/

      agentSessionCreateOnIssue:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentSessionCreateOnIssue<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessionCreateOnIssue'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreateOnIssue: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreateOnIssue: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessionCreateOnIssue'
                  >
              >
            >
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
*/

      agentSessionCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentSessionCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessionCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessionCreate'
                  >
              >
            >
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
*/

      agentSessionUpdateExternalUrl:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentSessionUpdateExternalUrl<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdateExternalUrl: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdateExternalUrl: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessionUpdateExternalUrl'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdateExternalUrl: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdateExternalUrl: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessionUpdateExternalUrl'
                  >
              >
            >
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
*/

      agentSessionUpdate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentSessionUpdate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentSessionUpdate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentSessionUpdate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentSessionUpdate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentSessionUpdate'
                  >
              >
            >
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
*/

      agentActivityCreate:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentActivityCreate<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentActivityCreate'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreate: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreate: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentActivityCreate'
                  >
              >
            >
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
*/

      agentActivityCreatePrompt:
        $$Utilities.GraffleKit.Context.Configuration.Check.Preflight<
          $Context,
          <$SelectionSet>(selectionSet: $$Utilities.NoExcess<$SelectionSet, $$SelectionSets.Mutation.agentActivityCreatePrompt<{ scalars: $Context['scalars'] }>>) =>
            GraphqlKit.Document.Object.Var.MethodReturn<
              GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreatePrompt: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
              & (null | {})
              & $$Utilities.HandleOutputDocumentBuilderRootField<
                  $Context,
                  GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreatePrompt: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                  'agentActivityCreatePrompt'
                >,
              $$Utilities.DocumentRunnerDeferred<
                GraphqlKit.Document.Object.Var.InferFromMutation<{ agentActivityCreatePrompt: $SelectionSet}, $$SchemaMap.SchemaDrivenDataMap>,
                & (null | {})
                & $$Utilities.HandleOutputDocumentBuilderRootField<
                    $Context,
                    GraphqlKit.Document.Object.InferResult.OperationMutation<{ agentActivityCreatePrompt: $SelectionSet}, $$Schema.Schema<$Context['scalars']>>,
                    'agentActivityCreatePrompt'
                  >
              >
            >
        >

    }


export interface BuilderMethodsRoot<$Context extends $$Utilities.Context> {
/**
  * Access to {@link https://graphql.org/learn/schema/#the-query-and-mutation-types | Query} root field methods.
  *
  * Each method corresponds to a root field on the GraphQL schema and returns a Promise.
  * Use `.$batch(...)` to select multiple query fields in a single request.
  *
  * @example Single field
  * ```ts
  * const user = await graffle.query.user({ id: true, name: true })
  * ```
  * @example Multiple fields with $batch
  * ```ts
  * const data = await graffle.query.$batch({
  * user: { id: true, name: true },
  * posts: { title: true, content: true }
  * })
  * ```
  */
query: QueryMethods<$Context>
/**
  * Access to {@link https://graphql.org/learn/schema/#the-mutation-and-mutation-types | Mutation} root field methods.
  *
  * Each method corresponds to a root field on the GraphQL schema and returns a Promise.
  * Use `.$batch(...)` to select multiple mutation fields in a single request.
  *
  * @example Single field
  * ```ts
  * const result = await graffle.mutation.createUser({
  * id: true,
  * name: true
  * })
  * ```
  * @example Multiple fields with $batch
  * ```ts
  * const data = await graffle.mutation.$batch({
  * createUser: { id: true, name: true },
  * createPost: { id: true, title: true }
  * })
  * ```
  */
mutation: MutationMethods<$Context>
}


      export interface BuilderMethodsRootFn extends $$Utilities.Kind.Kind {
        // @ts-expect-error parameter is Untyped.
        return: BuilderMethodsRoot<this['parameters']>
      }
