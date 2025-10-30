import { ButtonLogin } from "./ButtonLogin.js";
import { ButtonRegister } from "./ButtonRegister.js";
import { LoadCss, LoadPage } from "../LoadPage.js";

export let username;
export let IsAuthenticated = false;
export const ButtonVerification = {
        html: `        
              <div class="login">
                <button class="sign in">
                  <img class="icon-sign-in" src="../icon/Sign-in.png" />
                  Sign In
                </button>
                <span>&#124;</span>
                <button class="sign up">Sign Up</button>
              </div>
              <div class="user-authenticated">
                  <img class="user-represent" src="../img/User-represent.png" alt="">
                  <p>user3636</p>
                  <div class = "routing">
                      <button class = "profile">Thông tin cá nhân</button>
                      <button class = "sign-out">Đăng xuất</button>
                  </div>
              </div>
              `,
        css:'../css/taskbar.css',
        init: function(){
          
            console.log("in cant");

            const container = document.getElementById("container");
            // dang nhap
            const login = document.querySelector(".login .in");

            // dang ky
            const register = document.querySelector(".login .up");
            
            if (!login || !register) {
              console.error("Không tìm thấy nút Sign In hoặc Sign Up!");
              return;
            }
            
            HandleRegister(register, container);
            HandleLogin(login, container);
   
          
      }
  }

// ----------------------------------------------------
// ----------------- LOGIN - REGISTER------------------

function HandleRegister(register, container) {
    register.addEventListener("click", () => {
      container.insertAdjacentHTML("afterbegin", ButtonRegister.html);
      LoadCss("register");

      const modelOverlay = document.querySelector(".modal-overlay");
      modelOverlay.style.display = "block";

      // xử lý nút tắt form register
      CloseTab(".button-close-register", modelOverlay);
      HandleDataRegister(modelOverlay);
  });
}
function HandleDataRegister() {
  // console.log('Dữ liệu đã lưu trong localStorage:', localStorage.getItem('myUsers'));

  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", (event) => {
    // event.preventDefault();
    // console.log(document.getElementById("firstname-input").value.trim());
    const userData = {
      firstName: document.getElementById("firstname-input").value.trim(),
      lastName: document.getElementById("lastname-input").value.trim(),
      username: document.getElementById("username-input").value.trim(),
      password: document.getElementById("password-input").value, 
      confirmPassword: document.getElementById("confirm-password-input").value,
      phone: document.getElementById("phone-input").value.trim(),
      address: document.getElementById("address-input").value.trim(),
      isFirstTimeAccess: false,
    };

    if (userData.password !== userData.confirmPassword) {
        ShowError("confirm-password-error", "Mật khẩu khong chính xác")
        ShowError("password-error", "Mật khẩu khong chính xác")
        event.preventDefault();
              return;

    }
    const finalUser = { ...userData };
    delete finalUser.confirmPassword;

    let users = JSON.parse(localStorage.getItem("ACCOUNTS")) || [];
    
    if (users.find(user => user.username === finalUser.username)){
      ShowError("username-error", "ten dang nhap da ton tai");
      event.preventDefault();
      return;
    }

    console.log("Dang ky check: " + users)
    users.push(finalUser)
    const jsonData = JSON.stringify(users, null, 2);
    localStorage.setItem("ACCOUNTS", jsonData);
    console.log(localStorage.getItem("ACCOUNTS"));
    // console.log(
    //   "Dữ liệu đã lưu trong localStorage:",
    //   localStorage.getItem("myUsers")
    // );
    alert("Sucessful");

    // localStorage.setItem('userInfo', jsonData);
  });
}
function ShowError(id, error){
    const containerError = document.getElementById(id);
    if(!!error){
        containerError.style.display = "block"
        containerError.textContent = error;
    }else{
        containerError.style.display = "none"
        inerError.textContent = error;
    }
}
function HandleLogin(login, container) {
  // tạo 1 form login
  login.addEventListener("click", () => {
    container.insertAdjacentHTML("afterbegin", ButtonLogin.html);
    LoadCss("login");
    ButtonLogin.init();
    const modelOverlay = document.querySelector(".modal-overlay");
    modelOverlay.style.display = "block";


    HandleDataLogin(modelOverlay, container);
  });
}
function HandleDataLogin(modelOverlay, container) {
  // -------------load data ---------------------
  // let accounts = JSON.parse(localStorage.getItem("ACCOUNTS"));
  let accounts;
  fetch("../data/account.json")
    .then((response) => response.json())
    .then((data) => {
      accounts = data.accounts;
      // console.log(accounts);
    });

  // ------------------Xử lý login -------------------------
  const loginForm = document.getElementById("form-user-pass");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (Verification(modelOverlay, accounts)) {
      console.log("Đăng nhập bằng tài khoản user ở file account.js");
    } else {
      // console.log("Đăng nhập bằng tài khoản user ở local");
      const userIndividual = JSON.parse(localStorage.getItem("ACCOUNTS"));
      console.log(userIndividual);
      const userAccount = {
        username: document.getElementById("username-login").value.trim(),
        password: document.getElementById("password-login").value.trim(),
      };
            console.log(userAccount);

      // console.log("------------------------------")
      // console.log(userIndividual);
      // console.log(userIndividual.username + " " + userAccount.username);
      // console.log(userIndividual.password + " " + userAccount.password);
      // console.log("------------------------------")
      if (userIndividual  === null){
        alert("ten dang nhap hoac mat khau khong dung")
        return;
      }
      if (userIndividual.length === 0){
        alert("ten dang nhap hoac mat khau khong dung")
        return;
      }

      for (let i = 0; i < userIndividual.length; i ++){
        if (userIndividual[i].username === userAccount.username &&
            userIndividual[i].password === userAccount.password 
        ){
          if (userIndividual[i].isLockAccount != null && userIndividual[i].isLockAccount){
            alert("Tai khoan da bi khoa");
            return;
          }
          username = userAccount.username;
          ConfirmSuccessful(modelOverlay, container);
          return;
        }
      }

      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  });
}
function Verification(modelOverlay, accounts, container) {
  console.log(container);
  const userAccount = {
    username: document.getElementById("username-login").value.trim(),
    password: document.getElementById("password-login").value.trim(),
  };
  const foundUser = accounts.find(
    (account) =>
      account.username.toLowerCase() === userAccount.username.toLowerCase() &&
      account.password === userAccount.password
  );

  if (foundUser) {
    ConfirmSuccessful(modelOverlay, container);
    return true;
  } else {
    return false;
  }
}
function ConfirmSuccessful(modelOverlay, container) {
  alert("Đăng nhập thành công");
  modelOverlay.remove();

  // cờ hiệu kiểm tra đã đăng nhập chưa
  IsAuthenticated = true;

  const formLogin = document.querySelector(".login");
  formLogin.style.display = "none";

  const formAuthenticated = document.querySelector(".user-authenticated");
  formAuthenticated.style.display = "flex";

  modelOverlay.style.display = "none";
  // Đăng nhập thành công sẽ do something
  AddEventButtonProfile(container);
  AddEventButtonLogOut(formLogin, formAuthenticated, container);

}
function AddEventButtonLogOut(formLogin, formAuthenticated){
  const logOut = document.querySelector(".sign-out");
  logOut.addEventListener("click", () => {
    formLogin.style.display = "flex";
    formAuthenticated.style.display = "none";
    IsAuthenticated = false;
    LoadPage("home", container);
  })
}
function AddEventButtonProfile(container){
  const account = document.querySelector(".profile");
  account.addEventListener("click", () => {
    LoadPage("account", container);
  });
}

function CloseTab(nameClassClose, modelOverlay) {
  const closeButton = document.querySelector(nameClassClose);
  closeButton.addEventListener("click", () => {
    modelOverlay.style.display = "none";
    modelOverlay.remove();
  });
}

// ------------------------------------------------------
