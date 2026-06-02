console.log("popup.js carregado");

function mostrarPopup(mensagem, tipo = "sucesso") {


    console.log("criando popup");


    const popup = document.createElement("div");

    popup.classList.add("popup");
    popup.classList.add(tipo);

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

    console.log(sessionStorage.getItem("notificacao"));


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