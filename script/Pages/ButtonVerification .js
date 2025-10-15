import { ButtonLogin } from "./ButtonLogin.js";
import { ButtonRegister } from "./ButtonRegister.js";
import {  LoadCss, LoadPage } from "../LoadPage.js";

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
          document.addEventListener("DOMContentLoaded", function(){
            const container = document.getElementById("container");
            // dang nhap
            const login = document.querySelector(".login .in");

            // dang ky
            const register = document.querySelector(".login .up");
            

            if (!login || !register) {
              console.error("Không tìm thấy nút Sign In hoặc Sign Up!");
              return;
            }

            HandleLogin(login, container);
            HandleRegister(register, container);
          })
          
      }
  }

// ----------------------------------------------------
// ----------------- LOGIN - REGISTER------------------
function HandleRegister(register, container) {
    register.addEventListener("click", () => {
      container.insertAdjacentHTML("afterbegin", ButtonRegister.html[0]);
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
      password: document.getElementById("password-input").value, // Mật khẩu không nên trim()
      confirmPassword: document.getElementById("confirm-password-input").value,
      phone: document.getElementById("phone-input").value.trim(),
      address: document.getElementById("address-input").value.trim(),
    };

    if (userData.password !== userData.confirmPassword) {
      alert("Mật khẩu xác nhạn không chính xác");
      return;
    }
    const finalUser = { ...userData };
    delete finalUser.confirmPassword;

    const jsonData = JSON.stringify(finalUser, null, 2);
    localStorage.setItem("myUsers", jsonData);
    // console.log(
    //   "Dữ liệu đã lưu trong localStorage:",
    //   localStorage.getItem("myUsers")
    // );
    alert("Sucessful");

    // localStorage.setItem('userInfo', jsonData);
  });
}
function HandleLogin(login, container) {
  login.addEventListener("click", () => {
    container.insertAdjacentHTML("afterbegin", ButtonLogin.html);
    LoadCss("login");
    const modelOverlay = document.querySelector(".modal-overlay");
    modelOverlay.style.display = "block";

    CloseTab(".button-close", modelOverlay);

    HandleDataLogin(modelOverlay);
  });
}
function HandleDataLogin(modelOverlay) {
  // -------------load data ---------------------
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
      const userIndividual = JSON.parse(localStorage.getItem("myUsers"));
      const userAccount = {
        username: document.getElementById("username-login").value.trim(),
        password: document.getElementById("password-login").value.trim(),
      };
      // console.log("------------------------------")
      // console.log(userIndividual);
      // console.log(userIndividual.username + " " + userAccount.username);
      // console.log(userIndividual.password + " " + userAccount.password);
      // console.log("------------------------------")
      if (
        userIndividual.username === userAccount.username &&
        userIndividual.password === userAccount.password
      ) {
        // console.log(123);
        ConfirmSuccessful(modelOverlay);
        return;
      }
      alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  });
}
function Verification(modelOverlay, accounts) {
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
    ConfirmSuccessful(modelOverlay);
    return true;
  } else {
    return false;
  }
}
function ConfirmSuccessful(modelOverlay) {
  alert("Đăng nhập thành công");
  document.querySelector(".login").style.display = "none";
  document.querySelector(".user-authenticated").style.display = "flex";
  modelOverlay.style.display = "none";
  // Đăng nhập thành công sẽ do something
  const account = document.querySelector(".profile");
  account.addEventListener("click", () => {
    // console.log(123366)
    LoadPage("account");
  });
}
function CloseTab(nameClassClose, modelOverlay) {
  const closeButton = document.querySelector(nameClassClose);
  closeButton.addEventListener("click", () => {
    modelOverlay.style.display = "none";
  });
}

// ------------------------------------------------------
