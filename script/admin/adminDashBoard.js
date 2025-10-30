export const AdminDashBoard = {
    html: 
    `
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
    css: '../css/adminDashBoard.css',
    canDeleteCss: true,
    init: function(){
        console.log("----------------------");
        console.log("In admin Dash Board");
    }
}