import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as AuthResolverResponse from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
*/
export interface AuthResolverResponse<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* User account ID.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.id` |
* | **Nullability** | Required |
*/
id?: $Fields.id.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.id<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Email for the authenticated account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.email` |
* | **Nullability** | Required |
*/
email?: $Fields.email.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.email<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Should the signup flow allow access for the domain.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.allowDomainAccess` |
* | **Nullability** | Optional |
*/
allowDomainAccess?: $Fields.allowDomainAccess.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.allowDomainAccess<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* List of active users that belong to the user account.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthUser}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.users` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
users?: $Fields.users.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.users<_$Context>>
/**
* List of locked users that are locked by login restrictions
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthUser}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lockedUsers` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
lockedUsers?: $Fields.lockedUsers.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lockedUsers<_$Context>>
/**
* List of organizations allowing this user account to join automatically.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthOrganization}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.availableOrganizations` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
availableOrganizations?: $Fields.availableOrganizations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.availableOrganizations<_$Context>>
/**
* List of organization available to this user account but locked due to the current auth method.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$AuthOrganization}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lockedOrganizations` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
lockedOrganizations?: $Fields.lockedOrganizations.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lockedOrganizations<_$Context>>
/**
* ID of the organization last accessed by the user.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.lastUsedOrganizationId` |
* | **Nullability** | Optional |
*/
lastUsedOrganizationId?: $Fields.lastUsedOrganizationId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.lastUsedOrganizationId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The authentication service used for the current session (e.g., google, email, saml).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.service` |
* | **Nullability** | Optional |
*/
service?: $Fields.service.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.service<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Application token.
*
* @deprecated Deprecated and not used anymore. Never populated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$AuthResolverResponse} |
* | **Path** | `AuthResolverResponse.token` |
* | **⚠ Deprecated** | Deprecated and not used anymore. Never populated. |
* | **Nullability** | Optional |
*/
token?: $Fields.token.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.token<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      
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