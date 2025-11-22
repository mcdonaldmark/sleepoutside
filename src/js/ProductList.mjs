import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?category=${category}&product=${product.Id}">
      <img src="${product.Images?.PrimarySmall || ''}" alt="Image of ${product.NameWithoutBrand}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    const titleEl = document.querySelector(".title");
    if (titleEl) titleEl.textContent = this.category;
  }

  renderList(list) {
    const cardsHtml = list.map(product => productCardTemplate(product, this.category)).join("");
    this.listElement.innerHTML = cardsHtml;
  }
}
