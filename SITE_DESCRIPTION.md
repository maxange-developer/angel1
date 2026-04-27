# Angel1 — Sito Portfolio di Massimiliano Angelone

## Descrizione Completa per Agenti AI

---

## 1. PANORAMICA GENERALE

Questo è il sito web personale/portfolio di **Massimiliano Angelone**, un Full Stack Developer e Digital Nomad di 24 anni, nato ad Ancona (Italia) e attualmente residente a Tenerife (Spagna). Il sito è un portfolio/personal brand con un forte focus sullo storytelling personale e professionale.

**Dominio:** `massimilianoangelone.com`  
**Nome progetto:** Angel1  
**Tipo:** Portfolio personale + Blog + Servizi freelance  
**Target:** Potenziali clienti, recruiter, community  
**Tono:** Personale, autentico, ispirazionale  
**Lingua di default:** Italiano (con supporto completo per Inglese e Spagnolo)

---

## 2. TECH STACK

### Framework & Runtime

- **Next.js 14.2** (Pages Router, non App Router)
- **React 18.3**
- **TypeScript 5.3** (strict mode)

### Styling

- **Tailwind CSS 3.4** con configurazione custom estesa
- **CSS custom** in `globals.css` (glass morphism, scrollbar personalizzate, animazioni)

### 3D & Animazioni

- **Three.js 0.160** (campo stellare animato come sfondo globale)
- **@react-three/fiber 8.15** + **@react-three/drei 9.96** (React wrapper per Three.js)
- **Framer Motion 11** (animazioni di pagina e componenti)

### Icone

- **Lucide React 0.344** (set di icone coerente per tutto il sito)

### Analytics & Performance

- **@vercel/analytics 1.6** (tracking visite)
- **@vercel/speed-insights 1.3** (monitoraggio performance)

### Contenuti

- **react-markdown 10.1** (rendering contenuti Markdown)

### Build & Deploy

- **Vercel** (deploy target implicito, configurazione ottimizzata)
- Sitemap generata automaticamente via script (`scripts/generate-sitemap.js`)
- Image optimization via Next.js (formati AVIF e WebP)
- Console.log rimossi in produzione automaticamente

### SEO

- Meta tags completi (Open Graph, Twitter Cards)
- JSON-LD Schema (Person + Website)
- Sitemap XML + robots.txt
- Geo-tags per Italia e Tenerife
- Tag hreflang per multilingua

---

## 3. ARCHITETTURA DEL PROGETTO

### Struttura Directory

```
Angel1/
├── public/
│   ├── images/              # Tutte le immagini del sito (formato .webp ottimizzato)
│   │   ├── logo/            # Loghi (logo-white.webp, logo-black.webp)
│   │   ├── me-*.webp        # Foto personali
│   │   ├── holly-*.webp     # Foto del gatto Holly
│   │   ├── ancona-*.webp    # Foto di Ancona
│   │   ├── vietnam-*.webp   # Foto del Vietnam
│   │   ├── barcellona-*.webp # Foto di Barcellona
│   │   ├── spain-*.webp     # Foto Road Trip Spagna
│   │   ├── tn23-*.webp      # Foto Tenerife 2023
│   │   ├── tn25-*.webp      # Foto Tenerife 2025
│   │   ├── babyme*.webp     # Foto infanzia
│   │   ├── family-*.webp    # Foto famiglia
│   │   └── *-logo.*         # Loghi aziendali (start2impact, altesia, airplay)
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── favicon-*.png
├── src/
│   ├── pages/               # Route del sito (Next.js Pages Router)
│   │   ├── _app.tsx         # App wrapper (provider, layout, preloading immagini)
│   │   ├── _document.tsx    # HTML document (meta, favicon, lang="it")
│   │   ├── index.tsx        # Homepage
│   │   ├── services.tsx     # Pagina servizi
│   │   ├── timeline.tsx     # Pagina timeline professionale/personale
│   │   └── blog/
│   │       ├── index.tsx    # Lista blog posts
│   │       └── [slug].tsx   # Singolo post (con supporto speciale per "la-mia-storia")
│   ├── components/
│   │   ├── Header.tsx       # Navbar con navigazione + language selector + menu mobile
│   │   ├── Layout.tsx       # Layout globale (header + main + social buttons desktop + language selector)
│   │   ├── ThreeBackground.tsx  # Sfondo 3D con particelle stellari animate
│   │   ├── SEO.tsx          # Componente SEO (meta, OG, JSON-LD, geo-tags)
│   │   ├── Typewriter.tsx   # Effetto typewriter animato (scrittura/cancellazione testi)
│   │   └── LandscapeWarning.tsx # Avviso per ruotare il dispositivo mobile in landscape
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Context React per gestione lingua (it/en/es)
│   ├── hooks/
│   │   └── useTranslation.ts   # Hook custom per accedere alle traduzioni con dot-notation
│   ├── data/
│   │   ├── blog-posts.json       # Lista blog post (attualmente solo "la-mia-storia")
│   │   ├── blog-translations.json # Traduzioni contenuti blog (it/en/es)
│   │   ├── la-mia-storia.json    # Dati strutturati storia personale (capitoli + immagini)
│   │   ├── services.json          # Dati dei 3 servizi offerti
│   │   ├── seo.json               # Dati SEO per ogni pagina e lingua
│   │   ├── timeline.json          # 11 eventi timeline (work/travel/milestone)
│   │   └── timeline-translations.json # Traduzioni per ogni evento timeline (it/en/es)
│   ├── translations/
│   │   └── translations.json      # Traduzioni UI globali (navbar, labels, CTA, etc.)
│   └── styles/
│       └── globals.css            # Stili globali (glass morphism, scrollbar, animazioni)
├── scripts/
│   └── generate-sitemap.js        # Script generazione sitemap automatica
└── planning/                      # Documenti di pianificazione (non parte del sito)
```

---

## 4. SISTEMA DI ROUTING / NAVIGAZIONE

Il sito ha **4 pagine principali** + 1 pagina dinamica:

| Route          | Pagina       | Descrizione                                       |
| -------------- | ------------ | ------------------------------------------------- |
| `/`            | Homepage     | Presentazione personale con foto, typewriter, CTA |
| `/timeline`    | Timeline     | Percorso professionale e personale cronologico    |
| `/blog`        | Blog         | Lista post con post pinnato in evidenza           |
| `/blog/[slug]` | Post singolo | Articolo completo (speciale per "la-mia-storia")  |
| `/services`    | Servizi      | 3 servizi offerti con dettagli e contatti         |

La navigazione è gestita da un **Header fisso** (`Header.tsx`) con:

- **Desktop:** Logo a sinistra + 4 link di navigazione a destra (Home, Timeline, Blog, Servizi)
- **Mobile:** Logo a sinistra + hamburger menu con overlay
- Link attivo evidenziato in neon-blue (`#00f0ff`)
- Sfondo trasparente → blur nero al 90% quando si scrolla

---

## 5. SISTEMA DI INTERNAZIONALIZZAZIONE (i18n)

### Architettura

- **LanguageContext** (`contexts/LanguageContext.tsx`): Context React che mantiene lo stato della lingua corrente (`it` | `en` | `es`) e lo stato del menu lingua
- **useTranslation** (`hooks/useTranslation.ts`): Hook custom che espone una funzione `t(key)` per accedere alle traduzioni usando dot-notation (es. `t("home.tagline")`)
- **Lingua di default:** Italiano (`it`)
- **NON usa URL-based routing** (es. `/en/`, `/es/`) — la lingua cambia dinamicamente client-side senza cambiare URL
- Le bandiere usate come selettore lingua sono caricate da `flagcdn.com` (CDN esterno)

### File di traduzione

1. **`translations/translations.json`** — Traduzioni UI generali (navbar, labels, CTA, testi homepage, servizi, blog)
2. **`data/timeline-translations.json`** — Traduzioni specifiche per ogni evento timeline (title, role, description)
3. **`data/blog-translations.json`** — Traduzioni per i contenuti del blog (title, excerpt, content completo con markdown)
4. **`data/seo.json`** — Titoli, descrizioni e keywords SEO per ogni pagina in ogni lingua

### Selettore lingua UI

- **Desktop:** Bottone circolare con bandiera in basso a destra (fixed), cliccando mostra le altre bandiere disponibili verso l'alto
- **Mobile:** Nel menu hamburger, in basso, bottone circolare con bandiera + opzioni orizzontali

---

## 6. DESIGN SYSTEM & UI

### Palette Colori

| Nome                 | Hex                      | Utilizzo                                                                |
| -------------------- | ------------------------ | ----------------------------------------------------------------------- |
| **Neon Blue**        | `#00f0ff`                | Colore primario, link attivi, work items, bordi CTA, titoli "neon-text" |
| **Neon Pink**        | `#ff00ff`                | Accento, milestone, hover states, bordi foto profilo, post pinnato      |
| **Neon Green**       | `#00ff41`                | Secondario, travel items, feature checkmarks, email link                |
| **Background**       | `#000000`                | Sfondo globale (nero pieno)                                             |
| **Testo primario**   | `#ffffff`                | Testo principale                                                        |
| **Testo secondario** | `rgba(255,255,255, 0.7)` | Descrizioni, bio, paragrafi                                             |
| **Testo terziario**  | `rgba(255,255,255, 0.6)` | Date, label secondarie                                                  |

### Estetica Generale

- **Tema:** Futuristico/cyberpunk, sfondo nero con accenti neon
- **Sfondo 3D:** Campo stellare (5000 particelle) che ruota lentamente, realizzato con Three.js. Colore particelle: neon-blue. Presente su TUTTE le pagine come sfondo fisso
- **Glass morphism:** Effetto vetro smerigliato per cards, modali, menu (backdrop-blur + gradient trasparente)
- **Effetti hover:** "hover-lift" (translate Y -5px + ombra), scale su immagini, transizioni colore
- **Font:** Inter (system font stack fallback)
- **Scrollbar:** Completamente nascosta globalmente. Versione custom neon (blu/pink gradient) disponibile con classe `.custom-scrollbar`
- **Overflow:** `body` ha `overflow: hidden` — ogni pagina gestisce il proprio scroll internamente

### Animazioni Tailwind Custom

- `glow` — Pulsazione dell'ombra neon-blue (2s, infinite)
- `float` — Fluttuazione verticale (6s, infinite)
- `slide-in` — Comparsa da sinistra (0.5s)
- `fade-in` — Fade in opacity (0.6s)
- `typewriter` — Effetto macchina da scrivere (3s)

### Breakpoint Responsive Custom

- `max-h-820` — Altezza massima 820px (per schermi bassi)
- `max-h-948` — Altezza massima 948px
- `tablet-range` — 1024px ≤ width ≤ 1280px
- `tablet-compact` — width ≤ 1278px AND height ≤ 948px
- `blog-vertical` — width ≤ 1024px AND 948px ≤ height ≤ 1440px
- `timeline-vertical` — (width < 1024px) OR (1024px ≤ width ≤ 1280px AND height ≤ 1440px)

---

## 7. COMPONENTI IN DETTAGLIO

### ThreeBackground.tsx

- Sfondo 3D globale presente su ogni pagina
- Canvas Three.js con 5000 particelle (Points) distribuite casualmente in uno spazio 100x100x100
- Particelle color neon-blue (`#00f0ff`), dimensione 0.1, con sizeAttenuation
- Rotazione continua lenta su asse X e Y
- Caricato con `dynamic(() => import(...), { ssr: false })` per evitare errori SSR
- Posizione: fixed, z-index -10, copre tutta la viewport

### Header.tsx

- Header fisso (`fixed top-0, z-50`)
- Contiene: Logo (immagine webp), navigazione desktop (4 link), hamburger mobile
- Effetto scroll: da trasparente a `bg-black/90 + backdrop-blur-lg`
- **Menu mobile:** Overlay con glass morphism, contiene: 4 link navigazione + selettore lingua (con bandiere) + link social (Instagram, LinkedIn, Email)
- Link attivo: colorato in `text-neon-blue`

### Layout.tsx

- Wrappa tutte le pagine
- Struttura: `<Header /> + <main className="pt-20">{children}</main>`
- Contiene i **social buttons desktop fissi** (bottom-right):
  - Selettore lingua (bandiera circolare con dropdown verso l'alto)
  - Instagram (bordo neon-pink)
  - LinkedIn (bordo neon-blue)
  - Email (bordo neon-green)
- Tutti i bottoni social sono `w-12 h-12` circolari con glass morphism

### SEO.tsx

- Accetta: `page` ("home" | "services" | "blog" | "timeline"), `customTitle`, `customDescription`, `image`
- Genera automaticamente in base alla lingua corrente:
  - `<title>` e meta description
  - Open Graph tags (og:title, og:description, og:image, og:url)
  - Twitter Card tags
  - JSON-LD Schema per Person (homepage) e Website
  - Geo-tags (IT + ES)
  - Keywords, author, robots, language, revisit-after

### Typewriter.tsx

- Componente che simula un effetto macchina da scrivere
- Props: `texts[]` (array di stringhe), `speed` (default 100ms), `deleteSpeed` (50ms), `delayBetween` (2000ms)
- Cicla infinitamente tra i testi: scrive carattere per carattere → pausa → cancella → passa al prossimo
- Cursore lampeggiante in neon-blue (`|`)

### LandscapeWarning.tsx

- Overlay fisso z-9999 che appare su mobile in modalità landscape
- Icona rotazione + testo "Ruota il dispositivo"
- Stile: glass morphism con bordo neon-blue
- Visibile solo: `landscape:flex portrait:hidden md:hidden`

---

## 8. PAGINE IN DETTAGLIO

### 8.1 Homepage (`/` — `pages/index.tsx`)

**Layout:** Sezione a schermo intero (min-h-svh) centrata verticalmente.

**Contenuto dall'alto al basso:**

1. **Griglia superiore (2 colonne su desktop, 1 su mobile):**
   - **Sinistra:** Foto profilo circolare con bordo neon-pink e ombra. Immagine: `/images/me-5.webp`
   - **Destra:** Nome in due righe: "MASSIMILIANO" (bianco) + "ANGELONE" (neon-pink). Font bold, dimensioni grandi
2. **Sezione centrale (centrata, max-w-3xl):**
   - **Typewriter:** Cicla tra "Full Stack Developer", "Digital Nomad", "AI Specialist", "Mobile Developer"
   - **Tagline:** Testo tradotto (`home.tagline`): "Sviluppatore Full Stack & Digital Nomad..."
   - **Bio:** Testo tradotto (`home.bio`): "Developer 24enne nato ad Ancona..."
3. **CTA Buttons (2 bottoni affiancati su desktop, stacked su mobile):**
   - "Scopri la mia storia" → `/blog` (bordo neon-blue, effetto fill da sinistra su hover, icona freccia)
   - "I miei servizi" → `/services` (bordo neon-pink, fill su hover)

**Responsive:** Molte classi responsive per gestire schermi piccoli, landscape mobile, tablet. La foto si riduce drasticamente su schermi piccoli. Il testo scala con varie breakpoint.

---

### 8.2 Timeline (`/timeline` — `pages/timeline.tsx`)

**Questa è la pagina più complessa del sito.**

**Dati:** 11 eventi caricati da `timeline.json`, ordinati cronologicamente (dal più vecchio al più recente).

**Tipologie di eventi:**

- `work` (colore neon-blue `#00f0ff`) — Esperienze lavorative: Start2Impact, Altesia, Airplay, Freelance
- `travel` (colore neon-green `#00ff41`) — Viaggi: Ancona, Tenerife 2023, Barcellona, Vietnam, Road Trip Spagna, Trasferimento Tenerife
- `milestone` (colore neon-pink `#ff00ff`) — Traguardi: Holly (il gatto)

**Layout DESKTOP (lg+ e altezza ≥ 820px): Timeline Orizzontale a Carosello**

- Titolo "TIMELINE" in cima
- Linea orizzontale al centro della viewport (~55vh) con gradiente neon-blue → neon-pink → neon-green
- Card degli eventi distribuite sopra e sotto la linea in pattern alternato (pari sopra, dispari sotto)
- Connettori verticali (linea colorata) collegano ogni card al nodo sulla linea
- Nodi circolari sulla linea con effetto ping animato e data sotto/sopra
- **Carosello paginato:** 2 slide su desktop (6+5 eventi), 3 slide su tablet range (3+4+4)
- Frecce di navigazione fisse a sinistra e destra, allineate alla linea centrale
- Ogni card contiene: immagine (logo su sfondo bianco per work, foto per travel), icona tipo, titolo, ruolo (se work), descrizione, tech stack pills (se work)
- Le card work mostrano il logo aziendale su sfondo bianco; Airplay su sfondo nero
- **Click su una card travel** → apre modale slideshow foto
- **Click su una card work/milestone** → apre modale dettagli

**Layout MOBILE/TABLET: Timeline Verticale Scrollabile**

- Linea verticale centrale con gradiente
- Card alternate sinistra/destra
- Nodi circolari colorati sulla linea
- Ogni card: immagine, titolo, ruolo, data, descrizione
- Click apre le stesse modali del desktop

**Modale Travel:**

- Overlay nero 80% con blur
- Immagini con navigazione (frecce + indicatori dot)
- Touch swipe per cambio immagine
- Titolo, descrizione, data
- Se ha un `slug`: link "Vedi Post" al blog
- Se ha `url`: link al sito web
- Pulsante chiudi (X) in alto a destra

**Modale Work/Milestone:**

- Simile, con immagine, titolo, ruolo, data, descrizione
- Tech stack pills (neon-blue)
- Link al sito se presente

**Adattamento compatto:** Se altezza < 800px e larghezza ≥ 768px, le card passano a layout orizzontale (immagine a sinistra, testo a destra, descrizione nascosta) per risparmiare spazio.

---

### 8.3 Blog (`/blog` — `pages/blog/index.tsx`)

**Dati:** Post caricati da `blog-posts.json`. Attualmente c'è **un solo post** ("la-mia-storia"), che è pinnato.

**Layout:**

1. **Header:** Titolo "BLOG" in neon-text + sottotitolo tradotto
2. **Post Pinnato (in evidenza):**
   - Badge "Storia in evidenza" con icona Pin (neon-pink)
   - Grid 2 colonne (desktop):
     - Sinistra: Immagine cover con hover scale 110%
     - Destra: Titolo, excerpt, data (formato italiano), badge categoria, link "Leggi la storia completa"
3. **Lista post normali:** (attualmente vuota, struttura pronta per espansione)

**Social buttons:** Stessi bottoni fissi del Layout (Instagram, LinkedIn, Email) bottom-right su desktop.

---

### 8.4 Post Singolo (`/blog/[slug]` — `pages/blog/[slug].tsx`)

**Routing:** Static paths generati da `blogPosts.map(post => params.slug)`.

**Gestione speciale:** Se `slug === "la-mia-storia"`, carica i dati da `la-mia-storia.json` (struttura a capitoli con immagini) invece che da `blog-posts.json`.

**Layout "La Mia Storia" (post speciale):**

1. **Top bar:** Back button ("Torna al blog"), categoria, data
2. **Header:** Titolo grande in neon-text + excerpt
3. **Cover image:** `/images/me-5.webp` (full width, altezza responsive)
4. **Contenuto a capitoli:** 6 capitoli con:
   - Titolo H3 bold
   - Paragrafi in bianco/80%
   - Immagini intercalate (griglia 2 colonne se multiple, full width se singola)
   - Capitoli: "Il Silenzio Improvviso", "L'Isolamento", "La Speranza", "Il Miracolo", "Creare la Propria Realtà", "Oggi"

**Layout post normali:**

1. Top bar + header + cover identici
2. Contenuto: paragrafi da `content` (split su `\n\n`)
3. Galleria immagini opzionale (grid 2 colonne)

**Traduzione contenuti:** Se è "la-mia-storia", il contenuto viene tradotto integralmente usando le traduzioni in `blog-translations.json` (dove esiste il campo `content` completo in markdown per ogni lingua).

---

### 8.5 Servizi (`/services` — `pages/services.tsx`)

**Dati:** 3 servizi da `services.json`.

**Layout:**

1. **Header:** Titolo "I MIEI SERVIZI" in neon-text + sottotitolo
2. **Grid 3 colonne** (1 su mobile):
   - **Sviluppo Web App & Software** (icona Code)
     - Features: Architetture moderne, Dashboard, Performance SEO, Sicurezza enterprise
   - **Sviluppo Mobile iOS & Android** (icona Smartphone)
     - Features: Cross-Platform React Native/Expo, UI/UX, Pubblicazione Store, Notifiche native
   - **Integrazione AI & Automazione** (icona Bot)
     - Features: Chatbot, Analisi dati, Generazione contenuti, Ottimizzazione workflow

**Ogni card ha:**

- Glass morphism con bordo che diventa neon-pink on hover
- Background gradient animato on hover
- Icona in box neon-pink con rotazione on hover
- Titolo → diventa neon-pink on hover
- Descrizione
- Lista features con checkmark verde (neon-green)

**Contatto:**

- **Desktop:** Popup fisso "Hai bisogno di info?" vicino ai bottoni social, chiudibile con X
- **Mobile:** Sezione contatto dedicata con CTA + 3 bottoni (Instagram, LinkedIn, Email) a tutta larghezza

---

## 9. PERFORMANCE & OTTIMIZZAZIONE

### Image Preloading (`_app.tsx`)

- In produzione, tutte le immagini (timeline, storia, loghi, bandiere, foto profilo) vengono pre-caricate al mount dell'app
- Preloading a batch di 10 con delay di 50ms tra batch
- Usa `<link rel="preload" as="image">` dinamicamente

### Page Prefetching (`_app.tsx`)

- Tutte e 5 le route principali vengono prefetchate: `/`, `/timeline`, `/blog`, `/blog/la-mia-storia`, `/services`

### Immagini

- Tutte le immagini in formato **.webp** (ottimizzato)
- AVIF come formato prioritario (con WebP fallback) via Next.js config
- Cache immutabile (1 anno) per `/images/*`
- `sizes` prop specificato su ogni `<Image>` per responsive loading
- Immagine profilo homepage con `priority` flag

### Next.js Config

- `compress: true`
- `poweredByHeader: false`
- Console remove in produzione
- DNS prefetch attivo
- Immagini SVG consentite con CSP policy

---

## 10. CONTATTI & SOCIAL

I link social sono presenti in modo consistente su tutto il sito:

| Piattaforma   | URL                                          | Colore     |
| ------------- | -------------------------------------------- | ---------- |
| **Instagram** | `https://www.instagram.com/massi_angelone/`  | neon-pink  |
| **LinkedIn**  | `https://www.linkedin.com/in/massiangelone/` | neon-blue  |
| **Email**     | `massiangelone01@gmail.com`                  | neon-green |

**Posizionamento:**

- **Desktop (globale):** Bottoni circolari fissi in basso a destra su tutte le pagine (via `Layout.tsx`), sotto il selettore lingua
- **Mobile (Header):** Nel menu hamburger, in basso, come icone circolari
- **Services mobile:** Sezione contatto dedicata con bottoni full-width
- **Alcune pagine (blog/[slug], blog/index):** Hanno social buttons duplicati inline (da rimuovere in futuro, essendo già nel Layout)

---

## 11. DATI TIMELINE (11 eventi cronologici)

1. **Ancona** (23 Apr 2001) — 🟢 Travel — Nascita, radici familiari
2. **Start2Impact University** (Dic 2022 – Gen 2024) — 🔵 Work — Formazione Full Stack (React, Angular, Node.js, PHP, MySQL)
3. **Tenerife: Prima Visita** (Set 2023) — 🟢 Travel — Viaggio esplorativo di un mese
4. **Altesia – Gruppo Fileni** (Gen 2024 – Dic 2024) — 🔵 Work — Full Stack Dev (.NET/Angular), team Agile
5. **Barcellona** (Set 2024) — 🟢 Travel — Reset personale con cugino Miki
6. **Vietnam** (Dic 2024) — 🟢 Travel — 20gg a Phu Quoc, viaggio in solitaria
7. **Airplay Control – RAI** (Gen 2025 – Presente) — 🔵 Work — Software Engineer, broadcasting & AI
8. **Holly** (Apr 2025) — 🟣 Milestone — Adozione del gatto Holly
9. **Freelance – Angel1** (Apr 2025 – Presente) — 🔵 Work — Mobile & Web Dev / AI Specialist
10. **Road Trip Spagna** (Ott 2025) — 🟢 Travel — 10gg costa spagnola con Holly
11. **Trasferimento a Tenerife** (Ott 2025) — 🟢 Travel — Stabilimento definitivo a Tenerife

---

## 12. STORIA PERSONALE ("La Mia Storia")

Il post speciale del blog, piattaforma narrativa centrale del sito. Racconta (in 6 capitoli con foto) la storia personale di Massi:

- A 2 anni un errore medico causa la perforazione di entrambi i timpani → diagnosi "diventerà sordo"
- Infanzia con sordità parziale, isolamento scolastico, difficoltà comunicative
- I genitori non si arrendono, girano l'Italia cercando cure
- A 11 anni intervento sperimentale a Padova → fallimento
- Dr. Trabalzini prova una tecnica innovativa con cartilagine → successo a 14 anni
- Oggi: developer, digital nomad a Tenerife, vive con il gatto Holly, filosofia di vita basata su libertà e benessere

---

## 13. SERVIZI OFFERTI

1. **Sviluppo Web App & Software** — Next.js, Angular, .NET, dashboard, performance, sicurezza enterprise
2. **Sviluppo Mobile (iOS & Android)** — React Native/Expo, cross-platform, UI/UX, pubblicazione Store
3. **Integrazione AI & Automazione** — Chatbot, analisi dati, generazione contenuti, ottimizzazione workflow

---

## 14. PATTERN UX NOTEVOLI

1. **Sfondo 3D persistente:** Il campo stellare Three.js è un elemento di identità visiva presente su ogni pagina, dà profondità e atmosfera cyberpunk
2. **Glass morphism coerente:** Tutti gli elementi interattivi (card, modali, bottoni) usano lo stesso effetto vetro smerigliato
3. **Color coding semantico:** Blue = lavoro/azione primaria, Pink = accento/milestone, Green = viaggio/conferma
4. **Navigazione timeline a carosello:** Soluzione originale per mostrare 11 eventi senza scroll infinito — paginazione con frecce laterali
5. **Modali immersive per timeline:** Click su un evento apre galleria foto navigabile — storytelling visivo
6. **Typewriter homepage:** Effetto digitale che comunica le competenze in modo dinamico
7. **Post pinnato nel blog:** La storia personale è in primo piano, messaggio forte di branding
8. **Landscape warning mobile:** Forza l'orientamento portrait per esperienza ottimale
9. **Selettore lingua con bandiere:** Intuitivo e visivamente chiaro, con animazione fade-in
10. **Popup contatto contestuale:** Su servizi desktop, popup "Hai bisogno di info?" vicino ai social buttons

---

## 15. ASPETTI TECNICI DA TENERE A MENTE

- **Pages Router** (non App Router): Le pagine sono in `src/pages/`, usano `getStaticProps` / `getStaticPaths`
- **Body overflow hidden:** Il body ha `overflow: hidden` — ogni pagina gestisce il proprio scroll. Questo è intenzionale per evitare doppio scroll con lo sfondo 3D
- **ThreeBackground caricato dinamicamente:** Usa `next/dynamic` con `ssr: false` per evitare errori Three.js server-side
- **Traduzioni client-side only:** La lingua cambia senza reload/redirect. I contenuti multilingua sono caricati staticamente e filtrati client-side
- **Immagini tutte locali:** Eccetto le bandiere (`flagcdn.com`), tutte le immagini sono in `public/images/` e servite staticamente
- **Social buttons duplicati:** Alcune pagine (blog index, blog post) hanno social buttons inline che ridondano con quelli del Layout globale
- **Nessun backend/API:** Il sito è completamente statico (SSG), tutti i dati arrivano da file JSON locali
- **Path alias @/**: Configurato in tsconfig per puntare a `./src/*`
