import { InsertPage, LoadPage } from '../LoadPage.js';
import { username } from './ButtonVerification .js'; 


export const accountComponent = {
    // 1. Cập nhật HTML để bao gồm cả trường "Địa chỉ"
    html: `
    <div class="profile-container">
        <div class="sidebar">
            <div class="user-info-mini">
                <img src="../img/547992253_823059776934031_1523588798799183290_n.jpg" alt="Ảnh đại diện" class="avatar-mini">
                <span class="username-mini">tranchinhthanh</span>
            </div>
            <nav class="nav-menu">
                <a href="#" class="nav-item account">
                    <img src="../icon/User.png" alt="" class="material-icons"> Tài khoản của tôi
                </a>
                <a href="#" class="nav-item order">
                    <img src="../icon/Bill.png" alt="" class="material-icons"> Lịch sử giao dịch
                </a>
            </nav>
        </div>
        <div class="main-content">
            <h2 class="page-title">Hồ sơ của tôi</h2>
            <div class="profile-form-area">
                <div class="form-fields">
                    <div class="form-row">
                        <label>Tên đăng nhập:</label>
                        <span class="readonly-value">tranchinhthanh</span>
                    </div>
                    <div class="form-row">
                        <label for="full-name">Họ Tên:</label>
                        <input type="text" id="full-name" value="Trần Chính Thành">
                    </div>
                    <div class="form-row">
                        <label>Giới tính:</label>
                        <div class="radio-group">
                            <input type="radio" id="male" name="gender" value="Nam" checked>
                            <label for="male">Nam</label>
                            <input type="radio" id="female" name="gender" value="Nữ">
                            <label for="female">Nữ</label>
                            <input type="radio" id="other" name="gender" value="Khác">
                            <label for="other">Khác</label>
                        </div>
                    </div>
                    <div class="form-row">
                        <label>Ngày sinh:</label>
                        <span class="data-value">Chưa cập nhật</span>
                        <a href="#" class="action-link" data-type="date">Thay đổi</a>
                    </div>
                    <div class="form-row">
                        <label>Email:</label>
                        <span class="data-value">Chưa cập nhật</span>
                        <a href="#" class="action-link" data-type="email">Thay đổi</a>
                    </div>
                    <div class="form-row">
                        <label>Số điện thoại:</label>
                        <span class="data-value">Chưa cập nhật</span>
                        <a href="#" class="action-link" data-type="tel">Thay đổi</a>
                    </div>
                    <div class="form-row">
                        <label>Địa chỉ:</label>
                        <span class="data-value">Chưa cập nhật</span>
                        <a href="#" class="action-link" data-type="address">Thay đổi</a>
                    </div>
                    <div class="save-button-container">
                        <button class="save-button">Lưu</button>
                    </div>
                </div>
                <div class="avatar-upload-section">
                    <img src="../img/547992253_823059776934031_1523588798799183290_n.jpg" alt="Ảnh đại diện lớn" class="avatar-large">
                    <button class="upload-button">Chọn ảnh</button>
                </div>
            </div>
        </div>
    </div>`,
    canDeleteCss: true,
    css: `../css/account.css`,
    
    init: function() {
        console.log("Account component initialized");
        document.querySelector(".readonly-value").innerHTML = username;
        // Tất cả các hàm được định nghĩa bên trong `init` để tránh xung đột với bên ngoài.
        const addEventForNav = () => {
            const nav = document.querySelectorAll(".nav-item");
            console.log(nav)
            nav.forEach(link => {
                            console.log(link)
                if(link.classList.contains("account")){
                    link.addEventListener("click", () => {
                        LoadPage("account", document.getElementById("container"));
                        return;
                    })
                }else if (link.classList.contains("order")){
                    link.addEventListener("click", () => {
                        LoadPage("orderHistory",  document.getElementById("container"));
                        return;
                    })
                }
            })
        };
        
        const closeAllOpenInputs = (elementToExclude) => {
            document.querySelectorAll(".edit-input, .email-container").forEach((input) => {
                const parentOfInput = input.parentElement;
                if (parentOfInput !== elementToExclude) {
                    const dataValueSpan = parentOfInput.querySelector(".data-value");
                    const actionLink = parentOfInput.querySelector(".action-link");
                    if (dataValueSpan) dataValueSpan.style.display = "";
                    if (actionLink) actionLink.style.display = "";
                    input.remove();
                }
            });
        };
        
        const updateSpanContent = (dataType, value) => {
            const link = document.querySelector(`[data-type="${dataType}"]`);
            if (link && link.previousElementSibling) {
                link.previousElementSibling.textContent = value || "Chưa cập nhật";
            }
        };

        const loadProfileData = () => {
            const savedData = JSON.parse(localStorage.getItem("ACCOUNTS"));
            if (savedData) {
                const userPro = savedData.find(account => account.username === username);
                console.log(userPro);
                if (!userPro.userProfile) return;
                const userProfile = userPro.userProfile;
                console.log(userProfile);
                document.getElementById("full-name").value = userProfile.fullName || "";
                if (userProfile.gender) {
                    document.querySelector(`input[name="gender"][value="${userProfile.gender}"]`).checked = true;
                }
                updateSpanContent("date", userProfile.birthDate);
                updateSpanContent("email", userProfile.email);
                updateSpanContent("tel", userProfile.phoneNumber);
                updateSpanContent("address", userPro.address);
            }
        };

        const saveProfileData = () => {
             // Đảm bảo mọi input đang mở đều được "commit" giá trị trước khi lưu
            const activeInput = document.querySelector(".edit-input:focus, .email-container input:focus");
            if (activeInput) {
                activeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            }

            const userProfile = {
                fullName: document.getElementById("full-name").value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || "",
                birthDate: document.querySelector('[data-type="date"]').previousElementSibling.textContent,
                email: document.querySelector('[data-type="email"]').previousElementSibling.textContent,
                phoneNumber: document.querySelector('[data-type="tel"]').previousElementSibling.textContent,
                address: document.querySelector('[data-type="address"]').previousElementSibling.textContent,
            };

            for (const key in userProfile) {
                if (userProfile[key] === "Chưa cập nhật") {
                    userProfile[key] = "";
                }
            }
            const accounts = JSON.parse(localStorage.getItem("ACCOUNTS"));
            console.log(accounts)
            let account = accounts.find(acc => acc.username === username);
            account = {
                ...account,
                userProfile
            }
            console.log(account);
            for(let i = 0; i < accounts.length; i++)
            {
                if (accounts[i].username === username){
                    console.log(accounts[i].username);
                    console.log(account);
                    
                    accounts[i] = account;
                }
            };
            console.log(accounts);
            localStorage.setItem("ACCOUNTS", JSON.stringify(accounts));
            alert("Đã lưu thông tin thành công!");
            // Đã xóa location.reload();
        };

        // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---

        const handleActionLinkClick = (event) => {
            event.preventDefault();
            const link = event.currentTarget;
            const parentRow = link.parentElement;
            const dataValueSpan = parentRow.querySelector(".data-value");

            if (parentRow.querySelector(".edit-input, .email-container")) return;

            closeAllOpenInputs(null);

            const inputType = link.dataset.type;
            let newEditableElement;

            if (inputType === "email") {
                newEditableElement = document.createElement("div");
                newEditableElement.className = "email-container";
                newEditableElement.innerHTML = `<input type="text" placeholder="Nhập email" class="edit-input"><span class="email-suffix">@gmail.com</span>`;
                const emailInput = newEditableElement.querySelector("input");
                if (dataValueSpan.textContent !== "Chưa cập nhật") {
                    emailInput.value = dataValueSpan.textContent.split("@")[0];
                }
            } else if (inputType === "address") {
                newEditableElement = document.createElement("textarea");
                newEditableElement.className = "edit-input";
                newEditableElement.rows = 3;
                if (dataValueSpan.textContent !== "Chưa cập nhật") {
                    newEditableElement.value = dataValueSpan.textContent;
                }
            } else {
                newEditableElement = document.createElement("input");
                newEditableElement.type = inputType;
                newEditableElement.className = "edit-input";
                if (inputType === "tel") {
                    newEditableElement.addEventListener("input", (e) => {
                       e.target.value = e.target.value.replace(/[^0-9+]/g, '');
                    });
                }
                if (dataValueSpan.textContent !== "Chưa cập nhật") {
                    newEditableElement.value = dataValueSpan.textContent;
                }
            }
            
            parentRow.insertBefore(newEditableElement, link);
            (newEditableElement.querySelector("input") || newEditableElement).focus();
            dataValueSpan.style.display = "none";
            link.style.display = "none";
        };

        const handleGlobalClick = (event) => {
            if (!event.target.closest(".form-row")) {
                closeAllOpenInputs(null);
            }
        };

        const handleGlobalKeyDown = (event) => {
            const activeInput = document.querySelector(".edit-input:focus, .email-container input:focus");
            if (!activeInput) return;

            if (event.key === "Enter") {
                const parentRow = activeInput.closest(".form-row");
                const dataValueSpan = parentRow.querySelector(".data-value");
                const actionLink = parentRow.querySelector(".action-link");
                const editableContainer = parentRow.querySelector(".edit-input, .email-container");
                let newValue = activeInput.value.trim();

                if (parentRow.querySelector(".email-container") && newValue) {
                    newValue += "@gmail.com";
                }
                dataValueSpan.textContent = newValue || "Chưa cập nhật";
                dataValueSpan.style.display = "";
                actionLink.style.display = "";
                editableContainer.remove();
            }

            if (event.key === "Escape") {
                closeAllOpenInputs(null);
            }
        };

        // --- GÁN SỰ KIỆN (ATTACH EVENT LISTENERS) ---
        document.querySelectorAll(".action-link").forEach(link => {
            link.addEventListener("click", handleActionLinkClick);
        });
        
        document.querySelector(".save-button").addEventListener("click", saveProfileData);

        // Các sự kiện toàn cục cần được dọn dẹp khi component bị hủy
        document.addEventListener("click", handleGlobalClick);
        document.addEventListener("keydown", handleGlobalKeyDown);

        // Lưu lại các hàm xử lý sự kiện toàn cục để có thể gỡ bỏ sau này
        this.cleanup = () => {
            console.log("Account component cleaned up.");
            document.removeEventListener("click", handleGlobalClick);
            document.removeEventListener("keydown", handleGlobalKeyDown);
            // Bạn cũng có thể gỡ các listener khác nếu cần
        };

        // --- TẢI DỮ LIỆU BAN ĐẦU ---
        addEventForNav();
        loadProfileData();
    },
};