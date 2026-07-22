# iamrizwan.com — Ultra-Premium Redesign Build Spec

**For:** Claude Code
**Prepared from:** full read of the current repo (`rizwanrko77/iamrizwan`, main @ commit `788345d`, working tree current as of 2026-07-18). Do **not** trust `README.md`, `CLAUDE.md`, or `AGENTS.md` for current state — they are stale. The source of truth is the actual files in `src/`.

---

## 0. Read this first — intent & guardrails

### 0.1 What this site is for
This is **not** a services/sales site. Rizwan does **not** want to sell to visitors. The single goal is:

> **Create genuine, meaningful relationships with founders** — so that a founder reads the site, feels they've met a real person, and reaches out to connect (not to "hire a vendor").

Every copy and design decision serves that goal. When a choice is ambiguous, pick the option that makes a founder feel *"I want to know this person"* over *"this person wants my money."* Remove anything that reads as a pitch, a package, or a funnel.

### 0.2 Design direction (locked)
- **Aesthetic:** Light, luxe, airy. Warm ivory / bone paper background, deep ink text, **one** restrained accent. No blue "SaaS" palette. No gradients-as-decoration. No shadows-as-decoration.
- **Feeling target:** ultra-premium but *simple*. The wow comes from **restraint, typography, spacing, and one or two exquisite motion moments** — not from busyness. Think: a beautifully printed book / a quiet luxury brand, not a startup landing page.
- **Motion:** use motion only where it elevates the feel. A few precise, slow-but-not-sluggish moments. Never decorative jitter.
- **Portrait:** the design decides. Default recommendation below **drops the half-screen portrait** in favor of an editorial layout, and reintroduces the portrait small and intentional on the Bio page only. (See §3.1.)

### 0.25 Settled decisions (read before building — these override anything older)
- **GitHub:** link it, but as a **secondary** link only (footer, and optionally Contact) — never a hero element. Rationale: most of his strong work is private (Tharom is a private repo; client repos aren't on his profile), so GitHub must not be the star. His **live products** carry the "I build" proof; GitHub is supporting evidence. Profile: `https://github.com/rizwanrko77`.
- **Repo facts (current, accurate as of this spec):** the portfolio repo `iamrizwan` is **public** — assume the source is publicly visible, so never commit secrets and keep analytics/verification env-gated (already the case). The resume tool now lives at the repo **`resume-tool`** (the old `Simple-resume-builder`/`humgrow` repo was deleted after a key-exposure cleanup — do not reference the old names). All public repos have been audited and are clean. If a "view source" link is ever added for the resume tool, point it at `resume-tool`. The Projects page links to the **live app** (`resumetoolai.iamrizwan.com`), not the repo — keep it that way.
- **`iamrizwan` repo hygiene:** `CLAUDE.md` and `AGENTS.md` are currently public in the repo. Harmless, but if Rizwan prefers them not to be visible, remove them. Not required.

### 0.3 Hard guardrails
- Keep the stack: **Next.js (App Router) + React + TypeScript + plain CSS**. No Tailwind, no CSS-in-JS libs, no UI kit.
- Keep **static export** (`output: 'export'`) working — it deploys to Cloudflare Pages. Do not introduce anything requiring a Node server at runtime.
- Keep analytics **env-gated** (no hardcoded IDs). Keep JSON-LD, sitemap, robots.
- Maintain **accessibility** (WCAG AA contrast, keyboard nav, reduced-motion). This is part of "premium."
- Respect `prefers-reduced-motion` for **every** animation added.
- Do **not** commit secrets. Keep `.env` usage as-is.

---

## 1. Global decisions that apply to every page

### 1.1 Structural/nav changes (do these first — quick wins)
- [ ] **Remove `Resources` from the main nav** (`src/components/Nav.tsx` desktop + mobile menus) and from the footer "Navigate" group (`src/components/Footer.tsx`). Keep the route/page file for now (so no 404s / no broken sitemap), but it is unlinked. **Remove `/resources` from `sitemap.ts`** so it isn't indexed while empty.
- [ ] **Move `My Time` out of the main nav.** Decision: keep the availability **only on the Contact page** as an embedded/looked-through element, and keep a single link to it in the footer. Remove `My Time` from the primary nav to reduce nav to the essentials. Final nav = **Bio · Projects · Contact** (plus the logo → home). (Rationale: fewer, more deliberate destinations reads more premium and pushes everything toward the one goal — connecting.)
- [ ] Give the `/my-time` page a proper heading + intro + graceful fallback (see §3.5). Even though it's demoted, it must not render as a bare iframe.
- [ ] Rename `package.json` `"name": "temp_app"` → `"name": "iamrizwan"`.
- [ ] Delete the large blocks of **unused CSS** (see §5) as part of the rebuild — the new `globals.css` is written fresh, so this happens naturally, but verify no orphaned classes remain.

### 1.2 The new design system (tokens)
Replace the `:root` token block in `src/app/globals.css`. Target palette (tune hex within ±small range for contrast, but keep the mood):

```
/* Surfaces */
--paper:        #F4F1EA;  /* warm ivory/bone — page background */
--paper-raised: #FBFAF6;  /* slightly lighter — cards / raised surfaces */
--ink:          #1A1815;  /* near-black warm ink — primary text */
--ink-soft:     #4A4640;  /* secondary text */
--ink-muted:    #8A857C;  /* meta, captions, timestamps */
--line:         #E0DBD0;  /* hairline borders/dividers (warm, low-contrast) */

/* Accent — ONE only. Deep warm terracotta/rust. Restrained. */
--accent:       #A8442A;  /* links, key marks, the single highlight */
--accent-ink:   #8A3520;  /* accent hover / pressed */
--accent-wash:  #EFE7DD;  /* barely-there accent tint for rare fills */

/* Optional: a single "quiet gold" for the ONE hero flourish, if used sparingly */
--gilt:         #B08A4F;
```

**Contrast requirement:** `--ink` on `--paper` and `--accent` on `--paper` must both pass WCAG AA (≥4.5:1 for body). Verify with a checker; nudge darker if needed.

**Do not** reintroduce the old sky-blue (`#54abce`, `#2181B5`, `#EFF8FF`) anywhere, including the favicon/icon.svg (redo it — see §6.4).

### 1.3 Typography
Premium feel lives here. Use a **serif display + a clean sans/mono for support** — this contrast is what separates "editorial luxury" from "template."

- **Display / headings:** a high-quality serif with personality. Recommended, in order: **Fraunces** (variable, optical sizing — excellent for this), or **Newsreader**, or **Instrument Serif** (for a lighter, more fashion-editorial feel). Load via `next/font/google` (NOT `@import` in CSS — `@import` blocks render and hurts the premium "instant" feel).
- **Body:** keep a refined sans for readability — **Inter** is fine but set it deliberately (weight 400/500, generous `line-height`, slightly increased letter-spacing on small caps). Alternative for more warmth: **Newsreader** body pairs with Fraunces display.
- **Mono (meta/labels/timestamps only):** keep **JetBrains Mono** OR switch to **Söhne Mono / Commit Mono** feel via a Google alt. Mono is used *sparingly* for small uppercase labels and dates — it signals craft.

Tasks:
- [ ] Move **all** font loading to `next/font/google` in `layout.tsx`, expose as CSS variables (`--font-display`, `--font-body`, `--font-mono`), remove the `@import url(...)` line from `globals.css`.
- [ ] Set a deliberate type scale (suggested, rem, 17px root):
  - Display XL (home hero line): `clamp(2.6rem, 6vw, 5.25rem)`, serif, weight 400–500, `line-height: 1.02`, `letter-spacing: -0.02em`.
  - H1 (page titles): `clamp(2.2rem, 4vw, 3.4rem)`, serif.
  - H2 (section): `1.6rem`, serif.
  - Body: `1.15rem`, sans, `line-height: 1.72`.
  - Small/meta: `0.8rem` mono, uppercase, `letter-spacing: 0.12em`, `--ink-muted`.
- [ ] Enable nice defaults: `font-feature-settings: "liga", "kern"; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;`. For Fraunces, set `font-optical-sizing: auto`.
- [ ] **Measure (line length):** cap reading columns at **62–68ch** (not a fixed 640px). Use `max-width: 65ch` on prose blocks. This single change makes long text feel premium.

### 1.4 Spacing, layout rhythm
- [ ] Keep an 8px base scale but **increase the generosity** — premium = air. Page vertical padding should be large (e.g. top space of `clamp(4rem, 12vh, 9rem)` before hero). Section gaps `clamp(4rem, 10vh, 8rem)`.
- [ ] Global page grid: a centered column, `max-width: 1080px`, with content sitting in a **narrower** measure inside it. Asymmetry is welcome (see hero §3.1) but must feel intentional, never accidental.
- [ ] Add a subtle **paper texture / grain**: a single, very-low-opacity (≈2–4%) noise or fibre texture over `--paper`, applied via a fixed pseudo-element on `body::before`, `pointer-events: none`, `mix-blend-mode: multiply`. This is the cheapest "expensive" trick — it kills the flat-digital feel. Must be an inline SVG/data-URI (no extra request) and must respect reduced-motion (it's static, so fine) and not hurt contrast. Keep it *barely perceptible*.

### 1.5 Motion system (define once, reuse)
Create a small, consistent motion vocabulary. All durations tuned to feel *composed*, not slow:
- **Reveal on scroll:** fade + rise `translateY(12px) → 0`, `opacity 0 → 1`, duration **520ms**, easing `cubic-bezier(0.22, 1, 0.36, 1)`, stagger children by 60–90ms. (Current 2s/4s fades are far too slow — fix this.)
- **Link/CTA hover:** underline draws in (animated `background-size` underline), 220ms.
- **Card/interactive hover:** lift `translateY(-2px)` + hairline border darken, 200ms. No big drop shadows — premium light UIs use **hairlines and tone**, not shadows. If any shadow, make it tiny and warm (`0 1px 2px rgba(26,24,21,0.04)`).
- **Page transitions (optional, high-impact):** a subtle cross-fade between routes (View Transitions API where supported, graceful fallback). Only if it stays crisp.
- **One signature moment:** the home hero (§3.1) gets **one** memorable entrance — e.g. the serif headline words rise in sequence with a fine hairline that draws across under them. Exactly one. Don't repeat it elsewhere.
- [ ] **Every** motion gated behind `@media (prefers-reduced-motion: no-preference)`, with a `reduce` fallback that shows everything instantly.
- [ ] Fix the current `FadeIn` component: keep the IntersectionObserver + safety-timeout pattern (it's good) but drop the timeout to ~300ms and update the CSS durations per above. Verify the portrait/hero actually reveals (the current `photo-panel__img` has a `fade-in` transition class defined but is rendered already-visible without the class — the animation never fires; don't reproduce that bug).

### 1.6 Custom cursor? 
Optional. A minimal custom cursor (small ink dot that scales on interactive elements) can add premium feel **but** only on pointer-fine devices, must never harm usability, and must be disabled on touch and under reduced-motion. **Recommendation: skip it** unless everything else is done — it's high-risk/low-reward and easy to make feel gimmicky. Leave as a stretch item (§8).

---

## 2. Information architecture (final)

Pages that ship, in nav order:

| Route | In main nav? | Purpose |
|---|---|---|
| `/` (Home) | logo only | The hook. Who he is in one breath + the invitation to connect. |
| `/bio` | **Yes** | The story. The real credibility. The emotional core. |
| `/projects` | **Yes** | Proof he builds. Framed as "things I've made," not a portfolio-for-hire. |
| `/contact` | **Yes** | The one conversion: start a real conversation. Availability lives here. |
| `/my-time` | No (footer + linked from contact) | Full availability view. Demoted, but polished. |
| `/resources` | No (unlinked, removed from sitemap) | Parked. Not shown until it has real content. |

Footer links: **Connect** (LinkedIn · Email · Book a meeting · GitHub) · **Navigate** (Bio · Projects · Contact · My Time) · **Projects** dropdown (keep, it's a nice touch) · copyright. GitHub sits last in Connect — it's secondary (see §0.25).

---

## 3. Page-by-page: layout + content + components

> For every page: wrap major blocks in the reveal-on-scroll motion. Use the serif for headings, sans for body, mono for small labels. Keep prose to ≤65ch. All existing routes/metadata objects stay; content and layout change.

### 3.1 Home (`src/app/page.tsx`) — the hook

**Goal:** In one screen, a founder should feel the person and understand the invitation. No sell.

**Recommended layout (editorial, portrait dropped from here):**
- Full-height (or near) hero on `--paper` with the grain texture.
- A small mono eyebrow, top-left of the content column: `MOHD RIZWAN — BIJNOR, INDIA` (or `— FOUNDER, BUILDER`).
- The **signature serif headline**, large, set in 2–3 lines, left-aligned, with generous leading. This is the wow moment (see motion §1.5). Suggested copy (keep his real voice from the current site — warm, direct, a little unusual):

  > *"I like being near people building something real —*
  > *and helping wherever the day needs it."*

  (Keep the em-dash rhythm; it's his voice.)
- Below, **one** short paragraph (≤3 sentences) in body sans, `--ink-soft`, restating the invitation without pitching:

  > "If you're running a company alone or with a small team, most of your day gets eaten by everything that isn't the actual work. I help with product, building, validation, and go-to-market — one thing at a time. I don't do it for what you'd pay; I do it to be close to something real."

- **Three quiet text links** (not buttons — buttons feel salesy here) with animated underlines:
  - `Read my story →` (/bio)
  - `See what I've built →` (/projects)
  - `Start a conversation →` (/contact)
- Nothing else above the fold. Whitespace is the design.

**Motion:** headline words rise in sequence (60–80ms stagger); a hairline rule draws left-to-right beneath the headline after it settles; paragraph + links fade up last. One time, on load. Reduced-motion: everything visible immediately.

**Do not** put the portrait here. The restraint is the premium signal.

Checklist:
- [ ] Rebuild `page.tsx` with the editorial hero above.
- [ ] Remove the old `HomeLayout` split-panel usage from home (see §3.9 — `HomeLayout` is retired/replaced).
- [ ] Implement the one signature entrance animation, reduced-motion safe.
- [ ] Verify contrast + measure width.

### 3.2 Bio (`src/app/bio/page.tsx`) — the heart

**This page's writing is already excellent — do not rewrite the substance.** Keep every factual beat and the honest tone (the father passing, raised by mother and brother, leaving BSc, The Networker, 2,500+ placements, 2.5 lakhs/month, RKOSPL + Humgrow, 32 people, the honest post-mortem, shutting it down himself, keeping RKOSPL alive with Naman Malpani, now Tharom AI solo). The redesign is about **presentation**, making this read like a beautifully typeset essay.

Layout:
- [ ] Drop the sticky half-screen photo panel. Replace with an **editorial article layout**: a centered prose column (≤65ch), serif drop-style opening, generous section spacing.
- [ ] Reintroduce the **portrait here, once, small and intentional** — e.g. a modest, duotone-treated (ink/paper) portrait near the top or beside the opening section, not full-bleed. Treat it like a book's author photo. Give it a hairline frame, not a shadow. Lazy-load it. (Current asset: `public/images/Rizwan-image.png`, 630×891 — good ratio for this.)
- [ ] Keep the existing `<h1>` playful "Father, organizer, wonderer, & a founder." tagline but **retypeset** it in the new serif; replace the orange `--name-highlight` letters with the new `--accent` (or drop the per-letter highlight for a cleaner ligature-forward serif treatment — designer's call, but keep *some* signature).
- [ ] Section headings ("Who I am", "The Networker", "RKOSPL and Humgrow", "What I'm doing now") in serif H2, with a small mono kicker/number above each (e.g. `01 — WHO I AM`) for editorial rhythm.
- [ ] Pull-quote treatment: lift **one** line into a large serif pull-quote for texture — suggest: *"I know what a small mistake looks like before it becomes the one that ends the company — because I've lived on both sides of that line."* Set large, `--accent` or `--ink`, with breathing room.
- [ ] Keep inline links (Naman Malpani, Tharom AI) with the new animated underline style.
- [ ] Reveal-on-scroll per section, gentle stagger.

Content edits (light touch only):
- [ ] Fix bio metadata `description` to a clean sentence (currently clipped fragments): e.g. *"I've built companies alone, placed 2,500+ people, scaled a startup to 32 and shut it down myself. Now building Tharom AI, solo. This is the whole story."*

### 3.3 Projects (`src/app/projects/page.tsx`) — quiet proof

**Reframe away from "portfolio for hire."** Keep the three tabs (My Startups / For Founders / Just for Fun) — they're good — but change the framing copy and **remove the sales CTA**.

- [ ] Page header: keep emoji-free or replace the 💡 with a serif title + mono kicker. Title: **"Things I've built."** Subtitle (his voice): *"I'm obsessed with turning ideas into things that exist."* (keep — it's on-brand and not salesy).
- [ ] **Remove / rewrite the `founder-cta` banner** ("Need something built for you or your startup? … Fast, lean…"). This reads as selling. Replace with a **quiet, human invitation** consistent with the goal, e.g. a simple line at the bottom of the "For Founders" tab:

  > "If you're building something and any of this is useful, I'd genuinely like to hear about it. — [start a conversation →]"

  No button styling, no "let's talk" hard-sell, no gradient box. A hairline-topped note at most.
- [ ] Redesign the project **cards** to the new system: `--paper-raised` surface, hairline border, no blue thumb blocks. Card = serif project name, one-line description in `--ink-soft`, mono tags, a status chip, and a text link "Open project →" with animated arrow. Keep the status-chip concept but recolor to the warm palette:
  - Active → accent-tinted (`--accent-wash` bg, `--accent` text/dot)
  - On Hold → muted amber/`--gilt`-tinted
  - (Remove exit/shutdown chip styles unless used.)
- [ ] Keep tabs, but restyle: mono uppercase labels, active tab marked with a fine `--accent` underline. Ensure `role="tabpanel"` + `aria-labelledby` wiring is added (currently missing — accessibility gap).
- [ ] Keep real project data (Tharom AI active; Xapproach on hold; Time; Simple AI Resume Tool). Verify links. The resume tool links to the **live app** `resumetoolai.iamrizwan.com` (not a repo).
- [ ] **No client work.** Projects shows only Rizwan's own products — no "Client Work" tab, no client section, no client links anywhere. (Settled — see §0.25.)
- [ ] Reveal-on-scroll for cards, subtle stagger.

### 3.4 Contact (`src/app/contact/page.tsx`) — the one conversion

**This is where the whole site points.** Make it feel like the start of a relationship, not a form.

- [ ] Serif title: **"Let's talk."** Mono kicker: `— CONTACT`. Subtitle in his voice: *"The best way in is a message, not a form."*
- [ ] Keep the honest line: *"If you're a founder building something interesting, or a team that needs someone who can do product thinking, research, design, or actually ship — I'm especially responsive."* **Fix the grammar** ("designing, or actually ship" → "research, design, or ship").
- [ ] Present the channels as a clean, quiet list (not buttons): LinkedIn (primary), Email, Book a meeting (Cal.com). Each with the animated-underline link style and a one-word mono label. Order by his stated preference: LinkedIn → Email → Cal. GitHub (`https://github.com/rizwanrko77`) may be added here too, but only as the **last, quietest** item — it belongs to "see how I build," not "reach me." Optional on Contact; required in the footer (§3.8).
- [ ] **Embed availability here** (this is now the primary home for it): a tasteful section titled "When I'm around" that either (a) embeds the `time.iamrizwan.com` week view in a framed, styled container, or (b) shows a compact summary + "See full availability →" linking to `/my-time`. Given iframe fragility, prefer (b) with a graceful embed: styled frame, `loading="lazy"`, a visible fallback link if it doesn't load.
- [ ] Add a single warm closing line that reinforces the real goal: *"I read everything myself. If you're building, I'll write back."*
- [ ] Reveal-on-scroll.

### 3.5 My Time (`src/app/my-time/page.tsx`) — demoted but polished

- [ ] Add a proper page header: serif title **"My availability"**, mono kicker `— SCHEDULE`, one line: *"My current schedule, live. Grab a time that works."*
- [ ] Wrap the iframe in a styled, max-width, hairline-framed container on `--paper-raised`.
- [ ] Add a **fallback**: below/around the iframe, a visible text link — *"If the calendar doesn't load, [book directly →]"* → `https://cal.com/meet-rizwan`.
- [ ] `loading="lazy"`, descriptive `title`, sensible min-height, no layout shift.
- [ ] Linked from footer + from Contact. Not in main nav.

### 3.6 Resources (`src/app/resources/page.tsx`) — parked

- [ ] Unlink from nav + footer (done in §1.1) and remove from `sitemap.ts`.
- [ ] Leave the file, but replace the "coming soon..." with nothing user-facing, OR add a `noindex` and a single honest line if someone finds the URL: *"Nothing here yet — I'm only publishing things I actually use."* (Add `robots: { index: false }` to this page's metadata.)

### 3.7 Nav (`src/components/Nav.tsx`)
- [ ] Reduce to **Bio · Projects · Contact** (desktop + mobile). Logo `Rizwan ·` → home.
- [ ] Restyle: nav bar on `--paper` (not blue), ink text, mono or refined-sans links, active state = fine `--accent` underline. Nav should feel weightless — thin, lots of air, hairline bottom border only when scrolled (optional sticky-shrink).
- [ ] Mobile: keep the hamburger, but restyle the drawer to the new palette; **add focus-trap** and `Esc`-to-close (accessibility gap in current version).
- [ ] Ensure keyboard focus states are visible and on-brand (custom `:focus-visible` ring in `--accent`).

### 3.8 Footer (`src/components/Footer.tsx`)
- [ ] Restyle to new palette; keep the three groups + projects dropdown (nice detail). Update "Navigate" to Bio · Projects · Contact · My Time (Resources removed).
- [ ] **Add GitHub** to the "Connect" group, as the **last** item (after LinkedIn, Email, Book a meeting): `https://github.com/rizwanrko77`, `target="_blank"`, `rel="noopener noreferrer"`, wrapped in `TrackedLink` with a `footer_clicked` / `{ link: 'GitHub' }` event to match the existing pattern. Secondary weight — same styling as the other Connect links, no special emphasis.
- [ ] Keep `TrackedLink` GA events.
- [ ] Make it quiet: hairline top border, mono group labels, ink-soft links, lots of space. Copyright in mono, `--ink-muted`.

### 3.9 Layout components
- [ ] `HomeLayout.tsx` (the split photo/content panel) is **retired** — home no longer uses it. Either delete it or repurpose. Bio now uses the editorial article layout, not this. Remove the split-panel CSS.
- [ ] `PageLayout.tsx`: keep as the standard wrapper (centered, max-width, nav + content + footer). Update to new spacing/tokens.
- [ ] `FadeIn.tsx`: keep logic, fix timings (§1.5).
- [ ] `TrackedLink.tsx`: keep as-is (works, env-gated GA).

---

## 4. SEO / AEO / metadata (careful pass)

Do all of this — "premium" includes being found and being quotable by AI answer engines.

### 4.1 Core metadata
- [ ] Keep `metadataBase`, per-page `title`/`description`. Rewrite descriptions to be human and specific (see per-page notes). Titles: pattern `"{Page} — Mohd Rizwan"`; home stays `"Mohd Rizwan — Product Builder & GTM"` or similar.
- [ ] Add a real **OG image** (see §6.4). Currently `twitter.card` is `summary_large_image` but no image is set → set `openGraph.images` and `twitter.images` to a designed 1200×630 card. Static file in `/public`.
- [ ] Verify canonical URLs are correct for static export (`metadataBase` + trailing-slash behavior). Set `trailingSlash` consistently in `next.config.ts` and make sure `sitemap.ts` URLs match.

### 4.2 Structured data (JSON-LD)
- [ ] Keep the `Person` schema in `layout.tsx`. Enrich it: add `image` (portrait URL), `sameAs` (LinkedIn — already there — **plus GitHub `https://github.com/rizwanrko77`**), `worksFor`/`founder` of RKO Services / Tharom AI, `alumniOf` omitted or honest, `knowsAbout: ["product", "go-to-market", "startups", "recruitment", "AI"]`.
- [ ] On `/projects`, consider `ItemList` of `CreativeWork`/`SoftwareApplication` for the projects. Optional but good for AEO.

### 4.3 AEO (answer-engine optimization)
The goal is that when someone asks an AI "who is Mohd Rizwan / who built Humgrow / founder Bijnor recruitment," the site is the clean, quotable source.
- [ ] Ensure the Bio page has **clear, factual, self-contained sentences** (it does — the honest specifics are perfect for extraction). Don't bury facts in decorative markup.
- [ ] Use proper heading hierarchy (one `<h1>` per page, ordered `<h2>`/`<h3>`).
- [ ] Add descriptive `alt` text to the portrait.
- [ ] Keep semantic HTML (`<article>`, `<section>`, `<time>` for dates, `<nav>`, `<main>`, `<footer>`).
- [ ] Make sure content is in the **static HTML** (it is — server components / static export), not injected client-side, so crawlers/answer-engines see it without JS.

### 4.4 Performance (premium = fast)
- [ ] `next/font` (no blocking `@import`).
- [ ] Optimize the portrait: export a properly sized WebP/AVIF, use appropriate `width`/`height` to prevent CLS. (Note: `next/image` optimization is limited under static export — either pre-optimize assets manually or use `unoptimized` with correctly sized files.)
- [ ] Inline the grain texture as data-URI (no extra request).
- [ ] Target Lighthouse ≥95 across the board; zero CLS; fast LCP (the hero headline text should be LCP and render instantly with `next/font` `display: swap` or `optional`).

---

## 5. CSS cleanup (dead code)

The current `globals.css` (~1,609 lines) contains large blocks styling components that **do not exist** in any page. Since you're rewriting `globals.css` fresh against the new design system, ensure **none** of these orphan class groups are carried over unless a page actually uses them:

Orphaned in current code (verify before deleting): `.quote-block*`, `.writing-card*`, `.grid-3`, `.grid-2` (unless reused), `.project-card*` (the old grid variant), `.learning-card*`, `.learning-teaser*`, `.collapsible*`, `.photo-grid*`, `.post-row*`, `.retro-links*`, `.experiments-list*`, `.closing-note*`, `.find-me*`, `.connect*`, `.section-title`, `.see-all-link`, `.project-full-card*`.

- [ ] Rebuild `globals.css` around only what the redesigned pages use. Organize with clear section comments. Keep it lean.
- [ ] Grep the final `src/` for every `className` string and confirm each has a matching rule and vice-versa (no orphan rules, no undefined classes).

---

## 6. Assets to produce

- [ ] **6.1 Portrait, duotone-treated:** ink/paper duotone (or a warm, desaturated grade) version of `Rizwan-image.png` for the Bio page, plus a properly compressed WebP/AVIF. Keep an untouched fallback.
- [ ] **6.2 Grain/texture:** inline SVG noise data-URI, ≈2–4% opacity, warm-neutral.
- [ ] **6.3 Favicon / `icon.svg`:** redo `src/app/icon.svg` — remove the blue gradient. New mark: a refined serif "R" (or "MR" monogram) in `--ink` on `--paper`, or `--paper` on `--ink`. Keep it crisp at 16px. Provide `.svg` + a fallback `favicon.ico`/PNG if needed.
- [ ] **6.4 OG image (1200×630):** designed social card — `--paper` background + grain, serif name "Mohd Rizwan," a one-line descriptor, and a small mark. Static PNG in `/public`. Wire into metadata (§4.1).

---

## 7. Build order (recommended sequence for Claude Code)

Work in this order so the site is never broken and review is easy:

1. **Foundations:** new tokens + `next/font` + typography + spacing + grain in `globals.css` and `layout.tsx`. Fix `FadeIn` timings. Rename `temp_app`. (Nothing visual "final" yet, but system is in place.)
2. **Nav + Footer** to new system + IA changes (remove Resources; reduce nav; demote My Time). Accessibility (focus trap, focus-visible).
3. **Home** hero + signature motion.
4. **Bio** editorial layout + portrait treatment + pull-quote. (Highest emotional payoff.)
5. **Projects** reframe + card redesign + remove sales CTA + tabpanel a11y.
6. **Contact** redesign + availability embed + fallback.
7. **My Time** polish; **Resources** park/noindex.
8. **SEO/AEO/OG/JSON-LD/sitemap/robots** pass.
9. **CSS dead-code sweep** + class audit.
10. **Perf + a11y + reduced-motion QA** (see §9). 

Commit per step with clear messages. Keep static export building green after every step (`npm run build`).

---

## 8. Stretch (only after everything above ships)
- [ ] View-Transitions route cross-fade.
- [ ] Minimal custom cursor (pointer-fine only, reduced-motion off).
- [ ] A real **Writing** page — Rizwan's Bio proves he can write. A quiet essays page (built on the editorial system) would deepen the "know the person" goal more than anything else. Park until he has 1–2 pieces.

---

## 9. Definition of done — QA checklist

**Design/feel**
- [ ] Light/ivory/ink/single-accent palette everywhere; zero legacy blue.
- [ ] Serif display + refined body + sparing mono, loaded via `next/font`.
- [ ] Prose ≤65ch; generous, consistent spacing rhythm.
- [ ] Exactly one "signature" motion moment (home); everything else is quiet.
- [ ] Grain texture present but barely perceptible; doesn't harm contrast.
- [ ] No decorative shadows; hairlines and tone do the work.

**Content/goal alignment**
- [ ] No page reads as a sales pitch. The old `founder-cta` sales banner is gone.
- [ ] **No client work anywhere** — no client tab/section/links on Projects, Bio, or elsewhere. Bio is purely personal.
- [ ] **GitHub** (`github.com/rizwanrko77`) present as a **secondary** link in the footer Connect group (and optionally Contact), never a hero element. Added to JSON-LD `sameAs`. Live products remain the primary "I build" proof.
- [ ] Every page routes emotionally toward "connect with a founder."
- [ ] Bio facts fully preserved; grammar fixed on Contact.
- [ ] Home ≤ one paragraph + three text links above the fold.

**IA**
- [ ] Nav = Bio · Projects · Contact (+ logo home).
- [ ] Resources unlinked + removed from sitemap + noindex.
- [ ] My Time demoted, polished, has heading + fallback, linked from footer + contact.

**SEO/AEO**
- [ ] Unique, human title + description per page.
- [ ] OG image set + renders in social preview.
- [ ] JSON-LD Person enriched and valid (test in Rich Results).
- [ ] Semantic HTML, one h1/page, ordered headings, alt text.
- [ ] Content present in static HTML without JS.

**Tech/perf/a11y**
- [ ] `npm run build` (static export) passes; deploys clean to Cloudflare Pages.
- [ ] Lighthouse ≥95 Perf/SEO/Best-Practices/A11y; CLS ~0.
- [ ] All color pairs pass WCAG AA.
- [ ] Full keyboard nav; visible `:focus-visible`; mobile menu focus-trapped + Esc.
- [ ] `prefers-reduced-motion: reduce` disables all motion, shows all content.
- [ ] Projects tabs have `role="tab"`/`role="tabpanel"`/`aria-labelledby`.
- [ ] No orphan CSS classes; no undefined classes.
- [ ] `package.json` name fixed; no secrets committed.

---

## 10. Copy bank (ready-to-use, in his voice)

Use/adapt these so tone stays consistent. Keep his warm, plain, slightly unusual register — never corporate.

- **Home headline:** "I like being near people building something real — and helping wherever the day needs it."
- **Home paragraph:** "If you're running a company alone or with a small team, most of your day gets eaten by everything that isn't the actual work. I help with product, building, validation, and go-to-market — one thing at a time. I don't do it for what you'd pay; I do it to be close to something real."
- **Home links:** "Read my story →" · "See what I've built →" · "Start a conversation →"
- **Projects subtitle:** "I'm obsessed with turning ideas into things that exist."
- **Projects, quiet invite (replaces sales CTA):** "If you're building something and any of this is useful, I'd genuinely like to hear about it. — start a conversation →"
- **Contact title/sub:** "Let's talk." / "The best way in is a message, not a form."
- **Contact honest line (fixed grammar):** "If you're a founder building something interesting, or a team that needs someone who can do product thinking, research, design, or ship — I'm especially responsive."
- **Contact closing:** "I read everything myself. If you're building, I'll write back."
- **My Time intro:** "My current schedule, live. Grab a time that works."
- **Resources (if URL found):** "Nothing here yet — I'm only publishing things I actually use."

---

*End of spec. Nothing here should be treated as optional unless marked "optional" or "stretch." When a detail isn't specified, choose the quieter, more restrained option — that is the brief.*
