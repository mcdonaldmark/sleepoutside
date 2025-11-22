import { getParam, loadHeaderFooter, qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs"; // local JSON
import ProductDetails from "./ProductDetails.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const category = getParam("category");  // Needed to find product in the correct JSON
const productId = getParam("product");

const dataSource = new ProductData(); // local JSON
const product = new ProductDetails(productId, dataSource);

const cart = new ShoppingCart("so-cart", ".product-list");

function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

loadHeaderFooter().then(() => {
  cart.onChange(updateCartCounter);
  cart.init();

  product.init();
});
