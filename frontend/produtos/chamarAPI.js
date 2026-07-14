export async function chamarAPI(paginaAtual) {
    
    const ordenacao = document.getElementById("ordenacao").value;
    const limite = parseInt(document.getElementById("produtos-por-pagina").value);
    const precoMin = document.getElementById("range-min").value;
    const precoMax = document.getElementById("range-max").value;
    
    const params = new URLSearchParams(window.location.search);
    const busca = params.get("busca");
    
    const textoBusca = document.getElementById("resultado-busca")

    textoBusca.textContent = busca ? `Você pesquisou: ${busca}` :  "" 

    const response = await fetch(
        `https://ecommerce-meu.up.railway.app/api/v1/produtos/listagem?ordenar=${ordenacao}&limite=${limite}&busca=${encodeURIComponent(busca ?? "")}&pagina=${paginaAtual}&preco_min=${precoMin}&preco_max=${precoMax}`
    );

    const data = await response.json();
    
    return data
}