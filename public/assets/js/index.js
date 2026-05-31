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