import type * as $Fields from './fields.js'

export * as IssueSuggestionCollectionFilter from './fields.js'

/**
* GraphQL {@link https://graphql.org/learn/schema/#input-types | InputObject}.
*
* IssueSuggestion collection filtering options.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqlinputobjecttype | InputObject ↗} |
* | **Fields** | 14 |
* | **All Fields Nullable** | Yes |
*/
export interface IssueSuggestionCollectionFilter {
kind: "InputObject",
name: "IssueSuggestionCollectionFilter",
isAllFieldsNullable: true,
fields: {
id: $Fields.id,
createdAt: $Fields.createdAt,
updatedAt: $Fields.updatedAt,
type: $Fields.type,
state: $Fields.state,
suggestedUser: $Fields.suggestedUser,
suggestedProject: $Fields.suggestedProject,
suggestedTeam: $Fields.suggestedTeam,
suggestedLabel: $Fields.suggestedLabel,
and: $Fields.and,
or: $Fields.or,
some: $Fields.some,
every: $Fields.every,
length: $Fields.length
},
type: {
id?: $Fields.id['type'],
createdAt?: $Fields.createdAt['type'],
updatedAt?: $Fields.updatedAt['type'],
type?: $Fields.type['type'],
state?: $Fields.state['type'],
suggestedUser?: $Fields.suggestedUser['type'],
suggestedProject?: $Fields.suggestedProject['type'],
suggestedTeam?: $Fields.suggestedTeam['type'],
suggestedLabel?: $Fields.suggestedLabel['type'],
and?: $Fields.and['type'],
or?: $Fields.or['type'],
some?: $Fields.some['type'],
every?: $Fields.every['type'],
length?: $Fields.length['type']
}
}