const sharp = require('sharp');
const path = require('path');

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <text x="600" y="340" font-family="Inter, system-ui, sans-serif" font-weight="500" font-style="italic" font-size="160" fill="#f5f5f7" text-anchor="middle" letter-spacing="3.2">ANGEL<tspan fill="#1F8BFF">1</tspan></text>
  <text x="600" y="430" font-family="Inter, system-ui, sans-serif" font-weight="400" font-size="28" fill="#9d9d9d" text-anchor="middle" letter-spacing="1">AI-Enhanced MVP Developer</text>
</svg>`;

sharp(Buffer.from(SVG))
  .resize(1200, 630)
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'og-image.png'))
  .then(() => console.log('og-image.png generated.'))
  .catch((e) => console.error(e));
