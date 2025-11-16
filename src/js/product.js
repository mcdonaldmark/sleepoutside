import { getParam, loadHeaderFooter, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// initialize data source and product
const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

// initialize shopping cart
const cart = new ShoppingCart("so-cart", ".product-list");

// function to update the cart counter
function updateCartCounter(total, itemsCount) {
  const countEl = qs(".cart-count");
  if (!countEl) return;
  countEl.textContent = itemsCount || 0;
}

// wait for header/footer to load
loadHeaderFooter().then(() => {
  // init cart after header exists
  cart.onChange(updateCartCounter);
  cart.init();

  // init product details after header is ready
  product.init();
});
