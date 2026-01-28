import type * as $Fields from './fields.js'

export * as IssueIDComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for issue identifiers.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 4 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueIDComparator {
kind: "InputObject",
name: "IssueIDComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq,
in: $Fields.in,
nin: $Fields.nin
},
type: {
eq?: $Fields.eq['type'],
neq?: $Fields.neq['type'],
in?: $Fields.in['type'],
nin?: $Fields.nin['type']
}
}