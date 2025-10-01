const header = document.querySelector(".task-bar");
const sidebar = document.querySelector(".sidebar");
let lastScroll = 0;
window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (lastScroll > currentScroll) {
    header.classList.remove("hide");
    sidebar.classList.add("push");
  } else {
    header.classList.add("hide");
    sidebar.classList.remove("push");
  }
  lastScroll = currentScroll;
});
