const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'public', 'images', 'me.jpeg');
const OUT = path.join(__dirname, '..', 'public', 'images', 'me-tnf.webp');

if (!fs.existsSync(SRC)) {
  console.error('Source not found:', SRC);
  process.exit(1);
}

(async () => {
  const meta = await sharp(SRC).metadata();
  console.log('Source:', meta.width + 'x' + meta.height, '|', meta.format);

  await sharp(SRC)
    .resize({ width: 2000, height: 2500, fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(OUT);

  const outSize = fs.statSync(OUT).size;
  console.log('Output:', OUT);
  console.log('Size:', Math.round(outSize / 1024), 'KB');
})();
