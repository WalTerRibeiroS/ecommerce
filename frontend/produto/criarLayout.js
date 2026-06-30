/* 
desconto_percentual
descricao
frete
id
imagens
preco
quantidade_disponivel
*/

import { gerarQuantidadeDeAvalicoes } from "../compartilhados/quantidade-de-avaliacoes.js"
import { gerarStarRating } from "../compartilhados/star-rating.js"
import { formatarMoeda } from "../compartilhados/formatarMoeda.js"
import { gerarPrecoNoCartao } from "../compartilhados/preco-no-cartao.js";
import { gerarDataDeEntrega } from "../compartilhados/gerarDataDeEntrega.js";

export function criarLayout(infoProduto) {
    /* criarGaleria(infoProduto.imagens); */
    criarInformacoes(infoProduto);
    criarEstoque(infoProduto);
}


function criarInformacoes(infoProduto){

    const quantidadeAvalicoes = document.querySelector(".quantidade-avaliacao");
    const avaliacao = document.querySelector(".star-rating");
    const nome = document.querySelector(".nome");
    const precoNormal = document.querySelector(".preco-normal");
    const precoDesconto = document.querySelector(".preco-desconto");
    const desconto = document.querySelector(".desconto");
    const precoNoCartao = document.querySelector(".preco-no-cartao");
    const frete = document.getElementById("frete");
    const descricao = document.querySelector(".descricao");
    
    quantidadeAvalicoes.textContent = `(${gerarQuantidadeDeAvalicoes()})`;
    avaliacao.textContent = `⭐ ${gerarStarRating()}`;
    nome.textContent = infoProduto.nome;
    precoNormal.textContent = formatarMoeda(infoProduto.preco);

    const valorComDesconto = Number(infoProduto.preco) * (1 - Number(infoProduto.desconto_percentual) / 100);

    precoDesconto.textContent = formatarMoeda(valorComDesconto)
    desconto.textContent = `${Number(infoProduto.desconto_percentual)}% OFF`
    precoNoCartao.textContent = `R$ ${gerarPrecoNoCartao(infoProduto.preco, 12)}`;
    frete.textContent = `${formatarMoeda(infoProduto.frete)} de frete`
    descricao.textContent = infoProduto.descricao

    //precos sem desconto = sem caixa de desconto e n aparece o preco cortado

    if(infoProduto.desconto_percentual === "0.00") {
        precoNormal.textContent = ''
        desconto.textContent = ''
        desconto.classList.add("sem-desconto")
    }

    //produto nao tem preco de frete

    if(infoProduto.frete === "0.00") {
        frete.textContent = ""
    }
}

function criarEstoque(infoProduto){
   const dataDeEntrega = document.querySelector(".info-entrega")
   const estoque = document.getElementById("estoque")
   const quantidade = document.getElementById("quantidade")
   const botoesCompra = document.getElementById(".botoes-compra")
   
   dataDeEntrega.textContent = gerarDataDeEntrega()

   //se nao tiver unidades do produto no estoque

    if(infoProduto.quantidade_disponivel === "0.00") {
        dataDeEntrega.textContent = ""
        estoque.textContent = "Estoque indisponível"
        estoque.classList.add("estoque-indisponivel")
        quantidade.textContent = ""
        botoesCompra.style.display = "none"
    } 
    //criando a select

    const containerEstoque = document.querySelector(".estoque-info")
    const select = document.createElement("select")
    select.classList.add("quantidade-selecionada")
    
    if(infoProduto.quantidade_disponivel > 6) {
        for(let i = 1; i < 7; i++) {
            const option = document.createElement("option")

            option.value = i;
            option.textContent = i === 1 ? `${i} unidade` : `${i} unidades`

            select.append(option)
        }

        containerEstoque.append(select)

    } else if(infoProduto.quantidade_disponivel <= 6 && infoProduto.quantidade_disponivel > 0) {
        let estoqueDisponivel = infoProduto.quantidade_disponivel

        while(estoqueDisponivel > 0){
            const option = document.createElement("option")

            option.value = estoqueDisponivel;
            option.textContent = estoqueDisponivel === 1 ? `${estoqueDisponivel} unidade` : `${estoqueDisponivel} unidades`;

            select.append(option);

            estoqueDisponivel--;
        }

        containerEstoque.append(select)
    } 
}