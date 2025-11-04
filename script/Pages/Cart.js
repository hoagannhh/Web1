import { LoadPage } from "../LoadPage.js";
import { username } from "./ButtonVerification .js";

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

    // Reset state
    products = [];
    totalMoney = 0;

    // Load dữ liệu từ localStorage
    LoadCartFromStorage();

    // Render tất cả sản phẩm
    RenderAllProducts();

    // Add event cho checkout button
    AddEventCheckout();

    // Tính tổng tiền
    RecalculateTotalMoney();
  },

  HandleEventInCart: function (inforProduct) {
    console.log("Adding product:", inforProduct);
    AddOrUpdateProduct(inforProduct);
  },
};

// Load dữ liệu từ localStorage
function LoadCartFromStorage() {
  const cartData = localStorage.getItem("cart");
  if (!cartData) return;

  try {
    const cart = JSON.parse(cartData);
    const userCart = cart.find((c) => c.username === username);

    if (userCart && userCart.productWithoutCheckout) {
      products = userCart.productWithoutCheckout.map((p) => ({
        ...p,
        quantity: p.quantity || 1,
        selected: p.selected || false,
      }));
    }
  } catch (error) {
    console.error("Error loading cart:", error);
  }
}

// Thêm hoặc cập nhật sản phẩm
function AddOrUpdateProduct(inforProduct) {
  const existingIndex = products.findIndex((p) => p.id === inforProduct.id);

  if (existingIndex !== -1) {
    // Sản phẩm đã tồn tại - tăng số lượng
    products[existingIndex].quantity =
      (products[existingIndex].quantity || 1) + 1;
  } else {
    // Sản phẩm mới - thêm vào
    products.push({
      ...inforProduct,
      quantity: inforProduct.quantity || 1,
      selected: false,
    });
  }

  // Render lại và lưu
  RenderAllProducts();
  SaveCartToStorage();
  RecalculateTotalMoney();
}

// Render tất cả sản phẩm
function RenderAllProducts() {
  const container = document.querySelector(".list-product-bought");
  if (!container) return;

  // Xóa tất cả sản phẩm cũ (giữ lại tiêu đề)
  const existingProducts = container.querySelectorAll(".product-bought");
  existingProducts.forEach((p) => p.remove());

  // Render từng sản phẩm
  products.forEach((product) => {
    RenderProduct(product, container);
  });
}

// Render một sản phẩm
function RenderProduct(productInfor, container) {
  const productHTML = `
    <div id="${productInfor.id}" class="product-bought">
        <input class="is-bought" type="checkbox" ${
          productInfor.selected ? "checked" : ""
        }>
        <div class="detail-product">
            <div class="represent">
                <img src="${productInfor["img-represent"]}" alt="">
                <div class="navigator">
                    <button class="subtract">-</button>
                    <input class="quantity" type="number" value="${
                      productInfor.quantity || 1
                    }" min="1">
                    <button class="add">+</button>
                </div>
            </div>
            <div class="infor-product-bought">
                <p class="name">${productInfor.name}</p>
                <p class="kind-of-shoes">${productInfor.gender}'s Shoes</p>
                <p class="brand">${productInfor.brand}</p>
                <p class="color">${productInfor.color}</p>
                <p class="size">${productInfor.size}</p>
            </div>
        </div>
        <p class="price">${formatVND_manual(
          productInfor.price * productInfor.quantity
        )}</p>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", productHTML);

  // Add events cho sản phẩm vừa render
  AttachProductEvents(productInfor);
}

// Gắn events cho một sản phẩm
function AttachProductEvents(productInfor) {
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;
  console.log(prod);
  console.log(prod.id);

  const btnAdd = prod.querySelector(".add");
  const btnSubtract = prod.querySelector(".subtract");
  const inputQuantity = prod.querySelector(".quantity");
  const checkbox = prod.querySelector(".is-bought");
  const inventory = getIventoryProducts(prod.id);

  // Event: Tăng số lượng
  btnAdd.addEventListener("click", () => {
    if (productInfor.quantity < inventory) {
      // **Ràng buộc tồn kho**
      productInfor.quantity++;
      inputQuantity.value = productInfor.quantity;
      UpdateProductPrice(productInfor);
    } else {
      alert(`Số lượng tối đa cho sản phẩm này là ${inventory}`);
    }
  });

  // Event: Giảm số lượng
  btnSubtract.addEventListener("click", () => {
    if (productInfor.quantity <= 1) {
      RemoveProduct(productInfor.id);
    } else {
      productInfor.quantity--;
      inputQuantity.value = productInfor.quantity;
      UpdateProductPrice(productInfor);
    }
  });

  // Event: Thay đổi số lượng trực tiếp
  inputQuantity.addEventListener("change", (e) => {
    const newValue = parseInt(e.target.value);

    if (newValue < 1 || isNaN(newValue)) {
      RemoveProduct(productInfor.id);
      return;
    }

    productInfor.quantity = newValue;
    UpdateProductPrice(productInfor);
  });

  // Event: Chọn/bỏ chọn sản phẩm
  checkbox.addEventListener("change", () => {
    productInfor.selected = checkbox.checked;
    RecalculateTotalMoney();
    SaveCartToStorage();
  });
}

// Cập nhật giá của một sản phẩm
function UpdateProductPrice(productInfor) {
  const prod = document.getElementById(productInfor.id);
  if (!prod) return;

  const totalPrice = productInfor.price * productInfor.quantity;
  prod.querySelector(".price").textContent = formatVND_manual(totalPrice);

  RecalculateTotalMoney();
  SaveCartToStorage();
}

// Xóa sản phẩm
function RemoveProduct(productId) {
  products = products.filter((p) => p.id !== productId);

  const prod = document.getElementById(productId);
  if (prod) prod.remove();

  RecalculateTotalMoney();
  SaveCartToStorage();

  // Nếu không còn sản phẩm nào, có thể hiển thị thông báo
  if (products.length === 0) {
    console.log("Cart is empty");
  }
}

function getIventoryProducts(productId) {
  const allProduct = JSON.parse(localStorage.getItem("allProduct")) || [];
  const product = allProduct.find((p) => p.id === productId);
  return product ? product.inventory : Infinity;
}

// Tính lại tổng tiền
function RecalculateTotalMoney() {
  totalMoney = 0;

  products.forEach((product) => {
    if (product.selected) {
      totalMoney += product.price * product.quantity;
    }
  });

  const totalCostElements = document.querySelectorAll(
    ".total-cost, .total-cost-product"
  );
  totalCostElements.forEach((el) => {
    el.textContent = formatVND_manual(totalMoney);
  });

  SaveCartToStorage();
}

// Lưu giỏ hàng vào localStorage
function SaveCartToStorage() {
  let cart = [];
  const cartData = localStorage.getItem("cart");

  if (cartData) {
    try {
      cart = JSON.parse(cartData);
    } catch (error) {
      console.error("Error parsing cart:", error);
      cart = [];
    }
  }

  const productWithoutCheckout = products.filter((p) => !p.selected);
  const userCartIndex = cart.findIndex((c) => c.username === username);

  const userCartData = {
    username,
    productWithoutCheckout,
  };

  if (userCartIndex !== -1) {
    cart[userCartIndex] = userCartData;
  } else {
    cart.push(userCartData);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Lưu thêm vào cartProducts và cartTotalMoney (nếu cần cho trang khác)
  localStorage.setItem("cartProducts", JSON.stringify(products));
  localStorage.setItem("cartTotalMoney", totalMoney.toString());
}

// Event checkout
function AddEventCheckout() {
  const checkoutBtn = document.querySelector(".checkout");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {
    const productsToCheckout = products.filter((p) => p.selected);

    if (productsToCheckout.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    sessionStorage.setItem("checkoutSource", "cart");
    sessionStorage.setItem(
      "checkoutProducts",
      JSON.stringify(productsToCheckout)
    );

    LoadPage("payment", document.getElementById("container"));
  });
}

// Format số thành VND
function formatVND_manual(number) {
  const numString = number.toString();
  const parts = numString.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] ? "." + parts[1] : "";

  let formattedInteger = "";
  for (let i = integerPart.length - 1; i >= 0; i--) {
    const char = integerPart[i];
    const digitsProcessed = integerPart.length - 1 - i;

    if (digitsProcessed > 0 && digitsProcessed % 3 === 0) {
      formattedInteger = "," + formattedInteger;
    }
    formattedInteger = char + formattedInteger;
  }

  return formattedInteger + decimalPart + "vnđ";
}
