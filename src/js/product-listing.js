import { loadHeaderFooter, getParam, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Get category from URL
const category = getParam("category");
const listEl = document.querySelector(".product-list"); // Must match HTML

// Initialize data source
const dataSource = new ProductData();

loadHeaderFooter().then(() => {
  // Initialize cart after header is loaded
  const cart = new ShoppingCart("so-cart", ".cart-container");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();

  // Initialize product list
  const listing = new ProductList(category, dataSource, listEl);
  listing.init();
});
