export let htmlProduct = "";

let allProducts = [];
let currentPage = 1;
const productsPerPage = 9; // số sản phẩm trên 1 trang

console.log("first");

console.log("first - 12");
// console.log("first")
// setTimeout(() => {
//   document.querySelector(".container").innerHTML = htmlProduct;
// }, 2000)
// console.log("first - 12")

fetch("../data/product.json")
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    renderProduct();
    renderPagination();
  })
  .catch((error) => console.error(error));

console.log("first - 22");

function renderProduct() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  htmlProduct = ""; // reset nội dung cũ

  currentProducts.forEach((product) => {
    htmlProduct += `
        <div class="prod-demo">
          <div class="prod">
            <div class="new-in-prod"><p class="new-text">New</p></div>
            <img class="img-prod" src="${product["img-represent"]}" />
          </div>
          <div class="info-prod">
            <p class="name-prod">${product.name}</p>
            <p class="atribute-prod">${product.gender} ${product.brand}</p>
            <p class="price">${ConvertINTtoVND(product.price)}</p>
            <div class="buy-now">
              <button class="buy-now-btn">Buy Now</button>
            </div>
            </div>
        </div>
                        `;
  });

  document.querySelector(".product-grid").innerHTML = htmlProduct;
}

function renderPagination() {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  let paginationHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="page-btn ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">
        ${i}
      </button>
    `;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;

  // Gắn sự kiện click
  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      currentPage = Number(e.target.dataset.page);
      renderProduct();
      renderPagination();
    });
  });
}

function ConvertINTtoVND(number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
// function ConvertINTtoVND(number) {
//   let numAfterConvert = "";
//   let count = 0;
//   while (number > 0) {
//     if (count % 3 === 0) numAfterConvert = "," + numAfterConvert;
//     let remainder = number % 10;
//     numAfterConvert = remainder + numAfterConvert;
//     number = Math.floor(number / 10);
//     count++;
//   }
//   console.log(numAfterConvert[numAfterConvert.length - 1]);
//   if (numAfterConvert[numAfterConvert.length - 1] === ",")
//     numAfterConvert = numAfterConvert.slice(0, -1) + "₫";
//   else numAfterConvert += "đ";
//   return numAfterConvert;
// }
