---
name: explain-it-to-me
description: Invoke when Samyok asks to be taught or briefed on a system, spec, data model or PR stack - "teach me about", "explain in simple terms", "talk me through", "i don't really understand it", "what am i unaware of", "give me a 5 bullet summary", "generate an explainer video". Recipe for a written explainer and a silent motion-graphics explainer video (engine and renderer included), for any subject.
---

# Explain it to me

## Get the subject right first

1. Explain the thing itself, from its primary source: the spec, the schema, the code. Not the ticket, the PR descriptions or the status of the work. (He redirected an explainer with "not the ticket", "do research online about the spec", "and teach me about the spec".)
2. If the subject has an external spec or docs, read them online first and cite the exact document and version.
3. If it is ambiguous whether he wants the concept or our implementation, do the concept first, then our implementation as a second part.
4. If he asked for a video, the video is the deliverable. A written doc alone is not done; do not stop and ask whether he still wants the video.

## Written explainer (always produce this; it is also the video script)

5. Order: one sentence on what it is and why it exists; the 3 to 6 moving parts with one line each; one concrete example followed start to finish; how our code maps onto it (files, tables, PRs); what is not built or undecided; "what you might be unaware of" (risks, surprises, decisions made for him).
6. Show real artifacts, not paraphrase: the actual schema with all columns, the actual payload, the actual endpoint. ("show me the actual schema with all the columns")
7. Plain words, short sentences, no internal jargon without a definition. Match the size asked for: "5 bullet summary" means five bullets.
8. Mark each claim as read in the source or inferred.

## Explainer video

He liked this format and wants it reused for any subject ("this was really good"). The engine and renderer are in `video/` next to this file; reference: `video/example-pr-91738.js` (58 beats, 3:52) and `video/example-http-caching.js` (small, every element type).

Format:
9. Silent, no voiceover. One short caption sentence per beat, centred at the bottom.
10. About 60 beats of 4 seconds each (about 4 minutes), grouped into numbered chapters ("05 — Webhook subscription lifecycle"). A small subject gets fewer beats; never pad.
11. Dark theme, motion graphics. Each chapter has one diagram that stays on screen; each beat adds or highlights exactly one thing on it, and everything else dims.
12. Show real artifacts (JSON, schema, headers, payloads) copied from the source. Highlight one line at a time with a side note saying what it means.
13. One colour per concept, kept for the whole video, set in `palette`. For MCP events he chose poll = yellow, push = blue, webhook = purple, verification = orange, delivery = green.
14. Anything time-based gets a timeline or gauge: a lease bar draining toward a deadline, a replay strip of events, a migration window.

Making it:
15. Write the written explainer first, then turn it into a beat script: copy `video/example-http-caching.js`. Each chapter has `elements` (fixed positions on a 1920x1080 canvas) and `beats`. Element types: `box`, `arrow`, `text`, `json` (`lines`), `bar` (gauge with `marks`), `strip` (row of items), `timeline` (`ticks`, `spans`). Beat fields: `cap` (caption), `add` (element ids to reveal), `hl` (re-highlight ids), `json: {id, line, note}`, `anim: {id, from, to}` (drain a bar over the beat), `idx: {id, i}` (light strip items), `set`, `remove`, `all: true` (undim everything, for a chapter recap).
16. `cd video && npm i`, then `node render.mjs <beats.js> stills 2,30,70` and look at the stills for overlaps and clipped text before rendering the MP4 with `node render.mjs <beats.js> out.mp4`. Needs Chrome (or `CHROME_BIN`) and ffmpeg.
17. Watch the whole render once before sending: captions readable at phone size, side notes not covering the diagram, nothing off canvas.
18. Deliver the MP4 and one still in chat, link both on the ticket, and state the length, beat and chapter count in one line. Mark any placeholder values in the message. Send the first video of a series alone and ask for style feedback before making the rest.
19. Use fast mode or a fast child session for this when he asks; an explainer is not worth an hour.

## Follow-ups

16. He will ask pointed follow-ups ("is that standard?", "how does it work for the other types?"). Answer each in two or three sentences from the source, then offer to go deeper.
