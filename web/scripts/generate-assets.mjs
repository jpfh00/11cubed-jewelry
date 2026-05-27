/**
 * Favicon from brand diamond icon + deluxe Open Graph banners (WhatsApp, etc.)
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const assets = join(webRoot, "assets");
const sourceIcon = join(assets, "diamond-icon-source.png");

const VOID = { r: 1, g: 1, b: 2, alpha: 1 };
const EMERALD = "#4ecf96";
const GOLD = "#c9a962";

const RESIZE = {
  kernel: sharp.kernel.lanczos3,
  fit: "contain",
};

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** White diamond on transparent — master 1024px for clean downscales */
async function diamondForDarkBg() {
  const { data, info } = await sharp(sourceIcon)
    .resize(1024, 1024, {
      ...RESIZE,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = (px[i] + px[i + 1] + px[i + 2]) / 3;
    if (lum > 235) {
      px[i + 3] = 0;
    } else {
      const a = Math.min(255, Math.round((255 - lum) * 1.08));
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
      px[i + 3] = a;
    }
  }

  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png();
}

/** 4× supersample then downscale — sharper at 16–48px */
async function iconAtSize(diamondPng, innerPx) {
  const ss = Math.max(innerPx * 4, 64);
  return diamondPng
    .clone()
    .resize(ss, ss, { ...RESIZE, background: TRANSPARENT })
    .resize(innerPx, innerPx, RESIZE)
    .png()
    .toBuffer();
}

async function writeFavicons(diamondPng) {
  const sizes = [
    { file: "favicon-16.png", w: 16, pad: 0.12 },
    { file: "favicon-32.png", w: 32, pad: 0.14 },
    { file: "favicon-48.png", w: 48, pad: 0.14 },
    { file: "favicon-64.png", w: 64, pad: 0.14 },
    { file: "apple-touch-icon.png", w: 180, pad: 0.16 },
  ];

  const pngBuffers = [];

  for (const { file, w, pad: padRatio } of sizes) {
    const pad = Math.round(w * padRatio);
    const inner = w - pad * 2;
    const icon = await iconAtSize(diamondPng, inner);

    const out = await sharp({
      create: { width: w, height: w, channels: 4, background: VOID },
    })
      .composite([{ input: icon, gravity: "centre" }])
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    await writeFile(join(assets, file), out);
    console.log(`✓ assets/${file}`);
    if (w <= 48) pngBuffers.push({ w, buf: out });
  }

  await writeFile(join(assets, "favicon.ico"), buildIco(pngBuffers));
  console.log("✓ assets/favicon.ico (16+32+48)");
}

/** Minimal ICO: 16, 32, 48 PNG entries */
function buildIco(entries) {
  const sorted = [...entries].sort((a, b) => a.w - b.w);
  const count = sorted.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirSize = 16;
  const dirStart = 6;
  const dataStart = dirStart + dirSize * count;
  let offset = dataStart;
  const dirs = [];
  const blobs = [];

  for (const { w, buf } of sorted) {
    const dir = Buffer.alloc(dirSize);
    dir.writeUInt8(w === 256 ? 0 : w, 0);
    dir.writeUInt8(w === 256 ? 0 : w, 1);
    dir.writeUInt8(0, 2);
    dir.writeUInt8(0, 3);
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(buf.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirs.push(dir);
    blobs.push(buf);
    offset += buf.length;
  }

  return Buffer.concat([header, ...dirs, ...blobs]);
}

function ogSvg({ title, subtitle, locale }) {
  const tagline =
    locale === "en"
      ? "DIAMONDS · EMERALDS · HAUTE HORLOGERIE"
      : locale === "fr"
        ? "DIAMANTS · ÉMERAUDES · HAUTE HORLOGERIE"
        : "DIAMANTES · ESMERALDAS · ALTA RELOJERÍA";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020203"/>
      <stop offset="45%" stop-color="#010102"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>
    <radialGradient id="emeraldGlow" cx="28%" cy="42%" r="48%">
      <stop offset="0%" stop-color="#1a8f5c" stop-opacity="0.35"/>
      <stop offset="55%" stop-color="#0d6b48" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#010102" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="goldGlow" cx="88%" cy="78%" r="42%">
      <stop offset="0%" stop-color="#c9a962" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#010102" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0"/>
      <stop offset="20%" stop-color="${GOLD}" stop-opacity="0.85"/>
      <stop offset="80%" stop-color="${GOLD}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="titleGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f0e6cc"/>
      <stop offset="100%" stop-color="#c9a962"/>
    </linearGradient>
    <filter id="diamondShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="18" flood-color="#4ecf96" flood-opacity="0.25"/>
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#emeraldGlow)"/>
  <rect width="1200" height="630" fill="url(#goldGlow)"/>

  <!-- fine frame -->
  <rect x="56" y="56" width="1088" height="518" fill="none" stroke="rgba(201,169,98,0.22)" stroke-width="1"/>
  <rect x="72" y="72" width="1056" height="486" fill="none" stroke="rgba(26,143,92,0.15)" stroke-width="1"/>
  <line x1="72" y1="558" x2="1128" y2="558" stroke="url(#goldLine)" stroke-width="1"/>

  <!-- diamond icon (white on dark) -->
  <image href="diamond-icon-light.png" x="118" y="155" width="220" height="220" filter="url(#diamondShadow)" preserveAspectRatio="xMidYMid meet"/>

  <!-- brand block -->
  <text x="420" y="268" font-family="Georgia, 'Times New Roman', serif" font-size="132" fill="#f5f8f7" letter-spacing="14">11</text>
  <text x="548" y="218" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="${EMERALD}">&#179;</text>

  <text x="420" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="url(#titleGold)" letter-spacing="0.38em">${title}</text>
  <text x="420" y="378" font-family="Georgia, 'Times New Roman', serif" font-size="19" fill="#9aab9e" letter-spacing="0.32em">${subtitle}</text>

  <text x="420" y="548" font-family="Georgia, 'Times New Roman', serif" font-size="13" fill="rgba(78,207,150,0.75)" letter-spacing="0.42em">${tagline}</text>

  <!-- accent jewel line -->
  <line x1="420" y1="408" x2="720" y2="408" stroke="${EMERALD}" stroke-opacity="0.45" stroke-width="1"/>
</svg>`;
}

async function rasterizeOg(svgName, outFile, alsoRoot) {
  const svgPath = join(assets, svgName);
  const buf = await sharp(await readFile(svgPath), { density: 300 })
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  await writeFile(join(assets, outFile), buf);
  console.log(`✓ assets/${outFile}`);
  if (alsoRoot) {
    await writeFile(join(webRoot, outFile), buf);
    console.log(`✓ ${outFile} (site root)`);
  }
}

// ——— Run ———
const diamondLight = await diamondForDarkBg();
const diamondLightBuf = await diamondLight.png().toBuffer();
await writeFile(join(assets, "diamond-icon-light.png"), diamondLightBuf);
console.log("✓ assets/diamond-icon-light.png");

await writeFavicons(diamondLight);

const ogSets = [
  {
    svg: "og-share.svg",
    file: "og-share.jpg",
    root: "og-share.jpg",
    title: "ALTA JOYER&#205;A",
    subtitle: "DISE&#209;O A MEDIDA",
    locale: "es",
  },
  {
    svg: "og-share-en.svg",
    file: "og-share-en.jpg",
    root: "og-share-en.jpg",
    title: "HIGH JEWELRY",
    subtitle: "BESPOKE DESIGN",
    locale: "en",
  },
  {
    svg: "og-share-fr.svg",
    file: "og-share-fr.jpg",
    root: "og-share-fr.jpg",
    title: "HAUTE JOAILLERIE",
    subtitle: "CR&#201;ATION SUR MESURE",
    locale: "fr",
  },
];

for (const o of ogSets) {
  const svg = ogSvg(o);
  await writeFile(join(assets, o.svg), svg);
  await rasterizeOg(o.svg, o.file, Boolean(o.root));
}

console.log("Done.");
