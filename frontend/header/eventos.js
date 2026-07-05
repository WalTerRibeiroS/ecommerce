import { barraDeBusca, lupa, dropdown, inputBusca } from "./elementos.js";
import { pesquisar } from "./pesquisa.js";
import { buscarSugestoes } from "./sugestao.js"
import { mostrarHistorico } from "./historicoPesquisa.js";

export function inicializarEventosBarraPesquisa() {

    barraDeBusca.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            pesquisar(barraDeBusca.value)
        }
    });

    lupa.addEventListener("click", () => {
        pesquisar(barraDeBusca.value)
    });

    dropdown.addEventListener("click", (event) => { //se o clique nas li n funfar aqui é o problema

        const li = event.target.closest("li");

        if (!li) return;

        pesquisar(li.textContent);
    });

    barraDeBusca.addEventListener("blur", () => { //fechar o dropdown
        
        setTimeout(() => {
            dropdown.textContent = ""
        }, 200);
    })

    inputBusca.addEventListener("input", () => {
        buscarSugestoes(inputBusca.value)
    })

    barraDeBusca.addEventListener("focus", () => {
        mostrarHistorico()
    });
}