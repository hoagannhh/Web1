/*Demo data*/
let importProduct = JSON.parse(localStorage.getItem("productImport"));
let currentEditIndex = null;
let currentDeleteIndex = null;
let currentPage = 1;
export const AdminImportProduct = {
  html: `
      <main class="admin-container">
        <div class="header">
          <div class="left-header">
            <div><p>ImportProduct</p></div>
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

        <section class="panel">
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            "
          >
            <div style="color: var(--muted)">Danh sách phiếu nhập</div>
            <div style="display: flex; gap: 12px; align-items: center">
            
            <input
            type="text"
            id="search-input"
            placeholder="Tìm theo ID, Ngày hoặc Trạng thái..."
            style="padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px;"
        />
              <button class="btn add" id="btn-add-order">
                + Thêm phiếu nhập
              </button>
            </div>
          </div>

          <div style="overflow: auto">
            <table>
              <thead>
                <tr>
                  <th style="width: 180px; border-radius: 0%; border-top-left-radius: 15px;">ID</th>
                  <th style="width: 180px; border-radius: 0%;">Date</th>
                  <th style="width: 180px; border-radius: 0%;">Total quantity</th>
                  <th style="width: 180px; border-radius: 0%;">Total value</th>
                  <th style="width: 180px; border-radius: 0%;">Status</th>
                  <th style="width: 180px; text-align:center; border-radius: 0%; border-top-right-radius: 15px;">Action</th>
                </tr>
              </thead>
              <tbody id="orders-body">
                <!-- thêm dòng -->
              </tbody>
            </table>
          </div>

          <div class="pagination" id="pagination"></div>
        </section>
      </main>
      
    </div>

    <!--Modal: Thêm / Sửa / Xem / Hoàn thành -->
    <div class="overlay" id="overlay">
      <div class="modal" id="modal"></div>
    </div>

    <!-- Xác nhận xóa -->
    <div class="overlay" id="overlay-delete">
      <div class="modal confirm" id="modal-delete">
        <h3 style="color: var(--danger); margin-bottom: 6px">Xóa phiếu nhập</h3>
        <p>
          Bạn có chắc chắn muốn xóa vĩnh viễn phiếu nhập này? Hành động này
          không thể hoàn tác.
        </p>
        <div
          style="
            margin-top: 12px;
            display: flex;
            gap: 8px;
            justify-content: flex-end;
          "
        >
          <button class="btn" id="del-cancel">Hủy</button>
          <button class="btn delete" id="del-confirm">Xác nhận Xóa</button>
        </div>
      </div>
  `,
  css: `../css/adminImportProduct.css`,
  canDeleteCss: true,
  init: function(){
    const ordersBody = document.getElementById('orders-body');

    //render các sản phẩm ra màn hình
    renderOrders(importProduct);
    // thêm sự kiện cho phần phân trang
    HandleEventPagenation();
 


    handleEventInTable(ordersBody);
    // Thêm các sự kiên cancel confirm 1 form
    handleEventButton();


    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        filterAndRenderOrders(e.target.value);
      });
    }
  }
};

/*==== hàm Hỗ trợ  tính toán khi nhập xong form THÊM - SỬA =====*/
function gatherItems(){
  return Array.from(document.querySelectorAll('#items-tbody tr'))
    .map(r=>{
      const item_name = r.querySelector('.items__name');
      const productId = item_name?.value.split(":")[0];
      let name = item_name?.value.split(":")[1];
      if (name != null) {name = name.trim();console.log(name)}
      const qty = +r.querySelector('.items__qty')?.value || 0;
      const price = +r.querySelector('.items__price')?.value || 0;
      if (!name) return null;
      return { productId, name, qty, price };
    })
    .filter(Boolean);
}
  // ================== Hàm xử lý sự kiện cho 1 form nhập, sửa, xóa =========================
function bindModalEvents(mode, ordersBody){
  const btnCancel = document.getElementById('btn-cancel');
  const confirmAdd = document.getElementById('btn-confirm-add');
  const confirmEdit = document.getElementById('btn-confirm-edit');
  const confirmComplete = document.getElementById('btn-confirm-complete');
  const addProduct = document.getElementById('add-product');
  const tbody = document.getElementById('items-tbody');

  if (btnCancel) btnCancel.onclick = closeOverlay;

  // thêm sản phẩm mới trong modal
  if (addProduct) {
    addProduct.onclick = () => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input class="items__name" id ="searchInput" placeholder="Tên sản phẩm">
        <div class="options-container" id="optionsContainer"></div>
        </td>
        <td><input class="items__qty" type="number" min="0" value="0"></td>
        <td><input class="items__price" type="number" min="0" value="0"></td>
        <td class="items__line">0₫</td>
        <td><button data-remove class="btn" style="background:#f8f8f8">🗑️</button></td>
      `;
      tbody.appendChild(tr);
      bindItemRow(tr, ordersBody);
      recalcTotal();
      AddDataToProduct();
    };
  }

  // ================== Hàm xử lý sự kiện cho 1 dòng sản phẩm =========================
  function bindItemRow(row){
    const qty = row.querySelector('.items__qty');
    const price = row.querySelector('.items__price');
    const line = row.querySelector('.items__line');
    const rm = row.querySelector('[data-remove]');

    const upd = () => {
      const val = (+qty.value||0)*(+price.value||0);
      line.textContent = formatMoney(val);
      recalcTotal();
    };

    if (qty) qty.oninput = upd;
    if (price) price.oninput = upd;
    if (rm) rm.onclick = ()=>{ row.remove(); recalcTotal(); };
  }

  function recalcTotal(){
    const items = gatherItems();
    const totalEl = document.getElementById('order-total');
    if (totalEl) totalEl.textContent = formatMoney(calcTotal(items));
  }

    // phím xác nhận add trong modal
  if (confirmAdd) {
    confirmAdd.onclick = () => {
      const id = document.getElementById('order-id').value.trim();
      const date = document.getElementById('order-date').value;
      const items = gatherItems();
      if (!id || !date || !items.length) return alert('Điền đầy đủ thông tin!');
      importProduct.push({id,date,items,status:'pending'});
      renderOrders(importProduct); 
      closeOverlay();
    };
  }
    
  // phím xác nhận edit trong modal
  if (confirmEdit) {
    confirmEdit.onclick = () => {
      const id = document.getElementById('order-id').value.trim();
      const date = document.getElementById('order-date').value;
      const items = gatherItems();
      if (!id || !date || !items.length) return alert('Điền đầy đủ thông tin!');
      if (currentEditIndex !== null) {
        importProduct[currentEditIndex] = { id, date, items, status: importProduct[currentEditIndex].status };
        renderOrders(ordersBody); closeOverlay();
      }
    };
  }
  // phím xác nhận trong modal
  if (confirmComplete) {
    confirmComplete.onclick = () => {
      if (currentEditIndex !== null){
        importProduct[currentEditIndex].status = 'completed';
        SaveImportProduct();
        renderOrders(ordersBody); closeOverlay();
      }
    };
  }

  // gắn sự kiện cho các dòng có sẵn (khi modal được mở với items đã có)
  // tìm tất cả các dòng hiện tại trong tbody và bind lại
  Array.from(tbody.querySelectorAll('tr')).forEach(tr => bindItemRow(tr, ordersBody));
}


// hàm xử lý khi mở đóng bảng
function openOverlay(html){ document.getElementById('modal').innerHTML = html; document.getElementById('overlay').style.display='flex'; }
function closeOverlay(){ document.getElementById('overlay').style.display='none'; document.getElementById('modal').innerHTML=''; currentEditIndex=null; }

function openDelete(i ){ currentDeleteIndex=i; document.getElementById('overlay-delete').style.display='flex'; }
function closeDelete(){ document.getElementById('overlay-delete').style.display='none'; currentDeleteIndex=null; }


//save
function SaveImportProduct(){
  localStorage.setItem("productImport", JSON.stringify(importProduct));
}
/* ======== Hiển thị danh sách phiếu nhập lên bảng chính  ========*/

function renderOrders(importProduct){
  const PAGE_SIZE = 5;
  const maxPage = Math.ceil(importProduct.length / PAGE_SIZE);
  if (currentPage > maxPage) currentPage = maxPage;


  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = importProduct.slice(start, start + PAGE_SIZE);

  const ordersBody = document.getElementById("orders-body");
  ordersBody.innerHTML = '';
  pageItems.forEach((o, i) => {
    const idx = start + i; // vị trí thực tế trong mảng
    const tr = document.createElement('tr');
    const totalQty = calcQty(o.items);
    const totalVal = calcTotal(o.items);
      // Các nút hành động tùy theo trạng thái
    let actionsHTML = `
      <button class="btn" data-action="view" data-idx="${idx}">Xem</button>
    `;
    if(o.status==='pending'){
      actionsHTML += `
        <button class="btn edit" data-action="edit" data-idx="${idx}">Sửa</button>
        <button class="btn complete" data-action="complete" data-idx="${idx}">Hoàn thành</button>
        <button class="btn delete" data-action="delete" data-idx="${idx}">Xóa</button>
      `;
    }
      //render dòng dữ liệu
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${o.date}</td>
      <td>${totalQty}</td>
      <td>${formatMoney(totalVal)}</td>
      <td><span class="status ${o.status==='pending'?'pending':'success'}">${o.status==='completed'?'Hoàn thành':'Nhập'}</span></td>
      <td class="actions"><div style="display:flex;gap:8px;justify-content:flex-end">${actionsHTML}</div></td>
    `;
    ordersBody.appendChild(tr);
  });

  renderPagination(maxPage);
}
// =================== HÀM phân trang =======================
function renderPagination(maxPage) {
    // lấy element khi cần để tránh lỗi TDZ (pagination có thể được truy cập trước khi biến được khởi tạo)
    const pagination = document.getElementById("pagination");
    if (!pagination) return;
    // nếu chỉ 1 trang thì ẩn phân trang
    if (maxPage <= 1) {
      pagination.innerHTML = "";
      return;
    }
    let html = `<span data-page="prev">&lt;</span>`;
    for (let i = 1; i <= maxPage; i++) {
      html += `<span data-page="${i}" class="${
        i === currentPage ? "active" : ""
      }">${i}</span>`;
    }
    html += `<span data-page="next">&gt;</span>`;
    pagination.innerHTML = html;
}
function HandleEventPagenation(){
    const paginationEl = document.getElementById("pagination");
    if (paginationEl) {
      paginationEl.addEventListener("click", (e) => {
        const sp = e.target.closest("span");
        if (!sp) return;
        const p = sp.dataset.page;
        if (!p) return;
        const PAGE_SIZE = 5;
        const pageCount = Math.max(1, Math.ceil(importProduct.length / PAGE_SIZE));
        console.log(p);
        if (p === "prev") {
          if (currentPage > 1) currentPage--;
        } else if (p === "next") {
          if (currentPage < pageCount) currentPage++;
        } else {
          currentPage = +p;
        }
        renderOrders(importProduct);
      });
    }
}

/* ======= Form nhập, sửa, xem, hoàn thành chi tiết sản phẩm ===== */
function buildOrderForm({mode='add', data=null, readOnly=false}){
  const id = data?.id || `PN${String(importProduct.length+1).padStart(3,'0')}`;
  const date = data?.date || new Date().toISOString().slice(0,10);
  const items = (data?.items||[]).map(it=>({...it}));
  //TRả về HTML của modal
  return `
    <h3>${mode==='add'?'Thêm phiếu nhập': mode==='edit'?'Sửa phiếu nhập': mode==='view'?'Xem chi tiết phiếu nhập':'Hoàn thành phiếu nhập'}</h3>
    <div class="row">
      <div class="field" style="flex:0 0 220px">
        <label>Mã phiếu nhập</label>
        <input id="order-id" value="${id}" ${readOnly?'disabled':''}/>
      </div>
      <div class="field" style="flex:0 0 160px">
        <label>Ngày nhập</label>
        <input id="order-date" type="date" value="${date}" ${readOnly?'disabled':''}/>
      </div>
    </div>

    <div>
      <label style="font-weight:700;display:block;margin-bottom:6px">Danh sách sản phẩm nhập</label>
      <table class="products-table">
        <thead>
          <tr>
            <th style = "border-radius: 0%">Sản phẩm</th>
            <th style = "border-radius: 0%">Số lượng</th>
            <th style = "border-radius: 0%">Giá nhập</th>
            <th style = "border-radius: 0%">Thành tiền</th>
            <th style = "border-radius: 0%"></th>
            </tr>
          </thead>
        <tbody id="items-tbody">
          ${items.map(it=>`
            <tr>
              <td><input class="items__name" value="${it.name}" ${readOnly?'disabled':''}></td>
              <td><input class="items__qty" type="number" value="${it.qty}" ${readOnly?'disabled':''}></td>
              <td><input class="items__price" type="number" value="${it.price}" ${readOnly?'disabled':''}></td>
              <td class="items__line">${formatMoney(it.qty*it.price)}</td>
              <td>${readOnly? '': '<button data-remove class="btn" style="background:#f8f8f8">🗑️</button>'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      ${readOnly? '': '<div><span class="link" id="add-product">+ Thêm sản phẩm</span></div>'}
    </div>

    <div class="controls">
      <div style="font-weight:700">Tổng tiền: <span id="order-total">${formatMoney(calcTotal(items))}</span></div>
      <div style="display:flex;gap:8px">
        <button class="btn" id="btn-cancel">Hủy</button>
        ${
          mode==='add'
            ? '<button class="btn add" id="btn-confirm-add">Xác nhận thêm</button>'
            : mode==='edit'
            ? '<button class="btn edit" id="btn-confirm-edit">Xác nhận sửa</button>'
            : mode==='complete'
            ? '<button class="btn complete" id="btn-confirm-complete">Hoàn thành</button>'
            : ''
        }
      </div>
    </div>
  `;
}

/*========  Sự kiện chính trên bảng  ========*/
function handleEventInTable(ordersBody){
  document.getElementById('orders-body').addEventListener('click', e=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const action = btn.dataset.action;
    const idx = +btn.dataset.idx;
  
    if(action==='edit'){
      currentEditIndex=idx;
      openOverlay(buildOrderForm({mode:'edit',data:importProduct[idx]}));
      bindModalEvents('edit', ordersBody);
    }
    else if(action==='view'){
      openOverlay(buildOrderForm({mode:'view',data:importProduct[idx],readOnly:true}));
      bindModalEvents('view', ordersBody);
    }
    else if(action==='delete'){ openDelete(idx); }
    else if(action==='complete'){
      currentEditIndex=idx;
      openOverlay(buildOrderForm({mode:'complete',data:importProduct[idx],readOnly:true}));
      bindModalEvents('complete', ordersBody);
    }
  });
}

// hàm tiện ích
function formatMoney (n)
{
  return  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '₫';
}
function calcTotal (items) {
  return items.reduce((s,it)=>s + (it.qty*it.price), 0);
}
function calcQty (items) {
  return items.reduce((s,it)=>s + (Number(it.qty)||0), 0);
}

function handleEventButton(ordersBody){
    document.getElementById('btn-add-order').addEventListener('click', ()=>{
      openOverlay(buildOrderForm({mode:'add'}));
      bindModalEvents('add');
    });

    document.getElementById('del-cancel').addEventListener('click', closeDelete);

    document.getElementById('del-confirm').addEventListener('click', ()=>{
      if(currentDeleteIndex!==null){ 
        importProduct.splice(currentDeleteIndex,1); 
        SaveImportProduct();
        renderOrders(importProduct); 
      }

      closeDelete();
    });
}
// filter id hoặc tên theo sản phẩm
function AddDataToProduct(){
    let data = JSON.parse(localStorage.getItem("allProduct"));
    data = data.map(pro => pro.id + ": " +pro.name);
    console.log(data);

    const searchInput = document.getElementById('searchInput');
    const optionsContainer = document.getElementById('optionsContainer');
    
    let selectedItem = '';

    // Render danh sách options
    function renderOptions(filterText = '') {
      const filtered = data.filter(item => 
        item.toLowerCase().includes(filterText.toLowerCase())
      );

      if (filtered.length === 0) {
        return;
      }

      optionsContainer.innerHTML = filtered.map((item, index) => `
        <div class="option-item">
          <input 
            type="radio" 
            id="option-${index}" 
            name="product"
            value="${item}"
            ${selectedItem === item ? 'checked' : ''}
          >
          <label for="option-${index}">${item}</label>
        </div>
      `).join('');

      // Thêm sự kiện click cho radio button
      optionsContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleRadioChange);
      });
    }

    // Xử lý khi radio button thay đổi
    function handleRadioChange(e) {
      selectedItem = e.target.value;
      searchInput.value = selectedItem;
      optionsContainer.classList.remove('show');
    }


    // Xử lý tìm kiếm
    searchInput.addEventListener('input', (e) => {
      renderOptions(e.target.value);
      optionsContainer.classList.add('show');
    });

    // Hiện dropdown khi click vào input
    searchInput.addEventListener('click', () => {
      optionsContainer.classList.add('show');
    });

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.input-wrapper') && !e.target.closest('.options-container')) {
        optionsContainer.classList.remove('show');
      }
    });
}
function filterAndRenderOrders(searchTerm) {
  let orders;
  console.log("Tìm kiếm đang chạy với từ khóa:", searchTerm); // <-- THÊM LOG NÀY
  console.log(importProduct);
  
  if (!searchTerm || !searchTerm.trim()) {
    orders = importProduct; // Nếu rỗng thì hiển thị tất cả
  } else {
    console.log(orders);
    const term = searchTerm.toLowerCase().trim();
    // Lọc theo ID, Date, hoặc Status
    orders = importProduct.filter(
      (o) =>
        o.id.toLowerCase().includes(term) ||
        
        o.date.includes(term) ||
        (o.status === "completed" ? "hoàn thành" : "nhập").includes(term)
    );
  }
  currentPage = 1; // Luôn về trang 1 sau khi tìm kiếm
  renderOrders(orders); // Render lại bảng
  console.log("Số lượng đơn hàng sau khi lọc:", orders.length); // <-- THÊM LOG NÀY
}