import { transform } from "esbuild";
import { glob } from "glob";
import { compile } from "sass";

export const buildCss = async () =>
  glob("../**/*.scss")
    .then((files) =>
      transform(
        files.map((f) => compile(f)).reduce((all, { css }) => (all += css), ""),
        { loader: "css", minify: true }
      )
    )
    .then((result) => result.code.replace("\n", ""));
