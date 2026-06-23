import { verificarUsuarioLogado } from "../components/adicaoLogado.js"
import { criarCardProduto } from "../components/product-card.js"

verificarUsuarioLogado()

/* slider do intervalo de preço */

const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const inputMin = document.getElementById('input-min');
const inputMax = document.getElementById('input-max');
const labelMin = document.getElementById('label-min');
const labelMax = document.getElementById('label-max');
const track = document.querySelector('.slider-track');

const precoDistanciaMinima = 500;

function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarSlider() {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);

    // Impede que o mínimo ultrapasse o máximo baseado na distância estipulada
    if (maxVal - minVal < precoDistanciaMinima) {
        if (this === rangeMin) {
            rangeMin.value = maxVal - precoDistanciaMinima;
            minVal = parseInt(rangeMin.value);
            
        } else {
            rangeMax.value = minVal + precoDistanciaMinima;
            maxVal = parseInt(rangeMax.value);
        }
    }
// Calcula as porcentagens para preencher a cor da pista (track)
    const minPercent = (minVal / rangeMin.max) * 100;
    const maxPercent = (maxVal / rangeMax.max) * 100;

    track.style.background = `linear-gradient(to right, #bdbdbd ${minPercent}%, var(--cor-primaria) ${minPercent}%, var(--cor-primaria) ${maxPercent}%, #bdbdbd ${maxPercent}%)`;

    // Atualiza os textos e as caixas numéricas
    labelMin.textContent = formatarMoeda(minVal);
    labelMax.textContent = formatarMoeda(maxVal);
    inputMin.value = minVal;
    inputMax.value = maxVal;
}

const blocoErro = document.getElementById("caixa-de-erro")
// Sincroniza quando digita direto nas caixas numéricas inferiores
function atualizarPorInput() {
    let minVal = parseInt(inputMin.value) || 0;
    let maxVal = parseInt(inputMax.value) || 0;

    if (maxVal - minVal >= precoDistanciaMinima && maxVal <= rangeMax.max) {
        rangeMin.value = minVal;
        rangeMax.value = maxVal;
        atualizarSlider();
    }

    if (maxVal - minVal < precoDistanciaMinima){
        blocoErro.textContent = `*Espaço de preço muito pequeno (min. ${precoDistanciaMinima})`
    }

}

rangeMin.addEventListener('input', atualizarSlider);
rangeMax.addEventListener('input', atualizarSlider);

inputMin.addEventListener('change', () => {
    blocoErro.textContent = ""
    atualizarPorInput()
});

inputMax.addEventListener('change', () => {
    blocoErro.textContent = ""
    atualizarPorInput()
})

// Executa uma vez no início para renderizar o estado inicial correto
atualizarSlider();

/* Chamadas da API filtros */

const select = document.getElementById("ordenacao")
const selectLimite = document.getElementById("produtos-por-pagina")

let paginaAtual = 1

select.addEventListener("change", () => {
    paginaAtual = 1;
    carregarProdutosGrid();
})

selectLimite.addEventListener("change", () => {
    paginaAtual = 1;
    carregarProdutosGrid();
});

rangeMin.addEventListener("change", () => {
    paginaAtual = 1;
    carregarProdutosGrid();
});

rangeMax.addEventListener("change", () => {
    paginaAtual = 1;
    carregarProdutosGrid();
});

async function carregarProdutosGrid(){

    const ordenacao = document.getElementById("ordenacao").value;
    const limite = parseInt(document.getElementById("produtos-por-pagina").value);
    const precoMin = document.getElementById("range-min").value;
    const precoMax = document.getElementById("range-max").value;

    const response = await fetch(
        `http://localhost:3000/api/v1/produtos/listagem?ordenar=${ordenacao}&limite=${limite}&pagina=${paginaAtual}&preco_min=${precoMin}&preco_max=${precoMax}`
    );

    const data = await response.json();

    const produtos = data.produtos
    const total = data.total

    const totalPaginas = Math.ceil(total / limite)

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
    
        renderizarPaginacao(totalPaginas)
    }
}

/* funcoes para fazer a paginacao */

function renderizarPaginacao(totalPaginas) {

    const pagination = document.getElementById("pagination")

    pagination.replaceChildren()

    if (totalPaginas <= 0){
        return // finaliza 
    }

    if(totalPaginas === 1){
        const li = document.createElement("li")

        li.innerHTML = `
            <a class="active">1</a>
        `

        pagination.appendChild(li)
        return
    }

    // <<
    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angles-left"></i>', //conteudo
            1, //paginaDestino
            paginaAtual === 1 //valor booleano de true desabilitado pq apos ele tem q ficar desativado
        )
    );

    // <
    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angle-left"></i>',
            paginaAtual - 1,
            paginaAtual === 1
        )
    );

    //logica por tras das paginas mostradas

    let inicio = paginaAtual - 2
    let fim = paginaAtual + 2

    if (inicio < 1){
        inicio = 1;
        fim = Math.min(5, totalPaginas)
    }

    if (fim > totalPaginas){
        fim = totalPaginas
        inicio = Math.max(1, totalPaginas - 4)
    }

    //criar numeros

    for(let pagina = inicio; pagina <= fim; pagina++){
        pagination.appendChild(
            criarBotaoPaginacao(
                pagina,//conteudo
                pagina,//paginaDestino
                false,//valor de desativado 
                pagina === paginaAtual//ativado valor de true
            )
        );
    }

    // >
    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angle-right"></i>',
            paginaAtual + 1,
            paginaAtual === totalPaginas
        )
    );

    // >>
    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angles-right"></i>',
            totalPaginas,
            paginaAtual === totalPaginas
        )
    );
}

function criarBotaoPaginacao(conteudo, paginaDestino, desabilitado = false, ativo = false){

    const li = document.createElement("li")
    const a = document.createElement("a")

    a.innerHTML = conteudo

    if (ativo){
        a.classList.add("active")
    }

    if (desabilitado){
        a.classList.add("disabled")
    }else {
        a.addEventListener("click", () => {
            paginaAtual = paginaDestino

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            carregarProdutosGrid()
        })
    }

    li.append(a)

    return li
}

// --- menu do mobile 

const filtrosAside = document.getElementById("filtros-aside")
const btnMobile = document.getElementById("btn-filtros-mobile");
const overlay = document.getElementById("overlay-aside");

btnMobile.addEventListener("click", () => {
    filtrosAside.classList.add("aberto")
    overlay.classList.add("ativo")
})

overlay.addEventListener("click", () => {
    filtrosAside.classList.remove("aberto")
    overlay.classList.remove("ativo")
})

carregarProdutosGrid()