import type * as $Fields from './fields.js'

export * as UserSettingsUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 13 |
* | **All Fields Nullable** | Yes |
*/
export interface UserSettingsUpdateInput {
kind: "InputObject",
name: "UserSettingsUpdateInput",
isAllFieldsNullable: true,
fields: {
settings: $Fields.settings,
unsubscribedFrom: $Fields.unsubscribedFrom,
subscribedToChangelog: $Fields.subscribedToChangelog,
subscribedToDPA: $Fields.subscribedToDPA,
subscribedToInviteAccepted: $Fields.subscribedToInviteAccepted,
subscribedToPrivacyLegalUpdates: $Fields.subscribedToPrivacyLegalUpdates,
subscribedToGeneralMarketingCommunications: $Fields.subscribedToGeneralMarketingCommunications,
notificationCategoryPreferences: $Fields.notificationCategoryPreferences,
notificationChannelPreferences: $Fields.notificationChannelPreferences,
notificationDeliveryPreferences: $Fields.notificationDeliveryPreferences,
usageWarningHistory: $Fields.usageWarningHistory,
feedSummarySchedule: $Fields.feedSummarySchedule,
feedLastSeenTime: $Fields.feedLastSeenTime
},
type: {
settings?: $Fields.settings['type'],
unsubscribedFrom?: $Fields.unsubscribedFrom['type'],
subscribedToChangelog?: $Fields.subscribedToChangelog['type'],
subscribedToDPA?: $Fields.subscribedToDPA['type'],
subscribedToInviteAccepted?: $Fields.subscribedToInviteAccepted['type'],
subscribedToPrivacyLegalUpdates?: $Fields.subscribedToPrivacyLegalUpdates['type'],
subscribedToGeneralMarketingCommunications?: $Fields.subscribedToGeneralMarketingCommunications['type'],
notificationCategoryPreferences?: $Fields.notificationCategoryPreferences['type'],
notificationChannelPreferences?: $Fields.notificationChannelPreferences['type'],
notificationDeliveryPreferences?: $Fields.notificationDeliveryPreferences['type'],
usageWarningHistory?: $Fields.usageWarningHistory['type'],
feedSummarySchedule?: $Fields.feedSummarySchedule['type'],
feedLastSeenTime?: $Fields.feedLastSeenTime['type']
}
}