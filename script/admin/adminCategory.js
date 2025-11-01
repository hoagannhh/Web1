export const AdminCategory = {
  html: `
    <div class="main-content">
      <div class="header">
        <div class="left-header">
          <div><p>Category</p></div>
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
      <div class="category-table-container"></div>
      <div class="category-footer">
        <button class="add-btn">
          <img src="../icon/add.png" alt="" style="width: 30px" />
          <span style="padding-top: 2px">Thêm loại mới</span>
        </button>
        <div class="pagination-container"></div>
      </div>
      
      <!-- POPUP -->
      <div class="popup-bc">
        <div class="popup-content"></div>
      </div>
    </div>
  `,
  css: `../css/adminCategory.css`,
  canDeleteCss: true,
  
  init: function() {
    console.log("Initializing AdminCategory");
    
    // =========================================
    // 1. KHAI BÁO BIẾN
    // =========================================
    let categoriesData = [];
    let elementIndexToChange = null;
    let currentPage = 1;
    const rowsPerPage = 5;
    
    // Lấy các phần tử DOM
    const popup = document.querySelector(".popup-bc");
    const popupContentContainer = document.querySelector(".popup-content");
    const addButton = document.querySelector(".add-btn");
    const tableContainer = document.querySelector(".category-table-container");
    const paginationContainer = document.querySelector(".pagination-container");
    
    // Kiểm tra các phần tử có tồn tại không
    if (!popup || !popupContentContainer || !addButton || !tableContainer || !paginationContainer) {
      console.error("Không tìm thấy các phần tử DOM cần thiết!");
      return;
    }
    
    // =========================================
    // 2. NỘI DUNG POPUP HTML
    // =========================================
    const popupContentHide = `
      <div class="popup-content-header">
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
      </div>
    `;
    
    const popupContentShow = `
      <div class="popup-content-header">
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
      </div>
    `;
    
    const popupContentDelete = `
      <div class="popup-content-header">
        <div class="popup-delete-icon">
          <img src="../icon/Delete.png" alt="" style="background-color: #ffdddd" />
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
        <button class="confirm-btn action-delete" style="background-color: #af0000; border: 1px solid #ff6060">
          Xác nhận xóa
        </button>
      </div>
    `;
    
    const popupContentEdit = `
      <div class="popup-content-header">
        <div class="popup-fix-icon">
          <img src="../icon/fix.png" alt="" style="background-color: #FFF3DD;"/>
        </div>
        <h2 style="color: #FFD900;">Sửa loại sản phẩm</h2>
      </div>
      <div class="popup-content-input">
        <label for="category-name-input">Tên loại sản phẩm</label>
        <input type="text" id="category-name-input" value="{{CATEGORY_NAME}}" />
      </div>
      <div class="popup-content-footer">
        <button class="cancel-button">Hủy</button>
        <button class="confirm-btn action-edit" style="background-color: #FFD900; border: 1px solid #CBB63F">
          Xác nhận sửa
        </button>
      </div>
    `;
    
    const popupContentAdd = `
      <div class="popup-content-header" style="justify-content: start;">
        <div class="popup-hide-icon">
          <img src="../icon/roundadd.png" alt="" />
        </div>
        <h2 style="margin-left: 40px;">Thêm loại sản phẩm</h2>
      </div>
      <div class="popup-content-input">
        <label for="category-name-input">Tên loại sản phẩm</label>
        <input type="text" id="category-name-input" placeholder="Nhập tên loại sản phẩm" class="add-input"/>
      </div>
      <div class="popup-content-footer">
        <button class="cancel-button">Hủy</button>
        <button class="confirm-btn action-add">Xác nhận thêm</button>
      </div>
    `;
    
    // =========================================
    // 3. HÀM RENDER BẢNG
    // =========================================
    function renderTable(page = 1) {
      currentPage = page;
      
      // Tính toán phân trang
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const paginatedData = categoriesData.slice(startIndex, endIndex);
      
      // Tạo các hàng table
      const tableBodyHTML = paginatedData
        .map((category, index) => {
          const statusIcon = category.isShown ? "show.png" : "hide.png";
          const statusText = category.isShown ? "Đang hiển thị" : "Ẩn";
          const statusClass = category.isShown ? "show-text" : "hide-text";
          
          const iconHTML = category.manageable
            ? `<td>
                <img
                  src="../icon/${statusIcon}"
                  alt=""
                  class="show-hide-icon toggle-status-icon"
                  data-index="${startIndex + index}"
                />
              </td>`
            : "<td></td>";
          
          const actionHTML = category.manageable
            ? `<td>
                <button class="btn btn-lock" data-index="${startIndex + index}">Xóa</button>
                <button class="btn btn-reset" data-index="${startIndex + index}">Sửa</button>
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
      
      // Tạo bảng hoàn chỉnh
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
      
      tableContainer.innerHTML = fullTableHTML;
      renderPagination();
    }
    
    // =========================================
    // 4. HÀM RENDER PHÂN TRANG
    // =========================================
    function renderPagination() {
      const totalPages = Math.ceil(categoriesData.length / rowsPerPage);
      let paginationHTML = "";
      
      // Nút Previous
      paginationHTML += `
        <button 
          class="page-btn prev-btn" 
          ${currentPage === 1 ? 'disabled' : ''}
        >
          &lt;
        </button>
      `;
      
      // Nút số trang
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
      
      // Nút Next
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
    
    // =========================================
    // 5. HÀM MỞ POPUP
    // =========================================
    function openPopup(htmlContent, categoryName = "") {
      let dynamicHTML = htmlContent.replace(/{{CATEGORY_NAME}}/g, categoryName);
      popupContentContainer.innerHTML = dynamicHTML;
      popup.classList.add("popup-show");
    }
    
    // =========================================
    // 6. HÀM LƯU VÀO LOCALSTORAGE
    // =========================================
    function saveDataToLocalStorage() {
      localStorage.setItem('categoriesDB', JSON.stringify(categoriesData));
    }
    
    // =========================================
    // 7. HÀM TẢI DỮ LIỆU
    // =========================================
    async function loadInitialData() {
      try {
        // 1. Luôn load data từ JSON trước (base data)
        console.log("Đang tải dữ liệu từ file JSON...");
        const response = await fetch('../data/category.json');
        
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        
        const data = await response.json();
        let categoriesFromJSON = data.categories || [];
        console.log("Đã load từ JSON:", categoriesFromJSON);
        
        // 2. Kiểm tra localStorage
        const storedData = localStorage.getItem('categoriesDB');
        
        if (storedData) {
          console.log("Phát hiện dữ liệu trong localStorage, đang merge...");
          const categoriesFromLocalStorage = JSON.parse(storedData);
          
          // 3. Tạo Map để dễ tìm kiếm theo tên
          const jsonMap = new Map();
          categoriesFromJSON.forEach(cat => {
            jsonMap.set(cat.name, cat);
          });
          
          // 4. Merge: Cập nhật thông tin từ localStorage vào JSON data
          categoriesFromLocalStorage.forEach(localCat => {
            if (jsonMap.has(localCat.name)) {
              // Category đã tồn tại trong JSON -> cập nhật thông tin từ localStorage
              const index = categoriesFromJSON.findIndex(c => c.name === localCat.name);
              if (index !== -1) {
                // Giữ lại các thay đổi từ localStorage (isShown, quantity...)
                categoriesFromJSON[index] = {
                  ...categoriesFromJSON[index],
                  ...localCat
                };
              }
            } else {
              // Category không có trong JSON -> là category mới do user thêm
              categoriesFromJSON.push(localCat);
            }
          });
          
          console.log("Đã merge dữ liệu:", categoriesFromJSON);
        } else {
          console.log("LocalStorage trống, sử dụng dữ liệu từ JSON.");
        }
        
        // 5. Lưu lại vào localStorage sau khi merge
        localStorage.setItem('categoriesDB', JSON.stringify(categoriesFromJSON));
        
        return categoriesFromJSON;
        
      } catch (error) {
        console.error("Không thể tải file JSON:", error);
        
        // Fallback: Nếu lỗi, thử load từ localStorage
        const storedData = localStorage.getItem('categoriesDB');
        if (storedData) {
          console.log("Sử dụng dữ liệu từ localStorage do lỗi load JSON.");
          return JSON.parse(storedData);
        }
        
        // Trả về dữ liệu mẫu nếu không có gì
        console.log("Sử dụng dữ liệu mẫu.");
        return [
          { name: "Nam", quantity: 1000, isShown: true, manageable: true },
          { name: "Nữ", quantity: 1000, isShown: true, manageable: true },
          { name: "Trẻ em", quantity: 1000, isShown: true, manageable: true },
          { name: "Mùa Thu", quantity: 0, isShown: true, manageable: true },
          { name: "Christmas", quantity: 0, isShown: false, manageable: true }
        ];
      }
    }
    
    // =========================================
    // 8. HÀM GÁN SỰ KIỆN
    // =========================================
    function attachEventListeners() {
      // Sự kiện nút THÊM
      addButton.addEventListener("click", () => {
        elementIndexToChange = -1;
        openPopup(popupContentAdd, "");
      });
      
      // Sự kiện cho TABLE (Event Delegation)
      tableContainer.addEventListener("click", (event) => {
        const target = event.target;
        
        // Lấy index từ data-attribute
        const index = target.dataset.index;
        if (index === undefined) return;
        
        const rowIndex = parseInt(index);
        const category = categoriesData[rowIndex];
        if (!category) return;
        
        elementIndexToChange = rowIndex;
        
        // Toggle status (Ẩn/Hiện)
        if (target.classList.contains("toggle-status-icon")) {
          if (category.isShown) {
            openPopup(popupContentHide, category.name);
          } else {
            openPopup(popupContentShow, category.name);
          }
        }
        
        // Xóa
        if (target.classList.contains("btn-lock")) {
          openPopup(popupContentDelete, category.name);
        }
        
        // Sửa
        if (target.classList.contains("btn-reset")) {
          openPopup(popupContentEdit, category.name);
        }
      });
      
      // Sự kiện cho PAGINATION
      paginationContainer.addEventListener("click", (event) => {
        const target = event.target;
        
        // Click vào số trang
        if (target.classList.contains("page-btn") && target.dataset.page) {
          const page = Number(target.dataset.page);
          renderTable(page);
        }
        
        // Click Previous
        if (target.classList.contains("prev-btn") && currentPage > 1) {
          renderTable(currentPage - 1);
        }
        
        // Click Next
        if (target.classList.contains("next-btn")) {
          const totalPages = Math.ceil(categoriesData.length / rowsPerPage);
          if (currentPage < totalPages) {
            renderTable(currentPage + 1);
          }
        }
      });
      
      // Sự kiện cho POPUP (Event Delegation)
      popup.addEventListener("click", (event) => {
        const target = event.target;
        
        // Click vào overlay để đóng
        if (target === popup) {
          popup.classList.remove("popup-show");
          elementIndexToChange = null;
          return;
        }
        
        // Nút HỦY
        if (target.classList.contains("cancel-button")) {
          popup.classList.remove("popup-show");
          elementIndexToChange = null;
          return;
        }
        
        // Nút XÁC NHẬN
        if (target.classList.contains("confirm-btn")) {
          const action = target.classList[1]; // action-hide, action-show, etc.
          const newNameInput = popup.querySelector("#category-name-input");
          const newName = newNameInput ? newNameInput.value.trim() : null;
          
          let pageToRender = currentPage;
          
          // Xử lý các action
          switch (action) {
            case 'action-hide':
              if (elementIndexToChange !== null) {
                categoriesData[elementIndexToChange].isShown = false;
              }
              break;
              
            case 'action-show':
              if (elementIndexToChange !== null) {
                categoriesData[elementIndexToChange].isShown = true;
              }
              break;
              
            case 'action-delete':
              if (elementIndexToChange !== null) {
                categoriesData.splice(elementIndexToChange, 1);
                // Kiểm tra nếu trang hiện tại bị rỗng
                const totalPages = Math.ceil(categoriesData.length / rowsPerPage);
                if (currentPage > totalPages && totalPages > 0) {
                  pageToRender = totalPages;
                }
              }
              break;
              
            case 'action-edit':
              if (newName && elementIndexToChange !== null) {
                categoriesData[elementIndexToChange].name = newName;
              } else if (!newName) {
                alert("Vui lòng nhập tên loại sản phẩm!");
                return;
              }
              break;
              
            case 'action-add':
              if (newName) {
                const newId = generateNextId(categoriesData);
                categoriesData.push({
                  id: newId,
                  name: newName,
                  quantity: 0,
                  isShown: true,
                  manageable: true
                });
                console.log(`➕ Đã thêm category mới với ID: ${newId}`);
                // Đi đến trang cuối
                pageToRender = Math.ceil(categoriesData.length / rowsPerPage);
              } else {
                alert("Vui lòng nhập tên loại sản phẩm!");
                return;
              }
              break;
          }
          
          // Lưu và render lại
          saveDataToLocalStorage();
          renderTable(pageToRender);
          popup.classList.remove("popup-show");
          elementIndexToChange = null;
        }
      });
    }
    
    // =========================================
    // 9. HÀM KHỞI TẠO
    // =========================================
    async function initializeApp() {
      // Tải dữ liệu
      categoriesData = await loadInitialData();
      
      // Render bảng lần đầu
      renderTable(1);
      
      // Gán sự kiện
      attachEventListeners();
    }
    
    // =========================================
    // 10. CHẠY ỨNG DỤNG
    // =========================================
    initializeApp();
  }
};
function generateNextId(categoriesData){
  return categoriesData.length + 1;
}