import type * as $Fields from './fields.js'

export * as TimeSchedule from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* A time schedule.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 10 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface TimeSchedule {
kind: "Object",
name: "TimeSchedule",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
name: $Fields.name,
entries: $Fields.entries,
externalId: $Fields.externalId,
externalUrl: $Fields.externalUrl,
organization: $Fields.organization,
integration: $Fields.integration
}
}