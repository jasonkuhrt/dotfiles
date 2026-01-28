import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as ProjectCreateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 23 |
* | **All Fields Nullable** | Yes |
*/
export interface ProjectCreateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The identifier in UUID v4 format. If none is provided, the backend will generate one.
*/
id?: $Scalars.String<_$Context>,
/**
* The name of the project.
*/
name: $Scalars.String$NonNull<_$Context>,
/**
* The icon of the project.
*/
icon?: $Scalars.String<_$Context>,
/**
* The color of the project.
*/
color?: $Scalars.String<_$Context>,
/**
* [DEPRECATED] The state of the project.
*
* @deprecated Use statusId instead
*/
state?: $Scalars.String<_$Context>,
/**
* The ID of the project status.
*/
statusId?: $Scalars.String<_$Context>,
/**
* The description for the project.
*/
description?: $Scalars.String<_$Context>,
/**
* The project content as markdown.
*/
content?: $Scalars.String<_$Context>,
/**
* The identifiers of the teams this project is associated with.
*/
teamIds: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>>>,
/**
* The ID of the issue from which that project is created.
*/
convertedFromIssueId?: $Scalars.String<_$Context>,
/**
* The ID of the last template applied to the project.
*/
lastAppliedTemplateId?: $Scalars.String<_$Context>,
/**
* The ID of the template to apply when creating the project.
*/
templateId?: $Scalars.String<_$Context>,
/**
* When set to true, the default project template of the first team provided will be applied. If templateId is provided, this will be ignored.
*/
useDefaultTemplate?: $Scalars.Boolean<_$Context>,
/**
* The identifier of the project lead.
*/
leadId?: $Scalars.String<_$Context>,
/**
* The identifiers of the members of this project.
*/
memberIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* The planned start date of the project.
*/
startDate?: $Scalars.TimelessDate<_$Context>,
/**
* The resolution of the project's start date.
*/
$startDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* The planned target date of the project.
*/
targetDate?: $Scalars.TimelessDate<_$Context>,
/**
* The resolution of the project's estimated completion date.
*/
$targetDateResolution?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.DateResolutionType | null | undefined>,
/**
* The sort order for the project within shared views.
*/
sortOrder?: $Scalars.Float<_$Context>,
/**
* The sort order for the project within shared views, when ordered by priority.
*/
prioritySortOrder?: $Scalars.Float<_$Context>,
/**
* The priority of the project. 0 = No priority, 1 = Urgent, 2 = High, 3 = Normal, 4 = Low.
*/
priority?: $Scalars.Int<_$Context>,
/**
* [Internal]The identifiers of the project labels associated with this project.
*/
labelIds?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>
}