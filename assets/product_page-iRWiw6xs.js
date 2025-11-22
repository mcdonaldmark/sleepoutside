import{g as o,s,a as d,c,l as i,S as n,q as l}from"./ShoppingCart-ClDtzCIC.js";import{E as u}from"./ExternalServices-DglhzZ9G.js";function p(t){return`<section class="product-detail"> <h3>${t.Brand.Name}</h3>
    <h2 class="divider">${t.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${t.Images.PrimaryLarge}"
      alt="${t.NameWithoutBrand}"
    />
    <p class="product-card__price">$${t.FinalPrice}</p>
    <p class="product__color">${t.Colors[0].ColorName}</p>
    <p class="product__description">
    ${t.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
    </div></section>`}class h{constructor(a,e){this.productId=a,this.product={},this.dataSource=e}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}addToCart(){let a=o("so-cart");a||(a=[]),a.push(this.product),s("so-cart",a),d(`${this.product.NameWithoutBrand} added to cart!`)}renderProductDetails(a){document.querySelector(a).insertAdjacentHTML("afterBegin",p(this.product))}}const m=new u("tents"),g=c("product"),C=new h(g,m),r=new n("so-cart",".product-list");function S(t,a){const e=l(".cart-count");e&&(e.textContent=a||0)}i().then(()=>{r.onChange(S),r.init(),C.init()});
