export const AdminPrice = {
  html: `
          <div class="main-content">
            <div class="header">
              <div class="left-header">
                <div><p>Price</p></div>
              </div>
              <div class="right-header">
                <div class="admin-account">
                  <button class="admin-account-btn">
                    <img src="../img/goku.jpg" alt="" class="admin-avatar" />
                    <p style="color: black">Trần Chính Thành</p>
                  </button>
                </div>
              </div>
            </div>
            <div class="filter-container">
              <div class="with-category">
                <div class="title-filter">Theo loại sản phẩm</div>
                <div class="scroll-bar">
                <div class="filter-selection">
                  <div>Nam</div>
                  <div class="profit-container">
                    <input type="text" class="profit" value="0%""></div>
                </div>
                <div class="filter-selection">
                  <div>Nữ</div>
                  <div class="profit-container">
                    <input type="text" class="profit" value="0%""></div>
                </div>
                <div class="filter-selection">
                  <div>Unisex</div>
                  <div class="profit-container">
                    <input type="text" class="profit" value="0%""></div>
                </div>
                </div>
                
                <div>
                  <button class="filter-save-btn">Lưu</button>
                </div>
              </div>
              <div class="with-product">
                <div class="title-filter">Theo sản phẩm</div>
                <div class="filter-selection">
                  <div class="name-product-update-profit"></div>
                  <div class="profit-with-product">
                    <div class="profit-container">
                    <!-- <input type="text" class="profit" value="0%""> -->
                  </div>
                    <div>
                      <!-- <img
                        class="with-product-delete-img"
                        src="../icon/adminDelete.png"
                      /> -->
                    </div>
                  </div>
                </div>
                <div>
                  <button class="filter-add-btn">Thêm lợi nhuận riêng</button>
                </div>
              </div>
            </div>
          <div class="view-container">
        <div class="view-content">
            <div class="table-controls">
                <div class="search-bar">
                    <input type="text" placeholder="Bella UT Femme" id="productSearchInput" />
                    <img src="../icon/adminPriceSearch.png" alt="Search" class="search-icon" />
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Loại sản phẩm</th>
                        <th>Giá vốn</th>
                        <th>%Lợi nhuận</th>
                        <th>Giá bán dự kiến</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bella UT Femme</td>
                        <td>Women</td>
                        <td>1.400.000 đ</td>
                        <td>
                            <span class="profit-tag">50% Mặc định</span>
                        </td>
                        <td class="final-price">2.100.000 đ</td>
                    </tr>
                    </tbody>
            </table>
        </div>
    </div>
  `,
  css: `../css/adminPrice.css`,
  canDeleteCss: true,
  init: function () {
    let allProducts;
    let allCategories = [];
    let categoriesMap = new Map();
    // an toàn: đảm bảo luôn là mảng và dùng cùng key "allProduct" (chuẩn trong project)
    try {
      allProducts = JSON.parse(localStorage.getItem("allProduct"));
      if (!Array.isArray(allProducts)) allProducts = [];
    } catch (e) {
      allProducts = [];
      console.warn(
        "Failed to parse allProduct from localStorage, using empty array",
        e
      );
    }

    allProducts = allProducts.map((p) => {
      // 1. Chuẩn hóa thuộc tính price (Giá bán)
      // Nếu price là undefined, null, hoặc không phải số, đặt giá trị là 0
      const priceValue =
        typeof p.price === "number" && !isNaN(p.price) ? p.price : 0;

      // 2. Chuẩn hóa thuộc tính cost (Giá vốn)
      // Nếu cost là undefined, null, hoặc không phải số, đặt giá trị là 0
      const costValue =
        typeof p.cost === "number" && !isNaN(p.cost) ? p.cost : 0;

      // Trả về đối tượng đã được chuẩn hóa
      return {
        ...p,
        price: priceValue,
        cost: costValue,
      };
    });
    // Khai báo mảng tạm thời CỤC BỘ và EXPORT nó
    let productSpecificContainer = null;
    let productSpecificList = null;
    // Đường dẫn mặc định tới tệp dữ liệu sản phẩm

    // CÀI ĐẶT PHÂN TRANG
    const PRODUCTS_PER_PAGE = 6;
    let currentPage = 1;
    // -----------------------------

    let searchKeyword = "";
    // Trạng thái (State) quản lý các quy tắc lợi nhuận
    // profitRules: Chứa các quy tắc lợi nhuận:
    // - category: Mặc định cho Men, Women, Kids
    // - productSpecific: Quy tắc áp dụng riêng cho từng product ID
    // const profitRules = {
    //   // Mặc định 50% cho tất cả nếu không có rule cụ thể
    //   defaultCategoryProfit: 0,
    //   category: {
    //     Men: 0,
    //     Women: 0,
    //     Kids: 0,
    //   },
    //   // Ví dụ: "s38": 60 (Lợi nhuận riêng 60% cho sản phẩm s38)
    //   productSpecific: {},
    // };

    /**
     * Tải categoriesDB từ localStorage và tạo Map để tra cứu nhanh
     */
    function loadAndMapCategories() {
      try {
        const raw = localStorage.getItem("categoriesDB");
        if (raw) {
          allCategories = JSON.parse(raw);
          // Tạo một Map để tra cứu nhanh từ ID -> Category Object
          categoriesMap.clear();
          allCategories.forEach((cat) => {
            // Dùng cat.id làm khóa
            categoriesMap.set(cat.id, cat);
          });
          console.log("Đã tải và map CategoriesDB:", categoriesMap);
        } else {
          console.warn("Không tìm thấy 'categoriesDB' trong localStorage.");
        }
      } catch (e) {
        console.error("Không thể tải 'categoriesDB'", e);
        allCategories = [];
        categoriesMap.clear();
      }
    }
    const RULES_KEY = "priceProfitRules";
    function loadProfitRules() {
      // 1. Tải danh sách categories đang hoạt động
      let activeCategories = [];
      try {
        const rawCategories = localStorage.getItem("categoriesDB");
        if (rawCategories) {
          const allCategories = JSON.parse(rawCategories);
          // Chỉ lấy các category đang được hiển thị VÀ CÓ ID
          activeCategories = allCategories.filter(
            (cat) => cat.isShown === true && cat.id
          );
        } else {
          console.warn(
            "Không tìm thấy 'categoriesDB', sử dụng danh sách mặc định."
          );
        }
      } catch (e) {
        console.error("Lỗi khi đọc 'categoriesDB'", e);
        activeCategories = []; // Trả về rỗng nếu lỗi
      }

      if (activeCategories.length === 0) {
        console.warn("Không có category nào hoạt động (hoặc thiếu 'id').");
      }

      // 2. Tải profit rules hiện có
      let rules;
      try {
        const rawRules = localStorage.getItem(RULES_KEY);
        if (!rawRules) {
          rules = {
            defaultCategoryProfit: 0,
            category: {},
            productSpecific: {},
          };
        } else {
          const parsed = JSON.parse(rawRules);
          rules = {
            defaultCategoryProfit:
              typeof parsed.defaultCategoryProfit === "number"
                ? parsed.defaultCategoryProfit
                : 0,
            category: parsed.category || {},
            productSpecific: parsed.productSpecific || {},
          };
        }
      } catch (e) {
        console.warn("Không load được quy tắc lợi nhuận, dùng quy tắc rỗng", e);
        rules = {
          defaultCategoryProfit: 0,
          category: {},
          productSpecific: {},
        };
      }

      // 3. Đồng bộ hóa rules.category với activeCategories
      const syncedCategoryRules = {};
      let rulesChanged = false; // Cờ để kiểm tra xem có cần lưu lại không

      // Thêm/Cập nhật rules dựa trên categories đang hoạt động
      activeCategories.forEach((cat) => {
        const catId = cat.id; // <--- SỬA 1: DÙNG 'id'
        if (!catId) return; // Bỏ qua nếu không có id

        if (rules.category.hasOwnProperty(catId)) {
          // <--- SỬA 2: KIỂM TRA BẰNG 'id'
          // Category đã có, giữ nguyên % lợi nhuận
          syncedCategoryRules[catId] = rules.category[catId]; // <--- SỬA 3: LƯU BẰNG 'id'
        } else {
          // Category mới, thêm với 0%
          syncedCategoryRules[catId] = 0; // <--- SỬA 4: LƯU BẰNG 'id'
          rulesChanged = true; // Đánh dấu là có thay đổi
        }
      });

      // Kiểm tra xem có rule cũ nào cần xóa không
      if (
        Object.keys(rules.category).length !==
        Object.keys(syncedCategoryRules).length
      ) {
        rulesChanged = true;
      }

      // 4. Gán lại rule đã đồng bộ
      rules.category = syncedCategoryRules;

      // 5. Nếu có thay đổi (thêm mới hoặc xóa cũ), lưu lại
      if (rulesChanged) {
        console.log("Đã đồng bộ hóa profit rules với categoriesDB.");
        saveProfitRules(rules);
      }

      return rules;
    }
    function saveAllProducts() {
      try {
        // Lưu biến 'allProducts' toàn cục (trong phạm vi init)
        localStorage.setItem("allProduct", JSON.stringify(allProducts));
        console.log("Đã lưu allProduct với giá bán được cập nhật.");
      } catch (e) {
        console.error("Không thể lưu allProduct vào localStorage", e);
      }
    }
    function saveProfitRules(rulesToSave) {
      try {
        // Sử dụng tham số 'rulesToSave' thay vì biến 'profitRules' bên ngoài
        localStorage.setItem(RULES_KEY, JSON.stringify(rulesToSave));
      } catch (e) {
        console.error("kh lưu đc", e);
      }
    }
    // load quy tắc lợi nhuận
    const profitRules = loadProfitRules();

    //Chuyển số sang định dạng tiền tệ VNĐ.
    function ConvertINTtoVND(number) {
      if (typeof number !== "number" || isNaN(number)) {
        return "N/A";
      }
      // Dùng Math.round để làm tròn giá bán dự kiến
      const roundedNumber = Math.round(number);
      return roundedNumber.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }

    //Tính toán giá bán dựa trên giá vốn và quy tắc lợi nhuận.
    //Tính toán giá bán dựa trên giá vốn và quy tắc lợi nhuận.

    function calculatePrice(product) {
      const costPrice = product.cost || 0;
      let profitPercentage = profitRules.defaultCategoryProfit;
      let source = "Mặc định";

      // 1. Kiểm tra quy tắc riêng theo sản phẩm (Ưu tiên cao nhất)
      if (profitRules.productSpecific[product.id]) {
        profitPercentage = profitRules.productSpecific[product.id];
        source = "Theo sản phẩm";
      }
      // 2. Kiểm tra quy tắc theo loại
      else if (product.category && product.category.length > 0) {
        let mainCategoryProfit = null;
        let mainCategorySource = "";
        let subCategoryProfit = null; // Giá trị này có thể là 0
        let subCategorySource = "";
        const reversedCategories = [...product.category].reverse();
        // Duyệt qua TẤT CẢ category ID của sản phẩm
        // for (const catId of product.category) {
        for (const catId of reversedCategories) {
          const category = categoriesMap.get(catId);

          // Lấy quy tắc lợi nhuận từ profitRules
          if (category && profitRules.category.hasOwnProperty(category.id)) {
            // Lợi nhuận được lấy ra là number (ví dụ: 70, 0, 15)
            const ruleProfit = profitRules.category[category.id];
            const ruleSource = `Theo loại (${category.name})`;

            if (category.manageable === true) {
              // Đây là loại PHỤ (Sub-category)
              // Chỉ lấy rule loại phụ ĐẦU TIÊN tìm thấy
              if (subCategoryProfit === null) {
                subCategoryProfit = ruleProfit;
                subCategorySource = ruleSource;
              }
            } else if (category.manageable === false) {
              // Đây là loại CHÍNH (Main-category)
              mainCategoryProfit = ruleProfit;
              mainCategorySource = ruleSource;
            }
          }
        }

        // Áp dụng ưu tiên với ràng buộc mới
        // RÀNG BUỘC CỦA BẠN NẰM Ở ĐÂY:
        // Nếu tìm thấy lợi nhuận loại phụ VÀ lợi nhuận đó KHÁC 0
        if (subCategoryProfit !== null && subCategoryProfit !== 0) {
          // Ưu tiên 1: Lấy theo loại phụ (Lợi nhuận > 0)
          profitPercentage = subCategoryProfit;
          source = subCategorySource;
        } else if (mainCategoryProfit !== null) {
          // Ưu tiên 2: Lấy theo loại chính (Nếu loại phụ là 0 hoặc không có)
          profitPercentage = mainCategoryProfit;
          source = mainCategorySource;
        }
        // Nếu cả hai đều null/0, 'profitPercentage' sẽ giữ nguyên giá trị 'defaultCategoryProfit'
      }

      const profitRate = profitPercentage / 100;
      const sellingPrice = costPrice * (1 + profitRate);

      return {
        costPrice,
        profitPercentage,
        sellingPrice,
        source,
      };
    }

    // Tìm một sản phẩm trong allProducts bằng ID
    function findProductById(productId) {
      return allProducts.find((product) => product.id === productId);
    }

    // // Khởi tạo các phần tử DOM cần thiết
    // productSpecificContainer = document.querySelector(".with-product");
    // productSpecificList =
    //   productSpecificContainer.querySelector(".filter-selection")?.parentElement; // Lấy div chứa các filter-selection

    //hiển thị ds sp cần set lơi nhuận riêng
    // function renderProductSpecificProfits() {
    //   if (!productSpecificList) return;

    //   // Xóa tất cả các mục cũ trước khi render lại (trừ tiêu đề và nút Thêm)
    //   const existingSelections =
    //     productSpecificList.querySelectorAll(".filter-selection");
    //   existingSelections.forEach((selection) => selection.remove());

    //   const productSpecificKeys = Object.keys(profitRules.productSpecific);

    //   if (productSpecificKeys.length === 0) {
    //     // Không có sản phẩm nào có lợi nhuận riêng
    //     // Có thể thêm một dòng thông báo tại đây nếu muốn
    //   }

    //   productSpecificKeys.forEach((productId) => {
    //     const product = findProductById(productId);
    //     const profit = profitRules.productSpecific[productId];

    //     if (!product) return; // Bỏ qua nếu không tìm thấy sản phẩm

    //     const newSelection = document.createElement("div");
    //     newSelection.className = "filter-selection";
    //     newSelection.dataset.productId = productId;

    //     newSelection.innerHTML = `
    //     <div class="name-product-update-profit">${product.name}</div>
    //     <div class="profit-with-product">
    //       <div class="profit-container">
    //         <input type="text" class="profit product-specific-profit-input" value="${profit}%" data-product-id="${productId}">
    //       </div>
    //       <div>
    //         <img
    //           class="with-product-delete-img"
    //           src="../icon/adminDelete.png"
    //           data-product-id="${productId}"
    //           alt="Delete"
    //         />
    //       </div>
    //     </div>
    //   `;

    //     // Chèn mục mới vào trước nút "Thêm lợi nhuận riêng"
    //     const addButton =
    //       productSpecificContainer.querySelector(".filter-add-btn");
    //     if (addButton) {
    //       productSpecificList.insertBefore(
    //         newSelection,
    //         addButton.parentElement
    //       );
    //     } else {
    //       // Trường hợp không tìm thấy nút Thêm
    //       productSpecificList.appendChild(newSelection);
    //     }
    //   });

    //   // Gắn sự kiện cho input và nút xóa sau khi render
    //   setupProductSpecificEventListeners();
    // }
    //hiển thị ds sp cần set lơi nhuận riêng
    // THAY THẾ HÀM CŨ
    function renderProductSpecificProfits() {
      // SỬA 8: Dùng 'productSpecificList'
      if (!productSpecificList) {
        console.error("Lỗi: productSpecificList chưa được khởi tạo.");
        return;
      }

      // Xóa tất cả các mục cũ bên trong scroll-bar
      productSpecificList.innerHTML = ""; // <--- SỬA 9

      const productSpecificKeys = Object.keys(profitRules.productSpecific);

      if (productSpecificKeys.length === 0) {
        // (Tùy chọn) Thêm thông báo nếu rỗng
        // productSpecificList.innerHTML = '<div>Chưa có sản phẩm nào.</div>';
      }

      productSpecificKeys.forEach((productId) => {
        const product = findProductById(productId);
        const profit = profitRules.productSpecific[productId];

        if (!product) return; // Bỏ qua nếu không tìm thấy sản phẩm

        const newSelection = document.createElement("div");
        newSelection.className = "filter-selection";
        newSelection.dataset.productId = productId;

        newSelection.innerHTML = `
        <div class="name-product-update-profit">${product.name}</div>
        <div class="profit-with-product">
          <div class="profit-container">
            <input type="text" class="profit product-specific-profit-input" value="${profit}%" data-product-id="${productId}">
          </div>
          <div>
            <img
              class="with-product-delete-img"
              src="../icon/adminDelete.png"
              data-product-id="${productId}"
              alt="Delete"
            />
          </div>
        </div>
      `;

        // Chèn mục mới VÀO TRONG div scroll-bar
        productSpecificList.appendChild(newSelection); // <--- SỬA 10
      });

      // Gắn sự kiện cho input và nút xóa sau khi render
      setupProductSpecificEventListeners();
    }

    //Thêm sản phẩm vào profitRules.productSpecific và render lại

    function addProductToSpecificProfit(productId) {
      if (!findProductById(productId)) {
        console.error("Không tìm thấy sản phẩm với ID:", productId);
        return;
      }

      // Kiểm tra nếu sản phẩm đã có trong rule rồi thì không thêm nữa
      if (!profitRules.productSpecific.hasOwnProperty(productId)) {
        // Mặc định cho lợi nhuận riêng là 0% khi mới thêm
        profitRules.productSpecific[productId] = 0;
        renderProductSpecificProfits();
        renderProductsTable(); // Cập nhật bảng chính
        console.log(
          `Đã thêm sản phẩm ID ${productId} vào quy tắc lợi nhuận riêng.`
        );
      } else {
        console.log(
          `Sản phẩm ID ${productId} đã tồn tại trong quy tắc lợi nhuận riêng.`
        );
      }

      // Cuộn tới mục vừa được thêm
      setTimeout(() => {
        const newElement = document.querySelector(
          `.filter-selection[data-product-id="${productId}"]`
        );
        newElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }

    // btn xóa
    // THAY THẾ HÀM CŨ
    function setupProductSpecificEventListeners() {
      const deleteButtons = document.querySelectorAll(
        ".with-product-delete-img"
      );
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const target = e.target.closest("[data-product-id]") || e.target;
          const productId = e.target.dataset.productId;
          if (
            productId &&
            profitRules.productSpecific.hasOwnProperty(productId)
          ) {
            if (!confirm("Xác nhận xóa lợi nhuận riêng cho sản phẩm này?"))
              return;
            delete profitRules.productSpecific[productId];
            saveProfitRules(profitRules); // <--- SỬA 6: PHẢI TRUYỀN 'profitRules'
            renderProductSpecificProfits();
            renderProductsTable(); // Cập nhật bảng chính
            console.log(`xáo lợi nhuận riêng cho sản phẩm ID ${productId}`);
          }
        });
      });

      const profitInputs = document.querySelectorAll(
        ".product-specific-profit-input"
      );
      profitInputs.forEach((input) => {
        input.addEventListener("change", (e) => {
          const productId = e.target.dataset.productId;
          const inputValue = e.target.value.replace("%", "").trim();
          const newProfit = parseInt(inputValue, 10);

          if (!isNaN(newProfit) && newProfit >= 0 && productId) {
            profitRules.productSpecific[productId] = newProfit;
            e.target.value = `${newProfit}%`;
            renderProductsTable(); // Cập nhật bảng chính
            saveProfitRules(profitRules); // <--- SỬA 7: PHẢI TRUYỀN 'profitRules'
            console.log(
              `Cập nhật lợi nhuận riêng cho sản phẩm ID ${productId}: ${newProfit}%`
            );
          }
        });
        //Thêm sự kiện blur để định dạng lại giá trị hiển thị
        input.addEventListener("blur", (e) => {
          const inputValue = e.target.value.replace("%", "").trim();
          const newProfit = parseInt(inputValue, 10);
          if (!isNaN(newProfit) && newProfit >= 0) {
            e.target.value = `${newProfit}%`;
          }
        });
      });
    }

    function removeVietnameseTones(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    }

    // lọc sản phẩm theo từ khóa
    function getFilteredProducts() {
      const source = Array.isArray(allProducts) ? allProducts : [];
      if (!searchKeyword.trim()) return source;
      const keyword = removeVietnameseTones(searchKeyword.trim().toLowerCase());

      return source.filter((product) => {
        const nameMatch = removeVietnameseTones(
          product.name?.toLowerCase() || ""
        ).includes(keyword);
        const genderMatch = removeVietnameseTones(
          product.gender?.toLowerCase() || ""
        ).includes(keyword);
        return nameMatch || genderMatch;
      });
    }
    //thiết lập tìm kiếm
    function setupSearchFeature() {
      const searchInput = document.getElementById("productSearchInput");
      if (!searchInput) return;

      searchInput.addEventListener("input", (e) => {
        searchKeyword = e.target.value;
        currentPage = 1;
        renderProductsTable();
      });
    }

    /**
     * Hiển thị các nút điều khiển phân trang.
     * Hàm này sử dụng document.createElement và logic hiển thị cửa sổ trang
     * (ví dụ: 1 ... 4 5 [6] 7 8 ... 10) để tránh hiển thị quá nhiều nút.
     */
    function renderPaginationControls() {
      const filteredProducts = getFilteredProducts();
      const totalProducts = filteredProducts.length;
      const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

      const existing = document.querySelector(".pagination-container");
      if (existing) existing.remove();

      if (totalPages <= 1) return;

      const viewContent = document.querySelector(".view-content");
      if (!viewContent) return;

      const container = document.createElement("div");
      container.className = "pagination-container";
      viewContent.parentElement.appendChild(container);

      const changePage = (newPage) => {
        if (newPage !== currentPage) {
          currentPage = newPage;
          renderProductsTable();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };

      const createPageButton = (pageNum) => {
        const btn = document.createElement("button");
        btn.textContent = pageNum;
        btn.className = "page-number";
        if (pageNum === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => changePage(pageNum));
        container.appendChild(btn);
      };

      const createEllipsis = () => {
        const span = document.createElement("span");
        span.textContent = "...";
        span.className = "px-1 text-gray-500";
        container.appendChild(span);
      };

      // Prev
      const prev = document.createElement("button");
      prev.className = "page-arrow prev-page";
      prev.innerHTML = '<img src="../icon/prev.png" alt="Prev">';
      prev.disabled = currentPage === 1;
      prev.addEventListener("click", () => changePage(currentPage - 1));
      container.appendChild(prev);

      // Window logic
      const maxButtons = 5;
      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxButtons) {
        startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        endPage = startPage + maxButtons - 1;
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = totalPages - maxButtons + 1;
        }
      }

      if (startPage > 1) {
        createPageButton(1);
        if (startPage > 2) createEllipsis();
      }

      for (let i = startPage; i <= endPage; i++) createPageButton(i);

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) createEllipsis();
        createPageButton(totalPages);
      }

      // Next
      const next = document.createElement("button");
      next.className = "page-arrow next-page";
      next.innerHTML = '<img src="../icon/next.png" alt="Next">';
      next.disabled = currentPage === totalPages;
      next.addEventListener("click", () => changePage(currentPage + 1));
      container.appendChild(next);
    }

    //render bảng data
    /**
     * Lấy tên của Category chính từ sản phẩm
     */

    function getMainCategoryName(product) {
      if (!product.category || product.category.length === 0) {
        // LỖI CỦA BẠN NẰM Ở ĐÂY:
        // Nếu không có category, nó lấy product.gender, có thể là "Men"
        return product.gender || "N/A";
      }

      // 1. Ưu tiên tìm category CHÍNH (manageable: false)
      for (const catId of product.category) {
        const category = categoriesMap.get(catId);

        // Kiểm tra xem category có tồn tại VÀ nó là category CHÍNH không
        if (category && category.manageable === false) {
          return category.name; // Sẽ trả về "UniSex", "Men's", hoặc "Women's"
        }
      }

      // 2. Nếu không tìm thấy loại chính (ví dụ: sản phẩm chỉ có loại phụ)
      // thì trả về tên của loại phụ ĐẦU TIÊN
      for (const catId of product.category) {
        const category = categoriesMap.get(catId);
        if (category) {
          return category.name; // Trả về tên loại phụ, ví dụ "christmas"
        }
      }

      return "N/A"; // Không tìm thấy gì
    }

    //render bảng data
    function renderProductsTable() {
      const tableBody = document.querySelector(".view-content tbody");
      if (!tableBody) return;

      const filteredProducts = getFilteredProducts();
      const totalProducts = filteredProducts.length;
      const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

      if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
      if (currentPage < 1) currentPage = 1;

      const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = startIndex + PRODUCTS_PER_PAGE;
      const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

      //Không tìm thấy sản phẩm
      if (productsToDisplay.length === 0) {
        tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="no-results">
            🕵️‍♂️ Không tìm thấy sản phẩm nào phù hợp với từ khóa "<b>${searchKeyword}</b>"
          </td>
        </tr>
      `;
        document.querySelector(".pagination-container")?.remove();
        return;
      }

      let htmlRows = "";
      productsToDisplay.forEach((product) => {
        const priceInfo = calculatePrice(product);
        product.price = priceInfo.sellingPrice;

        htmlRows += `
        <tr class="product-row" data-product-id="${product.id}">
          <td>${product.name}</td>
          <td>${getMainCategoryName(product)}</td> <td>${ConvertINTtoVND(
          priceInfo.costPrice
        )}</td>
          <td class="profit-input-cell">
            <span class="profit-tag">${priceInfo.profitPercentage}% ${
          priceInfo.source
        }</span>
          </td>
          <td class="final-price">${ConvertINTtoVND(
            priceInfo.sellingPrice
          )}</td>
        </tr>
      `;
      });

      tableBody.innerHTML = htmlRows;
      renderPaginationControls();
      document.querySelectorAll(".product-row").forEach((row) => {
        row.addEventListener("click", () => {
          const productId = row.dataset.productId;
          if (productId) {
            addProductToSpecificProfit(productId);
          }
        });
      });
    }

    //khi thay đổi % trong ô input
    function handleCategoryProfitChange() {
      const container = document.querySelector(".with-category .scroll-bar");
      if (!container) {
        console.error("Không tìm thấy container '.with-category .scroll-bar'");
        return;
      }
      container.innerHTML = "";

      // Tải categoriesDB để lấy cả ID và NAME
      let activeCategories = [];
      try {
        const rawCategories = localStorage.getItem("categoriesDB");
        if (rawCategories) {
          activeCategories = JSON.parse(rawCategories).filter(
            (cat) => cat.isShown === true && cat.id // <--- SỬA: Lọc theo cat.id
          );
        }
      } catch (e) {
        console.error(
          "Lỗi đọc 'categoriesDB' trong handleCategoryProfitChange",
          e
        );
      }

      if (activeCategories.length === 0) {
        container.innerHTML =
          "<div style='padding: 10px; color: #555;'>Không có loại sản phẩm nào đang hoạt động. Vui lòng kiểm tra trang Category.</div>";
        return; // Dừng lại nếu không có category
      }

      // Dùng activeCategories
      activeCategories.forEach((category) => {
        const displayName = category.name; // ví dụ: "Men's"
        const categoryId = category.id; // ví dụ: 1

        // Lấy profitValue bằng ID
        const profitValue = profitRules.category[categoryId] || 0;

        // Tạo phần tử mới
        const selectionDiv = document.createElement("div");
        selectionDiv.className = "filter-selection";
        selectionDiv.innerHTML = `
            <div>${displayName}</div> 
            <div class="profit-container">
                <input type="text" class="profit" value="${profitValue}%" data-category-id="${categoryId}"> 
            </div>
        `; // <--- SỬA: Dùng data-category-id
        container.appendChild(selectionDiv);

        // Gắn sự kiện ngay lập tức
        const profitInput = selectionDiv.querySelector(".profit");
        profitInput.addEventListener("change", (event) => {
          const inputValue = event.target.value.replace("%", "").trim();
          const newProfit = parseInt(inputValue, 10);

          // Lấy 'id' từ data-attribute
          const catId = event.target.dataset.categoryId; // <--- SỬA: Dùng categoryId

          if (!isNaN(newProfit) && newProfit >= 0 && catId) {
            profitRules.category[catId] = newProfit; // Cập nhật bằng 'id'
            event.target.value = `${newProfit}%`;
            renderProductsTable();
            saveProfitRules(profitRules);
            saveAllProducts();
            console.log(
              `Cập nhật lợi nhuận cho (ID: ${catId}): ${newProfit}%` // <--- SỬA: Log bằng ID
            );
            const saveBtn = document.querySelector(".filter-save-btn");
            if (saveBtn) {
              saveBtn.dataset.originalText =
                saveBtn.dataset.originalText || saveBtn.textContent;

              if (saveBtn._restoreTimeoutId)
                clearTimeout(saveBtn._restoreTimeoutId);

              saveBtn.textContent = "Đã Lưu!";

              saveBtn._restoreTimeoutId = setTimeout(() => {
                const current = document.querySelector(".filter-save-btn");
                if (current) {
                  current.textContent = current.dataset.originalText || "Lưu";
                  delete current._restoreTimeoutId;
                }
              }, 1500);
            }
          }
        });

        //Thêm sự kiện blur để định dạng lại giá trị hiển thị
        profitInput.addEventListener("blur", (e) => {
          const inputValue = e.target.value.replace("%", "").trim();
          const newProfit = parseInt(inputValue, 10);
          const catId = e.target.dataset.categoryId; //  Lấy 'id'

          if (!isNaN(newProfit) && newProfit >= 0) {
            e.target.value = `${newProfit}%`;
          } else {
            // Nếu nhập bậy, trả về giá trị cũ
            e.target.value = `${profitRules.category[catId] || 0}%`; // Lấy bằng 'id'
          }
        });
      });
    }

    // let productSpecificScrollList = null;

    //hàm run chính
    //hàm run chính
    async function startApplication() {
      console.log("Khởi động ứng dụng AdminPrice: Bắt đầu tải dữ liệu...");

      // Tải categories TRƯỚC
      loadAndMapCategories();

      // Gán giá trị cho các biến DOM
      productSpecificContainer = document.querySelector(".with-product");

      if (!productSpecificContainer) {
        console.log("Đây không phải trang AdminPrice. Bỏ qua logic DOM.");
      } else {
        productSpecificList = productSpecificContainer.querySelector(
          ".scroll-bar" // Đảm bảo bạn đã có scroll-bar như yêu cầu trước
        );
        if (!productSpecificList) {
          // Logic tạo scroll-bar động (nếu bạn dùng cách 2)
          productSpecificList = document.createElement("div");
          productSpecificList.className = "scroll-bar";
          const addButton =
            productSpecificContainer.querySelector(".filter-add-btn");
          if (addButton) {
            productSpecificContainer.insertBefore(
              productSpecificList,
              addButton.parentElement
            );
          } else {
            productSpecificContainer.appendChild(productSpecificList);
          }
        }

        // Gọi các hàm khởi tạo DOM
        handleCategoryProfitChange();
        renderProductSpecificProfits();
        setupSearchFeature();
      }

      // (Bỏ các lần gọi hàm dư thừa nếu có)
      // handleCategoryProfitChange();
      // setupSearchFeature();

      //Hiển thị bảng lần đầu
      renderProductsTable();

      document
        .querySelector(".filter-add-btn")
        ?.addEventListener("click", () => {
          localStorage.setItem("allProduct", JSON.stringify(allProducts));
          let allProductss = localStorage.getItem("allProduct");
          console.log(JSON.parse(allProductss));
        });

      // (Đã gọi renderProductsTable() ở trên rồi, bỏ dòng này)
      // renderProductsTable();
      console.log("Dữ liệu sản phẩm đã sẵn sàng:", allProducts);

      localStorage.setItem("allProduct", JSON.stringify(allProducts));

      let allProductss = localStorage.getItem("allProduct");

      console.log(JSON.parse(allProductss));
    }

    // Bắt đầu quá trình tải dữ liệu
    startApplication();
  },
};
//hàm load
// async function loadDataFromJson(filePath, targetArray) {
//   console.log(`Bắt đầu tải dữ liệu từ: ${filePath}`);
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) {
//       throw new Error(`Lỗi HTTP: ${response.status} - Không thể tải tệp.`);
//     }

//     const data = await response.json();
//     targetArray.push(...data);

//     console.log(
//       `Tải dữ liệu hoàn tất. Số lượng mục đã tải: ${targetArray.length}`
//     );
//   } catch (error) {
//     console.error("Lỗi khi tải hoặc xử lý JSON:", error);
//   }
// }
//   const JSON_FILE_PATH = "../data/product.json";

//   await loadDataFromJson(JSON_FILE_PATH, allProducts);
