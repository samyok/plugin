---
name: explain-it-to-me
description: Invoke when Samyok asks to be taught or briefed on a system, spec, data model or PR stack - "teach me about", "explain in simple terms", "talk me through", "i don't really understand it", "what am i unaware of", "give me a 5 bullet summary", "generate an explainer video". Recipe for a written explainer and an explainer video.
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

9. Target 2 to 4 minutes, 1080p, narrated, diagram-based scenes, one idea per scene (the MCP Events explainer was 12 scenes, 4:29; that was slightly long).
10. Scene order follows the written explainer: what it is, the parts, the flow, one example end to end, then how it maps to our PRs.
11. Diagrams over text walls: boxes and arrows for flows, one highlighted element at a time, real field names on screen.
12. Narration is the written explainer read aloud, about 130 to 150 words per minute. No filler intro, no outro.
13. Watch the whole render once before sending: narration in sync, nothing clipped, text readable at phone size.
14. Deliver as an MP4 attachment in chat plus the written doc, link both on the ticket, and state the length and scene count in one line.
15. Use fast mode or a fast child session for this when he asks; an explainer is not worth an hour.

## Follow-ups

16. He will ask pointed follow-ups ("is that standard?", "how does it work for the other types?"). Answer each in two or three sentences from the source, then offer to go deeper.
