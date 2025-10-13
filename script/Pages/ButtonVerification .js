import { ButtonLogin } from './ButtonLogin.js'
import { ButtonRegister } from './ButtonRegister.js'
import { LoadCss } from '../LoadPage.js'
// import { userInfor } from'../../data/userInfor.json'
export const ButtonVerification  = `        
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
        </div>
        `;

document.addEventListener('DOMContentLoaded', function() {   
    // Câu lệnh này giúp cho trình duyệt biết rằng khi nào load hết html thì mới chạy tiếp bên trong
    // Trình duyệt đảm bảo HTML đã sẵn sàng.

    // nút login và register ở taskbar
    const login = document.querySelector(".login .in");
    const register = document.querySelector(".login .up");
    const container = document.getElementById("container");

     if (!login || !register) {
        console.error("Không tìm thấy nút Sign In hoặc Sign Up!");
        return;
    }

    HandleLogin(login, container);
    HandResgister(register, container);
});

function HandResgister(register, container){
    register.addEventListener('click', () => {
        container.insertAdjacentHTML('afterbegin', ButtonRegister.html[0]);
        LoadCss("register")

        const modaloverlay = document.querySelector(".modal-overlay");
        modaloverlay.style.display = "block";
        
        // xử lý nút tắt form register
        CloseTab(".button-close-register", modaloverlay)
        HandleDataRegister(modaloverlay);
    })
}
function HandleDataRegister(){
    // console.log('Dữ liệu đã lưu trong localStorage:', localStorage.getItem('myUsers'));

    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", (event) => {
        // event.preventDefault();
        console.log(document.getElementById('firstname-input').value.trim());
        const userData = {
            firstName: document.getElementById('firstname-input').value.trim(),
            lastName: document.getElementById('lastname-input').value.trim(),
            username: document.getElementById('username-input').value.trim(),
            password: document.getElementById('password-input').value, // Mật khẩu không nên trim()
            confirmPassword: document.getElementById('confirm-password-input').value,
            phone: document.getElementById('phone-input').value.trim(),
            address: document.getElementById('address-input').value.trim(),
        };

        if (userData.password !== userData.confirmPassword){
            alert("Mật khẩu xác nhạn không chính xác")
            return;
        }
        const finalUser = {...userData};
        delete finalUser.confirmPassword;

        const jsonData = JSON.stringify(finalUser, null, 2);
        localStorage.setItem('myUsers', jsonData);
        console.log('Dữ liệu đã lưu trong localStorage:', localStorage.getItem('myUsers'));
        alert("Sucessful")

        
        // localStorage.setItem('userInfo', jsonData);

        
    })
}
function HandleLogin(login, container){
    login.addEventListener('click', () => {
        container.insertAdjacentHTML('afterbegin', ButtonLogin.html[0]);
        LoadCss("login");

        const modaloverlay = document.querySelector(".modal-overlay");
        modaloverlay.style.display = "block";

        // xử lý nút tắt form login
        CloseTab(".button-close", modaloverlay)

        HandleDataLogin(modaloverlay);
    })
}
function HandleDataLogin(modaloverlay){
    // -------------load data ---------------------
    let accounts;
    fetch("../data/account.json")
    .then(reponse => reponse.json())
    .then(data => {
        accounts = data.accounts;
        console.log(accounts);
    })

    // ------------------Xử lý login -------------------------
    const loginForm = document.getElementById("form-user-pass");
    loginForm.addEventListener("submit",(event) => {
        event.preventDefault();
        // Vertification(modaloverlay);
         const userAccount = {
            username: document.getElementById("username-login").value.trim(),
            password: document.getElementById("password-login").value.trim(),
        }
        const foundUser = accounts.find(account => 
            account.username.toLowerCase() === userAccount.username.toLowerCase() &&
            account.password === userAccount.password
        );

        if (foundUser){
            alert("Đăng nhập thành công");
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            document.querySelector(".login").style.display = "none";
            document.querySelector(".user-authenticated").style.display = "flex";
            modaloverlay.style.display = "none";

        } else {
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }   
    })
}
function Vertification(modaloverlay){
        const userAccount = {
            username: document.getElementById("username-login").value.trim(),
            password: document.getElementById("password-login").value.trim(),
        }
        const foundUser = accounts.find(account => 
            account.username.toLowerCase() === userAccount.username.toLowerCase() &&
            account.password === userAccount.password
        );

        if (foundUser){
            alert("Đăng nhập thành công");
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            document.querySelector(".login").style.display = "none";
            document.querySelector(".user-authenticated").style.display = "flex";
            modaloverlay.style.display = "none";

        } else {
            alert("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
}
function CloseTab(nameClassClose, modaloverlay){
    console.log("enter close button");
    const closeButton = document.querySelector(nameClassClose);
    closeButton.addEventListener("click", () => {
        modaloverlay.style.display = "none";
    })
}