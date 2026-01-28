import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'
import type * as $Named from '../../$named.js'

export type * as OrganizationInviteDetailsPayload from './__.js'

/**
* Selection set for {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 2 |
* | **Types** | {@link $Schema.OrganizationInviteFullDetailsPayload}, {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload} |
*/
export interface OrganizationInviteDetailsPayload<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {

      /**
* A meta field. Is the name of the type being selected. Since this is a union type and thus polymorphic,
* the name is one of the member type names, whichever is ultimately returned at runtime.
*
* @see {@link https://graphql.org/learn/queries/#meta-fields | Meta Fields}
*/
__typename?: GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<GraphqlKit.Document.Object.Select.Indicator.NoArgsIndicator> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      /**
* Inline fragment selection for {@link $Schema.OrganizationInviteFullDetailsPayload} member.
*
* When the runtime value is of type {@link $Schema.OrganizationInviteFullDetailsPayload}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationInviteFullDetailsPayload} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.OrganizationInviteDetailsPayload} |
* | **Path** | `OrganizationInviteDetailsPayload -> OrganizationInviteFullDetailsPayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.organizationinvitedetailspayloads({
* __typename: true,
* ___on_OrganizationInviteFullDetailsPayload: {
* // ... OrganizationInviteFullDetailsPayload-specific fields
* }
* })
* ```
*/
___on_OrganizationInviteFullDetailsPayload?: $Named.OrganizationInviteFullDetailsPayload<_$Context>
/**
* Inline fragment selection for {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload} member.
*
* When the runtime value is of type {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload}, this selection set is applied, allowing you to select fields specific to this member type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationAcceptedOrExpiredInviteDetailsPayload} |
* | **Kind** | Union Member |
* | **Parent** | {@link $Schema.OrganizationInviteDetailsPayload} |
* | **Path** | `OrganizationInviteDetailsPayload -> OrganizationAcceptedOrExpiredInviteDetailsPayload` |
*
* @see {@link https://spec.graphql.org/draft/#sec-Inline-Fragments | Inline Fragments}
* @see {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union Types}
*
* @example
* ```ts
* query.organizationinvitedetailspayloads({
* __typename: true,
* ___on_OrganizationAcceptedOrExpiredInviteDetailsPayload: {
* // ... OrganizationAcceptedOrExpiredInviteDetailsPayload-specific fields
* }
* })
* ```
*/
___on_OrganizationAcceptedOrExpiredInviteDetailsPayload?: $Named.OrganizationAcceptedOrExpiredInviteDetailsPayload<_$Context>
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