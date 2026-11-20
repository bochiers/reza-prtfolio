# Task: Agent 1 — UI/UX (pane w1:p8, name `uiux`)

Read docs/BRIEF.md first. You are the UI/UX designer. Use Untitled UI as the design-system reference
(https://www.untitledui.com — its spacing scale, type scale, component anatomy, focus rings, form patterns).
Browse it, but do not paste its paid components. The visual identity is already chosen by the user: the Prisma hero
style (cream #E1E0CC / near-black, huge tight-tracked display type, grain, notch nav, pill CTA). Extend it into a
full page without turning it into a template.

Load skills before working: open-design:frontend-design, open-design:design-taste-frontend, avoid-ai-writing.

Deliver, in this order (post to docs/comms.md after each):
1. docs/design-spec.md  — the handoff for Agent 2. Must contain:
   - Section map and order (Hero, Tentang, Pengalaman timeline, Sorotan CDM, Keahlian, Organisasi, Kontak, Footer)
     with the purpose of each section and what the visitor should do/feel there.
   - Tokens: full colour roles (bg, surface, border, text, muted, accent, focus), type scale (display / h2 / h3 /
     body / caption with clamp() values, weights, tracking, line-height), spacing scale (Untitled UI 4px base),
     radius, elevation, motion (durations, easings, what moves, reduced-motion fallback).
   - Layout: 12-col grid, max widths, breakpoints, mobile behaviour of the notch nav (it must not overflow at 360px).
   - Component specs with all states (default/hover/focus/active/disabled): nav item, pill button, timeline entry,
     fact chip, skill group, contact link, section label.
   - Font choice: ONE display + ONE text family, loadable from Google Fonts or fontsource, justify. Not Inter-only.
   - Empty-state design for "foto proyek belum ada": a deliberate, honest frame ("Dokumentasi proyek menyusul"),
     not a fake photo.
   - Accessibility checklist with real contrast ratios you computed.
2. Update the `@theme` block in src/index.css with your tokens (you own that block only).
3. docs/copy.md — final Indonesian copy per section. Start from BRIEF section 4, tighten it. Run avoid-ai-writing
   over it. Facts must not change. Keep sentences natural, a mix of short and long, concrete nouns, no hype.
4. Review Agent 2's build in the browser (`pnpm dev`, then browser tools or screenshots) at 360 / 768 / 1440 and send
   concrete fix requests to `frontend` via comms. Approve or reject; list what is left.

Hand off to `frontend` (w1:p9) as soon as step 1 is written. Do not wait for steps 3-4 to be perfect.
