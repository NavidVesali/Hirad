const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

let isOpen = false;

menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

document.addEventListener("click", (event) => {
    if (isOpen && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        closeSidebar();
    }
});

function openSidebar() {
    sidebar.classList.remove("translate-x-[100%]");
    sidebar.classList.add("translate-x-0");
    menuBtn.classList.add("move-to-left");
    menuBtn.classList.add("open");
    isOpen = true;
}

function closeSidebar() {
    sidebar.classList.add("translate-x-[100%]");
    sidebar.classList.remove("translate-x-0");
    menuBtn.classList.remove("move-to-left");
    menuBtn.classList.remove("open");
    isOpen = false;
}