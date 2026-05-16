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
  const canvasWidth = 1600;
  const canvasHeight = 1000;
  const framePadding = 60;
  const chromeHeight = 56;
  const chromeBg = '#1a1a1a';
  const urlBarBg = '#2a2a2a';

  const innerWidth = canvasWidth - framePadding * 2;
  const innerHeight = canvasHeight - framePadding * 2 - chromeHeight;

  const resizedScreenshot = await sharp(input)
    .resize(innerWidth * 2, innerHeight * 2, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  const frameSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000000"/>
        <stop offset="100%" stop-color="#0a0a0a"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="0" dy="6" stdDeviation="20" flood-color="#1F8BFF" flood-opacity="0.15"/>
        <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#bgGrad)"/>

    <g filter="url(#shadow)">
      <rect x="${framePadding}" y="${framePadding}" width="${innerWidth}" height="${innerHeight + chromeHeight}" rx="12" ry="12" fill="${chromeBg}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </g>

    <rect x="${framePadding}" y="${framePadding}" width="${innerWidth}" height="${chromeHeight}" rx="12" ry="12" fill="${chromeBg}"/>
    <rect x="${framePadding}" y="${framePadding + chromeHeight - 12}" width="${innerWidth}" height="12" fill="${chromeBg}"/>

    <circle cx="${framePadding + 24}" cy="${framePadding + chromeHeight / 2}" r="8" fill="#FF5F57"/>
    <circle cx="${framePadding + 48}" cy="${framePadding + chromeHeight / 2}" r="8" fill="#FEBC2E"/>
    <circle cx="${framePadding + 72}" cy="${framePadding + chromeHeight / 2}" r="8" fill="#28C840"/>

    <rect x="${framePadding + 110}" y="${framePadding + 14}" width="${innerWidth - 220}" height="${chromeHeight - 28}" rx="6" ry="6" fill="${urlBarBg}"/>
    <text x="${framePadding + 130}" y="${framePadding + chromeHeight / 2 + 5}" font-family="JetBrains Mono, monospace" font-size="13" fill="rgba(245,245,247,0.5)">${urlText}</text>

    <line x1="${framePadding}" y1="${framePadding + chromeHeight}" x2="${framePadding + innerWidth}" y2="${framePadding + chromeHeight}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

    <image x="${framePadding}" y="${framePadding + chromeHeight}" width="${innerWidth}" height="${innerHeight}" href="data:image/png;base64,${resizedScreenshot.toString('base64')}" preserveAspectRatio="xMidYMid slice"/>
  </svg>`;

  await sharp(Buffer.from(frameSvg), { density: 200 })
    .resize(canvasWidth, canvasHeight, { fit: 'cover' })
    .webp({ quality: 90 })
    .toFile(output);

  const kb = Math.round(fs.statSync(output).size / 1024);
  return kb;
}

(async () => {
  for (const job of JOBS) {
    if (!fs.existsSync(job.input)) {
      console.error(`  Input not found: ${job.input}`);
      continue;
    }
    const kb = await frameScreenshot(job);
    console.log(`✓ ${job.label}-cover.webp — ${kb} KB`);
  }
})();
