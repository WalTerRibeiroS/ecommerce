import { inicializarEventosBarraPesquisa } from "./eventos.js";

export function iniciarBarraPesquisa() {
    inicializarEventosBarraPesquisa()
}

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

/* ==================================================
    FECHAR O MENU DE LOGADO 
    (o de abrir ta na funcao 
    atualizarInterfaceLogado() no adicaoLogado.js)
====================================================*/

const menuLogado = document.querySelector(".menu-logado");

overlay.addEventListener("click", () => {
    menuLogado.classList.toggle("ativo");
    overlay.style.display = "none";
});

/* ====================================
    FAZER LOGOUT DA CONTA
======================================*/

const botoesLogout = document.querySelectorAll(".botao-logout");

botoesLogout.forEach(botao => {
    botao.addEventListener("click", async () => {
    
        await fetch("https://ecommerce-meu.up.railway.app/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        sessionStorage.setItem("notificacao", JSON.stringify({
            mensagem: "Logout realizado",
            tipo: "sucesso"
        }));

        window.location.href = "https://ecommerce-ten-weld-12.vercel.app/";
    })
})