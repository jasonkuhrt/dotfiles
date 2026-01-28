import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL `__typename` meta-field. The name of the object type currently being queried.
*
* Type: `"AuthenticationSessionResponse"`
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
value: "AuthenticationSessionResponse"
}
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* The time at which the entity was created.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.createdAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.id` |
* | **Nullability** | Required |
*/
export interface id {
kind: "OutputField",
name: "id",
arguments: {},
inlineType: [1, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Type of application used to authenticate.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.AuthenticationSessionType}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlenumtype | Enum ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.type` |
* | **Nullability** | Required |
*/
export interface type {
kind: "OutputField",
name: "type",
arguments: {},
inlineType: [1, ],
namedType: $Schema.AuthenticationSessionType
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* IP address.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.ip` |
* | **Nullability** | Optional |
*/
export interface ip {
kind: "OutputField",
name: "ip",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Location country name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.locationCountry` |
* | **Nullability** | Optional |
*/
export interface locationCountry {
kind: "OutputField",
name: "locationCountry",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Location country code.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.locationCountryCode` |
* | **Nullability** | Optional |
*/
export interface locationCountryCode {
kind: "OutputField",
name: "locationCountryCode",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Country codes of all seen locations.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}[]! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.countryCodes` |
* | **Nullability** | Required |
* | **List** | Yes |
*/
export interface countryCodes {
kind: "OutputField",
name: "countryCodes",
arguments: {},
inlineType: [1, [1, ]],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Location region code.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.locationRegionCode` |
* | **Nullability** | Optional |
*/
export interface locationRegionCode {
kind: "OutputField",
name: "locationRegionCode",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Location city name.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.locationCity` |
* | **Nullability** | Optional |
*/
export interface locationCity {
kind: "OutputField",
name: "locationCity",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Session's user-agent.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.userAgent` |
* | **Nullability** | Optional |
*/
export interface userAgent {
kind: "OutputField",
name: "userAgent",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Used web browser.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.browserType` |
* | **Nullability** | Optional |
*/
export interface browserType {
kind: "OutputField",
name: "browserType",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Service used for logging in.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.service` |
* | **Nullability** | Optional |
*/
export interface service {
kind: "OutputField",
name: "service",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* When was the session last seen
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.lastActiveAt` |
* | **Nullability** | Optional |
*/
export interface lastActiveAt {
kind: "OutputField",
name: "lastActiveAt",
arguments: {},
inlineType: [0, ],
namedType: $Schema.DateTime
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Date when the session was last updated.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.updatedAt` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Human readable location
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.location` |
* | **Nullability** | Optional |
*/
export interface location {
kind: "OutputField",
name: "location",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Operating system used for the session
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.operatingSystem` |
* | **Nullability** | Optional |
*/
export interface operatingSystem {
kind: "OutputField",
name: "operatingSystem",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Client used for the session
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.client` |
* | **Nullability** | Optional |
*/
export interface client {
kind: "OutputField",
name: "client",
arguments: {},
inlineType: [0, ],
namedType: $Schema.String
}

/**
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Name of the session, derived from the client and operating system
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.name` |
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
* GraphQL {@link https://graphql.org/learn/queries/#fields | output field} ↗ on type {@link $Schema.AuthenticationSessionResponse}.
*
* Identifies the session used to make the request.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.Boolean}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AuthenticationSessionResponse} |
* | **Path** | `AuthenticationSessionResponse.isCurrentSession` |
* | **Nullability** | Required |
*/
export interface isCurrentSession {
kind: "OutputField",
name: "isCurrentSession",
arguments: {},
inlineType: [1, ],
namedType: $Schema.Boolean
}
