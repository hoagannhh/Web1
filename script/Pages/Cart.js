import { LoadPage } from "../LoadPage.js";

let html = "";
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
    const container = document.querySelector(".list-product-bought");
    container.insertAdjacentHTML("beforeend", html);
    AddEventForProduct();
  },
  HandleEventInCart: function (inforProduct) {
    console.log(inforProduct);
    CreateProduct(inforProduct);

    console.log(products);
  },
};
function AddEventForProduct() {
  products.forEach((product) => {
    // console.log(product);
    UpdateQuantity(product);
    AddEventHandleQuantity(product);
    AddEventHandleQuantity_ve(product);
    AddEventHandleQuantity_v3(product);
    AddEventCheckoxProduct(product);
    // SaveQuantity(product);
  });
}

//Thêm Cái này để lưu
function SaveCartData() {
  // Lưu tổng tiền (dữ liệu nguyên thủy)
  localStorage.setItem("cartTotalMoney", totalMoney);

  // Lưu danh sách sản phẩm (chuyển sang JSON string)
  localStorage.setItem("cartProducts", JSON.stringify(products));

  console.log("Dữ liệu giỏ hàng đã được lưu vào LocalStorage.");
}

function AddEventHandleQuantity_v3(productInfor) {
  const prod = document.getElementById(productInfor.id);
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
  let temp = 0;
  // if (totalMoney <= 0) return;
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
      console.log(temp);
      console.log(temp.querySelector(".price").textContent);
      totalMoney += parseVND_manual(temp.querySelector(".price").textContent);
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
// update so luong mỗi khi truy cập vào cart tránh trường hợp bị mất số lượng khi out khỏi giỏ hàng
function UpdateQuantity(productInfor) {
  if (productInfor.quantity === 1) return;
  const prod = document.getElementById(productInfor.id);
  prod.querySelector(".quantity").value = productInfor.quantity;
}
function AddEventHandleQuantity_ve(productInfor) {
  const prod = document.getElementById(productInfor.id);
  const inp = prod.querySelector(".quantity");
  inp.addEventListener("change", (event) => {
    productInfor.quantity = event.target.value;
    CaculateTotalMoneyWithoutQuantity(productInfor);
  });
}
function AddEventHandleQuantity(productInfor) {
  const product = document.getElementById(productInfor.id);
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
        AddEventForProduct();
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
  html += `
            <div id=${inforProduct.id} class="product-bought" checked = "${
    inforProduct.selected || false
  }">
                <input class="is-bought" type="checkbox" >
                <div class="detail-product">
                    <div class="represent">
                        <img src="${inforProduct["img-represent"]}" alt="">
                        <div class="navigator">
                            <button  class="subtract">-</button>
                            <input  class="quantity" type="number" value="${
                              inforProduct.quantity || 1
                            }">
                            <button  class="add">+</button>
                        </div>
                    </div>
                    <div class="infor-product-bought">
                        <p class="name">${inforProduct.name}</p>
                        <p class="kind-of-shoes">${
                          inforProduct.gender + "'s Shoes"
                        }</p>
                        <p class="brand">${inforProduct.brand}</p>
                        <p class="color">${inforProduct.color}</p>
                        <p class="size">${inforProduct.size}</p>
                    </div>
                </div>
                <p class="price">${formatVND_manual(inforProduct.price)}</p>
            </div>
            `;
  console.log(html);
  const productWithQuantity = {
    ...inforProduct,
    quantity: 1,
    selected: false,
  };

  products.push(productWithQuantity);
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
