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

// Sincroniza quando digita direto nas caixas numéricas inferiores
function atualizarPorInput() {
    let minVal = parseInt(inputMin.value) || 0;
    let maxVal = parseInt(inputMax.value) || 0;

    if (maxVal - minVal >= precoDistanciaMinima && maxVal <= rangeMax.max) {
        rangeMin.value = minVal;
        rangeMax.value = maxVal;
        atualizarSlider();
    }
}

// Ouvintes de eventos para os inputs de arrastar
rangeMin.addEventListener('input', atualizarSlider);
rangeMax.addEventListener('input', atualizarSlider);

// Ouvintes de eventos para as caixas de digitação
inputMin.addEventListener('change', atualizarPorInput);
inputMax.addEventListener('change', atualizarPorInput);

// Executa uma vez no início para renderizar o estado inicial correto
atualizarSlider();

/* Chamadas da API filtros */

const select = document.getElementById("ordenacao")
const selectLimite = document.getElementById("produtos-por-pagina")

select.addEventListener("change", () =>{
    carregarProdutosGrid()
})

selectLimite.addEventListener("change", () => {
    carregarProdutosGrid();
});

rangeMin.addEventListener("change", () => {
    carregarProdutosGrid();
});

rangeMax.addEventListener("change", () => {
    carregarProdutosGrid();
});

async function carregarProdutosGrid(){

    const ordenacao = document.getElementById("ordenacao").value;
    const limite = document.getElementById("produtos-por-pagina").value;
    const precoMin = document.getElementById("range-min").value;
    const precoMax = document.getElementById("range-max").value;

    const response = await fetch(
        `http://localhost:3000/api/v1/produtos/listagem?ordenar=${ordenacao}&limite=${limite}&preco_min=${precoMin}&preco_max=${precoMax}`
    );

    const produtos = await response.json();

    const grid = document.getElementById("produtos-grid");

    grid.replaceChildren();

    produtos.forEach(produto => {
        grid.appendChild(
            criarCardProduto(produto)
        );
    });
}

carregarProdutosGrid()