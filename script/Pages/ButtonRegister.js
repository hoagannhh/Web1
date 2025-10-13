// Trong file ButtonRegister.js

export const ButtonRegister = {
  html: [
    `
    <div class="modal-overlay">
        <div class="register">
            <button class="button-close-register">&times;</button>
            <p class="font-register"><strong>Register Account</strong></p>
            
            <form id="register-form">
                <div class="first-and-last-name">
                    <input type="text" name="firstname" id="firstname-input" class="firstname" placeholder="Firstname" required>
                    <input type="text" name="lastname" id="lastname-input" class="lastname" placeholder="Lastname" required>
                </div>
                <input type="text" name="username" id="username-input" class="username" placeholder="Username" required>
                <input type="password" name="password" id="password-input" class="password" placeholder="Password" required>
                <input type="password" name="confirm-password" id="confirm-password-input" class="confirm-password" placeholder="Confirm Password" required>
                <input type="tel" name="phonenumber" id="phone-input" class="phonenumber" placeholder="Phone number" required>
                <input type="text" name="address" id="address-input" class="address" placeholder="Address" required>
                
                <div class="have-an-account">
                    <p>Already have an account?</p>
                    <button type="button">Sign in</button>
                </div>

                <button type="submit" class="btn continue">CONTINUE</button>
            </form>
        </div>
    </div>
    `,
  ],
  css: [`../css/register.css`],
};