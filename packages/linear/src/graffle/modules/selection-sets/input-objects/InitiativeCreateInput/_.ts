import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as InitiativeCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* The properties of the initiative to create.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 11 |
* | **All Fields Nullable** | Yes |
*/
export interface InitiativeCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the initiative.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The description of the initiative.
*/
description?: $Scalars.String<_$Context>,
/**
* The owner of the initiative.
*/
ownerId?: $Scalars.String<_$Context>,
/**
* The sort order of the initiative within the organization.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The initiative's color.
*/
color?: $Scalars.String<_$Context>,
/**
* The initiative's icon.
*/
icon?: $Scalars.String<_$Context>,
/**
* The initiative's status.
*/
$status?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.InitiativeStatus | null | undefined>,
/**
* The estimated completion date of the initiative.
*/
targetDate?: $Scalars.TimelessDate<_$Context>,
/**
* The resolution of the initiative's estimated completion date.
*/
$targetDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* The initiative's content in markdown format.
*/
content?: $Scalars.String<_$Context>
}