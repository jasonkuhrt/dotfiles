import { client } from './client.js'

const identifierPattern = /^[A-Z]+-\d+$/

export const isUuid = (input: string): boolean =>
  input.includes(`-`) && input.length > 10 && !identifierPattern.test(input)

/**
 * Resolve an issue input (identifier like ENG-123 or UUID) to its core fields.
 *
 * Uses direct API lookup for UUIDs and searchIssues for identifiers.
 * This prevents the bug where searchIssues text-matches a UUID against
 * the wrong issue's content.
 */
export const resolveIssueId = async (
  input: string,
): Promise<{ id: string; identifier: string; teamKey: string }> => {
  if (isUuid(input)) {
    const issue = await client.query.issue({
      $: { id: input },
      id: true,
      identifier: true,
      team: { key: true },
    })
    if (!issue) {
      throw new Error(`Issue not found: ${input}`)
    }
    return { id: issue.id, identifier: issue.identifier, teamKey: issue.team.key }
  }

  const results = await client.query.searchIssues({
    $: { term: input, first: 1 },
    nodes: {
      id: true,
      identifier: true,
      team: { key: true },
    },
  })

  if (results.nodes.length === 0) {
    throw new Error(`Issue not found: ${input}`)
  }

  const issue = results.nodes[0]
  return { id: issue.id, identifier: issue.identifier, teamKey: issue.team.key }
}
