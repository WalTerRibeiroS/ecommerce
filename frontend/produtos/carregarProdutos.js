import { criarCardProduto } from "../compartilhados/product-card.js"
import { chamarAPI } from "./chamarAPI.js"
import { renderizarPaginacao } from "./paginacao.js"

export async function carregarProdutosGrid(paginaAtual){

    const data = await chamarAPI(paginaAtual)

    const produtos = data.produtos
    const total = data.total

    const grid = document.getElementById("produtos-grid");
    
    if (Number(total) === 0){
        grid.innerHTML = `<h1>Não foi possível encontrar produtos com esses filtros. Tente outros</h1>`
    } else {
        grid.replaceChildren();
        
        produtos.forEach(produto => {
            grid.appendChild(
                criarCardProduto(produto)
            );
        }); 
    }

    return 
}