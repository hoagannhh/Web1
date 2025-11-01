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
          <div class="pagination-container">
            <button class="active">1</button>
            <button>2</button>
            <button>3</button>
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
                  <div class="image-box" onclick="document.querySelector('#productFormModal input[type=file]').click()">
                    <div class="image-icon">🖼️</div>
                  </div>
                  <input type="file" style="display: none;" accept="image/*">
                  <a href="#" class="help-text" onclick="event.preventDefault()">Tải ảnh lên hoặc kéo và thả</a>
                </div>

                <div class="form-group">
                  <label>Giới tính</label>
                  <input type="text" placeholder="">
                </div>

                <div class="form-group">
                  <label>Size</label>
                  <input type="text" placeholder="">
                </div>

                <div class="form-group">
                  <label>Màu sắc</label>
                  <input type="text" placeholder="">
                </div>
              </div>

              <div class="right-column">
                <div class="form-group">
                  <label>Mã sản phẩm</label>
                  <input type="text" placeholder="">
                </div>

                <div class="form-group">
                  <label>Tên sản phẩm</label>
                  <input type="text" placeholder="">
                </div>

                <div class="form-group">
                  <label>Loại sản phẩm</label>
                  <select>
                    <option value="">Chọn loại</option>
                    <option value="1">Men's</option>
                    <option value="2">Women's</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Mô tả</label>
                  <textarea placeholder=""></textarea>
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
                  <div class="image-gallery">
                    <div class="gallery-item">
                      <img src="../product-img/s1/ms1-1.png" alt="">
                    </div>
                    <div class="gallery-item">
                      <img src="../product-img/s1/ms1-2.png" alt="">
                    </div>
                    <div class="gallery-item">
                      <img src="../product-img/s1/ms1-3.png" alt="">
                    </div>
                    <div class="gallery-item">
                      <img src="../product-img/s1/ms1-4.png" alt="">
                    </div>
                    <div class="gallery-item">
                      <img src="../product-img/s1/ms1-5.png" alt="">
                    </div>
                  </div>
                  <a href="#" class="help-text" onclick="event.preventDefault()">Tải ảnh lên hoặc kéo và thả</a>
                </div>

                <div class="edit-form-group">
                  <label>Size</label>
                  <input type="text" value="">
                </div>

                <div class="edit-form-group">
                  <label>Màu sắc</label>
                  <input type="text" value="">
                </div>

                <div class="edit-form-group">
                  <label>Giới tính</label>
                  <input type="text" value="">
                </div>
              </div>

              <div class="right-column">
                <div class="edit-form-group">
                  <label>Mã sản phẩm</label>
                  <input type="text" value="s1">
                </div>

                <div class="edit-form-group">
                  <label>Tên sản phẩm</label>
                  <input type="text" value="Air Jordan 4 RM">
                </div>

                <div class="edit-form-group">
                  <label>Loại sản phẩm</label>
                  <select>
                    <option value="nam" selected>Nam</option>
                    <option value="men">Men's</option>
                    <option value="women">Women's</option>
                  </select>
                </div>

                <div class="edit-form-group">
                  <label>Mô tả</label>
                  <textarea>Đôi giày sneaker này tái hiện lại chiếc AJ4 để nhận biết ngay lập tức dành cho cuộc sống năng động. Chúng tôi tập trung vào sự thoải mái và bền bỉ trong khi vẫn giữ được vẻ ngoài có diện</textarea>
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

    init: function() {
      // Render modals vào container
      const modalsContainer = document.getElementById('modalsContainer');
      modalsContainer.innerHTML = 
        this.modals.productForm + 
        this.modals.editForm + 
        this.modals.deleteModal + 
        this.modals.inventoryModal;

      // Render product table
      this.renderProductTable();

      let currentDeleteProductId = null;

      // ===== HELPER FUNCTIONS =====
      const closeAllModals = () => {
        document.getElementById('productFormModal').classList.remove('active');
        document.getElementById('editProductFormModal').classList.remove('active');
        document.getElementById('deleteModal').classList.remove('active');
        document.getElementById('inventoryModal').classList.remove('active');
      };

      // ===== THÊM SẢN PHẨM =====
      const openProductForm = () => {
        document.getElementById('productFormModal').classList.add('active');
      };

      const closeProductForm = () => {
        document.getElementById('productFormModal').classList.remove('active');
      };

      document.getElementById('addProductBtn').addEventListener('click', openProductForm);
      document.getElementById('cancelProductBtn').addEventListener('click', closeProductForm);
      
      document.getElementById('productFormModal').addEventListener('click', function(e) {
        if (e.target === this) closeProductForm();
      });

      document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form thêm sản phẩm submitted');
        closeProductForm();
      });

      // ===== SỬA SẢN PHẨM =====
      const openEditProductForm = () => {
        document.getElementById('editProductFormModal').classList.add('active');
      };

      const closeEditProductForm = () => {
        document.getElementById('editProductFormModal').classList.remove('active');
      };

      document.getElementById('cancelEditBtn').addEventListener('click', closeEditProductForm);
      
      document.getElementById('editProductFormModal').addEventListener('click', function(e) {
        if (e.target === this) closeEditProductForm();
      });

      document.getElementById('editProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form sửa sản phẩm submitted');
        closeEditProductForm();
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
        console.log('Xóa sản phẩm:', currentDeleteProductId);
        alert('Sản phẩm ' + currentDeleteProductId + ' đã được xóa');
        closeDeleteModal();
      };

      document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
      document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);
      
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
      window.openEditProductForm = openEditProductForm;
      window.openDeleteModal = openDeleteModal;
      window.openInventoryModal = openInventoryModal;
    },

    // ===== RENDER PRODUCT TABLE =====
    renderProductTable: function() {
      const products = [
        { id: 's1', name: 'Air Jordan 4 RM', img: '../product-img/s1/ms1-1.png', inventory: 100, category: "Men's" },
        { id: 's2', name: 'Handball Spezial', img: '../product-img/s2/ms2-1.png', inventory: 100, category: "Men's" },
        { id: 's3', name: 'Chuck 70', img: '../product-img/s3/ms3-1.png', inventory: 100, category: "Women's" },
        { id: 's4', name: 'Classic Slip-On Checkerboard Shoe', img: '../product-img/s4/ms4-1.png', inventory: 100, category: "Men's" },
        { id: 's5', name: 'Bella UT Femme', img: '../product-img/s5/ms5-1.png', inventory: 100, category: "Men's" }
      ];

      const tbody = document.getElementById('productTableBody');
      tbody.innerHTML = products.map(product => `
        <tr>
          <td><img src="../icon/show.png" alt="" class="show-hide-icon hide-icon-js" /></td>
          <td>${product.id}</td>
          <td>
            <div class="product-container">
              <img src="${product.img}" alt="" class="product-img">
              ${product.name}
            </div>
          </td>
          <td>${product.inventory}</td>
          <td>${product.category}</td>
          <td class="show-text">Đang hiển thị</td>
          <td class="action">
            <img src="../icon/Time Machine.png" alt="" style="cursor: pointer;" onclick="openInventoryModal('${product.id}', '${product.name}', 'Lịch sử: Nhập - Xuất - Tồn')">
            <button class="btn btn-lock" onclick="openDeleteModal('${product.id}', '${product.name}', '${product.img}')">Xóa</button>
            <button class="btn btn-reset" onclick="openEditProductForm()">Sửa</button>
          </td>
        </tr>
      `).join('');
    }
}