// import { LoadPage } from "../LoadPage.js";
import { LoadCss, LoadPage } from "../LoadPage.js";
import { SideBar } from "./SideBar.js";
import { ProductDetail } from "../ProductDetail/ProductDetail.js";

export const Product ={
  html: 
  `
  <div>
    <img src="../img/Group 22.png" alt="" class="just-do-it" /></div>
      ${SideBar.html}
      <div class="page-product">
        <div class="product-grid"></div>
        <div class="pagination"></div>
      </div>
    </div>
  `,
  css: `../css/product.css`,
  canDeleteCss: true,
  init: function(){
    // load thang filter của trang sản phẫm
    LoadSideBar();
    LoadProductPage();
  }
}

function LoadSideBar(){
    LoadCss("sidebar");
    SideBar.init();
}
 function LoadProductPage(){
    let htmlProduct = "";
    let allProducts = [];
    let currentPage = 1;
    const productsPerPage = 9; // số sản phẩm trên 1 trang

    fetch("../data/product.json")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data;
        renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
        HandleEventProduct(allProducts);
        renderPagination(htmlProduct, allProducts, currentPage, productsPerPage);
      })
      .catch((error) => console.error(error));
  }
export function HandleEventProduct(allProducts){
  let products = document.querySelectorAll(".prod-demo");
  products.forEach((product) => {
    product.addEventListener("click", () => {
        LoadPage("productDetail", document.getElementById("container"));

        console.log(allProducts);
        console.log(allProducts.find(productDeta => productDeta.id === product.dataset.id ));


        ProductDetail.HandleEvent(allProducts.find(productDeta => productDeta.id === product.dataset.id ));
        // console.log(" su kien cua prod-demo");
    })
  })


  let btns = document.querySelectorAll(".buy-now-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        console.log(" su kien cua btns");
        event.stopPropagation();
    })
  })
}
function renderProduct(htmlProduct, allProducts, currentPage, productsPerPage) {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  htmlProduct = ""; // reset nội dung cũ

  currentProducts.forEach((product) => {
    htmlProduct += `
        <div class="prod-demo" data-id="${product.id}">
          <div class="prod">
            <div class="new-in-prod"><p class="new-text">New</p></div>
            <img class="img-prod" src="${product["img-represent"]}" />
          </div>
          <div class="info-prod">
            <p class="name-prod">${product.name}</p>
            <p class="atribute-prod">${product.gender} ${product.brand}</p>
            <p class="price">${ConvertINTtoVND(product.price)}</p>
            <div class="buy-now">
              <button class="buy-now-btn">Buy Now</button>
            </div>
            </div>
        </div>
                        `;
  });

  // document.querySelector(".product-grid").innerHTML =  htmlProduct;
  document.querySelector(".product-grid").insertAdjacentHTML("beforeend", htmlProduct)
}
function renderPagination(htmlProduct, allProducts, currentPage, productsPerPage) {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="page-btn ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">
        ${i}
      </button>
    `;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log("Chia trang trong products")
      currentPage = Number(e.target.dataset.page);
      renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
      renderPagination(htmlProduct, allProducts, currentPage, productsPerPage);
      HandleEventProduct(allProducts);
    });
  });
}

function ConvertINTtoVND(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
