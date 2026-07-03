/* ====================================
    FAZER LOGOUT DA CONTA
======================================*/

function semAcentos(termo) {
    return termo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const barraDeBusca = document.getElementById("busca")

barraDeBusca.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const busca = barraDeBusca.value.trim();
        const buscaFormatada = semAcentos(busca)

        if(!busca) return;

        window.location.href = `http://localhost:5500/frontend/produtos/produtos.html?busca=${encodeURIComponent(buscaFormatada)}`
        //encoded é pra caso seja algo como "cadeira de plástico" nos parametros nao fique com espaço e quebre, ele fica assim "cadeira%20de%20plastico"
    }
});

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
    
        await fetch("http://localhost:3000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        sessionStorage.setItem("notificacao", JSON.stringify({
            mensagem: "Logout realizado",
            tipo: "sucesso"
        }));

        window.location.href = "http://localhost:5500/frontend/index/index.html";
    })
})