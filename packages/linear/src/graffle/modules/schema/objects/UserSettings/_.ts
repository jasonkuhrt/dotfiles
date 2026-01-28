import type * as $Fields from './fields.js'

export * as UserSettings from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* The settings of a user as a JSON object.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 19 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface UserSettings {
kind: "Object",
name: "UserSettings",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
notificationDeliveryPreferences: $Fields.notificationDeliveryPreferences,
unsubscribedFrom: $Fields.unsubscribedFrom,
user: $Fields.user,
calendarHash: $Fields.calendarHash,
subscribedToChangelog: $Fields.subscribedToChangelog,
subscribedToDPA: $Fields.subscribedToDPA,
subscribedToInviteAccepted: $Fields.subscribedToInviteAccepted,
subscribedToPrivacyLegalUpdates: $Fields.subscribedToPrivacyLegalUpdates,
feedSummarySchedule: $Fields.feedSummarySchedule,
showFullUserNames: $Fields.showFullUserNames,
feedLastSeenTime: $Fields.feedLastSeenTime,
autoAssignToSelf: $Fields.autoAssignToSelf,
notificationCategoryPreferences: $Fields.notificationCategoryPreferences,
notificationChannelPreferences: $Fields.notificationChannelPreferences,
theme: $Fields.theme
}
}