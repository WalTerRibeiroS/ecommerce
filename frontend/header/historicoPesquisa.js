export function guardarNoHistorico(busca) {
    const historico = JSON.parse(localStorage.getItem("histórico de pesquisa")) || [];
    
    historico.unshift(busca)

    localStorage.setItem("histórico de pesquisa", JSON.stringify(historico))
}

export function buscarHistorico() {

    let historico = JSON.parse(localStorage.getItem("histórico de pesquisa")) || [];

    let historicoFiltrado = [... new Set(historico)]

    historicoFiltrado = historicoFiltrado.slice(0, 3)

    const pesquisas = historicoFiltrado || []

    return pesquisas
}

export function mostrarHistorico() {

    const pesquisas = buscarHistorico()
    renderizarPesquisa(pesquisas)
}

function renderizarPesquisa(pesquisas){

    pesquisas.forEach(pesquisa => {
        const li = document.createElement("li")
        const icon = document.createElement("i")

        icon.classList.add("fa-solid", "fa-clock-rotate-left");

        li.append(icon)

        const texto = document.createTextNode(`${pesquisa}`)
        li.append(texto)

        dropdown.appendChild(li)
    })
}
/* 
// Seleciona o botão pelo ID
const meuBotao = document.getElementById("meu-botao");

// Adiciona o event listener
meuBotao.addEventListener("click", function() {
    window.location.href = "https://seusite.com";
});
 */