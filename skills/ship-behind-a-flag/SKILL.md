---
name: ship-behind-a-flag
description: Invoke when building a new user-visible feature, redesign, integration or risky behavior change in devin-webapp for Samyok, and whenever he says "behind a feature flag", "create a flag called ...", "make this an unleash flag" or questions why something is flagged. Rules for when to add a flag, how to name it, and when not to.
---

# Ship behind a flag

## When to flag

1. New visible surface, redesign, new integration or auto-approval behavior: gate it behind one Unleash flag so the UI-only PR can merge early with dummy data and the rest can follow in small PRs.
2. Use the exact flag name he gives. If he gives none, propose one kebab-case name in the plan and use it.
3. One flag per feature. If the whole surface is already behind a redesign flag, do not add a second flag for a button inside it; remove the inner one.
4. If an existing flag or mode already scopes the audience (for example the simplified-transcript mode), scope the behavior to that instead of creating a new flag or parameter.

## When not to flag

5. Do not flag something he has decided everyone gets ("all bots will have memory"). Remove the gate, its tests and its mentions in the PR body.
6. Do not gate on a proxy such as a plugin name or another feature's flag.

## Flag-off must be untouched

7. With the flag off, behavior, layout and request count are identical to main. Say so in the PR body and show flag-off next to flag-on in the evidence.
8. Flag checks sit at the entry point of the feature, not scattered through shared components.
9. Check that the flag-on path adds no latency to the flag-off path (no extra queries or fetches issued before the flag is read).

## Reporting

10. Done message names the flag, where it is checked, and whether it must be created or turned on in Unleash by him.
