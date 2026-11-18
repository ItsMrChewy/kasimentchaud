import assert from "node:assert/strict";
import { globSync, readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const pages = globSync("**/*.html", {
  cwd: root,
  exclude: ["node_modules/**", "dist/**", ".output/**"],
}).map((file) => ({ file, html: readFileSync(resolve(root, file), "utf8") }));

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]]),
  );
}

test("internal page links and anchors point to existing HTML elements", () => {
  for (const { file, html } of pages) {
    for (const tag of html.match(/<a\b[^>]*>/g) ?? []) {
      const href = attributes(tag).href;
      if (!href || /^(https?:|mailto:|tel:)/.test(href)) continue;
      const url = new URL(href, "https://example.test/" + file.replace(/index\.html$/, ""));
      let target = url.pathname;
      if (target.endsWith("/")) target += "index.html";
      const absolute = resolve(root, "." + target);
      assert.ok(existsSync(absolute), `${file}: missing ${href}`);
      if (url.hash) {
        const targetHtml = readFileSync(absolute, "utf8");
        assert.ok(
          targetHtml.includes(`id="${url.hash.slice(1)}"`),
          `${file}: missing anchor ${href}`,
        );
      }
    }
  }
});

test("catalog card metadata matches the canonical product HTML", () => {
  const products = new Map();
  for (const { file, html } of pages.filter(({ file }) => file.startsWith("produit/"))) {
    const tag = (html.match(/<div\b[^>]*>/g) ?? []).find((tag) =>
      /\sdata-product(?:=|\s|>)/.test(tag),
    );
    assert.ok(tag, file);
    const product = attributes(tag);
    assert.ok(Number(product["data-price"]) > 0, file);
    products.set(product["data-product-id"], product);
  }
  assert.ok(products.size > 0);
  for (const { file, html } of pages) {
    const cards = (html.match(/<a\b[^>]*>/g) ?? []).filter((tag) =>
      tag.includes("data-product-card"),
    );
    for (const tag of cards) {
      const card = attributes(tag);
      const product = products.get(card["data-product-id"]);
      assert.ok(product, `${file}: missing product ${card["data-product-id"]}`);
      for (const field of ["data-price", "data-category", "data-color", "data-sizes"]) {
        assert.equal(card[field], product[field], `${file}: ${card["data-product-id"]} ${field}`);
      }
    }
  }
});

test("SVG references are unique and point to patterns in the same document", () => {
  for (const { file, html } of pages) {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate element ID`);
    for (const [, id] of html.matchAll(/url\(#([^)]+)\)/g)) {
      assert.ok(ids.includes(id), `${file}: missing SVG pattern ${id}`);
    }
  }
});

test("preview source locations follow actual HTML tags and current line numbers", async () => {
  const { addSourceLocations } = await import("../vite.config.js");
  const html = `<!doctype html>\n<html><body>\n<!-- <button>Comment</button> -->\n<h1>Hello</h1>\n<svg><path d="M0 0" /></svg>\n<script>const example = "<button>Text</button>";</script>\n</body></html>`;
  const preview = addSourceLocations(html, "contact/index.html");
  assert.ok(preview.includes('<h1 data-loc="contact/index.html:4">Hello</h1>'));
  assert.ok(preview.includes('<path data-loc="contact/index.html:5"'));
  assert.ok(preview.includes('const example = "<button>Text</button>";'));
  assert.ok(preview.includes("<!-- <button>Comment</button> -->"));
  assert.equal(addSourceLocations(preview, "contact/index.html"), preview);
});
