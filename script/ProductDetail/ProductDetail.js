import { LoadPage } from '../LoadPage.js';
import {IsAuthenticated} from '../Pages/ButtonVerification .js'
import { Cart } from '../Pages/Cart.js';

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
          <img
            class="color-img"
            src="../img/products/shoe1/product1.PNG"
            alt=""
          />
          <img
            class="color-img"
            src="../img/products/shoe1/product1.PNG"
            alt=""
          />
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

        <div class="horizontal-bar"></div>
        <div class="review-detail">
          <h2>REVIEWS</h2>
          <button class="morethan">
            <img class="icon" src="../img/More Than.png" alt="" />
          </button>
        </div>
      </div>
    </div>
    <div class="container-other-products">
      <div class="navigation">
        <p class="actor-descipt"><strong>You might also like</strong></p>
        <div class="left-right">
          <button class="left">
            <img src="../img/More Than (1).png" alt="" />
          </button>
          <button class="right">
            <img src="../img/More Than (2).png" alt="" />
          </button>
        </div>
      </div>
      <div class="container-other">
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
        <div class="product">
          <img class="product-img" src="../img/image 38.png" alt="" />
          <p class="name">Nike p-6000</p>
          <p class="kind-of-shoe">woman's shoe</p>
          <p class="price">3,239,000 Đ</p>
        </div>
      </div>
    </div>`,
    css: `../css/productDetail.css`,
    canDeleteCss: true,
    init: function(){
        // console.log(this.HandleEvent());
        console.log("Init in product detail");
        //  AddEventImgColor();
        //  AddEventButtonChooseSize();
        // AddEventbuttonSubmit();

    },
    HandleEvent: function(proInfor){
      // console.log(proInfor);
      console.log("handle Event in product detail");
      SetProInfor(proInfor);
      AddImage(proInfor);

      
      AddEventImgColor();
      AddEventButtonChooseSize();
      AddEventbuttonSubmit();
      this.init();
    }
}
function SetProInfor(proInfor){
  profileProduct = {...proInfor};
  console.log(profileProduct);
  console.log(typeof(profileProduct));
}
function AddEventButtonChooseSize(){
  const btns = document.querySelectorAll(".size");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(btneach => {
        btneach.classList.remove("size-selected");
      })
      if (btn.classList.contains("size-selected")){
        btn.classList.remove("size-selected")
      }else{
        btn.classList.add("size-selected");
        console.log(btn.textContent);
        profileProduct.size = btn.textContent;
      }
    })
  })
}
function AddEventImgColor(){
  const imgs = document.querySelectorAll(".color .color-img");
  console.log(imgs.length);
  if (imgs.length === 1){
    imgs[0].classList.add("selected-img");
  }
  imgs.forEach(img => {
    img.addEventListener("click", () =>{
      imgs.forEach(imgEach => {
        imgEach.classList.remove("selected-img");
      })
      if (img.classList.contains("selected-img")){
        img.classList.remove("selected-img");
      }
      else  {
        img.classList.add("selected-img");
        const path = img.src;
        const indexHyphen = path.lastIndexOf('-'); 
        const indexDot = path.lastIndexOf('.'); 
        const color = path.slice(indexHyphen + 1, indexDot);
        console.log(color);
        profileProduct.color = color;
      }
    })
  })
}
function AddEventbuttonSubmit(){
      const btnSubmit = document.querySelector(".add-to-cart");
      btnSubmit.addEventListener("click", () => {
        if (!IsAuthenticated){
          alert("ban phai dang nhap truoc khi thuc hien")
          return;
        }
      const isChooseSize = !!document.querySelector(".size.size-selected");
      const isChooseColor = !!document.querySelector(".color-img.selected-img");
        // console.log(isChooseColor + " " + isChooseSize);
      if (isChooseSize && isChooseColor){
        alert("them vao gio hang");
        // LoadPage("cart", document.getElementById("container"));
        console.log(profileProduct)
        Cart.HandleEventInCart(profileProduct);
      }
  })
}
function AddImage(proInfor){

  AddListImage(proInfor);
  AddImageRepresent(proInfor);
  AddImageColor(proInfor);
  EditNameProduct(proInfor);
  EditKindOfProduct(proInfor);
  AddButtonToChooseSize(proInfor);

}
function AddListImage(proInfor){
  const contain = document.querySelector(".vertical-image-bar");
  let htmlImage = ``;
  // console.log("-----------------------------------------");
  // console.log(contain);
  // console.log(proInfor);
    proInfor["img-link-list"].forEach(link => {
    htmlImage += `
                  <img
                  class="img-detail"
                  src=${link}
                  alt=""
                />
                `
  });
  htmlImage += `
                  <img
                  class="img-detail"
                  src=${proInfor["img-represent"]}
                  alt=""
                />
  `
    contain.innerHTML = htmlImage; 
}
function AddButtonToChooseSize(proInfor){
  const container = document.querySelector(".container-infor .list-button-choose-size");
  let htmlButton = ``;
  proInfor.size.forEach(sizeEach => {
    htmlButton += 
`
          <button class="size"><strong>${sizeEach}</strong></button>
`;
  })
  container.insertAdjacentHTML("beforeend", htmlButton);
}
function EditKindOfProduct(proInfor){
  const name = document.querySelector(".container-infor .kind-of-shoe");
  name.textContent = proInfor.gender + " " + proInfor.brand;
}
function EditNameProduct(proInfor){
  const name = document.querySelector(".container-infor .name-of-product");
  name.textContent = proInfor.name;
}
function AddImageColor(proInfor){
  const colors = document.querySelector(".container-infor .color");
  let htmlImage = ``;
  proInfor["img-link-color"].forEach((link) => {
    htmlImage += `
            <img
              class="color-img"
              src=${link}
              alt=""
            />
    `
    colors.insertAdjacentHTML('beforeend', htmlImage);
  })
  colors.innerHTML = htmlImage;
  // colors.innerHTML += ;
}
function AddImageRepresent(proInfor){
  const represent =document.querySelector(".container-img .represent");
  represent.src =` ${proInfor["img-represent"]} `;
}
// InsertPage("productDetail");