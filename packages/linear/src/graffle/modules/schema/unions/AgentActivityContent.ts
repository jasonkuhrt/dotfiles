import type { AgentActivityThoughtContent } from '../objects/AgentActivityThoughtContent/_.js'
import type { AgentActivityActionContent } from '../objects/AgentActivityActionContent/_.js'
import type { AgentActivityResponseContent } from '../objects/AgentActivityResponseContent/_.js'
import type { AgentActivityPromptContent } from '../objects/AgentActivityPromptContent/_.js'
import type { AgentActivityErrorContent } from '../objects/AgentActivityErrorContent/_.js'
import type { AgentActivityElicitationContent } from '../objects/AgentActivityElicitationContent/_.js'

/**
* GraphQL {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union}.
*
* Content for different types of agent activities.
*
* # Info
*
* | | |
* | - | - |
* | **Kind** | {@link https://graphql.org/graphql-js/type/#graphqluniontype | Union ↗} |
* | **Members** | 6 |
* | **Types** | {@link $Schema.AgentActivityThoughtContent}, {@link $Schema.AgentActivityActionContent}, {@link $Schema.AgentActivityResponseContent}, {@link $Schema.AgentActivityPromptContent}, {@link $Schema.AgentActivityErrorContent}, {@link $Schema.AgentActivityElicitationContent} |
*/
export interface AgentActivityContent {
kind: "Union",
name: "AgentActivityContent",
members: [AgentActivityThoughtContent, AgentActivityActionContent, AgentActivityResponseContent, AgentActivityPromptContent, AgentActivityErrorContent, AgentActivityElicitationContent],
membersUnion: AgentActivityThoughtContent
| AgentActivityActionContent
| AgentActivityResponseContent
| AgentActivityPromptContent
| AgentActivityErrorContent
| AgentActivityElicitationContent,
membersIndex: {
AgentActivityThoughtContent: AgentActivityThoughtContent,
AgentActivityActionContent: AgentActivityActionContent,
AgentActivityResponseContent: AgentActivityResponseContent,
AgentActivityPromptContent: AgentActivityPromptContent,
AgentActivityErrorContent: AgentActivityErrorContent,
AgentActivityElicitationContent: AgentActivityElicitationContent
}
}