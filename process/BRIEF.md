# Brief — CV web

> Zadání pro tento web jako **jeden deliverable v aplikační pipeline**. Stručný PM brief, ne marketing copy.

---

## Cíl

Postavit single-page CV web jako proof-of-work AI-first PM práce. Web sám = artefakt, který demonstruje, že content z PDF/Wordu umím přeložit do strukturovaného webu a do AI workflow doložit governance vrstvou.

## Audience

| Kdo | Co chce za 10 sekund | Co chce za 2 minuty |
|---|---|---|
| Recruiter (IT/tech) | Roli, roky praxe, sektor, kontakt | Klíčové projekty, konkrétní výstupy |
| Hiring manager / PM peer | Že umím produktově myslet, ne jen "AI buzz" | AI Portfolio sekce — co je v daily workflow |
| Tech-curious reader | Že web není no-code template | Stack, repo, audit trail |

## Scope (co web JE)

- Hero + Profil + AI Portfolio (3 karty: Vault, Career-Coach, Tento web) + MARS demo blok + Pracovní zkušenosti + Klíčové projekty + Vzdělání  + Kontakt
- Single-page, sticky nav, smooth scroll, fade-in
- CV PDF download
- Mobile-first responsive

## Out-of-scope (co web NENÍ)

- Blog, multi-page, CMS, dashboard
- Animace nad rámec fade-in + typewriter v MARS demo
- Kontaktní formulář (mail link stačí)
- Jakýkoliv backend, build pipeline, framework

## Constraints

| Constraint | Limit |
|---|---|
| Stack | plain HTML + Tailwind CDN, žádné npm dependencies |
| Hosting | GitHub Pages (push = deploy) |
| Performance | Lighthouse Performance ≥ 90, Accessibility ≥ 95 |
| Page weight | < 500 KB total (foto je největší asset) |
| Browser support | poslední 2 verze Chrome / Firefox / Safari / Edge |

## Must-have

- Kontent verbatim z mé Word verze CV (žádné AI rewrites profilu / projektů / zkušeností)
- AI Portfolio sekce — 3 karty s konkrétními artifacts (počty agentů, rules, SOPs)
- Repo veřejný, commit history čitelná
- Anti-buzz tón — pokud něco nelze ověřit, nejde to na web

## Must-not

- Žádné fabricated claims o nástrojích (např. tool jako "agent runtime" pokud jím není)
- Žádné copy-paste templaty z Lovable / Wix / no-code
- Žádné prozrazení jmen třetích stran nebo interních dokumentů
- Žádné BUILD-LOG s timestamps ("v 14:30 jsme se rozhodli…") — repo má **artifacts**, ne deník

## Definition of Done

- [x] Live URL vrací 200, content matchne brief
- [x] Lighthouse Performance ≥ 90, A11y ≥ 95, SEO ≥ 95
- [x] CV PDF download funguje
- [x] Tabs v Card 1 přepínají, MARS demo button funguje
- [x] Mobile (375 px) bez horizontal scrollu
- [x] Repo `process/` obsahuje BRIEF + BUILD-WORKFLOW + STACK
