// import { LoadPage } from "../LoadPage.js";
import { LoadCss, LoadPage } from "../LoadPage.js";
import { SideBar } from "./SideBar.js";
import { ProductDetail } from "../ProductDetail/ProductDetail.js";

export let allProducts = [];
export const Product = {
  html: `
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
  init: function () {
    // load thang filter của trang sản phẫm
    LoadSideBar();
    LoadAllProductPage();
  },
};

function LoadSideBar() {
  LoadCss("sidebar");
  SideBar.init();
}
export function LoadProductPageHaveProduct(products) {
  let htmlProduct = "";
  console.log("complete show product by search1")

  let currentPage = 1;
  const productsPerPage = 9; // số sản phẩm trên 1 trang
  renderProduct(htmlProduct, products, currentPage, productsPerPage);
  HandleEventProduct(products);
  renderPagination(htmlProduct, products, currentPage, productsPerPage);
  console.log("complete show product by search3")
}
export function LoadAllProductPage() {
  let htmlProduct = "";

  let currentPage = 1;
  const productsPerPage = 9; // số sản phẩm trên 1 trang
  
  console.log(allProducts)
  if (allProducts && allProducts.length > 0) {
    renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
    HandleEventProduct(allProducts);
    renderPagination(htmlProduct, allProducts, currentPage, productsPerPage);
  } else {
    // Xử lý trường hợp không có dữ liệu (chẳng hạn do lỗi load ban đầu)
    console.error(
      "Không tìm thấy dữ liệu sản phẩm để render. Đang kiểm tra lại load ban đầu."
    );
  }
}
export function HandleEventProduct(allProducts) {
  let products = document.querySelectorAll(".prod-demo");
  products.forEach((product) => {
    AddEventBuyNow(product, product.dataset.id);
    product.addEventListener("click", () => {
      LoadPage("productDetail", document.getElementById("container"));

      console.log(allProducts);
      console.log(
        allProducts.find((productDeta) => productDeta.id === product.dataset.id)
      );

      ProductDetail.HandleEvent(
        allProducts.find((productDeta) => productDeta.id === product.dataset.id)
      );
      // console.log(" su kien cua prod-demo");
    });
  });

document.querySelectorAll('.buy-now-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log("btn-buy-now")
    const card = this.closest('.prod-demo');
    card.classList.add('flipped');
  });
});

// Nút quay lại
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log("close");
    const card = this.closest('.prod-demo');
    card.classList.remove('flipped');
  });
});
// chọn màu
document.querySelectorAll(".img-color").forEach(img => {
  img.addEventListener('click', function(event){
    event.stopPropagation();
    const card = this.closest('.prod-demo');
    console.log(img);
    card.querySelectorAll('.img-color').forEach(b => b.classList.remove('selected'));
    // Thêm selected vào size được chọn
    this.classList.add('selected');
  })
})
// Chọn size
  document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function(event) {
    // Bỏ selected khỏi tất cả size cùng card
    event.stopPropagation();
    const card = this.closest('.prod-demo');
    console.log(btn);
    card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    // Thêm selected vào size được chọn
    this.classList.add('selected');
  });
});

// Checkout
document.querySelectorAll('.checkout-btn').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.stopPropagation();
    const card = this.closest('.prod-demo');
    const selectedSize = card.querySelector('.size-btn.selected');
    const selectedColor = card.querySelector('.img-color.selected');
    if (selectedSize && selectedColor) {
      console.log('Checkout with size:', selectedSize.dataset.size + " " + selectedColor.dataset.color);
      // Xử lý checkout ở đây
    } else {
      alert('Vui lòng chọn size va color!');
    }
  });
});
  // let btns = document.querySelectorAll(".buy-now-btn");
  // btns.forEach((btn) => {
  //   btn.addEventListener("click", (event) => {
  //     console.log(" su kien cua btns");
  //     event.stopPropagation();
  //   });
  // });
}
function AddEventBuyNow(productContainer){

  const buyNow = productContainer.querySelector(".buy-now-btn");
  buyNow.addEventListener("click", (event) => {
    console.log(1);
    buyNow.style.display = "flex";
    event.stopPropagation();
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
    <div class="card-inner">
      <!-- MẶT TRƯỚC -->
      <div class="card-front">
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
      
      <!-- MẶT SAU -->
      <div class="card-back">
        <div class="back-content">
          <h2>JONHSIDE</h2>
          <div class="size-selector">
            <h3>SELECT YOUR COLOR</h3>
            <div class="color-option">
              ${LinkImg(product)}
            </div>
            <h3>SELECT YOUR SIZE</h3>
            <div class="size-options">
              ${LinkSize(product)}
            </div>
          </div>
          <p class="price" style="color: white; font-size: 1.3rem;">${ConvertINTtoVND(product.price)}</p>
          <div class="back-buttons">
            <button class="checkout-btn">Checkout</button>
            <button class="back-btn">←</button>
          </div>
        </div>
      </div>
    </div>
  </div>
                        `;
  });

  document.querySelector(".product-grid").innerHTML = htmlProduct;
  // document
  //   .querySelector(".product-grid")
  //   .insertAdjacentHTML("beforeend", htmlProduct);
}
function LinkSize(product){
  let html= ``;
  product["size"].forEach(size => {
    html += `
          <button class="size-btn" data-size="${size}">${size}</button>
    `
  })
  return html;
}
function LinkImg(product){
  let html = '';
      product["img-link-color"].forEach(imgLink => {
        html += `
          <img class="img-color" data-color="${splitString(imgLink)}" src="${imgLink}" alt="">
        `
  })
  return html;
}
function splitString(path){
  const filename = path.split('/').pop();
  const nameWithoutExt = filename.split('.').shift(); // Hoặc .split('.')[0]
  const color = nameWithoutExt.split('-').pop();
  return color;
}


function renderPagination(
  htmlProduct,
  allProducts,
  currentPage,
  productsPerPage
) {
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
      console.log("Chia trang trong products");
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
