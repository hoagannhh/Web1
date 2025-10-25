// --- BƯỚC 1: LẤY CÁC PHẦN TỬ CỐ ĐỊNH ---
    const popup = document.querySelector(".popup-bc");
    const popupContentContainer = document.querySelector(".popup-content");
    const addButton = document.querySelector(".add-btn");
    const tableContainer = document.querySelector(".category-table-container");
    
    // <-- PHẦN PHÂN TRANG: Lấy container
    const paginationContainer = document.querySelector(".pagination-container");

    // --- 2: BIẾN TRẠNG THÁI ---
    let categoriesData = []; 
    let elementIndexToChange = null;
    
    // <-- PHẦN PHÂN TRANG: Thêm biến cho trang
    let currentPage = 1;
    const rowsPerPage = 5; // <-- Bạn có thể đổi số hàng mỗi trang ở đây

    // --- 3: NỘI DUNG HTML CHO CÁC POPUP ---
    // (Dán 5 biến const HTML của bạn vào đây: popupContentHide, v.v...)
    const popupContentHide = `<div class="popup-content-header">
      <div class="popup-hide-icon">
        <img src="../icon/hide.png" alt="" />
      </div>
      <h2>Ẩn loại sản phẩm</h2>
      <div class="category-data">{{CATEGORY_NAME}}</div>
    </div>
    <div class="popup-content-text">
      <p>
        Bạn có chắc chắn ẩn loại sản phẩm này?
        <br />Người dùng sẽ không thể thấy loại sản phẩm này. Bạn có thể
        hiển thị lại sau
      </p>
    </div>
    <div class="popup-content-footer">
      <button class="cancel-button">Hủy</button>
      <button class="confirm-btn action-hide">Xác nhận ẩn</button>
    </div>`;
    const popupContentShow = `<div class="popup-content-header">
      <div class="popup-hide-icon">
        <img src="../icon/show.png" alt="" />
      </div>
      <h2>Hiện loại sản phẩm</h2>
      <div class="category-data">{{CATEGORY_NAME}}</div>
    </div>
    <div class="popup-content-text">
      <p>
        Bạn có chắc chắn hiện loại sản phẩm này?
        <br />Loại sản phẩm này sẽ được hiển thị lại với khách hàng.
      </p>
    </div>
    <div class="popup-content-footer">
      <button class="cancel-button">Hủy</button>
      <button class="confirm-btn action-show">Xác nhận hiện</button>
    </div>`;
    const popupContentDelete = `<div class="popup-content-header">
      <div class="popup-delete-icon">
        <img
          src="../icon/Delete.png"
          alt=""
          style="background-color: #ffdddd"
        />
      </div>
      <h2 style="color: #eb3223">Xóa loại sản phẩm</h2>
      <div class="category-data">{{CATEGORY_NAME}}</div>
    </div>
    <div class="popup-content-text">
      <p>
        Hành động này không thể hoàn tác. Tất cả sản phẩm thuộc loại này có
        thể sẽ bị ảnh hưởng. Bạn có chắc chắn muốn xóa?
      </p>
    </div>
    <div class="popup-content-footer">
      <button class="cancel-button">Hủy</button>
      <button
        class="confirm-btn action-delete"
        style="background-color: #af0000; border: 1px solid #ff6060"
      >
        Xác nhận xóa
      </button>
    </div>`;
    const popupContentEdit = `<div class="popup-content-header">
      <div class="popup-fix-icon">
        <img src="../icon/fix.png" alt="" style="background-color: #FFF3DD;"/>
      </div>
      <h2 style="color: #FFD900;">Sửa loại sản phẩm</h2>
      <div class="category-data">{{CATEGORY_NAME}}</div>
    </div>
    <div class="popup-content-input">
      <label for="category-name-input">Tên loại sản phẩm</label>
      <input type="text" id="category-name-input" placeholder="{{CATEGORY_NAME}}" />
    </div>
    <div class="popup-content-footer">
      <button class="cancel-button">Hủy</button>
      <button class="confirm-btn action-edit" style="background-color: #FFD900; border: 1px solid #CBB63F">Xác nhận sửa</button>
    </div>`;
    const popupContentAdd = `<div class="popup-content-header" style="justify-content: start; ">
      <div class="popup-hide-icon">
        <img src="../icon/roundadd.png" alt="" />
      </div>
      <h2 style = "margin-left: 40px;">Thêm loại sản phẩm</h2>
    </div>
    <div class="popup-content-input">
      <label for="category-name-input">Tên loại sản phẩm</label>
      <input type="text" id="category-name-input" placeholder="" class = "add-input"/>
    </div>
    <div class="popup-content-footer">
      <button class="cancel-button">Hủy</button>
      <button class="confirm-btn action-add" >Xác nhận thêm</button>
    </div>`;


    // --- 4. HÀM "VẼ BẢNG" (RENDER) ---
    // <-- SỬA: Hàm này giờ nhận tham số "page"
    function renderTable(page = 1) {
      currentPage = page; // Cập nhật trang hiện tại

      // Tính toán các mục cho trang này
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      
      // <-- SỬA: Chỉ lấy dữ liệu cho trang hiện tại
      const paginatedData = categoriesData.slice(startIndex, endIndex);

      // 1. Tạo các hàng <tr> từ mảng dữ liệu đã lọc
      const tableBodyHTML = paginatedData
        .map((category) => {
          // ... (Toàn bộ logic .map() của bạn giữ nguyên) ...
          const statusIcon = category.isShown ? "show.png" : "hide.png";
          const statusText = category.isShown ? "Đang hiển thị" : "Ẩn";
          const statusClass = category.isShown ? "show-text" : "hide-text";

          const iconHTML = category.manageable
            ? `<td>
                <img
                  src="../icon/${statusIcon}"
                  alt=""
                  class="show-hide-icon toggle-status-icon"
                />
              </td>`
            : "<td></td>";

          const actionHTML = category.manageable
            ? `<td>
                <button class="btn btn-lock">Xóa</button>
                <button class="btn btn-reset">Sửa</button>
              </td>`
            : "<td></td>";

          return `
            <tr>
              ${iconHTML}
              <td class="category-name">${category.name}</td>
              <td>${category.quantity}</td>
              <td class="${statusClass}">${statusText}</td>
              ${actionHTML}
            </tr>
          `;
        })
        .join("");

      // 2. Tạo bảng hoàn chỉnh
      const fullTableHTML = `
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${tableBodyHTML}
          </tbody>
        </table>
      `;

      // 3. Chèn bảng vào DOM
      tableContainer.innerHTML = fullTableHTML;
      
      // <-- PHẦN PHÂN TRANG: Gọi hàm "vẽ" các nút
      renderPagination();
    }
    
    // --- 4.5. HÀM "VẼ PHÂN TRANG" (MỚI) ---
    function renderPagination() {
      const totalPages = Math.ceil(categoriesData.length / rowsPerPage);
      let paginationHTML = "";

      // --- THÊM NÚT "TRƯỚC" (PREVIOUS) ---
      paginationHTML += `
        <button 
          class="page-btn prev-btn" 
          ${currentPage === 1 ? 'disabled' : ''}
        >
          &lt;
        </button>
      `;

      // Tạo các nút số trang
      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
          <button 
            class="page-btn ${i === currentPage ? 'active' : ''}" 
            data-page="${i}"
          >
            ${i}
          </button>
        `;
      }
      
      // --- THÊM NÚT "SAU" (NEXT) ---
      paginationHTML += `
        <button 
          class="page-btn next-btn" 
          ${currentPage === totalPages ? 'disabled' : ''}
        >
          &gt;
        </button>
      `;

      paginationContainer.innerHTML = paginationHTML;
    }

    // --- 5. HÀM MỞ POPUP ---
    function openPopup(htmlContent, categoryName = "") {
      if (popupContentContainer) {
        let dynamicHTML = htmlContent.replace(/{{CATEGORY_NAME}}/g, categoryName);
        popupContentContainer.innerHTML = dynamicHTML;
      }
      popup.classList.add("popup-show");
    }

    // --- 6. HÀM LƯU VÀO LOCALSTORAGE ---
    function saveDataToLocalStorage() {
      localStorage.setItem('categoriesDB', JSON.stringify(categoriesData));
    }
    
    // --- 7. HÀM TẢI DỮ LIỆU BAN ĐẦU (FETCH) ---
    async function loadInitialData() {
      const storedData = localStorage.getItem('categoriesDB');
      
      if (storedData) {
        console.log("Đã tải dữ liệu từ localStorage.");
        return JSON.parse(storedData); // Dùng dữ liệu đã lưu
      } else {
        console.log("LocalStorage trống. Đang tải từ file JSON...");
        try {
          // !!! QUAN TRỌNG: HÃY SỬA ĐƯỜNG DẪN NÀY CHO ĐÚNG !!!
          const response = await fetch('../data/categories.json'); // Ví dụ: './categories.json'
          
          if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
          }
          
          const data = await response.json();
          return data.categories; // Giả sử file JSON có dạng {"categories": [...]}

        } catch (error) {
          console.error("Không thể tải file JSON:", error);
          return []; 
        }
      }
    }
    
    // --- 8. HÀM GÁN CÁC SỰ KIỆN ---
    function attachEventListeners() {
      // Gán sự kiện cho NÚT "THÊM"
      addButton.addEventListener("click", () => {
        elementIndexToChange = -1; 
        openPopup(popupContentAdd, "");
      });

      // GÁN SỰ KIỆN CHO CẢ BẢNG (EVENT DELEGATION)
      tableContainer.addEventListener("click", (event) => {
        const target = event.target;
        const row = target.closest("tr");
        if (!row) return;

        // <-- SỬA: Tính toán rowIndex dựa trên trang hiện tại
        const allVisibleRows = Array.from(tableContainer.querySelectorAll("tbody tr"));
        const visibleRowIndex = allVisibleRows.indexOf(row);
        // Tính index thật trong mảng categoriesData
        const rowIndex = (currentPage - 1) * rowsPerPage + visibleRowIndex;
        
        const category = categoriesData[rowIndex];
        if (!category) return;

        // Lưu index thật
        elementIndexToChange = rowIndex;

        // Logic "Toggle" (Ẩn/Hiện)
        if (target.classList.contains("toggle-status-icon")) {
          if (category.isShown) {
            openPopup(popupContentHide, category.name);
          } else {
            openPopup(popupContentShow, category.name);
          }
        }

        // Logic Xóa
        if (target.classList.contains("btn-lock")) {
          openPopup(popupContentDelete, category.name);
        }

        // Logic Sửa
        if (target.classList.contains("btn-reset")) {
          openPopup(popupContentEdit, category.name);
          const input = popupContentContainer.querySelector("#category-name-input");
          if (input) {
            input.value = category.name;
          }
        }
        
      });
      paginationContainer.addEventListener("click", (event) => {
        const target = event.target;

        // Nếu click vào nút SỐ TRANG
        if (target.classList.contains("page-btn") && target.dataset.page) {
          const page = Number(target.dataset.page);
          renderTable(page);
        }
        
        // Nếu click vào nút TRƯỚC
        if (target.classList.contains("prev-btn")) {
          renderTable(currentPage - 1);
        }

        // Nếu click vào nút SAU
        if (target.classList.contains("next-btn")) {
          renderTable(currentPage + 1);
        }
      });
      // (Xóa hàm click của paginationContainer vì đã gán sự kiện trực tiếp)

      // GÁN SỰ KIỆN CHO POPUP (EVENT DELEGATION)
      popup.addEventListener("click", (event) => {
        const target = event.target;

        // A. Hành động HỦY
        if (target.classList.contains("cancel-button") || target === popup) {
          popup.classList.remove("popup-show");
          elementIndexToChange = null;
          return;
        }

        // B. Hành động XÁC NHẬN
        if (target.classList.contains("confirm-btn")) {
          const action = target.classList[1];
          const newNameInput = popup.querySelector("#category-name-input");
          const newName = newNameInput ? newNameInput.value : null;

          // Biến tạm để quyết định render lại trang nào
          let pageToRender = currentPage;

          // THAY ĐỔI DỮ LIỆU TRONG MẢNG
          switch (action) {
            case 'action-hide':
              categoriesData[elementIndexToChange].isShown = false;
              break;
            case 'action-show':
              categoriesData[elementIndexToChange].isShown = true;
              break;
            case 'action-delete':
              categoriesData.splice(elementIndexToChange, 1);
              // Kiểm tra nếu trang hiện tại bị rỗng
              const totalPages = Math.ceil(categoriesData.length / rowsPerPage);
              if(currentPage > totalPages && totalPages > 0) {
                pageToRender = totalPages; // Quay về trang cuối
              }
              break;
            case 'action-edit':
              if (newName) {
                categoriesData[elementIndexToChange].name = newName;
              }
              break;
            case 'action-add':
              if (newName) {
                categoriesData.push({
                  name: newName,
                  quantity: 0,
                  isShown: false,
                  manageable: true
                });
                // Tự động đi đến trang cuối
                pageToRender = Math.ceil(categoriesData.length / rowsPerPage);
              }
              break;
          }

          // SAU KHI SỬA DỮ LIỆU
          saveDataToLocalStorage(); 
          renderTable(pageToRender); // "Vẽ" lại bảng
          popup.classList.remove("popup-show");
          elementIndexToChange = null;
        }
      });

      // LOGIC SIDEBAR
      // (Bạn có thể đặt code sidebar của bạn ở đây)
    }

    // --- 9. HÀM CHẠY CHÍNH (MAIN) ---
    async function initializeApp() {
      // 1. Lấy dữ liệu
      categoriesData = await loadInitialData();
      
      // 2. "Vẽ" bảng lần đầu tiên (vẽ trang 1)
      renderTable(1); 
      
      // 3. Gán tất cả các sự kiện
      attachEventListeners();
    }

    // --- 10. KHỞI CHẠY ỨNG DỤNG ---
    initializeApp();

    // --- 11. LOGIC SIDEBAR ---
    // (Bạn nên đặt code này bên ngoài hàm attachEventListeners
    //  để nó chạy ngay khi DOM tải xong)
    document.addEventListener("DOMContentLoaded", function () {
      const allButtons = document.querySelectorAll(".sidebar-button");
      allButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          allButtons.forEach(function (btn) {
            btn.classList.remove("active");
          });
          this.classList.add("active");
        });
      });
    });