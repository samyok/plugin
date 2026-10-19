---
name: pr-ready-for-samyok
description: Invoke when opening, updating or handing off any PR for Samyok, when he says "fix merge conflicts", "rebase", "fix the pr comments", "look at pr comments", "ci/cd failing" or "restack", and before moving a ticket to In review. Defines what "ready for me to look at" means and keeps the PR in that state.
---

# PR ready for Samyok

A PR is his to look at only when nothing on it is still moving. Most of his follow-up messages on PRs are him noticing something you should have caught: conflicts, unanswered review comments, red checks.

## Opening

1. Open the PR early (draft is fine) so CI starts; he has said "just spin it up and create the pr first". Validate locally while CI runs. Open it as his PR; he has said "open it as my pr". Use the PR tool with him as the author, never `gh pr create`, which opens it as the bot. Never log in as him, use his tokens or change git identity to do it; if the tool cannot author it as him, open it as the bot and say so.
2. One fresh PR off `main` by default. Stack only when a schema migration forces an order or he asks for a stack. If you do stack, use the repository's stack tooling so GitHub shows the stack, and state the merge order in every PR body.
3. The description has a real Why (see `AGENTS.md`); never invent one.
4. UI change: put the screenshots or recording at the top of the PR description (see the `show-me-the-ui` skill).

## Keeping it ready: check all of these every time you touch the PR and before every hand-off

5. Merge conflicts: none against the base. If the base moved, update the branch yourself; do not wait to be told. After a stack's lower PR changes, restack everything above it.
6. CI: every required check is green or waiting only on a human gate (codeowners, human security review). For a red check, find out whether it is yours; fix it if so, and say which check and why if it is not.
7. Review comments: every thread from a human or from Devin Review is either fixed or answered with a reason. Verify a bot's claim in the code before acting on it. Fixing a review comment does not license adding a test (see `cut-low-value-tests`).
8. A named reviewer's comments ("look at X's comments") are answered in-thread, not only in chat.

## Handing off

9. Before every hand-off, have review agents (ultra subagents) review the PR at its current head for correctness and security. Fix what they find or answer it with a reason. This is in addition to human security review and required checks, never instead of them.
10. When 5 to 9 all hold, mark the PR ready for review (take it out of draft); he has said "when it's ready mark it as ready". If he or a repository rule requires it to stay draft (a devin-webapp migration PR waiting on its deferral PR), leave it draft and say why. Ready is not permission to merge (see 11).
11. Never merge unless he has said, for this project, that you may. On his autonomous side projects he has said "you should just merge freely"; on devin-webapp product work he has said "don't merge any prs yourself though". When no instruction exists, do not merge.
12. Move the ticket to In review only when 5 to 10 all hold and required evidence is attached. The moment you change anything again, move it back to In progress first.
13. If the PR needs human security review, look for a smaller shape that avoids the sensitive surface before asking for the review, and tell him the option.
14. When he asks to notify someone ("ping X when the pr is up", "when that's merged ping me on slack"), do it at exactly that event and not before.
15. When work is superseded by something already merged, close the duplicate PR with a one-line reason instead of leaving it open.
16. Done message: PR link, check state, "conflicts: none", "open review threads: 0", review agents' result with every finding you did not fix, and what is waiting on him.
