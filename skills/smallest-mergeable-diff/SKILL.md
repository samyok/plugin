---
name: smallest-mergeable-diff
description: Invoke when planning or shaping any code change for Samyok before the first push, and again whenever he asks "why is the diff so large", "why do we need this", "simplify", "make it smaller", "reuse", "nuke that" or asks for a "simpler PR". Optimizes the change for how likely it is to get merged.
---

# Smallest mergeable diff

His stated objective, verbatim: "we're optimizing for how likely this stack is to get merged into prod ... so we should optimize for a) min diff needed but also b) reasonable code."

## Before writing code

1. Find the nearest existing implementation of the same thing (another trigger type, another MCP integration, another settings page) and copy its structure. If he names a reference ("do it exactly like m365"), mirror it file by file and do not invent a different shape.
2. Write a three-line plan: files touched, rough line count, what is reused. If the estimate is over about 400 changed lines for one PR, split it or cut scope before starting and tell him what you cut.
3. Prefer an 80/20 that avoids touching shared packages (design system, common models) when the full version would need them. Offer the 80/20 first.

## While writing

4. No unused code: no helpers, parameters, columns, flags, endpoints or types "for later". Everything added must have a caller in the same PR.
5. No backward-compatibility shims, backfills or dual-write paths unless he asked for them or a migration rule in `AGENTS.md` requires them. Ask in one line if unsure; he often answers "we don't need to backfill" or "assume we don't have to maintain backcompat".
6. Do not rewrite or rename existing functions you only needed to call. Out-of-scope refactors go in a separate PR, proposed, not done.
7. Scope special behavior with the existing switch (an existing flag or prop) instead of adding a new parameter or a new code path.
8. State lives where it already has an owner. UI selection comes from the URL or from server/session data already loaded; never from `localStorage` or `sessionStorage`. Before adding any stored state, answer "where is this stored and why there" in the PR body.
9. No new per-row queries, subqueries on hot list endpoints or request waterfalls. If the change adds a query to a hot path, say what it costs and what the flag-off path does.

## Before pushing

10. Run `git diff --merge-base origin/main --stat` and read the total. For every file, ask "does this PR fail without this file's change?" If not, revert that file.
11. If the diff grew after feedback, say why in one line before he asks. A follow-up round should shrink the diff or hold it flat.
12. When a PR has become large and contested, propose a fresh, simpler PR off main that fixes only the underlying issue, instead of continuing to patch the large one. If the right fix is mostly a revert, make it a revert.
13. When splitting is needed, split by reviewability: schema first, then the thin layer, then UI. Each PR must be mergeable on its own unless a migration forces an order; state the merge order in each PR body.

## Reporting

14. Report the size in the done message: "N files, +A/-D". If you could not get it small, say what makes it irreducible.
