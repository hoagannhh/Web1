// import { LoadPage } from "../LoadPage.js";
import { LoadCss, LoadPage } from "../LoadPage.js";
import { SideBar } from "./SideBar.js";
import { ProductDetail } from "../ProductDetail/ProductDetail.js";
import { IsAuthenticated } from "../Pages/ButtonVerification .js";
// import { totalMoney, products } from "../Pages/Cart.js";

export let allProducts = JSON.parse(localStorage.getItem("allProduct"));
let productsChecked = [];
export let totalMoney = 0;
let checkOut = false;
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
  console.log("complete show product by search1");

  let currentPage = 1;
  const productsPerPage = 9; // số sản phẩm trên 1 trang
  renderProduct(htmlProduct, products, currentPage, productsPerPage);
  HandleEventProduct(products);
  renderPagination(htmlProduct, products, currentPage, productsPerPage);
  console.log("complete show product by search3");
}
export function LoadAllProductPage() {
  const validProducts = allProducts.filter((p) => p.inventory > 0);
  let htmlProduct = "";

  let currentPage = 1;
  const productsPerPage = 9; // số sản phẩm trên 1 trang

  console.log(allProducts);
  if (allProducts && allProducts.length > 0) {
    renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
    HandleEventProduct(allProducts);
    renderPagination(htmlProduct, validProducts, currentPage, productsPerPage);
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

  document.querySelectorAll(".buy-now-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("btn-buy-now");
      const card = this.closest(".prod-demo");
      card.classList.add("flipped");
    });
  });

  // Nút quay lại
  document.querySelectorAll(".back-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("close");
      const card = this.closest(".prod-demo");
      card.classList.remove("flipped");
    });
  });
  // chọn màu
  document.querySelectorAll(".img-color").forEach((img) => {
    img.addEventListener("click", function (event) {
      event.stopPropagation();
      const card = this.closest(".prod-demo");
      console.log(img);
      card
        .querySelectorAll(".img-color")
        .forEach((b) => b.classList.remove("selected"));
      // Thêm selected vào size được chọn
      this.classList.add("selected");
    });
  });
  // Chọn size
  document.querySelectorAll(".size-btn-product").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      // Bỏ selected khỏi tất cả size cùng card
      event.stopPropagation();
      const card = this.closest(".prod-demo");
      console.log(btn);
      card
        .querySelectorAll(".size-btn-product")
        .forEach((b) => b.classList.remove("selected"));
      // Thêm selected vào size được chọn
      this.classList.add("selected");
    });
  });

  // Checkout

  console.log(checkOut);
  function SaveCartData() {
    // Lưu tổng tiền (dữ liệu nguyên thủy)
    // console.log(localStorage.getItem("payment-method"));
    console.log(localStorage.getItem("cartProducts"));

    if (localStorage.getItem("cartProducts") != null) {
      localStorage.removeItem("cartProducts");
      console.log("đã xóa");
      console.log(localStorage.removeItem("cartProducts"));
    } else {
      console.log("Rỗng");
    }
    if (localStorage.getItem("cartTotalMoney") != null) {
      localStorage.removeItem("cartTotalMoney");
    } else {
      console.log("Rỗng");
    }
    localStorage.setItem("cartTotalMoney", totalMoney);

    // Lưu danh sách sản phẩm (chuyển sang JSON string)
    localStorage.setItem("cartProducts", JSON.stringify(productsChecked));

    console.log("Dữ liệu giỏ hàng đã được lưu vào LocalStorage.");
    // console.log(localStorage.getItem("payment-method"));
    console.log(localStorage.getItem("cartProducts"));
  }
  document.querySelectorAll(".checkout-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      if (IsAuthenticated) {
        const card = this.closest(".prod-demo");
        const productId = card.dataset.id;
        const selectedSizeElement = card.querySelector(".size-btn-product.selected");
        const selectedColorElement = card.querySelector(".img-color.selected");

        if (selectedSizeElement && selectedColorElement) {
          const selectedSize = selectedSizeElement.dataset.size;
          const selectedColor = selectedColorElement.dataset.color;

          //sản phẩm gốc
          const productToCheckout = allProducts.find(
            (productDeta) => productDeta.id === productId
          );

          if (productToCheckout) {
            //
            // tạo object mới và ghi đè thuộc tính 'size' và 'color' bằng giá trị đã chọn.
            const productWithCartStructure = {
              ...productToCheckout,

              size: selectedSize,

              color: selectedColor,

              checkOut: true,
              selected: true, // Thêm selected: true để tương thích với logic lọc của Cart
              quantity: 1,

              // Giữ lại selectedSize/selectedColor chỉ để tham chiếu (hoặc xóa nếu không cần)
              // selectedSize: selectedSize,
              // selectedColor: selectedColor,
            };

            // 2. Thêm vào productsChecked (đã có cấu trúc giống Cart)
            // Lưu ý: Tùy thuộc vào logic giỏ hàng của bạn, bạn có thể kiểm tra trùng lặp tại đây

            // Nếu muốn ghi đè nếu đã tồn tại, hãy xóa phần kiểm tra trùng lặp phức tạp.
            // Ở đây, ta chỉ cần thêm sản phẩm vào mảng.
            productsChecked = []; //dòng này out trinh luôn
            productsChecked.push(productWithCartStructure);

            //tổng tiền và lưu vào LocalStorage
            totalMoney = productsChecked.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            // Gọi hàm SaveCartData để lưu dữ liệu đã cập nhật
            SaveCartData(productsChecked, totalMoney); // (Xem phần bổ sung bên dưới)
            card.classList.remove("flipped"); // Đóng card trước khi chuyển trang (Tùy chọn)
            console.log(localStorage.getItem("cartProducts"));
            sessionStorage.setItem("checkoutSource", "product_detail");
            LoadPage("payment", container);

            card.classList.remove("flipped");
            alert(
              `Đã thêm sản phẩm "${productToCheckout.name}" (Size: ${selectedSize}, Color: ${selectedColor}) vào giỏ hàng!`
            );
          } else {
            console.error("Không tìm thấy sản phẩm với ID:", productId);
          }
        } else {
          alert("Vui lòng chọn size và color!");
        }
      } else {
        alert("Dang nhap truoc khi mua hang");
      }
    });
    // SaveCartData();
  });
  // let btns = document.querySelectorAll(".buy-now-btn");
  // btns.forEach((btn) => {
  //   btn.addEventListener("click", (event) => {
  //     console.log(" su kien cua btns");
  //     event.stopPropagation();
  //   });
  // });
}
function AddEventBuyNow(productContainer) {
  const buyNow = productContainer.querySelector(".buy-now-btn");
  buyNow.addEventListener("click", (event) => {
    console.log(1);
    buyNow.style.display = "flex";
    event.stopPropagation();
  });
}
function renderProduct(htmlProduct, allProducts, currentPage, productsPerPage) {
  const validProducts = allProducts.filter((p) => p.inventory > 0);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = validProducts.slice(startIndex, endIndex);

  htmlProduct = ""; // reset nội dung cũ
  console.log(allProducts);
  currentProducts.forEach((product) => {
    if (product.inventory <= 0) return;
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
          <p class="atribute-prod">${ConvertIDToCategoryMain(product.category).toString()}</p>
          <p style="display:block;" class="atribute-prod">${ConvertIDToCategoryOpt(product.category).toString()}</p>
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
          <p class="price" style="color: white; font-size: 1.3rem;">${ConvertINTtoVND(
            product.price
          )}</p>
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
function LinkSize(product) {
  let html = ``;
  // console.log(product);
  product["size"].forEach((size) => {
    html += `
          <button class="size-btn-product" data-size="${size}">${size}</button>
    `;
  });
  return html;
}
function LinkImg(product) {
  let html = "";
  if (product.hasOwnProperty("img-link-color")){
    product["img-link-color"].forEach((imgLink) => {
      html += `
            <img class="img-color" data-color="${splitString(
              imgLink
            )}" src="${imgLink}" alt="">
          `;
    });
  }else {
    product.color.forEach(c =>{
      html +=  `
            <img class="img-color" data-color="${c}" src="../img/color/${c}.png" alt="">
          `;
    })
  }

  return html;
}
function splitString(path) {
  const filename = path.split("/").pop();
  const nameWithoutExt = filename.split(".").shift(); // Hoặc .split('.')[0]
  const color = nameWithoutExt.split("-").pop();
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
function ConvertIDToCategoryOpt(proCate){
    // console.log(proCate);
  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  let temp = []
  // console.log(categories);
  if (categories.length <= 3) return temp;
  for (let i = 3; i < categories.length; i++){
    for (let j = 0; j < proCate.length; j++){
      if (categories[i].id === proCate[j]){
        temp.push(categories[i].name);
      }
    }
  }
  // console.log(temp)
  return temp;
}
function ConvertIDToCategoryMain(proCate){
  // console.log(proCate);
  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  // console.log(categories);
  let temp = []
  for (let i = 0; i < categories.length; i++){
    for (let j = 0; j < proCate.length; j++){
      if (categories[i].id === proCate[j] && i < 3){
        temp.push(categories[i].name);
      }
    }
  }
    // console.log(temp)
  return temp;
}