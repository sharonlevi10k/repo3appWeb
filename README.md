# SeaApp — Marketing Site

Premium, production-ready marketing site for SeaApp, built from the Figma design.
**React + TypeScript + Vite + Tailwind CSS**, with motion powered by GSAP ScrollTrigger
+ Lenis smooth scroll and a few three.js / react-three-fiber visuals.

## Stack

| Layer      | Choice                                          |
| ---------- | ----------------------------------------------- |
| Framework  | React 18 + TypeScript                           |
| Build      | Vite 5                                           |
| Styling    | Tailwind CSS 3 (design tokens in config)        |
| Motion     | GSAP ScrollTrigger + Lenis smooth scroll; CSS transitions/keyframes for micro-interactions |
| 3D / FX    | three.js + react-three-fiber (hero/about scenes); scroll-scrubbed `<canvas>` logo cinema |
| Fonts      | Space Grotesk · Inter · JetBrains Mono          |

> **Motion stack.** Scroll choreography (reveals, parallax, the pinned hero + the
> scroll-scrubbed logo assembly) runs on GSAP ScrollTrigger with Lenis driving smooth
> scroll; lightweight micro-interactions stay on CSS. Everything honors
> `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev        # dev server (http://localhost:5173)
npm run build      # typecheck + production build → dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  data/                 # All real content (no placeholders) + types
    site.ts             #   company, nav, stats, capabilities
    services.ts projects.ts process.ts contact.ts
  lib/
    motion.ts           # motion tokens (durations, easings) — mirrors Figma
    accent.ts           # accent → gradient/text utility maps
    cn.ts               # className joiner
  hooks/
    useReveal.ts        # GSAP ScrollTrigger entrance reveal
    useParallax.ts      # RAF-throttled pointer parallax (depth tiers)
  components/
    ui/                 # Button, Tag, Eyebrow, Icon, Reveal, SectionHeading
    visuals/            # Orb (hero 3D), Lattice (about 3D), GlassChip
    layout/             # Navbar (+ mobile menu), Footer
    sections/           # Hero, Services, Projects, ProjectCard, About, Process, Contact
  App.tsx               # composition
  index.css             # Tailwind layers + glass utilities + reduced-motion
```

## Design system

Tokens live in `tailwind.config.js`:

- **Colors** — `ink` (midnight base scale) + `accent` (cyan → blue → violet → magenta → pink).
- **Type** — `display-xl/lg/md` fluid sizes via `clamp()`; families `font-display | font-sans | font-mono`.
- **Motion** — `duration-{micro,base,medium,large,cinematic}`, easings `ease-{expo-out,quart-in-out,back}`.
- **Glass** — `.glass` / `.glass-strong` utilities in `index.css` (backdrop-blur + translucent fill + light border).

## Motion & performance (native, no libs)

| Hook / util               | Effect                                                          | Mechanism             |
| ------------------------- | -------------------------------------------------------------- | --------------------- |
| `useIntroTimeline`        | Hero on-mount entrance — staggered copy + orb in               | CSS transition + rAF  |
| `useReveal`               | Scroll-reveal (rise + fade + blur)                             | IntersectionObserver  |
| `useScrollParallax`       | Scroll-scrubbed depth parallax (glows / scenes)                | scroll + rAF          |
| `useParallax`             | Pointer parallax on the 3D scenes                              | pointermove + rAF     |
| `<Parallax>` / `<Reveal>` | Declarative wrappers around the hooks                          | —                     |
| CSS `animate-floaty*`     | Continuous floating of glass chips / nodes                     | CSS keyframes         |

**60fps discipline**

- Every animation touches only `transform` / `opacity` — no layout or paint thrash.
- Reveal transitions run on the compositor (CSS); JS only toggles an `is-in` class.
- Parallax is rAF-throttled and **skipped on touch devices** (coarse pointer) to save battery.
- `data-reveal` is set only by JS when motion is allowed → no-JS & reduced-motion render fully visible (progressive enhancement).
- `prefers-reduced-motion` fully respected — every hook bails out.
- No continuously-animated blur layers (expensive); large glows are static and only move on scroll.
- `will-change` applied only on actively-transformed nodes.

## 3D integration (Spline-ready)

`components/visuals/Orb.tsx` and `Lattice.tsx` are **real rendered CSS/SVG visuals** (not empty
placeholders) that also serve as the poster/fallback. To drop in a live Spline scene later, render
`<Spline scene={url} />` inside the stage and keep these as the loading/mobile fallback — see the
comment block at the top of `Orb.tsx`.

## Forms

The contact form uses native HTML5 validation and shows a success state on submit. Wire `onSubmit`
in `components/sections/Contact.tsx` to your email service / API endpoint.
