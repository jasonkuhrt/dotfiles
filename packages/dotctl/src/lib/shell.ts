import { spawn, spawnSync } from "node:child_process"

export interface CommandOptions {
  readonly cwd?: string
  readonly env?: NodeJS.ProcessEnv
  readonly stdin?: string
  readonly allowFailure?: boolean
}

export interface CommandResult {
  readonly argv: readonly string[]
  readonly exitCode: number
  readonly stdout: string
  readonly stderr: string
}

export class CommandError extends Error {
  readonly result: CommandResult

  constructor(result: CommandResult) {
    super(`Command failed (${result.exitCode}): ${result.argv.join(" ")}`)
    this.result = result
  }
}

export const runCommand = (argv: readonly string[], options: CommandOptions = {}): CommandResult => {
  const [command, ...args] = argv
  if (!command) throw new Error("runCommand requires argv[0]")

  const result = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    input: options.stdin,
    encoding: "utf8",
  })

  if (result.error) throw result.error

  const payload: CommandResult = {
    argv,
    exitCode: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  }

  if (!options.allowFailure && payload.exitCode !== 0) {
    throw new CommandError(payload)
  }

  return payload
}

export const runInteractive = async (
  argv: readonly string[],
  options: Omit<CommandOptions, "stdin" | "allowFailure"> = {},
): Promise<number> => {
  const [command, ...args] = argv
  if (!command) throw new Error("runInteractive requires argv[0]")

  const child = spawn(command, args, {
    cwd: options.cwd,
    env: options.env,
    stdio: "inherit",
  })

  const exitCode = await new Promise<number>((resolve, reject) => {
    child.once("error", reject)
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Process exited via signal ${signal}`))
        return
      }
      resolve(code ?? 1)
    })
  })

  return exitCode
}
