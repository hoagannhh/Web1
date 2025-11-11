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
  // Kiểm tra xem element có tồn tại không
  if (!container) {
    console.warn("Không tìm thấy #hero-slideshow");
    return;
  }

  const imgElement = container.querySelector(".image-demo-d");
  if (!imgElement) return;

  // 1. DANH SÁCH ẢNH ĐỂ ĐỔI
  // (Hãy thay bằng đường dẫn ảnh thật của bạn)
  const images = [
    "../img/demo/demo.png", // Ảnh đầu tiên (có sẵn trong HTML)
    "../img/demo/demo-home2.png", // Ảnh thứ hai (lấy từ demo khác của bạn)
    "../img/demo/demo-home1.png", // Ảnh thứ ba (lấy từ demo khác của bạn)
  ];

  let currentIndex = 0;
  let slideTimer; // Biến để lưu trữ bộ đếm thời gian

  // 2. HÀM ĐỂ HIỂN THỊ ẢNH TIẾP THEO
  function showNextImage() {
    // Tăng chỉ số, quay về 0 nếu hết mảng
    currentIndex = (currentIndex + 1) % images.length;

    // Hiệu ứng mờ đi
    imgElement.style.opacity = 0;

    // Đợi 0.5s (bằng thời gian transition) rồi mới đổi ảnh và hiện lên
    setTimeout(() => {
      imgElement.src = images[currentIndex];
      // Hiệu ứng hiện ra
      imgElement.style.opacity = 1;
    }, 500); // 500ms = 0.5s (phải khớp với CSS)
  }

  //HÀM ĐỂ BẮT ĐẦU VÀ RESET TIMER
  function startTimer() {
    // Xóa timer cũ
    clearInterval(slideTimer);
    // Đặt timer mới, đổi ảnh sau 5 giây
    slideTimer = setInterval(showNextImage, 5000); // 5000ms = 5 giây
  }

  // 4. THÊM SỰ KIỆN CLICK
  container.addEventListener("click", (e) => {
    //Nếu click vào nút "More", thì không đổi ảnh
    if (e.target.classList.contains("overlay-btn")) {
      return;
    }

    // click
    showNextImage();
    // Khởi động lại timer
    startTimer();
  });

  startTimer();
}
