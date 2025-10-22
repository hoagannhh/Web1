export const footer = {
    html: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>MADE BY</h4>
          <p>
            Trần Chinh Thành<br />Nguyễn Hiếu Nghĩa<br />Quách Kỳ Minh<br />Nguyễn
            Hoàng Anh
          </p>
        </div>
        <div class="footer-section">
          <h4>ABOUT US</h4>
          <p>Dự án WEB<br />SHOES STORE</p>
        </div>
        <div class="footer-section">
          <h4>FOLLOW</h4>
          <a href="https://github.com/MynameNghia123" target="_blank">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              class="icon"
            />
            MynameNghia123
          </a>
        </div>
        <div class="footer-section country">
          <img
            src="https://cdn-icons-png.flaticon.com/512/44/44386.png"
            alt="Globe"
            class="icon"
          />
          VIET NAM
        </div>
      </div>
    </footer>
    `,
    canDeleteCss: false,
    css: '../css/footer.css',
    init: function(){
        console.log("footer done");
    }
}