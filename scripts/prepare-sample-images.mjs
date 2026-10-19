import sharp from "sharp";
import { readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
const manifest = JSON.parse(
  readFileSync(
    new URL("../data/sample-image-prompts.json", import.meta.url),
    "utf8",
  ),
);
const source = resolve(
  process.env.CODEX_HOME || resolve(homedir(), ".codex"),
  "generated_images",
  manifest.generatedSession,
);
const destination = fileURLToPath(
  new URL("../public/products/", import.meta.url),
);
mkdirSync(destination, { recursive: true });
for (const asset of manifest.assets) {
  const target = resolve(destination, `sample-${asset.category}.webp`);
  await sharp(resolve(source, asset.sourceFile))
    .resize({
      width: 960,
      height: 960,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 84, effort: 6 })
    .toFile(target);
  console.log(`Prepared ${asset.output}`);
}
