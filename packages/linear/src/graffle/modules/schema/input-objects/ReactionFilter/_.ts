import type * as $Fields from './fields.js'

export * as ReactionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* Reaction filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 7 |
* | **All Fields Nullable** | Yes |
*/
export interface ReactionFilter {
kind: "InputObject",
name: "ReactionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
emoji: $Fields.emoji,
customEmojiId: $Fields.customEmojiId,
and: $Fields.and,
or: $Fields.or
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
emoji?: $Fields.emoji['type'],
customEmojiId?: $Fields.customEmojiId['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type']
}
}