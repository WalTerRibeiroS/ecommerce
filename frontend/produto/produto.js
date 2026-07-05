import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { criarLayout} from "./criarLayout.js"
import { iniciarBarraPesquisa } from "../header/header.js";

/* chamada das rotas */

const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const slug = params.get("slug");

async function chamarAPI() {

    const response = await fetch(`http://localhost:3000/api/v1/produtos/pagina/${slug}-${id}`)

    const infoProduto = await response.json();

    criarLayout(infoProduto);
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

verificarUsuarioLogado()
chamarAPI()
iniciarBarraPesquisa()
