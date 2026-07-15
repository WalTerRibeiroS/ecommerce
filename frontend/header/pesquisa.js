import { semAcentos } from "./utils/semAcentos.js";
import { guardarNoHistorico } from "./historicoPesquisa.js";

export function pesquisar(busca) {

    busca = busca.trim();

    if (!busca) return;

    guardarNoHistorico(busca);

    const buscaFormatada = semAcentos(busca);

    window.location.href = `https://ecommerce-ten-weld-12.vercel.app/produtos?busca=${encodeURIComponent(buscaFormatada)}`;
}