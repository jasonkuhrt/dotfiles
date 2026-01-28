import type * as $Fields from './fields.js'

export * as EmojiCreateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 3 |
* | **All Fields Nullable** | Yes |
*/
export interface EmojiCreateInput {
kind: "InputObject",
name: "EmojiCreateInput",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
name: $Fields.name,
url: $Fields.url
},
type: {
id?: $Fields.id['type'],
name: $Fields.name['type'],
url: $Fields.url['type']
}
}