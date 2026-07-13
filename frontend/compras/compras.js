import { verificarUsuarioLogado } from "../header/adicaoLogado.js"
import { iniciarBarraPesquisa } from "../header/header.js";

async function pegarDadosAPI() {

    const response = await fetch("http://localhost:3000/api/v1/pedidos/itens-comprados", {
        credentials: "include",
    }); 
    
    const result = await response.json();
    return result
}

const dados = await pegarDadosAPI()

function criarLayout(){
    
}

verificarUsuarioLogado()
iniciarBarraPesquisa()