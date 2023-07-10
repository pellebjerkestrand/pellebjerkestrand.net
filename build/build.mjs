import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { buildCss } from "./build-css.mjs";
import { buildHtml } from "./build-html.mjs";

const start = process.hrtime.bigint();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const startCss = process.hrtime.bigint();
const css = await buildCss();
const stopCss = process.hrtime.bigint();
console.log(`💅 CSS made in ${(stopCss - startCss) / 1_000_000n}ms`);

const startHtml = process.hrtime.bigint();
const html = await buildHtml(css);
const stopHtml = process.hrtime.bigint();
console.log(`📖 HTML made in ${(stopHtml - startHtml) / 1_000_000n}ms`);

await fsp.mkdir(path.resolve(__dirname, "..", "dist"), { recursive: true });
await fsp.writeFile(path.resolve(__dirname, "..", "dist", "index.html"), html);

const stop = process.hrtime.bigint();
console.log(`🌍 Everything made in ${(stop - start) / 1_000_000n}ms`);
