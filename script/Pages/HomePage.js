import { LoadPage } from "../LoadPage.js";
import { allProducts } from "../Product/Product.js";
import { ProductDetail } from "../ProductDetail/ProductDetail.js";

async function loadProductData() {
  try {
    // Kiểm tra trong localStorage trước
    let allProduct = JSON.parse(localStorage.getItem("allProduct"));

    // Nếu không có trong localStorage, tải từ file
    if (!allProduct) {
      const response = await fetch("../data/product.json");
      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu sản phẩm");
      }
      allProduct = await response.json();
      // Lưu vào localStorage để lần sau sử dụng
      localStorage.setItem("allProduct", JSON.stringify(allProduct));
    }

    return allProduct;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
    return null;
  }
}

export const HomeComponent = {
  html: `    <div class="image-demo" id="hero-slideshow">
      <img class="image-demo-d" src="../img/demo/demo.png" />
      <button class="overlay-btn">More</button>
      <button class="slide-nav-btn prev" data-direction="prev">&lt;</button>
      <button class="slide-nav-btn next" data-direction="next">&gt;</button>
    </div>

    <div class="introduct">
      <p class="introduction">NEW PRODUCTS</p>
    </div>

    <div class="product-grid">
      <div class="prod-demo">
        <div class="prod">
          <div class="new-in-prod"><p class="new-text">New</p></div>
          <img class="img-prod" src="../img/product-demo.png" />
        </div>
        <div class="info-prod">
          <p class="name-prod">Jordan Retro 12</p>
          <p class="atribute-prod">Men's Jordan</p>
          <p class="price">$205.00</p>
        </div>
      </div>
    </div>

    <div class="image-demo">
      <img class="image-demo-d" src="../img/demo2.png" />
      <button class="overlay-btn">Kid</button>
    </div>

    <div class="image-demo in-3-4">
      <div class="image-demo in-3">
        <img class="image-demo-d3" src="../img/demo3.png" />
        <button class="overlay-btn btn-in-3">Men's</button>
      </div>
      <div class="image-demo in-4">
        <img class="image-demo-d4" src="../img/demo4.png" />
        <button class="overlay-btn bnt-in-4">Women's</button>
      </div>
    </div>

    <div class="introduct">
      <p class="introduction">SALE PRODUCTS</p>
    </div>

    <div class="product-grid">
      
    </div>`,
  canDeleteCss: true,
  css: `../css/home.css`,
  init: function () {
    AddEventForOverlayButtonMore();
    setupHeroSlideshow();
  },
};
function AddEventForOverlayButtonMore() {
  const btnMore = document.querySelector(".overlay-btn");
  if (btnMore) {
    const container = document.getElementById("container");
    btnMore.addEventListener("click", () => {
      LoadPage("product", container);
    });
  }
  // Gọi LoadProduct và xử lý lỗi nếu có
  LoadProduct().catch((error) => {
    console.error("Lỗi khi tải sản phẩm:", error);
  });
}
async function LoadProduct() {
  try {
    const allProduct = await loadProductData();

    if (!allProduct || !Array.isArray(allProduct)) {
      throw new Error("Không thể tải dữ liệu sản phẩm");
    }

    document.querySelectorAll(".product-grid").forEach((cnt) => {
      let html = "";
      const numProducts = Math.min(allProduct.length, 4);

      for (let i = 0; i < numProducts; i++) {
        const product = allProduct[i];
        if (product && product["img-represent"]) {
          html += `
                        <div class="prod-demo" data-id=${product.id}>
                          <div class="prod">
                                <div class="sale-in-prod"><p class="sale-text">Sale</p></div>
                                <img class="img-prod" src="${
                                  product["img-represent"]
                                }" alt="${product.name || "Product image"}" />
                            </div>
                            <div class="info-prod">
                                <p class="name-prod">${
                                  product.name || "Chưa có tên"
                                }</p>
                                <p class="atribute-prod">${
                                  product.gender
                                    ? product.gender + "'s"
                                    : "Không xác định"
                                }</p>
                                <p class="price">${
                                  product.price
                                    ? product.price.toLocaleString("vi-VN") +
                                      " VND"
                                    : "Liên hệ"
                                }</p>
                            </div>
                        </div>
                    `;
        }
      }

      if (!html) {
        html = '<div class="no-products">Không có sản phẩm nào</div>';
      }

      cnt.innerHTML = html;
    });
  } catch (error) {
    console.error("Lỗi khi hiển thị sản phẩm:", error);
    document.querySelectorAll(".product-grid").forEach((cnt) => {
      cnt.innerHTML =
        '<div class="error-message">Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.</div>';
    });
  }
  LoadProductDetail();
}
function LoadProductDetail() {
  const allProduct = JSON.parse(localStorage.getItem("allProduct"));
  console.log(allProduct);
  console.log(123);
  document.querySelectorAll(".prod-demo").forEach((productElement) => {
    console.log(productElement);
    productElement.addEventListener("click", () => {
      console.log("click on this");
      const productId = productElement.getAttribute("data-id");
      console.log(productId);
      const product = allProduct.find((p) => p.id === productId);

      LoadPage("productDetail", document.getElementById("container"));
      ProductDetail.HandleEvent(product);
    });
  });
}

function setupHeroSlideshow() {
  const container = document.getElementById("hero-slideshow");
  if (!container) return;

  const imgElement = container.querySelector(".image-demo-d");
  const navButtons = container.querySelectorAll(".slide-nav-btn");
  if (!imgElement || navButtons.length === 0) return;

  const slides = [
    { img: "../img/demo/demo.png", className: "slide-bg-1" },
    { img: "../img/demo/demo-home2.png", className: "slide-bg-2" },
    { img: "../img/demo/demo-home1.png", className: "slide-bg-3" },
  ];

  let currentIndex = 0;
  let slideTimer;

  // 1. TẠO HÀM ĐIỀU KHIỂN CHUNG
  function showSlide(direction) {
    // Xóa class nền cũ
    container.classList.remove(slides[currentIndex].className);

    // Tính toán index mới
    if (direction === "next") {
      currentIndex = (currentIndex + 1) % slides.length;
    } else if (direction === "prev") {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    // (Nếu direction không phải 'next' hay 'prev' thì index không đổi)

    const currentSlide = slides[currentIndex];

    // Hiệu ứng mờ
    imgElement.style.opacity = 0;

    // Đợi hiệu ứng chạy xong
    setTimeout(() => {
      imgElement.src = currentSlide.img;
      imgElement.style.opacity = 1;
      // Thêm class nền mới
      container.classList.add(currentSlide.className);
    }, 500); // 500ms (phải khớp với CSS transition)
  }

  // 2. CẬP NHẬT HÀM START TIMER
  function startTimer() {
    clearInterval(slideTimer);
    // Timer sẽ tự động gọi "next"
    slideTimer = setInterval(() => showSlide("next"), 5000); // 5 giây
  }

  // 3. THÊM SỰ KIỆN CLICK CHO 2 NÚT MỚI
  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Ngăn sự kiện click lan ra ngoài (nếu có)
      e.stopPropagation();

      const direction = button.getAttribute("data-direction"); // "prev" hoặc "next"
      showSlide(direction); // Gọi hàm
      startTimer(); // Reset lại timer mỗi khi click
    });
  });

  // 4. XÓA SỰ KIỆN CLICK CŨ
  // HOÀN TOÀN XÓA `container.addEventListener("click", ...)` CŨ ĐI
  // Chúng ta không cần nó nữa vì đã có 2 nút chuyên dụng.
  // Sự kiện click của nút "More" đã được hàm `AddEventForOverlayButtonMore` xử lý riêng.

  // 5. KHỞI CHẠY
  container.classList.add(slides[currentIndex].className); // Thêm class cho ảnh đầu
  startTimer(); // Bắt đầu tự động chạy
}
