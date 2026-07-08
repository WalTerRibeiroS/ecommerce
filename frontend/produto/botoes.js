import { chamarAPI } from "./produto.js";

export function ativarEventosBotao() {
    botaoComprar()
}

const carrinhoBotao = document.getElementById("btn-carrinho")
const alertaDeErro = document.getElementById("alerta-de-erro")
const blocoDeErro = document.querySelector(".alerta-de-erro")

function botaoComprar() {
    carrinhoBotao.addEventListener("click", async () => {
        
        blocoDeErro.style.display = "none";

        const quantidade = Number(document.querySelector(".quantidade-selecionada").value);
        const infoProduto = await chamarAPI()
        const produtoId = infoProduto.id

        const dados = {
            produto_id: produtoId,
            quantidade: quantidade
        }

        const response = await fetch("http://localhost:3000/api/v1/carrinho/adicionar", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (!response.ok) {
            const mensagemErro = result.errors?.[0]?.message || result.message || "Ocorreu um erro inesperado.";

            alertaDeErro.textContent = mensagemErro;
            blocoDeErro.style.display = "flex";
            return;
        }
        
        window.location.href = "http://localhost:5500/frontend/carrinho/carrinho.html"
    })
}