# Task: Agent 2 — Frontend designer/engineer (pane w1:p9, name `frontend`)

Read docs/BRIEF.md first. Work with `uiux` (w1:p8) — they own docs/design-spec.md and docs/copy.md.
Load skills: open-design:frontend-design, open-design:shadcn-ui, open-design:gsap-core only if needed (prefer
framer-motion already installed), superpowers:verification-before-completion.

Phase 0 (now, no need to wait for uiux): the Prisma hero is already integrated at src/components/ui/prisma-hero.tsx.
- Run `pnpm dev` in the background, confirm it renders. Fix anything real that is broken: `text-primary` classes
  resolve (tokens exist in src/index.css), video plays, nav fits at 360px.
- Do NOT edit the exported API of prisma-hero.tsx blindly. Make a copy `src/components/hero.tsx` that composes
  WordsPullUp / WordsPullUpMultiStyle from prisma-hero, with portfolio content, real section anchors in the nav
  (#tentang, #pengalaman, #sorotan, #keahlian, #kontak), a poster image for the video, prefers-reduced-motion
  support, `preload="metadata"`.
- Build the section skeletons in src/sections/*.tsx and the page in src/App.tsx using placeholder copy from
  docs/BRIEF.md section 4.

Phase 1 (after uiux posts design-spec.md in comms): implement it exactly. Use tokens, not hex literals.
Sections: Hero, Tentang, Pengalaman (timeline), Sorotan CDM (explainer + fact strip), Keahlian, Organisasi, Kontak,
Footer. Contact: mailto + WhatsApp (wa.me/62856 7003162 -> format 628567003162) buttons; do not print the raw
number in HTML source if uiux's spec says not to. Add framer-motion scroll reveals, once, transform+opacity only.
Primitives you create go in src/components/ui/ (shadcn style, cn() from @/lib/utils).
Images: only verified URLs (curl -I must return 200). Local file public/img/rezha-cv-original-199x270.jpg is the
only real portrait; show it small (<=160px) or skip it.
SEO: <html lang="id">, title, description, Open Graph, canonical placeholder, JSON-LD Person (jobTitle, email,
address Tangerang) in index.html, favicon, robots.txt, sitemap.xml with a placeholder domain flagged TODO.

Done = `pnpm build` and `pnpm exec tsc -b` pass, no console errors, checked at 360/768/1440 with browser
screenshots, keyboard tab-through works. Post status to comms after each phase and wake `uiux` for review and
`devops` (w1:pA) when dist/ is stable. Commit with prefix `frontend:`.
