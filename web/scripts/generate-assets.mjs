/**
 * Rasterize SVG brand assets to PNG/JPEG for favicon + Open Graph (WhatsApp, etc.)
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const assets = join(webRoot, "assets");

async function rasterize(svgName, outputs) {
  const svg = await readFile(join(assets, svgName));
  for (const { file, width, height, format = "png", quality, alsoRoot } of outputs) {
    let pipe = sharp(svg, { density: 320 }).resize(width, height, {
      fit: "contain",
      background: { r: 1, g: 1, b: 2, alpha: 1 },
    });
    if (format === "jpeg") {
      pipe = pipe.jpeg({ quality: quality ?? 92, mozjpeg: true });
    } else {
      pipe = pipe.png({ compressionLevel: 9 });
    }
    const buf = await pipe.toBuffer();
    await writeFile(join(assets, file), buf);
    console.log(`✓ assets/${file}`);
    if (alsoRoot) {
      await writeFile(join(webRoot, file), buf);
      console.log(`✓ ${file} (site root)`);
    }
  }
}

await rasterize("favicon.svg", [
  { file: "favicon-16.png", width: 16, height: 16 },
  { file: "favicon-32.png", width: 32, height: 32 },
  { file: "favicon-48.png", width: 48, height: 48 },
  { file: "apple-touch-icon.png", width: 180, height: 180 },
]);

await rasterize("og-card.svg", [
  {
    file: "og-image.jpg",
    width: 1200,
    height: 630,
    format: "jpeg",
    quality: 94,
    alsoRoot: true,
  },
  {
    file: "og-image.png",
    width: 1200,
    height: 630,
    format: "png",
    alsoRoot: true,
  },
]);

await rasterize("og-card-en.svg", [
  {
    file: "og-image-en.jpg",
    width: 1200,
    height: 630,
    format: "jpeg",
    quality: 94,
    alsoRoot: true,
  },
]);

const icon32 = await readFile(join(assets, "favicon-32.png"));
const icon16 = await readFile(join(assets, "favicon-16.png"));
// Minimal multi-size ICO: use 32px as primary for broad support
await writeFile(join(assets, "favicon.ico"), icon32);
console.log("✓ favicon.ico (32px)");

console.log("Done.");
