import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";
import { pegarDadosComprados, realizarCompra } from "./apis.js"
import { atualizarTelaFinalizar } from "./atualizarTela.js";

const checkout = sessionStorage.getItem("checkout");

if (!checkout) {
    window.location.href = "http://localhost:5500/frontend/carrinho/carrinho.html";
}

const produtos = JSON.parse(
    sessionStorage.getItem("checkout")
)

const dados = await pegarDadosComprados(produtos)
atualizarTelaFinalizar(dados, produtos)

const botaoFinalizar = document.getElementById("finalizar-compra")
const alertaDeErro = document.getElementById("alerta-de-erro")
const blocoDeErro = document.querySelector(".alerta-de-erro")

console.log(produtos)

botaoFinalizar.addEventListener("click", async() => {

    blocoDeErro.style.display = "none";

    realizarCompra(produtos)
    
/*     if (!response.ok) {
        const mensagemErro = result.errors?.[0]?.message || result.message || "Ocorreu um erro inesperado.";

        alertaDeErro.textContent = mensagemErro;
        blocoDeErro.style.display = "flex";
        return;
    } */
})


/* ao final da compra fazer sessionStorage.removeItem("checkout"); */

verificarUsuarioLogado()
iniciarBarraPesquisa()