import type * as $Fields from './fields.js'

export * as PartialNotificationChannelPreferencesInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface PartialNotificationChannelPreferencesInput {
kind: "InputObject",
name: "PartialNotificationChannelPreferencesInput",
isAllFieldsNullable: true,
fields: {
mobile: $Fields.mobile,
desktop: $Fields.desktop,
email: $Fields.email,
slack: $Fields.slack
},
type: {
mobile?: $Fields.mobile['type'],
desktop?: $Fields.desktop['type'],
email?: $Fields.email['type'],
slack?: $Fields.slack['type']
}
}