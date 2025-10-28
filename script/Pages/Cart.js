import { LoadPage } from "../LoadPage.js";
import { username } from "./ButtonVerification .js";

let html = "";
let isGetInit = true;
export let products = [];
export let totalMoney = 0;
export const Cart = {
  html: `
    <img class="img-just-do-it" src="../img/Group 22.png" alt="">
    <div class="cart">
        <div class="list-product-bought">
            <p><strong>YOUR SELECTION</strong></p>
        </div>
        <div class="infor-cart">
            <p class="order-sumary">Order sumary</p>
            <p class="id-cart">VNCART31232141</p>
            <div class="horizontal-bar"></div>
            <div class="group-outside">
                <div class="group">
                    <p class="total-cost-product-p">Subtotal</p>
                    <p class="total-cost-product">0</p>
                </div>
                <div class="group">
                    <p class="cost-ship-p">Shipping</p>
                    <p class="cost-ship">0</p>
            </div>
            </div>
            <div class="horizontal-bar"></div>
            <div class="group">
                <p class="total-cost-p">Total</p>
                <p class="total-cost">0</p>
                
            </div>
            <div class="horizontal-bar"></div>
            <button class="checkout">Check out</button>
        </div>
    </div>
    `,
  css: "../css/cart.css",
  canDeleteCss: true,
  init: function () {
    console.log("In cart");
    products = [];
    html = "";
    totalMoney = 0;
    isGetInit = true;
    
    const container = document.querySelector(".list-product-bought");
    container.insertAdjacentHTML("beforeend", html);
    GetDataCart();
    AddEventCheckout();
    CaculateTotalMoney();
  },
  HandleEventInCart: function (inforProduct) {
    console.log(inforProduct);
    CreateProduct(inforProduct);
    console.log(products);
  },
};

function GetDataCart(){
  let cart = localStorage.getItem("cart");
  if (cart != null){
    cart = JSON.parse(cart);
    console.log(cart);
    cart.forEach(c => {
      if (c.username === username){
        c.productWithoutCheckout.forEach(i => {
          CreateProduct(i);
        })
      }
    })
  }
}

function SaveDataCart(){
  let cart = localStorage.getItem("cart");
  if (cart != null){
    cart = JSON.parse(cart);
  }else{
    cart = [];
  }
  let productWithoutCheckout = products.filter(p => p.selected === false)
  let element = {
    productWithoutCheckout,
    username
  }
  if (cart.find(c => c.username === username)){
    cart.forEach(c => {
      if (c.username === username){
        c.productWithoutCheckout = productWithoutCheckout;
      }
    })
  }else{
    cart.push(element);
  } 
  localStorage.setItem("cart", JSON.stringify(cart));
}

function AddEventCheckout() {
  const checkoutBtn = document.querySelector(".checkout");
  const container = document.getElementById("container");

  checkoutBtn.addEventListener("click", () => {
    const productsToCheckout = products.filter((p) => p.selected === true);

    if (productsToCheckout.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    sessionStorage.setItem("checkoutSource", "cart");
    LoadPage("payment", container);
  });
}

function SaveCartData() {
  console.log(localStorage.getItem("cartProducts"));

  if (localStorage.getItem("cartProducts") != null) {
    localStorage.removeItem("cartProducts");
    console.log("đã xóa");
  }
  if (localStorage.getItem("cartTotalMoney") != null) {
    localStorage.removeItem("cartTotalMoney");
  }
  SaveDataCart();
  localStorage.setItem("cartTotalMoney", totalMoney);
  localStorage.setItem("cartProducts", JSON.stringify(products));

  console.log("Dữ liệu giỏ hàng đã được lưu vào LocalStorage.");
  console.log(JSON.parse(localStorage.getItem("cartProducts")));
}

function AddEventHandleQuantity_v3(productInfor) {
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;  
  const inpt = prod.querySelector(".quantity");
  inpt.addEventListener("change", (event) => {
    if (event.target.value < 0) {
      alert("ko the nho hon 0");
      return;
    }
    productInfor.quantity = event.target.value;
    if (productInfor.selected) CaculateTotalMoneyWithoutQuantity(productInfor);
  });
}

function AddEventCheckoxProduct(productInfor) {
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;  
  const checkBox = prod.querySelector(".is-bought");
  checkBox.addEventListener("change", () => {
    productInfor.selected = checkBox.checked;
    console.log(productInfor.selected);
    CaculateTotalMoneyWithoutQuantity(productInfor);
  });
}

function CaculateTotalMoneyWithoutQuantity(productInfor) {
  console.log(productInfor.quantity);
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;  
  let temp = 0;
  temp = Number(productInfor.price) * Number(productInfor.quantity);

  if (productInfor.selected) totalMoney += temp;
  else totalMoney -= temp;
  prod.querySelector(".price").textContent = formatVND_manual(Number(temp));

  CaculateTotalMoney();
}

function CaculateTotalMoney() {
  totalMoney = 0;

  products.forEach((product) => {
    if (product.selected) {
      const temp = document.getElementById(product.id);
      if (temp) {  
        console.log(temp);
        console.log(temp.querySelector(".price").textContent);
        totalMoney += parseVND_manual(temp.querySelector(".price").textContent);
      }
    }
  });
  document.querySelector(".total-cost").textContent = formatVND_manual(
    Number(totalMoney)
  );
  document.querySelector(".total-cost-product").textContent = formatVND_manual(
    Number(totalMoney)
  );

  SaveCartData();
}

function UpdateQuantity(productInfor) {
  if (productInfor.quantity === 1) return;
  const prod = document.getElementById(productInfor.id);
  if (prod) {  
    prod.querySelector(".quantity").value = productInfor.quantity;
  }
}

function AddEventHandleQuantity_ve(productInfor) {
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;  
  const inp = prod.querySelector(".quantity");
  inp.addEventListener("change", (event) => {
    productInfor.quantity = event.target.value;
    CaculateTotalMoneyWithoutQuantity(productInfor);
  });
}

function AddEventHandleQuantity(productInfor) {
  const product = document.getElementById(productInfor.id);
  if (!product) return;  
  const btnAdd = product.querySelector(".add");
  const btnSubstract = product.querySelector(".subtract");

  btnAdd.addEventListener("click", () => {
    product.querySelector(".quantity").value++;
    productInfor.quantity++;
    CaculateTotalMoneyWithoutQuantity(productInfor);
  });

  btnSubstract.addEventListener("click", () => {
    if (product.querySelector(".quantity").value - 1 <= 0) {
      console.log(products);
      products = products.filter((p) => p.id !== product.id);
      console.log(products);
      SaveCartData();
      html = ``;
      if (products.length === 0) {
        console.log("before load cart");
        LoadPage("cart", document.getElementById("container"));
        console.log("after load cart");
      }
      products.forEach((productInNewProducts) => {
        CreateProduct(productInNewProducts);
      });
      LoadPage("cart", document.getElementById("container"));

      return;
    }
    product.querySelector(".quantity").value--;
    productInfor.quantity--;
    CaculateTotalMoneyWithoutQuantity(productInfor);
  });
}

function CreateProduct(inforProduct) {
  const productWithQuantity = {
    ...inforProduct,
    quantity: inforProduct.quantity || 1,
    selected: false,
  };
  
  products.push(productWithQuantity);
  
  html += `
            <div id=${productWithQuantity.id} class="product-bought" checked = "${
    productWithQuantity.selected || false
  }">
                <input class="is-bought" type="checkbox" >
                <div class="detail-product">
                    <div class="represent">
                        <img src="${productWithQuantity["img-represent"]}" alt="">
                        <div class="navigator">
                            <button  class="subtract">-</button>
                            <input  class="quantity" type="number" value="${
                              productWithQuantity.quantity || 1
                            }">
                            <button  class="add">+</button>
                        </div>
                    </div>
                    <div class="infor-product-bought">
                        <p class="name">${productWithQuantity.name}</p>
                        <p class="kind-of-shoes">${
                          productWithQuantity.gender + "'s Shoes"
                        }</p>
                        <p class="brand">${productWithQuantity.brand}</p>
                        <p class="color">${productWithQuantity.color}</p>
                        <p class="size">${productWithQuantity.size}</p>
                    </div>
                </div>
                <p class="price">${formatVND_manual(productWithQuantity.price)}</p>
            </div>
            `;
  
  const container = document.querySelector(".list-product-bought");
  if (container) {
    container.insertAdjacentHTML("beforeend", html);
    html = "";  /
    
    UpdateQuantity(productWithQuantity);
    AddEventHandleQuantity(productWithQuantity);
    AddEventHandleQuantity_ve(productWithQuantity);
    AddEventHandleQuantity_v3(productWithQuantity);
    AddEventCheckoxProduct(productWithQuantity);
  }
}

function formatVND_manual(number) {
  let numString = number.toString();

  let parts = numString.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] ? "." + parts[1] : "";

  let formattedInteger = "";
  for (let i = integerPart.length - 1; i >= 0; i--) {
    let char = integerPart[i];
    let digitsProcessed = integerPart.length - 1 - i;

    if (digitsProcessed > 0 && digitsProcessed % 3 === 0) {
      formattedInteger = "," + formattedInteger;
    }
    formattedInteger = char + formattedInteger;
  }
  return formattedInteger + decimalPart + "vnđ";
}

function parseVND_manual(vndString) {
  if (typeof vndString !== "string") {
    return 0;
  }
  const cleanString = vndString.replace("vnđ", "").replace(/,/g, "");

  return parseFloat(cleanString) || 0;
}