let allProducts;
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
                  <div>Trẻ em</div>
                  <div class="profit-container">
                    <input type="text" class="profit" value="0%""></div>
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
    const RULES_KEY = "priceProfitRules";
    function loadProfitRules() {
      try {
        const raw = localStorage.getItem(RULES_KEY);
        if (!raw) {
          // đầu tiên lợi nhuận là 0
          return {
            defaultCategoryProfit: 0,
            category: { Men: 0, Women: 0, Kids: 0 },
            productSpecific: {},
          };
        }
        const parsed = JSON.parse(raw);

        return {
          defaultCategoryProfit:
            typeof parsed.defaultCategoryProfit === "number"
              ? parsed.defaultCategoryProfit
              : 0,
          category: Object.assign(
            { Men: 0, Women: 0, Kids: 0 },
            parsed.category || {}
          ),
          productSpecific: parsed.productSpecific || {},
        };
      } catch (e) {
        console.warn("kh load đc quy tắc lợi nhuận", e);
        return {
          defaultCategoryProfit: 0,
          category: { Men: 0, Women: 0, Kids: 0 },
          productSpecific: {},
        };
      }
    }
    function saveProfitRules() {
      try {
        localStorage.setItem(RULES_KEY, JSON.stringify(profitRules));
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
    function calculatePrice(product) {
      // Giá vốn (costPrice) luôn lấy từ thuộc tính 'cost' để tránh cộng dồn lợi nhuận.
      // Nếu 'cost' không tồn tại, mặc định là 0. (Đã sửa đổi để chỉ dùng 'cost')
      const costPrice = product.cost || 0;
      let profitPercentage = profitRules.defaultCategoryProfit;
      let source = "Mặc định";

      // Kiểm tra quy tắc riêng theo sản phẩm
      if (profitRules.productSpecific[product.id]) {
        profitPercentage = profitRules.productSpecific[product.id];
        source = "Theo sản phẩm";
      }
      // Kiểm tra quy tắc theo loại sản phẩm (Gender)
      else if (profitRules.category[product.gender]) {
        profitPercentage = profitRules.category[product.gender];
        source = `Theo loại sản phẩm (${product.gender})`;
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
    function renderProductSpecificProfits() {
      if (!productSpecificList) return;

      // Xóa tất cả các mục cũ trước khi render lại (trừ tiêu đề và nút Thêm)
      const existingSelections =
        productSpecificList.querySelectorAll(".filter-selection");
      existingSelections.forEach((selection) => selection.remove());

      const productSpecificKeys = Object.keys(profitRules.productSpecific);

      if (productSpecificKeys.length === 0) {
        // Không có sản phẩm nào có lợi nhuận riêng
        // Có thể thêm một dòng thông báo tại đây nếu muốn
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

        // Chèn mục mới vào trước nút "Thêm lợi nhuận riêng"
        const addButton =
          productSpecificContainer.querySelector(".filter-add-btn");
        if (addButton) {
          productSpecificList.insertBefore(
            newSelection,
            addButton.parentElement
          );
        } else {
          // Trường hợp không tìm thấy nút Thêm
          productSpecificList.appendChild(newSelection);
        }
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
            saveProfitRules();
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
            saveProfitRules();
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
          <td>${product.gender}</td>
          <td>${ConvertINTtoVND(priceInfo.costPrice)}</td>
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
      // Ánh xạ tên hiển thị tiếng Việt sang khóa dữ liệu tiếng Anh
      const categoryMap = {
        Nam: "men",
        Nữ: "Women",
        "Trẻ em": "Kids",
      };

      const filterSelections = document.querySelectorAll(
        ".with-category .filter-selection"
      );

      filterSelections.forEach((selection) => {
        const categoryDiv = selection.querySelector("div:first-child");
        const profitInput = selection.querySelector(".profit");

        if (categoryDiv && profitInput) {
          const displayName = categoryDiv.textContent.trim();
          const categoryName = categoryMap[displayName]; // Khóa tiếng Anh

          // Nếu không tìm thấy khóa ánh xạ, bỏ qua.
          if (!categoryName) return;

          // Khởi tạo giá trị ban đầu từ profitRules (sử dụng khóa tiếng Anh)
          if (profitRules.category[categoryName]) {
            profitInput.value = `${profitRules.category[categoryName]}%`;
          } else {
            // Thiết lập giá trị mặc định nếu rule chưa được định nghĩa
            profitInput.value = `${profitRules.defaultCategoryProfit}%`;
          }

          // Gắn sự kiện thay đổi
          //Gắn sự kiện thay đổi (sử dụng 'blur' hoặc 'change' thay vì 'input')
          profitInput.addEventListener("change", (event) => {
            const inputValue = event.target.value.replace("%", "").trim();
            const newProfit = parseInt(inputValue, 10);

            // Cập nhật Rule và Re-render
            if (!isNaN(newProfit) && newProfit >= 0) {
              profitRules.category[categoryName] = newProfit;
              event.target.value = `${newProfit}%`;
              renderProductsTable();
              saveProfitRules();
              console.log(
                `Cập nhật lợi nhuận cho ${displayName} (${categoryName}): ${newProfit}%`
              );
            }
          });
        }
      });

      // Sự kiện cho nút LƯU
      document
        .querySelector(".filter-save-btn")
        ?.addEventListener("click", () => {
          // Hiển thị thuộc tính 'price' đã được cập nhật
          renderProductsTable();
          localStorage.setItem("allProduct", JSON.stringify(allProducts));

          let allProductss = localStorage.getItem("allProduct");

          console.log(JSON.parse(allProductss));
          console.log("Quy tắc lợi nhuận đã được lưu:", profitRules.category);
          console.log(
            "Dữ liệu sản phẩm với giá bán cập nhật:",
            allProducts.map((p) => ({
              id: p.id,
              name: p.name,
              cost: p.cost,
              price: p.price, // Giá bán mới nhất
            }))
          );

          //
          // Thay thế alert() bằng một thông báo trên giao diện
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
        });
    }

    //hàm run chính
    async function startApplication() {
      console.log("Khởi động ứng dụng AdminPrice: Bắt đầu tải dữ liệu...");

      // 1. Gán giá trị cho các biến DOM ở đây
      productSpecificContainer = document.querySelector(".with-product");
      // Kiểm tra nếu phần tử tồn tại (chỉ tồn tại trên adminPrice.html)
      if (!productSpecificContainer) {
        console.log("Đây không phải trang AdminPrice. Bỏ qua logic DOM.");
        // Vẫn tiếp tục load dữ liệu nếu cần, nhưng bỏ qua DOM cụ thể của trang này.
      } else {
        productSpecificList =
          productSpecificContainer.querySelector(
            ".filter-selection"
          )?.parentElement;
        if (!productSpecificList) {
          console.error("Không tìm thấy Container 'Theo sản phẩm' con.");
        }

        // 2. Gọi các hàm khởi tạo DOM chỉ khi các phần tử tồn tại
        handleCategoryProfitChange();
        renderProductSpecificProfits();
        setupSearchFeature();
      }
      //

      //
      handleCategoryProfitChange();

      setupSearchFeature();

      //Hiển thị bảng lần đầu
      renderProductsTable();

      document
        .querySelector(".filter-add-btn")
        ?.addEventListener("click", () => {
          localStorage.setItem("allProduct", JSON.stringify(allProducts));

          let allProductss = localStorage.getItem("allProduct");

          console.log(JSON.parse(allProductss));
        });
      renderProductsTable();
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
