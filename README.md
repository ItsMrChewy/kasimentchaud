# Cozy Manchot

A plain HTML website. Every page contains its complete header, content, forms, and footer in reading order.

## Edit a page

- Homepage — `index.html`
- Shop — `boutique/index.html`
- Hoodies — `hoodies/index.html`
- Blankets — `couvertures/index.html`
- Story — `histoire/index.html`
- Contact and FAQ — `contact/index.html`
- Cart and checkout — `panier/index.html`
- Individual products — `produit/<product-id>/index.html`
- Missing pages — `404.html`

Move, duplicate, or edit HTML directly inside that page. SVG illustrations are inline so their shapes and colors stay in the page too. Each page has its own navigation and footer, which can be edited independently.

`styles.css` contains ordinary CSS with names such as `site-header`, `hero-title`, and `product-card`. `site.js` only handles interactions such as the menu, filters, artwork views, forms, and the saved cart.

Products have readable `data-product-id`, `data-price`, `data-category`, `data-color`, and `data-sizes` attributes. Update the price text and its `data-price` value together. Keep the shop cards in sync with the product page. The tests flag inconsistent catalog attributes.

## Visual editing

For a visual editor that works directly with these plain HTML and CSS files, open this folder as a project in [Pinegrow Web Editor](https://pinegrow.com/docs/getting-started/how-to-edit-your-existing-website-with-pinegrow/). The source files remain the website: there is no CMS content model or component conversion to maintain. Review and commit the edited files with Git as usual.

### Builder.io Code / Projects

Use this GitHub branch in the existing Builder Code project.

- Runtime — Node.js 22.17 or newer
- Install command — `bun install --frozen-lockfile`
- Dev command — `bun run dev`
- Preview URL — use Builder's detected Vite URL
- Validation — `bun run check && bun run test && bun run build`
- Build command — `bun run build`
- Static output directory — `dist`
- Design mode selector — `body`

The isolated [Cozy Manchot — Plain HTML branch](https://builder.io/app/projects/b8b0b6b44b514d6bb7b1/circular-brain-1qmdoiff) loads this site in Builder's preview. Use Interact mode to open the menu, change filters, or switch product artwork. Code mode exposes the complete HTML pages.

Visual editing is not verified: Builder reported “No Editable Elements Found,” and its Style tab did not select native HTML elements during testing. A development-only source-location mapping experiment did not resolve selection and was removed. Do not assume that preview support means Design mode can save changes to these HTML files. The existing project's default Git branch remains `main`.

Append `?edit=1` to a page's preview URL to show conditional content such as form confirmations, open FAQ answers, and cart states. On the cart page this displays a sample item without saving it. This makes the HTML available to select while designing. Reopen the regular URL to test normal behavior.

The source contains no Builder Content CMS integration or account credentials.

## Local development

Use Node.js 22.17+ and Bun.

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run test
bun run build
bun run preview
```

Vite is only the local preview and build tool. The output is static HTML, CSS, and JavaScript. Deploy the whole `dist` directory to a static host with directory index URLs and a custom `404.html` page.

The contact form, newsletter, and checkout keep the original demonstration behavior. They display confirmations locally and do not send messages, take payments, or save orders to a backend.
