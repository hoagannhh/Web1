export const accountComponent = {
  html: [
    `<div class="profile-container">
        <div class="sidebar">
            <div class="user-info-mini">
                <img src="../img/547992253_823059776934031_1523588798799183290_n.jpg" alt="Ảnh đại diện" class="avatar-mini">
                <span class="username-mini">tranchinhthanh</span>
            </div>
            
            <nav class="nav-menu">
                <a href="#" class="nav-item">
                    <img src="../icon/User.png" alt="" class="material-icons">
                    Tài khoản của tôi
                </a>
                <a href="#" class="nav-item">
                    <img src="../icon/Bill.png" alt="" class="material-icons">
                    Lịch sử giao dịch
                </a>
            </nav>
        </div>

        <div class="main-content">
            <h2 class="page-title">Hồ sơ của tôi</h2>
            

            <div class="profile-form-area">
                <div class="form-fields">
                    <div class="form-row">
                        <label class="">Tên đăng nhập:</label>
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
                        <span class="data-value">**/**/**2000</span>
                        <a href="#" class="action-link">Thay đổi</a>
                    </div>

                    <div class="form-row">
                        <label>Email:</label>
                        <span class="data-value">tr**********@gmail.com</span>
                        <a href="#" class="action-link">Thay đổi</a>
                    </div>

                    <div class="form-row">
                        <label>Số điện thoại:</label>
                        <span class="data-value">**********28</span>
                        <a href="#" class="action-link">Thay đổi</a>
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
  ],
  css: [`../css/account.css`],
};
