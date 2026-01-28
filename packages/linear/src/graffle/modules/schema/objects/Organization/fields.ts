import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"Organization"`
*
* {@link https://graphql.org/learn/queries/#meta-fields | GraphQL __typename documentation}
*/
export interface __typename {
kind: "OutputField",
name: "__typename",
arguments: {},
inlineType: [1],
namedType: {
kind: "__typename",
value: "Organization"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The unique identifier of the entity.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ID}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ID
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.createdAt` |
* | **Nullability** | Required |
*/
export interface createdAt {
kind: "OutputField",
name: "createdAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The last time at which the entity was meaningfully updated. This is the same as the creation time if the entity hasn't
* been updated after creation.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.updatedAt` |
* | **Nullability** | Required |
*/
export interface updatedAt {
kind: "OutputField",
name: "updatedAt",
arguments: {},
inlineType: [1, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The time at which the entity was archived. Null if the entity has not been archived.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.archivedAt` |
* | **Nullability** | Optional |
*/
export interface archivedAt {
kind: "OutputField",
name: "archivedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The organization's name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.name` |
* | **Nullability** | Required |
*/
export interface name {
kind: "OutputField",
name: "name",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The organization's unique URL key.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.urlKey` |
* | **Nullability** | Required |
*/
export interface urlKey {
kind: "OutputField",
name: "urlKey",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The organization's logo URL.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.logoUrl` |
* | **Nullability** | Optional |
*/
export interface logoUrl {
kind: "OutputField",
name: "logoUrl",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Rolling 30-day total upload volume for the organization, in megabytes.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.periodUploadVolume` |
* | **Nullability** | Required |
*/
export interface periodUploadVolume {
kind: "OutputField",
name: "periodUploadVolume",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [Internal] Facets associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Facet}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.facets` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface facets {
kind: "OutputField",
name: "facets",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Facet
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* How git branches are formatted. If null, default formatting will be used.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.gitBranchFormat` |
* | **Nullability** | Optional |
*/
export interface gitBranchFormat {
kind: "OutputField",
name: "gitBranchFormat",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the Git integration linkback messages should be sent to private repositories.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.gitLinkbackMessagesEnabled` |
* | **Nullability** | Required |
*/
export interface gitLinkbackMessagesEnabled {
kind: "OutputField",
name: "gitLinkbackMessagesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the Git integration linkback messages should be sent to public repositories.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.gitPublicLinkbackMessagesEnabled` |
* | **Nullability** | Required |
*/
export interface gitPublicLinkbackMessagesEnabled {
kind: "OutputField",
name: "gitPublicLinkbackMessagesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether issue descriptions should be included in Git integration linkback messages.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.gitLinkbackDescriptionsEnabled` |
* | **Nullability** | Required |
*/
export interface gitLinkbackDescriptionsEnabled {
kind: "OutputField",
name: "gitLinkbackDescriptionsEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the organization is using a roadmap.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.roadmapEnabled` |
* | **Nullability** | Required |
*/
export interface roadmapEnabled {
kind: "OutputField",
name: "roadmapEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The n-weekly frequency at which to prompt for project updates. When not set, reminders are off.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectUpdateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface projectUpdateReminderFrequencyInWeeks {
kind: "OutputField",
name: "projectUpdateReminderFrequencyInWeeks",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The day at which to prompt for project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectUpdateRemindersDay` |
* | **Nullability** | Required |
*/
export interface projectUpdateRemindersDay {
kind: "OutputField",
name: "projectUpdateRemindersDay",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Day
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The hour at which to prompt for project updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectUpdateRemindersHour` |
* | **Nullability** | Required |
*/
export interface projectUpdateRemindersHour {
kind: "OutputField",
name: "projectUpdateRemindersHour",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The n-weekly frequency at which to prompt for initiative updates. When not set, reminders are off.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.initiativeUpdateReminderFrequencyInWeeks` |
* | **Nullability** | Optional |
*/
export interface initiativeUpdateReminderFrequencyInWeeks {
kind: "OutputField",
name: "initiativeUpdateReminderFrequencyInWeeks",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The day at which to prompt for initiative updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Day}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.initiativeUpdateRemindersDay` |
* | **Nullability** | Required |
*/
export interface initiativeUpdateRemindersDay {
kind: "OutputField",
name: "initiativeUpdateRemindersDay",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Day
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The hour at which to prompt for initiative updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.initiativeUpdateRemindersHour` |
* | **Nullability** | Required |
*/
export interface initiativeUpdateRemindersHour {
kind: "OutputField",
name: "initiativeUpdateRemindersHour",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The month at which the fiscal year starts. Defaults to January (0).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.fiscalYearStartMonth` |
* | **Nullability** | Required |
*/
export interface fiscalYearStartMonth {
kind: "OutputField",
name: "fiscalYearStartMonth",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [Internal] The list of working days. Sunday is 0, Monday is 1, etc.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Float}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.workingDays` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface workingDays {
kind: "OutputField",
name: "workingDays",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.Float
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether SAML authentication is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.samlEnabled` |
* | **Nullability** | Required |
*/
export interface samlEnabled {
kind: "OutputField",
name: "samlEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] SAML settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.samlSettings` |
* | **Nullability** | Optional |
*/
export interface samlSettings {
kind: "OutputField",
name: "samlSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether SCIM provisioning is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.scimEnabled` |
* | **Nullability** | Required |
*/
export interface scimEnabled {
kind: "OutputField",
name: "scimEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] SCIM settings.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.scimSettings` |
* | **Nullability** | Optional |
*/
export interface scimSettings {
kind: "OutputField",
name: "scimSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Security settings for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.securitySettings` |
* | **Nullability** | Required |
*/
export interface securitySettings {
kind: "OutputField",
name: "securitySettings",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Allowed authentication providers, empty array means all are allowed.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.allowedAuthServices` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface allowedAuthServices {
kind: "OutputField",
name: "allowedAuthServices",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Allowed file upload content types
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.allowedFileUploadContentTypes` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface allowedFileUploadContentTypes {
kind: "OutputField",
name: "allowedFileUploadContentTypes",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* IP restriction configurations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.OrganizationIpRestriction}[] |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.ipRestrictions` |
* | **Nullability** | Optional |
* | **List** | Yes |
*/
export interface ipRestrictions {
kind: "OutputField",
name: "ipRestrictions",
arguments: {},
inlineType: [0, [1, ]],
namedType: $Schema.OrganizationIpRestriction
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The time at which deletion of the organization was requested.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.deletionRequestedAt` |
* | **Nullability** | Optional |
*/
export interface deletionRequestedAt {
kind: "OutputField",
name: "deletionRequestedAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The time at which the trial will end.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.trialEndsAt` |
* | **Nullability** | Optional |
*/
export interface trialEndsAt {
kind: "OutputField",
name: "trialEndsAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The time at which the trial started.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.trialStartsAt` |
* | **Nullability** | Optional |
*/
export interface trialStartsAt {
kind: "OutputField",
name: "trialStartsAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Previously used URL keys for the organization (last 3 are kept and redirected).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.previousUrlKeys` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface previousUrlKeys {
kind: "OutputField",
name: "previousUrlKeys",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether HIPAA compliance is enabled for organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.hipaaComplianceEnabled` |
* | **Nullability** | Required |
*/
export interface hipaaComplianceEnabled {
kind: "OutputField",
name: "hipaaComplianceEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [ALPHA] Theme settings for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.themeSettings` |
* | **Nullability** | Optional |
*/
export interface themeSettings {
kind: "OutputField",
name: "themeSettings",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The feature release channel the organization belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ReleaseChannel}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.releaseChannel` |
* | **Nullability** | Required |
*/
export interface releaseChannel {
kind: "OutputField",
name: "releaseChannel",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ReleaseChannel
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Configuration settings for the Customers feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.customersConfiguration` |
* | **Nullability** | Required |
*/
export interface customersConfiguration {
kind: "OutputField",
name: "customersConfiguration",
arguments: {},
inlineType: [1, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] Whether code intelligence is enabled for the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.codeIntelligenceEnabled` |
* | **Nullability** | Required |
*/
export interface codeIntelligenceEnabled {
kind: "OutputField",
name: "codeIntelligenceEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] GitHub repository in owner/repo format for code intelligence.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.codeIntelligenceRepository` |
* | **Nullability** | Optional |
*/
export interface codeIntelligenceRepository {
kind: "OutputField",
name: "codeIntelligenceRepository",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Default schedule for how often feed summaries are generated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.FeedSummarySchedule} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.defaultFeedSummarySchedule` |
* | **Nullability** | Optional |
*/
export interface defaultFeedSummarySchedule {
kind: "OutputField",
name: "defaultFeedSummarySchedule",
arguments: {},
inlineType: [0, ],
namedType: $Schema.FeedSummarySchedule
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the organization has enabled the feed feature.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.feedEnabled` |
* | **Nullability** | Required |
*/
export interface feedEnabled {
kind: "OutputField",
name: "feedEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether to hide other organizations for new users signing up with email domains claimed by this organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.hideNonPrimaryOrganizations` |
* | **Nullability** | Required |
*/
export interface hideNonPrimaryOrganizations {
kind: "OutputField",
name: "hideNonPrimaryOrganizations",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] Whether the organization has enabled the AI add-on (which at this point only includes triage suggestions).
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.aiAddonEnabled` |
* | **Nullability** | Required |
*/
export interface aiAddonEnabled {
kind: "OutputField",
name: "aiAddonEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] Whether the organization has enabled generated updates.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.generatedUpdatesEnabled` |
* | **Nullability** | Required |
*/
export interface generatedUpdatesEnabled {
kind: "OutputField",
name: "generatedUpdatesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the organization has enabled resolved thread AI summaries.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.aiThreadSummariesEnabled` |
* | **Nullability** | Required |
*/
export interface aiThreadSummariesEnabled {
kind: "OutputField",
name: "aiThreadSummariesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the organization has enabled AI discussion summaries for issues.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.aiDiscussionSummariesEnabled` |
* | **Nullability** | Required |
*/
export interface aiDiscussionSummariesEnabled {
kind: "OutputField",
name: "aiDiscussionSummariesEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] Configure per-modality AI host providers and model families.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.JSONObject} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.aiProviderConfiguration` |
* | **Nullability** | Optional |
*/
export interface aiProviderConfiguration {
kind: "OutputField",
name: "aiProviderConfiguration",
arguments: {},
inlineType: [0, ],
namedType: $Schema.JSONObject
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [DEPRECATED] Which day count to use for SLA calculations.
*
* @deprecated No longer in use
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.SLADayCountType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.slaDayCount` |
* | **⚠ Deprecated** | No longer in use |
* | **Nullability** | Required |
*/
export interface slaDayCount {
kind: "OutputField",
name: "slaDayCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.SLADayCountType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [DEPRECATED] The frequency at which to prompt for project updates.
*
* @deprecated Use organization.projectUpdatesReminderFrequencyInWeeks instead
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectUpdateReminderFrequency}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectUpdatesReminderFrequency` |
* | **⚠ Deprecated** | Use organization.projectUpdatesReminderFrequencyInWeeks instead |
* | **Nullability** | Required |
*/
export interface projectUpdatesReminderFrequency {
kind: "OutputField",
name: "projectUpdatesReminderFrequency",
arguments: {},
inlineType: [1, ],
namedType: $Schema.ProjectUpdateReminderFrequency
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [INTERNAL] Permitted AI providers.
*
* @deprecated Use aiProviderConfiguration instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.allowedAiProviders` |
* | **⚠ Deprecated** | Use aiProviderConfiguration instead. |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface allowedAiProviders {
kind: "OutputField",
name: "allowedAiProviders",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Users associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.users` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface users {
kind: "OutputField",
name: "users",
arguments: {
/**
* Should query return disabled/suspended users (default: false).
*/
includeDisabled: {
kind: "InputField",
name: "includeDisabled",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.UserConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Teams associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TeamConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.teams` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface teams {
kind: "OutputField",
name: "teams",
arguments: {
/**
* Filter returned teams.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.TeamFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.TeamConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The organization's project statuses.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectStatus}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectStatuses` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface projectStatuses {
kind: "OutputField",
name: "projectStatuses",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.ProjectStatus
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Integrations associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IntegrationConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.integrations` |
* | **Nullability** | Required |
* | **Arguments** | 6 |
*/
export interface integrations {
kind: "OutputField",
name: "integrations",
arguments: {
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IntegrationConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* The organization's subscription to a paid plan.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.PaidSubscription} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.subscription` |
* | **Nullability** | Optional |
*/
export interface subscription {
kind: "OutputField",
name: "subscription",
arguments: {},
inlineType: [0, ],
namedType: $Schema.PaidSubscription
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Number of active users in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.userCount` |
* | **Nullability** | Required |
*/
export interface userCount {
kind: "OutputField",
name: "userCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Aproximate number of issues in the organization, including archived ones.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.createdIssueCount` |
* | **Nullability** | Required |
*/
export interface createdIssueCount {
kind: "OutputField",
name: "createdIssueCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Templates associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.TemplateConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.templates` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface templates {
kind: "OutputField",
name: "templates",
arguments: {
/**
* Filter returned templates.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.NullableTemplateFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.TemplateConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Labels associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.IssueLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.labels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface labels {
kind: "OutputField",
name: "labels",
arguments: {
/**
* Filter returned issue labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.IssueLabelFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.IssueLabelConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Project labels associated with the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.ProjectLabelConnection}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | OutputObject ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.projectLabels` |
* | **Nullability** | Required |
* | **Arguments** | 7 |
*/
export interface projectLabels {
kind: "OutputField",
name: "projectLabels",
arguments: {
/**
* Filter returned project labels.
*/
filter: {
kind: "InputField",
name: "filter",
inlineType: [0, ],
namedType: $Schema.ProjectLabelFilter
},
/**
* A cursor to be used with last for backward pagination.
*/
before: {
kind: "InputField",
name: "before",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* A cursor to be used with first for forward pagination
*/
after: {
kind: "InputField",
name: "after",
inlineType: [0, ],
namedType: $Schema.String
},
/**
* The number of items to forward paginate (used with after). Defaults to 50.
*/
first: {
kind: "InputField",
name: "first",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* The number of items to backward paginate (used with before). Defaults to 50.
*/
last: {
kind: "InputField",
name: "last",
inlineType: [0, ],
namedType: $Schema.Int
},
/**
* Should archived resources be included (default: false)
*/
includeArchived: {
kind: "InputField",
name: "includeArchived",
inlineType: [0, ],
namedType: $Schema.Boolean
},
/**
* By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
*/
orderBy: {
kind: "InputField",
name: "orderBy",
inlineType: [0, ],
namedType: $Schema.PaginationOrderBy
}
},
inlineType: [1, ],
namedType: $Schema.ProjectLabelConnection
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Number of customers in the organization.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Int}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.customerCount` |
* | **Nullability** | Required |
*/
export interface customerCount {
kind: "OutputField",
name: "customerCount",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Int
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* Whether the organization is using Customers.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.customersEnabled` |
* | **Nullability** | Required |
*/
export interface customersEnabled {
kind: "OutputField",
name: "customersEnabled",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [DEPRECATED] Whether member users are allowed to send invites.
*
* @deprecated Use `securitySettings.invitationsRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.allowMembersToInvite` |
* | **⚠ Deprecated** | Use `securitySettings.invitationsRole` instead. |
* | **Nullability** | Optional |
*/
export interface allowMembersToInvite {
kind: "OutputField",
name: "allowMembersToInvite",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [DEPRECATED] Whether team creation is restricted to admins.
*
* @deprecated Use `securitySettings.teamCreationRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.restrictTeamCreationToAdmins` |
* | **⚠ Deprecated** | Use `securitySettings.teamCreationRole` instead. |
* | **Nullability** | Optional |
*/
export interface restrictTeamCreationToAdmins {
kind: "OutputField",
name: "restrictTeamCreationToAdmins",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.Organization}.
*
* [DEPRECATED] Whether workspace label creation, update, and deletion is restricted to admins.
*
* @deprecated Use `securitySettings.labelManagementRole` instead.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.Organization} |
* | **Path** | `Organization.restrictLabelManagementToAdmins` |
* | **⚠ Deprecated** | Use `securitySettings.labelManagementRole` instead. |
* | **Nullability** | Optional |
*/
export interface restrictLabelManagementToAdmins {
kind: "OutputField",
name: "restrictLabelManagementToAdmins",
arguments: {},
inlineType: [0, ],
namedType: $Schema.Boolean
}
