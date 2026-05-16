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
  console.log('Source:', meta.width + 'x' + meta.height, '|', meta.format, '| aspect:', (meta.width / meta.height).toFixed(2));

  await sharp(SRC)
    .resize({ width: 3600, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toFile(OUT);

  const outMeta = await sharp(OUT).metadata();
  const outSize = fs.statSync(OUT).size;
  console.log('Output:', outMeta.width + 'x' + outMeta.height);
  console.log('Size:', Math.round(outSize / 1024), 'KB');
})();
