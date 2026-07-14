import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";

const blocoDeAvisoLogado = document.querySelector(".avisos-logado-container")

blocoDeAvisoLogado.addEventListener("click", () => {
    window.location.href = "http://localhost:5500/frontend/login/login.html"
})

verificarUsuarioLogado({
    pagina: "minhas compras",
    onNaoLogado: () => {
        blocoDeAvisoLogado.style.display = "flex"
    }
})

async function pegarDadosAPI() {

    const response = await fetch("https://ecommerce-meu.up.railway.app/api/v1/pedidos/itens-comprados", {
        credentials: "include",
    }); 
    
    const result = await response.json();

    return result
}

const pedidos = await pegarDadosAPI()

function criarLayout(pedidos) {

    if (pedidos.length === 0){
        
        const avisoVazioContainer = document.querySelector(".avisos-vazio-container")
        avisoVazioContainer.style.display = "flex"

        const btnCarrinhoVazio = document.getElementById("btn-ir-produtos")

        btnCarrinhoVazio.addEventListener("click", () => {
            window.location.href = "http://localhost:5500/frontend/produtos/produtos.html"
        })
    }

    const mainSectionWrapper = document.getElementById("main-section-wrapper");

    mainSectionWrapper.innerHTML = "";

    const grupos = new Map();

    pedidos.forEach(pedido => {

        const data = new Date(pedido.data);
        const chaveData = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;
        let grupoPedidos = grupos.get(chaveData);

        if (!grupoPedidos) {

            grupoPedidos = criarGrupoPedidos(data);
            grupos.set(chaveData, grupoPedidos);
            mainSectionWrapper.appendChild(grupoPedidos);
        }

        const containerPedidos = grupoPedidos.querySelector(".grupo-pedidos-cards");

        pedido.produtos.forEach(produto => {
            const cardPedido = criarCardPedido(pedido, produto);
            containerPedidos.appendChild(cardPedido);
        });
    });
}

function criarGrupoPedidos(data) {

    const grupoPedidos = document.createElement("div");
    grupoPedidos.classList.add("grupo-pedidos");

    const grupoPedidosData = document.createElement("div");
    grupoPedidosData.classList.add("grupo-pedidos-data");

    grupoPedidosData.textContent = formatarData(data);

    const grupoPedidosCards = document.createElement("div");
    grupoPedidosCards.classList.add("grupo-pedidos-cards");

    grupoPedidos.append(
        grupoPedidosData,
        grupoPedidosCards
    );

    return grupoPedidos;
}

function criarCardPedido(pedido, produto) {

    const cardPedido = document.createElement("div");
    cardPedido.classList.add("card-pedido");

    cardPedido.innerHTML = `

        <div class="pedido-imagem">

            <img src="${"../../backend" + produto.imagem}" alt="${produto.nome}">

        </div>

        <div class="pedido-informacoes">

            <span class="pedido-status">
                ${pedido.status}
            </span>

            <h3 class="pedido-nome">
                ${produto.nome}
            </h3>

            <span class="pedido-quantidade">
                1 unidade
            </span>

        </div>

        <div class="pedido-acoes">

            <button class="btn-ver-compra" data-id="${produto.id_produto}" data-slug="${produto.slug}" >
                Ver compra
            </button>

        </div>

        `;

        return cardPedido;
}
       
function formatarData(data) {
    
    return data.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

criarLayout(pedidos)
    
const botaoVerCompra = document.querySelector(".btn-ver-compra")

botaoVerCompra.addEventListener("click", (event) => {

    const botao = event.target

    const id = botao.dataset.id
    const slug = botao.dataset.slug

    window.location.href = `http://localhost:5500/frontend/produto/produto.html?slug=${slug}&id=${id}`
})

iniciarBarraPesquisa()