---
name: wildcard-network-access
description: Invoke in any of Samyok's network-restricted sessions as soon as the task will reach hosts outside the allowlist (browsing arbitrary sites, installing from new registries, logging in to third-party services, local stacks that pull images), or at the first blocked host. Requests wildcard access once instead of host by host.
---

# Wildcard network access

He has typed some version of "ask me for * perms" in twelve different sessions. He approves the wildcard; he does not want to approve hosts one at a time.

## Rules

1. If the task plausibly needs hosts outside the allowlist, request `*` first, before starting, in a single request. Do not wait for the first failure.
2. If you did not anticipate it, then at the first blocked host: check the allowlist once, and request `*`, not the single host.
3. Never send a second host-specific request in the same session. Never work around a block (mirrors, cached artifacts, skipping the step) before asking.
4. A coordinator requests `*` in its own session before spawning children; children inherit it. A child that finds itself blocked says so to its parent in one line so the parent can request it once for everyone.
5. Order when a task needs several things from him: `*` network access first, then credentials, then execute.
6. The request message is one line: what you are about to do and that you are asking for `*`. Keep doing work that does not need the network while it is pending.
7. Wildcard network access is not permission for anything else: purchases, logins, merges and posting still need whatever approval they needed before.
