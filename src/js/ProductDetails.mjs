import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail">
    <h3>${product.Brand?.Name || ""}</h3>
    <h2 class="divider">${product.NameWithoutBrand || ""}</h2>
    <img class="divider" src="${product.Images?.PrimaryMedium || ''}" alt="${product.NameWithoutBrand || ''}" />
    <p class="product-card__price">$${product.FinalPrice ?? ""}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || ""}</p>
    <p class="product__description">${product.DescriptionHtmlSimple || ""}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, category, dataSource) {
    this.productId = productId;
    this.category = category;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.category, this.productId);

    if (!this.product) {
      console.error("Product not found");
      return;
    }

    this.renderProductDetails("main");


    const addButton = document.querySelector("#addToCart");
    if (addButton) {
      addButton.addEventListener("click", this.addToCart.bind(this));
    } else {
      console.warn("#addToCart button not found after render");
    }
  }

  addToCart() {
    let cartContents = getLocalStorage("so-cart") || [];
    cartContents.push(this.product);
    setLocalStorage("so-cart", cartContents);


    window.dispatchEvent(new CustomEvent("cart-updated"));

    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      console.error("Render target not found:", selector);
      return;
    }
    element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}
