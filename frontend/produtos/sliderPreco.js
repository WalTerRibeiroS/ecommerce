import { formatarMoeda } from "../compartilhados/formatarMoeda.js"

const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const inputMin = document.getElementById('input-min');
const inputMax = document.getElementById('input-max');
const labelMin = document.getElementById('label-min');
const labelMax = document.getElementById('label-max');
const track = document.querySelector('.slider-track');

const precoDistanciaMinima = 500;

export function slider(){
    atualizarPorInput()
    atualizarSlider();
}

function atualizarSlider() {

    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);

    if (maxVal - minVal < precoDistanciaMinima) {
        if (this === rangeMin) {
            rangeMin.value = maxVal - precoDistanciaMinima;
            minVal = parseInt(rangeMin.value);
            
        } else {
            rangeMax.value = minVal + precoDistanciaMinima;
            maxVal = parseInt(rangeMax.value);
        }
    }
    
    const minPercent = (minVal / rangeMin.max) * 100;
    const maxPercent = (maxVal / rangeMax.max) * 100;

    track.style.background = `linear-gradient(to right, #bdbdbd ${minPercent}%, var(--cor-primaria) ${minPercent}%, var(--cor-primaria) ${maxPercent}%, #bdbdbd ${maxPercent}%)`;

    labelMin.textContent = formatarMoeda(minVal);
    labelMax.textContent = formatarMoeda(maxVal);
    inputMin.value = minVal;
    inputMax.value = maxVal;

    rangeMin.addEventListener('input', atualizarSlider);
    rangeMax.addEventListener('input', atualizarSlider);
}

function atualizarPorInput() {

    const precoDistanciaMinima = 500;

    const blocoErro = document.getElementById("caixa-de-erro")

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

    inputMin.addEventListener('change', () => {
        blocoErro.textContent = ""
        atualizarPorInput()
    });

    inputMax.addEventListener('change', () => {
        blocoErro.textContent = ""
        atualizarPorInput()
    })
}