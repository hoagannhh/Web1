// paymentconfirm.js (hoặc script/Pages/PaymentConfirm.js)

import { LoadPage } from "../LoadPage.js";

// Hàm format giá tiền (cần thiết cho cả 2 component)
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

// Hàm renderInvoiceProducts (Giữ nguyên, nhưng ID container đổi thành #invoice-container)
function renderInvoiceProducts(productsArray) {
  const container = document.getElementById("invoice-container"); // Dùng ID này theo HTML của bạn
  if (!container) return;

  let invoiceHTML = "";
  productsArray.forEach((product) => {
    const displaySize = product.selectedSize || product.size || "N/A";
    const displayColor = product.selectedColor || product.color || "N/A";
    const price = parseFloat(String(product.price).replace(/,/g, "")) || 0;
    const itemPrice = formatPrice(price * (product.quantity || 1));

    invoiceHTML += `
            <div class="invoice">
                <div class="date-invoice">Arrives Fri, Sep 12</div> 
                <div class="invoice-product">
                    <div class="img-invoice-product">
                        <img class="img-invoice-product-img" src="${product["img-represent"]}" />
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

export const PaymentConfirmComponent = {
  // 💡 HTML của bạn đã được cập nhật để hiển thị trên trang review
  html: `
   <div class="payment">
      <div class="left-payment">
        <div class="address">
          <div class="payment-title">YOUR SELECTIONS</div>
          <!-- Hiển thị địa chỉ -->
          <div class="container-address address-confirm">
            <!-- View hiện tại -->
            <div id="address-view">
              <div>
                <p>
                  <strong>ADDRESS:</strong>
                  <span id="current-address">aaaaa/aaaaaaa/aaaaaaaaaa</span>
                </p>
                <p class="phone-confirm">
                  <strong>PHONE:</strong>
                  <span id="current-phone">0000000000</span>
                </p>
              </div>
              <hr class="line-invoice" />
            </div>
          </div>
        </div>

        <div class="review-payment-methood">
          <div class="selected-method" onclick="">paymaet</div>
        </div>

        <div class="bill">
          <div class="feature">Subtotal</div>
          <div class="payment-price review-subtotal">0VND</div>
        </div>
        <div class="bill">
          <div class="feature">Delivery/Shipping</div>
          <div class="payment-price review-ship"></div>
        </div>
        <div class="bill">
          <div class="sale-ofcode feature"></div>
          <div class="precent-sale review-promo-discount"></div>
        </div>
        
        <div class="bill">
          <div class="total-bill">Total</div>
          <div class="price-bill review-total-bill"></div>
        </div>
      </div>
      <div class="right-payment">
        <div class="payment-title">Order Summary</div>
        <div class="list-invoice list-invoice-confirm" id="invoice-container">
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
    </div>

    <div class="form-btn-review-payment">
      <button class="confirm-btn-review-payment">Confirm</button>
      <!-- nút quay lại -->
      <button class="back-btn-review-payment">Back</button>
    </div>

    <div class="confirm_successfull hidden">
      <div class="table_successfull">
        <div class="tick_icon">
          <img src="../icon/tick.png" class="tick_img" />
        </div>
        <div class="successfull_text">Successfull</div>
        <div class="go_home" id="go-home-btn" >Go to homepage</div>
      </div>
    </div>
  `,
  css: `../css/payment.css`,
  canDeleteCss: true,

  init: function () {
    console.log("Payment Confirmation Page Logic Initialized.");

    const TARGET_AMOUNT = 5000000;
    const container = document.getElementById("container");

    // =========================================================
    // 1. TẢI DỮ LIỆU TỪ LOCALSTORAGE
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

    const paymentMethod = localStorage.getItem("payment-method");
    const creditData = localStorage.getItem("credit-method");
    const promoCode = localStorage.getItem("userCodePromo");
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

    // =========================================================
    // 2. HIỂN THỊ DỮ LIỆU REVIEW
    // =========================================================

    // --- A. Địa chỉ ---
    const currentPhoneEl = document.getElementById("current-phone");
    const currentAddressEl = document.getElementById("current-address");
    if (selectedAddress && currentPhoneEl && currentAddressEl) {
      currentPhoneEl.textContent = selectedAddress.phone;
      currentAddressEl.textContent = selectedAddress.address;
    }

    // --- B. Phương thức thanh toán (Đây là phần lỗi ban đầu) ---
    const viewSelectedMethod = document.querySelector(".selected-method");
    if (viewSelectedMethod && paymentMethod) {
      if (paymentMethod === "CREDIT" && creditData) {
        const creditDataObject = JSON.parse(creditData);
        // Hiển thị thông tin thẻ
        viewSelectedMethod.innerHTML = `
                    <div><strong>Payment Method</strong>: ${paymentMethod}</div>
                    <div><strong>Card Number</strong>: **** **** **** ${creditDataObject.cardNumber.slice(
                      -4
                    )}</div> 
                    <div><strong>Name on Card</strong>: ${
                      creditDataObject.cardHolder
                    }</div>
                `;
      } else {
        // Hiển thị các phương thức khác (PAYPAL, CASH, BANKING)
        viewSelectedMethod.innerHTML = `<div><strong>Payment Method</strong>: ${paymentMethod}</div>`;
      }
    }

    // --- C. Hóa đơn và Sản phẩm ---
    renderInvoiceProducts(productsForInvoice);

    // --- D. Tính tiền cuối cùng (Áp dụng Promo) ---
    const reviewSubtotal = document.querySelector(".review-subtotal");
    const reviewShip = document.querySelector(".review-ship");
    const reviewPromoText = document.querySelector(".review-promo-text");
    const reviewPromoDiscount = document.querySelector(
      ".review-promo-discount"
    );
    const reviewTotalBill = document.querySelector(".review-total-bill");

    // Xử lý Promo Code
    if (promoCode) {
      const salePercentMatch = promoCode.match(/(\d+)%/); // Lấy số từ chuỗi sale '10%'
      const salePercent = salePercentMatch
        ? parseFloat(salePercentMatch[1])
        : 0;
      const discountAmount = totalBill * (salePercent / 100);
      totalBill = totalBill - discountAmount;

      if (reviewPromoText)
        reviewPromoText.innerHTML = `Discount (${promoCode})`;
      if (reviewPromoDiscount)
        document.querySelector(".sale-ofcode ").innerHTML = `Sale`;
      // reviewPromoDiscount.innerHTML = `-${formatPrice(discountAmount)} vnđ`;
      reviewPromoDiscount.innerHTML = `${localStorage.getItem(
        "userCodePromo"
      )} `;
    } else {
      // Ẩn dòng sale nếu không có mã
      if (reviewPromoText) reviewPromoText.parentElement.style.display = "none";
    }

    // Cập nhật các trường tổng kết
    if (reviewSubtotal)
      reviewSubtotal.innerHTML = `${formatPrice(totalMoneyForInvoice)} vnđ`;
    if (reviewShip) reviewShip.innerHTML = `${formatPrice(shipPrice)} vnđ`;
    if (reviewTotalBill)
      reviewTotalBill.innerHTML = `${formatPrice(totalBill)} vnđ`;

    // =========================================================
    // 3. GẮN SỰ KIỆN (BACK & CONFIRM)
    // =========================================================

    // --- Nút Back ---
    document
      .querySelector(".back-btn-review-payment")
      ?.addEventListener("click", () => {
        // Quay lại trang thanh toán (PaymentComponent)
        LoadPage("payment", container);
      });

    // --- Nút Confirm Order (Xác nhận và dọn dẹp) ---
    document
      .querySelector(".confirm-btn-review-payment")
      ?.addEventListener("click", () => {
        const successPopup = document.querySelector(".confirm_successfull");
        if (successPopup) {
          successPopup.classList.remove("hidden");
        }

        // Dọn dẹp LocalStorage sau khi đặt hàng thành công
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("cartTotalMoney");
        localStorage.removeItem("payment-method");
        localStorage.removeItem("credit-method");
        localStorage.removeItem("userCodePromo");

        // Ẩn các nút Confirm/Back
        document
          .querySelector(".form-btn-review-payment")
          ?.classList.add("hidden");
      });

    // --- Nút Go to Homepage ---
    document.getElementById("go-home-btn")?.addEventListener("click", () => {
      LoadPage("home", container);
    });
  },
};
