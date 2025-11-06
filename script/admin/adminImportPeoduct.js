/*Demo data*/
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
                  <th style="width: 180px; border-radius: 0%; border-top-right-radius: 15px;">Action</th>
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
  init: function () {
    let orders = [];
    let allOrders = []; // lưu trữ toàn bộ đơn hàng để hỗ trợ tìm kiếm
    const STORAGE_KEY = "productImport"; // main storage key for orders
    // load from either new key or legacy key if present
    const importDraft = localStorage.getItem("importDraft");
    function loadOrders() {
      const raw =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem("producImport"); // legacy
      if (!raw) {
        orders = [];
        return;
      }
      try {
        const parsed = JSON.parse(raw) || [];
        if (
          Array.isArray(parsed) &&
          parsed.length &&
          parsed[0] &&
          (parsed[0].name || parsed[0].qty || parsed[0].price) &&
          !parsed[0].id &&
          !parsed[0].date
        ) {
          // legacy stored a list of items — convert to one order
          orders = [
            {
              id: `PN${String(1).padStart(3, "0")}`,
              date: new Date().toISOString().slice(0, 10),
              items: parsed,
              status: "pending",
              // isUsedForProduct: false,
            },
          ];
        } else {
          orders = normalizeOrdersArray(parsed);
        }
      } catch (err) {
        console.error("Failed to parse orders from localStorage", err);
        orders = [];
      }
    }
    function saveOrders() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (err) {
        console.error("Failed to save orders to localStorage", err);
      }
    }
    loadOrders();
    allOrders = orders;
    console.log("loaded orders:", orders);

    /* Hàm tiện ích */
    const formatMoney = (n) =>
      n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
    const calcTotal = (items) =>
      (Array.isArray(items) ? items : []).reduce(
        (s, it) => s + (Number(it?.qty) || 0) * (Number(it?.price) || 0),
        0
      );
    const calcQty = (items) =>
      (Array.isArray(items) ? items : []).reduce(
        (s, it) => s + (Number(it?.qty) || 0),
        0
      );
    // ensure orders loaded from localStorage always have items array
    function normalizeOrdersArray(arr) {
      return (arr || [])
        .map((o, i) => {
          // if element looks like an item (has name/qty/price) — wrap as single order later
          if (o && (o.name || o.qty || o.price) && !o.id && !o.date) {
            return null; // handled by caller
          }
          return {
            id: o?.id ?? o?.orderId ?? `PN${String(i + 1).padStart(3, "0")}`,
            date: o?.date ?? new Date().toISOString().slice(0, 10),
            items: Array.isArray(o?.items) ? o.items : [],
            status: o?.status ?? "pending",
          };
        })
        .filter(Boolean);
    }

    // Hàm tìm kiếm
    function filterAndRenderOrders(searchTerm) {
      console.log("Tìm kiếm đang chạy với từ khóa:", searchTerm); // <-- THÊM LOG NÀY
      console.log(allOrders);
      console.log(orders);

      if (!searchTerm || !searchTerm.trim()) {
        orders = allOrders; // Nếu rỗng thì hiển thị tất cả
      } else {
        const term = searchTerm.toLowerCase().trim();
        // Lọc theo ID, Date, hoặc Status
        orders = allOrders.filter(
          (o) =>
            o.id.toLowerCase().includes(term) ||
            o.date.includes(term) ||
            (o.status === "completed" ? "hoàn thành" : "nhập").includes(term)
        );
      }
      renderOrders.currentPage = 1; // Luôn về trang 1 sau khi tìm kiếm
      renderOrders(); // Render lại bảng
      console.log("Số lượng đơn hàng sau khi lọc:", orders.length); // <-- THÊM LOG NÀY
    }

    /*  Hiển thị bảng chính  */
    const ordersBody = document.getElementById("orders-body");

    function renderOrders() {
      // Pagination: show 10 orders per page
      const PAGE_SIZE = 6;
      if (typeof renderOrders.currentPage === "undefined")
        renderOrders.currentPage = 1;
      const pageCount = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
      if (renderOrders.currentPage > pageCount)
        renderOrders.currentPage = pageCount;

      ordersBody.innerHTML = "";
      const start = (renderOrders.currentPage - 1) * PAGE_SIZE;
      const pageItems = orders.slice(start, start + PAGE_SIZE);
      pageItems.forEach((o, i) => {
        const idx = start + i; // real index in orders array
        const tr = document.createElement("tr");
        const totalQty = calcQty(o.items);
        const totalVal = calcTotal(o.items);
        // Các nút hành động tùy theo trạng thái
        let actionsHTML = `
          <button class="btn" data-action="view" data-idx="${idx}">Xem</button>
         
        `;
        if (o.status === "pending") {
          actionsHTML += `
            <button class="btn complete" data-action="complete" data-idx="${idx}">Hoàn thành</button>
             <button class="btn edit" data-action="edit" data-idx="${idx}">Sửa</button>
            <button class="btn delete" data-action="delete" data-idx="${idx}">Xóa</button>
          `;
        }
        tr.innerHTML = `
          <td>${o.id}</td>
          <td>${o.date}</td>
          <td>${totalQty}</td>
          <td>${formatMoney(totalVal)}</td>
          <td><span class="status ${
            o.status === "pending" ? "pending" : "success"
          }">${o.status === "completed" ? "Hoàn thành" : "Nhập"}</span></td>
          <td class="actions"><div style="display:flex;gap:8px;justify-content:flex-end">${actionsHTML}</div></td>
        `;
        ordersBody.appendChild(tr);
      });

      // render pagination controls
      renderPagination(pageCount, renderOrders.currentPage);
    }
    renderOrders();

    /*  Hàm quản lý modal  */
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal");
    const overlayDelete = document.getElementById("overlay-delete");
    let currentEditIndex = null;
    let currentDeleteIndex = null;

    function openOverlay(html) {
      modal.innerHTML = html;
      overlay.style.display = "flex";
    }
    function closeOverlay() {
      overlay.style.display = "none";
      modal.innerHTML = "";
      currentEditIndex = null;
    }

    function openDelete(i) {
      currentDeleteIndex = i;
      overlayDelete.style.display = "flex";
    }
    function closeDelete() {
      overlayDelete.style.display = "none";
      currentDeleteIndex = null;
    }

    /*  Form nhập liệu  */
    function buildOrderForm({ mode = "add", data = null, readOnly = false }) {
      const id = data?.id || `PN${String(orders.length + 1).padStart(3, "0")}`;
      const date = data?.date || new Date().toISOString().slice(0, 10);
      const items = (data?.items || []).map((it) => ({ ...it }));

      const draft = importDraft ? JSON.parse(importDraft) : null;

      // Thêm hidden input để lưu productId nếu có
      const hiddenField = draft
        ? `<input type="hidden" id="from-product-id" value="${draft.productId}">`
        : "";

      //TRả về HTML của modal
      return `
        ${hiddenField}
        <h3>${
          mode === "add"
            ? "Thêm phiếu nhập"
            : mode === "edit"
            ? "Sửa phiếu nhập"
            : mode === "view"
            ? "Xem chi tiết phiếu nhập"
            : "Hoàn thành phiếu nhập"
        }</h3>
        <div class="row">
          <div class="field" style="flex:0 0 220px">
            <label>Mã phiếu nhập</label>
            <input id="order-id" value="${id}" ${readOnly ? "disabled" : ""}/>
          </div>
          <div class="field" style="flex:0 0 160px">
            <label>Ngày nhập</label>
            <input id="order-date" type="date" value="${date}" ${
        readOnly ? "disabled" : ""
      }/>
          </div>
        </div>

        <div>
          <label style="font-weight:700;display:block;margin-bottom:6px">Danh sách sản phẩm nhập</label>
          <table class="products-table">
            <thead><tr><th>Sản phẩm</th><th>Số lượng</th><th>Giá nhập</th><th>Thành tiền</th><th></th></tr></thead>
            <tbody id="items-tbody">
              ${items
                .map(
                  (it) => `
                <tr>
                  <td><input class="items__name" value="${it.name}" ${
                    readOnly ? "disabled" : ""
                  }></td>
                  <td><input class="items__qty" type="number" value="${
                    it.qty
                  }" ${readOnly ? "disabled" : ""}></td>
                  <td><input class="items__price" type="number" value="${
                    it.price
                  }" ${readOnly ? "disabled" : ""}></td>
                  <td class="items__line">${formatMoney(it.qty * it.price)}</td>
                  <td>${
                    readOnly
                      ? ""
                      : '<button data-remove class="btn" style="background:#f8f8f8">🗑️</button>'
                  }</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
          ${
            readOnly
              ? ""
              : '<div><span class="link" id="add-product">+ Thêm sản phẩm</span></div>'
          }
        </div>

        <div class="controls">
          <div style="font-weight:700">Tổng tiền: <span id="order-total">${formatMoney(
            calcTotal(items)
          )}</span></div>
          <div style="display:flex;gap:8px">
            <button class="btn" id="btn-cancel">Hủy</button>
            ${
              mode === "add"
                ? '<button class="btn add" id="btn-confirm-add">Xác nhận thêm</button>'
                : mode === "edit"
                ? '<button class="btn edit" id="btn-confirm-edit">Xác nhận sửa</button>'
                : mode === "complete"
                ? '<button class="btn complete" id="btn-confirm-complete">Hoàn thành</button>'
                : ""
            }
          </div>
        </div>
      `;
    }

    /*  Sự kiện chính trên bảng  */
    document.getElementById("orders-body").addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const action = btn.dataset.action;
      const idx = +btn.dataset.idx;

      if (action === "edit") {
        currentEditIndex = idx;
        openOverlay(buildOrderForm({ mode: "edit", data: orders[idx] }));
        bindModalEvents("edit");
      } else if (action === "view") {
        openOverlay(
          buildOrderForm({ mode: "view", data: orders[idx], readOnly: true })
        );
        bindModalEvents("view");
      } else if (action === "delete") {
        openDelete(idx);
      } else if (action === "complete") {
        currentEditIndex = idx;
        openOverlay(
          buildOrderForm({
            mode: "complete",
            data: orders[idx],
            readOnly: true,
          })
        );
        bindModalEvents("complete");
      }
    });

    /*  Nút thêm mới  */
    document.getElementById("btn-add-order").addEventListener("click", () => {
      openOverlay(buildOrderForm({ mode: "add" }));
      bindModalEvents("add");
    });

    /*  Xác nhận xóa  */
    document
      .getElementById("del-cancel")
      .addEventListener("click", closeDelete);
    document.getElementById("del-confirm").addEventListener("click", () => {
      if (currentDeleteIndex !== null) {
        orders.splice(currentDeleteIndex, 1);
        saveOrders();
        renderOrders();
      }
      closeDelete();
    });

    /* Modal logic (sử dụng selector query cho BEM classes)  */
    function bindModalEvents(mode) {
      const btnCancel = document.getElementById("btn-cancel");
      const confirmAdd = document.getElementById("btn-confirm-add");
      const confirmEdit = document.getElementById("btn-confirm-edit");
      const confirmComplete = document.getElementById("btn-confirm-complete");
      const addProduct = document.getElementById("add-product");
      const tbody = document.getElementById("items-tbody");

      if (btnCancel) btnCancel.onclick = closeOverlay;

      // lưu tạm danh sách sản phẩm trong modal (draft) — không ghi đè orders chính
      function saveDraftItems() {
        try {
          const items = gatherItems();
          localStorage.setItem(STORAGE_KEY + "_draft", JSON.stringify(items));
        } catch (err) {
          console.error("Failed to save draft items", err);
        }
      }

      // thêm sản phẩm mới trong modal
      if (addProduct) {
        addProduct.onclick = () => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td><input class="items__name" placeholder="Tên sản phẩm"></td>
              <td><input class="items__qty" type="number" min="0" value="0"></td>
              <td><input class="items__price" type="number" min="0" value="0"></td>
              <td class="items__line">0₫</td>
              <td><button data-remove class="btn" style="background:#f8f8f8">🗑️</button></td>
            `;
          tbody.appendChild(tr);
          bindItemRow(tr);
          recalcTotal();
          saveDraftItems(); // lưu draft sản phẩm trong modal
        };
      }

      // gắn sự kiện cho 1 dòng sản phẩm
      function bindItemRow(row) {
        const qty = row.querySelector(".items__qty");
        const price = row.querySelector(".items__price");
        const line = row.querySelector(".items__line");
        const rm = row.querySelector("[data-remove]");

        const upd = () => {
          const val = (+qty.value || 0) * (+price.value || 0);
          line.textContent = formatMoney(val);
          recalcTotal();
          saveDraftItems(); // lưu draft khi thay đổi số lượng/giá
        };

        if (qty) qty.oninput = upd;
        if (price) price.oninput = upd;
        if (rm)
          rm.onclick = () => {
            row.remove();
            recalcTotal();
            saveDraftItems(); // lưu draft khi xóa dòng
          };
      }

      function recalcTotal() {
        const items = gatherItems();
        const totalEl = document.getElementById("order-total");
        if (totalEl) totalEl.textContent = formatMoney(calcTotal(items));
      }

      if (confirmAdd) {
        confirmAdd.onclick = () => {
          const id = document.getElementById("order-id").value.trim();
          const date = document.getElementById("order-date").value;
          const items = gatherItems();
          if (!id || !date || !items.length)
            return alert("Điền đầy đủ thông tin!");
          orders.push({
            id,
            date,
            items,
            status: "pending",
            // isUsedForProduct: false,
          });
          saveOrders();
          renderOrders();
          closeOverlay();
        };
      }

      if (confirmEdit) {
        confirmEdit.onclick = () => {
          const id = document.getElementById("order-id").value.trim();
          const date = document.getElementById("order-date").value;
          const items = gatherItems();
          if (!id || !date || !items.length)
            return alert("Điền đầy đủ thông tin!");
          if (currentEditIndex !== null) {
            orders[currentEditIndex] = {
              id,
              date,
              items,
              status: orders[currentEditIndex].status,
            };
            saveOrders();
            renderOrders();
            closeOverlay();
          }
        };
      }

      // Thêm vào adminImportProduct.js
      // Thêm vào adminImportProduct.js
      if (confirmComplete) {
        confirmComplete.onclick = () => {
          if (currentEditIndex !== null) {
            const order = orders[currentEditIndex];
            // const importDraft = localStorage.getItem('importDraft');
            console.log("Import Draft:", importDraft);
            // Chỉ xử lý nếu phiếu được tạo từ Product
            if (importDraft) {
              try {
                const draft = JSON.parse(importDraft);

                // 1. Cập nhật số lượng trong allProduct
                const allProducts = JSON.parse(
                  localStorage.getItem("allProduct") || "[]"
                );
                const product = allProducts.find(
                  (p) => p.id === draft.productId
                );

                if (product) {
                  // Lấy số lượng từ phiếu nhập
                  const importQty = order.items[0].qty;

                  // Cập nhật số lượng tồn kho
                  product.inventory =
                    (product.inventory || 0) + Number(importQty);
                  localStorage.setItem(
                    "allProduct",
                    JSON.stringify(allProducts)
                  );

                  // 2. Thêm vào inventoryHistory
                  const historyEntry = {
                    transactionId: `T-${Date.now()}${Math.random()
                      .toString(36)
                      .substr(2, 5)}`,
                    type: "import",
                    productId: draft.productId,
                    quantity: Number(importQty),
                    referenceId: order.id,
                    date: new Date().toISOString(),
                    notes: `Nhập hàng từ phiếu ${order.id}`,
                  };

                  const inventoryHistory = JSON.parse(
                    localStorage.getItem("inventoryHistory") || "[]"
                  );
                  inventoryHistory.push(historyEntry);
                  localStorage.setItem(
                    "inventoryHistory",
                    JSON.stringify(inventoryHistory)
                  );

                  // 3. Đánh dấu item trong phiếu nhập là đã sử dụng
                  order.items[0].isUsed = true;
                }
              } catch (e) {
                console.error("Error processing import draft:", e);
              }
            }

            // Cập nhật trạng thái phiếu nhập
            order.status = "completed";
            saveOrders();
            renderOrders();
            closeOverlay();
          }
        };
      }

      // gắn sự kiện cho các dòng có sẵn (khi modal được mở với items đã có)
      // tìm tất cả các dòng hiện tại trong tbody và bind lại
      Array.from(tbody.querySelectorAll("tr")).forEach((tr) => bindItemRow(tr));
      console.log(localStorage.getItem("producImport"));
    }

    /*  Hỗ trợ  */
    function gatherItems() {
      return Array.from(document.querySelectorAll("#items-tbody tr"))
        .map((r) => {
          const name = r.querySelector(".items__name")?.value.trim();
          const qty = +r.querySelector(".items__qty")?.value || 0;
          const price = +r.querySelector(".items__price")?.value || 0;
          if (!name) return null;
          return { name, qty, price, isUsed: false };
        })
        .filter(Boolean);
    }

    /* Phần phân trang (10 sản phẩm / trang) */
    function renderPagination(pageCount, currentPage) {
      // lấy element khi cần để tránh lỗi TDZ (pagination có thể được truy cập trước khi biến được khởi tạo)
      const pagination = document.getElementById("pagination");
      if (!pagination) return;
      // nếu chỉ 1 trang thì ẩn phân trang
      if (pageCount <= 1) {
        pagination.innerHTML = "";
        return;
      }
      let html = `<span data-page="prev">&lt;</span>`;
      for (let i = 1; i <= pageCount; i++) {
        html += `<span data-page="${i}" class="${
          i === currentPage ? "active" : ""
        }">${i}</span>`;
      }
      html += `<span data-page="next">&gt;</span>`;
      pagination.innerHTML = html;
    }

    // xử lý click trên pagination (delegation) — gắn event sau khi DOM sẵn sàng
    const paginationEl = document.getElementById("pagination");
    if (paginationEl) {
      paginationEl.addEventListener("click", (e) => {
        const sp = e.target.closest("span");
        if (!sp) return;
        const p = sp.dataset.page;
        if (!p) return;
        const PAGE_SIZE = 10;
        const pageCount = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
        if (p === "prev") {
          if (renderOrders.currentPage > 1) renderOrders.currentPage--;
        } else if (p === "next") {
          if (renderOrders.currentPage < pageCount) renderOrders.currentPage++;
        } else {
          renderOrders.currentPage = +p;
        }
        renderOrders();
      });
    }
    // ...
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        filterAndRenderOrders(e.target.value);
      });
    }

    // Thêm đoạn này vào đầu hàm init

    if (localStorage.getItem("importDraft")) {
      try {
        const draft = JSON.parse(localStorage.getItem("importDraft"));
        // Tự động mở form thêm mới
        openOverlay(buildOrderForm({ mode: "add" }));

        // Đợi một chút để DOM được tạo
        setTimeout(() => {
          // Tự động điền thông tin sản phẩm
          const tbody = document.getElementById("items-tbody");
          if (tbody) {
            tbody.innerHTML = `
              <tr>
                <td><input class="items__name" value="${
                  draft.productName
                }" readonly></td>
                <td><input class="items__qty" type="number" value="1" min="1"></td>
                <td><input class="items__price" type="number" value="${
                  draft.cost
                }" readonly></td>
                <td class="items__line">${formatMoney(draft.cost)}</td>
                <td></td>
              </tr>
            `;
          }

          // Bind events cho dòng sản phẩm
          // Array.from(tbody.querySelectorAll("tr")).forEach((tr) =>
          //   bindItemRow(tr)
          // );

          // Xóa draft sau khi đã sử dụng
          localStorage.removeItem("importDraft");
        }, 100);

        bindModalEvents("add");
      } catch (e) {
        console.error("Error parsing import draft:", e);
      }
    }
    localStorage.removeItem("importDraft");
    // end init
    // end init
  },
};
