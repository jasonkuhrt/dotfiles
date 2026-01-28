import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as ArchivePayload from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface}.
*
* A generic payload return from entity archive or deletion mutations.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface ↗} |
* | **Fields** | 2 |
* | **Implementors** | {@link $Schema.WorkflowStateArchivePayload}, {@link $Schema.DeletePayload}, {@link $Schema.ProjectArchivePayload}, {@link $Schema.TeamArchivePayload}, {@link $Schema.RoadmapArchivePayload}, {@link $Schema.ReleaseStageArchivePayload}, {@link $Schema.ReleaseArchivePayload}, {@link $Schema.ReleasePipelineArchivePayload}, {@link $Schema.ProjectUpdateArchivePayload}, {@link $Schema.ProjectStatusArchivePayload}, {@link $Schema.NotificationArchivePayload}, {@link $Schema.IssueArchivePayload}, {@link $Schema.InitiativeUpdateArchivePayload}, {@link $Schema.InitiativeArchivePayload}, {@link $Schema.DocumentArchivePayload}, {@link $Schema.CycleArchivePayload}, {@link $Schema.CustomerNeedArchivePayload} |
*/
export interface ArchivePayload<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The identifier of the last sync operation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ArchivePayload} |
* | **Path** | `ArchivePayload.lastSyncId` |
* | **Nullability** | Required |
*/
lastSyncId?: $Fields.lastSyncId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lastSyncId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the operation was successful.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$ArchivePayload} |
* | **Path** | `ArchivePayload.success` |
* | **Nullability** | Required |
*/
success?: $Fields.success.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.success<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.WorkflowStateArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.WorkflowStateArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.WorkflowStateArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> WorkflowStateArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_WorkflowStateArchivePayload: {
* // ... WorkflowStateArchivePayload-specific fields
* }
* })
* ```
*/
___on_WorkflowStateArchivePayload?: $Named.WorkflowStateArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.DeletePayload} implementor.
*
* When the runtime value is of type {@link $Schema.DeletePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DeletePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> DeletePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_DeletePayload: {
* // ... DeletePayload-specific fields
* }
* })
* ```
*/
___on_DeletePayload?: $Named.DeletePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ProjectArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ProjectArchivePayload: {
* // ... ProjectArchivePayload-specific fields
* }
* })
* ```
*/
___on_ProjectArchivePayload?: $Named.ProjectArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.TeamArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.TeamArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> TeamArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_TeamArchivePayload: {
* // ... TeamArchivePayload-specific fields
* }
* })
* ```
*/
___on_TeamArchivePayload?: $Named.TeamArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.RoadmapArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.RoadmapArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.RoadmapArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> RoadmapArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_RoadmapArchivePayload: {
* // ... RoadmapArchivePayload-specific fields
* }
* })
* ```
*/
___on_RoadmapArchivePayload?: $Named.RoadmapArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ReleaseStageArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ReleaseStageArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseStageArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ReleaseStageArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ReleaseStageArchivePayload: {
* // ... ReleaseStageArchivePayload-specific fields
* }
* })
* ```
*/
___on_ReleaseStageArchivePayload?: $Named.ReleaseStageArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ReleaseArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ReleaseArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ReleaseArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ReleaseArchivePayload: {
* // ... ReleaseArchivePayload-specific fields
* }
* })
* ```
*/
___on_ReleaseArchivePayload?: $Named.ReleaseArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ReleasePipelineArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ReleasePipelineArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleasePipelineArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ReleasePipelineArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ReleasePipelineArchivePayload: {
* // ... ReleasePipelineArchivePayload-specific fields
* }
* })
* ```
*/
___on_ReleasePipelineArchivePayload?: $Named.ReleasePipelineArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectUpdateArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectUpdateArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ProjectUpdateArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ProjectUpdateArchivePayload: {
* // ... ProjectUpdateArchivePayload-specific fields
* }
* })
* ```
*/
___on_ProjectUpdateArchivePayload?: $Named.ProjectUpdateArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.ProjectStatusArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.ProjectStatusArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatusArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> ProjectStatusArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_ProjectStatusArchivePayload: {
* // ... ProjectStatusArchivePayload-specific fields
* }
* })
* ```
*/
___on_ProjectStatusArchivePayload?: $Named.ProjectStatusArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.NotificationArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.NotificationArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.NotificationArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> NotificationArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_NotificationArchivePayload: {
* // ... NotificationArchivePayload-specific fields
* }
* })
* ```
*/
___on_NotificationArchivePayload?: $Named.NotificationArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.IssueArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.IssueArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> IssueArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_IssueArchivePayload: {
* // ... IssueArchivePayload-specific fields
* }
* })
* ```
*/
___on_IssueArchivePayload?: $Named.IssueArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeUpdateArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeUpdateArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeUpdateArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> InitiativeUpdateArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_InitiativeUpdateArchivePayload: {
* // ... InitiativeUpdateArchivePayload-specific fields
* }
* })
* ```
*/
___on_InitiativeUpdateArchivePayload?: $Named.InitiativeUpdateArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.InitiativeArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.InitiativeArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.InitiativeArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> InitiativeArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_InitiativeArchivePayload: {
* // ... InitiativeArchivePayload-specific fields
* }
* })
* ```
*/
___on_InitiativeArchivePayload?: $Named.InitiativeArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.DocumentArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.DocumentArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DocumentArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> DocumentArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_DocumentArchivePayload: {
* // ... DocumentArchivePayload-specific fields
* }
* })
* ```
*/
___on_DocumentArchivePayload?: $Named.DocumentArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.CycleArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.CycleArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CycleArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> CycleArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_CycleArchivePayload: {
* // ... CycleArchivePayload-specific fields
* }
* })
* ```
*/
___on_CycleArchivePayload?: $Named.CycleArchivePayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.CustomerNeedArchivePayload} implementor.
*
* When the runtime value is of type {@link $Schema.CustomerNeedArchivePayload}, this selection set is applied, allowing you to select fields specific to this implementor type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.CustomerNeedArchivePayload} |
* | **Kind** | Interface Implementor |
* | **Parent** | {@link $Schema.ArchivePayload} |
* | **Path** | `ArchivePayload -> CustomerNeedArchivePayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqlinterfacetype | Interface Types}
*
* @example
* ```ts
* query.archivepayloads({
* id: true,
* name: true,
* ___on_CustomerNeedArchivePayload: {
* // ... CustomerNeedArchivePayload-specific fields
* }
* })
* ```
*/
___on_CustomerNeedArchivePayload?: $Named.CustomerNeedArchivePayload<_$Context>
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
* A meta field. Is the name of the type being selected. Since this is a interface type and thus polymorphic,
* the name is one of the implementor type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
    
}