import { criarCardProduto } from "../components/product-card.js"

async function carregarProdutosDestaque(){
    const response = await fetch("http://localhost:3000/api/v1/produtos/destaque");

    const produtos = await response.json();

    const carrosel = document.getElementById("carrosel-produtos");

    carrosel.replaceChildren();

    produtos.forEach(produto => {
        carrosel.appendChild(
            criarCardProduto(produto)
        );
    });
}

carregarProdutosDestaque()

async function verificarUsuarioLogado() {
    
    try {
        const response = await fetch("http://localhost:3000/api/v1/auth/status",
            {
                credentials: "include"
            }
        );

        if (response.ok) {
            document.querySelector(".texto-login").textContent = "Logado";

            document.getElementById("icone-login").classList.remove("fa-regular");

            document.getElementById("icone-login").classList.add("fa-solid");
        }
    } catch (error) {
        console.error(error)
    }
}

verificarUsuarioLogado()