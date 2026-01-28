import type * as $$Utilities from 'graffle/utilities-for-generated'
import type { GraphqlKit } from 'graffle/utilities-for-generated'
import type { $DefaultSelectionContext } from '../../_context.js'
import type * as $Named from '../../$named.js'
import type * as $Scalars from '../../scalars/_.js'

export type * as OrganizationUpdateInput from './fields.js'

/**
* Input for {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 43 |
* | **All Fields Nullable** | Yes |
*/
export interface OrganizationUpdateInput<_$Context extends GraphqlKit.Document.Object.Select.SelectionContext = $DefaultSelectionContext> {
/**
* The name of the organization.
*/
name?: $Scalars.String<_$Context>,
/**
* The logo of the organization.
*/
logoUrl?: $Scalars.String<_$Context>,
/**
* The URL key of the organization.
*/
urlKey?: $Scalars.String<_$Context>,
/**
* How git branches are formatted. If null, default formatting will be used.
*/
gitBranchFormat?: $Scalars.String<_$Context>,
/**
* Whether the Git integration linkback messages should be sent for private repositories.
*/
gitLinkbackMessagesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether the Git integration linkback messages should be sent for public repositories.
*/
gitPublicLinkbackMessagesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether issue descriptions should be included in Git integration linkback messages.
*/
gitLinkbackDescriptionsEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether the organization is using roadmap.
*/
roadmapEnabled?: $Scalars.Boolean<_$Context>,
/**
* The n-weekly frequency at which to prompt for project updates.
*/
projectUpdateReminderFrequencyInWeeks?: $Scalars.Float<_$Context>,
/**
* The day at which project updates are sent.
*/
$projectUpdateRemindersDay?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.Day | null | undefined>,
/**
* The hour at which project updates are sent.
*/
projectUpdateRemindersHour?: $Scalars.Float<_$Context>,
/**
* [ALPHA] The n-weekly frequency at which to prompt for initiative updates.
*/
initiativeUpdateReminderFrequencyInWeeks?: $Scalars.Float<_$Context>,
/**
* [ALPHA] The day at which initiative updates are sent.
*/
$initiativeUpdateRemindersDay?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.Day | null | undefined>,
/**
* [ALPHA] The hour at which initiative updates are sent.
*/
initiativeUpdateRemindersHour?: $Scalars.Float<_$Context>,
/**
* The month at which the fiscal year starts.
*/
fiscalYearStartMonth?: $Scalars.Float<_$Context>,
/**
* [Internal] The list of working days. Sunday is 0, Monday is 1, etc.
*/
workingDays?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.Float<_$Context>> | null | undefined>,
/**
* Whether the organization has opted for reduced customer support attachment information.
*/
reducedPersonalInformation?: $Scalars.Boolean<_$Context>,
/**
* Whether the organization has opted for having to approve all OAuth applications for install.
*/
oauthAppReview?: $Scalars.Boolean<_$Context>,
/**
* List of services that are allowed to be used for login.
*/
allowedAuthServices?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* Internal. Whether SLAs have been enabled for the organization.
*/
slaEnabled?: $Scalars.Boolean<_$Context>,
/**
* [DEPRECATED] Whether member users are allowed to send invites.
*
* @deprecated This field is now ignored. Use `securitySettings.invitationsRole` instead.
*/
allowMembersToInvite?: $Scalars.Boolean<_$Context>,
/**
* [DEPRECATED] Whether team creation is restricted to admins.
*
* @deprecated This field is now ignored. Use `securitySettings.teamCreationRole` instead.
*/
restrictTeamCreationToAdmins?: $Scalars.Boolean<_$Context>,
/**
* [DEPRECATED] Whether label creation is restricted to admins.
*
* @deprecated This field is now ignored. Use `securitySettings.labelManagementRole` instead.
*/
restrictLabelManagementToAdmins?: $Scalars.Boolean<_$Context>,
/**
* Whether agent invocation is restricted to full workspace members.
*/
restrictAgentInvocationToMembers?: $Scalars.Boolean<_$Context>,
/**
* IP restriction configurations controlling allowed access the workspace.
*/
ipRestrictions?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationIpRestrictionInput<_$Context> | null | undefined>> | null | undefined>,
/**
* Allowed file upload content types.
*/
allowedFileUploadContentTypes?: GraphqlKit.Document.Object.Var.MaybeSchemaful<Array<$Scalars.String<_$Context>> | null | undefined>,
/**
* [ALPHA] Theme settings for the organization.
*/
themeSettings?: $Scalars.JSONObject<_$Context>,
/**
* [INTERNAL] Whether the organization is using customers.
*/
customersEnabled?: $Scalars.Boolean<_$Context>,
/**
* [INTERNAL] Configuration settings for the Customers feature.
*/
customersConfiguration?: $Scalars.JSONObject<_$Context>,
/**
* [INTERNAL] Whether code intelligence is enabled for the organization.
*/
codeIntelligenceEnabled?: $Scalars.Boolean<_$Context>,
/**
* [INTERNAL] GitHub repository in owner/repo format for code intelligence.
*/
codeIntelligenceRepository?: $Scalars.String<_$Context>,
/**
* Whether the organization has enabled the feed feature.
*/
feedEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether to hide other workspaces for new users signing up with email domains claimed by this organization.
*/
hideNonPrimaryOrganizations?: $Scalars.Boolean<_$Context>,
/**
* Default schedule for how often feed summaries are generated.
*/
$defaultFeedSummarySchedule?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.FeedSummarySchedule | null | undefined>,
/**
* [INTERNAL] Whether the organization has enabled the AI add-on.
*/
aiAddonEnabled?: $Scalars.Boolean<_$Context>,
/**
* [INTERNAL] Whether the organization has enabled generated updates.
*/
generatedUpdatesEnabled?: $Scalars.Boolean<_$Context>,
/**
* [INTERNAL] Whether the organization has opted in to AI telemetry.
*/
aiTelemetryEnabled?: $Scalars.Boolean<_$Context>,
/**
* [DEPRECATED] Whether the organization has enabled the member API keys.
*
* @deprecated This field is now ignored. Use `securitySettings.personalApiKeysRole` instead.
*/
personalApiKeysEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether the organization has enabled AI discussion summaries for issues.
*/
aiDiscussionSummariesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether the organization has enabled resolved thread AI summaries.
*/
aiThreadSummariesEnabled?: $Scalars.Boolean<_$Context>,
/**
* Whether HIPAA compliance is enabled for organization.
*/
hipaaComplianceEnabled?: $Scalars.Boolean<_$Context>,
/**
* The security settings for the organization.
*/
securitySettings?: GraphqlKit.Document.Object.Var.MaybeSchemaful<$Named.OrganizationSecuritySettingsInput<_$Context> | null | undefined>,
/**
* [INTERNAL] Configure per-modality AI host providers and model families.
*/
aiProviderConfiguration?: $Scalars.JSONObject<_$Context>
}