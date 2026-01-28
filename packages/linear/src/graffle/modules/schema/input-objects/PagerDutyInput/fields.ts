import type { Schema as $Schema } from '../../_.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | input field} ↗ on type {@link $Schema.PagerDutyInput}.
*
* The date when the PagerDuty API failed with an unauthorized error.
*
* # Info
*
* | | |
* | - | - |
* | **Type** | {@link $Schema.DateTime} |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlscalartype | ScalarCustom ↗} |
* | **Parent** | {@link $Schema.PagerDutyInput} |
* | **Path** | `PagerDutyInput.apiFailedWithUnauthorizedErrorAt` |
* | **Nullability** | Optional |
*/
export interface apiFailedWithUnauthorizedErrorAt {
kind: "InputField",
name: "apiFailedWithUnauthorizedErrorAt",
inlineType: [0, ],
namedType: $Schema.DateTime,
type: $Schema.DateTime['codec']['_typeDecoded'] | null | undefined
}