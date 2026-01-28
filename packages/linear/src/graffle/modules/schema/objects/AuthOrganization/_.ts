import type * as $Fields from './fields.js'

export * as AuthOrganization from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* An organization. Organizations are root-level objects that contain users and teams.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 17 |
*/
export interface AuthOrganization {
kind: "Object",
name: "AuthOrganization",
fields: {
__typename: $Fields.__typename,
createdAt: $Fields.createdAt,
id: $Fields.id,
name: $Fields.name,
enabled: $Fields.enabled,
urlKey: $Fields.urlKey,
previousUrlKeys: $Fields.previousUrlKeys,
logoUrl: $Fields.logoUrl,
deletionRequestedAt: $Fields.deletionRequestedAt,
releaseChannel: $Fields.releaseChannel,
samlEnabled: $Fields.samlEnabled,
samlSettings: $Fields.samlSettings,
allowedAuthServices: $Fields.allowedAuthServices,
scimEnabled: $Fields.scimEnabled,
serviceId: $Fields.serviceId,
region: $Fields.region,
hideNonPrimaryOrganizations: $Fields.hideNonPrimaryOrganizations,
userCount: $Fields.userCount
}
}