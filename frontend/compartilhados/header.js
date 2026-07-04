import { guardarNoHistorico } from "./historicoPesquisa.js";
import { buscarHistorico } from "./historicoPesquisa.js";
import { chamarSugestoesAPI } from "./sugestaoRota.js";

/* chamarSugestoesAPI() */

/* ====================================
    COMPORTAMENTOS DA BARRA DE PESQUISA
======================================*/

/* pesquisar */

function semAcentos(termo) {
    return termo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const barraDeBusca = document.getElementById("busca")
const lupa = document.getElementById("lupa")

barraDeBusca.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const busca = barraDeBusca.value.trim();

        guardarNoHistorico(busca)

        const buscaFormatada = semAcentos(busca)

        if(!busca) return;

        window.location.href = `http://localhost:5500/frontend/produtos/produtos.html?busca=${encodeURIComponent(buscaFormatada)}`
    }
});

lupa.addEventListener("click", () => {

    const busca = barraDeBusca.value.trim();

    guardarNoHistorico(busca)

    const buscaFormatada = semAcentos(busca)

    if(!busca) return;

    window.location.href = `http://localhost:5500/frontend/produtos/produtos.html?busca=${encodeURIComponent(buscaFormatada)}`
});

/* criar os itens do dropdown */

const dropdown = document.getElementById("dropdown")

//sugestões !! aqui é onde ta importante

const inputBusca = document.getElementById("busca")
let timeout;

inputBusca.addEventListener("input", async () => {
    const valor = inputBusca.value
    clearTimeout(timeout)

    timeout = setTimeout(async () => {

        const sugestoes = await chamarSugestoesAPI(valor)
        dropdown.textContent = ""
    
        sugestoes.forEach(sugestao => {
            
            const li = document.createElement("li")
            const icon = document.createElement("i")
    
            icon.classList.add("fa-solid", "fa-magnifying-glass");
    
            li.append(icon)
    
            const texto = document.createTextNode(`${sugestao}`)
    
            li.append(texto)
    
            dropdown.appendChild(li)
        })
    }, 300);

})

//histórico
barraDeBusca.addEventListener("focus", () => {
    const pesquisas = buscarHistorico()

    pesquisas.forEach(pesquisa => {
        const li = document.createElement("li")
        const icon = document.createElement("i")

        icon.classList.add("fa-solid", "fa-clock-rotate-left");

        li.append(icon)

        const texto = document.createTextNode(`${pesquisa}`)// melhor q .textContent pq ele preserva o estado passado ou seja o <i> n é alterado e sim somado ao texto muito melhor
        li.append(texto)

        dropdown.appendChild(li)
    })
})

/* os li leva pro resultado */

dropdown.addEventListener("click", (event) => {

    const liClicada = event.target.closest("li")

    if (liClicada && dropdown.contains(liClicada)){
        
        const busca = liClicada.textContent

        guardarNoHistorico(busca)

        const buscaFormatada = semAcentos(busca)

        window.location.href = `http://localhost:5500/frontend/produtos/produtos.html?busca=${encodeURIComponent(buscaFormatada)}`
    }
})

//fechar o dropdown

barraDeBusca.addEventListener("blur", () => {
    
    setTimeout(() => {
        dropdown.textContent = ""
    }, 200);

    //adicionar um delay senao o dropdown fecha antes do clique na li pegar
})

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