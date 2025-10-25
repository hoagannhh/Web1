import { LoadPage } from "../LoadPage.js";
import { username } from "./ButtonVerification .js";
let donhang = 1;
export const OrderHistory = {
    html: `
    </div>
        <div><img src="../img/Group 22.png" alt="" class="just-do-it" /></div>
    <div class="order">
      <div class="sidebar">
          <div class="sidebar__account">
              <img class="sidebar__account-icon" src="../img/User-represent.png" alt="">
              <p class="sidebar__account-name">tranchinhthanh</p>
          </div>
          <div class="horizontal-bar"></div>
          <div class="sidebar__list">
              <div class="account">
                  <img class="account__img" src="../icon/User.png" alt="">
                  <p class="account__name">Tai khoan cua toi</p>
              </div>
              <div class="order-history">
                  <img class="order-history__img" src="../icon/Bill.png" alt="">
                  <p class="order-history__name">Lich su giao dich</p>
              </div>
          </div>
      </div>
      <div class="vertical-bar"></div>
      <div class="main-content">

      </div>
    </div>
    `,
    canDeleteCss: true,
    css: '../css/orderHistory.css',
    init: function(){
        console.log("load page order history");
        handleHistory();
        AddEvent();
        // console.log()
    }
}
function handleHistory(){
    console.log(username);
    const orders = JSON.parse(localStorage.getItem("orderHistory"));
    console.log(orders);
    if (orders >= 1){
        orders = orders.filter(order => order.username === username);
    }
    console.log(orders);
    let html = '';
    orders.forEach(order => {
        html += `
        <div class="list-product">
              <div class="header">
                  <div class="header__time">${order.ngayDatHang}</div>
                  <div class="header__id">${"Đơn hàng: " + donhang}</div>
                  <div class="header__money">Thành tiền: ${formatPrice(order.totalMoney)}</div>
              </div>
              <!-- <div class="horizontal-bar"></div> -->
              <div class="list-product-history">
                ${LoadHtmlProduct(order.listProducts)}
              </div>
          </div>
        `
        donhang ++;
    });
    document.querySelector(".main-content").innerHTML = html;

}

function LoadHtmlProduct(listProducts){
    let html = 
    ``;
    listProducts.forEach(product => {
        html += `
                    <div class="product-history">
                      <div class="product-conainer-infor">
                        <img class="product__img" src="${product["img-represent"]}" alt="">
                        <div class="product__infor">
                            <div class="product__infor__name">${product.name}</div>
                            <div class="product__infor__category">category: ${product.gender + " shoe's"}</div>
                            <div class="product__infor__brand">Brand: ${product.brand}}</div>
                            <div class="product__infor__color">Color: ${product.color}</div>
                            <div class="product__infor__size">Size: ${product.color}</div>
                            <div class="product__infor__quantity">${product.quantity}</div>
                        </div>
                      </div>
                      <div class="product__money">${formatPrice(product.price)}</div>
                  </div>
                <div class="horizontal-bar"></div>
        `
    })
    return html;
}
function AddEvent(){
    document.querySelector(".sidebar__list .account").addEventListener("click", () => {
        LoadPage("account", document.getElementById("container"));
    })
    document.querySelector(".sidebar__list .order-history").addEventListener("click", () => {
        LoadPage("orderHistory", document.getElementById("container"));
    })
}

function formatPrice(number) {
  if (typeof number !== "number") {
    // Xử lý cả chuỗi có dấu phẩy hoặc giá trị không hợp lệ
    number = parseFloat(String(number).replace(/,/g, "")) || 0;
  }
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
}