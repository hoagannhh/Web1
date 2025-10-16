export const SideBar = {
    html: `
  <div class="container">
      <div class="sidebar">
        <div class="product-head">
          <div><h2>Men's shoes</h2></div>
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
        console.log("Do something in here side bar");
        sideBar();
    }
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
