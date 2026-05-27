# Kristina Kumberová — kristinakumberova.github.io

Single-page web postavený jako AI-first portfolio. Live: **https://kristinakumberova.github.io**

---

## Co tu je

| Cesta | Co |
|---|---|
| `index.html` + `style.css` + `script.js` | Web sám (single-page) |
| `assets/` | Foto, favicon, OG image |
| `cv/CV-Kristina-Kumberova.pdf` | CV ke stažení |
| `process/BRIEF.md` | Zadání, scope, must-not |
| `process/BUILD-WORKFLOW.md` | 10 fází buildu, 9 vault agentů, vstup/výstup per fáze |
| `process/STACK.md` | Tech volby pro tento web + důvody |

---

## Stack

| Vrstva | Volba |
|---|---|
| HTML | HTML5 semantic |
| CSS | Tailwind CSS (CDN) |
| JS | Vanilla (Intersection Observer pro fade-in, mobile menu toggle) |
| Fonts | Google Fonts (Inter + JetBrains Mono) |
| Icons | Inline SVG |
| Hosting | GitHub Pages |
| Build | None — static files, deploy = `git push` |

Zero npm dependencies. Zero build step. View Source = audit celého kódu.

---

## Lokální spuštění

```bash
git clone https://github.com/kristinakumberova/kristinakumberova.github.io.git
cd kristinakumberova.github.io
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

GitHub Pages servíruje `index.html` z root branche `main`. Push = deploy za ~1 min.

---

## Kontakt

Kristina Kumberová
**E-mail:** kristina.kumberova@seznam.cz
**Telefon:** +420 702 188 376
**LinkedIn:** linkedin.com/in/kristina-kumberova

---

© 2026 Kristina Kumberová · MIT License pro kód
