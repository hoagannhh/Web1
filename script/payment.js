function showForm() {
  document.getElementById("address-view").classList.add("hidden");
  document.getElementById("form-view").classList.remove("hidden");
}

function showAddress() {
  document.getElementById("form-view").classList.add("hidden");
  document.getElementById("address-view").classList.remove("hidden");
}

function confirmAddress() {
  let newAddress = document.getElementById("new-address").value;
  if (newAddress.trim() !== "") {
    document.getElementById("current-address").textContent = newAddress;
    document.querySelector(".reset-address").value = "";
  }
  showAddress();
}
const Credit = document.querySelector(".credit-method");
const infoCard = document.querySelector(".infor-card");
Credit.addEventListener("click", () => {
  infoCard.classList.toggle("hidden");
});
