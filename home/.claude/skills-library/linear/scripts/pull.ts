#!/usr/bin/env bun
/**
 * Pull Linear workspace data and cache locally.
 *
 * Usage:
 *   bun ~/.claude/skills/linear/scripts/pull.ts
 *
 * Fetches teams, workflow states, labels, and users from Linear API
 * and writes to .claude/tmp/linear/workspace.yaml
 */
import { client } from '/Users/jasonkuhrt/projects/jasonkuhrt/dotfiles/packages/linear/src/client.ts'
import { parseArgs } from 'node:util'
import * as fs from 'node:fs'
import * as path from 'node:path'
import YAML from 'yaml'

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    help: { type: `boolean`, short: `h` },
  },
  allowPositionals: false,
})

if (values.help) {
  console.log(`Usage: bun ~/.claude/skills/linear/scripts/pull.ts

Pulls workspace data from Linear API and caches to .claude/tmp/linear/workspace.yaml

This includes:
  - Organization metadata
  - Teams with workflow states and labels
  - Users (for mention mapping)

Run this when setting up a new project or when workspace data changes.
`)
  process.exit(0)
}

// Fetch organization
const org = await client.query.organization({
  id: true,
  name: true,
  urlKey: true,
})

if (!org) {
  console.error(`Error: Could not fetch organization data`)
  process.exit(1)
}

// Fetch all teams with their states and labels
const teamsResult = await client.query.teams({
  nodes: {
    id: true,
    key: true,
    name: true,
    states: {
      nodes: {
        id: true,
        name: true,
        type: true,
        position: true,
      },
    },
    labels: {
      nodes: {
        id: true,
        name: true,
      },
    },
  },
})

// Fetch all users
const usersResult = await client.query.users({
  nodes: {
    id: true,
    name: true,
    displayName: true,
    email: true,
    active: true,
  },
})

// Build cache data
const cacheData = {
  workspace: org.urlKey,
  organization: {
    id: org.id,
    name: org.name,
  },
  teams: teamsResult.nodes.map((team) => ({
    id: team.id,
    key: team.key,
    name: team.name,
    states: team.states.nodes
      .sort((a, b) => a.position - b.position)
      .map((state) => ({
        id: state.id,
        name: state.name,
        type: state.type,
        position: state.position,
      })),
    labels: team.labels.nodes.map((label) => ({
      id: label.id,
      name: label.name,
    })),
  })),
  users: usersResult.nodes
    .filter((user) => user.active)
    .map((user) => ({
      id: user.id,
      name: user.name,
      displayName: user.displayName,
      email: user.email,
    })),
  pulledAt: new Date().toISOString(),
}

// Write to cache file
const cacheDir = path.join(process.cwd(), `.claude/tmp/linear`)
const cachePath = path.join(cacheDir, `workspace.yaml`)

fs.mkdirSync(cacheDir, { recursive: true })
fs.writeFileSync(cachePath, YAML.stringify(cacheData))

// Output summary
const totalStates = cacheData.teams.reduce((sum, team) => sum + team.states.length, 0)
const totalLabels = cacheData.teams.reduce((sum, team) => sum + team.labels.length, 0)
const teamNames = cacheData.teams.map((t) => t.name).join(`, `)

console.log(`Pulled workspace data for ${cacheData.workspace}`)
console.log(`  Teams: ${cacheData.teams.length} (${teamNames})`)
console.log(`  Users: ${cacheData.users.length}`)
console.log(`  Total states: ${totalStates}`)
console.log(`  Total labels: ${totalLabels}`)
console.log(`Written to ${cachePath}`)
