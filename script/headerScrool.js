const header = document.querySelector(".task-bar");

let lastScroll = 0;
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (lastScroll > currentScroll) {
    header.classList.remove("hide");
  } else {
    header.classList.add("hide");
  }
  lastScroll = currentScroll;
});
