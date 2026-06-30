import { verificarUsuarioLogado } from "../compartilhados/adicaoLogado.js"
import { criarLayout} from "./criarLayout.js"

verificarUsuarioLogado()
chamarAPI()
/* chamada das rotas */

async function chamarAPI() {

    const id = 36

    const slug = "placa-de-som-usb-externa-green-connection"

    const response = await fetch(`http://localhost:3000/api/v1/produtos/pagina/${slug}-${id}`)

    const infoProduto = await response.json();
    console.log("infoProduto1: ", infoProduto)

    criarLayout(infoProduto);
}

/* funcionamento da navegacao das imagens */

const imagemPrincipal = document.getElementById("imagem-principal")
const thumbs = document.querySelectorAll(".thumbs")
let imagemSelecionada = document.querySelector(".selecionada")
let imagemHover = document.querySelector(".hover-ativo")

thumbs.forEach((thumb) => {

    //hover troca a imagem principal, preserva a imagem do ultimo hover
    thumb.addEventListener("mouseenter", () => { /*  eu n sei o eu estava cozinhando */
        imagemPrincipal.src = thumb.src
        imagemPrincipal = imagemPrincipal.src
        imagemHover = imagemPrincipal
        imagemHover.classList.add("hover-ativo")
    })

    thumb.addEventListener("click", () => {
        imagemSelecionada.classList.remove("selecionada")
        imagemSelecionada.classList.remove("hover-ativo")
        thumb.classList.add("selecionada");
        imagemSelecionada = thumb;
    })
})

/* zoom in na imagem em destaque */

const containerImagem = document.getElementById("container-imagem-principal");
const lens = document.getElementById("lens");
const result = document.getElementById("result");

const containerRect = containerImagem.getBoundingClientRect();
const lensRect = lens.getBoundingClientRect();
const resultRect = result.getBoundingClientRect();
const imagemPrincipalRect = imagemPrincipal.getBoundingClientRect();/* aqui */

containerImagem.addEventListener("mousemove", (e) => {
    zoomImage(e)
    lens.classList.add("ativado")
    result.classList.add("ativado")
})

containerImagem.addEventListener("mouseleave", () => {
    lens.classList.remove("ativado")
    result.classList.remove("ativado")
}) 

function zoomImage(e) {
    const {x, y} = getMousePosition(e)

    lens.style.left = x + "px"
    lens.style.top = y + "px"

    let fx = resultRect.width / lensRect.width
    let fy = resultRect.height / lensRect.height

    result.style.backgroundSize = `${imagemPrincipalRect.width * fx}px ${imagemPrincipalRect.height * fy}px`
    result.style.backgroundPosition = `-${x * fx}px -${y * fy}px`
    result.style.backgroundImage = `url(${imagemPrincipal.src})`
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


/* continuar algum dia */

/* clique na imagem em destaque → abrir um tela/menu com as imagens em um carrosel  */

/* const overlayGaleria = document.getElementById("overlay-galeria");
const btnSair = document.getElementById("btn-sair-galeria");
const imagemGaleria = document.getElementById("imagem-galeria");
const estilo = document.getElementById("estilo");
const carroselGaleria = document.getElementById("carrosel-galeria"); */

//abrir dialog
/* imagensGaleria.forEach((imagemGaleria) => {

    containerImagem.addEventListener("click", () => {

        if (imagemGaleria.classList.contains("hover-ativo")){
            overlayGaleria.showModal()
            imagemGaleria.src = imagemHover.src
        } else {
            overlayGaleria.showModal();
            imagemGaleria.src = imagemSelecionada.src
        }
        });
        
        }) */
       
       
/* const imagensCarrossel = [...document.querySelectorAll("thumbs")];

let indiceAtual = 0;

function mostrarImagem(indice) {
    imagemGaleria.src = imagensCarrossel[indice].src;
}

mostrarImagem(0);

containerImagem.addEventListener("click", () => {
    overlayGaleria.showModal();
    imagemGaleria.src = imagemSelecionada.src
})

//fechar dialog

btnSair.addEventListener("click", () => {
    overlayGaleria.close();
});

overlayGaleria.addEventListener("click", (event) => {
    console.log(event)
    if (event.target === overlayGaleria || carroselGaleria ) {
        overlayGaleria.close();
    }
});

imagensGaleria.forEach((imagemGaleria) => {

    imagemGaleria.addEventListener("click", (event) => {
        console.log(event)
        event.stopPropagation(); 
    });
})

overlayGaleria.addEventListener('wheel', (event) => {
    console.log(event)
    overlayGaleria.close();
}); */
