import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => {
  const cart = new ShoppingCart("so-cart", ".product-list");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();

  const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
  myCheckout.init();

  document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

  document
    .querySelector("#checkoutSubmit")
    .addEventListener("click", (e) => {
      e.preventDefault();
      myCheckout.checkout();
    });
});
