import type * as $Fields from './fields.js'

export * as JiraProjectDataInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | No |
*/
export interface JiraProjectDataInput {
kind: "InputObject",
name: "JiraProjectDataInput",
isAllFieldsNullable: false,
fields: {
id: $Fields.id,
key: $Fields.key,
name: $Fields.name
},
type: {
id: $Fields.id['type'],
key: $Fields.key['type'],
name: $Fields.name['type']
}
}