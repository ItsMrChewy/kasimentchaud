// Shared behavior only. All page content and markup live in the HTML files.
const editing = new URLSearchParams(window.location.search).has("edit");
const CART_STORAGE_KEY = "cozy-manchot-cart";
let cart = readCart();

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.size === "string" &&
        Number.isInteger(line.qty) &&
        line.qty > 0,
    );
  } catch {
    return [];
  }
}

function saveCart() {
  if (editing) {
    updateCartCount();
    return;
  }
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // The cart still works for this visit when browser storage is unavailable.
  }
  updateCartCount();
}

function formatPrice(amount) {
  return `${amount.toFixed(2).replace(".", ",")} $`;
}

function updateCartCount() {
  const count = Math.max(
    editing ? 1 : 0,
    cart.reduce((count, line) => count + line.qty, 0),
  );
  const link = document.querySelector("[data-cart-link]");
  link?.setAttribute("aria-label", `Panier, ${count} article(s)`);
  const badge = document.querySelector("[data-cart-count]");
  if (badge) {
    badge.textContent = String(count);
    badge.hidden = count === 0;
  }
}

for (const year of document.querySelectorAll("[data-year]")) {
  year.textContent = String(new Date().getFullYear());
}
updateCartCount();

const menuButton = document.querySelector("[data-menu-toggle]");
const mobileNavigation = document.querySelector("#mobile-navigation");
menuButton?.addEventListener("click", () => {
  mobileNavigation.hidden = !mobileNavigation.hidden;
  menuButton.setAttribute("aria-expanded", String(!mobileNavigation.hidden));
});

const newsletterForm = document.querySelector("[data-newsletter-form]");
newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.hidden = true;
  document.querySelector("[data-newsletter-success]").hidden = false;
});

const contactForm = document.querySelector("[data-contact-form]");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.hidden = true;
  document.querySelector("[data-contact-success]").hidden = false;
});

const shop = document.querySelector("[data-shop]");
if (shop) {
  const cards = Array.from(shop.querySelectorAll("[data-product-card]"));
  const grid = shop.querySelector("[data-products]");
  const sort = shop.querySelector("[data-sort]");
  let category = shop.dataset.category;
  let size = "all";
  let color = "all";

  function updateShop() {
    const categoryCards = cards.filter(
      (card) => category === "all" || card.dataset.category === category,
    );
    const sizes = new Set(categoryCards.flatMap((card) => card.dataset.sizes.split("|")));
    const colors = new Set(categoryCards.map((card) => card.dataset.color));
    for (const button of shop.querySelectorAll("[data-filter] button")) {
      const filter = button.parentElement.dataset.filter;
      const value = button.dataset.value;
      const selected = { category, size, color }[filter];
      button.setAttribute("aria-pressed", String(value === selected));
      button.hidden =
        value !== "all" &&
        ((filter === "size" && !sizes.has(value)) || (filter === "color" && !colors.has(value)));
    }

    let visibleCount = 0;
    for (const card of cards) {
      const matches =
        categoryCards.includes(card) &&
        (size === "all" || card.dataset.sizes.split("|").includes(size)) &&
        (color === "all" || card.dataset.color === color);
      card.hidden = !matches;
      if (matches) visibleCount++;
    }
    const ordered = [...cards];
    if (sort.value === "asc") {
      ordered.sort((first, second) => Number(first.dataset.price) - Number(second.dataset.price));
    }
    if (sort.value === "desc") {
      ordered.sort((first, second) => Number(second.dataset.price) - Number(first.dataset.price));
    }
    grid.append(...ordered);
    shop.querySelector("[data-shop-empty]").hidden = visibleCount > 0;
  }

  shop.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter] button");
    if (!button) return;
    const filter = button.parentElement.dataset.filter;
    if (filter === "category") {
      category = button.dataset.value;
      size = "all";
      color = "all";
    }
    if (filter === "size") size = button.dataset.value;
    if (filter === "color") color = button.dataset.value;
    updateShop();
  });
  sort.addEventListener("change", updateShop);
  updateShop();
}

const productPage = document.querySelector("[data-product]");
if (productPage) {
  const addButton = productPage.querySelector("[data-add-to-cart]");
  let selectedSize = productPage.querySelector("[data-size]").dataset.size;

  function updateProduct() {
    const inCart = cart.some(
      (line) => line.id === productPage.dataset.productId && line.size === selectedSize,
    );
    for (const button of productPage.querySelectorAll("[data-size]")) {
      button.setAttribute("aria-pressed", String(button.dataset.size === selectedSize));
    }
    addButton.disabled = inCart;
    addButton.querySelector("[data-add-label]").hidden = inCart;
    addButton.querySelector("[data-added-label]").hidden = !inCart;
    productPage.querySelector("[data-view-cart]").hidden = !inCart;
  }

  for (const button of productPage.querySelectorAll("[data-size]")) {
    button.addEventListener("click", () => {
      selectedSize = button.dataset.size;
      updateProduct();
    });
  }
  for (const thumbnail of productPage.querySelectorAll("[data-product-view]")) {
    thumbnail.addEventListener("click", () => {
      const visual = productPage.querySelector("[data-main-visual]");
      const artwork = thumbnail.querySelector("svg").cloneNode(true);
      const pattern = artwork.querySelector("pattern");
      const previousId = pattern.id;
      pattern.id = previousId + "-main";
      for (const shape of artwork.querySelectorAll(`[fill="url(#${previousId})"]`)) {
        shape.setAttribute("fill", `url(#${pattern.id})`);
      }
      visual.replaceChildren(...artwork.childNodes);
      for (const button of productPage.querySelectorAll("[data-product-view]")) {
        button.setAttribute("aria-pressed", String(button === thumbnail));
      }
    });
  }
  addButton.addEventListener("click", () => {
    cart.push({ id: productPage.dataset.productId, size: selectedSize, qty: 1 });
    saveCart();
    updateProduct();
  });
  updateProduct();
}

const filledCart = document.querySelector("[data-filled-cart]");
if (filledCart) {
  const emptyCart = document.querySelector("[data-empty-cart]");
  const items = document.querySelector("[data-cart-items]");
  const itemTemplate = items.querySelector("[data-cart-item]").cloneNode(true);
  const summary = document.querySelector(".cart-summary");
  const checkout = document.querySelector("[data-checkout-form]");
  const errorMessage = document.querySelector("[data-cart-error]");
  const productCache = new Map();
  let renderVersion = 0;

  async function loadProduct(productId) {
    if (productCache.has(productId)) return productCache.get(productId);
    const response = await fetch(`/produit/${encodeURIComponent(productId)}/`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Product page unavailable");
    const html = new DOMParser().parseFromString(await response.text(), "text/html");
    const product = html.querySelector("[data-product]");
    if (!product || product.dataset.productId !== productId) return null;
    const info = {
      name: product.querySelector("[data-product-name]").textContent,
      price: Number(product.dataset.price),
      artwork: product.querySelector("[data-main-visual]"),
    };
    productCache.set(productId, info);
    return info;
  }

  async function renderCart() {
    const version = ++renderVersion;
    const lines = [...cart];
    filledCart.hidden = lines.length === 0;
    emptyCart.hidden = lines.length > 0;
    if (lines.length === 0) return;
    checkout.querySelector("button").disabled = true;
    errorMessage.hidden = true;

    try {
      const products = await Promise.all(lines.map((line) => loadProduct(line.id)));
      if (version !== renderVersion) return;
      items.replaceChildren();
      let subtotal = 0;
      const validLines = [];
      for (const [index, line] of lines.entries()) {
        const product = products[index];
        if (!product) continue;
        validLines.push(line);
        subtotal += product.price * line.qty;
        const item = itemTemplate.cloneNode(true);
        const link = item.querySelector("[data-item-name]");
        link.textContent = product.name;
        link.href = `/produit/${encodeURIComponent(line.id)}/`;
        item.querySelector("[data-item-size]").textContent = line.size;
        item.querySelector("[data-item-price]").textContent = formatPrice(product.price);
        const artwork = product.artwork.cloneNode(true);
        artwork.removeAttribute("class");
        artwork.removeAttribute("data-main-visual");
        const pattern = artwork.querySelector("pattern");
        const previousId = pattern.id;
        pattern.id = previousId + "-cart-" + index;
        artwork
          .querySelector(`[fill="url(#${previousId})"]`)
          .setAttribute("fill", `url(#${pattern.id})`);
        item.querySelector("[data-item-art]").replaceChildren(artwork);
        const removeButton = item.querySelector("[data-remove-item]");
        removeButton.setAttribute("aria-label", `Retirer ${product.name}`);
        removeButton.addEventListener("click", () => {
          cart = cart.filter((saved) => !(saved.id === line.id && saved.size === line.size));
          saveCart();
          renderCart();
        });
        items.append(item);
      }
      if (!editing && validLines.length !== cart.length) {
        cart = validLines;
        saveCart();
      }
      const shipping =
        subtotal >= Number(summary.dataset.freeShipping) || subtotal === 0
          ? 0
          : Number(summary.dataset.shippingFee);
      document.querySelector("[data-subtotal]").textContent = formatPrice(subtotal);
      document.querySelector("[data-shipping]").textContent = shipping
        ? formatPrice(shipping)
        : "Gratuite";
      document.querySelector("[data-total]").textContent = formatPrice(subtotal + shipping);
      document.querySelector("[data-shipping-note]").hidden = shipping === 0;
      checkout.querySelector("button").disabled = false;
      filledCart.hidden = validLines.length === 0;
      emptyCart.hidden = validLines.length > 0 && !editing;
    } catch {
      if (version !== renderVersion) return;
      errorMessage.hidden = false;
    }
  }

  checkout.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!editing) {
      cart = [];
      saveCart();
    }
    const name = String(new FormData(checkout).get("name")).split(" ")[0];
    document.querySelector("[data-customer-name]").textContent = name;
    filledCart.hidden = true;
    document.querySelector("[data-order-success]").hidden = false;
  });

  if (editing && cart.length === 0) {
    cart = [{ id: "petit-banquise", size: "S", qty: 1 }];
  }
  renderCart();
}

window.addEventListener("storage", (event) => {
  if (event.key !== CART_STORAGE_KEY) return;
  cart = readCart();
  updateCartCount();
  // A full page refresh reuses the same simple startup logic for every page.
  window.location.reload();
});

// Authoring view shows normally conditional content for visual selection.
// It never submits orders or changes the visitor's stored cart.
if (editing) {
  for (const details of document.querySelectorAll("details")) details.open = true;
  for (const state of document.querySelectorAll(
    "[data-newsletter-success], [data-contact-success], [data-order-success], [data-empty-cart], [data-shop-empty]",
  )) {
    state.hidden = false;
  }
}
