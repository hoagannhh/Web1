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
                  </select>
                </div>

                <div class="form-group">
                  <label>Size</label>
                  <input type="text" id="productSize" placeholder="">
                </div>

                <div class="form-group">
                  <label>Màu sắc</label>
                  <input type="text" id="productColor" placeholder="">
                </div>
              </div>

              <div class="right-column">
                <div class="form-group">
                  <label>Mã sản phẩm</label>
                  <input type="text" id="productCode" placeholder="">
                </div>

                <div class="form-group">
                  <label>Tên sản phẩm</label>
                  <input type="text" id="productName" placeholder="">
                </div>

                <div class="form-group">
                  <label>Loại sản phẩm</label>
                  <select id="productCategory">
                    <option value="">Chọn loại</option>
                    <option value="Men's">Men's</option>
                    <option value="Women's">Women's</option>
                  </select>
                </div>

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
                  <input type=""text id="editProductGender"> 
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

                <div class="edit-form-group">
                  <label>Loại sản phẩm</label>
                  <select id="editProductCategory">
                    <option value="Men's">Men's</option>
                    <option value="Women's">Women's</option>
                  </select>
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
      `
    },

    // ===== PAGINATION CONFIG =====
    currentPage: 1,
    productsPerPage: 5,
    allProducts: [
      { id: 's1', name: 'Air Jordan 4 RM', img: '../product-img/s1/ms1-1.png', inventory: 100, category: "Men's" },
      { id: 's2', name: 'Handball Spezial', img: '../product-img/s2/ms2-1.png', inventory: 100, category: "Men's" },
      { id: 's3', name: 'Chuck 70', img: '../product-img/s3/ms3-1.png', inventory: 100, category: "Women's" },
      { id: 's4', name: 'Classic Slip-On Checkerboard Shoe', img: '../product-img/s4/ms4-1.png', inventory: 100, category: "Men's" },
      { id: 's5', name: 'Bella UT Femme', img: '../product-img/s5/ms5-1.png', inventory: 100, category: "Men's" }
    ],

    init: function() {
      // Load products from localStorage
      this.loadProducts();
      
      // Render modals vào container
      const modalsContainer = document.getElementById('modalsContainer');
      modalsContainer.innerHTML = 
        this.modals.productForm + 
        this.modals.editForm + 
        this.modals.deleteModal + 
        this.modals.inventoryModal;

      // Render initial page
      this.renderProductTable();
      this.renderPagination();

      let currentDeleteProductId = null;
      let currentEditProductId = null;
      let currentProductImages = [];

      // ===== HELPER FUNCTIONS =====
      const closeAllModals = () => {
        document.getElementById('productFormModal').classList.remove('active');
        document.getElementById('editProductFormModal').classList.remove('active');
        document.getElementById('deleteModal').classList.remove('active');
        document.getElementById('inventoryModal').classList.remove('active');
      };

      // ===== IMAGE CONVERSION =====
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      };

      // ===== THÊM SẢN PHẨM =====
      const openProductForm = () => {
        currentProductImages = [];
        document.getElementById('productForm').reset(); // reset form
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('productFormModal').classList.add('active');
      };

      const closeProductForm = () => {
        document.getElementById('productFormModal').classList.remove('active');
        currentProductImages = [];
      };

      document.getElementById('imageBox').addEventListener('click', () => {
        document.getElementById('productImageInput').click();
      });

      document.getElementById('productImageInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          currentProductImages.push(base64);
          
          const img = document.createElement('img');
          img.src = base64;
          img.style.maxWidth = '100px';
          img.style.marginRight = '10px';
          img.style.marginBottom = '10px';
          document.getElementById('imagePreview').appendChild(img);
        }
      });

      document.getElementById('addProductBtn').addEventListener('click', openProductForm);
      document.getElementById('cancelProductBtn').addEventListener('click', closeProductForm);
      
      document.getElementById('productFormModal').addEventListener('click', function(e) {
        if (e.target === this) closeProductForm();
      });

      document.getElementById('productForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (currentProductImages.length === 0) {
          alert('Vui lòng chọn hình ảnh sản phẩm');
          return;
        }

        const newProduct = {
          id: document.getElementById('productCode').value,
          name: document.getElementById('productName').value,
          category: document.getElementById('productCategory').value,
          gender: document.getElementById('productGender').value,
          size: document.getElementById('productSize').value,
          color: document.getElementById('productColor').value,
          description: document.getElementById('productDesc').value,
          inventory: parseInt(document.getElementById('productInventory').value) || 0,
          img: currentProductImages[0],
          images: currentProductImages,
          status: 'Đang hiển thị',
          createdAt: new Date().toISOString()
        };

        this.allProducts.push(newProduct);
        localStorage.setItem('allProduct', JSON.stringify(this.allProducts));

        console.log('Sản phẩm đã thêm:', newProduct);
        alert('Thêm sản phẩm thành công!');
        closeProductForm();
        this.currentPage = 1;
        this.renderProductTable();
        this.renderPagination();
      });

      // ===== SỬA SẢN PHẨM =====
      const openEditProductForm = (productId) => {
        currentEditProductId = productId;
        const product = this.allProducts.find(p => p.id === productId);

        if (!product) return;
        console.log(product);
        document.getElementById('editProductCode').value = product.id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editProductCategory').value = product.category;
        document.getElementById('editProductGender').value = product.gender;
        document.getElementById('editProductSize').value = Array.isArray(product.size) 
                                                     ? product.size.join('-') 
                                                     : product.size;
        document.getElementById('editProductColor').value = Array.isArray(product.color) 
                                                     ? product.color.join('-') 
                                                     : product.color;
        document.getElementById('editProductDesc').value = product.description || "none";
        document.getElementById('editProductInventory').value = product.inventory || 0;

        // Render images
        const gallery = document.getElementById('editImageGallery');
        console.log(product);
        gallery.innerHTML = product["img-link-list"].map((img) => `
          <div class="gallery-item" style="position: relative;">
            <img src="${img}" alt="">
            <button type="button" onclick="this.parentElement.remove()" 
              style="position: absolute; top: 0; right: 0; background: red; color: white; border: none; cursor: pointer; padding: 5px;">
              Xóa
            </button>
          </div>
        `).join('');

        console.log(product["img-link-list"]);
        currentProductImages = [...product["img-link-list"]];
        document.getElementById('editProductFormModal').classList.add('active');
      };

      const closeEditProductForm = () => {
        document.getElementById('editProductFormModal').classList.remove('active');
        currentEditProductId = null;
        currentProductImages = [];
      };

      document.getElementById('editProductImageInput').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          const base64 = await fileToBase64(file);
          currentProductImages.push(base64);
          
          const gallery = document.getElementById('editImageGallery');
          const div = document.createElement('div');
          div.className = 'gallery-item';
          div.style.position = 'relative';
          div.innerHTML = `
            <img src="${base64}" alt="">
            <button type="button" onclick="this.parentElement.remove()" 
              style="position: absolute; top: 0; right: 0; background: red; color: white; border: none; cursor: pointer; padding: 5px;">
              Xóa
            </button>
          `;
          gallery.appendChild(div);
        }
      });

      document.getElementById('cancelEditBtn').addEventListener('click', closeEditProductForm);
      
      document.getElementById('editProductFormModal').addEventListener('click', function(e) {
        if (e.target === this) closeEditProductForm();
      });

      document.getElementById('editProductForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const idx = this.allProducts.findIndex(p => p.id === currentEditProductId);

        if (idx !== -1) {
          this.allProducts[idx] = {
            ...this.allProducts[idx],
            name: document.getElementById('editProductName').value,
            category: document.getElementById('editProductCategory').value,
            gender: document.getElementById('editProductGender').value,
            size: ConvertInputToInt(document.getElementById('editProductSize').value),
            color: ConvertInputToString(document.getElementById('editProductColor').value),
            description: document.getElementById('editProductDesc').value,
            inventory: parseInt(document.getElementById('editProductInventory').value) || 0,
            "img-link-list": currentProductImages,
            "img-represent": currentProductImages[0]
          };

          localStorage.setItem('allProduct', JSON.stringify(this.allProducts));
          console.log('Sản phẩm đã cập nhật');
          alert('Cập nhật sản phẩm thành công!');
          closeEditProductForm();
          this.renderProductTable();
          this.renderPagination();
        }
      });

      // ===== XÓA SẢN PHẨM =====
      const openDeleteModal = (productId, productName, productImg) => {
        currentDeleteProductId = productId;
        document.getElementById('deleteProductId').textContent = productId;
        document.getElementById('deleteProductName').textContent = productName;
        document.getElementById('deleteProductImg').src = productImg;
        document.getElementById('deleteModal').classList.add('active');
      };

      const closeDeleteModal = () => {
        document.getElementById('deleteModal').classList.remove('active');
        currentDeleteProductId = null;
      };

      const confirmDelete = () => {
        const idx = this.allProducts.findIndex(p => p.id === currentDeleteProductId);
        if (idx !== -1) {
          this.allProducts.splice(idx, 1);
          localStorage.setItem('allProduct', JSON.stringify(this.allProducts));
        }

        console.log('Xóa sản phẩm:', currentDeleteProductId);
        alert('Sản phẩm ' + currentDeleteProductId + ' đã được xóa');
        closeDeleteModal();
        this.renderProductTable();
        this.renderPagination();
      };

      document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
      document.getElementById('confirmDeleteBtn').addEventListener('click', () => confirmDelete.call(this));
      
      document.getElementById('deleteModal').addEventListener('click', function(e) {
        if (e.target === this) closeDeleteModal();
      });

      // ===== INVENTORY MODAL =====
      const openInventoryModal = (productId, productName, productDesc) => {
        if (productName) {
          document.getElementById('productNameInventory').textContent = productName;
        }
        if (productDesc) {
          document.getElementById('productDescInventory').textContent = productDesc;
        }
        document.getElementById('inventoryModal').classList.add('active');
      };

      const closeInventoryModal = () => {
        document.getElementById('inventoryModal').classList.remove('active');
      };

      const filterInventoryData = () => {
        const startDate = document.getElementById('filterStartDate').value;
        const endDate = document.getElementById('filterEndDate').value;
        
        if (!startDate || !endDate) {
          alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc');
          return;
        }
        
        console.log('Lọc từ:', startDate, 'Đến:', endDate);
        alert('Đã lọc dữ liệu từ ' + startDate + ' đến ' + endDate);
      };

      const addInventoryRecord = () => {
        console.log('Thêm bản ghi nhập xuất kho');
        alert('Đã thêm bản ghi nhập xuất kho thành công!');
        closeInventoryModal();
      };

      document.getElementById('cancelInventoryBtn').addEventListener('click', closeInventoryModal);
      document.getElementById('confirmInventoryBtn').addEventListener('click', addInventoryRecord);
      document.getElementById('filterInventoryBtn').addEventListener('click', filterInventoryData);
      
      document.getElementById('inventoryModal').addEventListener('click', function(e) {
        if (e.target === this) closeInventoryModal();
      });

      // ===== ESC KEY HANDLER =====
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeAllModals();
      });

      // ===== EXPOSE FUNCTIONS FOR DYNAMIC TABLE ROWS =====
      window.openEditProductForm = (id) => openEditProductForm.call(this, id);
      window.openDeleteModal = openDeleteModal;
      window.openInventoryModal = openInventoryModal;
      window.goToPage = (page) => this.goToPage(page);
    },

    // ===== LOAD PRODUCTS FROM LOCALSTORAGE =====
    loadProducts: function() {
      const stored = localStorage.getItem('allProduct');
      if (stored) {
        this.allProducts = JSON.parse(stored);
      }
    },

    // ===== PAGINATION FUNCTIONS =====
    goToPage: function(page) {
      this.currentPage = page;
      this.renderProductTable();
      this.renderPagination();
    },

    getTotalPages: function() {
      return Math.ceil(this.allProducts.length / this.productsPerPage);
    },

    getPaginatedProducts: function() {
      const startIdx = (this.currentPage - 1) * this.productsPerPage;
      const endIdx = startIdx + this.productsPerPage;
      return this.allProducts.slice(startIdx, endIdx);
    },

    // ===== RENDER PAGINATION BUTTONS =====
    renderPagination: function() {
      const totalPages = this.getTotalPages();
      const container = document.getElementById('paginationContainer');
      let html = '';

      // Nút Previous
      if (this.currentPage > 1) {
        html += `<button onclick="goToPage(${this.currentPage - 1})" style="margin-right: 5px;">←</button>`;
      }

      // Nút số trang
      for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === this.currentPage ? 'active' : '';
        html += `<button onclick="goToPage(${i})" class="${activeClass}">${i}</button>`;
      }

      // Nút Next
      if (this.currentPage < totalPages) {
        html += `<button onclick="goToPage(${this.currentPage + 1})" style="margin-left: 5px;">→</button>`;
      }

      container.innerHTML = html;
    },

    // ===== RENDER PRODUCT TABLE =====
    renderProductTable: function() {
      const products = this.getPaginatedProducts();
      const tbody = document.getElementById('productTableBody');
      
      tbody.innerHTML = products.map(product => `
        <tr>
          <td><img src="../icon/show.png" alt="" class="show-hide-icon hide-icon-js" /></td>
          <td>${product.id}</td>
          <td>
            <div class="product-container">
              <img src="${product["img-represent"]}" alt="" class="product-img" style="max-width: 50px;">
              ${product.name}
            </div>
          </td>
          <td>${product.inventory}</td>
          <td>${product.category}</td>
          <td class="show-text">Đang hiển thị</td>
          <td class="action">
            <img src="../icon/Time Machine.png" alt="" style="cursor: pointer;" onclick="openInventoryModal('${product.id}', '${product.name}', 'Lịch sử: Nhập - Xuất - Tồn')">
            <button class="btn btn-lock" onclick="openDeleteModal('${product.id}', '${product.name}', '${product.img}')">Xóa</button>
            <button class="btn btn-reset" onclick="openEditProductForm('${product.id}')">Sửa</button>
          </td>
        </tr>
      `).join('');
    }
}
function ConvertInputToInt(string){
  return string.split('-').map(Number);
}
function ConvertInputToString(string){
  return string.split('-');
}