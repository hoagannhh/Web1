const dropdownBtns = document.querySelectorAll(".dropdown-btn");

dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const submenu = btn.nextElementSibling;

    submenu.classList.toggle("show");
    btn.classList.toggle("rotate");
  });
});
