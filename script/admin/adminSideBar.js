import { navigateTo } from "./router.js";

export const AdminSideBar = {
    html: 
    `
        <div class="sidebar">
            <div><p class="shop-name">Đế Vương</p></div>
            <div class="admin-account">
              <button class="admin-account-btn">
                <img src="../img/goku.jpg" alt="" class="admin-avatar" />
                <p class="admin-name">Trần Chính Thành</p>
              </button>
            </div>
            <div class="sidebar-list">
              <ul>
                <li>
                  <button class="sidebar-button dashboard">
                    <img
                      src="../icon/admindashboardwhite.png"
                      alt=""
                      class="admin-icon"
                    />Dashboard
                  </button>
                </li>
                <li>
                  <button class="sidebar-button user">
                    <img
                      src="../icon/adminuser.png"
                      alt=""
                      class="admin-icon"
                    />User/Customer
                  </button>
                </li>
                <li>
                  <button class="sidebar-button category">
                    <img
                      src="../icon/admincategory.png"
                      alt=""
                      class="admin-icon"
                    />Category
                  </button>
                </li>
                <li>
                  <button class="sidebar-button product">
                    <img
                      src="../icon/adminproduct.png"
                      alt=""
                      class="admin-icon"
                    />Products
                  </button>
                </li>
                <li>
                  <button class="sidebar-button import">
                    <img
                      src="../icon/adminimport.png"
                      alt=""
                      class="admin-icon"
                    />Import products
                  </button>
                </li>
                <li>
                  <button class="sidebar-button price">
                    <img
                      src="../icon/adminprice.png"
                      alt=""
                      class="admin-icon"
                    />Price
                  </button>
                </li>
                <li>
                  <button  class="sidebar-button order">
                    <img
                      src="../icon/adminorder.png"
                      alt=""
                      class="admin-icon"
                    />Order
                  </button>
                </li>
              </ul>
            </div>
        </div>
    `,
    css: "../css/adminsidebar.css",
    canDeleteCss: false,
    init: function(){
        console.log("-----------------------------------");
        console.log("Logic Side bar");
        const box = document.querySelector(".admin-container");
        box.insertAdjacentHTML("afterbegin", AdminSideBar.html);
        HandleButton();
        navigatePage();
        console.log("end");
    }
}
AdminSideBar.init();

function navigatePage(){
    const allButtons = document.querySelectorAll(".sidebar-button");
    allButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("listen event ");
            if (btn.classList.contains("dashboard")){
                console.log("navigate dashboard");
                navigateTo("/")
            }else if (btn.classList.contains("user")){
                console.log("navigate user");
                navigateTo("/user")
            }
        })
    })
}
function HandleButton(){
    const allButtons = document.querySelectorAll(".sidebar-button");
    allButtons.forEach(function (button) {
        button.addEventListener("click", function () {
        allButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        this.classList.add("active");
        });
    });
}