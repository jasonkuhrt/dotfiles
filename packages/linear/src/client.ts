import { Graffle } from './graffle/_.js'

const token = process.env[`LINEAR_API_TOKEN`]

if (!token) {
  throw new Error(`LINEAR_API_TOKEN environment variable is required`)
}

export const client = Graffle
  .create()
  .transport({
    headers: {
      authorization: token,
    },
  })
