const sharp = require('sharp');
const path = require('path');

const SVG_PATH = path.join(__dirname, 'og-image.svg');
const OUT = path.join(__dirname, '..', 'public', 'og-image.png');

sharp(SVG_PATH, { density: 200 })
  .resize(1200, 630)
  .png()
  .toFile(OUT)
  .then(() => console.log('og-image.png generated from vector source'))
  .catch((e) => console.error(e));
