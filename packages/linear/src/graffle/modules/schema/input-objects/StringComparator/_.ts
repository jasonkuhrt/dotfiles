import type * as $Fields from './fields.js'

export * as StringComparator from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Comparator for strings.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 16 |
* | **All Fields Nullable** | Yes |
*/
export interface StringComparator {
kind: "InputObject",
name: "StringComparator",
isAllFieldsNullable: true,
fields: {
eq: $Fields.eq,
neq: $Fields.neq,
in: $Fields.in,
nin: $Fields.nin,
eqIgnoreCase: $Fields.eqIgnoreCase,
neqIgnoreCase: $Fields.neqIgnoreCase,
startsWith: $Fields.startsWith,
startsWithIgnoreCase: $Fields.startsWithIgnoreCase,
notStartsWith: $Fields.notStartsWith,
endsWith: $Fields.endsWith,
notEndsWith: $Fields.notEndsWith,
contains: $Fields.contains,
containsIgnoreCase: $Fields.containsIgnoreCase,
notContains: $Fields.notContains,
notContainsIgnoreCase: $Fields.notContainsIgnoreCase,
containsIgnoreCaseAndAccent: $Fields.containsIgnoreCaseAndAccent
},
type: {
eq?: $Fields.eq['type'],
neq?: $Fields.neq['type'],
in?: $Fields.in['type'],
nin?: $Fields.nin['type'],
eqIgnoreCase?: $Fields.eqIgnoreCase['type'],
neqIgnoreCase?: $Fields.neqIgnoreCase['type'],
startsWith?: $Fields.startsWith['type'],
startsWithIgnoreCase?: $Fields.startsWithIgnoreCase['type'],
notStartsWith?: $Fields.notStartsWith['type'],
endsWith?: $Fields.endsWith['type'],
notEndsWith?: $Fields.notEndsWith['type'],
contains?: $Fields.contains['type'],
containsIgnoreCase?: $Fields.containsIgnoreCase['type'],
notContains?: $Fields.notContains['type'],
notContainsIgnoreCase?: $Fields.notContainsIgnoreCase['type'],
containsIgnoreCaseAndAccent?: $Fields.containsIgnoreCaseAndAccent['type']
}
}