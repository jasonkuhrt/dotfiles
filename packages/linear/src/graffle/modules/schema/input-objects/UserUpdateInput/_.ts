import type * as $Fields from './fields.js'

export * as UserUpdateInput from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 8 |
* | **All Fields Nullable** | Yes |
*/
export interface UserUpdateInput {
kind: "InputObject",
name: "UserUpdateInput",
isAllFieldsNullable: true,
fields: {
name: $Fields.name,
displayName: $Fields.displayName,
avatarUrl: $Fields.avatarUrl,
description: $Fields.description,
statusEmoji: $Fields.statusEmoji,
statusLabel: $Fields.statusLabel,
statusUntilAt: $Fields.statusUntilAt,
timezone: $Fields.timezone
},
type: {
name?: $Fields.name['type'],
displayName?: $Fields.displayName['type'],
avatarUrl?: $Fields.avatarUrl['type'],
description?: $Fields.description['type'],
statusEmoji?: $Fields.statusEmoji['type'],
statusLabel?: $Fields.statusLabel['type'],
statusUntilAt?: $Fields.statusUntilAt['type'],
timezone?: $Fields.timezone['type']
}
}