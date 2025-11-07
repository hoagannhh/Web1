import { AdminUser } from "./adminUser.js";
import { AdminDashBoard } from "./adminDashBoard.js";
import { AdminCategory } from "./adminCategory.js";
import { AdminProduct } from "./adminProduct.js";
import { AdminPrice } from "./adminPrice.js";
import { AdminOrder } from "./adminOrder.js";
import { AdminImportProduct } from "./adminImportProduct.js";
import { AdminLogin } from "./adminLogin.js";

import { AdminSideBar } from "./adminSideBar.js";
const routes = {
  "/": AdminDashBoard,
  "/user": AdminUser,
  "/category": AdminCategory,
  "/product": AdminProduct,
  "/price": AdminPrice,
  "/order": AdminOrder,
  "/importProduct": AdminImportProduct,
  "/login": AdminLogin,
};
// Khởi tạo khi DOM ready
navigateTo("/product");
export function navigateTo(path) {
  handleRouteChange(path);
}
// hàm 1: router giúp cho việc điều hướng
function handleRouteChange(path = "/") {
  // Lấy nội dung HTML, nếu không có thì dùng trang 404
  const page = routes[path] || routes["/"];

  // Cập nhật nội dung
  if (!page) {
    console.debug("lỗi k tìm thấy file: " + page);
    return;
  }
  updatePage(page);
}
// hàm 2: cập nhập html, css và logic trang
function updatePage(page) {
  const container = document.getElementById("container");
  if (container) {
    handleHtml(page.html, container);
    handleCss(page.css, page.canDeleteCss);
    handleLogin(page);
  } else {
    console.debug("Không tìm thấy container");
  }
}
// hàm 3: load html
function handleHtml(html, container) {
  container.innerHTML = html;
}
// hàm 4: load css
function handleCss(css, canDeleteCss) {
  let allStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  allStylesheets.forEach((l) => {
    if (l.dataset.canDeleteCss === "true") {
      l.remove();
    }
  });
  // create new link
  let newLink = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.href = css;
  newLink.dataset.canDeleteCss = canDeleteCss;

  // gán lên đầu
  document.head.appendChild(newLink);
}
// hàm 5: load logic
function handleLogin(page) {
  page.init();
}
