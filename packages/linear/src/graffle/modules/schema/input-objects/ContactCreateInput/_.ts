import type * as $Fields from './fields.js'

export * as ContactCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ContactCreateInput {
kind: "InputObject",
name: "ContactCreateInput",
isAllFieldsNullable: true,
fields: {
type: $Fields.type,
message: $Fields.message,
operatingSystem: $Fields.operatingSystem,
browser: $Fields.browser,
device: $Fields.device,
clientVersion: $Fields.clientVersion,
disappointmentRating: $Fields.disappointmentRating
},
type: {
type: $Fields.type['type'],
message: $Fields.message['type'],
operatingSystem?: $Fields.operatingSystem['type'],
browser?: $Fields.browser['type'],
device?: $Fields.device['type'],
clientVersion?: $Fields.clientVersion['type'],
disappointmentRating?: $Fields.disappointmentRating['type']
}
}