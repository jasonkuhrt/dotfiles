import type * as $Fields from './fields.js'

export * as RootIssueSort from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Issue root-issue sorting options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface RootIssueSort {
kind: "InputObject",
name: "RootIssueSort",
isAllFieldsNullable: true,
fields: {
nulls: $Fields.nulls,
order: $Fields.order,
sort: $Fields.sort
},
type: {
nulls?: $Fields.nulls['type'],
order?: $Fields.order['type'],
sort: $Fields.sort['type']
}
}