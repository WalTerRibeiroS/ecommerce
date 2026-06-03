const formularioDeRegistro = document.getElementById("registrar-form");
const alertaDeErro = document.getElementById("alerta-de-erro");
const blocoDeErro = document.getElementById("container-de-erro");

formularioDeRegistro.addEventListener("submit", async (event) => {
    event.preventDefault();

    blocoDeErro.style.display = "none";

    const senha = document.getElementById("senha").value

    if (senha.length < 8) {
        alertaDeErro.textContent = "A senha deve ter pelo menos 8 carácteres.";
        blocoDeErro.style.display = "flex";
        return
    }

    const dados = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    const response = await fetch("http://localhost:3000/api/v1/auth/registrar", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
    
    const result = await response.json();

    if (!response.ok) {
        alertaDeErro.textContent = result.errors[0].message || "Ocorreu um erro inesperado.";
        blocoDeErro.style.display = "flex";
        return;
    }

   sessionStorage.setItem("notificacao", JSON.stringify({
        mensagem: "Cadastro concluído com sucesso!",
        tipo: "sucesso"
    }));

    window.location.href = "http://localhost:5500/public/index.html";
})