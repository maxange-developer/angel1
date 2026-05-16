const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', '..', 'public', 'images', 'work');
const INPUT = path.join(__dirname, 'output');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// Branded SVG covers for toolkit + rag-eval
const TOOLKIT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#000"/>
  <text x="800" y="480" font-family="Inter,system-ui,sans-serif" font-weight="500" font-style="italic" font-size="220" fill="#f5f5f7" text-anchor="middle" letter-spacing="4">ANGEL<tspan fill="#1F8BFF">1</tspan></text>
  <text x="800" y="590" font-family="Inter,system-ui,sans-serif" font-weight="400" font-size="36" fill="#9d9d9d" text-anchor="middle" letter-spacing="1">claude-mvp-toolkit · npm · MIT</text>
</svg>`;

const RAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <rect width="1600" height="900" fill="#000"/>
  <text x="800" y="480" font-family="Inter,system-ui,sans-serif" font-weight="500" font-style="italic" font-size="220" fill="#f5f5f7" text-anchor="middle" letter-spacing="4">ANGEL<tspan fill="#1F8BFF">1</tspan></text>
  <text x="800" y="590" font-family="Inter,system-ui,sans-serif" font-weight="400" font-size="36" fill="#9d9d9d" text-anchor="middle" letter-spacing="1">RAG Eval Harness · open-source</text>
</svg>`;

const JOBS = [
  {
    input: path.join(INPUT, 'lore-cover.png'),
    output: path.join(OUT, 'lore-cover.webp'),
    label: 'lore-cover.webp',
  },
  {
    input: path.join(INPUT, 'email-triage-cover.png'),
    output: path.join(OUT, 'email-triage-cover.webp'),
    label: 'email-triage-cover.webp',
  },
  {
    svg: Buffer.from(TOOLKIT_SVG),
    output: path.join(OUT, 'angel1-mvp-toolkit-cover.webp'),
    label: 'angel1-mvp-toolkit-cover.webp',
  },
  {
    svg: Buffer.from(RAG_SVG),
    output: path.join(OUT, 'angel1-rag-eval-cover.webp'),
    label: 'angel1-rag-eval-cover.webp',
  },
];

(async () => {
  for (const job of JOBS) {
    const src = job.svg ? sharp(job.svg) : sharp(job.input);
    await src.resize(1600, 900, { fit: 'cover' }).webp({ quality: 85 }).toFile(job.output);
    const kb = Math.round(fs.statSync(job.output).size / 1024);
    console.log(`✓ ${job.label} — ${kb} KB`);
  }
})();
