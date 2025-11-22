import { loadHeaderFooter, qs } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => {
  // initialize shopping cart after header is loaded
  const cart = new ShoppingCart("so-cart", ".product-list");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();
});
