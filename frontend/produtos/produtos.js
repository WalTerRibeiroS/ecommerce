import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { slider } from "./sliderPreco.js";
import { chamarAPI } from "./chamarAPI.js";
import { carregarProdutosGrid } from "./carregarProdutos.js";
import { renderizarPaginacao } from "./paginacao.js";
import { iniciarBarraPesquisa } from "../header/header.js";

const select = document.getElementById("ordenacao")
const selectLimite = document.getElementById("produtos-por-pagina")
const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');

let paginaAtual = 1

async function carregarPagina() {

    verificarUsuarioLogado()
    slider()
    carregarProdutosGrid(paginaAtual)
    renderizarPaginacao()
    
    select.addEventListener("change", () => {
        paginaAtual = 1;
        carregarProdutosGrid(paginaAtual);
        renderizarPaginacao(paginaAtual);
    })
    
    selectLimite.addEventListener("change", () => {
        paginaAtual = 1;
        carregarProdutosGrid(paginaAtual);
        renderizarPaginacao(paginaAtual);
    });
    
    rangeMin.addEventListener("change", () => {
        paginaAtual = 1;
        carregarProdutosGrid(paginaAtual);
        renderizarPaginacao(paginaAtual);
    });
    
    rangeMax.addEventListener("change", () => {
        paginaAtual = 1;
        carregarProdutosGrid(paginaAtual);
        renderizarPaginacao(paginaAtual);
    });
}

// --- menu do mobile 

const filtrosAside = document.getElementById("filtros-aside")
const btnMobile = document.getElementById("btn-filtros-mobile");
const overlay = document.getElementById("overlay-aside");

btnMobile.addEventListener("click", () => {
    filtrosAside.classList.add("aberto")
    overlay.classList.add("ativo")
})

overlay.addEventListener("click", () => {
    filtrosAside.classList.remove("aberto")
    overlay.classList.remove("ativo")
})

carregarPagina()
iniciarBarraPesquisa()