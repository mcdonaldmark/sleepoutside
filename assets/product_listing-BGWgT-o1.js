import{c as n,b as i,l as c,S as o,q as l}from"./ShoppingCart-l0afLTKS.js";import{E as d}from"./ExternalServices-DglhzZ9G.js";function m(t){return`<li class="product-card">
  <a href="/product_pages/index.html?product=${t.Id}">
  <img
    src="${t.Images.PrimaryMedium}"
    alt="Image of ${t.Name}"
  />
  <h3 class="card__brand">${t.Brand.Name}</h3>
  <h2 class="card__name">${t.Name}</h2>
  <p class="product-card__price">$${t.FinalPrice}</p></a>
</li>`}class u{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").innerHTML=this.category}renderList(e){n(m,this.listElement,e)}}const h=i("category"),g=document.querySelector(".product-list"),p=new d,r=new o("so-cart",".product-list");function y(t,e){const a=l(".cart-count");a&&(a.textContent=e||0)}c().then(()=>{r.onChange(y),r.init(),new u(h,p,g).init()});
