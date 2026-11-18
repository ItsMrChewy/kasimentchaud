<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Each page is a complete HTML file. Keep its header, content, forms, and footer together in reading order.
- Use ordinary HTML and descriptive CSS class names. Do not reintroduce React components, templates, or generated page fragments.
- Shared styles live in styles.css. Shared interaction code lives in site.js. Keep visible copy and markup in the HTML files.
- Product pages live in produit/<product-id>/index.html. Product cards contain their filter and sort data as HTML data attributes. Keep these attributes consistent with each product page.
- The cart uses the existing cozy-manchot-cart localStorage key and id/size/qty format. Forms and checkout are demonstrations with no backend.
- Product visuals are inline SVG patterns. The brand forbids photography.
- Run npm run check, npm test, and npm run build before publishing source changes.
