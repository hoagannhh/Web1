import {HandleEventProduct} from '../Product/Product.js'
export const SideBar = {
    html: `
  <div class="container">
      <div class="sidebar">
        <div class="product-head">
          <div><h2>Men's shoes(1000)</h2></div>
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
        </ul>
      </div>    
    `,
    css: `../css/sidebar.css`,
    canDeleteCss: false,
    init: function (){
        // console.log("Do something in here side bar");
        const filterState = {
          gender: [],
          price: null,
          onSale: false,
          size: null,
          colors: [],
          sortBy: "Featured" // Giá trị mặc định
        };
        // console.log(filterState.sortBy);
        
        sideBar();
        AddEventButtonChooseSize(filterState);
        AddEventButton(filterState);
        ChooseGender(filterState);
        ChooseProductSale(filterState);
        FilterByMoney(filterState);
        FilterByColor(filterState);

    }
}
function AfterFilter(filterState){
    // console.log(filterState);
    LoadProductPage(filterState);
}
function FilterByColor(filterState){
  const colors = document.querySelectorAll(".color-input");
  colors.forEach((color) => {
    color.addEventListener("click", (event) => {
      if (filterState.colors.includes(event.target.value)){
        filterState.colors = filterState.colors.filter( g => g !== event.target.value)
      }else{
        filterState.colors.push(event.target.value);
      }
      AfterFilter(filterState);
    })
  })
}
// filter theo giá
function FilterByMoney(filterState){
  const inputs = document.querySelector('.sub-menu input[type = "number"]');
  inputs.addEventListener("change", (event) => {
    if (Number(event.target.value) < 0){
      alert("so tien ko the nho hon 0");
    }else{
      filterState.price = Number(event.target.value);
    }
      AfterFilter(filterState);
  })
}
// filter theo sản phẩm được giảm giá
function ChooseProductSale(filterState){
  const submenu = document.querySelectorAll(".black-check");
  submenu.forEach(checkBox => {
    checkBox.addEventListener("change", () => {
      if (checkBox.id === "Sale")
        if (checkBox.checked)
          filterState.onSale = true;
        else
          filterState.onSale = false;
      AfterFilter(filterState);
    })
  })
}
// filter theo giới tính
function ChooseGender(filterState){
  const submenu = document.querySelectorAll(".black-check");
  submenu.forEach((checkBox) => {
    checkBox.addEventListener("change", () => {
      if (['men', 'Women', 'Unisex'].includes(checkBox.id)){
        if (checkBox.checked){
            filterState.gender.push(checkBox.id);
        }else{
          filterState.gender = filterState.gender.filter(g => g !== checkBox.id)
        }
      AfterFilter(filterState);
      }
    })
  })
}
// ||-- Ham Check --||Hàm để in trạng thái ra console mỗi khi có thay đổi
function AddEventButtonChooseSize(filterState){
  const allButton = document.querySelectorAll(".sidebar-size-btn");
  allButton.forEach(button => {
      button.addEventListener("click", () => {
          // console.log(1);
          allButton.forEach((btn) => {
              btn.classList.remove("selected");
          })

          filterState.size = button.textContent;
          button.classList.add("selected");
      AfterFilter(filterState);
      })
  })
}
function AddEventButton(filterState){
  const allButton = document.querySelectorAll(".dropdown-option");
  allButton.forEach(button => {
      button.addEventListener("click", () => {
          allButton.forEach((btn) => {
              btn.classList.remove("selected");
          })
          filterState.sortBy = button.textContent;
          button.classList.add("selected");
      AfterFilter(filterState);
      })
  })
}
function sideBar(){
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;

      submenu.classList.toggle("show");
      btn.classList.toggle("rotate");
    });
  });
}
function LoadProductPage(filterState){
    let htmlProduct = "";
    let allProducts = [];
    let currentPage = 1;
    const productsPerPage = 9; // số sản phẩm trên 1 trang

    fetch("../data/product.json")
      .then((response) => response.json())
      .then((data) => {
        allProducts = Filter(filterState, data);


        renderProduct(htmlProduct, allProducts, currentPage, productsPerPage);
        renderPagination(htmlProduct, allProducts, currentPage, productsPerPage);
        HandleEventProduct(allProducts)
      })
      .catch((error) => console.error(error));
}
function Filter(filterState, data){
  // console.log("-------------------");
  console.log(filterState);
  // console.log(data);
  let products = [];

  products = products.filter(product => product.gender.includes(filterState.gender));
  if (filterState.gender.length > 0) {
        console.log("gender");
    products = data.filter(product => filterState.gender.includes(product.gender));
  }

  if (filterState.price !== null){
    console.log("price");
    products = products.filter(product => filterState.price <=  product.price);
  }

  if (filterState.onSale !== false){
        console.log("on sale");

    products = products.filter(product => product.onSale === "true");
  }

  if (filterState.size !== null){
        console.log("size");
    products = products.filter(product => product.size.includes(Number(filterState.size)));
  }

    if (filterState.colors.length > 0) {
      console.log("color");
      products = products.filter(product => {
        return filterState.colors.some(selectedColor => 
          product.color.includes(selectedColor)
        );
    });
  }

  if (filterState.sortBy !== "Featured"){
    if (filterState.sortBy === "High to Low"){
      products = products.sort((a, b) => b.price - a.price)
    }else if (filterState.sortBy === "Low to High"){
      products = products.sort((a, b) => a.price - b.price)

    }
  }


  console.log(products);

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
  document.querySelector(".product-grid").insertAdjacentHTML("beforeend",htmlProduct);
}
function renderPagination(htmlProduct, allProducts, currentPage, productsPerPage) {
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
