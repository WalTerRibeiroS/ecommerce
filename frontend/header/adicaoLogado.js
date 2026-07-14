/* altera a parte de login da navbar apos o user receber um cookie */

async function checarStatusAutenticacao() {
    try {
        const response = await fetch("https://ecommerce-meu.up.railway.app/api/v1/auth/status", {
            credentials: "include"
        });
        return response.ok;
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        return false;
    }
}

function atualizarInterfaceLogado(menuLogado, linkLogin) {

    document.querySelector(".texto-login").textContent = "logado";
    document.querySelector(".login-menu").style.display = "none"

    const iconeLogin = document.getElementById("icone-login");
    iconeLogin.classList.remove("fa-regular");
    iconeLogin.classList.add("fa-solid");

    const overlay = document.getElementById("overlay");

    linkLogin.removeAttribute("href");
    linkLogin.addEventListener("click", (event) => {
        event.preventDefault();
        menuLogado.classList.toggle("ativo");
        overlay.style.display = "block";
    });
}

function esconderInterfaceLogado() {
    const itemPerfil = document.querySelector(".perfil-menu");
    const itemSair = document.querySelector(".sair-menu");

    // Verifica se os elementos existem na página antes de mudar o estilo para evitar erros
    if (itemPerfil) itemPerfil.style.display = "none";
    if (itemSair) itemSair.style.display = "none";
}

export async function verificarUsuarioLogado(opcoes = {}) {

    const {
        pagina = "",
        onNaoLogado = null
    } = opcoes

    const linkLogin = document.getElementById("link-login");
    const menuLogado = document.querySelector(".menu-logado");

    const usuarioLogado = await checarStatusAutenticacao();

    if (usuarioLogado) {
        atualizarInterfaceLogado(menuLogado, linkLogin);
    } else {
        esconderInterfaceLogado();

        if (onNaoLogado) {
            onNaoLogado()
        }
    }
}