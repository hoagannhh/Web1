function showForm() {
  document.getElementById("address-list-view").classList.add("hidden");
  document.getElementById("form-view").classList.remove("hidden");
}

function showAddress() {
  document.getElementById("form-view").classList.add("hidden");
  document.getElementById("address-list-view").classList.add("hidden");
  document.getElementById("address-view").classList.remove("hidden");
}

function showAddressList() {
  document.getElementById("address-view").classList.add("hidden");
  document.getElementById("form-view").classList.add("hidden");
  document.getElementById("address-list-view").classList.remove("hidden");
  renderAddressList();
}

function confirmAddress() {
  const phone = document.getElementById("new-phone").value.trim();
  const address = document.getElementById("new-address").value.trim();

  if (phone !== "" && address !== "") {
    const newEntry = { phone, address };

    // Lấy danh sách cũ (nếu có)
    const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];

    // Thêm địa chỉ mới
    stored.push(newEntry);
    localStorage.setItem("userAddresses", JSON.stringify(stored));

    // Xóa input
    document.getElementById("new-phone").value = "";
    document.getElementById("new-address").value = "";

    showAddressList();
  }
}

// Hiển thị danh sách địa chỉ đã lưu
function renderAddressList() {
  const listEl = document.getElementById("address-list");
  listEl.innerHTML = ""; // reset
  const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];

  if (stored.length === 0) {
    listEl.innerHTML = "<li>No saved addresses.</li>";
  } else {
    stored.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
      <div class="list-address">
      <div class="address&phone"><strong>Phone:</strong> ${item.phone}<br>
        <strong>Address:</strong> ${item.address}<br></div>
      <div ><button onclick="selectAddress(${index})" class="select-btn">Select</button></div></div>
        
        
      `;
      listEl.appendChild(li);
    });
  }
}

// Chọn một địa chỉ trong danh sách
function selectAddress(index) {
  const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];
  const selected = stored[index];
  if (selected) {
    document.getElementById("current-phone").textContent = selected.phone;
    document.getElementById("current-address").textContent = selected.address;
  }
  showAddress();
}

// Khi load trang, hiển thị địa chỉ cuối cùng đã dùng (nếu có)
window.addEventListener("DOMContentLoaded", () => {
  const stored = JSON.parse(localStorage.getItem("userAddresses")) || [];
  if (stored.length > 0) {
    const last = stored[stored.length - 1];
    document.getElementById("current-phone").textContent = last.phone;
    document.getElementById("current-address").textContent = last.address;
  }
});

const Credit = document.querySelector(".credit-method");
const infoCard = document.querySelector(".infor-card");
Credit.addEventListener("click", () => {
  infoCard.classList.toggle("hidden");
});
