import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = new URL('./', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
for (const name of ['index.html', 'style.css', 'app.mjs', 'notebook.mjs', 'drive.mjs', 'favicon.svg']) {
  await copyFile(new URL(name, root), new URL(`dist/${name}`, root));
}
await cp(new URL('fonts/', root), new URL('dist/fonts/', root), { recursive: true });
for (const [source, target] of [['../MiniMax_H3_Colab.ipynb', 'template.json'], ['../presets.json', 'presets.json']]) {
  await copyFile(new URL(source, root), new URL(`dist/${target}`, root));
}
// Version linked assets together so an update cannot retain the previous builder scripts.
const assets = ['app.mjs', 'notebook.mjs', 'drive.mjs', 'style.css', 'presets.json', 'template.json'];
const hash = createHash('sha256');
for (const name of assets) hash.update(await readFile(new URL(`dist/${name}`, root)));
const version = hash.digest('hex').slice(0, 16);
for (const name of ['index.html', 'app.mjs', 'notebook.mjs', 'drive.mjs']) {
  const target = new URL(`dist/${name}`, root);
  let source = await readFile(target, 'utf8');
  for (const asset of assets) source = source.replaceAll(`./${asset}`, `./${asset}?v=${version}`);
  await writeFile(target, source);
}
console.log(`Built browser app: ${fileURLToPath(new URL('dist/', root))}`);
