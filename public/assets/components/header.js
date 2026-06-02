/* ====================================
    ABRIR E FECHAR A SIDE BAR DO MENU
======================================*/
const sidebar = document.querySelector(".sidebar");

const sidebarMenu = document.getElementById("sidebar-menu");
const fecharMenuSidebar = document.getElementById("xmark-fechar-menu-sidebar");
const abrirMenuSidebar = document.getElementById("menu-sidebar");

const overlay = document.getElementById("overlay");

abrirMenuSidebar.addEventListener("click", () => {
    sidebar.style.display = "flex";
    overlay.style.display = "block";
});

fecharMenuSidebar.addEventListener("click", () => {
    sidebar.style.display = "none";
    overlay.style.display = "none";
});

overlay.addEventListener("click", () => {
    sidebar.style.display = "none";
    overlay.style.display = "none";
});