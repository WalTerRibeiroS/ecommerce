import { formatarMoeda } from "../compartilhados/formatarMoeda.js"

export function atualizarTelaFinalizar(dados, produtos){

    const produtoCampo = document.getElementById("info-campo");
    const quantidadeProdutos = produtos.length

    produtoCampo.textContent = quantidadeProdutos === 1 ? "1 Produto" : `${quantidadeProdutos} Produtos`

    const precoTotal = document.getElementById("preco-total-bruto");
    const precoTotalFrete = document.getElementById("preco-total-frete");
    const descontos = document.getElementById("descontos");
    const total = document.getElementById("preco-total");

    precoTotal.textContent = formatarMoeda(dados.totalBrutoSemDesconto)
    precoTotalFrete.textContent = formatarMoeda(dados.totalEnvio)
    descontos.textContent = formatarMoeda(dados.totalDescontado)
    total.textContent = formatarMoeda(dados.total)
}