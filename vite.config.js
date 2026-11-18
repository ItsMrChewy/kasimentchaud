import { globSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { parse } from "parse5";
import { defineConfig } from "vite";

const pages = globSync("**/*.html", {
  cwd: import.meta.dirname,
  exclude: ["node_modules/**", "dist/**", ".output/**"],
});

// Builder uses the same data-loc format for JSX. Add it to HTML previews
// automatically so the page files stay plain and line numbers stay accurate.
export function addSourceLocations(html, filename) {
  const document = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  function visit(node) {
    const tag = node.sourceCodeLocation?.startTag;
    if (tag && !node.attrs.some((attribute) => attribute.name === "data-loc")) {
      edits.push({
        offset: tag.startOffset + node.tagName.length + 1,
        attribute: ` data-loc="${filename}:${tag.startLine}"`,
      });
    }
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  }
  visit(document);
  for (const edit of edits.reverse()) {
    html = html.slice(0, edit.offset) + edit.attribute + html.slice(edit.offset);
  }
  return html;
}

export default defineConfig({
  appType: "mpa",
  plugins: [
    {
      name: "html-source-locations",
      apply: "serve",
      transformIndexHtml: {
        order: "pre",
        handler(html, context) {
          const filename = relative(import.meta.dirname, context.filename)
            .split(sep)
            .join("/");
          return addSourceLocations(html, filename);
        },
      },
    },
  ],
  server: { host: "0.0.0.0" },
  build: {
    rolldownOptions: {
      input: pages.map((page) => resolve(import.meta.dirname, page)),
    },
  },
});
