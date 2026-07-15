import { chamarAPI } from "./produto.js";

export function ativarEventosBotao() {
    botaoComprar()
}

const carrinhoBotao = document.getElementById("btn-carrinho")
const alertaDeErro = document.getElementById("alerta-de-erro")
const blocoDeErro = document.querySelector(".alerta-de-erro")

const comprarBotao = document.getElementById("btn-comprar")

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

        const response = await fetch("https://ecommerce-meu.up.railway.app/api/v1/carrinho/adicionar", {
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
        
        window.location.href = "https://ecommerce-ten-weld-12.vercel.app/carrinho"
    })
    
    comprarBotao.addEventListener("click", async () => {
        
        blocoDeErro.style.display = "none";

        const quantidade = Number(document.querySelector(".quantidade-selecionada").value);
        const infoProduto = await chamarAPI()
        const produtoId = infoProduto.id

        const dados = [{
            id: produtoId,
            quantidade: quantidade
        }]

        const response = await fetch("https://ecommerce-meu.up.railway.app/api/v1/produtos/valores", {
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

        sessionStorage.removeItem("checkout")

        sessionStorage.setItem(
            "checkout",
            JSON.stringify(dados)
        );
        
        window.location.href = "https://ecommerce-ten-weld-12.vercel.app/finalizar"
    })

}