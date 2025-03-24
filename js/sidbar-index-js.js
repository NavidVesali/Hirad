
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

let isOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isOpen) {
    sidebar.classList.remove("translate-x-[100%]");
    sidebar.classList.add("translate-x-0");
    // Move button to left side
    menuBtn.classList.add("move-to-left");
  } else {
    sidebar.classList.add("translate-x-[100%]");
    sidebar.classList.remove("translate-x-0");
    // Move button back to right side
    menuBtn.classList.remove("move-to-left");
  }
  isOpen = !isOpen;

  // Toggle animation for the hamburger icon
  menuBtn.classList.toggle("open");
});