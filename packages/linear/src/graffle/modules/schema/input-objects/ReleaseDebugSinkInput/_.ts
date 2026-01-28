import type * as $Fields from './fields.js'

export * as ReleaseDebugSinkInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Debug sink for release creation diagnostics.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface ReleaseDebugSinkInput {
kind: "InputObject",
name: "ReleaseDebugSinkInput",
isAllFieldsNullable: true,
fields: {
inspectedShas: $Fields.inspectedShas,
issues: $Fields.issues,
pullRequests: $Fields.pullRequests,
includePaths: $Fields.includePaths
},
type: {
inspectedShas: $Fields.inspectedShas['type'],
issues: $Fields.issues['type'],
pullRequests: $Fields.pullRequests['type'],
includePaths?: $Fields.includePaths['type']
}
}