import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as ExternalEntityInfoMetadata from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 3 |
* | **Types** | {@link $Schema.ExternalEntityInfoGithubMetadata}, {@link $Schema.ExternalEntityInfoJiraMetadata}, {@link $Schema.ExternalEntitySlackMetadata} |
*/
export interface ExternalEntityInfoMetadata<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {

      /**
* A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
* the name is one of the member type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.ExternalEntityInfoGithubMetadata} member.
*
* When the runtime value is of type {@link $Schema.ExternalEntityInfoGithubMetadata}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntityInfoGithubMetadata} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.ExternalEntityInfoMetadata} |
* | **Path** | `ExternalEntityInfoMetadata -> ExternalEntityInfoGithubMetadata` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.externalentityinfometadatas({
* __typename: true,
* ___on_ExternalEntityInfoGithubMetadata: {
* // ... ExternalEntityInfoGithubMetadata-specific fields
* }
* })
* ```
*/
___on_ExternalEntityInfoGithubMetadata?: $Named.ExternalEntityInfoGithubMetadata<_$Context>
/**
* Inline fragment selection for {@link $Schema.ExternalEntityInfoJiraMetadata} member.
*
* When the runtime value is of type {@link $Schema.ExternalEntityInfoJiraMetadata}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntityInfoJiraMetadata} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.ExternalEntityInfoMetadata} |
* | **Path** | `ExternalEntityInfoMetadata -> ExternalEntityInfoJiraMetadata` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.externalentityinfometadatas({
* __typename: true,
* ___on_ExternalEntityInfoJiraMetadata: {
* // ... ExternalEntityInfoJiraMetadata-specific fields
* }
* })
* ```
*/
___on_ExternalEntityInfoJiraMetadata?: $Named.ExternalEntityInfoJiraMetadata<_$Context>
/**
* Inline fragment selection for {@link $Schema.ExternalEntitySlackMetadata} member.
*
* When the runtime value is of type {@link $Schema.ExternalEntitySlackMetadata}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ExternalEntitySlackMetadata} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.ExternalEntityInfoMetadata} |
* | **Path** | `ExternalEntityInfoMetadata -> ExternalEntitySlackMetadata` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.externalentityinfometadatas({
* __typename: true,
* ___on_ExternalEntitySlackMetadata: {
* // ... ExternalEntitySlackMetadata-specific fields
* }
* })
* ```
*/
___on_ExternalEntitySlackMetadata?: $Named.ExternalEntitySlackMetadata<_$Context>
      /**
* Inline fragments for field groups.
*
* Generally a niche feature. This can be useful for example to apply an `@include` directive to a subset of the
* selection set in turn allowing you to pass a variable to opt in/out of that selection during execution on the server.
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments}
*/
___?: $FragmentInline<_$Context> | $FragmentInline<_$Context>[]
    
}