import sharp from "sharp";
import { copyFile, mkdir } from "fs/promises";
import path from "path";

const ROOT = path.resolve(process.cwd());
const SRC = path.join(ROOT, "public/images");
const OUT = path.join(ROOT, "public/images/journal");

async function run() {
  await mkdir(OUT, { recursive: true });

  // 1) family.webp — copy as-is (già 1600x1204, 183KB)
  await copyFile(
    path.join(SRC, "babyme-2.webp"),
    path.join(OUT, "family.webp")
  );
  console.log("[1/3] family.webp — copied (no transform)");

  // 2) transit.webp — vietnam-20.webp (3024x4032)
  //    Crop 16:9 variant C: top=1400, band 3024x1701 → resize 1600x900 q88
  await sharp(path.join(SRC, "vietnam-20.webp"))
    .extract({ left: 0, top: 1400, width: 3024, height: 1701 })
    .resize(1600, 900, { kernel: "lanczos3" })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(OUT, "transit.webp"));
  console.log("[2/3] transit.webp — crop top=1400, resize 1600x900");

  // 3) arrival.webp — tn25-8.webp (4032x3024)
  //    Crop 16:9 centered: top=378, band 4032x2268 → resize 1600x900 q88
  await sharp(path.join(SRC, "tn25-8.webp"))
    .extract({ left: 0, top: 378, width: 4032, height: 2268 })
    .resize(1600, 900, { kernel: "lanczos3" })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(OUT, "arrival.webp"));
  console.log("[3/3] arrival.webp — crop top=378, resize 1600x900");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
