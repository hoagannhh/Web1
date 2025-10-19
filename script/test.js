document.addEventListener("DOMContentLoaded", () => {
    // --- 1. ĐỐI TƯỢNG TRẠNG THÁI ---
    // Nơi lưu trữ tất cả các lựa chọn của người dùng


    // --- 2. XỬ LÝ DROPDOWN ---
    const dropdownButtons = document.querySelectorAll(".dropdown-btn");
    dropdownButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Lấy menu con ngay sau nút bấm
            const subMenu = button.nextElementSibling;
            
            // Toggle class 'active' để ẩn/hiện
            subMenu.classList.toggle("active");
            button.classList.toggle("active");
        });
    });

    // --- 3. LẮNG NGHE SỰ KIỆN CHO CÁC BỘ LỌC ---

    // Lọc theo GIỚI TÍNH & GIẢM GIÁ (dùng chung cho checkbox)
    const checkboxes = document.querySelectorAll('.black-check');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (['men', 'Women', 'Unisex'].includes(checkbox.id)) {
                // Xử lý Gender
                if (checkbox.checked) {
                    filterState.gender.push(checkbox.id);
                } else {
                    filterState.gender = filterState.gender.filter(g => g !== checkbox.id);
                }
                logStateChange('Gender', filterState.gender);
            } else if (checkbox.id === 'Sale') {
                // Xử lý Sale
                filterState.onSale = checkbox.checked;
                logStateChange('On Sale', filterState.onSale);
            }
        });
    });

    // Lọc theo GIÁ
    const priceInput = document.querySelector('.sub-menu input[type="number"]');
    priceInput.addEventListener('input', (event) => {
        filterState.price = event.target.value === '' ? null : Number(event.target.value);
        logStateChange('Price', filterState.price);
    });

    // Lọc theo SIZE
    const sizeButtons = document.querySelectorAll(".sidebar-size-btn");
    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Bỏ chọn tất cả các nút khác
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            // Chọn nút vừa bấm
            button.classList.add("selected");
            // Cập nhật trạng thái
            filterState.size = button.textContent;
            logStateChange('Size', filterState.size);
        });
    });

    // Lọc theo MÀU
    const colorCheckboxes = document.querySelectorAll(".color-input");
    colorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const color = checkbox.value;
            if (checkbox.checked) {
                filterState.colors.push(color);
            } else {
                filterState.colors = filterState.colors.filter(c => c !== color);
            }
            logStateChange('Colors', filterState.colors);
        });
    });

    // SẮP XẾP (Sort By)
    const sortButtons = document.querySelectorAll(".dropdown-option");
    sortButtons.forEach(button => {
        button.addEventListener("click", () => {
            sortButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            filterState.sortBy = button.textContent;
            logStateChange('Sort By', filterState.sortBy);
        });
    });
});