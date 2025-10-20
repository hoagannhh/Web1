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
    const backPayment = document.querySelector(".back-btn-review-payment");
    backPayment.addEventListener("click", () => {
      window.location.href = "payment.html";
    });
    return;
  }

  //cái đống này trở xuống là ở trang payment
  // cái đống này là promo
  const promo = document.querySelector(".apply");
  promo.addEventListener("click", () => {
    const codePromo = document.querySelector(".code-promo");
    if (codePromo.value.trim() === "") {
      codePromo.focus();
      codePromo.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      fetch("../data/promo.json")
        .then((response) => response.json())
        .then((data) => {
          listCodePromo = data;

          const foundCode = listCodePromo.find(
            (item) => item.code === codePromo.value.trim().toUpperCase()
          );

          console.log(codePromo.value.trim().toUpperCase());
          if (foundCode) {
            console.log(`sale: ${foundCode.sale}`);
          } else {
            console.log("sai r nhập lại đi");
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
  confirmButton.addEventListener("click", () => {
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
      window.location.href = "paymentconfirm.html";
    }
  });
}

setupPaymentListeners();
