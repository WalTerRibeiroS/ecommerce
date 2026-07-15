import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";
import { pegarDadosComprados, realizarCompra } from "./apis.js"
import { atualizarTelaFinalizar } from "./atualizarTela.js";

const checkout = sessionStorage.getItem("checkout");

if (!checkout) {
    window.location.href = "https://ecommerce-ten-weld-12.vercel.app/carrinho";
}

const produtos = JSON.parse(
    sessionStorage.getItem("checkout")
)

const dados = await pegarDadosComprados(produtos)
atualizarTelaFinalizar(dados, produtos)

const botaoFinalizar = document.getElementById("finalizar-compra")
const alertaDeErro = document.getElementById("alerta-de-erro")
const blocoDeErro = document.querySelector(".alerta-de-erro")

botaoFinalizar.addEventListener("click", async() => {

    blocoDeErro.style.display = "none";

    const response = await realizarCompra(produtos)
    
    if (!response.ok) {
        const mensagemErro = result.errors?.[0]?.message || result.message || "Ocorreu um erro inesperado.";

        alertaDeErro.textContent = mensagemErro;
        blocoDeErro.style.display = "flex";
        return;
    }

    sessionStorage.setItem("notificacao", JSON.stringify({
        mensagem: "compra concluído com sucesso! Cheque ela em 'minhas compras'",
        tipo: "sucesso"
    }));

    sessionStorage.removeItem("checkout")

    window.location.href = "https://ecommerce-ten-weld-12.vercel.app/";
})

verificarUsuarioLogado()
iniciarBarraPesquisa()