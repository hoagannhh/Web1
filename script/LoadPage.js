import { HomeComponent } from "./Pages/HomePage.js";
import { TaskBar } from "./Pages/Taskbar.js";
import { ButtonLogin } from "./Pages/ButtonLogin.js";
import { ButtonRegister } from "./Pages/ButtonRegister.js";
import { accountComponent } from "./Pages/accountPage.js";
// --------------------------------------
// các bước để thêm dữ liệu 1 trang mới vào
// - bước 1: bạn phải tạo 1 file js chứa code html và đường link css ở trong folder script/pages
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
};
// div này sẽ chứa code html sau khi load code từ object pages
const container = document.getElementById("container");
LoadPageHome();

function LoadPageHome() {
  LoadPage("taskBar");
  LoadPage("home");
}
export function ChangePage(pageName) {
  container.innerHTML = "";
  RemovePageCss();
  LoadPage(pageName);
}
function RemovePageCss() {
  const allCssLinks = document.querySelectorAll('link[rel="stylesheet"]');

  allCssLinks.forEach((link) => link.remove());
}
export function LoadPage(pageName) {
  if (!pages[pageName]) {
    console.error(
      "Không tìm thấy page có tên: " + pageName + " quay lại trang home"
    );
    pageName = "home";
  }
  LoadHtml(pageName);
  LoadCss(pageName);
}
function LoadHtml(pageName) {
  const pageComponent = pages[pageName];

  if (!pageComponent) {
    console.error("ko tìm thấy html của " + pageName + " này trong Object");
  }

  pageComponent["html"].forEach((element) => {
    container.innerHTML += element;
  });
}
export function LoadCss(pageName) {
  const cssPath = `../css/${pageName}.css`;
  const existingLink = document.querySelector(`link[href="${cssPath}"]`);

  if (existingLink) {
    console.log(`CSS file "${pageName}.css" đã được tải.`);
    return;
  }

  const pageComponent = pages[pageName];
  if (!pageComponent) {
    console.error("ko tìm thấy css của " + pageName + " này trong Object");
  }

  pageComponent["css"].forEach((element) => {
    // tạo biến để chèn các file css liên quan
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = element;

    // làm cho các file css sẽ xuất hiện ở đầu mỗi head
    document.head.appendChild(linkElement);
  });
}
