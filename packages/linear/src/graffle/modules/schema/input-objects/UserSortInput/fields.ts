import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSortInput}.
*
* Sort by user name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserNameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserSortInput} |
* | **Path** | `UserSortInput.name` |
* | **Nullability** | Optional |
*/
export interface name {
kind: "InputField",
name: "name",
inlineType: [0, ],
namedType: $Schema.UserNameSort,
type: $Schema.UserNameSort['type'] | null | undefined
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.UserSortInput}.
*
* Sort by user display name
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.UserDisplayNameSort} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Parent** | {@link $Schema.UserSortInput} |
* | **Path** | `UserSortInput.displayName` |
* | **Nullability** | Optional |
*/
export interface displayName {
kind: "InputField",
name: "displayName",
inlineType: [0, ],
namedType: $Schema.UserDisplayNameSort,
type: $Schema.UserDisplayNameSort['type'] | null | undefined
}