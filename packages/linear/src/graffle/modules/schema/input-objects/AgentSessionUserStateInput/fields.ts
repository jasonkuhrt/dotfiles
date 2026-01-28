import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUserStateInput}.
*
* The ID of the user this state belongs to.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.String}! |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#scalars | ScalarStandard ↗} |
* | **Parent** | {@link $Schema.AgentSessionUserStateInput} |
* | **Path** | `AgentSessionUserStateInput.userId` |
* | **Nullability** | Required |
*/
export interface userId {
kind: "InputField",
name: "userId",
inlineType: [1, ],
namedType: $Schema.String,
type: $Schema.String['codec']['_typeDecoded']
}
/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.AgentSessionUserStateInput}.
*
* The time at which the user most recently viewed the session.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.AgentSessionUserStateInput} |
* | **Path** | `AgentSessionUserStateInput.lastReadAt` |
* | **Nullability** | Optional |
*/
export interface lastReadAt {
kind: "InputField",
name: "lastReadAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}