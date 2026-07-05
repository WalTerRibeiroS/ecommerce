import { criarCardProduto } from "../compartilhados/product-card.js"
import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js"

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
verificarUsuarioLogado()
iniciarBarraPesquisa()