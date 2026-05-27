# Build Workflow — jak tento web vznikl

> Fáze build sekvence pro single-page CV web jako jeden deliverable v aplikační pipeline. Per fáze: agent → vstup → výstup. Žádné timestamps, žádný deník — jen artifacts.

---

## Agent stack

Celý build orchestrován přes vault `25_Agents/`. Per fáze nasazen jeden specialista; PM držel scope a delegoval.

| Vrstva | Agent | Path |
|---|---|---|
| 00 Governance | **Kristina** | `25_Agents/00_Governance/Kristina/` |
| 01 Strategic | **Project Manager** | `25_Agents/01_Strategic/Project-Manager/` |
| 02 Operational | **Career Coach** | `25_Agents/02_Operational/Career-Coach/` |
| 02 Operational | **Business Analyst** | `25_Agents/02_Operational/Business-Analyst/` |
| 02 Operational | **Business Architect** | `25_Agents/02_Operational/Business-Architect/` |
| 02 Operational | **UX Designer** | `25_Agents/02_Operational/UX-Designer/` |
| 02 Operational | **Frontend Implementer** | `25_Agents/02_Operational/Frontend-Implementer/` |
| 02 Operational | **Web Performance Auditor** | `25_Agents/02_Operational/Web-Performance-Auditor/` |
| 03 Pipeline | **Verifier** | `25_Agents/03_Pipeline/Verifier/` |

LLM runtime: **Claude Opus 4.7** v **Cursor IDE**.

---

## Workflow lifecycle

| # | Fáze | Agent | Vstup | Výstup |
|---|---|---|---|---|
| 1 | **Context & Brief** | Kristina | Job ad, Word CV, business cíl | Verbální brief: "single-page web jako proof of AI-first PM praxe" |
| 2 | **Fit evaluace** | Career Coach | Job ad + osobní profil | Skóre v 6 dimenzích, GO/NO-GO verdikt, tone guardrails pro tailoring (anti-buzz, anti-fabrikace) |
| 3 | **Pipeline plán** | Project Manager | Brief + EVAL | Sekvence fází 4–10, delegace per specialistovi, scope cap (≤ 1 page per artifact) |
| 4 | **Market research** | Business Analyst (Mode A) | Cílová firma + role + audience | Mapa cílové firmy. **Příklad findingu:** AI je v core produktech (search, ad targeting) jako živé téma, ne hype → implikace pro web: AI Portfolio musí být konkrétní artefakt s počty, ne general buzz |
| 5 | **Solution architecture** | Business Architect | Brief + BA report | Strategický framing ("web místo PDF, forma = obsah"), Handover Artifact (sekční mapa + must-not list) → UX |
| 6 | **IA + design tokens** | UX Designer | Handover Artifact | 7 sekcí (Hero → Profile → AI Portfolio → Experience → Projects → Education → Contact), AI Portfolio tree (3 nodes + tabs panel), mobile-first wireframe, Tailwind config (7 barev, 2 fonty, max-width 896 px) |
| 7 | **Content transfer** | PM (manuál) | Word CV (sacred source) | Verbatim copy do HTML, žádné AI rewrites profilu/projektů/zkušeností |
| 8 | **Build** | Frontend Implementer + Cursor | IA + tokens + content | `index.html`, `style.css`, `script.js` (tabs, interactive demo blok, mobile menu, fade-in). AI Portfolio: 3 přepínatelné panely. |
| 9 | **QA — content + tech** | Verifier + Web Performance Auditor | Hard rules + DevTools + Lighthouse | Audit log: removed claims (např. tool jako "agent runtime"), počty re-count proti realitě (14 → 27 → 30), anti-buzz pass (cut "praktický nástroj" / "praktická hodnota"). Performance ≥ 90, A11y ≥ 95, mobile bez horizontal scrollu. |
| 10 | **Deploy** | PM (jako DevOps) | Final repo | Push to `main` → GitHub Pages → live URL ~60 s |

## Repo struktura

```
cv-repo/
├── index.html              ← single-page web
├── style.css               ← custom styles nad Tailwind CDN
├── script.js               ← tabs, MARS demo, mobile menu
├── assets/
│   ├── photo-kristina.jpg  ← 500×500, 43 KB
│   ├── favicon.svg
│   └── og-image.svg
├── cv/
│   └── CV-Kristina-Kumberova.pdf
├── process/
│   ├── BRIEF.md            ← zadání
│   ├── BUILD-WORKFLOW.md   ← tento soubor
│   └── STACK.md            ← tech rozhodnutí
├── README.md
└── LICENSE
```

## Decision log (klíčová rozhodnutí)

| Rozhodnutí | Důvod |
|---|---|
| Tailwind CDN, ne build step | Brief: zero dependencies. Single-page, krátký lifecycle, žádný benefit z PostCSS pipeline. |
| Plain `script.js`, ne framework | Web má 3 interaktivní prvky (tabs, MARS demo, mobile menu). React by byl over-engineering. |
| GitHub Pages, ne Vercel/Netlify | Push = deploy. Repo public, hosting free, custom domain možná později. |
| Word jako sacred source pro content | Profile/projekty/zkušenosti psány ručně po debate. Re-AI-rewrite by zavedl drift. |
| Žádný NotebookLM/Perplexity v "portability" claimu | Anti-fabrication — nejsou agent runtime, jen research nástroje. |

## Co tady NENÍ a proč

- **BUILD-LOG s timestamps** — repo má artifacts, ne deník. Reproducibility ≠ chronologie.
- **Debate dumpy** — interní jazyk a iterace nepatří do public artifactů. Stačí, že **výsledek** projde QA.
- **Detailní agent definitions** — vault žije v separátním Obsidian repo, sem se dump 30 souborů nehodí.
