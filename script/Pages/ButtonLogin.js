import { ButtonRegister } from './ButtonRegister.js'
import { InsertPage } from '../LoadPage.js';

export const ButtonLogin = {
    html: `
            <div class="modal-overlay">
            <div class="login-form">
                <button class="button-close">X</button>
                <div class="header-page">MY 36SNEAKER ACCOUNT</div>
                <button>
                    <img class="icon" src="../icon/Google.png" alt="">
                    <p>Continue with google</p>
                </button>
                <button>
                    <img class="icon" src="../icon/facebook.png" alt="">
                    <p>Continue with facebook</p>
                </button>
                <div class="horizontal-bar">
                    <div class="bar"></div>
                    <div class="bar-p">OR</div>
                    <div class="bar"></div>
                </div>
                <div class="header-page">CONTINUE WITH YOUR ACCOUNT</div>
                <form id="form-user-pass" class="form-log">
                    <input id="username-login" class="btn user-name" type="text" name="user-name"  placeholder="USERNAME" required>
                    <input id="password-login" class="btn user-password" type="password" name="password" placeholder="PASSWORD" required>
                    <button type="button" class="btn sign-in">sign up</button>
                    <button type="submit" class="btn continue">CONTINUE</button>
                </form>
            </div>
            </div>
        `,
    css: `../css/login.css`,
    canDeleteCss: true,
    init: function(){
        console.log("first");
            document.querySelector(".modal-overlay").style.display = "block";

        AddEventButtonClose();
        linkSignUp();
    }
}

function AddEventButtonClose(){
    const buttonClose = document.querySelector(".button-close");
    buttonClose.addEventListener("click", () => {
        RemoveForm();
    })
}
function linkSignUp(){
    const signUp = document.querySelector(".btn.sign-in");
    
    if (signUp) {
        console.log(signUp);
        signUp.addEventListener("click", () => {
            RemoveForm();
            InsertPage("register", document.getElementById("container"));
        });
    } else {
        console.error("Không tìm thấy nút 'sign-in'!");
    }
}
function RemoveForm(){
     const modalOverlay = document.querySelector(".modal-overlay");
        modalOverlay.style.display = "none";
        modalOverlay.remove();
}
