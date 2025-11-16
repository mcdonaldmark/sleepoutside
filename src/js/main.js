import { loadHeaderFooter, qs } from "./utils.mjs";
import Alert from './alert.js';
import ShoppingCart from "./ShoppingCart.mjs";

const siteAlerts = new Alert('../json/alerts.json');
siteAlerts.init();

const cart = new ShoppingCart("so-cart", ".product-list");

function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

loadHeaderFooter().then(() => {
  cart.onChange(updateCartCounter);
  cart.init();
});