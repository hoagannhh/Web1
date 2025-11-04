export const AdminProduct = {
  html: `
          <div class="main-content">
        <div class="header">
          <div class="left-header">
            <p>Product</p>
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
        <div class="product-table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Name</th>
                <th>Inventory</th>
                <th>Category</th>
                <th>Status</th>
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

  // ===== MODALS COMPONENTS =====
  modals: {
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
                    <input type="file" id="productImageInput" style="display: none;" accept="image/*">
                    <div id="imagePreview" style="margin-top: 10px;"></div>
                    <a href="#" class="help-text" onclick="event.preventDefault()">Tải ảnh lên hoặc kéo và thả</a>
                  </div>

                  <div class="form-group">
                    <label>Giới tính</label>
                    <select id="productGender">
                      <option value="">Chọn giới tính</option>
                      <option value="Men's">Men's</option>
                      <option value="Women's">Women's</option>
                      <option value="Unisex">Unisex</option> <!-- added -->
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Size ${ChuThich('Thêm Dấu gạch (-) với 2 size trở lên')}</label>
                    <input type="text" id="productSize" placeholder="">
                  </div>

                  <div class="form-group">
                    <label>Màu sắc ${ChuThich('Thêm Dấu gạch (-) với 2 color trở lên')}</label>
                    <input type="text" id="productColor" placeholder="">
                  </div>
                </div>

                <div class="right-column">
                  <!-- NEW: Chọn sản phẩm từ phiếu nhập -->
                  <div class="form-group">
                    <label>Sản phẩm từ phiếu nhập</label>
                    <select id="productSelect">
                      <option value="">Chọn sản phẩm (lấy từ phiếu nhập)</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Mã sản phẩm</label>
                    <input type="text" id="productCode" placeholder="">
                  </div>

                  <div class="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text" id="productName" placeholder="" readonly>
                  </div>

                  <!-- REPLACED: Main type (radio) + optional checkboxes -->
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
                      <!-- checkboxes injected here from categoriesDB -->
                    </div>
                  </div>
                  <!-- END REPLACED -->

                  <div class="form-group">
                    <label>Mô tả</label>
                    <textarea id="productDesc" placeholder=""></textarea>
                  </div>

                  <div class="form-group">
                    <label>Số lượng tồn kho</label>
                    <input type="number" id="productInventory" placeholder="0">
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
                  <div id="editImageGallery" class="image-gallery"></div>
                  <input type="file" id="editProductImageInput" style="display: none;" accept="image/*">
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
                  <input type="text" id="editProductCode" value="">
                </div>

                <div class="edit-form-group">
                  <label>Tên sản phẩm</label>
                  <input type="text" id="editProductName" value="">
                </div>

                <!-- REPLACED: edit category -> radio + checkboxes -->
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
                    <!-- injected -->
                  </div>
                </div>
                <!-- END REPLACED -->

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

    deleteModal: `
        <div class="delete-modal" id="deleteModal">
          <div class="delete-modal-content">
            <div class="container-2">
              <img class="delete-icon-container" src="../icon/Delete.png" alt="Delete Icon">
              <h2 class="delete-title">Xóa sản phẩm</h2>
              <div class="delete-product-info">
                <img src="" alt="Product" class="product-delete-img" id="deleteProductImg">
                <div class="product-delete-info-text">
                  <div class="product-delete-name" id="deleteProductName">Product Name</div>
                  <div class="product-delete-id" id="deleteProductId">s1</div>
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

    inventoryModal: `
        <div class="inventory-modal" id="inventoryModal">
          <div class="inventory-modal-content">
            <div class="inventory-header">
              <img class="inventory-icon-circle" src="../icon/Time Machine.png">
              <div class="inventory-header-text">
                <h2 id="productNameInventory">Air Jordan 4 RM</h2>
                <p id="productDescInventory">Lịch sử: Nhập - Xuất - Tồn</p>
              </div>
            </div>

            <div class="inventory-filters">
              <div class="filter-group">
                <label>Ngày nhập</label>
                <input type="date" id="filterStartDate" placeholder="dd/mm/yyyy">
              </div>
              <div class="filter-group">
                <label>Ngày nhập</label>
                <input type="date" id="filterEndDate" placeholder="dd/mm/yyyy">
              </div>
              <button class="filter-btn" id="filterInventoryBtn">Lọc</button>
            </div>

            <div class="inventory-stats">
              <div class="stat-box inbound">
                <div class="stat-label">Tổng nhập</div>
                <p class="stat-value" id="totalInbound">+10</p>
              </div>
              <div class="stat-box outbound">
                <div class="stat-label">Tổng xuất</div>
                <p class="stat-value" id="totalOutbound">-2</p>
              </div>
              <div class="stat-box total">
                <div class="stat-label">Tồn cuối</div>
                <p class="stat-value" id="totalStock">8</p>
              </div>
            </div>

            <div class="inventory-table-container">
              <table class="inventory-table">
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
                  <tr>
                    <td class="transaction-date">19/10/2025</td>
                    <td class="transaction-type">Bán</td>
                    <td class="transaction-code">DH001</td>
                    <td class="transaction-change negative">-2</td>
                    <td class="transaction-total">8</td>
                  </tr>
                  <tr>
                    <td class="transaction-date">18/10/2025</td>
                    <td class="transaction-type">Nhập</td>
                    <td class="transaction-code">PN001</td>
                    <td class="transaction-change positive">+10</td>
                    <td class="transaction-total">10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="inventory-buttons">
              <button class="btn-cancel-inventory" id="cancelInventoryBtn">Hủy</button>
              <button class="btn-add-inventory" id="confirmInventoryBtn">Xác nhận thêm</button>
            </div>
          </div>
        </div>
      `,
  },

  // ===== PAGINATION CONFIG =====
  currentPage: 1,
  productsPerPage: 5,
  allProducts: [
    {
      id: "s1",
      name: "Air Jordan 4 RM",
      img: "../product-img/s1/ms1-1.png",
      inventory: 100,
      category: "Men's",
    },
    {
      id: "s2",
      name: "Handball Spezial",
      img: "../product-img/s2/ms2-1.png",
      inventory: 100,
      category: "Men's",
    },
    {
      id: "s3",
      name: "Chuck 70",
      img: "../product-img/s3/ms3-1.png",
      inventory: 100,
      category: "Women's",
    },
    {
      id: "s4",
      name: "Classic Slip-On Checkerboard Shoe",
      img: "../product-img/s4/ms4-1.png",
      inventory: 100,
      category: "Men's",
    },
    {
      id: "s5",
      name: "Bella UT Femme",
      img: "../product-img/s5/ms5-1.png",
      inventory: 100,
      category: "Men's",
    },
  ],
  categories: [],
  init: function () {
    // Load products from localStorage

    this.loadProducts();
    this.loadCategory();
    console.log(JSON.parse(localStorage.getItem("allProduct")));
    console.log(JSON.parse(localStorage.getItem("categoriesDB")));
    // --- NEW: imported items (từ productImport) ---
    console.log(localStorage.getItem("productImport"));
    let importedItems = []; // [{ name, totalQty }]
    const loadImportedItems = () => {
      const raw = localStorage.getItem("productImport");
      if (!raw) {
        importedItems = [];
        return;
      }
      try {
        const parsed = JSON.parse(raw) || [];
        // parsed can be array of orders or array of items (legacy)
        let itemsList = [];
        if (
          Array.isArray(parsed) &&
          parsed.length &&
          (parsed[0].name || parsed[0].qty || parsed[0].price) &&
          !parsed[0].id
        ) {
          // legacy: parsed is items array
          itemsList = parsed;
        } else {
          // parsed is orders array -> flatten items
          const arr = Array.isArray(parsed) ? parsed : [];
          arr.forEach((o) => {
            // if (Array.isArray(o.items)) itemsList = itemsList.concat(o.items);
            if (Array.isArray(o.items)) {
              o.items.forEach((it) => {
                itemsList.push({
                  ...it,
                  status:
                    o.status || (Number(it.qty) > 0 ? "completed" : "pending"),
                });
              });
            }
          });
        }
        // aggregate by name
        //   const map = {};
        //   itemsList.forEach((it) => {
        //     const name = (it.name || "").trim();
        //     const qty = Number(it.qty) || 0;
        //     if (!name) return;
        //     map[name] = (map[name] || 0) + qty;
        //   });
        //   importedItems = Object.keys(map).map((name) => ({
        //     name,
        //     totalQty: map[name],
        //     status: map[name] > 0 ? "completed" : "pending",
        //   }));
        // }
        const map = {};
        itemsList.forEach((it) => {
          const name = (it.name || "").trim();
          const qty = Number(it.qty) || 0;
          const status = it.status;
          if (!name) return;

          if (!map[name]) map[name] = { totalQty: 0, status: status };
          map[name].totalQty += qty;

          // nếu cùng sản phẩm mà có status khác nhau → mixed
          if (map[name].status !== status) map[name].status = "mixed";
        });

        importedItems = Object.keys(map).map((name) => ({
          name,
          totalQty: map[name].totalQty,
          status: map[name].status,
        }));
      } catch (err) {
        console.error("Failed to parse productImport", err);
        importedItems = [];
      }
    };

    const populateProductSelect = () => {
      const sel = document.getElementById("productSelect");
      if (!sel) return;
      sel.innerHTML =
        '<option value="">Chọn sản phẩm (lấy từ phiếu nhập)</option>';
      importedItems.forEach((it) => {
        console.log(it.status);
        if (it.status == "completed") {
          const opt = document.createElement("option");
          opt.value = it.name;
          opt.textContent = `${it.name} — Sẵn có: ${it.totalQty}`;
          sel.appendChild(opt);
        }
      });
    };

    // --- NEW: load categoriesDB and render category controls ---
    function loadCategoriesDB() {
      try {
        const raw = localStorage.getItem("categoriesDB");
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Failed to load categoriesDB", e);
        return [];
      }
    }

    function populateCategoryControls() {
      // Load raw categories and normalize to objects { name, isShown }
      const raw = loadCategoriesDB();
      const categories = (Array.isArray(raw) ? raw : [])
        .map((c) =>
          typeof c === "object" && c !== null
            ? {
                name: String(c.name || "").trim(),
                isShown: c.hasOwnProperty("isShown") ? !!c.isShown : true,
              }
            : { name: String(c).trim(), isShown: true }
        )
        .filter((c) => c.name);

      // define main types that must be treated as required (exclude them from optional list)
      // use case-insensitive comparison to ensure "unisex" in any case is excluded
      const mainTypesLower = ["men's", "women's", "unisex"];

      // Exclude main types and any hidden categories (isShown === false)
      const optionalItems = categories.filter(
        (c) => !mainTypesLower.includes(c.name.toLowerCase()) && c.isShown
      );

      // Populate add-form checkboxes
      const addContainer = document.getElementById("categoryCheckboxes");
      if (addContainer) {
        addContainer.innerHTML = "";
        if (optionalItems.length === 0) {
          if (addContainer.parentElement)
            addContainer.parentElement.style.display = "none";
        } else {
          if (addContainer.parentElement)
            addContainer.parentElement.style.display = "";
          optionalItems.forEach((item, idx) => {
            const id = `add_cat_${idx}`;
            const wrapper = document.createElement("label");
            wrapper.style.marginRight = "10px";
            wrapper.style.cursor = "pointer";
            wrapper.innerHTML = `<input type="checkbox" id="${id}" value="${item.name}"> ${item.name}`;
            addContainer.appendChild(wrapper);
          });
        }
      }

      // Populate edit-form checkboxes
      const editContainer = document.getElementById("editCategoryCheckboxes");
      if (editContainer) {
        editContainer.innerHTML = "";
        if (optionalItems.length === 0) {
          if (editContainer.parentElement)
            editContainer.parentElement.style.display = "none";
        } else {
          if (editContainer.parentElement)
            editContainer.parentElement.style.display = "";
          optionalItems.forEach((item, idx) => {
            const id = `edit_cat_${idx}`;
            const wrapper = document.createElement("label");
            wrapper.style.marginRight = "10px";
            wrapper.style.cursor = "pointer";
            wrapper.innerHTML = `<input type="checkbox" id="${id}" value="${item.name}"> ${item.name}`;
            editContainer.appendChild(wrapper);
          });
        }
      }
    }
    // --- END LOAD & POPULATE ---

    // Render modals vào container
    const modalsContainer = document.getElementById("modalsContainer");
    modalsContainer.innerHTML =
      this.modals.productForm +
      this.modals.editForm +
      this.modals.deleteModal +
      this.modals.inventoryModal;
    +(+(
      // populate category controls immediately (modals đã inject vào DOM)
      (+populateCategoryControls())
    ));

    // Render initial page
    this.renderProductTable();
    this.renderPagination();

    let currentDeleteProductId = null;
    let currentEditProductId = null;
    let currentProductImages = [];

    // ===== HELPER FUNCTIONS =====
    const closeAllModals = () => {
      document.getElementById("productFormModal").classList.remove("active");
      document
        .getElementById("editProductFormModal")
        .classList.remove("active");
      document.getElementById("deleteModal").classList.remove("active");
      document.getElementById("inventoryModal").classList.remove("active");
    };

    // ===== IMAGE CONVERSION =====
    // Convert hình ảnh thành base64
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    // ===== THÊM SẢN PHẨM =====
    const openProductForm = () => {
      // Tải danh sách từ phiếu nhập mỗi lần mở form để luôn cập nhật(Sẩn phẩm nhập từ kho)
      loadImportedItems();
      // Điền dropdown sản phẩms mỗi lần mở của mỗi category
      populateProductSelect();

      // Render radio buttons + checkboxes loại
      populateCategoryControls();

      // Clear check box cho nó trống lại
      document
        .querySelectorAll('input[name="productMainType"]')
        .forEach((r) => (r.checked = false));
      const addChk = document.querySelectorAll(
        '#categoryCheckboxes input[type="checkbox"]'
      );
      addChk.forEach((cb) => (cb.checked = false));

      if (!importedItems.length) {
        alert(
          "Không có sản phẩm trong phiếu nhập (productImport). Vui lòng thêm phiếu nhập trước khi thêm sản phẩm."
        );
        return;
      }

      currentProductImages = [];
      document.getElementById("productForm").reset(); // reset form
      document.getElementById("imagePreview").innerHTML = "";
      // đảm bảo input readonly được xóa giá trị cũ
      document.getElementById("productCode").value = "";
      document.getElementById("productName").value = "";
      document.getElementById("productInventory").value = 0;
      document.getElementById("productFormModal").classList.add("active");
    };

    // khi chọn sản phẩm từ select -> tự set tên, mã và tồn kho
    document.addEventListener("change", function (e) {
      if (e.target && e.target.id === "productSelect") {
        const selVal = e.target.value;
        const item = importedItems.find((it) => it.name === selVal);
        if (item) {
          // chỉ tự điền tên và tồn kho — không ghi đè mã (người dùng có thể nhập thủ công)
          document.getElementById("productName").value = selVal;
          document.getElementById("productInventory").value =
            item.totalQty || 0;
        } else {
          document.getElementById("productName").value = "";
          document.getElementById("productInventory").value = 0;
        }
      }
    });
    // đóng form
    const closeProductForm = () => {
      document.getElementById("productFormModal").classList.remove("active");
      currentProductImages = [];
    };

    document.getElementById("imageBox").addEventListener("click", () => {
      document.getElementById("productImageInput").click();
    });

    document
      .getElementById("productImageInput")
      .addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          currentProductImages.push(base64);

          const img = document.createElement("img");
          img.src = base64;
          img.style.maxWidth = "100px";
          img.style.marginRight = "10px";
          img.style.marginBottom = "10px";
          document.getElementById("imagePreview").appendChild(img);
        }
      });

    document
      .getElementById("addProductBtn")
      .addEventListener("click", openProductForm);
    document
      .getElementById("cancelProductBtn")
      .addEventListener("click", closeProductForm);

    document
      .getElementById("productFormModal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeProductForm();
      });


    // Xử lý submit dữ liệu lên local storage
    document
      .getElementById("productForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        // check ID đã tồn tại chưa 
        const productID = document.getElementById("productCode").value;
        if (CheckIDExist(productID)){
          alert("ID đã tồn tại");
          return;
        }
        // bắt buộc chọn sản phẩm từ productSelect
        const selectedName = document.getElementById("productSelect").value;
        if (!selectedName) {
          alert("Vui lòng chọn 1 sản phẩm từ phiếu nhập (productImport).");
          return;
        }

        // NEW: lấy main type (radio) + optional checkbox categories
        const mainTypeInput = document.querySelector(
          'input[name="productMainType"]:checked'
        );
        if (!mainTypeInput) {
          alert("Vui lòng chọn Loại chính (Men's / Women's / Unisex).");
          return;
        }
        const mainType = mainTypeInput.value;

        const optionalCats = Array.from(
          document.querySelectorAll(
            '#categoryCheckboxes input[type="checkbox"]:checked'
          )
        ).map((c) => c.value);

        // Gộp 2 mảng và xóa các giá trị falsthy
        const selectedCats = [mainType, ...optionalCats].filter(Boolean);

        if (currentProductImages.length === 0) {
          alert("Vui lòng chọn hình ảnh sản phẩm");
          return;
        }

        // sử dụng tên đã chọn; mã và tồn kho đã tự điền (mã có thể do user nhập)
        const newProduct = {
          id:
            document.getElementById("productCode").value || `IMP-${Date.now()}`,
          name: selectedName,
          // now store category as array (main + optional)
          category: ConvertCategoryToID(selectedCats),
          gender: document.getElementById("productGender").value,
          size: ConvertInputToIntArr(document.getElementById("productSize").value),
          color: ConvertInputToStringArr(document.getElementById("productColor").value),
          description: document.getElementById("productDesc").value,
          inventory:
            parseInt(document.getElementById("productInventory").value) || 0,
          "img-represent": currentProductImages[0],
          "img-link-list": currentProductImages,
          status: "Đang hiển thị",
          price: 10000000,
          createdAt: new Date().toISOString(),
        };

        console.log(newProduct);
        this.allProducts.push(newProduct);
        localStorage.setItem("allProduct", JSON.stringify(this.allProducts));

        console.log("Sản phẩm đã thêm:", newProduct);
        alert("Thêm sản phẩm thành công!");
        closeProductForm();
        this.currentPage = 1;
        this.renderProductTable();
        this.renderPagination();
      });
    const CheckIDExist = (id) => {
      return this.allProducts.find(p => p.id === id);
    }
    const ConvertCategoryToID = (selectedCats) =>{
      let newtemp = [];
      console.log("generate form edit: selected cats: " + selectedCats);
      for (let i = 0; i < selectedCats.length; i++){
        for (let j = 0; j < this.categories.length; j++){
          if (selectedCats[i] === this.categories[j].name){
            newtemp.push(Number(this.categories[j].id));
          }
        }
      }
      return newtemp
    }
    const ConvertIDtoCategory = (id) =>{
      for (let i = 0; i < this.categories.length; i++){
        if (this.categories[i].id === id){
          return this.categories[i].name;
        }
      }
    }
    // ===== SỬA SẢN PHẨM =====
    const openEditProductForm = (productId) => {
      currentEditProductId = productId;
      const product = this.allProducts.find((p) => p.id === productId);
      console.log(product)
      if (!product) return;
      console.log(product);
      document.getElementById("editProductCode").value = product.id;
      document.getElementById("editProductName").value = product.name;

      // render checkboxes (in case categories changed) and CLEAR previous selections first
      populateCategoryControls();
      document
        .querySelectorAll('input[name="editProductMainType"]')
        .forEach((r) => (r.checked = false));
      document
        .querySelectorAll('#editCategoryCheckboxes input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      // NEW: set edit main type radio + optional checkboxes
      let values = product.category;
      let valuename = [];
      let mainType;
      console.log(values);
      for (let i = 0; i < values.length; i++){
        if (values[i] <= 3) {
          mainType = ConvertIDtoCategory(values[i]);
        }
        valuename.push(ConvertIDtoCategory(values[i]))
      }
      // determine main type (prefer Men's/Women's/Unisex)
      console.log("main category: " + mainType );
      console.log("option category: " + values)
      console.log("caluename: " + valuename)
      // set radios
      if (mainType) {
        const radio = document.querySelector(
          `input[name="editProductMainType"][value="${mainType}"]`
        );
        if (radio) radio.checked = true;
      }

      // set optional checkboxes
      const editOpts = document.querySelectorAll(
        '#editCategoryCheckboxes input[type="checkbox"]'
      );
      editOpts.forEach((cb) => {
        cb.checked = valuename.includes(cb.value) && cb.value !== mainType;
      });

      // other fields
      document.getElementById("editProductGender").value = product.gender;
      document.getElementById("editProductSize").value = Array.isArray(
        product.size
      )
        ? product.size.join("-")
        : product.size;
      document.getElementById("editProductColor").value = Array.isArray(
        product.color
      )
        ? product.color.join("-")
        : product.color;
      document.getElementById("editProductDesc").value =
        product.description || "none";
      document.getElementById("editProductInventory").value =
        product.inventory || 0;

      // Render images
      const gallery = document.getElementById("editImageGallery");
      console.log(product);
      let i = 0;
      gallery.innerHTML = product["img-link-list"]
        .map(
          (img) =>        
          `
              <div class="gallery-item" data-index='${i++}' style="position: relative;">
                <img src="${img}" alt="">
                <button type="button" onclick="this.parentElement.remove()" 
                  style="position: absolute; top: 0; right: 0; background: red; color: white; border: none; cursor: pointer; padding: 5px;">
                  Xóa
                </button>
              </div>
            `         
        )
        .join("");
        console.log(product["img-link-list"]);
        currentProductImages = [...product["img-link-list"]];
        document.getElementById("editProductFormModal").classList.add("active");
        addEventRemoveImageInInput();
    };

      // thêm sự kienj khi xóa ảnh
      function addEventRemoveImageInInput(){
        document.querySelectorAll(".gallery-item").forEach(item => {
          // console.log(item)
          const index = item.dataset.index;
          const btnRemove = item.querySelector("button");
          console.log(btnRemove);
          btnRemove.addEventListener("click", (e) => {
            e.preventDefault();
            currentProductImages.splice(index, 1);
          })
          // console.log(id);
        })
      }

      // Hàm xóa
      function deleteImage(button) {
        const div = button.parentElement;
        const index = parseInt(div.getAttribute("data-index"));
        console.log("123");
        currentProductImages.splice(index, 1); // ← Xóa khỏi array
        div.remove(); // ← Xóa khỏi DOM
        
        updateImageIndices(); // ← Cập nhật index
      }

      function updateImageIndices() {
        document.querySelectorAll(".gallery-item").forEach((item, index) => {
          item.setAttribute("data-index", index);
        });
      }


    const closeEditProductForm = () => {
      document
        .getElementById("editProductFormModal")
        .classList.remove("active");
      currentEditProductId = null;
      currentProductImages = [];
      // clear radios and checkboxes so next open starts fresh
      document
        .querySelectorAll('input[name="editProductMainType"]')
        .forEach((r) => (r.checked = false));
      document
        .querySelectorAll('#editCategoryCheckboxes input[type="checkbox"]')
        .forEach((cb) => (cb.checked = false));
      // also reset edit form fields
      const f = document.getElementById("editProductForm");
      if (f) f.reset();
    };

    // thêm sư kiện khi thêm ảnh
    console.log(document.getElementById("editProductImageInput"))
    document
      .getElementById("editProductImageInput")
      .addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          currentProductImages.push(base64);

          const gallery = document.getElementById("editImageGallery");
          const div = document.createElement("div");
          div.className = "gallery-item";
          div.style.position = "relative";
          div.setAttribute("data-index", currentProductImages.length - 1); // ← Lưu index

          div.innerHTML = `
            <img src="${base64}" alt="">
            <button type="button" onclick="this.parentElement.remove()" 
              style="position: absolute; top: 0; right: 0; background: red; color: white; border: none; cursor: pointer; padding: 5px;">
              Xóa
            </button>
          `;
          gallery.appendChild(div);
          console.log(div);
        }
      });

    document
      .getElementById("cancelEditBtn")
      .addEventListener("click", closeEditProductForm);

    document
      .getElementById("editProductFormModal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeEditProductForm();
      });

    document
      .getElementById("editProductForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        const idx = this.allProducts.findIndex(
          (p) => p.id === currentEditProductId
        );

        if (idx !== -1) {
          //  read edit main type + optional checkboxes
          const mainTypeInput = document.querySelector(
            'input[name="editProductMainType"]:checked'
          );
                    console.log("main type: ");
                    console.log(mainTypeInput.value);
          const mainType = ConvertCategoryToID(mainTypeInput ? [mainTypeInput.value] : null);
          console.log("Main Type: " + mainType.toString());
          let optionalCats = Array.from(
            document.querySelectorAll(
              '#editCategoryCheckboxes input[type="checkbox"]:checked'
            )
          ).map((c) => c.value);
          optionalCats = ConvertCategoryToID(optionalCats)
          console.log("optional cats: " + optionalCats);
          const newCategories = mainType.concat(
            optionalCats
          );
          console.log("New categories: " + newCategories.toString());
          this.allProducts[idx] = {
            ...this.allProducts[idx],
            name: document.getElementById("editProductName").value,

            category: newCategories,
            gender: document.getElementById("editProductGender").value,
            size: ConvertInputToIntArr(
              document.getElementById("editProductSize").value
            ),
            color: ConvertInputToStringArr(
              document.getElementById("editProductColor").value
            ),
            description: document.getElementById("editProductDesc").value,
            inventory:
              parseInt(document.getElementById("editProductInventory").value) ||
              0,
              price: 100000,
            "img-link-list": currentProductImages,
            "img-represent": currentProductImages[0],
          };

          let test = {

            name: document.getElementById("editProductName").value,

            category: newCategories,
            gender: document.getElementById("editProductGender").value,
            size: ConvertInputToIntArr(
              document.getElementById("editProductSize").value
            ),
            color: ConvertInputToStringArr(
              document.getElementById("editProductColor").value
            ),
            description: document.getElementById("editProductDesc").value,
            inventory:
              parseInt(document.getElementById("editProductInventory").value) ||
              0,
            "img-link-list": currentProductImages,
            "img-represent": currentProductImages[0],
          };
          console.log(test);


          localStorage.setItem("allProduct", JSON.stringify(this.allProducts));
          console.log("Sản phẩm đã cập nhật");
          alert("Cập nhật sản phẩm thành công!");
          closeEditProductForm();
          this.renderProductTable();
          this.renderPagination();
        }
      });

    // ===== XÓA SẢN PHẨM =====
    const openDeleteModal = (productId, productName, productImg) => {
      currentDeleteProductId = productId;
      document.getElementById("deleteProductId").textContent = productId;
      document.getElementById("deleteProductName").textContent = productName;
      document.getElementById("deleteProductImg").src = productImg;
      document.getElementById("deleteModal").classList.add("active");
    };

    const closeDeleteModal = () => {
      document.getElementById("deleteModal").classList.remove("active");
      currentDeleteProductId = null;
    };

    const confirmDelete = () => {
      const idx = this.allProducts.findIndex(
        (p) => p.id === currentDeleteProductId
      );
      if (idx !== -1) {
        this.allProducts.splice(idx, 1);
        localStorage.setItem("allProduct", JSON.stringify(this.allProducts));
      }

      console.log("Xóa sản phẩm:", currentDeleteProductId);
      alert("Sản phẩm " + currentDeleteProductId + " đã được xóa");
      closeDeleteModal();
      this.renderProductTable();
      this.renderPagination();
    };

    document
      .getElementById("cancelDeleteBtn")
      .addEventListener("click", closeDeleteModal);
    document
      .getElementById("confirmDeleteBtn")
      .addEventListener("click", () => confirmDelete.call(this));

    document
      .getElementById("deleteModal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeDeleteModal();
      });

    // ===== INVENTORY MODAL =====
    const openInventoryModal = (productId, productName, productDesc) => {
      if (productName) {
        document.getElementById("productNameInventory").textContent =
          productName;
      }
      if (productDesc) {
        document.getElementById("productDescInventory").textContent =
          productDesc;
      }
      document.getElementById("inventoryModal").classList.add("active");
    };

    const closeInventoryModal = () => {
      document.getElementById("inventoryModal").classList.remove("active");
    };

    const filterInventoryData = () => {
      const startDate = document.getElementById("filterStartDate").value;
      const endDate = document.getElementById("filterEndDate").value;

      if (!startDate || !endDate) {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc");
        return;
      }

      console.log("Lọc từ:", startDate, "Đến:", endDate);
      alert("Đã lọc dữ liệu từ " + startDate + " đến " + endDate);
    };

    const addInventoryRecord = () => {
      console.log("Thêm bản ghi nhập xuất kho");
      alert("Đã thêm bản ghi nhập xuất kho thành công!");
      closeInventoryModal();
    };

    document
      .getElementById("cancelInventoryBtn")
      .addEventListener("click", closeInventoryModal);
    document
      .getElementById("confirmInventoryBtn")
      .addEventListener("click", addInventoryRecord);
    document
      .getElementById("filterInventoryBtn")
      .addEventListener("click", filterInventoryData);

    document
      .getElementById("inventoryModal")
      .addEventListener("click", function (e) {
        if (e.target === this) closeInventoryModal();
      });

    // ===== ESC KEY HANDLER =====
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllModals();
    });

    // ===== EXPOSE FUNCTIONS FOR DYNAMIC TABLE ROWS =====
    window.openEditProductForm = (id) => openEditProductForm.call(this, id);
    window.openDeleteModal = openDeleteModal;
    window.openInventoryModal = openInventoryModal;
    window.goToPage = (page) => this.goToPage(page);
  },

  // ===== LOAD PRODUCTS FROM LOCALSTORAGE =====
  loadProducts: function () {
    const stored = localStorage.getItem("allProduct");
    if (stored) {
      this.allProducts = JSON.parse(stored);
    }
  },
  loadCategory: function () {
    const stored = localStorage.getItem("categoriesDB");
    if (stored) {
      this.categories = JSON.parse(stored);
    }
  },
  // ===== PAGINATION FUNCTIONS =====
  goToPage: function (page) {
    this.currentPage = page;
    this.renderProductTable();
    this.renderPagination();
  },

  getTotalPages: function () {
    return Math.ceil(this.allProducts.length / this.productsPerPage);
  },

  getPaginatedProducts: function () {
    const startIdx = (this.currentPage - 1) * this.productsPerPage;
    const endIdx = startIdx + this.productsPerPage;
    return this.allProducts.slice(startIdx, endIdx);
  },

  // ===== RENDER PAGINATION BUTTONS =====
  renderPagination: function () {
    const totalPages = this.getTotalPages();
    const container = document.getElementById("paginationContainer");
    let html = "";

    // Nút Previous
    if (this.currentPage > 1) {
      html += `<button onclick="goToPage(${
        this.currentPage - 1
      })" style="margin-right: 5px;">←</button>`;
    }

    // Nút số trang
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === this.currentPage ? "active" : "";
      html += `<button onclick="goToPage(${i})" class="${activeClass}">${i}</button>`;
    }

    // Nút Next
    if (this.currentPage < totalPages) {
      html += `<button onclick="goToPage(${
        this.currentPage + 1
      })" style="margin-left: 5px;">→</button>`;
    }

    container.innerHTML = html;
  },

  // ===== RENDER PRODUCT TABLE =====
  renderProductTable: function () {
    const products = this.getPaginatedProducts();
    const tbody = document.getElementById("productTableBody");

    tbody.innerHTML = products
      .map(
        (product) => `
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

          <td>${product.inventory}</td>
          <td>${
            Array.isArray(product.category)
              ? product.category.join(", ")
              : product.category
          }</td>
           <td class="show-text">Đang hiển thị</td>
           <td class="action">
             <img src="../icon/Time Machine.png" alt="" style="cursor: pointer;" onclick="openInventoryModal('${
               product.id
             }', '${product.name}', 'Lịch sử: Nhập - Xuất - Tồn')">
             <button class="btn btn-lock" onclick="openDeleteModal('${
               product.id
             }', '${product.name}', '${product.img}')">Xóa</button>
             <button class="btn btn-reset" onclick="openEditProductForm('${
               product.id
             }')">Sửa</button>
           </td>
         </tr>
       `
      )
      .join("");
  },
};
function ConvertInputToIntArr(string) {
  return string.split("-").map(Number);
}
function ConvertInputToStringArr(string) {
  return string.split("-");
}
function ChuThich(str){
  return `<p style="color: #666;
   display: inline;
   font-size: 14px; 
   font-style: italic;
   margin: 8px 0;
   padding: 8px 12px;
   ">
    ${str}
  </p>`;
}