import { loadHeaderFooter, qs } from "./utils.mjs";
import Alert from './alert.js';
import ShoppingCart from "./ShoppingCart.mjs";

// initialize site alerts
const siteAlerts = new Alert('../json/alerts.json');
siteAlerts.init();

// initialize cart
const cart = new ShoppingCart("so-cart", ".product-list");

// function to update the cart counter
function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return; // element might not exist yet
  countEl.textContent = itemsCount || 0;
}

// load header/footer first, then initialize cart
loadHeaderFooter().then(() => {
  cart.onChange(updateCartCounter); // set callback
  cart.init(); // triggers the callback after loading
});