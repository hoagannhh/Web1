import { LoadPage } from "../LoadPage.js";
import { username } from "../Pages/ButtonVerification .js";

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

function updateProgressBar(currentAmount, targetAmount) {
  let percentage = (currentAmount / targetAmount) * 100;

  if (percentage > 100) {
    percentage = 100;
  } else if (percentage < 0) {
    percentage = 0;
  }

  const progressBar = document.querySelector(".progress-bar");

  if (progressBar) {
    progressBar.style.width = percentage.toFixed(2) + "%";
    if (percentage === 100) {
      progressBar.style.backgroundColor = "gold";
    } else {
      progressBar.style.backgroundColor = "green";
    }
  }
}

function renderInvoiceProducts(productsArray) {
  const container = document.getElementById("invoice-container");
  if (!container) {
    console.error("Lỗi: Không tìm thấy phần tử container cho hóa đơn.");
    return;
  }

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

function getThoiGianThucDinhDang() {
  const ngayHienTai = new Date();

  const options = {
    weekday: "short", // Thứ (viết tắt): Fri
    month: "short", // Tháng (viết tắt): Sep
    day: "numeric", // Ngày trong tháng: 12
  };

  const ngayDuocDinhDang = ngayHienTai.toLocaleDateString("en-US", options);

  return `Arrives ${ngayDuocDinhDang}`;
}

export const PaymentComponent = {
  // 💡 THAY THẾ BẰNG HTML CỦA TRANG THANH TOÁN CỦA BẠN!
  html: `
    <div class="payment">
      <div class="left-payment">
        <div class="address">
          <div class="payment-title">YOUR SELECTIONS</div>
          <!-- Hiển thị địa chỉ -->
          <div class="container-address">
            <!-- View hiện tại -->
            <div id="address-view">
              <div>
                <p>
                  <strong>ADDRESS:</strong>
                  <span id="current-address">aaaaa/aaaaaaa/aaaaaaaaaa</span>
                </p>
                <p>
                  <strong>PHONE:</strong>
                  <span id="current-phone">0000000000</span>
                </p>
              </div>
              <hr class="line-invoice" />
              <div>
                <button class="button-change">
                  Change
                </button>
              </div>
            </div>

            <!-- View danh sách địa chỉ -->
            <div id="address-list-view" class="hidden">
              <p><strong>Saved Addresses:</strong></p>
              <ul id="address-list"></ul>
              <div class="form-input-btn">
                <button class="add-new-btn" >
                  Add New Address
                </button>
                <button class="back-btn" >Back</button>
              </div>
            </div>

            <!-- View thêm địa chỉ mới -->
            <div id="form-view" class="hidden">
              <p><strong>NEW ADDRESS:</strong></p>
              <form id="address-form">
                <input
                  id="new-phone"
                  class="input-infor-address"
                  type="tel"
                  placeholder="Phone Number"
                  required
                /><br /><br />
                <input
                  id="new-address"
                  class="reset-address input-infor-address"
                  type="text"
                  placeholder="Address"
                  required
                /><br /><br />
                <div class="form-input-btn">
                  <button
                    type="button"
                    class="confirm-btn"
                    
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    class="back-btn"
                    
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
        <div class="Ship">
          <div class="payment-title">SHIPPING</div>
          <div class="infor-ship">
            <p>
              250,000₫ Shipping <br /><br />
              Shipment One <br /><br />
              Arrives Mon, Sep 22 - Fri, Sep 26<br /><br />
              This is an international shipment requiring customs clearance
            </p>
          </div>
        </div>
        <hr />
        <div class="paymet">
          <div class="payment-title">Payment</div>
          <div class="promo">
            <p class="promo-text">Have a promo code?</p>
            <div class="apply-promo">
              <input type="text" class="code-promo" placeholder="Promo" />
              <button class="apply">Apply</button>
            </div>
            <div class="process-promo"></div>
          </div>
        </div>
        <div class="method">
          <div class="pay">How would you like to pay?</div>
          <div class="credit-method payment-methood" >
            <img src="../icon/card.png" class="icon-card" />
            <p>Credit or Debit Card</p>
          </div>

          <div class="hidden infor-card">
            <hr />
            <input
              class="input-card"
              id="card-number"
              type="number"
              placeholder="Card number"
            />
            <input
              class="input-card"
              id="card-holder"
              type="text"
              placeholder="Name on card"
            />
            <div class="date-card">
              <input class="input-date-card" type="date" placeholder="MM/YY" />
              <input class="input-date-card" type="text" placeholder="CVV" />
            </div>
            <hr />
          </div>

          <div class="paypal-method payment-methood" >
            <img src="../icon/paypal.png" class="icon-paypal" />
          </div>
          <div class="m-banking-method payment-methood">
            <img src="../icon/m-banking.png" class="icon-card" />
            <p>M-Banking</p>
          </div>
          <div class="cash-method payment-methood">
            <img src="../icon/cash.png" class="icon-card" />
            <p>Cash</p>
          </div>
        </div>
        <div class="form-input-btn">
          <button type="button" class="confirm-btn" id="confirm-btn-payment">
            Confirm
          </button>
          <!-- nút quay lại -->
          <button type="button" class="back-btn" id ="back-btn-payment">Back</button>
        </div>
      </div>
      <div class="right-payment">
        <div class="payment-title">Order Summary</div>
        <div class="bill">
          <div class="feature">Subtotal</div>
          <div class="payment-price">0VND</div>
        </div>
        <div class="bill">
          <div class="feature">Delivery/Shipping</div>
          <div class="payment-price price_ship"></div>
        </div>
        <div class="bill">
          <div class="sale-ofcode feature"></div>
          <div class="precent-sale"></div>
        </div>
        <div class="free-ship">Add 1,171,000đ more to earn Free Shipping!</div>
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        <hr />
        <div class="bill">
          <div class="total-bill">Total</div>
          <div class="price-bill"></div>
        </div>
        <hr />
        <div class="list-invoice" id="invoice-container">
          <div class="invoice">
            <div class="date-invoice">Arrives Fri, Sep 12</div>
            <div class="invoice-product">
              <div class="img-invoice-product">
                <img
                  class="img-invoice-product-img"
                  src="../img/invoice-product.png"
                />
              </div>
              <div class="infor-invoice">
                <div class="name-invoice-product">Nike Ava Rover</div>
                <div class="qty-invoice-product">Qty: 1</div>
                <div class="size-invoice-product">Size: EU 42</div>
                <div class="price-invoice-product">3,829,000</div>
              </div>
            </div>
            <hr class="line-invoice" />
          </div>
          <div class="invoice">
            <div class="date-invoice">Arrives Fri, Sep 12</div>
            <div class="invoice-product">
              <div class="img-invoice-product">
                <img
                  class="img-invoice-product-img"
                  src="../img/invoice-product.png"
                />
              </div>
              <div class="infor-invoice">
                <div class="name-invoice-product">Nike Ava Rover</div>
                <div class="qty-invoice-product">Qty: 1</div>
                <div class="size-invoice-product">Size: EU 42</div>
                <div class="price-invoice-product">3,829,000</div>
              </div>
            </div>
            <hr class="line-invoice" />
          </div>
        </div>
      </div>
    </div>`,
  css: "../css/payment.css",
  canDeleteCss: true,

  init: function () {
    console.log("Payment Page Logic Initialized.");
    const accountInfo = JSON.parse(localStorage.getItem("ACCOUNTS"));
    const userPro = accountInfo.find(
      (account) => account.username === username
    );
    console.log(userPro);
    // Dùng 'username' làm khóa duy nhất cho mỗi tài khoản
    console.log(accountInfo);

    // =========================================================
    // 1. ĐỊNH NGHĨA CÁC HÀM PHỤ TRỢ (CỤC BỘ)
    // =========================================================

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

    const TARGET_AMOUNT = 5000000;

    function updateProgressBar(currentAmount, targetAmount) {
      let percentage = (currentAmount / targetAmount) * 100;
      if (percentage > 100) percentage = 100;
      else if (percentage < 0) percentage = 0;

      const progressBar = document.querySelector(".progress-bar");
      if (progressBar) {
        progressBar.style.width = percentage.toFixed(2) + "%";
        progressBar.style.backgroundColor =
          percentage === 100 ? "gold" : "green";
      }
    }

    function renderInvoiceProducts(productsArray) {
      const container = document.getElementById("invoice-container");
      if (!container) {
        console.error("Lỗi: Không tìm thấy phần tử #invoice-container.");
        return;
      }

      let invoiceHTML = "";
      productsArray.forEach((product) => {
        const displaySize = product.size || "N/A";
        const displayColor = product.color || "N/A";
        const itemPrice = formatPrice(product.price * product.quantity);

        invoiceHTML += `
                    <div class="invoice">
                        <div class="date-invoice">${getThoiGianThucDinhDang()}</div> 
                        <div class="invoice-product">
                            <div class="img-invoice-product">
                                <img class="img-invoice-product-img" src="${
                                  product["img-represent"]
                                }" />
                            </div>
                            <div class="infor-invoice">
                                <div class="name-invoice-product">${
                                  product.name
                                }</div>
                                <div class="qty-invoice-product">Qty: ${
                                  product.quantity
                                }</div>
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

    // --- Hàm logic địa chỉ ---

    function getCurrentUserKey() {
      const accountInfo = JSON.parse(localStorage.getItem("ACCOUNTS"));
      // Dùng 'username' làm khóa duy nhất cho mỗi tài khoản
      console.log(accountInfo);
      if (accountInfo) {
        const userPro = accountInfo.find(
          (account) => account.username === username
        );
        console.log(userPro);

        return userPro.username;
      }

      return "guest";
    }
    function getCurrentAccountObject() {
      const accountInfo = JSON.parse(localStorage.getItem("ACCOUNTS"));
      if (accountInfo) {
        const userPro = accountInfo.find(
          (account) => account.username === username
        );
        console.log(userPro);

        return userPro;
      }
    }

    function showForm() {
      const list = document.getElementById("address-list-view");
      const form = document.getElementById("form-view");
      if (list) list.classList.add("hidden");
      if (form) form.classList.remove("hidden");
    }

    function showAddress() {
      const form = document.getElementById("form-view");
      const list = document.getElementById("address-list-view");
      const view = document.getElementById("address-view");
      if (form) form.classList.add("hidden");
      if (list) list.classList.add("hidden");
      if (view) view.classList.remove("hidden");
    }

    function renderAddressList() {
      // ... (Logic renderAddressList của bạn, dùng .select-btn và data-index)
      const userKey = getCurrentUserKey();
      const listEl = document.getElementById("address-list");
      if (!listEl) return;
      listEl.innerHTML = ""; // reset
      const stored =
        JSON.parse(localStorage.getItem(`userAddresses_${userKey}`)) || [];
      console.log(stored);

      if (stored.length === 0) {
        listEl.innerHTML = `<li>No saved addresses.</li>`;
        document
          .getElementById("add-new-address-btn-list")
          ?.addEventListener("click", showForm);
      } else {
        stored.forEach((item, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
                        <div class="list-address">
                            <div class="address&phone">
                                <strong>Phone:</strong> ${item.phone}<br>
                                <strong>Address:</strong> ${item.address}<br>
                            </div>
                            <div>
                                <button class="select-btn" data-index="${index}">Select</button>
                            </div>
                        </div>
                    `;
          listEl.appendChild(li);
        });

        document
          .querySelectorAll("#address-list .select-btn")
          .forEach((btn) => {
            btn.addEventListener("click", (e) => {
              const index = parseInt(e.target.dataset.index);
              selectAddress(index);
            });
          });
      }
    }

    function showAddressList() {
      const view = document.getElementById("address-view");
      const form = document.getElementById("form-view");
      const list = document.getElementById("address-list-view");
      if (view) view.classList.add("hidden");
      if (form) form.classList.add("hidden");
      if (list) list.classList.remove("hidden");
      renderAddressList();
    }

    function selectAddress(index) {
      const userKey = getCurrentUserKey();
      const stored =
        JSON.parse(localStorage.getItem(`userAddresses_${userKey}`)) || [];
      const selected = stored[index];
      const currentPhoneEl = document.getElementById("current-phone");
      const currentAddressEl = document.getElementById("current-address");

      if (selected) {
        if (currentPhoneEl) currentPhoneEl.textContent = selected.phone;
        if (currentAddressEl) currentAddressEl.textContent = selected.address;
        localStorage.setItem(
          `selectedAddress_${userKey}`,
          JSON.stringify(selected)
        );
      }
      showAddress();
    }

    function confirmAddress() {
      const userKey = getCurrentUserKey();
      const phoneInput = document.getElementById("new-phone");
      const addressInput = document.getElementById("new-address");
      if (!phoneInput || !addressInput) return;

      const phone = phoneInput.value.trim();
      const address = addressInput.value.trim();

      if (phone !== "" && address !== "") {
        const newEntry = { phone, address };
        const stored =
          JSON.parse(localStorage.getItem(`userAddresses_${userKey}`)) || [];

        stored.push(newEntry);
        localStorage.setItem(
          `userAddresses_${userKey}`,
          JSON.stringify(stored)
        );

        phoneInput.value = "";
        addressInput.value = "";

        showAddressList();
      } else {
        alert("Vui lòng nhập đầy đủ số điện thoại và địa chỉ.");
      }
    }
    const changeAddressBtn = document.querySelector(".button-change"); // Nút Change
    const addNewBtn = document.querySelector("#address-list-view .add-new-btn"); // Nút Add New (trong list view)
    const backToListBtn = document.querySelector("#form-view .back-btn"); // Nút Back (trong form view)
    const confirmNewAddressBtn = document.querySelector(
      "#form-view .confirm-btn"
    ); // Nút Confirm (trong form view)
    const backToViewBtn = document.querySelector(
      "#address-list-view .back-btn"
    ); // Nút Back (trong list view)

    // LỖI DÒNG 420 đã được sửa
    if (changeAddressBtn) {
      // Nút "Change" trong address-view
      changeAddressBtn.addEventListener("click", showAddressList);
    } else {
      console.warn(
        "Lỗi tiềm ẩn: Nút Change Address (.button-change) không tìm thấy."
      );
    }

    if (confirmNewAddressBtn) {
      confirmNewAddressBtn.addEventListener("click", confirmAddress);
    }

    if (backToListBtn) {
      backToListBtn.addEventListener("click", showAddressList);
    }

    if (addNewBtn) {
      addNewBtn.addEventListener("click", showForm);
    }

    if (backToViewBtn) {
      backToViewBtn.addEventListener("click", showAddress);
    }

    // =========================================================
    // 2. TẢI DỮ LIỆU & TÍNH TOÁN (ĐÃ DI CHUYỂN VÀO INIT)
    // =========================================================

    const storedProducts = localStorage.getItem("cartProducts");
    const productsFromStorage = storedProducts
      ? JSON.parse(storedProducts)
      : [];
    const productsForInvoice = productsFromStorage.filter(
      (product) => product.selected === true || product.checkOut === true
    );

    let totalMoneyForInvoice = productsForInvoice.reduce((sum, product) => {
      const price = parseFloat(String(product.price).replace(/,/g, "")) || 0;
      return sum + price * (product.quantity || 1);
    }, 0);

    let shipPrice = totalMoneyForInvoice >= TARGET_AMOUNT ? 0 : 250000;
    let totalBill = totalMoneyForInvoice + shipPrice;

    // =========================================================
    // 3. HIỂN THỊ DỮ LIỆU & LOAD ĐỊA CHỈ BAN ĐẦU
    // =========================================================

    // --- Invoice & Tính tiền ---
    const priceInCartEl = document.querySelector(".payment-price");
    const priceShipEl = document.querySelector(".price_ship");
    const priceBillEl = document.querySelector(".price-bill");

    if (priceInCartEl)
      priceInCartEl.innerHTML = `${formatPrice(totalMoneyForInvoice)} vnđ`;
    if (priceShipEl) priceShipEl.innerHTML = `${formatPrice(shipPrice)} vnđ`;
    if (priceBillEl) priceBillEl.innerHTML = `${formatPrice(totalBill)} vnđ`;

    updateProgressBar(totalMoneyForInvoice, TARGET_AMOUNT);
    renderInvoiceProducts(productsForInvoice);

    // --- Load địa chỉ ban đầu ---
    const userKey = getCurrentUserKey();
    const selectedAddressString = localStorage.getItem(
      `selectedAddress_${userKey}`
    );
    const currentPhoneEl = document.getElementById("current-phone");
    const currentAddressEl = document.getElementById("current-address");
    const accountUser = getCurrentAccountObject();

    if (selectedAddressString) {
      const selected = JSON.parse(selectedAddressString);
      if (selected && selected.phone && selected.address) {
        if (currentPhoneEl) currentPhoneEl.textContent = selected.phone;
        if (currentAddressEl) currentAddressEl.textContent = selected.address;
      }
    } else {
      const stored =
        JSON.parse(localStorage.getItem(`userAddresses_${userKey}`)) || [];
      if (stored.length > 0) {
        const last = stored[stored.length - 1];
        if (currentPhoneEl) currentPhoneEl.textContent = last.phone;
        if (currentAddressEl) currentAddressEl.textContent = last.address;
        localStorage.getItem(
          `selectedAddress_${userKey}`,
          JSON.stringify(last)
        );
      } else {
        if (accountUser) {
          if (currentPhoneEl) currentPhoneEl.textContent = accountUser.phone;
          if (currentAddressEl)
            currentAddressEl.textContent = accountUser.address;
          const defaultAddress = {
            phone: accountUser.phone,
            address: accountUser.address,
          };
          let arrayTerm = [];
          arrayTerm.push(defaultAddress);
          console.log(defaultAddress);
          localStorage.setItem(
            `userAddresses_${userKey}`,
            JSON.stringify(arrayTerm)
          );
          console.log(
            JSON.parse(localStorage.getItem(`userAddresses_${userKey}`))
          );
          localStorage.setItem(
            `selectedAddress_${userKey}`,
            JSON.stringify(defaultAddress)
          );
        }
      }
    }

    // =========================================================
    // 4. GẮN SỰ KIỆN (LISTENERS)
    // =========================================================

    // --- Nút Address (Sử dụng ID mới để tránh xung đột với onclick) ---
    document
      .getElementById("change-address-btn-js")
      ?.addEventListener("click", showAddressList);
    document
      .getElementById("add-new-address-btn-js")
      ?.addEventListener("click", showForm);
    document
      .getElementById("back-from-form-js")
      ?.addEventListener("click", showAddressList);
    document
      .getElementById("confirm-new-address-js")
      ?.addEventListener("click", confirmAddress);
    document
      .getElementById("back-from-list-js")
      ?.addEventListener("click", showAddress);

    // --- Payment Method & Confirm (Lấy lại từ DOM) ---
    let selectedMethod = null;
    const paymentMethods = document.querySelectorAll(".payment-methood");
    const confirmButton = document.getElementById("confirm-btn-payment");
    const infoCard = document.querySelector(".infor-card");
    const creditMethod = document.querySelector(".credit-method");
    const paypalMethod = document.querySelector(".paypal-method");
    const mBankingMethod = document.querySelector(".m-banking-method");
    const cashMethod = document.querySelector(".cash-method");
    const promo = document.querySelector(".apply");
    const codePromo = document.querySelector(".code-promo");

    function selectMethod(element, methodName) {
      paymentMethods.forEach((method) => method.classList.remove("selected"));
      element.classList.add("selected");
      selectedMethod = methodName;
      if (infoCard) {
        if (methodName === "credit") {
          infoCard.classList.remove("hidden");
        } else {
          infoCard.classList.add("hidden");
        }
      }
    }

    // --- Gắn sự kiện Payment Methods ---
    if (creditMethod) {
      creditMethod?.addEventListener("click", () =>
        selectMethod(creditMethod, "credit")
      );
    }

    if (paypalMethod) {
      paypalMethod?.addEventListener("click", () =>
        selectMethod(paypalMethod, "paypal")
      );
    }

    if (mBankingMethod) {
      mBankingMethod?.addEventListener("click", () =>
        selectMethod(mBankingMethod, "banking")
      );
    }
    if (cashMethod) {
      cashMethod?.addEventListener("click", () =>
        selectMethod(cashMethod, "cash")
      );
    }

    // --- Gắn sự kiện Promo ---

    function handlePromo() {
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
              console.log(localStorage.getItem("userCodePromo")); // Cập nhật giao diện: áp dụng giảm giá
              document.querySelector(
                ".process-promo"
              ).innerHTML = `Sale: ${localStorage.getItem("userCodePromo")}`; // TODO: Thêm logic tính toán lại tổng tiền ở đây
            } else {
              console.log("sai r nhập lại đi");
              document.querySelector(
                ".process-promo"
              ).innerHTML = `sai r nhập lại đi`;
              localStorage.removeItem("userCodePromo"); // Xóa mã nếu sai
            }
          })
          .catch((error) => {
            console.error("Lỗi khi tải promo.json:", error);
            document.querySelector(".process-promo").innerHTML = `Lỗi tải mã`;
          });
      }
    }
    // Gắn sự kiện click cho nút Apply
    promo?.addEventListener("click", handlePromo); // Gắn sự kiện keypress cho ô input mã giảm giá

    codePromo?.addEventListener("keypress", (event) => {
      // Kiểm tra xem phím được nhấn có phải là Enter (key: 'Enter' hoặc keyCode: 13)
      if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định (ví dụ: gửi form)
        handlePromo(); // Gọi hàm xử lý mã giảm giá
      }
    });

    // Confirm Payment
    confirmButton?.addEventListener("click", async () => {
      if (!selectedMethod) {
        selectMethod(cashMethod, "cash");
        // alert("Vui lòng chọn một phương thức thanh toán trước.");
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
          alert("Vui lòng nhập đầy đủ thông tin thẻ.");
          checkConfirm = false;
          cardHolder.focus();
          cardHolder.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        } else {
          const paymentData = {
            cardNumber: cardNumber.value,
            cardHolder: cardHolder.value,
          };
          localStorage.setItem("payment-method", "CREDIT");
          localStorage.setItem("credit-method", JSON.stringify(paymentData));
          console.log("Credit okkk");
          console.log(localStorage.getItem("payment-method"));
          console.log(localStorage.getItem("credit-method"));
        }
      } else {
        localStorage.setItem("payment-method", selectedMethod.toUpperCase());
        // localStorage.removeItem("credit-method");
        console.log(` ${selectedMethod.toUpperCase()} okkk`);
        console.log(localStorage.getItem("payment-method"));
      }

      if (checkConfirm) {
        if (codePromo && codePromo.value.trim() === "") {
          localStorage.removeItem("userCodePromo");
        }

        //  CHUYỂN TRANG THEO MÔ HÌNH LOADPAGE
        LoadPage("paymentConfirm", document.getElementById("container"));
      }
    });
    paymentMethods.forEach((method) => {
      const methodName = method.classList.contains("credit-method")
        ? "credit"
        : method.classList.contains("paypal-method")
        ? "paypal"
        : method.classList.contains("m-banking-method")
        ? "banking"
        : "cash";

      method.addEventListener("click", function () {
        paymentMethods.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        self.selectedMethod = methodName;
        paymentMethods.forEach((btn) => btn.classList.remove("selected"));
        this.classList.add("selected");

        if (infoCard) {
          if (self.selectedMethod === "credit")
            infoCard.classList.remove("hidden");
          else infoCard.classList.add("hidden");
        }
      });
    });

    //back payment
    const backBtn = document.getElementById("back-btn-payment"); // Nút Back chính của trang Payment
    const container = document.getElementById("container"); // Lấy container chính

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        const source = sessionStorage.getItem("checkoutSource");

        if (source === "product_detail") {
          // Quay về trang Product Detail (hoặc trang Home nếu muốn)
          // Do không có ID sản phẩm cụ thể, ta quay về trang Products
          LoadPage("product", container);
        }
        if (source === "product_detail") {
          LoadPage("product", container);
        } else {
          LoadPage("cart", container);
        }

        sessionStorage.removeItem("checkoutSource");
      });
    }
  },
};
