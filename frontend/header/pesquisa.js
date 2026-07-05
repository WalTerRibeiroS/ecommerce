import { semAcentos } from "./utils/semAcentos.js";
import { guardarNoHistorico } from "./historicoPesquisa.js";

export function pesquisar(busca) {

    busca = busca.trim();

    if (!busca) return;

    guardarNoHistorico(busca);

    const buscaFormatada = semAcentos(busca);

    window.location.href = `http://localhost:5500/frontend/produtos/produtos.html?busca=${encodeURIComponent(buscaFormatada)}`;
}