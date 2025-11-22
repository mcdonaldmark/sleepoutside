import { getParam, loadHeaderFooter, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const category = getParam("category") || "tents";
const productId = getParam("product");

const dataSource = new ProductData();
const product = new ProductDetails(productId, category, dataSource);

loadHeaderFooter().then(() => {
  const cart = new ShoppingCart("so-cart", ".cart-container");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();

  product.init();
});
