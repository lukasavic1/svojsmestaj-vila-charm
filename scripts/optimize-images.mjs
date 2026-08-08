import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."));

for (const file of files) {
  const src = path.join(dir, file);
  const tmp = path.join(dir, `.__tmp__${file}`);
  const before = fs.statSync(src).length;

  await sharp(src)
    .rotate()
    .resize({
      width: 2000,
      height: 2000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(tmp);

  fs.unlinkSync(src);
  const out = src.replace(/\.png$/i, ".jpg");
  fs.renameSync(tmp, out);

  const after = fs.statSync(out).length;
  console.log(
    `${file}: ${(before / 1e6).toFixed(1)}MB → ${(after / 1e3).toFixed(0)}KB`
  );
}

console.log(`Optimized ${files.length} images.`);
