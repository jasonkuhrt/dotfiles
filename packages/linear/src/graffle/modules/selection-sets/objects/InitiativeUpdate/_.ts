import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type * as $Fields from './fields.js'
import type { $DefaultSelectionContext } from '../../_context.js'
import type { $FragmentInline } from './fragment.js'

export type * as InitiativeUpdate from './__.js'

/**
* Selection set for {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 21 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface InitiativeUpdate<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> extends GraphqlKit.Document.Object.Select.Bases.ObjectLike {

      /**
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.id` |
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
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.createdAt` |
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
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.updatedAt` |
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
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.archivedAt` |
* | **Nullability** | Optional |
*/
archivedAt?: $Fields.archivedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.archivedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The update content in markdown format.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.body` |
* | **Nullability** | Required |
*/
body?: $Fields.body.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.body<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The time the update was edited.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.editedAt` |
* | **Nullability** | Optional |
*/
editedAt?: $Fields.editedAt.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.editedAt<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Emoji reaction summary, grouped by emoji type.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.reactionData` |
* | **Nullability** | Required |
*/
reactionData?: $Fields.reactionData.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactionData<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] The content of the update as a Prosemirror document.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.bodyData` |
* | **Nullability** | Required |
*/
bodyData?: $Fields.bodyData.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.bodyData<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The update's unique URL slug.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.slugId` |
* | **Nullability** | Required |
*/
slugId?: $Fields.slugId.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.slugId<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The initiative that the update is associated with.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Initiative}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.initiative` |
* | **Nullability** | Required |
*/
initiative?: $Fields.initiative.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.initiative<_$Context>>
/**
* The user who wrote the update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$User}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.user` |
* | **Nullability** | Required |
*/
user?: $Fields.user.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.user<_$Context>>
/**
* The health at the time of the update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$InitiativeUpdateHealthType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.health` |
* | **Nullability** | Required |
*/
health?: $Fields.health.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.health<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* [Internal] Serialized JSON representing current state of the initiative properties when posting the initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.infoSnapshot` |
* | **Nullability** | Optional |
*/
infoSnapshot?: $Fields.infoSnapshot.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.infoSnapshot<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether initiative update diff should be hidden.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.isDiffHidden` |
* | **Nullability** | Required |
*/
isDiffHidden?: $Fields.isDiffHidden.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isDiffHidden<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The URL to the initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.url` |
* | **Nullability** | Required |
*/
url?: $Fields.url.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.url<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Whether the initiative update is stale.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.isStale` |
* | **Nullability** | Required |
*/
isStale?: $Fields.isStale.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.isStale<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The diff between the current update and the previous one.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.diff` |
* | **Nullability** | Optional |
*/
diff?: $Fields.diff.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.diff<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* The diff between the current update and the previous one, formatted as markdown.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.diffMarkdown` |
* | **Nullability** | Optional |
*/
diffMarkdown?: $Fields.diffMarkdown.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.diffMarkdown<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
/**
* Reactions associated with the initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Reaction}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.reactions` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
reactions?: $Fields.reactions.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.reactions<_$Context>>
/**
* Comments associated with the initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$CommentConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.comments` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
comments?: $Fields.comments.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.comments<_$Context>>
/**
* Number of comments associated with the initiative update.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $NamedTypes.$Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $NamedTypes.$InitiativeUpdate} |
* | **Path** | `InitiativeUpdate.commentCount` |
* | **Nullability** | Required |
*/
commentCount?: $Fields.commentCount.$Expanded<_$Context>| GraphqlKit.Document.Object.Select.SelectAlias.SelectAlias<$Fields.commentCount<_$Context>> | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasShort | GraphqlKit.Document.Object.Select.SelectAlias.SelectAliasString
      
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