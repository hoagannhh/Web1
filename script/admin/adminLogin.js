import { navigateTo } from "./router.js";

export const AdminLogin = {
    html: 
    `
    <div class="login-container">
        <div class="login-header">
            <div class="logo">⚙️</div>
            <h1>Đề Vương</h1>
            <p>Admin Dashboard</p>
        </div>

        <form id="login-form">
            <div class="form-group">
                <label for="email">Email hoặc Tên đăng nhập</label>
                <input type="text" id="email" name="email" placeholder="Nhập email của bạn" required>
            </div>

            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
            </div>

           

            <button type="submit" class="login-btn">Đăng Nhập</button>
        </form>
    </div>
    `,
    css: "../css/adminLogin.css",
    canDeleteCss: true,
    init: function(){
        const sidebar = document.querySelector(".sidebar");
        sidebar.style.display = "none";
        const login = document.querySelector(".login-btn");
        login.addEventListener("click", (event)=>{
            handleLogin(event, sidebar);
        })
    }
}
async function handleLogin(event, sidebar) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const data = await fetchData();
        
        if (!data || !data.accounts || data.accounts.length === 0) {
            alert('Không thể tải dữ liệu tài khoản');
            return;
        }
        
        const admin = data.accounts.find(acc => 
            acc.role === "admin" && 
            acc.username === email && 
            acc.password === password
        );
        
        if (admin) {
            alert('Đăng nhập thành công!');
            navigateTo('/');
            sidebar.style.display = "block";
        } else {
            alert('Email hoặc mật khẩu không chính xác');
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại');
    }
}

async function fetchData() {
    try {
        const response = await fetch('../data/account.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi fetch dữ liệu:', error);
        throw error;
    }
}