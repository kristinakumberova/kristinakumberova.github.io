# Stack — kristinakumberova.github.io

> Tech volby pro tento konkrétní web. Krátké odůvodnění per vrstva.

---

## Volby

| Vrstva | Volba | Důvod |
|---|---|---|
| HTML | HTML5 semantic | Native, accessible, žádný framework |
| CSS | Tailwind CSS via CDN | Utility-first, žádné npm install, žádný build |
| JS | Vanilla — Intersection Observer + mobile menu | ~30 řádků, zero dependencies |
| Fonts | Google Fonts (Inter + JetBrains Mono) | Free, fast, `font-display: swap` |
| Icons | Inline SVG (Lucide style) | Žádná externí závislost |
| Hosting | GitHub Pages | Free, integrovaný s repo, deploy = `git push` |
| Build | Žádný | Static files. Žádný CI, žádný bundler. |

---

## Performance targets

| Metric | Target | Důvod |
|---|---|---|
| Page weight | < 60 KB (bez fontů/foto) | Mobile-first |
| Lighthouse Performance | ≥ 95 | Static + zero JS framework |
| Lighthouse Accessibility | ≥ 95 | Semantic HTML + WCAG AA contrast |
| First Contentful Paint | < 1s | Žádný JS framework blocking render |

---

## Co tady **není** a proč

| Není | Důvod |
|---|---|
| React / Vue / Astro | 1 stránka, 0 routingu, 0 state management → framework je overkill |
| npm / pnpm / bundler | Zero dependencies = zero supply chain risk + zero build time |
| Tracking / analytics | Privacy default; recruiter scan nemá business logging interest |
| CMS | Obsah je statický, redaktor = git editor |
| CSS-in-JS / Sass | Tailwind utility classes pokryjí 100 % use casu |

---

## Audit per commit

`git log --oneline` ukáže historii decisions a iterací — každý commit = decision point.

---

## Deploy mechanika

```
main branch push
  └─→ GitHub Actions (auto, GH Pages built-in)
       └─→ kristinakumberova.github.io
            └─→ live za ~1 min
```

Žádný manuál step. Žádné secrets. `.nojekyll` vypíná Jekyll processing (chceme raw HTML).
