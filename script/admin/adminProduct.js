/*
 * ======================================================================================
 * MODULE: AdminProduct
 * ======================================================================================
 */
export const AdminProduct = {

  html: `
    <div class="main-content">
      <div class="header">
        <div class="left-header"><p>Product</p></div>
        <div class="right-header">
          <div class="admin-account">
            <button class="admin-account-btn">
              <img src="../img/goku.jpg" alt="" class="admin-avatar" />
              <p style="color: black">Trần Chính Thành</p>
            </button>
          </div>
        </div>
      </div>

      <div class="product-table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Inventory</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="productTableBody">
            </tbody>
        </table>
      </div>

      <div class="product-footer">
        <button class="add-btn" id="addProductBtn">
          <img src="../icon/add.png" alt="" style="width: 20px" />
          <span>Thêm sản phẩm mới</span>
        </button>
        <div class="pagination-container" id="paginationContainer">
          </div>
      </div>
    </div>

    <div id="modalsContainer"></div>
  `,
  css: "../css/adminProduct.css",
  canDeleteCss: true,

  /**
   * Chứa HTML cho tất cả các cửa sổ pop-up (modal)
   */
  modals: {
    // Modal 1: Form Thêm/Sửa sản phẩm
    // (Tôi đã gộp 'productForm' và 'editForm' trong code gốc của bạn
    // vì chúng rất giống nhau, nhưng tôi sẽ giữ nguyên cấu trúc file của bạn)

    // Modal: Form thêm sản phẩm
    productForm: `
      <div class="popup-bc" id="productFormModal">
        <div class="popup-content">
          <form class="form-content" id="productForm">
            <div class="left-column">
              <div class="image-section">
                <label class="image-label">Hình ảnh sản phẩm</label>
                <div class="image-box" id="imageBox" style="cursor: pointer;">
                  <div class="image-icon">🖼️</div>
                </div>
                <input type="file" id="productImageInput" style="display: none;" accept="image/*" multiple>
                <div id="imagePreview" style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 10px;"></div>
                <a href="#" class="help-text" onclick="event.preventDefault(); document.getElementById('productImageInput').click();">Tải ảnh lên hoặc kéo và thả</a>
              </div>
              <div class="form-group">
                <label>Size ${ChuThich(
                  "Thêm Dấu gạch (-) với 2 size trở lên"
                )}</label>
                <input type="text" id="productSize" placeholder="38-39-40">
              </div>
              <div class="form-group">
                <label>Màu sắc ${ChuThich(
                  "Thêm Dấu gạch (-) với 2 color trở lên"
                )}</label>
                <input type="text" id="productColor" placeholder="black-white">
              </div>
            </div>

            <div class="right-column">
              <div class="form-group">
                <label>Mã sản phẩm</label>
                <input type="text" id="ProductCode" placeholder="Vd: s1" >
              </div>
              <div class="form-group">
                <label>Tên sản phẩm</label>
                <input type="text" id="productName" placeholder="Tên sản phẩm">
              </div>
              <div class="form-group">
                <label>Số lượng tồn kho</label>
                <input type="number" id="productInventory" placeholder="0" readonly>
              </div>
              
              <div class="form-group">
                <label>Loại chính (bắt buộc)</label>
                <div id="productCategoryContainer" style="display:flex; gap:12px; align-items:center;">
                  <label><input type="radio" name="productMainType" value="Men's"> Men's</label>
                  <label><input type="radio" name="productMainType" value="Women's"> Women's</label>
                  <label><input type="radio" name="productMainType" value="Unisex"> Unisex</label>
                </div>
              </div>
              <div class="form-group">
                <label>Các loại phụ (tùy chọn)</label>
                <div id="categoryCheckboxes" class="grid-category">
                  </div>
              </div>
              
              <div class="form-group">
                <label>Mô tả</label>
                <textarea id="productDesc" placeholder=""></textarea>
              </div>
            </div>

            <div class="form-buttons">
              <button type="reset" class="btn-cancel" id="cancelProductBtn">Hủy</button>
              <button type="submit" class="btn-submit">Xác nhận thêm</button>
            </div>
          </form>
        </div>
      </div>
    `,

    // Modal: Form sửa sản phẩm
    editForm: `
      <div class="popup-bc-edit" id="editProductFormModal">
        <div class="popup-content-edit">
          <div class="edit-header">
            <div class="edit-icon-circle">🔧</div>
            <h2 class="edit-title">Sửa loại sản phẩm</h2>
          </div>
          <form class="edit-form-content" id="editProductForm">
            <div class="left-column">
              <div class="edit-images-section">
                <label class="image-label">Hình ảnh sản phẩm</label>
                <div id="editImageGallery" class="image-gallery">
                  </div>
                <input type="file" id="editProductImageInput" style="display: none;" accept="image/*" multiple>
                <button type="button" class="btn" onclick="document.getElementById('editProductImageInput').click()" style="margin-top: 10px;">
                  Thêm ảnh
                </button>
              </div>
              <div class="edit-form-group">
                <label>Size</label>
                <input type="text" id="editProductSize" value="">
              </div>
              <div class="edit-form-group">
                <label>Màu sắc</label>
                <input type="text" id="editProductColor" value="">
              </div>
              <div class="edit-form-group">
                <label>Giới tính</label>
                <input type="text" id="editProductGender"> 
              </div>
            </div>
            
            <div class="right-column">
              <div class="edit-form-group">
                <label>Mã sản phẩm</label>
                <input type="text" id="editProductCode" value="" readonly>
              </div>
              <div class="edit-form-group">
                <label>Tên sản phẩm</label>
                <input type="text" id="editProductName" value="">
              </div>
              
              <div class="edit-form-group">
                <label>Loại chính (bắt buộc)</label>
                <div id="editProductCategoryContainer" style="display:flex; gap:12px; align-items:center;">
                  <label><input type="radio" name="editProductMainType" value="Men's"> Men's</label>
                  <label><input type="radio" name="editProductMainType" value="Women's"> Women's</label>
                  <label><input type="radio" name="editProductMainType" value="Unisex"> Unisex</label>
                </div>
              </div>
              <div class="edit-form-group">
                <label>Các loại phụ (tùy chọn)</label>
                <div id="editCategoryCheckboxes" class="edit-grid-category">
                  </div>
              </div>
              
              <div class="edit-form-group">
                <label>Mô tả</label>
                <textarea id="editProductDesc"></textarea>
              </div>
              <div class="edit-form-group">
                <label>Số lượng tồn kho</label>
                <input type="number" id="editProductInventory" value="0">
              </div>
            </div>
            
            <div class="edit-form-buttons">
              <button type="reset" class="btn-cancel-edit" id="cancelEditBtn">Hủy</button>
              <button type="submit" class="btn-confirm-edit">Xác nhận sửa</button>
            </div>
          </form>
        </div>
      </div>
    `,

    // Modal: Xác nhận xóa
    deleteModal: `
      <div class="delete-modal" id="deleteModal">
        <div class="delete-modal-content">
          <div class="container-2">
            <img class="delete-icon-container" src="../icon/Delete.png" alt="Delete Icon">
            <h2 class="delete-title">Xóa sản phẩm</h2>
            <div class="delete-product-info">
              <img src="" alt="Product" class="product-delete-img" id="deleteProductImg">
              <div class="product-delete-info-text">
                <div class="product-delete-name" id="deleteProductName"></div>
                <div class="product-delete-id" id="deleteProductId"></div>
              </div>
            </div>
          </div>
          <p class="delete-message">
            Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?
          </p>
          <div class="delete-modal-buttons">
            <button class="btn-cancel-delete" id="cancelDeleteBtn">Hủy</button>
            <button class="btn-delete-confirm" id="confirmDeleteBtn">Xác nhận Xóa</button>
          </div>
        </div>
      </div>
    `,

    // Modal: Lịch sử kho
    inventoryModal: `
      <div class="inventory-modal" id="inventoryModal">
        <div class="inventory-modal-content">
          <div class="inventory-header">
            <img class="inventory-icon-circle" src="../icon/Time Machine.png">
            <div class="inventory-header-text">
              <h2 id="productNameInventory">Lịch sử Kho</h2>
              <p id="productDescInventory">Nhập - Xuất - Tồn</Tồn</p>
            </div>
          </div>
          <div class="inventory-filters">
            <div class="filter-group">
              <label>Từ ngày</label>
              <input type="date" id="filterStartDate" placeholder="dd/mm/yyyy">
            </div>
            <div class="filter-group">
              <label>Đến ngày</label>
              <input type="date" id="filterEndDate" placeholder="dd/mm/yyyy">
            </div>
            <button class="filter-btn" id="filterInventoryBtn">Lọc</button>
          </div>
          <div class="inventory-stats">
            <div class="stat-box inbound"><div class="stat-label">Tổng nhập</div><p class="stat-value" id="totalInbound">+0</p></div>
            <div class="stat-box outbound"><div class="stat-label">Tổng xuất</div><p class="stat-value" id="totalOutbound">-0</p></div>
            <div class="stat-box total"><div class="stat-label">Tồn cuối</div><p class="stat-value" id="totalStock">0</p></div>
          </div>
          <div class="inventory-table-container">
            <table class="inventory-table" id="inventory-history-modal">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Loại giao dịch</th>
                  <th>Mã tham chiếu</th>
                  <th>Thay đổi</th>
                  <th>Tồn cuối</th>
                </tr>
              </thead>
              <tbody id="inventoryTableBody">
                </tbody>
            </table>
          </div>
          <div class="inventory-buttons">
            <button class="btn-cancel-inventory" id="cancelInventoryBtn">Đóng</button>
            <button class="btn-add-inventory" id="confirmInventoryBtn" style="display: none;">Xác nhận thêm</button>
          </div>
        </div>
      </div>
    `,
  },

  // ------------------------------------------------------------------------------------
  // § 2. TRẠNG THÁI (STATE) VÀ DỮ LIỆU CỦA MODULE
  // ------------------------------------------------------------------------------------

  /** @type {number} Trang hiện tại cho phân trang */
  currentPage: 1,

  /** @type {number} Số lượng sản phẩm trên mỗi trang */
  productsPerPage: 5,

  /** @type {Array<Object>} Danh sách TẤT CẢ sản phẩm (từ allProduct) */
  allProducts: [],

  /** @type {Array<Object>} Danh sách TẤT CẢ categories (từ categoriesDB) */
  categories: [],

  /** @type {string|null} ID của sản phẩm đang được xóa */
  currentDeleteProductId: null,

  /** @type {string|null} ID của sản phẩm đang được sửa */
  currentEditProductId: null,

  /** @type {Array<string>} Mảng chứa các ảnh (dạng base64) cho form Thêm/Sửa */
  currentProductImages: [],

  /** @type {string} Key của localStorage cho lịch sử kho */
  INVENTORY_HISTORY_KEY: "inventoryHistory",

  /** @type {string} Key của localStorage cho danh sách sản phẩm */
  ALL_PRODUCT_KEY: "allProduct",

  /** @type {string} Key của localStorage cho danh mục */
  CATEGORIES_DB_KEY: "categoriesDB",

  /** @type {string} Key của localStorage cho luật giá */
  PRICE_RULES_KEY: "priceProfitRules",

  // ------------------------------------------------------------------------------------
  // § 3. PHƯƠNG THỨC KHỞI TẠO (INITIALIZATION)
  // ------------------------------------------------------------------------------------

  /**
   * Hàm khởi tạo chính của module.
   * Được gọi bởi router khi trang này được tải.
   */
  init: function () {
    console.log("AdminProduct.init() đang chạy...");

    // 1. Tải dữ liệu từ LocalStorage vào trạng thái (state) của module
    this.loadProducts();
    this.loadCategory();

    // 2. Chèn HTML của các modal vào DOM
    const modalsContainer = document.getElementById("modalsContainer");
    if (modalsContainer) {
      modalsContainer.innerHTML =
        this.modals.productForm +
        this.modals.editForm +
        this.modals.deleteModal +
        this.modals.inventoryModal;
    } else {
      console.error("Không tìm thấy #modalsContainer");
    }

    // 3. Điền dữ liệu cho các controls (ví dụ: checkboxes)
    // Phải chạy sau khi chèn modal
    this.populateCategoryControls();

    // 4. Render bảng và phân trang ban đầu
    this.renderProductTable();
    this.renderPagination();

    // 5. Gán tất cả các trình nghe sự kiện (event listeners)
    this.attachEventListeners();
  },

  /**
   * Gán tất cả các trình nghe sự kiện cho module này.
   * Giúp giữ cho hàm init() sạch sẽ.
   */
  attachEventListeners: function () {
    // ---- Form Thêm Sản Phẩm (Add Product) ----
    document
      .getElementById("addProductBtn")
      .addEventListener("click", this.openProductForm.bind(this));
    document
      .getElementById("cancelProductBtn")
      .addEventListener("click", this.closeProductForm.bind(this));
    document
      .getElementById("productFormModal")
      .addEventListener("click", (e) => {
        if (e.target.id === "productFormModal") this.closeProductForm();
      });
    document
      .getElementById("productForm")
      .addEventListener("submit", this.handleProductSubmit.bind(this));
    document
      .getElementById("productImageInput")
      .addEventListener("change", (e) => this.handleImageUpload(e, "imagePreview"));
    document
      .getElementById("imageBox")
      .addEventListener("click", () =>
        document.getElementById("productImageInput").click()
      );

    // ---- Form Sửa Sản Phẩm (Edit Product) ----
    document
      .getElementById("cancelEditBtn")
      .addEventListener("click", this.closeEditProductForm.bind(this));
    document
      .getElementById("editProductFormModal")
      .addEventListener("click", (e) => {
        if (e.target.id === "editProductFormModal") this.closeEditProductForm();
      });
    document
      .getElementById("editProductForm")
      .addEventListener("submit", this.handleEditFormSubmit.bind(this));
    document
      .getElementById("editProductImageInput")
      .addEventListener("change", this.handleEditImageUpload.bind(this));
    // Listener cho việc xóa ảnh trong gallery (Sửa)
    document
      .getElementById("editImageGallery")
      .addEventListener("click", this.handleImageDelete.bind(this));

    // ---- Modal Xóa (Delete Modal) ----
    document
      .getElementById("cancelDeleteBtn")
      .addEventListener("click", this.closeDeleteModal.bind(this));
    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", this.confirmDelete.bind(this));
    document
      .getElementById("deleteModal")
      .addEventListener("click", (e) => {
        if (e.target.id === "deleteModal") this.closeDeleteModal();
      });

    // ---- Modal Kho (Inventory Modal) ----
    document
      .getElementById("cancelInventoryBtn")
      .addEventListener("click", this.closeInventoryModal.bind(this));
    document
      .getElementById("filterInventoryBtn")
      .addEventListener("click", this.filterInventoryData.bind(this));
    document
      .getElementById("inventoryModal")
      .addEventListener("click", (e) => {
        if (e.target.id === "inventoryModal") this.closeInventoryModal();
      });

    // ---- Trình nghe sự kiện chính cho bảng (Event Delegation) ----
    document
      .getElementById("productTableBody")
      .addEventListener("click", this.handleTableClick.bind(this));

    // ---- Nút Escape (Đóng tất cả) ----
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllModals();
    });
  },

  // ------------------------------------------------------------------------------------
  // § 4. PHƯƠNG THỨC TẢI VÀ LƯU DỮ LIỆU (DATA & LOCALSTORAGE)
  // ------------------------------------------------------------------------------------

  /** Tải danh sách sản phẩm từ LocalStorage */
  loadProducts: function () {
    const stored = localStorage.getItem(this.ALL_PRODUCT_KEY);
    this.allProducts = stored ? JSON.parse(stored) : [];
  },

  /** Lưu danh sách sản phẩm vào LocalStorage */
  saveProducts: function () {
    localStorage.setItem(this.ALL_PRODUCT_KEY, JSON.stringify(this.allProducts));
  },

  /** Tải danh mục từ LocalStorage */
  loadCategory: function () {
    const stored = localStorage.getItem(this.CATEGORIES_DB_KEY);
    this.categories = stored ? JSON.parse(stored) : [];
  },

  /**
   * Tải và xử lý dữ liệu từ 'productImport'.
   * Đây là hàm quan trọng: nó "làm phẳng" (flatten) và "tổng hợp" (aggregate)
   * tất cả các 'items' từ các phiếu nhập đã hoàn thành,
   * đồng thời kiểm tra xem chúng đã được dùng để tạo sản phẩm chưa.
   */


  /** Tải danh mục từ LocalStorage */
  loadCategoriesDB: function () {
    try {
      const raw = localStorage.getItem(this.CATEGORIES_DB_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const categories = (Array.isArray(parsed) ? parsed : [])
        .map((c) =>
          typeof c === "object" && c !== null
            ? {
                name: String(c.name || "").trim(),
                isShown: c.hasOwnProperty("isShown") ? !!c.isShown : true,
              }
            : { name: String(c).trim(), isShown: true }
        )
        .filter((c) => c.name);
      return categories;
    } catch (e) {
      console.error("Failed to load categoriesDB", e);
      return [];
    }
  },

  /** Lấy lịch sử kho cho một sản phẩm cụ thể */
  getInventoryHistory: function (productId) {
    let history = [];
    try {
      const raw = localStorage.getItem(this.INVENTORY_HISTORY_KEY);
      if (raw) {
        history = JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to parse inventoryHistory", e);
      return [];
    }
    // Lọc theo productId và sắp xếp mới nhất lên đầu
    return history
      .filter((t) => t.productId === productId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },


  /**
   * Lấy các quy tắc lợi nhuận từ LocalStorage.
   * @returns {Object} Đối tượng chứa các quy tắc.
   */
  getProfitRules: function () {
    const raw = localStorage.getItem(this.PRICE_RULES_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          defaultCategoryProfit: 0,
          category: { Men: 0, Women: 0, Kids: 0 },
          productSpecific: {},
        };
  },

  // ------------------------------------------------------------------------------------
  // § 5. LOGIC RENDER VÀ ĐIỀN DỮ LIỆU (UI)
  // ------------------------------------------------------------------------------------

  /** Render bảng sản phẩm dựa trên trang hiện tại */
  renderProductTable: function () {
    const products = this.getPaginatedProducts();
    const tbody = document.getElementById("productTableBody");
    if (!tbody) return;

    tbody.innerHTML = products
      .map((product) => {
        const categoryNames = Array.isArray(product.category)
          ? product.category
              .map((id) => {
                const category = this.categories.find((c) => c.id == id);
                // Chỉ trả về tên nếu category tồn tại AND isShown === true
                if (category && category.isShown === true) {
                  return category.name;
                }
                return null; // Trả về null nếu không thỏa điều kiện
              })
              .filter(Boolean) // Lọc bỏ các null
          : [];

        const displayCategories = categoryNames.length > 0 ? categoryNames.join(", ") : "N/A";

        // Cảnh báo tồn kho
        const inventoryWarning = product.inventory <= 5;
        const inventoryStyle = inventoryWarning
          ? 'style="color: red; font-weight: bold;"'
          : "";
        const inventoryText = inventoryWarning ? "(CẢNH BÁO!)" : "";

        return `
         <tr>
           <td><img src="../icon/show.png" alt="" class="show-hide-icon hide-icon-js" /></td>
           <td>${product.id}</td>
           <td>
             <div class="product-container">
               <img src="${
                 product["img-represent"]
               }" alt="" class="product-img" style="max-width: 50px;">
               ${product.name}
             </div>
           </td>
          <td>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span ${inventoryStyle}>
                ${product.inventory} ${inventoryText}
              </span>
            </div>
          </td>
          <td>${displayCategories}</td>
           <td class="action">
             <img src="../icon/Time Machine.png" alt="Lịch sử kho" style="cursor: pointer;"
                  data-action="inventory"
                  data-id="${product.id}"
                  data-name="${product.name}">
             <button class="btn btn-lock"
                  data-action="delete"
                  data-id="${product.id}"
                  data-name="${product.name}"
                  data-img="${product["img-represent"]}">Xóa</button>
             <button class="btn btn-reset"
                  data-action="edit"
                  data-id="${product.id}">Sửa</button>
           </td>
         </tr>
       `;
      })
      .join("");
  },

  /** Render các nút phân trang */
  renderPagination: function () {
    const totalPages = this.getTotalPages();
    const container = document.getElementById("paginationContainer");
    if (!container) return;

    let html = "";

    // Nút Previous
    if (this.currentPage > 1) {
      html += `<button data-page="${
        this.currentPage - 1
      }" style="margin-right: 5px;">←</button>`;
    }

    // Nút số trang
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === this.currentPage ? "active" : "";
      html += `<button data-page="${i}" class="${activeClass}">${i}</button>`;
    }

    // Nút Next
    if (this.currentPage < totalPages) {
      html += `<button data-page="${
        this.currentPage + 1
      }" style="margin-left: 5px;">→</button>`;
    }

    container.innerHTML = html;

    // Gán sự kiện cho các nút phân trang mới
    container.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.goToPage(Number(btn.dataset.page));
      });
    });
  },

  /**
   * Điền các checkboxes cho "Loại phụ" vào cả 2 form Thêm và Sửa.
   * Nó tự động lọc ra các loại chính (Men's, Women's, Unisex).
   */
  populateCategoryControls: function () {
    const categories = this.loadCategoriesDB();
    console.log(categories);
    const mainTypesLower = ["men's", "women's", "unisex"];

    // Lọc ra các loại phụ (không phải loại chính và được hiển thị)
    const optionalItems = categories.filter(
      (c) => !mainTypesLower.includes(c.name.toLowerCase()) && c.isShown
    );

    this._helper_renderCheckboxes(
      "categoryCheckboxes",
      optionalItems,
      "add_cat_"
    );
    this._helper_renderCheckboxes(
      "editCategoryCheckboxes",
      optionalItems,
      "edit_cat_"
    );
  },

  /**
   * (Helper) Render lịch sử kho vào bảng trong modal.
   * @param {Array} history - Mảng lịch sử (đã lọc hoặc toàn bộ).
   */
  renderInventoryHistoryTable: function (history) {
    const tableBody = document.getElementById("inventoryTableBody");
    tableBody.innerHTML = ""; // Xóa data cũ

    let totalInbound = 0;
    let totalOutbound = 0;
    let currentStock = 0;

    // Để tính tồn kho chính xác, phải duyệt từ cũ đến mới
    const reversedHistory = [...history].reverse();

    reversedHistory.forEach((t) => {
      let change = 0;
      let typeText = "N/A";
      let referenceCode = t.referenceId ? t.referenceId : "N/A";

      // Làm ngắn mã tham chiếu
      if (referenceCode.startsWith("order-")) {
        referenceCode = `DH-${referenceCode.slice(-5)}`;
      } else if (referenceCode.startsWith("T-")) {
        referenceCode = `T-${referenceCode.slice(-5)}`;
      }

      if (t.type === "import") {
        change = t.quantity;
        typeText = "Nhập";
        totalInbound += t.quantity;
        currentStock += t.quantity;
      } else if (t.type === "export") {
        change = -t.quantity;
        typeText = "Bán";
        totalOutbound += t.quantity;
        currentStock -= t.quantity;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="transaction-date">${new Date(t.date).toLocaleDateString(
          "vi-VN"
        )}</td>
        <td class="transaction-type">${typeText}</td>
        <td class="transaction-code">${referenceCode}</td>
        <td class="transaction-change ${change > 0 ? "positive" : "negative"}">
          ${change > 0 ? "+" : ""}${change}
        </td>
        <td class="transaction-total">${currentStock}</td>
      `;
      // Chèn lên đầu (prepend) để giao dịch mới nhất hiển thị trên cùng
      tableBody.prepend(tr);
    });

    if (history.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Chưa có lịch sử giao dịch.</td></tr>`;
    }

    // Cập nhật các ô thống kê
    document.getElementById("totalInbound").textContent = `+${totalInbound}`;
    document.getElementById("totalOutbound").textContent = `-${totalOutbound}`;
    document.getElementById("totalStock").textContent = currentStock;
  },

  // ------------------------------------------------------------------------------------
  // § 6. XỬ LÝ SỰ KIỆN (EVENT HANDLERS)
  // ------------------------------------------------------------------------------------

  /**
   * Xử lý tất cả các click trên body của bảng.
   * Đây là phương pháp Event Delegation.
   * @param {Event} e - Sự kiện click.
   */
  handleTableClick: function (e) {
    // Tìm phần tử có 'data-action' (có thể là img, button, hoặc cha của nó)
    const target = e.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;
    const id = target.dataset.id;

    switch (action) {
      case "edit":
        this.openEditProductForm(id);
        break;
      case "delete":
        this.openDeleteModal(
          id,
          target.dataset.name,
          target.dataset.img
        );
        break;
      case "inventory":
        this.openInventoryModal(
          id,
          target.dataset.name,
          "Lịch sử: Nhập - Xuất - Tồn"
        );
        break;
    }
  },


  /** Xử lý submit form Thêm Sản Phẩm */
  handleProductSubmit: async function (e) {
    e.preventDefault();

    try {
      const productID = document.getElementById("ProductCode").value;

      const selectedName = document.getElementById("productName").value;
      const mainTypeInput = document.querySelector(
        'input[name="productMainType"]:checked'
      );
      if (!mainTypeInput) {
        alert("Vui lòng chọn Loại chính (Men's / Women's / Unisex).");
        return;
      }

      if (this.currentProductImages.length === 0) {
        alert("Vui lòng chọn ít nhất 1 hình ảnh sản phẩm.");
        return;
      }
      
      // Lấy giá vốn và tính giá bán
      const unitCost = 0;
      const profitRules = this.getProfitRules();
      const gender = mainTypeInput.value; // Dùng loại chính làm 'gender' để tra cứu
      
      let profitPercentage = profitRules.defaultCategoryProfit;
      
      if (profitRules.category[gender]) {
        profitPercentage = profitRules.category[gender];
      }
      const price = unitCost * (1 + profitPercentage / 100);

      // Lấy category
      const mainType = mainTypeInput.value;
      const optionalCats = Array.from(
        document.querySelectorAll(
          '#categoryCheckboxes input[type="checkbox"]:checked'
        )
      ).map((c) => c.value);
      
      const selectedCats = [mainType, ...optionalCats].filter(Boolean);
      const categoryIDs = this._helper_ConvertCategoryToID(selectedCats);

      // Tạo đối tượng sản phẩm mới
      const newProduct = {
        id: productID,
        name: selectedName,
        category: categoryIDs,
        gender: gender, // Lưu loại chính làm gender
        size: this._helper_ConvertInputToStringArr(
          document.getElementById("productSize").value
        ),
        color: this._helper_ConvertInputToStringArr(
          document.getElementById("productColor").value
        ),
        description: document.getElementById("productDesc").value,
        inventory:
          parseInt(document.getElementById("productInventory").value) || 0,
        "img-represent": this.currentProductImages[0],
        "img-link-list": this.currentProductImages,
        status: "Đang hiển thị",
        cost: unitCost,
        price: price,
        createdAt: new Date().toISOString(),
      }; 

      // Thêm sản phẩm và lưu
      this.allProducts.push(newProduct);
      console.log(newProduct);
      this.saveProducts();


      // Cập nhật UI
      alert("Thêm sản phẩm thành công!");
      this.closeProductForm();
      this.currentPage = 1;

      this.renderProductTable();
      this.renderPagination();

    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      alert("Đã xảy ra lỗi. Vui lòng kiểm tra console.");
    }
  },
  
  /** Xử lý submit form Sửa Sản Phẩm */
  handleEditFormSubmit: function (e) {
    e.preventDefault();

    const idx = this.allProducts.findIndex(
      (p) => p.id === this.currentEditProductId
    );
    if (idx === -1) return;
    
    // Lấy category
    const mainTypeInput = document.querySelector(
      'input[name="editProductMainType"]:checked'
    );
    const mainType = mainTypeInput ? mainTypeInput.value : null;
    
    let optionalCats = Array.from(
      document.querySelectorAll(
        '#editCategoryCheckboxes input[type="checkbox"]:checked'
      )
    ).map((c) => c.value);

    const selectedCats = [mainType, ...optionalCats].filter(Boolean);
    const categoryIDs = this._helper_ConvertCategoryToID(selectedCats);

    // Cập nhật sản phẩm
    this.allProducts[idx] = {
      ...this.allProducts[idx],
      name: document.getElementById("editProductName").value,
      category: categoryIDs,
      gender: document.getElementById("editProductGender").value,
      size: this._helper_ConvertInputToStringArr(
        document.getElementById("editProductSize").value
      ),
      color: this._helper_ConvertInputToStringArr(
        document.getElementById("editProductColor").value
      ),
      description: document.getElementById("editProductDesc").value,
      inventory:
        parseInt(document.getElementById("editProductInventory").value) || 0,
      "img-link-list": this.currentProductImages,
      "img-represent": this.currentProductImages[0] || "", // Đảm bảo có ảnh
    };

    // Lưu và cập nhật UI
    this.saveProducts();
    alert("Cập nhật sản phẩm thành công!");
    this.closeEditProductForm();
    this.renderProductTable(); // Render lại trang hiện tại
    this.renderPagination();
  },


  // ------------------------------------------------------------------------------------
  // § 7. XỬ LÝ HÌNH ẢNH (IMAGE HANDLING)
  // ------------------------------------------------------------------------------------

  /**
   * Xử lý tải ảnh lên cho form (chung).
   * @param {Event} e - Sự kiện 'change' từ input file.
   * @param {string} previewContainerId - ID của div chứa ảnh xem trước.
   */
  handleImageUpload: async function (e, previewContainerId) {
    const files = e.target.files;
    const previewContainer = document.getElementById(previewContainerId);

    if (!files || !previewContainer) return;

    for (const file of files) {
      if (file) {
        const base64 = await this._helper_fileToBase64(file);
        this.currentProductImages.push(base64);

        const img = document.createElement("img");
        img.src = base64;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        previewContainer.appendChild(img);
      }
    }
    // Reset input để có thể chọn lại file giống
    e.target.value = null;
  },

  /** Xử lý tải ảnh cho form Sửa (cụ thể) */
  handleEditImageUpload: async function (e) {
    const files = e.target.files;
    const gallery = document.getElementById("editImageGallery");
    if (!files || !gallery) return;

    for (const file of files) {
      if (file) {
        const base64 = await this._helper_fileToBase64(file);
        this.currentProductImages.push(base64); // Thêm vào mảng state

        // Thêm vào DOM
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.style.position = "relative";
        div.setAttribute("data-index", this.currentProductImages.length - 1);

        div.innerHTML = `
          <img src="${base64}" alt="">
          <button type="button" class="delete-img-btn" data-action="delete-image">X</button>
        `;
        gallery.appendChild(div);
      }
    }
    e.target.value = null; // Reset input
  },

  /** Xử lý xóa ảnh khỏi gallery (Form Sửa) */
  handleImageDelete: function (e) {
    const target = e.target;
    // Chỉ xử lý nếu nhấn nút xóa ảnh
    if (
      target.matches("button.delete-img-btn") ||
      target.dataset.action === "delete-image"
    ) {
      const galleryItem = target.closest(".gallery-item");
      if (!galleryItem) return;

      const indexToRemove = parseInt(galleryItem.dataset.index, 10);
      
      // Xóa khỏi mảng state (dùng filter để tạo mảng mới)
      // Đây là cách an toàn hơn là dùng splice khi index có thể bị lệch
      const imgSourceToRemove = this.currentProductImages[indexToRemove];
      this.currentProductImages = this.currentProductImages.filter(
        (imgSrc) => imgSrc !== imgSourceToRemove
      );

      // Xóa khỏi DOM
      galleryItem.remove();

      // Cập nhật lại data-index cho các ảnh còn lại
      const remainingItems = document.querySelectorAll("#editImageGallery .gallery-item");
      remainingItems.forEach((item, newIndex) => {
        // Tìm index mới trong mảng state
        const img = item.querySelector("img");
        const stateIndex = this.currentProductImages.indexOf(img.src);
        item.setAttribute("data-index", stateIndex);
      });
    }
  },

  // ------------------------------------------------------------------------------------
  // § 8. LOGIC CÁC MODAL (MODAL LOGIC)
  // ------------------------------------------------------------------------------------

  /** Mở form thêm sản phẩm */
  openProductForm: function () {
    // Reset form
    document.getElementById("productForm").reset();
    this.currentProductImages = [];
    document.getElementById("imagePreview").innerHTML = "";

    // Reset các trường readonly
    document.getElementById("productName").value = "";
    document.getElementById("productInventory").value = "0";


    // Điền lại categories (phòng trường hợp DB thay đổi)
    this.populateCategoryControls();
    
    // Reset radio/checkbox
    document.querySelectorAll('input[name="productMainType"]').forEach((r) => (r.checked = false));
    document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]').forEach((cb) => (cb.checked = false));
    
    document.getElementById("productFormModal").classList.add("active");

    const inputID = document.getElementById("ProductCode");
    inputID.value = this._helper_GenerateProductID();
    inputID.setAttribute("readonly", "");

  },

  /** Đóng form thêm sản phẩm */
  closeProductForm: function () {
    document.getElementById("productFormModal").classList.remove("active");
    this.currentProductImages = [];
  },

  /** Mở form sửa sản phẩm */
  openEditProductForm: function (productId) {
    this.currentEditProductId = productId;
    const product = this.allProducts.find((p) => p.id === productId);
    if (!product) {
      console.error(`Không tìm thấy sản phẩm với ID: ${productId}`);
      return;
    }

    // Nạp dữ liệu vào form
    document.getElementById("editProductCode").value = product.id;
    document.getElementById("editProductName").value = product.name;
    document.getElementById("editProductGender").value = product.gender;
    document.getElementById("editProductSize").value = Array.isArray(product.size)
      ? product.size.join("-")
      : product.size;
    document.getElementById("editProductColor").value = Array.isArray(product.color)
      ? product.color.join("-")
      : product.color;
    document.getElementById("editProductDesc").value = product.description || "";
    document.getElementById("editProductInventory").value = product.inventory || 0;

    // ----- Xử lý Category (Radio + Checkbox) -----
    this.populateCategoryControls(); // Luôn render lại phòng trường hợp categoriesDB thay đổi

    // 1. Chuyển ID category (trong `product`) thành Tên
    const categoryNames = (product.category || []).map((id) =>
      this._helper_ConvertIDtoCategory(id)
    ).filter(Boolean); // Lọc ra các tên hợp lệ

    // 2. Xác định Loại chính
    const mainTypes = ["Men's", "Women's", "Unisex"];
    let mainType = categoryNames.find(name => mainTypes.includes(name));
    
    // 3. Set Radio
    document.querySelectorAll('input[name="editProductMainType"]').forEach((r) => {
      r.checked = r.value === mainType;
    });

    // 4. Set Checkbox (các loại phụ)
    document.querySelectorAll('#editCategoryCheckboxes input[type="checkbox"]').forEach((cb) => {
      // Được check nếu: tên có trong ds VÀ nó không phải là loại chính đã chọn
      cb.checked = categoryNames.includes(cb.value) && cb.value !== mainType;
    });

    // ----- Xử lý Hình ảnh -----
    this.currentProductImages = [...(product["img-link-list"] || [])];
    const gallery = document.getElementById("editImageGallery");
    gallery.innerHTML = ""; // Xóa ảnh cũ
    
    this.currentProductImages.forEach((imgSrc, index) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.style.position = "relative";
      div.setAttribute("data-index", index);
      div.innerHTML = `
        <img src="${imgSrc}" alt="">
        <button type="button" class="delete-img-btn" data-action="delete-image">X</button>
      `;
      gallery.appendChild(div);
    });

    document.getElementById("editProductFormModal").classList.add("active");
  },

  /** Đóng form sửa sản phẩm */
  closeEditProductForm: function () {
    document.getElementById("editProductFormModal").classList.remove("active");
    this.currentEditProductId = null;
    this.currentProductImages = [];
  },

  /** Mở modal xác nhận xóa */
  openDeleteModal: function (productId, productName, productImg) {
    this.currentDeleteProductId = productId;
    document.getElementById("deleteProductId").textContent = productId;
    document.getElementById("deleteProductName").textContent = productName;
    document.getElementById("deleteProductImg").src = productImg;
    document.getElementById("deleteModal").classList.add("active");
  },

  /** Đóng modal xác nhận xóa */
  closeDeleteModal: function () {
    document.getElementById("deleteModal").classList.remove("active");
    this.currentDeleteProductId = null;
  },

  /** Xử lý logic khi xác nhận xóa */
  confirmDelete: function () {
    if (!this.currentDeleteProductId) return;

    // Lọc ra sản phẩm bị xóa
    this.allProducts = this.allProducts.filter(
      (p) => p.id !== this.currentDeleteProductId
    );
    this.saveProducts(); // Lưu lại

    alert("Sản phẩm " + this.currentDeleteProductId + " đã được xóa");
    this.closeDeleteModal();

    // Render lại UI
    // Kiểm tra xem có cần lùi trang không
    if (this.getPaginatedProducts().length === 0 && this.currentPage > 1) {
      this.currentPage--;
    }
    this.renderProductTable();
    this.renderPagination();
  },

  /** Mở modal lịch sử kho */
  openInventoryModal: function (productId, productName, productDesc) {
    // Lưu productId vào modal để dùng cho việc lọc
    const modal = document.getElementById("inventoryModal");
    modal.setAttribute("data-product-id", productId);
    
    document.getElementById("productNameInventory").textContent = productName;
    document.getElementById("productDescInventory").textContent = productDesc;
    
    // Reset bộ lọc
    document.getElementById("filterStartDate").value = "";
    document.getElementById("filterEndDate").value = "";

    // Lấy toàn bộ lịch sử và render
    const history = this.getInventoryHistory(productId);
    this.renderInventoryHistoryTable(history);

    modal.classList.add("active");
  },

  /** Đóng modal lịch sử kho */
  closeInventoryModal: function () {
    document.getElementById("inventoryModal").classList.remove("active");
    // Xóa productId khi đóng
    document.getElementById("inventoryModal").removeAttribute("data-product-id");
  },

  /** Lọc dữ liệu trong modal lịch sử kho */
  filterInventoryData: function () {
    const startDateStr = document.getElementById("filterStartDate").value;
    const endDateStr = document.getElementById("filterEndDate").value;
    const productId = document
      .getElementById("inventoryModal")
      .getAttribute("data-product-id");

    if (!productId) {
      console.error("Không tìm thấy ProductID để lọc");
      return;
    }

    const allHistory = this.getInventoryHistory(productId);

    // Nếu không có ngày, render lại toàn bộ
    if (!startDateStr && !endDateStr) {
      this.renderInventoryHistoryTable(allHistory);
      return;
    }
    
    // Đặt giờ 00:00:00 cho ngày bắt đầu
    const startDate = startDateStr ? new Date(startDateStr + "T00:00:00") : null;
    // Đặt giờ 23:59:59 cho ngày kết thúc
    const endDate = endDateStr ? new Date(endDateStr + "T23:59:59") : null;
    
    if(startDate && endDate && startDate > endDate) {
        alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc.");
        return;
    }

    const filteredHistory = allHistory.filter((t) => {
      const itemDate = new Date(t.date);
      const afterStart = startDate ? itemDate >= startDate : true;
      const beforeEnd = endDate ? itemDate <= endDate : true;
      return afterStart && beforeEnd;
    });

    this.renderInventoryHistoryTable(filteredHistory);
  },

  /** Đóng tất cả các modal đang mở */
  closeAllModals: function () {
    document
      .querySelectorAll(".popup-bc, .popup-bc-edit, .delete-modal, .inventory-modal")
      .forEach((modal) => modal.classList.remove("active"));
  },

  // ------------------------------------------------------------------------------------
  // § 9. PHÂN TRANG (PAGINATION)
  // ------------------------------------------------------------------------------------

  /** Chuyển đến một trang cụ thể */
  goToPage: function (page) {
    this.currentPage = page;
    this.renderProductTable();
    this.renderPagination();
  },

  /** Tính tổng số trang */
  getTotalPages: function () {
    return Math.ceil(this.allProducts.length / this.productsPerPage);
  },

  /** Lấy các sản phẩm cho trang hiện tại */
  getPaginatedProducts: function () {
    const startIdx = (this.currentPage - 1) * this.productsPerPage;
    const endIdx = startIdx + this.productsPerPage;
    return this.allProducts.slice(startIdx, endIdx);
  },

  // ------------------------------------------------------------------------------------
  // § 10. HÀM TRỢ GIÚP (HELPER FUNCTIONS)
  // ------------------------------------------------------------------------------------
  // (Các hàm này được gọi nội bộ bởi các phương thức khác)
  // ------------------------------------------------------------------------------------

  _helper_GenerateProductID: function(){
    const allProduct = JSON.parse(localStorage.getItem("allProduct"));
    return "s" + (allProduct.length + 1);
  },
  /** (Helper) Kiểm tra xem ID sản phẩm đã tồn tại chưa */
  _helper_CheckIDExist: function (id) {
    return this.allProducts.some((p) => p.id === id);
  },

  /** (Helper) Chuyển mảng tên category thành mảng ID */
  _helper_ConvertCategoryToID: function (selectedCats) {
    if (!Array.isArray(selectedCats)) return [];
    
    return selectedCats.map(catName => {
      const category = this.categories.find(c => c.name === catName);
      return category ? Number(category.id) : null;
    }).filter(id => id !== null); // Lọc bỏ các giá trị null
  },

  /** (Helper) Sửa hàm này để trả về boolean rõ ràng */
  _helper_CheckIsShownCategory: function (id) {
    const category = this.categories.find((c) => c.id == id);
    return category ? category.isShown === true : false; // Rõ ràng trả về boolean
  },

  /** (Helper) Chuyển ID category thành Tên */
  _helper_ConvertIDtoCategory: function (id) {
    const category = this.categories.find((c) => c.id == id); // Dùng == vì id có thể là string
    return category ? category.name : `(ID: ${id})`; // Trả về ID nếu không tìm thấy tên
  },

  /** (Helper) Chuyển chuỗi "A-B-C" thành mảng ["A", "B", "C"] */
  _helper_ConvertInputToStringArr: function (string) {
    if (!string || typeof string !== 'string') return [];
    return string.split("-").map(s => s.trim()).filter(Boolean); // Trim và lọc rỗng
  },

  /** (Helper) Chuyển đổi file (hình ảnh) sang Base64 */
  _helper_fileToBase64: function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },

  /**
   * (Helper) Hàm chung để render checkboxes vào container.
   * @param {string} containerId - ID của div chứa.
   * @param {Array} items - Mảng {name, isShown}
   * @param {string} idPrefix - Tiền tố cho ID (ví dụ: 'add_cat_')
   */
  _helper_renderCheckboxes: function (containerId, items, idPrefix) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    const parentFormGroup = container.closest('.form-group') || container.closest('.edit-form-group');

    if (items.length === 0) {
      if (parentFormGroup) parentFormGroup.style.display = "none";
    } else {
      if (parentFormGroup) parentFormGroup.style.display = "";
      items.forEach((item, idx) => {
        const id = `${idPrefix}${idx}`;
        const wrapper = document.createElement("label");
        wrapper.style.marginRight = "10px";
        wrapper.style.cursor = "pointer";
        wrapper.innerHTML = `<input type="checkbox" id="${id}" value="${item.name}"> ${item.name}`;
        container.appendChild(wrapper);
      });
    }
  },
}; // Kết thúc đối tượng AdminProduct

// --------------------------------------------------------------------------------------
// CÁC HÀM TRỢ GIÚP BÊN NGOÀI (Nếu cần)
// (Các hàm này nằm ngoài đối tượng module, nhưng được sử dụng trong HTML của nó)
// --------------------------------------------------------------------------------------
function ChuThich(str) {
  return `<p style="color: #666;
   display: inline;
   font-size: 14px; 
   font-style: italic;
   margin: 0 0 0 8px;
   ">
    (${str})
  </p>`;
}
