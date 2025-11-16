import { loadHeaderFooter, getParam, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// get category and element
const category = getParam("category");
const element = document.querySelector(".product-list");
const dataSource = new ExternalServices();

// initialize shopping cart
const cart = new ShoppingCart("so-cart", ".product-list");

// function to update cart counter
function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

// wait for header/footer to load
loadHeaderFooter().then(() => {
  // initialize cart after header exists
  cart.onChange(updateCartCounter);
  cart.init();

  // initialize product listing after header
  const listing = new ProductList(category, dataSource, element);
  listing.init();
});
