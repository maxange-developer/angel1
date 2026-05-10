const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = path.join(__dirname, '../public/logo-angel1.webp');
const OUT = path.join(__dirname, '../public');

async function generate() {
  console.log('Generating favicons from logo-angel1.webp...');

  await sharp(INPUT)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon-16x16.png'));
  console.log('✓ favicon-16x16.png');

  await sharp(INPUT)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon-32x32.png'));
  console.log('✓ favicon-32x32.png');

  await sharp(INPUT)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  await sharp(INPUT)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon-192x192.png'));
  console.log('✓ favicon-192x192.png');

  await sharp(INPUT)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(OUT, 'favicon-512x512.png'));
  console.log('✓ favicon-512x512.png');

  const ico32 = await sharp(INPUT)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  try {
    const pngToIco = require('png-to-ico');
    const icoBuffer = await pngToIco([ico32]);
    fs.writeFileSync(path.join(OUT, 'favicon.ico'), icoBuffer);
    console.log('✓ favicon.ico (multi-size via png-to-ico)');
  } catch {
    fs.writeFileSync(path.join(OUT, 'favicon.ico'), ico32);
    console.log('✓ favicon.ico (fallback: 32x32 png as ico)');
  }

  console.log('\nAll favicons generated successfully.');
}

generate().catch(console.error);
