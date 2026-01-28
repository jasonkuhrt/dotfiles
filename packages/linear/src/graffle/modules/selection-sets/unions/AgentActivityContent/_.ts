import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as AgentActivityContent from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* Content for different types of agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 6 |
* | **Types** | {@link $Schema.AgentActivityThoughtContent}, {@link $Schema.AgentActivityActionContent}, {@link $Schema.AgentActivityResponseContent}, {@link $Schema.AgentActivityPromptContent}, {@link $Schema.AgentActivityErrorContent}, {@link $Schema.AgentActivityElicitationContent} |
*/
export interface AgentActivityContent<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {

      /**
* A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
* the name is one of the member type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.AgentActivityThoughtContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityThoughtContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityThoughtContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityThoughtContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityThoughtContent: {
* // ... AgentActivityThoughtContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityThoughtContent?: $Named.AgentActivityThoughtContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivityActionContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityActionContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityActionContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityActionContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityActionContent: {
* // ... AgentActivityActionContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityActionContent?: $Named.AgentActivityActionContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivityResponseContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityResponseContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityResponseContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityResponseContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityResponseContent: {
* // ... AgentActivityResponseContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityResponseContent?: $Named.AgentActivityResponseContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivityPromptContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityPromptContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityPromptContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityPromptContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityPromptContent: {
* // ... AgentActivityPromptContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityPromptContent?: $Named.AgentActivityPromptContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivityErrorContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityErrorContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityErrorContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityErrorContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityErrorContent: {
* // ... AgentActivityErrorContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityErrorContent?: $Named.AgentActivityErrorContent<_$Context>
/**
* Inline fragment selection for {@link $Schema.AgentActivityElicitationContent} member.
*
* When the runtime value is of type {@link $Schema.AgentActivityElicitationContent}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AgentActivityElicitationContent} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.AgentActivityContent} |
* | **Path** | `AgentActivityContent -> AgentActivityElicitationContent` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.agentactivitycontents({
* __typename: true,
* ___on_AgentActivityElicitationContent: {
* // ... AgentActivityElicitationContent-specific fields
* }
* })
* ```
*/
___on_AgentActivityElicitationContent?: $Named.AgentActivityElicitationContent<_$Context>
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