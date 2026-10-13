# plugin

Samyok's Devin plugin. The plugin lives at the repo root: `.devin-plugin/plugin.json` is the manifest and `skills/` holds the skills, so the repo URL installs directly.

## `samyok`

Skills compiled from instructions Samyok repeatedly gives Devin sessions. Each skill's description says when it applies, so the agent picks it up on its own; it can also be invoked as `/samyok:<skill>`.

| Skill | Use when |
|---|---|
| `smallest-mergeable-diff` | Planning or shaping any code change; "why is the diff so large", "simplify", "reuse" |
| `show-me-the-ui` | Any visible change; "show me", "send me a screenshot", "attach a video" |
| `pr-ready-for-samyok` | Opening, updating or handing off a PR; conflicts, review comments, CI |
| `wildcard-network-access` | A network-restricted session needs hosts outside the allowlist |
| `explain-it-to-me` | "teach me about", "explain in simple terms", "generate an explainer video" (includes the video engine in `video/`) |
| `coordinator-delegate-everything` | Coordinator sessions only: delegate work to children, clean up the board |
| `cut-low-value-tests` | A PR adds or changes tests; "get rid of stupid tests", "don't add tests" |
| `ship-behind-a-flag` | New user-visible feature or redesign; when to add a flag and when not to |

## Install

```bash
devin plugins install "https://github.com/samyok/plugin.git"
```

## Validate

```bash
node scripts/validate-plugins.mjs
```

CI runs the same check on every PR.
