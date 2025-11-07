import { LoadPage } from "../LoadPage.js";
import { IsAuthenticated } from "../Pages/ButtonVerification .js";
import { Cart } from "../Pages/Cart.js";

let profileProduct;
export const ProductDetail = {
  html: `
    <img class="banner" src="../img/Group 22.png" alt="" />
    <div class="container-product-detail">
      <div class="container-img">
        <div class="vertical-image-bar">
        </div>
        <img
          class="represent"
          src="../img/products/shoe1/product1.PNG"
          alt=""
        />
      </div>
      <div class="container-infor">
        <h1 class="name-of-product">Sabrina 3Bule print</h1>
        <p class="kind-of-shoe">Basketball Shoes</p>
        <div class="color">
          
        </div>
        <p><i class="select-size">SELECT YOUR SIZE</i></p>
        <ul class="list-button-choose-size">

        </ul>
        <button class="add-to-cart">Add to cart</button>
        <button class="buy-now">Buy now</button>
        <div class="horizontal-bar"></div>
        <div class="description-detail">
          <h2>DESCRIPTION</h2>
          <button class="morethan">
            <img class="icon" src="../img/More Than.png" alt="" />
          </button>
        </div>
        <p class="des-p"></p>

       
      </div>
    </div>
    <div class="container-other-products">
      <div class="navigation">
        <p class="actor-descipt"><strong>You might also like</strong></p>
       
      </div>
      <div class="container-other">
          ${ShowMoreProduct()}
      </div>
    </div>`,
  css: `../css/productDetail.css`,
  canDeleteCss: true,
  init: function () {
    // console.log(this.HandleEvent());
    console.log("Init in product detail");
    //  AddEventImgColor();
    //  AddEventButtonChooseSize();
    // AddEventbuttonSubmit();
  },
  HandleEvent: function (proInfor) {
    // console.log(proInfor);
    console.log("handle Event in product detail");
    SetProInfor(proInfor);
    AddImage(proInfor);

    AddEventImgColor();
    AddEventButtonChooseSize();
    AddEventbuttonSubmit();
    this.init();
  },
};

function SetProInfor(proInfor) {
  profileProduct = { ...proInfor };
  console.log(profileProduct);
  console.log(typeof profileProduct);
}
function AddEventButtonChooseSize() {
  const btns = document.querySelectorAll(".size");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((btneach) => {
        btneach.classList.remove("size-selected");
      });
      if (btn.classList.contains("size-selected")) {
        btn.classList.remove("size-selected");
      } else {
        btn.classList.add("size-selected");
        console.log(btn.textContent);
        profileProduct.size = btn.textContent;
      }
    });
  });
}
function AddEventImgColor() {
  const imgs = document.querySelectorAll(".color .color-img");
  console.log("imgleng"+imgs.length);

  // Tự động chọn màu đầu tiên làm màu mặc định
  if (imgs.length > 0) {
    const defaultImg = imgs[0];
    defaultImg.classList.add("selected-img");
    // Set màu mặc định cho sản phẩm
    const path = defaultImg.src;
    const indexHyphen = path.lastIndexOf("-");
    const indexDot = path.lastIndexOf(".");
    const defaultColor = path.slice(indexHyphen + 1, indexDot);
    profileProduct.color = defaultColor;
  }

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      // Bỏ selected khỏi tất cả các hình
      imgs.forEach((imgEach) => {
        imgEach.classList.remove("selected-img");
      });
      // Thêm selected vào hình được click
      img.classList.add("selected-img");

      // Cập nhật màu sắc cho sản phẩm
      const path = img.src;
      const indexHyphen = path.lastIndexOf("-");
      const indexDot = path.lastIndexOf(".");
      const color = path.slice(indexHyphen + 1, indexDot);
      profileProduct.color = color;

      // Cập nhật hình ảnh đại diện
      const representImg = document.querySelector(".represent");
      if (representImg) {
        // Nếu là hình màu từ thư mục color
        if (img.src.includes("/color/")) {
          // Tìm hình ảnh tương ứng trong img-link-color của sản phẩm
          const matchingColorImg = profileProduct["img-link-color"]?.find(link => 
            link.toLowerCase().includes(`-${color.toLowerCase()}`)
          );
          if (matchingColorImg) {
            representImg.src = matchingColorImg;
          }
        }
        else {
          // Nếu là hình ảnh sản phẩm trực tiếp
          representImg.src = img.src;
        }
      }
      
    });
  });
}
// function AddEventbuttonSubmit(){
//       const btnSubmit = document.querySelector(".add-to-cart");
//       btnSubmit.addEventListener("click", () => {
//         if (!IsAuthenticated){
//           alert("ban phai dang nhap truoc khi thuc hien")
//           return;
//         }
//       const isChooseSize = !!document.querySelector(".size.size-selected");
//       const isChooseColor = !!document.querySelector(".color-img.selected-img");
//         // console.log(isChooseColor + " " + isChooseSize);
//       if (isChooseSize && isChooseColor){
//         alert("them vao gio hang");
//         // LoadPage("cart", document.getElementById("container"));
//         console.log(profileProduct)
//         Cart.HandleEventInCart(profileProduct);
//       }
//   })
// }
// Trong ProductDetail.js

function AddEventbuttonSubmit() {
  const btnAddToCart = document.querySelector(".add-to-cart");
  const btnBuyNow = document.querySelector(".buy-now"); // Lấy nút Buy Now

  // Logic xử lý khi nhấn "Buy Now"
  const handleBuyNow = () => {
    if (!IsAuthenticated) {
      alert("Bạn phải đăng nhập trước khi thực hiện.");
      return;
    }

    const isChooseSize = !!document.querySelector(".size.size-selected");
    // Không cần kiểm tra màu vì đã có màu mặc định
    
    if (isChooseSize) {
      // Chuẩn bị sản phẩm cho Checkout
      const productToCheckout = {
        ...profileProduct,
        selected: true, // Gán cờ selected: true
        checkOut: true, // Gán cờ checkOut: true (tương tự như logic của Product)
        quantity: 1, // Luôn là 1 khi Buy Now từ trang chi tiết
      };

      // 1. CHUẨN BỊ DỮ LIỆU ĐỂ LƯU
      let productsChecked = [productToCheckout]; // Chỉ có sản phẩm này trong mảng checkout
      let totalMoney = productToCheckout.price * productToCheckout.quantity;

      // 2. LƯU VÀO LOCAL STORAGE (Sử dụng logic lưu tạm thời cho checkout)
      // Cần hàm SaveCartData tương thích với logic này
      // Tạm thời, ta lưu trực tiếp vào LS để đơn giản hóa:
      localStorage.setItem("cartProducts", JSON.stringify(productsChecked));
      localStorage.setItem("cartTotalMoney", totalMoney);

      // 3. LƯU NGUỒN CHECKOUT VÀ CHUYỂN TRANG
      sessionStorage.setItem("checkoutSource", "product_detail"); // <-- Lưu cờ!

      LoadPage("payment", document.getElementById("container"));
    } else {
      alert("Vui lòng chọn size và color!");
    }
  };

  // Logic xử lý khi nhấn "Add to Cart"
  const handleAddToCart = () => {
    if (!IsAuthenticated) {
      alert("Bạn phải đăng nhập trước khi thực hiện.");
      return;
    }
    const isChooseSize = !!document.querySelector(".size.size-selected");
    // Không cần kiểm tra màu vì đã có màu mặc định
    
    if (isChooseSize) {
      alert("Thêm vào giỏ hàng");
      // Logic thêm vào giỏ hàng bình thường
      console.log(profileProduct);
      Cart.HandleEventInCart(profileProduct);
    } else {
      alert("Vui lòng chọn size và color!");
    }
  };

  // Gán sự kiện
  if (btnAddToCart) btnAddToCart.addEventListener("click", handleAddToCart);
  if (btnBuyNow) btnBuyNow.addEventListener("click", handleBuyNow);
}
function AddImage(proInfor) {
  AddImageRepresent(proInfor);
  AddImageColor(proInfor);
  AddListImage(proInfor); // Di chuyển xuống sau AddImageColor để đảm bảo các elements đã tồn tại
  EditNameProduct(proInfor);
  EditKindOfProduct(proInfor);
  AddButtonToChooseSize(proInfor);
  
  // Thêm sự kiện cho hình đại diện
  const representImg = document.querySelector(".represent");
  if (representImg) {
    representImg.addEventListener("click", () => {
      const verticalImages = document.querySelectorAll(".vertical-image-bar .img-detail");
      const matchingImage = Array.from(verticalImages).find(img => img.src === representImg.src);
      if (matchingImage) {
        verticalImages.forEach(img => img.classList.remove("selected-vertical"));
        matchingImage.classList.add("selected-vertical");
      }
    });
  }
}
function AddListImage(proInfor) {
  const contain = document.querySelector(".vertical-image-bar");
  let htmlImage = ``;
  
  // Thêm hình ảnh chính
  htmlImage += `
    <img
      class="img-detail selected-vertical"
      src=${proInfor["img-represent"]}
      alt=""
    />
  `;
  
  // Thêm các hình ảnh khác từ danh sách
  proInfor["img-link-list"].forEach((link) => {
    htmlImage += `
      <img
        class="img-detail"
        src=${link}
        alt=""
      />
    `;
  });
  
  
  contain.innerHTML = htmlImage;

  // Thêm sự kiện click cho các hình ảnh trong vertical-image-bar
  const verticalImages = contain.querySelectorAll(".img-detail");
  verticalImages.forEach(img => {
    img.addEventListener("click", () => {
      // Cập nhật selected cho vertical-image-bar
      verticalImages.forEach(i => i.classList.remove("selected-vertical"));
      img.classList.add("selected-vertical");
      
      // Cập nhật hình ảnh đại diện
      const representImg = document.querySelector(".represent");
      if (representImg) {
        representImg.src = img.src;
      }
      
      // Nếu hình được click là hình màu, cập nhật chọn màu tương ứng
      if (proInfor["img-link-color"]?.includes(img.src)) {
        const colorImgs = document.querySelectorAll(".color .color-img");
        const indexHyphen = img.src.lastIndexOf("-");
        const indexDot = img.src.lastIndexOf(".");
        const color = img.src.slice(indexHyphen + 1, indexDot);
        
        colorImgs.forEach(colorImg => {
          if (colorImg.src.includes(`-${color}`)) {
            colorImg.click(); // Trigger sự kiện click trên màu tương ứng
          }
        });
      }
    });
  });
}
function AddButtonToChooseSize(proInfor) {
  const container = document.querySelector(
    ".container-infor .list-button-choose-size"
  );
  let htmlButton = ``;
  proInfor.size.forEach((sizeEach) => {
    htmlButton += `
          <button class="size"><strong>${sizeEach}</strong></button>
`;
  });
  container.insertAdjacentHTML("beforeend", htmlButton);
}
function EditKindOfProduct(proInfor) {
  const name = document.querySelector(".container-infor .kind-of-shoe");
  name.textContent = proInfor.gender + " " + proInfor.brand;
}
function EditNameProduct(proInfor) {
  const name = document.querySelector(".container-infor .name-of-product");
  name.textContent = proInfor.name;
}
function AddImageColor(proInfor) {
  const colors = document.querySelector(".container-infor .color");
  let htmlImage = ``;
  if (proInfor.hasOwnProperty("img-link-color")) {
    proInfor["img-link-color"].forEach((link) => {
      htmlImage += `
              <img
                class="color-img"
                src=${link}
                alt=""
              />
      `;
    });
  } else {
    proInfor.color.forEach((link) => {
      link = link.trim();
      htmlImage += `
              <img
                class="color-img"
                src="../img/color/${link}.png"
                alt=""
              />
      `;
    });
  }
  colors.insertAdjacentHTML("beforeend", htmlImage);
  
  // colors.innerHTML += ;
}
function AddImageRepresent(proInfor) {
  const represent = document.querySelector(".container-img .represent");
  represent.src = ` ${proInfor["img-represent"]} `;
}
// InsertPage("productDetail");
function ShowMoreProduct() {
  const allProduct = JSON.parse(localStorage.getItem("allProduct"));
  let i = 0;
  let html = ``;
  if (!allProduct || !Array.isArray(allProduct) || allProduct.length === 0) {
    return ""; // Trả về HTML rỗng, không làm gì cả
  }
  allProduct.forEach((p) => {
    if (i > 4) return;
    html += `
        <div class="product">
          <img class="product-img" src="${p["img-represent"]}" alt="" />
          <p class="name">${p.name}</p>
          <p class="kind-of-shoe">${ConvertIDToCategoryOpt(p.category)}</p>
          <p class="price">${ConvertINTtoVND(Number(p.price))}</p>
        </div>
    `;
    i++;
  });
  return html;
}
function ConvertINTtoVND(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function ConvertIDToCategoryOpt(proCate) {
  // console.log(proCate);
  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  let temp = [];
  // console.log(categories);
  if (categories.length <= 3) return temp;
  for (let i = 3; i < categories.length; i++) {
    for (let j = 0; j < proCate.length; j++) {
      if (categories[i].id === proCate[j]) {
        temp.push(categories[i].name);
      }
    }
  }
  // console.log(temp)
  return temp;
}
function ConvertIDToCategoryMain(proCate) {
  // console.log(proCate);
  const categories = JSON.parse(localStorage.getItem("categoriesDB"));
  // console.log(categories);
  let temp = [];
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < proCate.length; j++) {
      if (categories[i].id === proCate[j] && i < 3) {
        temp.push(categories[i].name);
      }
    }
  }
  // console.log(temp)
  return temp;
}
