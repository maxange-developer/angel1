const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, 'output');
const OUT = path.join(__dirname, '..', '..', 'public', 'images', 'work');

const JOBS = [
  {
    input: path.join(INPUT, 'lore-cover.png'),
    output: path.join(OUT, 'lore-cover.webp'),
    urlText: 'ai-support-dashboard-six.vercel.app',
    label: 'lore',
  },
  {
    input: path.join(INPUT, 'email-triage-cover.png'),
    output: path.join(OUT, 'email-triage-cover.webp'),
    urlText: 'email-triage-lime.vercel.app',
    label: 'email-triage',
  },
];

async function frameScreenshot({ input, output, urlText }) {
  const canvasWidth = 3600;
  const canvasHeight = 2250;
  const framePadding = 120;
  const chromeHeight = 112;
  const chromeBg = '#1a1a1a';
  const urlBarBg = '#2a2a2a';

  const innerWidth = canvasWidth - framePadding * 2;
  const innerHeight = canvasHeight - framePadding * 2 - chromeHeight;

  const resizedScreenshot = await sharp(input)
    .resize(innerWidth, innerHeight, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000000"/>
        <stop offset="100%" stop-color="#0a0a0a"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="12" stdDeviation="40" flood-color="#1F8BFF" flood-opacity="0.15"/>
        <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#bgGrad)"/>

    <g filter="url(#shadow)">
      <rect x="${framePadding}" y="${framePadding}" width="${innerWidth}" height="${innerHeight + chromeHeight}" rx="24" ry="24" fill="${chromeBg}" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    </g>

    <rect x="${framePadding}" y="${framePadding}" width="${innerWidth}" height="${chromeHeight}" rx="24" ry="24" fill="${chromeBg}"/>
    <rect x="${framePadding}" y="${framePadding + chromeHeight - 24}" width="${innerWidth}" height="24" fill="${chromeBg}"/>

    <circle cx="${framePadding + 48}" cy="${framePadding + chromeHeight / 2}" r="16" fill="#FF5F57"/>
    <circle cx="${framePadding + 96}" cy="${framePadding + chromeHeight / 2}" r="16" fill="#FEBC2E"/>
    <circle cx="${framePadding + 144}" cy="${framePadding + chromeHeight / 2}" r="16" fill="#28C840"/>

    <rect x="${framePadding + 220}" y="${framePadding + 28}" width="${innerWidth - 440}" height="${chromeHeight - 56}" rx="12" ry="12" fill="${urlBarBg}"/>
    <text x="${framePadding + 260}" y="${framePadding + chromeHeight / 2 + 10}" font-family="JetBrains Mono, monospace" font-size="26" fill="rgba(245,245,247,0.5)">${urlText}</text>

    <line x1="${framePadding}" y1="${framePadding + chromeHeight}" x2="${framePadding + innerWidth}" y2="${framePadding + chromeHeight}" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>

    <image x="${framePadding}" y="${framePadding + chromeHeight}" width="${innerWidth}" height="${innerHeight}" href="data:image/png;base64,${resizedScreenshot.toString('base64')}" preserveAspectRatio="xMidYMin slice"/>
  </svg>`;

  await sharp(Buffer.from(frameSvg), { density: 300 })
    .resize(canvasWidth, canvasHeight, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(output);

  const kb = Math.round(fs.statSync(output).size / 1024);
  const meta = await sharp(output).metadata();
  return { kb, width: meta.width, height: meta.height };
}

(async () => {
  for (const job of JOBS) {
    if (!fs.existsSync(job.input)) {
      console.error(`  Input not found: ${job.input}`);
      continue;
    }
    const r = await frameScreenshot(job);
    console.log(`✓ ${job.label}-cover.webp — ${r.width}×${r.height} — ${r.kb} KB`);
  }
})();
