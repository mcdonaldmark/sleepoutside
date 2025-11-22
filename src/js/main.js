import { loadHeaderFooter, qs } from "./utils.mjs";
import Alert from "./alert.js";
import ShoppingCart from "./ShoppingCart.mjs";

const siteAlerts = new Alert("../json/alerts.json");
siteAlerts.init();

function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

loadHeaderFooter().then(() => {

  const cart = new ShoppingCart("so-cart", ".cart-container");
  cart.onChange(updateCartCounter);
  cart.init();
});
