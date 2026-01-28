import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The name of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The logo of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.logoUrl` |
* | **Nullability** | Optional |
*/
export interface logoUrl {
kind: "InputField",
name: "logoUrl",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The URL key of the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.urlKey` |
* | **Nullability** | Optional |
*/
export interface urlKey {
kind: "InputField",
name: "urlKey",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* How git branches are formatted. If null, default formatting will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.gitBranchFormat` |
* | **Nullability** | Optional |
*/
export interface gitBranchFormat {
kind: "InputField",
name: "gitBranchFormat",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the Git integration linkback messages should be sent for private repositories.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.gitLinkbackMessagesEnabled` |
* | **Nullability** | Optional |
*/
export interface gitLinkbackMessagesEnabled {
kind: "InputField",
name: "gitLinkbackMessagesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the Git integration linkback messages should be sent for public repositories.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.gitPublicLinkbackMessagesEnabled` |
* | **Nullability** | Optional |
*/
export interface gitPublicLinkbackMessagesEnabled {
kind: "InputField",
name: "gitPublicLinkbackMessagesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether issue descriptions should be included in Git integration linkback messages.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.gitLinkbackDescriptionsEnabled` |
* | **Nullability** | Optional |
*/
export interface gitLinkbackDescriptionsEnabled {
kind: "InputField",
name: "gitLinkbackDescriptionsEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization is using roadmap.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.roadmapEnabled` |
* | **Nullability** | Optional |
*/
export interface roadmapEnabled {
kind: "InputField",
name: "roadmapEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The n-weekly frequency at which to prompt for project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.projectUpdateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface projectUpdateReminderFrequencyInWeeks {
kind: "InputField",
name: "projectUpdateReminderFrequencyInWeeks",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The day at which project updates are sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.projectUpdateRemindersDay` |
* | **Nullability** | Optional |
*/
export interface projectUpdateRemindersDay {
kind: "InputField",
name: "projectUpdateRemindersDay",
inlineType: [0, ],
namedType: $Schema.Day,
type: $Schema.Day['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The hour at which project updates are sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.projectUpdateRemindersHour` |
* | **Nullability** | Optional |
*/
export interface projectUpdateRemindersHour {
kind: "InputField",
name: "projectUpdateRemindersHour",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [ALPHA] The n-weekly frequency at which to prompt for initiative updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.initiativeUpdateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateReminderFrequencyInWeeks {
kind: "InputField",
name: "initiativeUpdateReminderFrequencyInWeeks",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [ALPHA] The day at which initiative updates are sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.initiativeUpdateRemindersDay` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateRemindersDay {
kind: "InputField",
name: "initiativeUpdateRemindersDay",
inlineType: [0, ],
namedType: $Schema.Day,
type: $Schema.Day['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [ALPHA] The hour at which initiative updates are sent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.initiativeUpdateRemindersHour` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateRemindersHour {
kind: "InputField",
name: "initiativeUpdateRemindersHour",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The month at which the fiscal year starts.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.fiscalYearStartMonth` |
* | **Nullability** | Optional |
*/
export interface fiscalYearStartMonth {
kind: "InputField",
name: "fiscalYearStartMonth",
inlineType: [0, ],
namedType: $Schema.Float,
type: $Schema.Float['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [Internal] The list of working days. Sunday is 0, Monday is 1, etc.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.workingDays` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface workingDays {
kind: "InputField",
name: "workingDays",
inlineType: [0, [1, ]],
namedType: $Schema.Float,
type: readonly ($Schema.Float['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization has opted for reduced customer support attachment information.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.reducedPersonalInformation` |
* | **Nullability** | Optional |
*/
export interface reducedPersonalInformation {
kind: "InputField",
name: "reducedPersonalInformation",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization has opted for having to approve all OAuth applications for install.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.oauthAppReview` |
* | **Nullability** | Optional |
*/
export interface oauthAppReview {
kind: "InputField",
name: "oauthAppReview",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* List of services that are allowed to be used for login.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.allowedAuthServices` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface allowedAuthServices {
kind: "InputField",
name: "allowedAuthServices",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Internal. Whether SLAs have been enabled for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.slaEnabled` |
* | **Nullability** | Optional |
*/
export interface slaEnabled {
kind: "InputField",
name: "slaEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [DEPRECATED] Whether member users are allowed to send invites.
*
* @deprecated This field is now ignored. Use `securitySettings.invitationsRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.allowMembersToInvite` |
* | **⚠ Deprecated** | This field is now ignored. Use `securitySettings.invitationsRole` instead. |
* | **Nullability** | Optional |
*/
export interface allowMembersToInvite {
kind: "InputField",
name: "allowMembersToInvite",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [DEPRECATED] Whether team creation is restricted to admins.
*
* @deprecated This field is now ignored. Use `securitySettings.teamCreationRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.restrictTeamCreationToAdmins` |
* | **⚠ Deprecated** | This field is now ignored. Use `securitySettings.teamCreationRole` instead. |
* | **Nullability** | Optional |
*/
export interface restrictTeamCreationToAdmins {
kind: "InputField",
name: "restrictTeamCreationToAdmins",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [DEPRECATED] Whether label creation is restricted to admins.
*
* @deprecated This field is now ignored. Use `securitySettings.labelManagementRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.restrictLabelManagementToAdmins` |
* | **⚠ Deprecated** | This field is now ignored. Use `securitySettings.labelManagementRole` instead. |
* | **Nullability** | Optional |
*/
export interface restrictLabelManagementToAdmins {
kind: "InputField",
name: "restrictLabelManagementToAdmins",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether agent invocation is restricted to full workspace members.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.restrictAgentInvocationToMembers` |
* | **Nullability** | Optional |
*/
export interface restrictAgentInvocationToMembers {
kind: "InputField",
name: "restrictAgentInvocationToMembers",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* IP restriction configurations controlling allowed access the workspace.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationIpRestrictionInput}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.ipRestrictions` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface ipRestrictions {
kind: "InputField",
name: "ipRestrictions",
inlineType: [0, [1, ]],
namedType: $Schema.OrganizationIpRestrictionInput,
type: readonly ($Schema.OrganizationIpRestrictionInput['type'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Allowed file upload content types.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.allowedFileUploadContentTypes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface allowedFileUploadContentTypes {
kind: "InputField",
name: "allowedFileUploadContentTypes",
inlineType: [0, [1, ]],
namedType: $Schema.String,
type: readonly ($Schema.String['codec']['_typeDecoded'])[] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [ALPHA] Theme settings for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.themeSettings` |
* | **Nullability** | Optional |
*/
export interface themeSettings {
kind: "InputField",
name: "themeSettings",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Whether the organization is using customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.customersEnabled` |
* | **Nullability** | Optional |
*/
export interface customersEnabled {
kind: "InputField",
name: "customersEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Configuration settings for the Customers feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.customersConfiguration` |
* | **Nullability** | Optional |
*/
export interface customersConfiguration {
kind: "InputField",
name: "customersConfiguration",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Whether code intelligence is enabled for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.codeIntelligenceEnabled` |
* | **Nullability** | Optional |
*/
export interface codeIntelligenceEnabled {
kind: "InputField",
name: "codeIntelligenceEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] GitHub repository in owner/repo format for code intelligence.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.codeIntelligenceRepository` |
* | **Nullability** | Optional |
*/
export interface codeIntelligenceRepository {
kind: "InputField",
name: "codeIntelligenceRepository",
inlineType: [0, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization has enabled the feed feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.feedEnabled` |
* | **Nullability** | Optional |
*/
export interface feedEnabled {
kind: "InputField",
name: "feedEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether to hide other workspaces for new users signing up with email domains claimed by this organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.hideNonPrimaryOrganizations` |
* | **Nullability** | Optional |
*/
export interface hideNonPrimaryOrganizations {
kind: "InputField",
name: "hideNonPrimaryOrganizations",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Default schedule for how often feed summaries are generated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedSummarySchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.defaultFeedSummarySchedule` |
* | **Nullability** | Optional |
*/
export interface defaultFeedSummarySchedule {
kind: "InputField",
name: "defaultFeedSummarySchedule",
inlineType: [0, ],
namedType: $Schema.FeedSummarySchedule,
type: $Schema.FeedSummarySchedule['members'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Whether the organization has enabled the AI add-on.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.aiAddonEnabled` |
* | **Nullability** | Optional |
*/
export interface aiAddonEnabled {
kind: "InputField",
name: "aiAddonEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Whether the organization has enabled generated updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.generatedUpdatesEnabled` |
* | **Nullability** | Optional |
*/
export interface generatedUpdatesEnabled {
kind: "InputField",
name: "generatedUpdatesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Whether the organization has opted in to AI telemetry.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.aiTelemetryEnabled` |
* | **Nullability** | Optional |
*/
export interface aiTelemetryEnabled {
kind: "InputField",
name: "aiTelemetryEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [DEPRECATED] Whether the organization has enabled the member API keys.
*
* @deprecated This field is now ignored. Use `securitySettings.personalApiKeysRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.personalApiKeysEnabled` |
* | **⚠ Deprecated** | This field is now ignored. Use `securitySettings.personalApiKeysRole` instead. |
* | **Nullability** | Optional |
*/
export interface personalApiKeysEnabled {
kind: "InputField",
name: "personalApiKeysEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization has enabled AI discussion summaries for issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.aiDiscussionSummariesEnabled` |
* | **Nullability** | Optional |
*/
export interface aiDiscussionSummariesEnabled {
kind: "InputField",
name: "aiDiscussionSummariesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether the organization has enabled resolved thread AI summaries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.aiThreadSummariesEnabled` |
* | **Nullability** | Optional |
*/
export interface aiThreadSummariesEnabled {
kind: "InputField",
name: "aiThreadSummariesEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* Whether HIPAA compliance is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.hipaaComplianceEnabled` |
* | **Nullability** | Optional |
*/
export interface hipaaComplianceEnabled {
kind: "InputField",
name: "hipaaComplianceEnabled",
inlineType: [0, ],
namedType: $Schema.Boolean,
type: $Schema.Boolean['codec']['_typeDecoded'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* The security settings for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationSecuritySettingsInput} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.securitySettings` |
* | **Nullability** | Optional |
*/
export interface securitySettings {
kind: "InputField",
name: "securitySettings",
inlineType: [0, ],
namedType: $Schema.OrganizationSecuritySettingsInput,
type: $Schema.OrganizationSecuritySettingsInput['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.OrganizationUpdateInput}.
*
* [INTERNAL] Configure per-modality AI host providers and model families.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.OrganizationUpdateInput} |
* | **Path** | `OrganizationUpdateInput.aiProviderConfiguration` |
* | **Nullability** | Optional |
*/
export interface aiProviderConfiguration {
kind: "InputField",
name: "aiProviderConfiguration",
inlineType: [0, ],
namedType: $Schema.JSONObject,
type: $Schema.JSONObject['codec']['_typeDecoded'] | null | undefined
}