import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";
import { renderizarLayout, divResumoCompra } from "./criarLayout.js";

const blocoDeAvisoLogado = document.querySelector(".avisos-logado-container")

verificarUsuarioLogado({
    pagina: "carrinho",
    onNaoLogado: () => {
        divResumoCompra.replaceChildren()
        blocoDeAvisoLogado.style.display = "flex"
    }
})

renderizarLayout()
iniciarBarraPesquisa()