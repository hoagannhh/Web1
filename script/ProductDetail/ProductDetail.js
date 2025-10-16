import { InsertPage } from '../LoadPage.js'

export const ProductDetail = {
    html: `
    <img class="banner" src="../img/Group 22.png" alt="" />
    <div class="container-product-detail">
      <div class="container-img">
        <div class="vertical-image-bar">
          <img
            class="img-detail"
            src="../img/products/shoe1/product1.PNG"
            alt=""
          />
          <img
            class="img-detail"
            src="../img/products/shoe1/product2.PNG"
            alt=""
          />
          <img
            class="img-detail"
            src="../img/products/shoe1/product3.PNG"
            alt=""
          />
          <img
            class="img-detail"
            src="../img/products/shoe1/product4.PNG"
            alt=""
          />
          <img
            class="img-detail"
            src="../img/products/shoe1/product5.PNG"
            alt=""
          />
          <img
            class="img-detail"
            src="../img/products/shoe1/product6.PNG"
            alt=""
          />
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
        <ul>
          <button class="size"><strong>38.0</strong></button>
          <button class="size"><strong>38.5</strong></button>
          <button class="size"><strong>39.0</strong></button>
          <button class="size"><strong>39.5</strong></button>
          <button class="size"><strong>40.0</strong></button>
          <button class="size"><strong>40.5</strong></button>
          <button class="size"><strong>41.0</strong></button>
          <button class="size"><strong>41.5</strong></button>
          <button class="size"><strong>42.0</strong></button>
          <button class="size"><strong>42.5</strong></button>
          <button class="size"><strong>43.0</strong></button>
          <button class="size"><strong>43.5</strong></button>
        </ul>
        <button class="add-to-cart">Add to cart</button>
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
        
    }
}
// InsertPage("productDetail");