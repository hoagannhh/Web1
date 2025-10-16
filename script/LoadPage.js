import { HomeComponent } from "./Pages/HomePage.js";
import { TaskBar } from "./Pages/Taskbar.js";
import { ButtonLogin } from "./Pages/ButtonLogin.js";
import { ButtonRegister } from "./Pages/ButtonRegister.js";
import { accountComponent } from "./Pages/accountPage.js";
import { ButtonVerification } from "./Pages/ButtonVerification .js";
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
};
// div này sẽ chứa code html sau khi load code từ object pages
const container = document.getElementById("container");
loadPageHome()

export function loadPageHome(){
    InsertPage("taskBar");
    InsertPage("home");
}
export function LoadPage(pageName) {
  RemoveData(pageName);
  InsertPage(pageName);
}
function RemoveData(){
  // xóa html
  container.innerHTML = "";
  // xóa css
  const allCssLinks = document.querySelectorAll('link[rel="stylesheet"]')
  if (!allCssLinks) return;
  allCssLinks.forEach((css) =>{
    console.log(typeof(css.dataset.canDeleteCss  ))
      if (css.dataset.canDeleteCss   === "true"){
        css.remove();
      }
  });
}
export function InsertPage(pageName){
    if (!pages[pageName]){
        console.error("Không tìm thấy page có tên: " + pageName + " quay lại trang home");
        pageName ="home";
    }
    LoadHtml(pageName);
    LoadCss(pageName);
    loadLogic(pageName);

}   

function loadLogic(pageName){
  const pageComponent = pages[pageName];
  if (!pageComponent)
    console.error("ko tìm thấy html của " + pageName + " này trong Object");
  pageComponent.init();
}

function LoadHtml(pageName){
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
  linkElement.setAttribute('data-can-delete-css', pageComponent.canDeleteCss);
  document.head.appendChild(linkElement);
}
