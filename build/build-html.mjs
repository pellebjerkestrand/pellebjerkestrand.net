import { build } from "esbuild";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const buildHtml = async (css) => {
  await build({
    bundle: true,
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    entryNames: "[name]",
    entryPoints: [path.resolve(__dirname, "..", "source", "render.jsx")],
    loader: { ".jpg": "file" },
    outdir: path.resolve(__dirname, "..", "dist"),
    platform: "node",
    sourcemap: false,
    target: ["node16"],
  });

  const { render } = await import("../dist/render.js");
  await fsp.rm(path.resolve(__dirname, "..", "dist", "render.js"));

  return render({ css, title: "Pelle Bjerkestrand" });
};
