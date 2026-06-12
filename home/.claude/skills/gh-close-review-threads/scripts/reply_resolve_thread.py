#!/usr/bin/env python3
"""Reply to a GitHub PR review thread and optionally resolve it."""

from __future__ import annotations

import argparse
import subprocess
import sys


REPLY_MUTATION = """
mutation($threadId: ID!, $body: String!) {
  addPullRequestReviewThreadReply(
    input: { pullRequestReviewThreadId: $threadId, body: $body }
  ) {
    comment {
      url
    }
  }
}
"""

RESOLVE_MUTATION = """
mutation($threadId: ID!) {
  resolveReviewThread(input: { threadId: $threadId }) {
    thread {
      id
      isResolved
    }
  }
}
"""


def run_graphql(*fields: str) -> str:
    result = subprocess.run(
        ["gh", "api", "graphql", *fields],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    return result.stdout.strip()


def read_body(args: argparse.Namespace) -> str:
    if args.body is not None:
        return args.body
    if args.body_file is not None:
        with open(args.body_file, "r", encoding="utf-8") as file:
            return file.read()
    if not sys.stdin.isatty():
        return sys.stdin.read()
    return ""


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Reply to a GitHub PR review thread and resolve it.",
    )
    parser.add_argument("--thread-id", required=True)
    parser.add_argument("--body")
    parser.add_argument("--body-file")
    parser.add_argument(
        "--no-resolve",
        action="store_true",
        help="Reply without marking the review thread resolved.",
    )
    args = parser.parse_args()

    body = read_body(args).strip()
    if body == "":
        parser.error("provide --body, --body-file, or stdin")

    reply = run_graphql(
        "-f",
        f"query={REPLY_MUTATION}",
        "-f",
        f"threadId={args.thread_id}",
        "-f",
        f"body={body}",
        "--jq",
        ".addPullRequestReviewThreadReply.comment.url",
    )
    print(reply)

    if not args.no_resolve:
        resolved = run_graphql(
            "-f",
            f"query={RESOLVE_MUTATION}",
            "-f",
            f"threadId={args.thread_id}",
            "--jq",
            ".resolveReviewThread.thread.isResolved",
        )
        print(f"resolved={resolved}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
