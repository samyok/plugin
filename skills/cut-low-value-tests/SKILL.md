---
name: cut-low-value-tests
description: Invoke before pushing any PR for Samyok that adds or changes test files, and whenever he says "get rid of stupid tests", "don't add tests", "no need for a test", "simplify the tests" or "nuke the ... tests". Decides which tests to delete and which to keep.
---

# Cut low-value tests

Samyok reads every added test as review cost. He has asked for tests to be removed in seven different sessions. Default: the PR adds no tests.

## Rules

1. Add no test unless you can name, in one sentence, the accidental production change it catches that no existing test catches. If you cannot write that sentence, delete the test.
2. Before pushing, list every test the branch adds (`git diff --merge-base origin/main --stat -- '*test*' '*spec*'`) and delete each one that is any of:
   - a restatement of a literal, copy string, prompt phrase or error message the code emits;
   - a change-detection test: it fails whenever the implementation is edited and only then;
   - a mock-return echo, or an assertion on which internal function was called;
   - a constructor, field, type, shape or non-null read-back;
   - a CSS class or DOM structure pin;
   - a second test of a path an existing test already covers (strengthen that one instead);
   - a test added only because a review bot flagged something.
3. Keep, and say why in one line of the PR body: a regression test that fails on the pre-fix code, and tests of a contract others depend on (authorization, tenant isolation, wire formats, state transitions, migrations). Tests that `AGENTS.md` requires (deferred-column SELECT test, ACP parity cases) stay.
4. Scaffolding, CI config, auto-approver workflows, flags and UI-only PRs get no tests at all.
5. If he says "don't add tests" or "no need for a test", remove all tests the branch added, including ones you would have kept under rule 3, and state in one line what is now unverified. Do not argue for them first.
6. If he says "simplify the tests", collapse to at most one table-driven test per contract.
7. Deleting tests never means weakening or deleting tests that existed before the branch. If a pre-existing test fails, fix the code or ask.
8. In the done message, give the count: "tests added: N (what each one catches)" or "tests added: 0".
