# UltraWrap Studio — Website & Brand Identity

A premium, conversion-focused website for **UltraWrap Studio**, a boutique automotive wrap
and customization studio in **North Bergen, NJ**, serving **New York + New Jersey**.

Built as a dependency-free static site: no frameworks, no build step, no external requests.
Open `index.html` in a browser or serve the folder with any static host.

---

## Brand identity

| Element | Decision |
|---|---|
| Positioning | **Luxury automotive transformation** — a design studio, not a sign shop |
| Primary tagline | *"Your car. Your color. Your signature."* (customer-centric — leads the homepage hero) |
| Essence line | *"The art of automotive transformation."* (brand-centric — footer, lockups, vehicle) |
| Logo | `ULTRAWRAP / STUDIO` wordmark + angular **UW monogram** (U in ivory, W in champagne gold). One-color safe, embroidery/die-cut safe. Files: `assets/img/logo-primary.svg`, `logo-monogram.svg`, `favicon.svg` |
| Palette | Obsidian `#0A0A0C` · Graphite `#17181C` · Champagne Gold `#C9A962` (accent only) · Warm Ivory `#F4F1EA` · Studio Olive `#4D5342` (imagery only, honoring the original studio Tesla) |
| Typography | **Archivo** variable (self-hosted, wght+wdth) for display/UI; **Cormorant Garamond italic** for one editorial accent per view |
| Voice | Confident, precise, minimal. No exclamation marks, no price-led language |

The full living reference is **`brand.html`** (logo treatments, palette chips, type specs,
button styles, photography direction, vehicle-branding and social concepts, don'ts).

Tagline rationale: the brief offered six directions. *"Your Car. Your Color. Your Signature."*
won the hero because it's the only one about the **customer** (personalization = the purchase
motive), while *"The Art of Automotive Transformation"* serves as the brand essence line where
a company statement fits better. *"Transform Your Drive"* survives as display copy on the
brand page's type specimen.

## Site architecture

| Page | Purpose |
|---|---|
| `index.html` | Hero → before/after → services → design process → trust → Tesla/Cybertruck → portfolio → testimonials → CTA |
| `color-change-wraps.html` | Flagship service, finishes explorer, before/after, objection FAQ |
| `custom-graphics.html` | Stripes, liveries, decals; Idea→Install process |
| `design.html` | "Design Your Vision" — 6-step custom design experience |
| `ppf.html`, `ceramic-coating.html` | Protection services |
| `specialty-wraps.html` | Tesla, Cybertruck, motorcycle, boat, interior (anchored sections) |
| `services.html` | Overview + anchored sections for partial wraps, chrome delete, stripes, hood wraps, decals, light tint |
| `portfolio.html` | Filterable project grid (12 categories) — clearly-labeled placeholders |
| `process.html` | 9-step journey (Discover→Protect) + care & maintenance |
| `materials.html` | "We don't compromise on the material" |
| `about.html`, `reviews.html`, `faq.html`, `contact.html` | Story, social proof (placeholders), objection handling, location |
| `quote.html` | 7-step interactive quote experience (vehicle → service → finish → project → photos → artwork → contact) |
| `brand.html` | Internal brand guidelines (excluded from sitemap) |

Assets: `assets/css/main.css` (design system) · `assets/js/main.js` (nav, reveal,
before/after, filters) · `assets/js/quote.js` (stepper) · `assets/img/*.svg`
(stylized vehicle scene library + logos) · `assets/fonts/*` (self-hosted).

Vehicle imagery is **real automotive photography** sourced from Unsplash under the
[Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution
required — attribution appreciated). Each image is labeled on-site as *Sample* imagery and
should be replaced with real UltraWrap Studio project photography over time (shoot per the
photography direction on `brand.html`). Source photo IDs are preserved in the filenames'
git history; all files live in `assets/img/*.webp`. A small stylized SVG scene library
remains for the Cybertruck and interior *concept* slots and the brand-page vehicle mockup.

The visual system is dimensional by design: parallax hero with a perspective grid floor,
pointer-tracked 3D tilt with glare on media cards (hover-capable devices only), layered
glass card surfaces with `backdrop-filter`, metallic gradient display type, and photographic
grade overlays — all CSS/vanilla-JS, all disabled under `prefers-reduced-motion`.

## SEO

- Unique, location-aware titles + meta descriptions on every page; canonical URLs against
  `https://www.ultrawrap.studio` (the domain on the studio vehicle — update in one place in
  the build if it differs).
- `schema.org` JSON-LD: `AutoRepair` local business (home + contact, with NJ/NY `areaServed`),
  `FAQPage` (faq.html).
- `sitemap.xml` + `robots.txt` included.
- Natural location copy targeting: car wraps North Bergen / NJ / NYC, color change wrap NJ,
  Tesla wrap NJ, Cybertruck wrap, luxury car wrap NJ, PPF North Jersey, ceramic coating NJ —
  plus surrounding towns (Jersey City, Hoboken, Union City, Weehawken, Secaucus, Fort Lee,
  Edgewater, Paramus, Newark; Manhattan, Brooklyn, Queens, Staten Island, Westchester) woven
  into contact/CTA copy, not stuffed.
- Descriptive alt text on all imagery; internal linking between every service page, the quote
  flow and the FAQ.

## Performance & accessibility

- Zero external requests; two self-hosted woff2 fonts (~114 KB total, preloaded).
- SVG imagery (kilobytes, resolution-independent), `loading="lazy"` below the fold,
  explicit dimensions to prevent layout shift.
- Vanilla JS (~7 KB total, deferred). Animations are CSS-driven and disabled under
  `prefers-reduced-motion`.
- Semantic landmarks, skip link, focus-visible states, keyboard-safe accordions
  (`<details>`), labeled forms with `aria-invalid`, WCAG-conscious contrast on dark surfaces.
- Mobile-first: sticky **CALL / CONTACT / GET QUOTE** bottom bar, thumb-sized targets,
  click-to-call everywhere, minimal typing in the quote flow.

## Launch checklist — placeholders to replace

Nothing below was invented; each appears in the site as a visible `[TOKEN]`:

1. **`[PHONE NUMBER]`** — replace every `tel:+1-000-000-0000` href and visible token
   (`grep -rl 'data-phone-placeholder' *.html`).
2. **`[EMAIL]`**, **`[STREET ADDRESS]`**, **`[BUSINESS HOURS]`** — contact page + footer.
3. **`[INSTAGRAM URL]`**, **`[GOOGLE BUSINESS PROFILE]`** — footer, reviews, contact (map embed slot ready).
4. **`[FORM_ENDPOINT]`** — wire the quote + contact forms (Formspree/Basin/own backend) in
   `assets/js/quote.js` and `main.js`; both currently show a clearly-labeled demo-mode success state.
5. **Reviews/testimonials** — replace placeholder cards with real, permissioned reviews.
6. **Portfolio** — swap stylized renderings for project photography; remove `PLACEHOLDER` badges
   and `[VEHICLE]` tokens as real projects land.
7. Confirm the production domain and re-run canonicals/sitemap if it differs.

## Claims discipline

Per the brief: the site states only the supplied advantages (premium 3M/Avery Dennison-class
materials, edge wrapping, post-installation inspection, **1-year workmanship warranty**, free
design consultation). No certifications, partnerships, awards, celebrity clients, fabricated
reviews, film-durability numbers, or jurisdiction-blind legality claims (light tint is flagged
as jurisdiction-dependent; film performance is deferred to manufacturer documentation).
