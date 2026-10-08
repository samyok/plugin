---
name: show-me-the-ui
description: Invoke for any change Samyok can see (UI, session or board flow, Slack or mobile behavior), and whenever he says "show me", "what does it look like", "send me a screenshot", "attach a video", "demo it e2e" or "run it locally and show me". Recipe for producing screenshot or video evidence and where to put it.
---

# Show me the UI

He reviews visible changes by looking at them, not by reading the diff. Standing rule from him: "remember to attach videos for all tickets that do anything in the ui".

## Pick the cheapest evidence that answers the question

1. "What does it look like", layout, copy, styling, a single state: screenshots. Do not set up an end-to-end test for this; he has said "just show me what it looks like in the ui, we don't have to test e2e" and "just send me a screenshot".
2. A flow (click, navigate, send a message, state changing over time, anything in Slack/Telegram/mobile): a screen recording of the flow working end to end.
3. A design that does not exist yet: generate one or more mock images first and get a pick before building.
4. If he names the parts he cares about ("i care about the dropdown and the modal"), capture exactly those, first.

## Recipe

5. Open the PR first, then produce the evidence; do not hold the PR for the recording.
6. Run it on a local stack (the `local-dev-webapp` skill) unless he asked for staging. If it cannot work on staging, make it work against a local stack rather than reporting that it cannot be shown.
7. Turn on the feature flag for the demo and show the flag-off state too when the change claims flag-off is unchanged.
8. Use realistic seeded data and a clean starting state: close unrelated tabs, threads and panels before recording.
9. Recording: one continuous take of the real app, starting from the entry point a user would use, ending on the visible result. Keep it under about 90 seconds; cut waiting time. No narration needed; add a caption or chapter per step if the tooling supports it.
10. Screenshots: full window, uncropped, one per state (before/after, flag on/off, empty/filled, hover/open).
11. Look at your own evidence before sending. If it looks wrong (missing rounded corners, misaligned, wrong name), fix and recapture: "keep iterating until it looks good".

## Where it goes

12. One ticket, one PR, one video. Do not put several changes in one recording; he wants "video :: pr" to be obvious.
13. Put images and the recording at the top of the PR description ("put the videos/images/etc on the prs so they merge faster"), link the recording in the ticket status note, and post it in at most one PR comment.
14. Send it to him directly in chat as an attachment, with one sentence saying what it shows. If he names a channel, post there with a one-sentence summary and nothing more.
15. If the demo was faked in any way (mock data, stubbed backend, flag forced), say so in that sentence.
16. Do not rush into filming something that does not work yet; say what is missing instead.
