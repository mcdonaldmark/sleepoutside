import { loadHeaderFooter, qs } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");

function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

// wait for header/footer to load
loadHeaderFooter().then(() => {
  cart.onChange(updateCartCounter);
  cart.init();
});
