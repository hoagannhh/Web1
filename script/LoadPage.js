import { HomeComponent } from "./Pages/HomePage.js";
import { TaskBar } from "./Pages/Taskbar.js";
import { ButtonLogin } from "./Pages/ButtonLogin.js";
import { ButtonRegister } from "./Pages/ButtonRegister.js";
import { accountComponent } from "./Pages/accountPage.js";
import { ProductDetail } from "./ProductDetail/ProductDetail.js";
import { allProducts, Product } from "./Product/Product.js";
import { SideBar } from "./Product/SideBar.js";
import { Cart } from "./Pages/Cart.js";
import { footer } from "./Pages/footer.js";

import { PaymentComponent } from "./payment/payment.js";
import { PaymentConfirmComponent } from "./payment/paymentConfirm.js";
import { OrderHistory } from "./Pages/OrderHistory.js";
// --------------------------------------
// các bước để thêm dữ liệu 1 trang mới vào
// - bước 1: bạn phải tạo 1 file js chứa code html, đường link css và init()=> hàm tạo logic cho file
//  ở trong folder script/pages
// mẫu như taskbar và HomePage
// - bước 2: để có thể sử dụng được bạn phải import file đã tạo như trên
// nói cách khác trong file đó bạn cũng phải export Object chứa code html và css
// và để bên này có thể sử dụng bạn hãy import nó nhứ tớ đã làm ở trên
// - bước 3: thêm attribute đó vào Object pages là xong!! có thể sử dụng LoadPage để truy xuất nó
// Object này sẽ chứa các đường dẫn tới các file js sẽ chứa code html bên trong
// --------------------------------------

export const pages = {
  taskBar: TaskBar,
  home: HomeComponent,
  login: ButtonLogin,
  register: ButtonRegister,
  account: accountComponent,
  productDetail: ProductDetail,
  product: Product,
  sidebar: SideBar,
  footer: footer,
  cart: Cart,
  orderHistory: OrderHistory,
  payment: PaymentComponent,
  paymentConfirm: PaymentConfirmComponent,
};
// div này sẽ chứa code html sau khi load code từ object pages
const ContentContainer = document.getElementById("container");
const taskBarContainer = document.getElementById("task-bar-container");
const footerContainer = document.getElementById("footer");
startApplication();

async function loadInitialData() {
  console.log("Test................");
  // localStorage.removeItem("orderHistory");
  try {
    const response = await fetch("../data/product.json");
    const data = await response.json();

    // Gán dữ liệu vào mảng allProducts đã được export từ Product.js
    allProducts.push(...data);
    console.log(allProducts.length);
  } catch (error) {
    console.error(error);
  }
}

async function startApplication() {
  // chờ dữ liệu được load xong (thằng await này lm xong mơi đc chạy thg khác)
  await loadInitialData();

  //nhở bỏ trang cần load vào hàm này
  loadPageHome();
}

console.log(allProducts);
export function loadPageHome() {
  InsertPage("taskBar", taskBarContainer);
  // InsertPage("productDetail", ContentContainer);
  // InsertPage("cart", ContentContainer);
  // InsertPage("product", ContentContainer);
  InsertPage("home", ContentContainer);

  InsertPage("footer", footerContainer);
}
export function LoadPage(pageName, container) {
  RemoveData(container);
  InsertPage(pageName, container);
}
function RemoveData(container) {
  // xóa html
  container.innerHTML = "";
  // xóa css
  const allCssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  if (!allCssLinks) return;
  allCssLinks.forEach((css) => {
    // if (css.dataset.)
    if (css.dataset.canDeleteCss === "true") {
      css.remove();
    }
  });
}
export function InsertPage(pageName, container) {
  if (!pages[pageName]) {
    console.error(
      "Không tìm thấy page có tên: " + pageName + " quay lại trang home"
    );
    pageName = "home";
  }
  LoadHtml(pageName, container);
  LoadCss(pageName);
  loadLogic(pageName);
}

function loadLogic(pageName) {
  const pageComponent = pages[pageName];
  if (!pageComponent)
    console.error("ko tìm thấy html của " + pageName + " này trong Object");
  pageComponent.init();
}

function LoadHtml(pageName, container) {
  const pageComponent = pages[pageName];
  if (!pageComponent)
    console.error("ko tìm thấy html của " + pageName + " này trong Object");
  container.insertAdjacentHTML("afterbegin", pageComponent.html);
  // container.innerHTML += pageComponent["html"];
}

export function LoadCss(pageName) {
  // ----------------------- kiểm tra các điều kiện -----------------------
  //--------------------------------------------------------------------------
  const cssPath = `../css/${pageName}.css`;
  console.log(cssPath);
  const existingLink = document.querySelector(`link[href="${cssPath}"]`);

  if (existingLink) {
    console.log(`CSS file "${pageName}.css" đã được tải.`);
    return;
  }

  const pageComponent = pages[pageName];
  if (!pageComponent) {
    console.error("ko tìm thấy css của " + pageName + " này trong Object");
  }

  // ----------------------- link 1 css mới vào header -----------------------
  //--------------------------------------------------------------------------
  const element = pageComponent["css"];
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = element;
  linkElement.setAttribute("data-can-delete-css", pageComponent.canDeleteCss);
  document.head.appendChild(linkElement);
}
