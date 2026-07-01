export function criarNavegacaoLayout(){
    const imagemPrincipal = document.getElementById("imagem-principal")
    const thumbs = document.querySelectorAll(".thumbs")
    let imagemSelecionada = document.querySelector(".selecionada")

    thumbs.forEach((thumb) => {

        thumb.addEventListener("mouseenter", () => {
            imagemPrincipal.src = thumb.src
        })

        thumb.addEventListener("click", () => {
            imagemSelecionada.classList.remove("selecionada")
            thumb.classList.add("selecionada");
            imagemSelecionada = thumb;
        })
    })
}