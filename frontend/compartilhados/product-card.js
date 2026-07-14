import { gerarPrecoNoCartao } from "./preco-no-cartao.js"
import { gerarStarRating } from "./star-rating.js"
import { gerarQuantidadeDeAvalicoes } from "./quantidade-de-avaliacoes.js"

export function criarCardProduto(produto){

    const card = document.createElement("article");
    card.classList.add("card");

    card.addEventListener("click", () => {
        
        const id = produto.id
        const slug = produto.slug

        window.location.href = `http://localhost:5500/frontend/produto/produto.html?slug=${slug}&id=${id}`
    })

    //--------- imagem ---

    const imagemContainer = document.createElement("div");
    imagemContainer.classList.add("card-imagem-container");

    const imagem = document.createElement("img");
    imagem.classList.add("card-imagem");
    imagem.src = `https://ecommerce-meu.up.railway.app${produto.imagem_path}`;
    imagem.alt = produto.nome;

    imagemContainer.append(imagem)

    //----------nome ----

    const info = document.createElement("div");
    info.classList.add("card-info");

    const avaliacao = document.createElement("div");
    avaliacao.classList.add("card-avaliacao");

    const nome = document.createElement("div");
    nome.classList.add("card-nome");
    nome.textContent = produto.nome;

    const rating = document.createElement("p");
    rating.classList.add("card-rating");
    rating.textContent = `⭐ ${gerarStarRating().toFixed(1)}`

    const quantidadeDeAvaliacoes = document.createElement("p");
    quantidadeDeAvaliacoes.classList.add("card-rating")
    quantidadeDeAvaliacoes.textContent = `(${gerarQuantidadeDeAvalicoes()})`

    avaliacao.append(rating, quantidadeDeAvaliacoes)

    info.append(nome, avaliacao);   

    //------preco com e sem desconto-----

    const elementosPreco = [];
    const precoSemDesconto = document.createElement("p");
    const precoComDesconto = document.createElement("p");
    const desconto = document.createElement("p")
    const precoEdescontoContainer = document.createElement("div");

    if (Number(produto.desconto_percentual) === 0){

        precoSemDesconto.classList.add("preco-sem-desconto")

        precoSemDesconto.textContent =`R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}`;

        elementosPreco.push(precoSemDesconto);

    }else{

        precoEdescontoContainer.classList.add("container-preco-e-desconto")
        precoSemDesconto.classList.add("preco-original");
        precoComDesconto.classList.add("preco-desconto");
        desconto.classList.add("desconto")

        const valorComDesconto = produto.preco * (1 - produto.desconto_percentual / 100);

        precoComDesconto.textContent = `R$ ${valorComDesconto.toFixed(2).replace('.', ',')}`;
        precoSemDesconto.textContent = `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}`;
        desconto.textContent = `${Number(produto.desconto_percentual)}% OFF`
        
        precoEdescontoContainer.append(precoComDesconto, desconto)
        elementosPreco.push(precoSemDesconto, precoEdescontoContainer);
    }
    
    //-----vezes no cartao -----

    const secaoDePrecoNoCartao = document.createElement("div");
    secaoDePrecoNoCartao.classList.add("secao-preco-no-cartao");

    const precoNoCartao = document.createElement("p");
    const vezesNoCartao = document.createElement("p");
    const quantidadeDeParcelas = 12;

    precoNoCartao.classList.add("preco-no-cartao");
    precoNoCartao.textContent = gerarPrecoNoCartao(Number(produto.preco), quantidadeDeParcelas);

    vezesNoCartao.classList.add("vezes-no-cartao");
    vezesNoCartao.textContent = `${quantidadeDeParcelas}x no cartão de R$`

    secaoDePrecoNoCartao.append(vezesNoCartao, precoNoCartao)

   //------frete ----

    const frete = document.createElement("p");
    frete.classList.add("frete");

    if (Number(produto.frete) === 0) {
        frete.textContent = "Frete grátis";
    }

    card.append(
        imagemContainer,
        info,
        ...elementosPreco,
        secaoDePrecoNoCartao,
        frete
    );

    return card;
}