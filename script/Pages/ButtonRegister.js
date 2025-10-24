import { InsertPage } from "../LoadPage.js";

export const ButtonRegister = {
  html: 
    `
     <div class="modal-overlay">
        <div class="register">
            <button class="button-close-register" onclick="closeModal()">&times;</button>
            <p class="font-register"><strong>Register Account</strong></p>
            
            <form id="register-form">
                <div class="first-and-last-name">
                    <div class="input-wrapper">
                        <input type="text" name="firstname" id="firstname-input" placeholder="Firstname" required>
                        <span class="error-message" id="firstname-error"></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" name="lastname" id="lastname-input" placeholder="Lastname" required>
                        <span class="error-message" id="lastname-error"></span>
                    </div>
                </div>

                <div class="input-wrapper">
                    <input type="text" name="username" id="username-input" placeholder="Username" required>
                    <span class="error-message" id="username-error"></span>
                </div>

                <div class="input-wrapper">
                    <input type="password" name="password" id="password-input" placeholder="Password" required>
                    <span class="error-message" id="password-error"></span>
                </div>

                <div class="input-wrapper">
                    <input type="password" name="confirm-password" id="confirm-password-input" placeholder="Confirm Password" required>
                    <span class="error-message" id="confirm-password-error"></span>
                </div>

                <div class="input-wrapper">
                    <input type="tel" name="phonenumber" id="phone-input" placeholder="Phone number" required>
                    <span class="error-message" id="phone-error"></span>
                </div>

                <div class="input-wrapper">
                    <input type="text" name="address" id="address-input" placeholder="Address" required>
                    <span class="error-message" id="address-error">aaa</span>
                </div>
                
                <div class="have-an-account">
                    <p>Already have an account?</p>
                    <button class="sign-in-button" type="button" onclick="goToSignIn()">Sign in</button>
                </div>

                <button type="submit" class="btn continue">CONTINUE</button>
            </form>
        </div>
    </div>
    `,
  canDeleteCss: true,
  css: `../css/register.css`,
  init: function(){
    console.log("Do something register in here");
    document.querySelector(".modal-overlay").style.display = "flex";
    AddEventButtonClose();
    AddEventButtonSignin();
  }
};

function AddEventButtonSignin(){
    const buttonSignIn = document.querySelector(".sign-in-button");
    buttonSignIn.addEventListener("click", () => {
        RemoveForm();
        InsertPage("login");
    })
}
function AddEventButtonClose(){
    const buttonClose = document.querySelector(".button-close-register");
    buttonClose.addEventListener("click", () => {
        RemoveForm();
    })
}
function RemoveForm(){
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.style.display = "none";
    modalOverlay.remove();
}