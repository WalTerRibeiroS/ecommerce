import { verificarUsuarioLogado } from "../components/adicaoLogado.js"
verificarUsuarioLogado()

/* funcionamento da navegacao das imagens */

const imagemPrincipal = document.getElementById("imagem-principal")
const thumbs = document.querySelectorAll(".thumbs")
let imagemSelecionada = document.querySelector(".selecionada")

thumbs.forEach((thumb) => {

    //hover troca a imagem principal, preserva a imagem do ultimo hover
    thumb.addEventListener("mouseenter", () => {
        imagemPrincipal.src = thumb.src
    })

    thumb.addEventListener("click", () => {
        imagemSelecionada.classList.remove("selecionada")
        thumb.classList.add("selecionada");
        imagemSelecionada = thumb;
    })
})

/* zoom in na imagem em destaque */

const containerImagem = document.getElementById("container-imagem-principal");
const lens = document.getElementById("lens");
const result = document.getElementById("result");
/* imagemPrincipal = image */

const containerRect = containerImagem.getBoundingClientRect();
const lensRect = lens.getBoundingClientRect();
const resultRect = result.getBoundingClientRect();
const imagemPrincipalRect = imagemPrincipal.getBoundingClientRect();

containerImagem.addEventListener("mousemove", zoomImage)

containerImagem.addEventListener("mousemove", () => {
    lens.classList.add("ativado")
    result.classList.add("ativado")
})

containerImagem.addEventListener("mouseleave", () => {
    lens.classList.remove("ativado")
    result.classList.remove("ativado")
})

result.style.backgroundImage = `url(${imagemPrincipal.src})`    

function zoomImage(e) {
    const {x, y} = getMousePosition(e)

    lens.style.left = x + "px"
    lens.style.top = y + "px"

    let fx = resultRect.width / lensRect.width
    let fy = resultRect.height / lensRect.height

    result.style.backgroundSize = `${imagemPrincipalRect.width * fx}px ${imagemPrincipalRect.height * fy}px`
    result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`
}

function getMousePosition(e) {
    let x = e.clientX - containerRect.left - lensRect.width / 2;
    let y = e.clientY - containerRect.top - lensRect.height / 2;
    
    let minX = 0;
    let minY = 0;
    let maxX = containerRect.width - lensRect.width;
    let maxY = containerRect.height - lensRect.height;
    
    if(x <= minX){
        x = minX
    } else if (x >= maxX) {
        x = maxX
    }
    
    if(y <= minY){
        y = minY
    } else if (y >= maxY) {
        y = maxY
    }

    return {x, y}
}