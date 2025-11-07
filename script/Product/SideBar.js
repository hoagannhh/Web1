import {
  HandleEventProduct,
  LoadProductPageHaveProduct,
} from "../Product/Product.js";
import { allProducts } from "../Product/Product.js";
import { LoadAllProductPage } from "../Product/Product.js";
export const SideBar = {
  html: `
  <div class="container">
      <div class="sidebar">
        <div class="product-head">
        </div>

        <ul class="sidebar-menu">
          <li class="filter">
            <button class="dropdown-btn">
              <span>Gender</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <ul class="sub-menu">
              <div>
                <li>
                  <input type="checkbox" id="men" class="black-check" />
                  <label for="men">Men</label>
                </li>

                <li>
                  <input type="checkbox" id="Women" class="black-check" />
                  <label for="Women">Women</label>
                </li>

                <li>
                  <input type="checkbox" id="Unisex" class="black-check" />
                  <label for="Unisex">Unisex</label>
                </li>
              </div>
            </ul>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Price</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <div class="sub-menu"><input type="number" /></div>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Sale & Orders</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <div class="sub-menu">
              <input type="checkbox" id="Sale" class="black-check" />
              <label for="Sale">Sale</label>
            </div>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Size</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <ul class="sub-menu">
              <div class="sidebar-size-grid">
                <li><button class="sidebar-size-btn">35.5</button></li>
                <li><button class="sidebar-size-btn">36</button></li>
                <li><button class="sidebar-size-btn">36.5</button></li>
                <li><button class="sidebar-size-btn">37.5</button></li>
                <li><button class="sidebar-size-btn">38</button></li>
                <li><button class="sidebar-size-btn">38.5</button></li>
                <li><button class="sidebar-size-btn">39</button></li>
                <li><button class="sidebar-size-btn">40</button></li>
                <li><button class="sidebar-size-btn">40.5</button></li>
              </div>
            </ul>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Color</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <ul class="sub-menu">
              <div class="color-grid">
                <!-- checkbox màu đỏ -->
                <input
                  id="c-red"
                  class="color-input"
                  type="checkbox"
                  value="red"
                />
                <label for="c-red" class="color-label" data-color="red">
                </label>

                <!-- checkbox màu xanh -->
                <input
                  id="c-blue"
                  class="color-input"
                  type="checkbox"
                  value="blue"
                />
                <label for="c-blue" class="color-label" data-color="blue">
                </label>

                <!-- checkbox màu xanh lá -->
                <input
                  id="c-green"
                  class="color-input"
                  type="checkbox"
                  value="green"
                />
                <label for="c-green" class="color-label" data-color="green">
                </label>

                <!-- checkbox đen -->
                <input
                  id="c-black"
                  class="color-input"
                  type="checkbox"
                  value="black"
                />
                <label for="c-black" class="color-label" data-color="black">
                </label>

                <!-- checkbox trắng -->
                <input
                  id="c-white"
                  class="color-input"
                  type="checkbox"
                  value="white"
                />
                <label for="c-white" class="color-label" data-color="white">
                </label>

                <!-- checkbox vàng -->
                <input
                  id="c-yellow"
                  class="color-input"
                  type="checkbox"
                  value="yellow"
                />
                <label for="c-yellow" class="color-label" data-color="yellow">
                </label>
                <!-- checkbox xám -->
                <input
                  id="c-grey"
                  class="color-input"
                  type="checkbox"
                  value="grey"
                />
                <label for="c-grey" class="color-label" data-color="grey">
                </label>
                <!-- checkbox nâu -->
                <input
                  id="c-brown"
                  class="color-input"
                  type="checkbox"
                  value="brown"
                />
                <label for="c-brown" class="color-label" data-color="brown">
                </label>
                <!-- checkbox hồng -->
                <input
                  id="c-pink"
                  class="color-input"
                  type="checkbox"
                  value="pink"
                />
                <label for="c-pink" class="color-label" data-color="pink">
                </label>
              </div>
            </ul>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Sort By</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <div class="sub-menu">
              <button class="dropdown-option">Featured</button>
              <button class="dropdown-option">Newest</button>
              <button class="dropdown-option">High to Low</button>
              <button class="dropdown-option">Low to High</button>
            </div>
          </li>
          <li class="filter">
            <button class="dropdown-btn">
              <span>Category</span
              ><img
                src="../icon/drop-down-minor-svgrepo-com.svg"
                alt=""
                class="icon"
              />
            </button>
            <ul class="sub-menu">
              <div>
                ${GetCategoryFromDatabase()}
              </div>
            </ul>
          </li>
        </ul>
      </div>    
    `,
  css: `../css/sidebar.css`,
  canDeleteCss: true,
  init: function () {
    // console.log("Do something in here side bar");
    const filterState = {
      gender: [],
      price: null,
      onSale: false,
      size: null,
      colors: [],
      sortBy: "Featured", // Giá trị mặc định
      categories: [],
    };
    // console.log(filterState.sortBy);

    //sư kiện đẻ hiện thị các field bên trong mỗi mục bạn muốn tìm kiếm
    sideBar();
    DevideFlowFilter(filterState, null, false);
  },
};
export function DevideFlowFilter(filterState, products, isFilterBySeach) {
  if (isFilterBySeach) {
    console.log("filter by search " + isFilterBySeach);
    FilterVipBySearch(products, isFilterBySeach);
  } else {
    console.log("filter by All");
    FilterVip(filterState, isFilterBySeach);
  }
}
// filter kết hợp với tìm kiếm tên ở trên
function FilterVipBySearch(products, isFilterBySeach) {
  const filterState = {
    gender: [],
    price: null,
    onSale: false,
    size: null,
    colors: [],
    sortBy: "Featured", // Giá trị mặc định
    categories: [],
  };
  AddEventButtonChooseSize(filterState, isFilterBySeach, products);
  AddEventButtonSortBy(filterState, isFilterBySeach, products);
  AddEventBtnCategories(filterState, isFilterBySeach, products);
  ChooseGender(filterState, isFilterBySeach, products);
  ChooseProductSale(filterState, isFilterBySeach, products);
  FilterByMoney(filterState, isFilterBySeach, products);
  FilterByColor(filterState, isFilterBySeach, products);
}
// filter này chỉ sử dụng side bar
function FilterVip(filterState, isFilterBySeach, products) {
  AddEventButtonChooseSize(filterState, isFilterBySeach, products);
  AddEventButtonSortBy(filterState, isFilterBySeach, products);
  AddEventBtnCategories(filterState, isFilterBySeach, products);
  ChooseGender(filterState, isFilterBySeach, products);
  ChooseProductSale(filterState, isFilterBySeach, products);
  FilterByMoney(filterState, isFilterBySeach, products);
  FilterByColor(filterState, isFilterBySeach, products);

}
function AfterFilter(filterState, isFilterBySeach, products) {
  // console.log(filterState);
  if (!isFilterBySeach) {
    console.log("Bat dau filter bth");
    LoadProductPage(filterState);
  } else {
    console.log("Bat dau filter theo ten");
    products = Filter(filterState, products);
    LoadProductPageHaveProduct(products);
  }
}
function FilterByColor(filterState, isFilterBySeach, products) {
  const colors = document.querySelectorAll(".color-input");
  colors.forEach((color) => {
    color.addEventListener("click", (event) => {
      if (filterState.colors.includes(event.target.value)) {
        filterState.colors = filterState.colors.filter(
          (g) => g !== event.target.value
        );
      } else {
        filterState.colors.push(event.target.value);
      }
      AfterFilter(filterState, isFilterBySeach, products);
    });
  });
}
// filter theo giá
function FilterByMoney(filterState, isFilterBySeach, products) {
  console.log("filter by money");
  const inputs = document.querySelector('.sub-menu input[type = "number"]');
  inputs.addEventListener("change", (event) => {
    if (Number(event.target.value) < 0) {
      alert("so tien ko the nho hon 0");
    } else {
      filterState.price = Number(event.target.value);
    }
    AfterFilter(filterState, isFilterBySeach, products);
  });
}
// filter theo sản phẩm được giảm giá
function ChooseProductSale(filterState, isFilterBySeach, products) {
  const submenu = document.querySelectorAll(".black-check");
  submenu.forEach((checkBox) => {
    checkBox.addEventListener("change", () => {
      if (checkBox.id === "Sale")
        if (checkBox.checked) filterState.onSale = true;
        else filterState.onSale = false;
      AfterFilter(filterState, isFilterBySeach, products);
    });
  });
}
// filter theo giới tính
function ChooseGender(filterState, isFilterBySeach, products) {
  const submenu = document.querySelectorAll(".black-check");
  submenu.forEach((checkBox) => {
    checkBox.addEventListener("change", () => {
      if (["men", "Women", "Unisex"].includes(checkBox.id)) {
        if (checkBox.checked) {
          filterState.gender.push(checkBox.id);
        } else {
          filterState.gender = filterState.gender.filter(
            (g) => g !== checkBox.id
          );
        }
        AfterFilter(filterState, isFilterBySeach, products);
      }
    });
  });
}
// hàm chọn theo category
function AddEventBtnCategories(filterState, isFilterBySeach, products){
  console.log("filter theo category");
  const submenu = document.querySelectorAll(".black-check-category");
  console.log(submenu);

  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  let categoryID = [];
  for(let i = 3; i < categories.length; i++){
    categoryID.push(categories[i].id);
  }
  console.log(categoryID);
  submenu.forEach((checkbox) => {
    checkbox.addEventListener("change", ()=>{
      console.log(checkbox.id);
      console.log(checkbox.checked);
      console.log(categoryID)
      console.log(categoryID.includes(Number(checkbox.id)))
      if (categoryID.includes(Number(checkbox.id))){
        if (checkbox.checked){
          console.log(typeof(checkbox.id))
          console.log(checkbox.id)
        console.log("Trước push:", filterState.categories);
        filterState.categories.push(Number(checkbox.id));
        console.log("Sau push:", filterState.categories);
        }else{
          filterState.categories = filterState.categories.filter(c => c !== Number(checkbox.id))
                    console.log(filterState.categories);

        }
        AfterFilter(filterState, isFilterBySeach, products);
      }
    })
  })
}
// ||-- Ham Check --||Hàm để in trạng thái ra console mỗi khi có thay đổi
function AddEventButtonChooseSize(filterState, isFilterBySeach, products) {
  const allButton = document.querySelectorAll(".sidebar-size-btn");
  allButton.forEach((button) => {
    button.addEventListener("click", () => {
      // console.log(1);
      allButton.forEach((btn) => {
        btn.classList.remove("selected");
      });

      filterState.size = button.textContent;
      button.classList.add("selected");
      AfterFilter(filterState, isFilterBySeach, products);
    });
  });
}
function AddEventButtonSortBy(filterState, isFilterBySeach, products) {
  const allButton = document.querySelectorAll(".dropdown-option");
  allButton.forEach((button) => {
    button.addEventListener("click", () => {
      allButton.forEach((btn) => {
        btn.classList.remove("selected");
      });
      filterState.sortBy = button.textContent;
      button.classList.add("selected");
      AfterFilter(filterState, isFilterBySeach, products);
    });
  });
}

function sideBar() {
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;

      submenu.classList.toggle("show");
      btn.classList.toggle("rotate");
    });
  });
}
function LoadProductPage(filterState) {
  let htmlProduct = "";
  let currentPage = 1;
  const productsPerPage = 9;

  try {
    // Kiểm tra xem có dữ liệu sản phẩm không
    if (!allProducts || !Array.isArray(allProducts)) {
      console.error("Dữ liệu sản phẩm không hợp lệ");
      document.querySelector(".product-grid").innerHTML = 
        '<div class="error-message">Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.</div>';
      return;
    }

    // Lọc sản phẩm
    const filteredProducts = Filter(filterState, allProducts);
    console.log("Số sản phẩm sau khi lọc:", filteredProducts.length);

    if (filteredProducts.length === 0) {
      // Hiển thị thông báo thân thiện hơn
      document.querySelector(".product-grid").innerHTML = `
        <div class="no-products-message">
          <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc đã chọn.</p>
          <button onclick="ResetAllFilters(${JSON.stringify(filterState)}); LoadAllProductPage();" class="reset-filters-btn">
            Đặt lại bộ lọc
          </button>
        </div>
      `;
      document.querySelector(".pagination").innerHTML = "";
      return;
    }

    // Render sản phẩm và phân trang
    renderProduct(htmlProduct, filteredProducts, currentPage, productsPerPage);
    renderPagination(htmlProduct, filteredProducts, currentPage, productsPerPage);
    HandleEventProduct(filteredProducts);
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    document.querySelector(".product-grid").innerHTML = 
      '<div class="error-message">Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại sau.</div>';
  }

}
function Filter(filterState, data) {
  console.log("Bắt đầu lọc với filterState:", filterState);
  console.log("Số lượng sản phẩm ban đầu:", data.length);

  // Bắt đầu với tất cả sản phẩm
  let products = [...data];

  // Lọc theo giới tính
  if (filterState.gender && filterState.gender.length > 0) {
    console.log("Lọc theo giới tính:", filterState.gender);
    products = products.filter(product => 
      filterState.gender.some(gender => 
        product.gender.toLowerCase() === gender.toLowerCase()
      )
    );
    console.log("Số sản phẩm sau khi lọc giới tính:", products.length);
  }

  // Lọc theo giá
  if (filterState.price !== null && filterState.price !== undefined) {
    console.log("Lọc theo giá:", filterState.price);
    products = products.filter(product => product.price >= filterState.price);
    console.log("Số sản phẩm sau khi lọc giá:", products.length);
  }

  // Lọc sản phẩm đang sale
  if (filterState.onSale) {
    console.log("Lọc sản phẩm sale");
    products = products.filter(product => 
      product.onSale === "true" || product.onSale === true
    );
    console.log("Số sản phẩm sau khi lọc sale:", products.length);
  }

  // Lọc theo size
  if (filterState.size) {
    console.log("Lọc theo size:", filterState.size);
    products = products.filter(product => 
      product.size && product.size.includes(Number(filterState.size))
    );
    console.log("Số sản phẩm sau khi lọc size:", products.length);
  }

  // Lọc theo màu sắc
  if (filterState.colors && filterState.colors.length > 0) {
    console.log("Lọc theo màu:", filterState.colors);
    products = products.filter(product => 
      filterState.colors.some(color => 
        product.color && product.color.map(c => c.toLowerCase()).includes(color.toLowerCase())
      )
    );
    console.log("Số sản phẩm sau khi lọc màu:", products.length);
  }

  // Lọc theo danh mục
  if (filterState.categories && filterState.categories.length > 0) {
    console.log("Lọc theo danh mục:", filterState.categories);
    products = products.filter(product => 
      filterState.categories.some(categoryId => 
        product.category && product.category.includes(Number(categoryId))
      )
    );
    console.log("Số sản phẩm sau khi lọc danh mục:", products.length);
  }
  // Sắp xếp sản phẩm
  if (filterState.sortBy !== "Featured") {
    console.log("Sắp xếp theo:", filterState.sortBy);
    if (filterState.sortBy === "High to Low") {
      products.sort((a, b) => b.price - a.price);
    } else if (filterState.sortBy === "Low to High") {
      products.sort((a, b) => a.price - b.price);
    } else if (filterState.sortBy === "Newest") {
      products.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }
  }

  console.log("Số lượng sản phẩm cuối cùng:", products.length);
  return products;
}

function renderProduct(htmlProduct, allProducts, currentPage, productsPerPage) {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  htmlProduct = ""; // reset nội dung cũ

  currentProducts.forEach((product) => {
    htmlProduct += `
        <div class="prod-demo" data-id="${product.id}">
          <div class="prod">
            <div class="new-in-prod"><p class="new-text">New</p></div>
            <img class="img-prod" src="${product["img-represent"]}" />
          </div>
          <div class="info-prod">
            <p class="name-prod">${product.name}</p>
            <p class="atribute-prod">${product.gender} ${product.brand}</p>
            <p class="price">${ConvertINTtoVND(product.price)}</p>
            <div class="buy-now">
              <button class="buy-now-btn">Buy Now</button>
            </div>
            </div>
        </div>
                        `;
  });
  document.querySelector(".product-grid").innerHTML = "";
  document
    .querySelector(".product-grid")
    .insertAdjacentHTML("beforeend", htmlProduct);
}
function renderPagination(
  htmlProduct,
  allProducts,
  currentPage,
  productsPerPage
) {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="page-btn ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">
        ${i}
      </button>
    `;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      currentPage = Number(e.target.dataset.page);
      renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
      renderPagination(htmlProduct, allProducts, currentPage, productsPerPage);
    });
  });
}

function ConvertINTtoVND(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
function ResetAllFilters(filterState) {
  // Reset checkboxes (Gender, Sale, Colors, categories)
  const allCheckboxes = document.querySelectorAll('.black-check, .color-input, .black-check-category');
  allCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Reset price input
  const priceInput = document.querySelector('.sub-menu input[type="number"]');
  if (priceInput) {
    priceInput.value = '';
  }
  
  // Reset size buttons
  const sizeButtons = document.querySelectorAll('.sidebar-size-btn');
  sizeButtons.forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Reset sort buttons
  const sortButtons = document.querySelectorAll('.dropdown-option');
  sortButtons.forEach(btn => {
    btn.classList.remove('selected');
  });
  filterState.gender = [];
  filterState.price = null;
  filterState.onSale = false;
  filterState.size = null;
  filterState.colors = [];
  filterState.sortBy = "Featured";
  filterState.categories = [];
  // filterState = {
  //   gender: [],
  //   price: null,
  //   onSale: false,
  //   size: null,
  //   colors: [],
  //   sortBy: "Featured", // Giá trị mặc định
  //   categories: [],
  // };

}

function GetCategoryFromDatabase(){
  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  let html = 
  `
  `;
  if (!categories){
    console.debug("Khong the load category tu local storage");
    console.log(categories);
    return;
  }

  console.log("----------------------------------------------------------------------------");
  console.log(categories);
  if (categories.length <= 3) return html;
  for (let i = 3; i < categories.length; i++){
    if (categories[i].isShown){
      html += 
          `
              <li>
                <input type="checkbox" id="${categories[i].id}" class="black-check-category" />
                <label for="${categories[i].id}">${categories[i].name}</label>
              </li>
          `
    }
  }
  return html;
}