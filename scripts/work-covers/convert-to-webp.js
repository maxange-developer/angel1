const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', '..', 'public', 'images', 'work');
const INPUT = path.join(__dirname, 'output');
const SVG_DIR = path.join(__dirname, 'svg');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

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
    input: path.join(SVG_DIR, 'angel1-mvp-toolkit-cover.svg'),
    output: path.join(OUT, 'angel1-mvp-toolkit-cover.webp'),
    label: 'angel1-mvp-toolkit-cover.webp',
    density: 200,
  },
  {
    input: path.join(SVG_DIR, 'angel1-rag-eval-cover.svg'),
    output: path.join(OUT, 'angel1-rag-eval-cover.webp'),
    label: 'angel1-rag-eval-cover.webp',
    density: 200,
  },
];

(async () => {
  for (const job of JOBS) {
    const opts = job.density ? { density: job.density } : {};
    await sharp(job.input, opts)
      .resize(1600, 900, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(job.output);
    const kb = Math.round(fs.statSync(job.output).size / 1024);
    console.log(`✓ ${job.label} — ${kb} KB`);
  }
})();
