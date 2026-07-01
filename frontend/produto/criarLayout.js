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
import { criarNavegacaoLayout } from "./navegacaoGaleria.js";
import { criarZoomIn } from "./criarZoomIn.js";

export function criarLayout(infoProduto) {
    criarGaleria(infoProduto.imagens);
    criarNavegacaoLayout();
    criarZoomIn()
    criarInformacoes(infoProduto);
    criarEstoque(infoProduto);
}

function criarGaleria(imagens) {
    
    const containerImagensSecundarias = document.querySelector(".imagens-secundarias")
    const containerImagemPrincipal = document.getElementById("container-imagem-principal")
    const imagemPrincipal = document.getElementById("imagem-principal")

    imagens.forEach((imagem, indice) => {

        const img = document.createElement("img")

        const path = "../../backend" + imagem /* perigoso caso eu mude os arquivos de ordem!!! */
        img.src = path
        img.classList.add("thumbs")

        if(indice === 0) {
            img.classList.add("selecionada")
            imagemPrincipal.src = img.src
        }
        
        containerImagensSecundarias.append(img)
    })
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

    if(infoProduto.quantidade_disponivel <= 0) {

        dataDeEntrega.textContent = ""
        estoque.textContent = "Estoque indisponível"
        estoque.classList.add("estoque-indisponivel")
        quantidade.textContent = ""
        botoesCompra.style.display = "none"

    } else {

        const containerEstoque = document.querySelector(".estoque-info")
        const select = document.createElement("select")
        select.classList.add("quantidade-selecionada")

        let contador = 1
        const limite = Math.min(6, infoProduto.quantidade_disponivel)
        
        while(contador <= limite ) {
            const option = document.createElement("option");
    
            option.value = contador;
            option.textContent = contador === 1 ? `${contador} unidade` : `${contador} unidades`;
    
            select.append(option);
    
            contador++;
        }

        containerEstoque.append(select)
    }
}