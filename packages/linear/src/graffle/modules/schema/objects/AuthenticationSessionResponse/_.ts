import type * as $Fields from './fields.js'

export * as AuthenticationSessionResponse from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* Authentication session information.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 19 |
*/
export interface AuthenticationSessionResponse {
kind: "Object",
name: "AuthenticationSessionResponse",
fields: {
__typename: $Fields.__typename,
createdAt: $Fields.createdAt,
id: $Fields.id,
type: $Fields.type,
ip: $Fields.ip,
locationCountry: $Fields.locationCountry,
locationCountryCode: $Fields.locationCountryCode,
countryCodes: $Fields.countryCodes,
locationRegionCode: $Fields.locationRegionCode,
locationCity: $Fields.locationCity,
userAgent: $Fields.userAgent,
browserType: $Fields.browserType,
service: $Fields.service,
lastActiveAt: $Fields.lastActiveAt,
updatedAt: $Fields.updatedAt,
location: $Fields.location,
operatingSystem: $Fields.operatingSystem,
client: $Fields.client,
name: $Fields.name,
isCurrentSession: $Fields.isCurrentSession
}
}