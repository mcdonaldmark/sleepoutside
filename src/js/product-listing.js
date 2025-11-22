import { loadHeaderFooter, getParam, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs"; // Use local JSON
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const category = getParam("category");
const element = document.querySelector(".product-list");
const dataSource = new ProductData(); // switched from ExternalServices

const cart = new ShoppingCart("so-cart", ".product-list");

function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

loadHeaderFooter().then(() => {
  cart.onChange(updateCartCounter);
  cart.init();

  const listing = new ProductList(category, dataSource, element);
  listing.init();
});
