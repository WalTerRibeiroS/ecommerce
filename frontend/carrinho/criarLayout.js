import { chamarAPI } from "../carrinho/chamarAPI.js"
import { formatarMoeda } from "../compartilhados/formatarMoeda.js"

export async function renderizarLayout(){

    const sectionCardCarrinho = document.getElementById("carrinho-produtos-wrapper");
    const infoProdutosCarrinho = await chamarAPI()

    if(infoProdutosCarrinho.length === 0) {

        sectionCardCarrinho.replaceChildren()

        const divResumoCompra = document.querySelector(".info-finalizar-compra")
        divResumoCompra.classList.remove("info-finalizar-compra")
        divResumoCompra.classList.add("display-none")

        const containerAviso = document.querySelector(".avisos-container")
        const spanAviso = document.createElement("span")
        const btnIr = document.createElement("button")

        containerAviso.style.display = "flex"

        spanAviso.textContent = "Seu carrinho está vazio. Volte mais tarde"
        spanAviso.classList.add("aviso")

        /* <button class="ir-para">Fazer login | Encher o carrinho</button> */

        btnIr.textContent = "Encher carrinho"
        btnIr.classList.add("ir-para")

        btnIr.addEventListener("click", () => {
            window.location.href = "http://localhost:5500/frontend/produtos/produtos.html"
        })

        containerAviso.appendChild(spanAviso)
        containerAviso.appendChild(btnIr)

    }else {

    sectionCardCarrinho.replaceChildren()

    infoProdutosCarrinho.forEach((infoProdutoCarrinho, indice) => {
        const numerado = indice + 1;

        sectionCardCarrinho.appendChild(
            criarCardProdutoCarrinho(infoProdutoCarrinho, numerado)
        );
    });

    criarCardResumoCompra()}
}

function criarCardProdutoCarrinho(infoProdutoCarrinho, numerado) {

    // --- Container Principal ---
    const container = document.createElement('div');
    container.className = 'carrinho-produtos-container'

    // --- Conteúdo Principal ---
    const conteudoPrincipal = document.createElement('div');
    conteudoPrincipal.className = 'conteudo-principal-carrinho';

    // 1. Seção de Imagens
    const secaoImagens = document.createElement('div');
    secaoImagens.className = 'secao-card-imagens';

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.checked = true;
    inputCheckbox.id = `produto-${numerado}`;
    inputCheckbox.dataset.idProdutoCarrinho = infoProdutoCarrinho.id
    inputCheckbox.className = 'checkbox-produto';

    inputCheckbox.addEventListener("change", criarCardResumoCompra)

    const labelCheck = document.createElement('label');
    labelCheck.setAttribute('for', `produto-${numerado}`);
    labelCheck.className = 'check';

    const imgProduto = document.createElement('img');
    imgProduto.src = "../../backend" + infoProdutoCarrinho.imagem_path;
    imgProduto.alt = infoProdutoCarrinho.nome;

    imgProduto.addEventListener("click", () => {

        const id = infoProdutoCarrinho.id
        const slug = infoProdutoCarrinho.slug

        window.location.href = `http://localhost:5500/frontend/produto/produto.html?slug=${slug}&id=${id}`
    })

    secaoImagens.appendChild(inputCheckbox);
    secaoImagens.appendChild(labelCheck);
    secaoImagens.appendChild(imgProduto);

    // 2. Detalhes do Produto (div central)
    const divDetalhes = document.createElement('div');
    divDetalhes.className = "detalhes";

    // 2.1 Nome e Botão Remover
    const divSeparar = document.createElement('div');
    divSeparar.className = 'separar';

    const spanNome = document.createElement('span');
    spanNome.className = 'nome-produto';
    spanNome.appendChild(document.createTextNode(`${infoProdutoCarrinho.nome}`));

    spanNome.addEventListener("click", () => {

        const id = infoProdutoCarrinho.id
        const slug = infoProdutoCarrinho.slug

        window.location.href = `http://localhost:5500/frontend/produto/produto.html?slug=${slug}&id=${id}`
    })

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.dataset.produtoId = infoProdutoCarrinho.id;
    
    btnRemover.addEventListener("click", async () => {

        const data = btnRemover.dataset.produtoId
        console.log("clicou")

        const response = await fetch("http://localhost:3000/api/v1/carrinho/deletar", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ produto_id: data })
        });

        renderizarLayout()
    })

    const iconeLixeira = document.createElement('i');
    iconeLixeira.className = 'fa-solid fa-trash';
    btnRemover.appendChild(iconeLixeira);

    divSeparar.appendChild(spanNome);
    divSeparar.appendChild(btnRemover);

    // 2.2 Quantidades
    const divQuantidades = document.createElement('div');

    const spanQtdEscolhida = document.createElement('span');
    spanQtdEscolhida.className = 'quantidade-escolhida';
    spanQtdEscolhida.appendChild(document.createTextNode(`${infoProdutoCarrinho.quantidade} Uni.`));

    const spanQtdDisponivel = document.createElement('span');
    spanQtdDisponivel.className = 'quantidade-disponivel';
    spanQtdDisponivel.appendChild(document.createTextNode(`+${infoProdutoCarrinho.quantidade_disponivel} disponíveis`));

    divQuantidades.appendChild(spanQtdEscolhida);
    divQuantidades.appendChild(spanQtdDisponivel);

    // Montando a div central de detalhes
    divDetalhes.appendChild(divSeparar);
    divDetalhes.appendChild(divQuantidades);

    // 3. Seção de Preços
    const secaoPrecos = document.createElement('div');
    secaoPrecos.className = 'secao-precos';

    const descontoPercentual = Number(infoProdutoCarrinho.desconto_percentual);

    // 3.1 Preço antigo e desconto (SÓ CRIA SE TIVER DESCONTO)
    if (descontoPercentual > 0) {
        const divPrecoAntigo = document.createElement('div');
        divPrecoAntigo.className = "precos-antigos";

        const spanCortado = document.createElement('span');
        spanCortado.className = 'cortado';
        spanCortado.appendChild(document.createTextNode(`${formatarMoeda(infoProdutoCarrinho.preco)}`));
        
        const spanDesconto = document.createElement('span');
        spanDesconto.className = 'desconto';
        spanDesconto.appendChild(
            document.createTextNode(`${descontoPercentual}% OFF`)
        );
        
        divPrecoAntigo.appendChild(spanCortado);
        divPrecoAntigo.appendChild(spanDesconto);
        
        // Adiciona à seção de preços apenas se passou no if
        secaoPrecos.appendChild(divPrecoAntigo);
    }

    // 3.2 Preço atual (SEMPRE CRIA)
    const divPrecoNovo = document.createElement('div');
    
    const spanPrecoDesconto = document.createElement('span');
    spanPrecoDesconto.className = 'preco-com-desconto';

    const valorComDesconto = Number(infoProdutoCarrinho.preco) * (1 - descontoPercentual / 100);

    spanPrecoDesconto.appendChild(
        document.createTextNode(`${formatarMoeda(valorComDesconto)}`)
    );
    
    divPrecoNovo.appendChild(spanPrecoDesconto);

    // Montando o preço atual na seção de preços
    secaoPrecos.appendChild(divPrecoNovo);

    // Juntando as 3 partes no conteúdo principal
    conteudoPrincipal.appendChild(secaoImagens);
    conteudoPrincipal.appendChild(divDetalhes);
    conteudoPrincipal.appendChild(secaoPrecos);

    // --- Seção de Frete ---
    const divFrete = document.createElement('div');
    divFrete.className = 'frete-parte linha-resumo';

    const spanFreteTexto = document.createElement('span');
    spanFreteTexto.appendChild(document.createTextNode('Frete'));

    const spanFreteValor = document.createElement('span');
    spanFreteValor.appendChild(document.createTextNode(`${formatarMoeda(infoProdutoCarrinho.frete)}`));

    divFrete.appendChild(spanFreteTexto);
    divFrete.appendChild(spanFreteValor);

    // --- Montagem Final ---
    container.appendChild(conteudoPrincipal);
    container.appendChild(divFrete);

    // Retorna o elemento completo para ser inserido na tela

    return container;
}

async function criarCardResumoCompra() {

    const produtosSelecionados = await atualizarCardResumo();
    
    console.log(produtosSelecionados)
    const qtdProdutosSelecionados = produtosSelecionados.length 
    //desconto
    const desconto = produtosSelecionados.reduce((acc, cur) => acc + Number(cur.desconto_percentual), 0);

    //frete
    const valorTotalFrete = produtosSelecionados.reduce((acumulador, produto) => {
        return acumulador + Number(produto.frete || 0);
    }, 0);
    const totalFrete = formatarMoeda(valorTotalFrete)

    //preco sem desconto
    const todosOsPrecos = produtosSelecionados.map(produto => produto.preco)
    const todosAsQuantidades = produtosSelecionados.map(produto => produto.quantidade)
    const precosTotalSemDesconto = todosOsPrecos.map((valor, index) => valor * todosAsQuantidades[index])
    const precoTotalSemDesconto = precosTotalSemDesconto.reduce((acc, cur) => acc + cur, 0);
    const totalPrecoSemDesconto = formatarMoeda(precoTotalSemDesconto)

    //preco com desconto
    const todosOsDescontos = produtosSelecionados.map(produto => produto.desconto_percentual)
    const precosPosDescontos = todosOsPrecos.map((valor, index) => valor * (1 - todosOsDescontos[index] / 100))//(1 - descontoPercentual / 100)
    const precosTotalDesconto = precosPosDescontos.map((valor, index) => valor * todosAsQuantidades[index])
    const precoDescontoTotal = precosTotalDesconto.reduce((acc, cur) => acc + cur, 0);
    const precoTotalDesconto = formatarMoeda(precoDescontoTotal)

    //preco total (frete + desconto)
    const total = formatarMoeda(valorTotalFrete + precoDescontoTotal);

    //
    const divFinalizar = document.querySelector(".finalizar-layout-principal");
    divFinalizar.replaceChildren();

    // ==========================================
    // 1. LINHA: PRODUTO(S)
    // ==========================================
    const linhaProdutos = document.createElement("div");
    linhaProdutos.classList.add("linha-resumo");

    const spanTituloProdutos = document.createElement("span");
    spanTituloProdutos.textContent = "Produto(s)";
    linhaProdutos.appendChild(spanTituloProdutos);

    const divPrecosProdutos = document.createElement("div");
    divPrecosProdutos.classList.add("separar-layout")
 
    if (desconto > 0) {
        const spanCortadoProd = document.createElement("span");
        spanCortadoProd.classList.add("cortado");
        spanCortadoProd.textContent = totalPrecoSemDesconto;
        divPrecosProdutos.appendChild(spanCortadoProd);
    }

    const spanNormalProd = document.createElement("span");
    spanNormalProd.textContent = precoTotalDesconto;
    divPrecosProdutos.appendChild(spanNormalProd);

    linhaProdutos.appendChild(divPrecosProdutos);
    divFinalizar.appendChild(linhaProdutos);

    // ==========================================
    // 2. LINHA: ENVIO(S)
    // ==========================================
    const linhaEnvios = document.createElement("div");
    linhaEnvios.classList.add("linha-resumo");

    const spanTituloEnvios = document.createElement("span");
    spanTituloEnvios.textContent = "envio(s)";
    linhaEnvios.appendChild(spanTituloEnvios);

    const divPrecosEnvios = document.createElement("div");
    divPrecosEnvios.classList.add("separar-layout")

    // Exemplo com desconto: o valor cortado existe
    const valorCortadoEnvio = 0 ;
    if (valorCortadoEnvio > 0) {//colocar aqui oo desconto total
        const spanCortadoEnvio = document.createElement("span");
        spanCortadoEnvio.classList.add("cortado");
        spanCortadoEnvio.textContent = valorCortadoEnvio;
        divPrecosEnvios.appendChild(spanCortadoEnvio);
    }

    const spanNormalEnvio = document.createElement("span");
    spanNormalEnvio.textContent = totalFrete;
    divPrecosEnvios.appendChild(spanNormalEnvio);

    linhaEnvios.appendChild(divPrecosEnvios);
    divFinalizar.appendChild(linhaEnvios);


    // ==========================================
    // 3. LINHA: TOTAL
    // ==========================================
    const divTotal = document.createElement("div");
    divTotal.classList.add("linha-resumo");

    const h3Total = document.createElement("h3");
    h3Total.textContent = "Total";

    const spanPrecoTotal = document.createElement("span");
    spanPrecoTotal.classList.add("preco-total-finalizar");
    spanPrecoTotal.textContent = total;

    divTotal.appendChild(h3Total);
    divTotal.appendChild(spanPrecoTotal);

    divFinalizar.appendChild(divTotal);

    //finalização
    const botaoFinalizar = document.getElementById("botao-finalizar-compra-carrinho")
    console.log(qtdProdutosSelecionados)

    if(qtdProdutosSelecionados === 0) {
        botaoFinalizar.textContent = "Continuar"
        botaoFinalizar.classList.add("botao-desativado")
    } else {
        botaoFinalizar.classList.remove("botao-desativado")
        botaoFinalizar.textContent = `Continuar (${qtdProdutosSelecionados})`
    }

    botaoFinalizar.addEventListener("click", () => {
        window.location.href = "http://localhost:5500/frontend/finalizar/finalizar.html"
    })
}

async function atualizarCardResumo() {

    const infoProdutosCarrinho = await chamarAPI();

    const checkboxes = document.querySelectorAll(".checkbox-produto:checked");

    const idsSelecionados = Array.from(checkboxes).map(checkbox => 
        Number(checkbox.dataset.idProdutoCarrinho)
    );

    const produtosFiltrados = infoProdutosCarrinho.filter(produto => 
        idsSelecionados.includes(produto.id)
    );

    return produtosFiltrados;
}