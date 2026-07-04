export function guardarNoHistorico(busca) {
    const historico = JSON.parse(localStorage.getItem("histórico de pesquisa")) || [];
    
    historico.unshift(busca)

    localStorage.setItem("histórico de pesquisa", JSON.stringify(historico))
}

export function buscarHistorico() {

    let historico = JSON.parse(localStorage.getItem("histórico de pesquisa")) || [];

    let historicoFiltrado = [... new Set(historico)]//muito melhor do q usar indexOf + .filter pq Set é otimizado para grandes arrays

    historicoFiltrado = historicoFiltrado.slice(0, 3)

    const pesquisas = historicoFiltrado || []

    return pesquisas
}

