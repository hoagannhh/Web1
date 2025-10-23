// import { totalMoney, products } from "./Pages/Cart.js";
// import { LoadPage } from "LoadPage.js";

function showForm() {
  document.getElementById("address-list-view").classList.add("hidden");
  document.getElementById("form-view").classList.remove("hidden");
}

function showAddress() {
  document.getElementById("form-view").classList.add("hidden");
  document.getElementById("address-list-view").classList.add("hidden");
  document.getElementById("address-view").classList.remove("hidden");
}

function showAddressList() {
  document.getElementById("address-view").classList.add("hidden");
  document.getElementById("form-view").classList.add("hidden");
  document.getElementById("address-list-view").classList.remove("hidden");
  renderAddressList();
}

function confirmAddress() {
  const phone = document.getElementById("new-phone").value.trim();
  const address = document.getElementById("new-address").value.trim();

  if (phone !== "" && address !== "") {
    const newEntry = { phone, address };

    // Lấy danh sách cũ (nếu có)
    const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];

    // Thêm địa chỉ mới
    stored.push(newEntry);
    localStorage.setItem("userAddresses", JSON.stringify(stored));

    // Xóa input
    document.getElementById("new-phone").value = "";
    document.getElementById("new-address").value = "";

    showAddressList();
  }
}

// Hiển thị danh sách địa chỉ đã lưu
function renderAddressList() {
  const listEl = document.getElementById("address-list");
  listEl.innerHTML = ""; // reset
  const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];

  if (stored.length === 0) {
    listEl.innerHTML = "<li>No saved addresses.</li>";
  } else {
    stored.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div class="list-address">
      <div class="address&phone"><strong>Phone:</strong> ${item.phone}<br>
        <strong>Address:</strong> ${item.address}<br></div>
      <div ><button onclick="selectAddress(${index})" class="select-btn">Select</button></div></div>
        
        
      `;
      listEl.appendChild(li);
    });
  }
}

// Chọn một địa chỉ trong danh sách
function selectAddress(index) {
  const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];
  const selected = stored[index];
  if (selected) {
    document.getElementById("current-phone").textContent = selected.phone;
    document.getElementById("current-address").textContent = selected.address;

    localStorage.setItem("selectedAddress", JSON.stringify(selected));
  }
  showAddress();
}

// Khi load trang, hiển thị địa chỉ cuối cùng đã dùng (nếu có)
window.addEventListener("DOMContentLoaded", () => {
  const selectedAddressString = localStorage.getItem("selectedAddress");
  if (selectedAddressString) {
    const selected = JSON.parse(selectedAddressString);

    if (selected && selected.phone && selected.address) {
      document.getElementById("current-phone").textContent = selected.phone;
      document.getElementById("current-address").textContent = selected.address;
    }
  } else {
    //chưa có địa chỉ nào được chọn, load địa chỉ cuối cùng từ danh sách
    const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];
    if (stored.length > 0) {
      const last = stored[stored.length - 1];
      document.getElementById("current-phone").textContent = last.phone;
      document.getElementById("current-address").textContent = last.address;

      // Cần lưu luôn vào selectedAddress để lần sau load lại vẫn lấy được
      localStorage.setItem("selectedAddress", JSON.stringify(last));
    }
  }
});

// localStorage.removeItem("userAddresses");

// const Credit = document.querySelector(".credit-method");
// const infoCard = document.querySelector(".infor-card");
// Credit.addEventListener("click", () => {
//   infoCard.classList.toggle("hidden");
//   console.log("cre-dit");
// });

// const paypal = document.querySelector(".paypal-method");
// paypal.addEventListener("click", () => {
//   console.log("paypal clicked");
// });
// const banking = document.querySelector(".m-banking-method");
// banking.addEventListener("click", () => {
//   console.log("banking clicked");
// });

// const cash = document.querySelector(".cash-method");
// cash.addEventListener("click", () => {
//   console.log("cash clicked");
// });

const paymentMethods = document.querySelectorAll(".payment-methood");
const confirmButton = document.getElementById("confirm-btn-payment");
const infoCard = document.querySelector(".infor-card");

let selectedMethod = null;

function selectMethod(element, methodName) {
  paymentMethods.forEach((method) => {
    method.classList.remove("selected");
  });

  element.classList.add("selected");

  selectedMethod = methodName;
  console.log(`${methodName} selected as the final choice.`);

  if (methodName === "credit") {
    infoCard.classList.remove("hidden");
  } else {
    infoCard.classList.add("hidden");
  }
}

// đoạn này là tính tiền và invoice
const storedTotalMoney = localStorage.getItem("cartTotalMoney");
const totalMoneyFromStorage = storedTotalMoney
  ? parseFloat(storedTotalMoney)
  : 0;

// Lấy products
const storedProducts = localStorage.getItem("cartProducts");
const productsFromStorage = storedProducts ? JSON.parse(storedProducts) : [];
const productsForInvoice = productsFromStorage.filter(
  (product) => product.selected === true
);

// 1. Tính toán lại tổng tiền chỉ từ sản phẩm đã chọn (Sử dụng productsForInvoice)
const totalMoneyForInvoice = productsForInvoice.reduce((sum, product) => {
  // Lưu ý: Tùy thuộc vào cách bạn lưu price (string hay number)
  // Giả sử price đã là number, nếu không phải thì cần parse
  const price =
    typeof product.price === "string"
      ? parseFloat(product.price.replace(/,/g, ""))
      : product.price;
  return sum + price * product.quantity;
}, 0);

console.log(totalMoneyFromStorage);
console.log(productsFromStorage);

// 2. Cập nhật lại tổng tiền hiển thị (Dùng totalMoneyForInvoice)
const priceInCart = document.querySelector(".payment-price");
priceInCart.innerHTML = `${new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(totalMoneyForInvoice)}vnđ`;

// tính tiền ship nè

const TARGET_AMOUNT = 5000000;
let shipPrice = 250000;

function updateProgressBar(currentAmount, targetAmount) {
  // Tính phần trăm
  let percentage = (currentAmount / targetAmount) * 100;

  // 0% đến 100%
  if (percentage > 100) {
    percentage = 100;
  } else if (percentage < 0) {
    percentage = 0;
  }

  const progressBar = document.querySelector(".progress-bar");

  if (progressBar) {
    // Cập nhật
    progressBar.style.width = percentage.toFixed(2) + "%";

    console.log(`cập nhật okk: ${percentage.toFixed(2)}%`);

    //đổi màu
    if (percentage === 100) {
      progressBar.style.backgroundColor = "gold";
    } else {
      progressBar.style.backgroundColor = "green"; // Trở lại màu mặc định
    }
  }
}
updateProgressBar(totalMoneyFromStorage, TARGET_AMOUNT);

function caculateShip() {
  if (totalMoneyForInvoice >= 5000000) {
    shipPrice = 0;
    document.querySelector(".price_ship").innerHTML = `${formatPrice(
      shipPrice
    )} vnđ`;
  } else {
    document.querySelector(".price_ship").innerHTML = `${formatPrice(
      shipPrice
    )} vnđ`;
  }
}
/// tổng tiền tất cả nha mấy ku (+ cả ship nếu có)
caculateShip();
console.log(totalMoneyFromStorage);

let totalBill = totalMoneyFromStorage + shipPrice;
document.querySelector(".price-bill").innerHTML = `${formatPrice(
  totalBill
)} vnđ`;

console.log(formatPrice(totalBill));

//invoice
productsFromStorage.forEach((product) => {
  // Chỉ xử lý các sản phẩm được chọn (selected: true)
  // if (!product.selected) {
  //   console.log(product);
  //   return;
  // }
  console.log("Sản phẩm có trong mảng (dù chưa chọn):", product);
  console.log(product["img-represent"]);
});
function formatPrice(number) {
  if (typeof number !== "number") {
    number = parseFloat(number) || 0;
  }
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(number);
}

function renderInvoiceProducts(productsArray) {
  const container = document.getElementById("invoice-container");
  if (!container) {
    console.error("Lỗi: Không tìm thấy phần tử container cho hóa đơn.");
    return;
  }
  console.log("Sản phẩm đã lọc để render Invoice:", productsArray);

  let invoiceHTML = "";

  productsArray.forEach((product) => {
    const displaySize =
      product.selectedSize ||
      (typeof product.size === "string" || typeof product.size === "number"
        ? product.size
        : "N/A");

    const displayColor =
      product.selectedColor ||
      (typeof product.color === "string" ? product.color : "N/A");

    //  (Giá * Số lượng)
    const itemPrice = formatPrice(product.price * product.quantity);

    invoiceHTML += `
            <div class="invoice">
                <div class="date-invoice">Arrives Fri, Sep 12</div> 
                <div class="invoice-product">
                    <div class="img-invoice-product">
                        <img
                            class="img-invoice-product-img"
                            src="${product["img-represent"]}" 
                        />
                    </div>
                    <div class="infor-invoice">
                        <div class="name-invoice-product">${product.name}</div>
                        <div class="qty-invoice-product">Qty: ${product.quantity}</div>
                        
                        <div class="size-invoice-product">Size: EU ${displaySize}</div>
                        <div class="color-invoice-product">Color: ${displayColor}</div>
                        
                        <div class="price-invoice-product">${itemPrice} vnđ</div>
                    </div>
                </div>
                <hr class="line-invoice" />
            </div>
        `;
  });

  container.innerHTML = invoiceHTML;
}
renderInvoiceProducts(productsForInvoice);

//-------------------------tính tiền, invoice

const creditMethod = document.querySelector(".credit-method");
const paypalMethod = document.querySelector(".paypal-method");
const mBankingMethod = document.querySelector(".m-banking-method");
const cashMethod = document.querySelector(".cash-method");

function setupPaymentListeners() {
  //điều kiện để biết ở trang xem lại hay thanh toán
  if (!confirmButton) {
    //ở trang xem lại
    const viewSelectedMethod = document.querySelector(
      ".review-payment-methood"
    );
    // const savedDataString = localStorage.getItem("payment-method");
    // viewSelectedMethod.innerHTML = `Payment: ${savedDataString}`;
    if (localStorage.getItem("payment-method") === "CREDIT") {
      const creditDataString = localStorage.getItem("credit-method");

      const creditDataObject = JSON.parse(creditDataString);
      console.log(creditDataObject);
      const savedDataString = localStorage.getItem("payment-method");
      viewSelectedMethod.innerHTML = `<div><strong>Payment</strong>: ${savedDataString}</div>
                                       <div><strong><br>Card Number</strong>:  ${creditDataObject.cardNumber}</div> 
                                        <div><strong><br>Name Card</strong>: ${creditDataObject.cardHolder}</div>`;
    } else {
      const savedDataString = localStorage.getItem("payment-method");
      viewSelectedMethod.innerHTML = `Payment: ${savedDataString}`;
    }
    // const saveCodePromo = localStorage.getItem("userCodePromo");
    console.log(localStorage.getItem("userCodePromo"));
    // console.log(saveCodePromo);
    if (localStorage.getItem("userCodePromo") != null) {
      document.querySelector(".sale-ofcode").innerHTML = `Sale`;
      document.querySelector(
        ".precent-sale"
      ).innerHTML = `${localStorage.getItem("userCodePromo")}`;
      document.querySelector(".price-bill").innerHTML = `${formatPrice(
        (totalBill *
          (100 -
            parseFloat(
              localStorage.getItem("userCodePromo").replace("%", "")
            ))) /
          100
      )} vnđ`;
    }
    const backPayment = document.querySelector(".back-btn-review-payment");
    backPayment.addEventListener("click", () => {
      window.location.href = "payment.html";
    });

    const paymentConfirmation = document.querySelector(".confirm_successfull");
    document
      .querySelector(".confirm-btn-review-payment")
      .addEventListener("click", () => {
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("cartTotalMoney");
        console.log(localStorage.getItem("cartProducts"));
        paymentConfirmation.classList.remove("hidden");
      });
    return;
  }

  //cái đống này trở xuống là ở trang payment
  // cái đống này là promo
  const promo = document.querySelector(".apply");
  const codePromo = document.querySelector(".code-promo");
  promo.addEventListener("click", () => {
    if (codePromo.value.trim() === "") {
      codePromo.focus();
      codePromo.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelector(".process-promo").innerHTML = `Vui lòng nhập mã`;
    } else {
      fetch("../data/promo.json")
        .then((response) => response.json())
        .then((data) => {
          let listCodePromo = data;

          const foundCode = listCodePromo.find(
            (item) => item.code === codePromo.value.trim().toUpperCase()
          );

          console.log(codePromo.value.trim().toUpperCase());
          if (foundCode) {
            console.log(`sale: ${foundCode.sale}`);
            localStorage.setItem("userCodePromo", foundCode.sale);
            console.log(localStorage.getItem("userCodePromo"));
            document.querySelector(
              ".process-promo"
            ).innerHTML = `Sale: ${localStorage.getItem("userCodePromo")}`;
          } else {
            console.log("sai r nhập lại đi");
            document.querySelector(
              ".process-promo"
            ).innerHTML = `sai r nhập lại đi`;
          }
        });

      // console.log(listCodePromo);
    }
  });

  //Cái đống này là method
  if (creditMethod) {
    creditMethod.addEventListener("click", () => {
      selectMethod(creditMethod, "credit");
    });
  }

  if (paypalMethod) {
    paypalMethod.addEventListener("click", () => {
      selectMethod(paypalMethod, "paypal");
    });
  }

  if (mBankingMethod) {
    mBankingMethod.addEventListener("click", () => {
      selectMethod(mBankingMethod, "banking");
    });
  }

  if (cashMethod) {
    cashMethod.addEventListener("click", () => {
      selectMethod(cashMethod, "cash");
    });
  }

  // đây là thanh toán
  confirmButton.addEventListener("click", async () => {
    if (!selectedMethod) {
      alert("Vui lòng chọn một phương thức thanh toán trước.");
      return;
    }

    let checkConfirm = true;

    if (selectedMethod === "credit") {
      const cardNumber = document.getElementById("card-number");
      const cardHolder = document.getElementById("card-holder");

      if (cardNumber.value.trim() === "") {
        alert("Vui lòng nhập đầy đủ thông tin thẻ.");
        checkConfirm = false;
        cardNumber.focus();
        cardNumber.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (cardHolder.value.trim() === "") {
        alert("Vui lòng nhập tên chủ thẻ.");
        checkConfirm = false;
        cardHolder.focus();
        cardHolder.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      } else {
        const paymentData = {
          cardNumber: cardNumber.value,
          cardHolder: cardHolder.value,
        };
        const dataToSave = JSON.stringify(paymentData);

        localStorage.setItem("payment-method", selectedMethod.toUpperCase());
        localStorage.setItem("credit-method", dataToSave);
        console.log("Credit okkk");
        console.log(localStorage.getItem("payment-method"));
        console.log(localStorage.getItem("credit-method"));
      }
    } else {
      localStorage.setItem("payment-method", selectedMethod.toUpperCase());
      console.log(` ${selectedMethod.toUpperCase()} okkk`);
      console.log(localStorage.getItem("payment-method"));
    }

    if (checkConfirm) {
      if (codePromo.value.trim() === "") {
        localStorage.removeItem("userCodePromo");
      }
      window.location.href = "paymentconfirm.html";
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const allButtons = document.querySelectorAll(".payment-methood");
    allButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        allButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  });
}

setupPaymentListeners();
