import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as TemplateCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface TemplateCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The template type, e.g. 'issue'.
*/
type: $Scalars.String$NonNull<_$Context>,
/**
* The identifier or key of the team associated with the template. If not given, the template will be shared across all teams.
*/
teamId?: $Scalars.String<_$Context>,
/**
* The template name.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The template description.
*/
description?: $Scalars.String<_$Context>,
/**
* The template data as JSON encoded attributes of the type of entity, such as an issue.
*/
templateData: $Scalars.JSON$NonNull<_$Context>,
/**
* The position of the template in the templates list.
*/
sortOrder?: $Scalars.Float<_$Context>
}