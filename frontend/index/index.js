import { criarCardProduto } from "../compartilhados/product-card.js"
import { verificarUsuarioLogado } from "../compartilhados/adicaoLogado.js"

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

carregarProdutosDestaque()
verificarUsuarioLogado()