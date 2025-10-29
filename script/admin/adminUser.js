export const AdminUser = {
    html: 
    `
    
      <div class="main-content">
        <div class="header">
          <div class="left-header">
            <div><p>User/Customer</p></div>
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
        <div class="user-table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>DoB</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="user-info">
                    <img
                      src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                      alt="Marin avatar"
                    />
                    <span>Marin</span>
                  </div>
                </td>
                <td>09/12/2005</td>
                <td>0987654321</td>
                <td>marin@gmail.com</td>
                <td>
                  <button class="btn btn-lock">Khóa tài khoản</button>
                  <button class="btn btn-reset">Đổi mật khẩu</button>
                </td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>

    `,
    css: "../css/adminUser.css",
    canDeleteCss: true,
    init: function(){
        loadAccount();
    }
}





// hàm 4 xử lý khóa tài khoản 
function HandleLock(id, btn, accounts){
    let acc;
    accounts.forEach(account => {
        if (account.username === id){
            acc = account;
        }
    })
    console.log(acc);
    const html = `         
    <div class="form-verification">
            <div class="form-verification__header">
            <img class="icon lock" src="../icon/Lock.png" alt="">
            <p class="form-verification__Headerlock">Khóa tài khoản</p>
            <div class="container-infor-lockacc">
                <img class="icon represent" src="../img/goku.jpg" alt="goku">
                <p class="form-verification__name">${acc.userProfile.fullName}</p>
            </div>
            </div>
            <div class="container-notification">
            <p class="notification">Bạn có chắc muốn khóa tài khoản này</p>
            <p class="notification">người dùng không thể đăng nhập vào tài khoản này cho tới khi được mở khóa</p>
            </div>
            <div class="container-btn">
                <button class="btn cancel">Hủy</button>
                <button class="btn veritification">Xác nhận khóa</button>
            </div>
        </div>`;
    // khởi tạo form ban đầu
    const model = document.querySelector(".model-overlay");
    model.style.display = "block";
    model.innerHTML = html;
    
    // th1: hủy k muốn khóa tài khoản này
    console.log("before handle")
    model.querySelector(".cancel").addEventListener("click", ()=>{
        model.style.display = "none";
        console.log("get in th1")
    })

    // th2: muốn khóa tài khoản này
    model.querySelector(".veritification").addEventListener("click", ()=>{
        model.style.display = "none";
        console.log("get in th2")
        lockAccount(accounts, id);

        convertTextLock(btn);
    })

}
function lockAccount(accounts, id){
    accounts.forEach(account => {
        if (account.username === id){
            console.log(account);
            let isLockAccount = true;
            account = {
                ...account,
                isLockAccount
            }
            accounts = accounts.filter(acc => acc.username !== id)
            accounts.push(account);
            console.log(accounts);
            localStorage.setItem("ACCOUNTS", JSON.stringify(accounts));
        }
    })
}
// hàm 5 xử lý mở khóa tài khoản
function HandleUnlock(id, btn, accounts){
    let acc;
    accounts.forEach(account => {
        if (account.username === id){
            acc = account;
        }
    })
    console.log(acc);
    const html = `           
        <div class="form-verification-unlock">
            <div class="form-verification__header">
            <img class="icon lock" src="../icon/Padlock.png" alt="">
            <p class="form-verification__Headerlock">Khóa tài khoản</p>
            <div class="container-infor-lockacc">
                <img class="icon represent" src="../img/goku.jpg" alt="goku">
                <p class="form-verification__name">${acc.userProfile.fullName}</p>
            </div>
            </div>
            <div class="container-notification">
            <p class="notification">Bạn có chắc muốn mở khóa tài khoản này</p>
            <p class="notification">người dùng sẽ có thể đăng nhập vào tài khoản này bình thường</p>
            </div>
            <div class="container-btn">
                <button class="btn cancel">Hủy</button>
                <button class="btn veritification">Xác nhận</button>
            </div>
        </div>`;
    // khởi tạo form ban đầu
    const model = document.querySelector(".model-overlay");
    model.style.display = "block";
    model.innerHTML = html;
    
    // th1: hủy k muốn khóa tài khoản này
    console.log("before handle")
    model.querySelector(".cancel").addEventListener("click", ()=>{
        model.style.display = "none";
        console.log("get in th1")
    })

    // th2: muốn mở khóa tài khoản này
    model.querySelector(".veritification").addEventListener("click", ()=>{
        model.style.display = "none";
        console.log("get in th2")
        unlockAccount(id, accounts);
        convertTexUnlLock(btn);
    })

}
function unlockAccount(id, accounts){
    accounts.forEach(account => {
        if (account.username === id){
            console.log(account);
            let isLockAccount = false;
            account = {
                ...account,
                isLockAccount
            }
            accounts = accounts.filter(acc => acc.username !== id)
            accounts.push(account);
            console.log(accounts);
            localStorage.setItem("ACCOUNTS", JSON.stringify(accounts));
        }
    })
}
// hàm 6 xử lý quên mật khẩu
function HandleResetPassword(id, btn, accounts){
    let acc;
    accounts.forEach(account => {
        if (account.username === id){
            acc = account;
        }
    })
    console.log(acc);
    const html =  `
    <div class="form-change-password">
        <div class="form-verification__header">
            <img class="icon key" src="../icon/Key.png" alt="">
            <p class="form-verification__HeaderKey">Đổi mật khẩu</p>
            <div class="container-infor-lockacc">
                <img class="icon represent" src="../img/goku.jpg" alt="goku">
                <p class="form-verification__name">${acc.userProfile.fullName}</p>
            </div>
        </div>
    <form action="">
        <fieldset>
        <label for="password">Mật khẩu mới</label>
        <input id="password" name="password" type="text" placeholder="Nhập mật khẩu mới">
        <div class="print-error"></div>
        <label for="continue-password">Nhập lại mật khẩu</label>
        <input id="continue-password" name="continue-password" type="text" placeholder="Nhập mật khẩu">
        <div class="print-error"></div>
    </fieldset>
    </form>
    <div class="container-btn">
        <button class="btn cancel">Hủy</button>
        <button class="btn veritification">Xác nhận đổi</button>
    </div>
    </div>
    `
    // khởi tạo
    const model = document.querySelector(".model-overlay");
    model.style.display = "block"
    model.innerHTML = html;


    // xử lý 
    model.querySelector(".cancel").addEventListener("click", ()=>{
        model.style.display = "none"
    })
    model.querySelector(".veritification").addEventListener("click", ()=>{
        // xử lý đổi mật khẩu lưu lại data
        changePassword(id, accounts, model);
    })

}
function changePassword(id, accounts, model){
    const pass = document.getElementById("password").value.trim();
    const passCtn = document.getElementById("continue-password").value.trim();
    console.log(pass + " -::- " + passCtn);
    if (pass === passCtn){
        accounts.forEach(acc => {
            if (acc.username === id){
                let newAcc = {
                    ...acc,
                    pass
                }
                console.log(newAcc);
                accounts = accounts.filter(acc => acc.username !== id)
                accounts.push(newAcc);
                console.log(accounts);
                localStorage.setItem("ACCOUNTS", JSON.stringify(accounts))
            }
        })
    model.style.display = "none";
    }else {
        document.querySelectorAll(".print-error").forEach(e => {
            e.textContent = "Nhap sai mat khau";
        })
    }
}
//hàm thay đổi chữ
function convertTextLock(btn){
    btn.classList.remove("btn-lock");
    btn.classList.add("btn-unlock");
    btn.textContent = "Mở khóa";
}
function convertTexUnlLock(btn){
    btn.classList.remove("btn-unlock");
    btn.classList.add("btn-lock");
    btn.textContent = "Khóa tài khoản";
}
// hàm 3 (Nên định nghĩa trước khi gọi)
function AddEvent() {
    const container = document.querySelector(".main-content");
    
    container.addEventListener("click", (event)=>{
        const clicked = event.target;
        const tr = clicked.closest("tr");
        const accounts = JSON.parse(localStorage.getItem("ACCOUNTS"));
        
        console.log(tr);
        console.log(accounts);


        if (!tr) return;
        const id = tr.dataset.id;

        if (clicked.classList.contains("btn-lock")){
            console.log("lock: " + id);
            HandleLock(id, clicked, accounts);
        }else if (clicked.classList.contains("btn-unlock")){
            console.log("unlock: " + id);
            HandleUnlock(id, clicked, accounts);
        }else if (clicked.classList.contains("btn-reset")){
            console.log("reset: " + id);
            HandleResetPassword(id, clicked, accounts);
        }
    })
};
function loadAccount(){
      let html = ``;
      const accounts = JSON.parse(localStorage.getItem("ACCOUNTS"));

      if (accounts && accounts.length > 0) {
        accounts.forEach((account) => {
          let userProfile = account.userProfile;

          //  Kiểm tra userProfile có tồn tại không**
          if (userProfile) {
            html += `
              <tr data-id=${account.username}>
                <td>
                  <div class="user-info">
                    <img
                      src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                      alt="Marin avatar"
                    />
                    <span>${userProfile.fullName || "None"}</span>
                  </div>
                </td>
                <td>${userProfile.birthDate || "None"}</td>
                <td>${userProfile.phoneNumber || "None"}</td>
                <td>${userProfile.email || "None"}</td>
                <td>
                  <button class="btn btn-lock">Khóa tài khoản</button>
                  <button class="btn btn-reset">Đổi mật khẩu</button>
                </td>
              </tr>
            `;
          }
          // Bạn có thể thêm else ở đây để render 1 hàng báo lỗi cho account hỏng
        });
    }
    const b = document.querySelector("tbody");
    b.innerHTML = html;
    AddEvent();

}