# FrontDesk AI — case study prompt

Paste this into Claude Code from the `upper-layer-studio` folder.

---

Add a case study for **FrontDesk AI**, following `case-studies/TEMPLATE.md`.

- Project folder: `/Users/Jaypatel/Desktop/project/ai-clinic-receptionist`
- Repo: https://github.com/jaypatel345/FrontDeskAI · Live: none (runs on Vapi test calls)
- Service: **Voice AI** · slug: `frontdeskai`

It's an AI phone receptionist for a cosmetic clinic on Vapi: answers FAQs (RAG
over the clinic knowledge base), qualifies leads, books/reschedules/cancels via
Cal.com, pushes to HubSpot, sends Twilio SMS and logs every call to a dashboard.
Every integration has a mock fallback — say so honestly, and don't claim it has
taken real patient calls. Read `README.md`, `REQUIREMENTS.md` and `PLAN.md` to
confirm the details and to find whether it's my own product or built to a brief.

For `result`, use something checkable — e.g. the average turn latency from Vapi's
end-of-call reports, or the test suite in `test/` — and name the source. Ask me
if neither holds up.

Screens: the call dashboard, a call log with transcript, a booking confirmation
SMS, and the conversation flow (greeting → FAQ / qualify-and-book → human
handoff) drawn as the pipeline. Ask me for a recording of a test call for the
video.
