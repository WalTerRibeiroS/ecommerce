import { iniciarBarraPesquisa } from "../header/header.js";

const formularioDeLogin = document.getElementById("login-form");
const alertaDeErro = document.getElementById("alerta-de-erro");
const blocoDeErro = document.getElementById("container-de-erro");

formularioDeLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    blocoDeErro.style.display = "none";

    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
    
    const result = await response.json();

    if (!response.ok) {
        const mensagemErro = result.errors?.[0]?.message || result.message || "Ocorreu um erro inesperado.";

        alertaDeErro.textContent = mensagemErro;
        blocoDeErro.style.display = "flex";
        return;
    }

   sessionStorage.setItem("notificacao", JSON.stringify({
        mensagem: "Login concluído com sucesso!",
        tipo: "sucesso"
    }));

    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "http://localhost:5500/frontend/index/index.html";
    }
})

/* ----------- botao do olho ------ */

const senha = document.getElementById("senha");
const botaoOlho = document.getElementById("botao-olho");
const iconeOlho = document.getElementById("icone-de-olho");

botaoOlho.addEventListener("click", () => {

    if (senha.type === "password"){
        senha.type = "text";

        iconeOlho.classList.remove("fa-eye");
        iconeOlho.classList.add("fa-eye-slash");
    } else {
        senha.type = "password";

        iconeOlho.classList.remove("fa-eye-slash");
        iconeOlho.classList.add("fa-eye")
    }
});

iniciarBarraPesquisa()