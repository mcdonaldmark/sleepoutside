import { loadHeaderFooter, getParam, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const category = getParam("category");
const listEl = document.querySelector(".product-list");


const dataSource = new ProductData();

loadHeaderFooter().then(() => {

  const cart = new ShoppingCart("so-cart", ".cart-container");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();


  const listing = new ProductList(category, dataSource, listEl);
  listing.init();
});
