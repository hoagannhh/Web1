let allProducts = [];
let categories = [];
export const AdminDashBoard = {
  html: `
      <div class="main-content">
        <div class="header">
          <div class="left-header">
            <div><p>Dashboard</p></div>
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
        <div>
          <section class="stats-grid">
            <div class="stat-card">
              <div class="icon-container">
                <img src="../icon/Best Seller.png" alt="" />
              </div>
              <div class="stat-info">
                <h3>Top-selling product</h3>
                <div class="value">Bella UT Femme</div>
                <div class="percentage">+3,6% since last month</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="icon-container">
                <img src="../icon/Total Sales.png" alt="" />
              </div>
              <div class="stat-info">
                <h3>Total sales</h3>
                <div class="value">360.000.000₫</div>
                <div class="percentage">+3,6% since last month</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="icon-container">
                <img src="../icon/Order Completed.png" alt="" />
              </div>
              <div class="stat-info">
                <h3>Total orders</h3>
                <div class="value">3600 orders</div>
                <div class="percentage">+3,6% since last month</div>
              </div>
            </div>

            <div class="stat-card">
              <div class="icon-container">
                <img src="../icon/Add User Male.png" alt="" />
              </div>
              <div class="stat-info">
                <h3>New users</h3>
                <div class="value">360 new users</div>
                <div class="percentage">+3,6% since last month</div>
              </div>
            </div>
          </section>

          <section class="main-container">
            <div class="top-products">
              <h2>Top sold Products</h2>
              <div class="product-grid">
                <div class="product-card">
                  <img src="../product-img/s5/ms5-1.png" alt="Bella UT Femme" />
                  <div class="product-info">
                    <h4>Bella UT Femme</h4>
                    <div class="sold">Sold: 100 prods</div>
                    <div class="profit">Profit margin: 28,57%</div>
                  </div>
                </div>

                <div class="product-card">
                  <img src="../product-img/s3/ms3-1.png" alt="Chuck 70" />
                  <div class="product-info">
                    <h4>Chuck 70</h4>
                    <div class="sold">Sold: 30 prods</div>
                    <div class="profit">Profit margin: 28,57%</div>
                  </div>
                </div>

                <div class="product-card">
                  <img
                    src="../product-img/s1/ms1-1.png"
                    alt="Air Jordan 4 RM"
                  />
                  <div class="product-info">
                    <h4>Air Jordan 4 RM</h4>
                    <div class="sold">Sold: 50 prods</div>
                    <div class="profit">Profit margin: 28,57%</div>
                  </div>
                </div>

                <div class="product-card">
                  <img
                    src="../product-img/s4/ms4-1.png"
                    alt="Classic Slip-On"
                  />
                  <div class="product-info">
                    <h4>Classic Slip-On Checkerboard Shoe</h4>
                    <div class="sold">Sold: 49 prods</div>
                    <div class="profit">Profit margin: 28,57%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="top-users">
              <div class="top-users-header">
                <img src="../icon/Rank.png" alt="" />
                <h2>Top 5 users</h2>
              </div>
              <div class="user-list">
                <div class="user-item">
                  <span class="rank" style="color: #d9dc00">#1</span>
                  <img
                    src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                    alt="Marin"
                  />
                  <span class="username">Marin</span>
                </div>

                <div class="user-item">
                  <span class="rank" style="color: #adadad">#2</span>
                  <img
                    src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                    alt="Minato"
                  />
                  <span class="username">Minato</span>
                </div>

                <div class="user-item">
                  <span class="rank" style="color: #ca9668">#3</span>
                  <img
                    src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                    alt="Sakura"
                  />
                  <span class="username">Sakura</span>
                </div>

                <div class="user-item">
                  <span class="rank">#4</span>
                  <img
                    src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                    alt="Đức"
                  />
                  <span class="username">Đức</span>
                </div>

                <div class="user-item">
                  <span class="rank">#5</span>
                  <img
                    src="../img/547992253_823059776934031_1523588798799183290_n.jpg"
                    alt="Danh"
                  />
                  <span class="username">Danh</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    `,
  css: "../css/adminDashBoard.css",
  canDeleteCss: true,
  init: async function () {
    console.log("----------------------");
    console.log("In admin Dash Board");
    // localStorage.removeItem("categoriesDB");
    // localStorage.removeItem("allProduct");
    let allProducts = [];
    console.log(allProducts);
    const STORAGE_KEY = "allProduct";
    const CATEGORY_KEY = "categoriesDB";
    await loadInitialData();

    // thử load từ localStorage trước
    const stored_2 = localStorage.getItem(CATEGORY_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);
    // if (stored_2) {
    //   try {
    //     const parsed = JSON.parse(stored_2);
    //     if (Array.isArray(parsed) && parsed.length > 0) {
    //       categories = parsed;
    //       console.log(`Đã có dữ liệu ôk`);
    //       return; // đã có dữ liệu, không cần fetch
    //     }
    //   } catch (e) {
    //     console.warn("Corrupted localStorage data, will reload from JSON", e);
    //     localStorage.removeItem(CATEGORY_KEY);
    //   }
    // }
    //     // nếu chưa có dữ liệu thì fetch từ file JSON và lưu vào localStorage
    // const JSON_FILE_PATH_2 = "../data/category.json";
    // try {
    //   await loadDataFromJson(JSON_FILE_PATH_2, categories);
    //   localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
    //   console.log(
    //     `Saved ${categories.length} products to localStorage (${CATEGORY_KEY})`
    //   );
    // } catch (e) {
    //   console.error("Failed to load products from JSON:", e);
    // }


    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allProducts = parsed;
          console.log(`Đã có dữ liệu ôk`);
          return; // đã có dữ liệu, không cần fetch
        }
      } catch (e) {
        console.warn("Corrupted localStorage data, will reload from JSON", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // nếu chưa có dữ liệu thì fetch từ file JSON và lưu vào localStorage
    const JSON_FILE_PATH = "../data/product.json";
    try {
      await loadDataFromJson(JSON_FILE_PATH, allProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
      console.log(
        `Saved ${allProducts.length} products to localStorage (${STORAGE_KEY})`
      );
    } catch (e) {
      console.error("Failed to load products from JSON:", e);
    }
    console.log(allProducts);
    console.log(categories);
  },
};
async function loadDataFromJson(filePath, targetArray) {
  console.log(`Bắt đầu tải dữ liệu từ: ${filePath}`);
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status} - Không thể tải tệp.`);
    }

    const data = await response.json();
    targetArray.push(...data);

    console.log(
      `Tải dữ liệu hoàn tất. Số lượng mục đã tải: ${targetArray.length}`
    );
  } catch (error) {
    console.error("Lỗi khi tải hoặc xử lý JSON:", error);
  }
}
async function loadInitialData() {
  try {
    // 1. Luôn load data từ JSON trước (base data)
    console.log("Đang tải dữ liệu từ file JSON...");
    const response = await fetch('../data/category.json');
    
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    }
    
    const data = await response.json();
    let categoriesFromJSON = data.categories || [];
    console.log("Đã load từ JSON:", categoriesFromJSON);
    
    // 2. Kiểm tra localStorage
    const storedData = localStorage.getItem('categoriesDB');
    
    if (storedData) {
      console.log("Phát hiện dữ liệu trong localStorage, đang merge...");
      const categoriesFromLocalStorage = JSON.parse(storedData);
      
      // 3. Tạo Map để dễ tìm kiếm theo tên
      const jsonMap = new Map();
      categoriesFromJSON.forEach(cat => {
        jsonMap.set(cat.name, cat);
      });
      
      // 4. Merge: Cập nhật thông tin từ localStorage vào JSON data
      categoriesFromLocalStorage.forEach(localCat => {
        if (jsonMap.has(localCat.name)) {
          // Category đã tồn tại trong JSON -> cập nhật thông tin từ localStorage
          const index = categoriesFromJSON.findIndex(c => c.name === localCat.name);
          if (index !== -1) {
            // Giữ lại các thay đổi từ localStorage (isShown, quantity...)
            categoriesFromJSON[index] = {
              ...categoriesFromJSON[index],
              ...localCat
            };
          }
        } else {
          // Category không có trong JSON -> là category mới do user thêm
          categoriesFromJSON.push(localCat);
        }
      });
      
      console.log("Đã merge dữ liệu:", categoriesFromJSON);
    } else {
      console.log("LocalStorage trống, sử dụng dữ liệu từ JSON.");
    }
    
    // 5. Lưu lại vào localStorage sau khi merge
    localStorage.setItem('categoriesDB', JSON.stringify(categoriesFromJSON));
    
    return categoriesFromJSON;
    
  } catch (error) {
    console.error("Không thể tải file JSON:", error);
    
    // Fallback: Nếu lỗi, thử load từ localStorage
    const storedData = localStorage.getItem('categoriesDB');
    if (storedData) {
      console.log("Sử dụng dữ liệu từ localStorage do lỗi load JSON.");
      return JSON.parse(storedData);
    }
    
    // Trả về dữ liệu mẫu nếu không có gì
    console.log("Sử dụng dữ liệu mẫu.");
    return [
      { name: "Nam", quantity: 1000, isShown: true, manageable: true },
      { name: "Nữ", quantity: 1000, isShown: true, manageable: true },
      { name: "Trẻ em", quantity: 1000, isShown: true, manageable: true },
      { name: "Mùa Thu", quantity: 0, isShown: true, manageable: true },
      { name: "Christmas", quantity: 0, isShown: false, manageable: true }
    ];
  }
}