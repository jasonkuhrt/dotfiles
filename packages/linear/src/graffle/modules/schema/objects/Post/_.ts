import type * as $Fields from './fields.js'

export * as Post from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#object-types | Object} type.
*
* [Internal] A generic post.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlobjecttype | Object ↗} |
* | **Fields** | 19 |
* | **Implements** | {@link $Schema.Node} |
*/
export interface Post {
kind: "Object",
name: "Post",
fields: {
__typename: $Fields.__typename,
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
archivedAt: $Fields.archivedAt,
body: $Fields.body,
bodyData: $Fields.bodyData,
writtenSummaryData: $Fields.writtenSummaryData,
audioSummary: $Fields.audioSummary,
title: $Fields.title,
slugId: $Fields.slugId,
creator: $Fields.creator,
editedAt: $Fields.editedAt,
reactionData: $Fields.reactionData,
ttlUrl: $Fields.ttlUrl,
user: $Fields.user,
team: $Fields.team,
type: $Fields.type,
evalLogId: $Fields.evalLogId,
feedSummaryScheduleAtCreate: $Fields.feedSummaryScheduleAtCreate
}
}