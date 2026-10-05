# Case study prompt — template

Copy this, fill the four blanks, paste it into Claude Code from the
`upper-layer-studio` folder.

---

Add a case study for **{PROJECT NAME}** to the site.

- Project folder: `{absolute path to the project}`
- Live: `{url or "none"}` · Repo: `{github url}`
- Service it proves: `{Product Build | AI Agents | Voice AI | AI Automation}`

Do it the same way as the existing case studies:

1. Read the project's README and code first. Only write what the code, the live
   product, the repo or CI history can back up. If something isn't there, leave
   it out or ask me.
2. Append one entry to `projects` in `src/lib/projects.ts`, filling every field of
   the `Project` type (meta, problem, built, features, pipeline, stack, result,
   cover, screens, video). First person singular. Say plainly what kind of work
   it is (own product / built to a brief / hackathon / assignment) — never
   imply client work.
3. `result` must be one real, checkable number with its `source`. No made-up
   metrics. If there isn't one, tell me before inventing a stand-in.
4. Screenshots go in `public/work/{slug}/`, named `NN-what-it-shows-desktop.png`
   (2880×1800) and `NN-what-it-shows-mobile.png` (780×1688), numbered in reading
   order. Take them from the running app if you can; otherwise list exactly
   which shots you need from me. Any sample/mock data on screen gets said in
   the caption.
5. Video: set `src: ""` (shows "coming soon") unless I give you one.
6. Run the dev server, check `/work`, `/work/{slug}` and the service page it
   belongs to on desktop and mobile, then show me a screenshot.
