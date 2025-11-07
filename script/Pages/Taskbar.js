import { ButtonVerification, IsAuthenticated } from "./ButtonVerification .js";
import { LoadPage } from "../LoadPage.js";
import { allProducts } from "../Product/Product.js";
import { LoadProductPageHaveProduct } from "../Product/Product.js";
import { DevideFlowFilter } from "../Product/SideBar.js";

export const TaskBar = {
  html: `<div class="task-bar">
      <div class="Header">
        <div class="Name-Shop">
          <img class="logo" src="../img/Logo.png" />
          <p class="name">ĐẾ VƯƠNG</p>
        </div>
        <div class="Search-taskbar">
          <input class="Search" type="text" placeholder="Search" />
          <img class="Search-icon" src="../icon/Search.png" />
        </div>
        <div class="taskbar-right-section">${ButtonVerification.html}
                <div class="bag"><img class="bag-icon" src="../icon/cart.png" /></div>
        </div>
      </div>

      <div class="menu">
        <button class="test">
          Men's
          <div class="box men">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid">
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product-best-seller">
                    <img
                      class="product-image"
                      src="../img/nike-air-force.png"
                    />
                    <p class="name-product">NIKE AIR FORCE</p>
                  </div>
                  <div class="product-best-seller">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button class="test">
          Women's
          <div class="box women">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid">
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                  <li class="size-btn">38</li>
                  <li class="size-btn">39</li>
                  <li class="size-btn">40</li>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/nike-air-force.png"
                    />
                    <p class="name-product">NIKE AIR FORCE</p>
                  </div>
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <button class="test">
          Kid's
          <div class="box kid">
            <div class="dropdown-content">
              <div class="column">
                <h4>SHOP BY SIZE</h4>
                <ul class="size-grid kid-size">
                  <div class="size-column">
                    <p class="size-type">0-12 months</p>
                    <ul class="size-menu">
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                    </ul>
                  </div>
                  <div class="size-column">
                    <p class="size-type">1-5 year old</p>
                    <ul class="size-menu">
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">40</li>
                    </ul>
                  </div>
                  <div class="size-column">
                    <p class="size-type">5-10 year old</p>
                    <ul class="size-menu">
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                      <li class="size-btn">40</li>
                      <li class="size-btn">38</li>
                      <li class="size-btn">39</li>
                    </ul>
                  </div>
                </ul>
              </div>
              <div class="column">
                <h4>BRANDS</h4>
                <ul class="brands">
                  <li><img class="company" src="../icon/nike.png" /></li>
                  <li><img class="company" src="../icon/vans.png" /></li>
                  <li><img class="company" src="../icon/nb.png" /></li>
                  <li><img class="company" src="../icon/converse.png" /></li>
                  <li><img class="company" src="../icon/adidas.png" /></li>
                  <li><img class="company" src="../icon/onitsuka.png" /></li>
                  <li><img class="company" src="../icon/skechers.png" /></li>
                  <li><img class="company" src="../icon/puma.png" /></li>
                </ul>
              </div>
              <div class="column">
                <h4>BEST SELLERS</h4>
                <div class="sellers">
                  <div class="product">
                    <img class="product-image" src="../img/NIKE-VOMERO.png" />
                    <p class="name-product">NIKE VOMERO</p>
                  </div>
                  <div class="product">
                    <img
                      class="product-image"
                      src="../img/ADIDAS-ULTRABOOST.png"
                    />
                    <p class="name-product">ADIDAS ULTRABOOST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
        <span class="split-menu">&#124;</span>
        <button class="test">
          Brands
          <div class="box BRANDS">
            <h4 class="title">BRANDS</h4>
            <ul class="brands-menu">
              <li>
                <img class="company-brands-menu" src="../icon/nike.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/vans.png" />
              </li>
              <li><img class="company-brands-menu" src="../icon/nb.png" /></li>
              <li>
                <img class="company-brands-menu" src="../icon/converse.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/adidas.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/onitsuka.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/skechers.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
              <li>
                <img class="company-brands-menu" src="../icon/puma.png" />
              </li>
            </ul>
          </div>
        </button>

        <button class="test">Sale</button>
        <button class="test">New Arrivals</button>
        <span class="split-menu">&#124;</span>
        <button class="test">36 SNEAKERS</button>
      </div>
    </div>`,
  css: `../css/taskbar.css`,
  canDeleteCss: false,
  init: function () {
    ButtonVerification.init();
    Cart();
    FindAProductByNAme();
    headerScroll();
    LoadTrangChu();
    AddFilterEvents();
  },
};
function FindAProductByNAme() {
  const search = document.querySelector(".Search");
  search.addEventListener("change", (event) => {
    console.log("Load After Search");
    LoadPage("product", document.getElementById("container"));
    const products = allProducts.filter((pro) => {
      const temp = pro.name.toLowerCase();
      return temp.includes(event.target.value.toLowerCase());
    });
    console.log(products);

    console.log("1");
    LoadProductPageHaveProduct(products);
    console.log("2");
    DevideFlowFilter(null, products, true);
  });
}
function Cart() {
  const cartBtn = document.querySelector(".bag");
  cartBtn.addEventListener("click", () => {
    if (IsAuthenticated) LoadPage("cart", document.getElementById("container"));
    else alert("hay dang nhap truoc khi truy cap vao gio hang");
  });
}
function LoadTrangChu() {
  const header = document.querySelector(".Header .name");
  header.addEventListener("click", () => {
    LoadPage("home", document.getElementById("container"));
  });
}
function headerScroll() {
  const header = document.querySelector(".task-bar");
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset;
    if (lastScroll > currentScroll) {
      header.classList.remove("hide");
    } else {
      header.classList.add("hide");
    }
    lastScroll = currentScroll;
  });
}
/**
 * Gắn sự kiện click cho tất cả các nút lọc trong taskbar
 */
function AddFilterEvents() {
  // --- 1. LỌC THEO GIỚI TÍNH (MEN'S, WOMEN'S) ---
  // (Ta không lọc Kid's vì nó có cấu trúc size phức tạp)
  // Lưu trữ gender context hiện tại
  let currentGenderContext = null;

  const menuButtons = document.querySelectorAll(".menu > .test");
  menuButtons.forEach((btn) => {
    const buttonText = btn.textContent.trim().toLowerCase();
    if (buttonText === "men's") {
      btn.addEventListener("click", () => {
        currentGenderContext = "men";
        handleFilter("gender", "men");
      });
    } else if (buttonText === "women's") {
      btn.addEventListener("click", () => {
        currentGenderContext = "Women";
        handleFilter("gender", "Women");
      });
    } else if (buttonText === "kid's") {
      btn.addEventListener("click", () => {
        currentGenderContext = "kid";
        handleFilter("gender", "kid");
      });
    }
  }); // --- 2. LỌC THEO THƯƠNG HIỆU (BRAND) --- // Ánh xạ tên tệp icon sang tên thương hiệu trong dữ liệu

  const brandMap = {
    "nike.png": "Nike",
    "vans.png": "Vans",
    "nb.png": "New Balance", // Giả sử 'nb' là New Balance
    "converse.png": "Converse",
    "adidas.png": "Adidas",
    "onitsuka.png": "Onitsuka Tiger", // Giả sử
    "skechers.png": "Skechers",
    "puma.png": "Puma",
  };

  const brandImages = document.querySelectorAll(
    ".company, .company-brands-menu"
  );
  brandImages.forEach((img) => {
    const src = img.src;
    const fileName = src.split("/").pop(); // Lấy ra "nike.png"
    const brandName = brandMap[fileName];
    if (brandName) {
      img.addEventListener("click", (e) => {
        e.stopPropagation(); // Ngăn không cho sự kiện click vào "Men's" chạy
        // Tìm parent menu button để xác định context
        const menuButton = e.target.closest('.test');
        let genderContext = null;
        
        if (menuButton) {
          // Lấy text của button cha (men's, women's, kid's)
          const buttonText = menuButton.textContent.trim().toLowerCase();
          if (buttonText === "men's") {
            genderContext = "men";
          } else if (buttonText === "women's") {
            genderContext = "Women";
          } else if (buttonText === "kid's") {
            genderContext = "kid";
          }
          // Chỉ lọc brand trong context của gender tương ứng
          handleFilter("brand", brandName, genderContext);
        } else {
          // Nếu click từ menu Brands riêng biệt, không áp dụng context gender
          handleFilter("brand", brandName);
        }
      });
    }
  }); // --- 3. LỌC THEO KÍCH CỠ (SIZE) ---

  const sizeButtons = document.querySelectorAll(".dropdown-content .size-btn");
  sizeButtons.forEach((btn) => {
    const sizeValue = btn.textContent.trim();
    if (sizeValue) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // Ngăn không cho sự kiện click vào "Men's" chạy
        // Tìm parent menu button để xác định context
        const menuButton = e.target.closest('.test');
        let genderContext = null;
        
        if (menuButton) {
          // Lấy text của button cha (men's, women's, kid's)
          const buttonText = menuButton.textContent.trim().toLowerCase();
          if (buttonText === "men's") {
            genderContext = "men";
          } else if (buttonText === "women's") {
            genderContext = "Women";
          } else if (buttonText === "kid's") {
            genderContext = "kid";
          }
          // Chỉ lọc size trong context của gender tương ứng
          handleFilter("size", sizeValue, genderContext);
        } else {
          // Nếu click từ menu size riêng biệt, không áp dụng context gender
          handleFilter("size", sizeValue);
        }
      });
    }
  });
  const bestSellerProducts = document.querySelectorAll(".sellers .product");
  bestSellerProducts.forEach((productEl) => {
    // Tìm thẻ <p> chứa tên sản phẩm
    const productName = productEl
      .querySelector(".name-product")
      ?.textContent.trim();
    if (productName) {
      productEl.addEventListener("click", (e) => {
        e.stopPropagation(); // Rất quan trọng: không kích hoạt bộ lọc "Men's" // Gọi hàm filterByName với tên sản phẩm cụ thể
        filterByName(productName);
      });
    }
  });
}

/**
 * Hàm chung để xử lý logic lọc và tải lại trang sản phẩm
 * (Tái sử dụng logic từ FindAProductByNAme)
 * @param {string} filterType - Loại bộ lọc (ví dụ: "gender", "brand", "size")
 * @param {string|number} filterValue - Giá trị cần lọc (ví dụ: "men", "Nike", 40)
 */
function handleFilter(filterType, filterValue, contextGender = null) {
  console.log(`Filtering by ${filterType}: ${filterValue}, Context Gender: ${contextGender}`);
  // 1. Chuyển đến trang sản phẩm
  LoadPage("product", document.getElementById("container"));

  // 2. Lọc danh sách sản phẩm
  const products = allProducts.filter((pro) => {
    // Nếu có contextGender, kiểm tra gender trước
    if (contextGender) {
      if (pro.gender.toLowerCase() !== contextGender.toLowerCase()) {
        return false;
      }
    }

    // Sau đó kiểm tra điều kiện lọc chính
    switch (filterType) {
      case "gender":
        return pro.gender.toLowerCase() === filterValue.toLowerCase();
      case "brand":
        return pro.brand.toLowerCase() === filterValue.toLowerCase();
      case "size":
        return pro.size.includes(Number(filterValue));
      default:
        return false;
    }
  });

  console.log("Filtered products:", products);

  // 3. Render lại trang sản phẩm với danh sách đã lọc
  LoadProductPageHaveProduct(products);
  // 4. Đồng bộ hóa bộ lọc sidebar (quan trọng)
  DevideFlowFilter(null, products, true);
}
/**
 * Hàm chung để lọc sản phẩm THEO TÊN và tải lại trang
 * (Được dùng bởi Ô tìm kiếm & Nút Best Seller)
 * @param {string} nameToFilter - Tên sản phẩm cần tìm
 */
function filterByName(nameToFilter) {
  console.log(`Filtering by name: ${nameToFilter}`);
  // 1. Chuyển đến trang sản phẩm
  LoadPage("product", document.getElementById("container"));
  // 2. Lọc sản phẩm
  const products = allProducts.filter((pro) => {
    const temp = pro.name.toLowerCase(); // Dùng includes để tìm tên
    return temp.includes(nameToFilter.toLowerCase());
  });
  console.log("Filtered products:", products);

  // 3. Render lại trang
  LoadProductPageHaveProduct(products);
  // 4. Đồng bộ hóa sidebar
  DevideFlowFilter(null, products, true);
}
