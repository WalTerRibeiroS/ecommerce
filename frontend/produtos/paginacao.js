import { chamarAPI } from "./chamarAPI.js";
import { carregarProdutosGrid } from "./carregarProdutos.js";

export async function renderizarPaginacao(paginaAtual = 1) {
    
    const data = await chamarAPI(paginaAtual)

    const total = data.total
    const limite = parseInt(document.getElementById("produtos-por-pagina").value);

    const totalPaginas = Math.ceil(total / limite)
    console.log("totalPaginas: ", totalPaginas)

    const pagination = document.getElementById("pagination")

    pagination.replaceChildren()

    if (totalPaginas <= 0){
        return
    }

    if(totalPaginas === 1){
        const li = document.createElement("li")

        li.innerHTML = `
            <a class="active">1</a>
        `

        pagination.appendChild(li)
        return
    }

    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angles-left"></i>',
            1, 
            paginaAtual === 1 
        )
    );

    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angle-left"></i>',
            paginaAtual - 1,
            paginaAtual === 1
        )
    );

    let inicio = paginaAtual - 2
    let fim = paginaAtual + 2

    if (inicio < 1){
        inicio = 1;
        fim = Math.min(5, totalPaginas)
    }

    if (fim > totalPaginas){
        fim = totalPaginas
        inicio = Math.max(1, totalPaginas - 4)
    }

    for(let pagina = inicio; pagina <= fim; pagina++){
        pagination.appendChild(
            criarBotaoPaginacao(
                pagina,
                pagina,
                false,
                pagina === paginaAtual
            )
        );
    }

    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angle-right"></i>',
            paginaAtual + 1,
            paginaAtual === totalPaginas
        )
    );

    pagination.appendChild(
        criarBotaoPaginacao(
            '<i class="fa-solid fa-angles-right"></i>',
            totalPaginas,
            paginaAtual === totalPaginas
        )
    );
}

function criarBotaoPaginacao(conteudo, paginaDestino, desabilitado = false, ativo = false){

    const li = document.createElement("li")
    const a = document.createElement("a")
    
    a.innerHTML = conteudo

    if (ativo){
        a.classList.add("active")
    }

    if (desabilitado){
        a.classList.add("disabled")
    }else {
        a.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            carregarProdutosGrid(paginaDestino)
            renderizarPaginacao(paginaDestino)
        })
    }

    li.append(a)

    return li
}