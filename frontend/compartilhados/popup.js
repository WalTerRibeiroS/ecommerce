function mostrarPopup(mensagem, tipo = "sucesso") {

    const popup = document.createElement("div");

    popup.classList.add("popup");
    popup.classList.add(tipo);
    popup.classList.add("mostrar");
    

    popup.textContent = mensagem;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.remove("mostrar");
    }, 1500);

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {

    const notificacaoSalva =
        sessionStorage.getItem("notificacao");

    if (!notificacaoSalva) {
        return;
    }

    const notificacao =
        JSON.parse(notificacaoSalva);

    mostrarPopup(
        notificacao.mensagem,
        notificacao.tipo
    );

    sessionStorage.removeItem("notificacao");
});