export let htmlProduct = "";

console.log("first")
setTimeout(() => {
  document.querySelector(".container").innerHTML = htmlProduct;
}, 2000)
console.log("first - 12")

fetch("../data/product.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
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
  })
  .catch((error) => console.error(error));

  console.log("first - 22")

function ConvertINTtoVND(number) {
  let numAfterConvert = "";
  let count = 0;
  while (number > 0) {
    if (count % 3 === 0) numAfterConvert = "," + numAfterConvert;
    let remainder = number % 10;
    numAfterConvert = remainder + numAfterConvert;
    number = Math.floor(number / 10);
    count++;
  }
  console.log(numAfterConvert[numAfterConvert.length - 1]);
  if (numAfterConvert[numAfterConvert.length - 1] === ",")
    numAfterConvert = numAfterConvert.slice(0, -1) + "₫";
  else numAfterConvert += "đ";
  return numAfterConvert;
}
